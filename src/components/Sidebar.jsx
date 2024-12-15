import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Hito from '../pages/Hito';

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
    const milestoneMessages = {
      10: 'Great start! Keep going!',
      20: 'You are amazing! Keep it up!',
      30: 'Fantastic progress!',
      40: 'You are halfway there!',
      50: 'Incredible effort!',
      60: 'You are unstoppable!',
      70: 'Almost there, keep pushing!',
      80: 'So close to the finish line!',
      90: 'You are a star!',
      100: 'Congratulations! You did it!'
    };

    if (milestoneMessages[progress]) {
      setAchievementMessage(milestoneMessages[progress]);
      setTimeout(() => setAchievementMessage(''), 3000); // Clear message after 3 seconds
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
    if (!viewedItems.includes(enlace.titulo)) {
      setViewedItems((prev) => [...prev, enlace.titulo]);
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
              style={{ backgroundColor: elemento.color || 'transparent' }}
            >
              {elemento.title}
            </button>

            {activeIndex === index && (
              <div className="accordion-content">
                {elemento.enlaces.map((enlace, i) => (
                  <div key={i} className={`timeline-item ${viewedItems.includes(enlace.titulo) ? 'viewed' : ''}`}>
                    <button onClick={() => handleLinkClick(enlace)}>
                      {`${i + 1}. ${enlace.titulo}`}
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
