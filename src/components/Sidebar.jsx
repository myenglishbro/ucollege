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
  const [timerMinutes, setTimerMinutes] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Estado para llevar registro de los elementos desbloqueados (por su id)
  const [unlockedItems, setUnlockedItems] = useState([]);
  // Estado para los inputs de código (clave: índice del elemento)
  const [codeInputs, setCodeInputs] = useState({});

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
      setShowModal(true);
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
        ? prev.filter((item) => item !== enlaceTitulo)
        : [...prev, enlaceTitulo]
    );
  };

  const filteredRoad = road.filter((elemento) =>
    elemento.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    elemento.enlaces.some((enlace) =>
      enlace.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalItems = road.reduce((sum, item) => sum + item.enlaces.length, 0);
  const progress = totalItems > 0 ? Math.round((viewedItems.length / totalItems) * 100) : 0;

  // Función para validar el código ingresado para un elemento
  const handleValidateCode = (index, elemento) => {
    if (codeInputs[index] === elemento.code) {
      setUnlockedItems((prev) => [...prev, elemento.id]);
    } else {
      alert("Código incorrecto");
    }
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''} bg-gray-800 text-white w-72 h-full fixed shadow-lg`}>
        <div className="timer-container">
          <h2 className="timer-title">⏱ Timer</h2>
          <div className="timer-progress">
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{
                  width: isTimerRunning ? `${(timeLeft / (timerMinutes * 60)) * 100}%` : "0%",
                }}
              ></div>
            </div>
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

        {/* Search Bar Mejorada */}
        <div className="relative flex items-center bg-gray-800 rounded-full shadow-md p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500">
          <FaSearch className="text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none px-3 text-white placeholder-gray-500 transition-all duration-300 focus:placeholder-gray-400"
          />
          {searchTerm && (
            <button
              className="text-gray-400 hover:text-white transition-all pr-3"
              onClick={() => setSearchTerm("")}
            >
              ✖
            </button>
          )}
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
              <>
                {elemento.code && !unlockedItems.includes(elemento.id) ? (
                  <div className="code-input-container p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-md">
  <p className="text-sm text-gray-300 mb-2">
    Obtén el código desarrollando el examen del nivel anterior
  </p>
  <input
    type="text"
    placeholder="Ingresa el código"
    value={codeInputs[index] || ""}
    onChange={(e) =>
      setCodeInputs({ ...codeInputs, [index]: e.target.value })
    }
    className="p-2 rounded w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    onClick={() => handleValidateCode(index, elemento)}
    className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-4 rounded w-full transition-all"
  >
    Enviar código
  </button>
</div>

                ) : (
                  <div className="accordion-content">
                    {elemento.enlaces.map((enlace, i) => (
                      <div
                        key={i}
                        className={`timeline-item ${viewedItems?.includes(enlace.titulo) ? 'viewed' : ''}`}
                        style={{
                          padding: '10px',
                          margin: '5px 0',
                          background: '#334155',
                          borderRadius: '8px',
                          color: 'white',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        {/* Título con Checkbox */}
                        <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <input
                            type="checkbox"
                            checked={viewedItems?.includes(enlace.titulo)}
                            onChange={() => handleCheckboxChange(enlace.titulo)}
                            style={{ marginRight: '10px' }}
                          />
                          <span style={{ fontWeight: 'bold' }}>{`${i + 1}. ${enlace.titulo}`}</span>
                        </label>

                        {/* Descripción */}
                        <p style={{ fontSize: '14px', color: '#CBD5E1', marginLeft: '30px', fontStyle: 'italic' }}>
                          {enlace.descripcion}
                        </p>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          {/* Botón para URL principal */}
                          <button
                            onClick={() => handleLinkClick(enlace)}
                            style={{
                              background: viewedItems?.includes(enlace.titulo)
                                ? 'linear-gradient(135deg, #1E90FF, #0073E6)'
                                : 'linear-gradient(135deg, #004AAD, #001F3F)',
                              color: '#fff',
                              borderRadius: '6px',
                              padding: '6px 14px',
                              border: 'none',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              transition: 'all 0.2s ease-in-out',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          >
                            {viewedItems?.includes(enlace.titulo) ? '✅ Done' : '📖 Slide'}
                          </button>

                          {/* Botón para URL secundaria (si existe) */}
                          {enlace.url3 && (
                            <button
                              onClick={() => handleLinkClick({ ...enlace, url: enlace.url3 })}
                              style={{
                                background: 'linear-gradient(135deg, #004AAD, #001F3F)',
                                color: '#fff',
                                borderRadius: '6px',
                                padding: '6px 14px',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                transition: 'all 0.2s ease-in-out',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                              📝 Test
                            </button>
                          )}

                          {/* Botón para URL secundaria (si existe) */}
                          {enlace.url2 && (
                            <button
                              onClick={() => handleLinkClick({ ...enlace, url: enlace.url2 })}
                              style={{
                                background: 'linear-gradient(135deg, #FF8C00, #FF4500)',
                                color: '#fff',
                                borderRadius: '6px',
                                padding: '6px 14px',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                transition: 'all 0.2s ease-in-out',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                              🎬 Watch
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {selectedLink && (
        <div className="popup-container">
          <Hito selectedLink={selectedLink} />
          <button onClick={() => setSelectedLink(null)} className="close-popup">
            ✖
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
