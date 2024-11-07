import React, { useState } from 'react';
import Hito from '../pages/Hito'; // Asegúrate de importar el componente Hito

const Sidebar = ({ road, seleccionarNivel, isSidebarVisible, toggleSidebar }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null); // Estado para el enlace seleccionado

  const handleSelect = (index) => {
    setSelectedIndex(index);
    seleccionarNivel(index);
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleLinkClick = (enlace) => {
    setSelectedLink(enlace); // Al hacer clic en el enlace, se establece como seleccionado
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        {road.map((elemento, index) => (
          <div key={index}>
            <button
              onClick={() => {
                handleSelect(index);
                toggleAccordion(index);
              }}
              className={`sidebar-button ${selectedIndex === index ? 'selected' : ''}`}
            >
              {selectedIndex === index && <span className="checkmark">✔</span>}
              {elemento.title}
            </button>

            {activeIndex === index && (
              <div className="accordion-content">
                <div className="timeline-items">
                  {elemento.enlaces.map((enlace, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-number">{i + 1}</div>
                      <div className="link-title">
                        <button
                          onClick={() => handleLinkClick(enlace)} // Maneja el clic en el enlace
                        >
                          {enlace.titulo}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ventana emergente para mostrar el enlace seleccionado */}
      {selectedLink && (
        <div className="popup-container">
        
          <Hito selectedLink={selectedLink} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
