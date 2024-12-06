import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Hito from '../pages/Hito';

const Sidebar = ({ road, seleccionarNivel, isSidebarVisible, toggleSidebar }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (index) => {
    setSelectedIndex(index);
    seleccionarNivel(index);
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleLinkClick = (enlace) => {
    setSelectedLink(enlace);
  };

  // Filtrar los elementos de 'road' según el término de búsqueda
  const filteredRoad = road.filter((elemento) =>
    elemento.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    elemento.enlaces.some(enlace => enlace.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        {/* Barra de búsqueda con ícono */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">
            <FaSearch className="icon" />
          </div>
        </div>

        {filteredRoad.map((elemento, index) => (
          <div key={index} className="accordion-section">
            <button
              onClick={() => {
                handleSelect(index);
                toggleAccordion(index);
              }}
              className={`sidebar-button ${selectedIndex === index ? 'selected' : ''} ${activeIndex === index ? 'active' : ''}`}
            >
              {elemento.title}
              {selectedIndex === index && (
                <span className="current-location"> - You are here! </span>
              )}
              <img
                src="https://i.ibb.co/GdsGNT8/Fondos-de-zoom-12.png"
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
