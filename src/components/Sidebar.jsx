import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Hito from '../pages/Hito';

const Sidebar = ({ road, seleccionarNivel, isSidebarVisible, toggleSidebar }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewedItems, setViewedItems] = useState([]);

  // Cargar elementos vistos desde localStorage al montar el componente
  useEffect(() => {
    try {
      const savedViewedItems = JSON.parse(localStorage.getItem('viewedItems')) || [];
      if (savedViewedItems.length > 0) {
        setViewedItems(savedViewedItems);
      }
    } catch (error) {
      console.error('Error al cargar los datos desde localStorage:', error);
    }
  }, []);

  // Guardar los elementos vistos en localStorage cuando cambie viewedItems
  useEffect(() => {
    if (viewedItems.length > 0) {
      localStorage.setItem('viewedItems', JSON.stringify(viewedItems));
    }
  }, [viewedItems]);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    seleccionarNivel(index);
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleLinkClick = (enlace) => {
    setSelectedLink(enlace);

    // Marcar el enlace como visto si no está ya en viewedItems
    if (!viewedItems.includes(enlace.titulo)) {
      setViewedItems((prev) => [...prev, enlace.titulo]);
    }
  };

  // Filtrar los elementos de 'road' según el término de búsqueda
  const filteredRoad = road.filter((elemento) =>
    elemento.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    elemento.enlaces.some((enlace) => enlace.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calcular el progreso
  const totalItems = road.reduce((sum, item) => sum + item.enlaces.length, 0);
  const progress = totalItems > 0 ? Math.round((viewedItems.length / totalItems) * 100) : 0;

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
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

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{progress}% completed</p>
        </div>

        {filteredRoad.map((elemento, index) => (
          <div key={index} className="accordion-section">
            <button
              onClick={() => {
                handleSelect(index);
                toggleAccordion(index);
              }}
              className={`sidebar-button ${selectedIndex === index ? 'selected' : ''}`}
            >
              {elemento.title}
            </button>

            {activeIndex === index && (
              <div className="accordion-content">
                {elemento.enlaces.map((enlace, i) => (
                  <div key={i} className={`timeline-item ${viewedItems.includes(enlace.titulo) ? 'viewed' : ''}`}>
                    <button onClick={() => handleLinkClick(enlace)}>{enlace.titulo}</button>
                  </div>
                ))}
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
