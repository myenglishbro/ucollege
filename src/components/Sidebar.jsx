import React, { useState } from 'react';
import Hito from '../pages/Hito';

const Sidebar = ({ road, seleccionarNivel, isSidebarVisible, toggleSidebar }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    seleccionarNivel(index);
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Cambia el índice activo
  };

  const handleLinkClick = (enlace) => {
    setSelectedLink(enlace);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        {road.map((elemento, index) => (
          <div key={index} className="accordion-section">
          <button
  onClick={() => {
    handleSelect(index);
    toggleAccordion(index);
  }}
  className={`sidebar-button ${selectedIndex === index ? 'selected' : ''} ${activeIndex === index ? 'active' : ''}`}
>
  {elemento.title}
  
  {/* Mostrar "Estás aquí" si este acordeón está seleccionado */}
  {selectedIndex === index && (
    <span className="current-location"> - You are here! </span>
  )}

  <img
    src="https://i.ibb.co/GdsGNT8/Fondos-de-zoom-12.png"  // Ruta de la imagen de la flecha
    alt="arrow-icon"
    className={`arrow-icon ${activeIndex === index ? 'rotate' : ''}`}
  />
</button>

            {activeIndex === index && (
              <div className="accordion-content">
                <div className="timeline-items">
                  {elemento.enlaces.map((enlace, i) => (
                    <div key={i} className={`timeline-item ${selectedLink === enlace ? 'highlighted' : ''}`}>
                      <div className="timeline-number">{i + 1}</div>
                      <div className="link-title">
                        <button onClick={() => handleLinkClick(enlace)} className="link-button">
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

      {selectedLink && (
        <div className="popup-container">
          <Hito selectedLink={selectedLink} />
          <button onClick={() => setSelectedLink(null)} className="close-popup">✖</button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
