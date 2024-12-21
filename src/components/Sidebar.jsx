import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Hito from '../pages/Hito';
import { mensajes } from '../utils/mensajes';

const Sidebar = ({ road, seleccionarNivel, isSidebarVisible, toggleSidebar }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewedItems, setViewedItems] = useState([]);
  const [achievementMessage, setAchievementMessage] = useState('');

  useEffect(() => {
    try {
      const savedViewedItems = JSON.parse(localStorage.getItem('viewedItems')) || [];
      setViewedItems(savedViewedItems);
    } catch (error) {
      console.error('Error al cargar los datos desde localStorage:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('viewedItems', JSON.stringify(viewedItems));
  }, [viewedItems]);

  useEffect(() => {
    const progress = calculateProgress();
    if (mensajes[progress]) {
      setAchievementMessage(mensajes[progress]);
      setTimeout(() => setAchievementMessage(''), 3000);
    }
  }, [viewedItems]);

  const calculateProgress = () => {
    const totalItems = road.reduce((sum, item) => sum + item.enlaces.length, 0);
    return totalItems > 0 ? Math.round((viewedItems.length / totalItems) * 100) : 0;
  };

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

  const handleCheckboxChange = (enlaceTitulo) => {
    setViewedItems((prev) =>
      prev.includes(enlaceTitulo)
        ? prev.filter(item => item !== enlaceTitulo)
        : [...prev, enlaceTitulo]
    );
  };

  const filteredRoad = road.filter((elemento) =>
    elemento.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    elemento.enlaces.some((enlace) => enlace.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
              style={{
                backgroundColor: elemento.color || '#1E293B',
                backgroundImage: elemento.thumbnail
                  ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${elemento.thumbnail})`
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                fontWeight: 'bold',
                padding: '15px 20px',
                borderRadius: '10px',
                border: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                marginBottom: '10px',
              }}
            >
              {elemento.title}
            </button>

            {activeIndex === index && (
              <div className="accordion-content">
                {elemento.enlaces.map((enlace, i) => (
                  <div
                    key={i}
                    className={`timeline-item ${viewedItems.includes(enlace.titulo) ? 'viewed' : ''}`}
                    style={{
                      padding: '10px',
                      margin: '5px 0',
                      background: '#334155',
                      borderRadius: '8px',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={viewedItems.includes(enlace.titulo)}
                        onChange={() => handleCheckboxChange(enlace.titulo)}
                        style={{ marginRight: '10px' }}
                      />
                      {`${i + 1}. ${enlace.titulo}`}
                    </label>
                    <button
                      onClick={() => handleLinkClick(enlace)}
                      style={{
                        background: viewedItems.includes(enlace.titulo) ? '#22C55E' : '#3B82F6',
                        color: '#fff',
                        borderRadius: '5px',
                        padding: '5px 15px',
                        border: 'none',
                      }}
                    >
                      {viewedItems.includes(enlace.titulo) ? 'Done' : 'View'}
                    </button>
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
