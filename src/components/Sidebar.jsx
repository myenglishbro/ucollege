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
    setActiveIndex(activeIndex === index ? null : index);
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
              className={`sidebar-button ${selectedIndex === index ? 'selected' : ''}`}
            >
              {selectedIndex === index && <span className="checkmark">✔</span>}
              {elemento.title}
              <span className={`arrow-icon ${activeIndex === index ? 'rotate' : ''}`}>▼</span>
            </button>

            {activeIndex === index && (
              <div className="accordion-content">
                <div className="timeline-items">
                  {elemento.enlaces.map((enlace, i) => (
                    <div key={i} className={`timeline-item ${selectedLink === enlace ? 'highlighted' : ''}`}>
                      <div className="timeline-number">{i + 1}</div>
                      <div className="link-title">
                        <button
                          onClick={() => handleLinkClick(enlace)}
                          className="link-button"
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
