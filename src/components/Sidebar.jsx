import React, { useState } from 'react';

const Sidebar = ({ road, seleccionarNivel, isSidebarVisible, toggleSidebar }) => {
  const [selectedIndex, setSelectedIndex] = useState(null); // Estado para el ítem seleccionado

  const handleSelect = (index) => {
    setSelectedIndex(index); // Establecer el ítem seleccionado
    seleccionarNivel(index); // Ejecutar la función de selección de nivel
    // No cerrar el sidebar al seleccionar en dispositivos pequeños
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        {road.map((elemento, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`sidebar-button ${selectedIndex === index ? 'selected' : ''}`}
          >
            {selectedIndex === index && <span className="checkmark">✔</span>}
            {elemento.title}
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
