import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const groups = {
  grupo1: [
    { name: 'Miguel Barrientos' },
    { name: 'Jose Espinoza' },
    { name: 'Joseph Rodriguez' },
    { name: 'David Romero' }
  ],
  grupo2: [
    { name: 'Thalia Castro' }
  ],
  grupo3: [
    { name: 'Elvis Mori' },
    { name: 'Melissa Cossío' },
    { name: 'Mafer Vilchez' },
    { name: 'Daniela Albarrán' }
  ]
};

const AttendanceTracker = () => {
  const [selectedGroup, setSelectedGroup] = useState('grupo1');
  const [attendance, setAttendance] = useState(
    groups['grupo1'].map(student => ({
      name: student.name,
      status: '',
      comment: ''
    }))
  );

  const containerRef = useRef();

  const handleGroupChange = (e) => {
    const newGroup = e.target.value;
    setSelectedGroup(newGroup);
    setAttendance(
      groups[newGroup].map(student => ({
        name: student.name,
        status: '',
        comment: ''
      }))
    );
  };

  const handleChange = (index, field, value) => {
    const updated = [...attendance];
    updated[index][field] = value;
    setAttendance(updated);
  };

  const generateImage = async () => {
    const element = containerRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const date = new Date().toLocaleDateString();
    link.href = imgData;
    link.download = `Asistencia-${date}.png`;
    link.click();
  };

  const exportJSON = () => {
    const date = new Date().toISOString().split('T')[0];
    const dataToExport = {
      date,
      teacher: 'Carlos Apolaya Sánchez',
      group: selectedGroup,
      attendance
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Asistencia-${selectedGroup}-${date}.json`;
    link.click();
  };

  return (
    <div className="p-6 text-white bg-[#1a1c2b] min-h-screen">
      <div className="mb-4">
        <label className="block mb-2 text-sm text-cyan-200">Seleccionar grupo:</label>
        <select
          className="bg-[#2a2e3f] text-white p-2 rounded"
          value={selectedGroup}
          onChange={handleGroupChange}
        >
          <option value="grupo1">Grupo 1 - Devs</option>
          <option value="grupo2">Grupo 2 - Recursos Humanos</option>
          <option value="grupo3">Grupo 3 - UX y PM</option>
        </select>
      </div>

      <div ref={containerRef} className="bg-[#1a1c2b] p-4">
        <h1 className="text-2xl font-bold mb-2 text-cyan-300">ASISTENCIA CLASES DE INGLÉS</h1>
        <p className="text-sm mb-1 text-white/70">DOCENTE: Carlos Apolaya Sánchez</p>
        <p className="text-sm mb-4 text-white/70">FECHA: {new Date().toLocaleDateString()}</p>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#2a2e3f] text-cyan-100">
              <th className="p-2 border border-gray-600">Nombre</th>
              <th className="p-2 border border-gray-600">Estado</th>
              <th className="p-2 border border-gray-600">Comentario</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((entry, index) => (
              <tr key={index} className="bg-[#22263d]">
                <td className="p-2 border border-gray-700">{entry.name}</td>
                <td className="p-2 border border-gray-700">
                  <select
                    className="bg-[#1f1f2e] text-white p-1 rounded"
                    value={entry.status}
                    onChange={(e) => handleChange(index, 'status', e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Presente">Presente</option>
                    <option value="Ausente">Ausente</option>
                    <option value="Tardanza">Tardanza</option>
                    <option value="Justificado">Justificado</option>
                  </select>
                </td>
                <td className="p-2 border border-gray-700">
                  <input
                    className="bg-[#1f1f2e] text-white p-1 rounded w-full"
                    type="text"
                    placeholder="Comentario..."
                    value={entry.comment}
                    onChange={(e) => handleChange(index, 'comment', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={generateImage}
          className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 rounded-lg text-white text-sm"
        >
          🖼️ Descargar Imagen
        </button>
        <button
          onClick={exportJSON}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded-lg text-white text-sm"
        >
          📄 Guardar como JSON
        </button>
      </div>
    </div>
  );
};

export default AttendanceTracker;
