import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const ReporteMensual = () => {
  const [resumen, setResumen] = useState(null);
  const [fechas, setFechas] = useState([]);
  const tableRef = useRef(null);

  const handleFiles = async (event) => {
    const files = event.target.files;
    const allData = [];
    const allFechas = [];

    for (const file of files) {
      const text = await file.text();
      const json = JSON.parse(text);
      allData.push(json);
      allFechas.push(json.date); // Cambiado de json.fecha a json.date
    }

    const resumenPorEstudiante = {};
    const totalDias = allData.length;

    allData.forEach((entry) => {
      entry.attendance.forEach(({ name, status }) => {
        if (!resumenPorEstudiante[name]) {
          resumenPorEstudiante[name] = { Presente: 0, Ausente: 0, Tardanza: 0, Justificado: 0, Total: 0 };
        }
        if (status) {
          resumenPorEstudiante[name][status]++;
          resumenPorEstudiante[name].Total++;
        }
      });
    });

    setResumen(resumenPorEstudiante);
    setFechas(allFechas);
  };

  const downloadImage = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    const link = document.createElement('a');
    link.download = `REPORTE_ASISTENCIA_${new Date().toLocaleDateString().replaceAll('/', '-')}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-6 text-white bg-[#0f1123] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-cyan-300">📊 Reporte Mensual de Asistencia</h1>
      <input
        type="file"
        multiple
        accept="application/json"
        onChange={handleFiles}
        className="mb-6 text-white"
      />

      {resumen && (
        <>
          <div
            ref={tableRef}
            className="mb-6 bg-[#12172e] text-white p-6 rounded-lg max-w-5xl mx-auto shadow-lg border border-cyan-600"
          >
            <h2 className="text-3xl font-bold mb-2 text-center text-cyan-400">ASSISTENCIA CLASES DE INGLÉS</h2>
            <p className="text-sm mb-4 text-center text-white/70">DOCENTE: Carlos Apolaya Sánchez</p>
            <p className="text-sm mb-4 text-center text-white/70">FECHAS: {fechas.join(', ')}</p>
            <table className="w-full border-collapse rounded overflow-hidden">
              <thead>
                <tr className="bg-[#1f253d] text-cyan-200">
                  <th className="p-3 border border-[#2a2e3f]">Nombre</th>
                  <th className="p-3 border border-[#2a2e3f]">Presente</th>
                  <th className="p-3 border border-[#2a2e3f]">Ausente</th>
                  <th className="p-3 border border-[#2a2e3f]">Tardanza</th>
                  <th className="p-3 border border-[#2a2e3f]">Justificado</th>
                  <th className="p-3 border border-[#2a2e3f]">Total ({fechas.length})</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(resumen).map(([name, counts], index) => (
                  <tr key={index} className="bg-[#1a1e33] hover:bg-[#22263d]">
                    <td className="p-3 border border-[#2a2e3f] font-semibold text-white/90">{name}</td>
                    <td className="p-3 border border-[#2a2e3f] text-center">{counts.Presente}</td>
                    <td className="p-3 border border-[#2a2e3f] text-center">{counts.Ausente}</td>
                    <td className="p-3 border border-[#2a2e3f] text-center">{counts.Tardanza}</td>
                    <td className="p-3 border border-[#2a2e3f] text-center">{counts.Justificado}</td>
                    <td className="p-3 border border-[#2a2e3f] text-center">{counts.Total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <button
              onClick={downloadImage}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded shadow-md"
            >
              📥 Descargar reporte como imagen
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReporteMensual;
