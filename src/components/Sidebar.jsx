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
      if (savedViewedItems.length > 0) {
        setViewedItems(savedViewedItems);
      }
    } catch (error) {
      console.error('Error al cargar los datos desde localStorage:', error);
    }
  }, []);

  useEffect(() => {
    if (viewedItems.length > 0) {
      localStorage.setItem('viewedItems', JSON.stringify(viewedItems));
    }
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
    if (viewedItems.includes(enlaceTitulo)) {
      setViewedItems(viewedItems.filter(item => item !== enlaceTitulo));
    } else {
      setViewedItems((prev) => [...prev, enlaceTitulo]);
    }
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

        <div className="progress-bar-container" style={{ position: 'relative' }}>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <img
            src="https://i.ibb.co/nwMBCW4/Sin-t-tulo-1-02.png"
            alt="Moving icon"
            style={{
              position: 'absolute',
              top: '-15px',
              left: `${progress}%`,
              transform: 'translateX(-50%)',
              height: '30px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '0',
              fontSize: '16px',
              color: '#76c7c0',
              fontWeight: 'bold',
            }}
          >
            🏆
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
    backgroundColor: elemento.color || 'transparent',
    backgroundImage: elemento.thumbnail ? `url(${elemento.thumbnail})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '1px',
    border: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = 'none';
  }}
>
  {elemento.title}
</button>


            {activeIndex === index && (
              <div className="accordion-content">
                {elemento.enlaces.map((enlace, i) => (
                  <div key={i} className={`timeline-item ${viewedItems.includes(enlace.titulo) ? 'viewed' : ''}`}>
                    <label>
                      <input
                        type="checkbox"
                        checked={viewedItems.includes(enlace.titulo)}
                        onChange={() => handleCheckboxChange(enlace.titulo)}
                      />
                      {`${i + 1}. ${enlace.titulo}`}
                    </label>
                    <button onClick={() => handleLinkClick(enlace)}>
                      {viewedItems.includes(enlace.titulo) ? "🙈 Done" : "👀 See"}  
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

      {achievementMessage && (
        <div className="popup-message" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#76c7c0',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          textAlign: 'center',
          fontSize: '16px',
        }}>
          {achievementMessage}
        </div>
      )}
    </>
  );
};

export default Sidebar;
