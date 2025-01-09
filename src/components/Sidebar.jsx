import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Hito from '../pages/Hito';
import { mensajes } from '../utils/mensajes';

const Sidebar = ({ road, seleccionarNivel, isSidebarVisible, toggleSidebar, userImage, realname }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewedItems, setViewedItems] = useState([]);
  const [achievementMessage, setAchievementMessage] = useState('');
  const [timerMinutes, setTimerMinutes] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);  // Estado para controlar el modal
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
    if (isTimerRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setShowModal(true);  // Mostrar el modal cuando el tiempo termine
    }
  }, [isTimerRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(timerMinutes * 60);
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleRestartTimer = () => {
    setShowModal(false);
    setTimeLeft(timerMinutes * 60);
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setShowModal(false);
    setIsTimerRunning(false);
  };


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

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''} bg-gray-800 text-white w-72 h-full fixed shadow-lg`}>
      {/* User Info Section */}
        <div className="user-info flex items-center p-4 border-b border-gray-700">
          <img src={userImage} alt="User Avatar" className="user-photo w-14 h-14 rounded-full mr-4" />
          <div className="user-details">
            <p className="user-name text-lg font-semibold">{realname}</p>
            <span className="online-status flex items-center text-sm text-green-400">
              <div className="status-circle w-2 h-2 bg-green-400 rounded-full mr-2"></div> Online
            </span>
          </div>
        </div>

        <div className="timer-container">
  <h2 className="timer-title">⏱ Timer</h2>
  <div className="timer-circle">
    <svg width="150" height="150">
      <circle className="circle-bg" cx="75" cy="75" r="70" />
      <circle
        className="circle-progress"
        cx="75"
        cy="75"
        r="70"
        style={{
          strokeDasharray: 440,
          strokeDashoffset: isTimerRunning
            ? (timeLeft / (timerMinutes * 60)) * 440
            : 440,
        }}
      />
    </svg>
    <span className="time-left">
      {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
    </span>
  </div>
  <div className="timer-input">
    <label className="input-title" htmlFor="input-minutes">
      Set Timer:
    </label>
    <input
      id="input-minutes"
      type="number"
      min="1"
      value={timerMinutes}
      onChange={(e) => setTimerMinutes(Number(e.target.value))}
      className="input-minutes"
      placeholder="00"
    />
  </div>
  <div className="timer-buttons">
    <button onClick={startTimer} className="timer-button">
      Start
    </button>
    <button onClick={stopTimer} className="timer-button stop">
      Stop
    </button>
  </div>
</div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2 className="modal-title">⏰ Time's Up!</h2>
              <p className="modal-message">The timer has ended. Would you like to restart?</p>
              <div className="modal-buttons">
                <button onClick={handleRestartTimer} className="modal-button restart">
                  Restart Timer
                </button>
                <button onClick={handleStopTimer} className="modal-button stop">
                  Stop Timer
                </button>
              </div>
            </div>
          </div>
        )}

      
        {/* Search Bar */}
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

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{progress}% completed</p>
        </div>

        {/* Sidebar Content */}
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
