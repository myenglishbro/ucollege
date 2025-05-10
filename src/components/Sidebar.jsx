import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Hito from '../pages/Hito';
import { mensajes } from '../utils/mensajes';
import { FaCheck, FaBookOpen, FaPencilAlt, FaVideo } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { GiCrossedSGiBrain, GiBattleAxe, GiShieldCrossed, GiBrain, GiOpenBook, GiRocketThruster, GiHealthPotion, GiCrossedSwords } from 'react-icons/gi';

const Sidebar= ({ road, seleccionarNivel, isSidebarVisible, toggleSidebar }) => {
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
// Nuevo estado para los enlaces desbloqueados
const [unlockedLinks, setUnlockedLinks] = useState([]);

// Estado para almacenar el enlace actualmente bloqueado (cuando se haga clic en "Locked")
const [currentLockedLink, setCurrentLockedLink] = useState(null);
// Estado para el input del código en el modal
const [codeInputForPopup, setCodeInputForPopup] = useState("");




  // Estados nuevos para el popup de recompensa
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [reward, setReward] = useState('');
  const [rewardDescription, setRewardDescription] = useState('');




  
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
      // Asignamos la imagen y la descripción de recompensa. Puedes usar una propiedad específica o, de no existir, el description general.
      setReward(elemento.reconpensa);
      setRewardDescription(elemento.reconpensaDescripcion || elemento.description);
      setShowRewardPopup(true);
    } else {
      alert("Código incorrecto");
    }
  };


  const handleValidateLinkCode = (enlaceKey) => {
    const userCode = codeInputs[enlaceKey] || "";
    // Buscamos el enlace correspondiente entre todos los enlaces
    const enlace = road.flatMap(item => item.enlaces).find(e => e.titulo === enlaceKey);
    
    if (!enlace) {
      alert("Enlace no encontrado.");
      return;
    }
  
    if (userCode === enlace.codigo) {
      setUnlockedLinks(prev => [...prev, enlaceKey]);
      alert("¡Enlace desbloqueado!");
    } else {
      alert("Código incorrecto");
    }
  };
  


  const handleValidateLinkCodePopup = () => {
    if (!currentLockedLink) return;
  
    if (codeInputForPopup === currentLockedLink.codigo) {
      setUnlockedLinks(prev => [...prev, currentLockedLink.titulo]);
      alert("¡Enlace desbloqueado!");
      setCurrentLockedLink(null);
      setCodeInputForPopup("");
    } else {
      alert("Código incorrecto");
    }
  };
  



  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''} bg-gray-800 text-white w-72 h-full fixed shadow-lg overflow-y-auto custom-scrollbar`}>
        <div className="timer-container">
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
          <di
          v className="timer-buttons">
          <button onClick={startTimer} className="timer-button start">
            
          </button>
          <button onClick={stopTimer} className="timer-button stop">
            
          </button>
        </di>
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
                padding: '15px 20px ',
                border: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                marginBottom: '10px',
                alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
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
                  {elemento.enlaces.map((enlace, i) => {
  const requiresCode = Boolean(enlace.codigo);
  const isUnlocked = unlockedLinks.includes(enlace.titulo);

  if (requiresCode && !isUnlocked) {
    // En lugar de mostrar el input inline, mostramos un botón que abre el modal
    return (
      <div
  key={i}
  className="timeline-item"
  style={{
    padding: '16px',
    margin: '10px auto',
    maxWidth: '600px',
    background: '#334155',
    borderRadius: '8px',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }}
>
  <h4 style={{ fontWeight: 'bold', margin: 0 }}>
    {`${i + 1}. ${enlace.titulo}`}
  </h4>
  <p
    style={{
      fontSize: '14px',
      color: '#CBD5E1',
      fontStyle: 'italic',
      margin: 0,
    }}
  >
    {enlace.descripcion}
  </p>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <button
      onClick={() => {
        setCurrentLockedLink(enlace);
        setCodeInputForPopup("");
      }}
      style={{
        background: 'linear-gradient(135deg, #1f1c2c, #928DAB)',
        color: '#fff',
        borderRadius: '8px',
        padding: '8px 16px',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s ease-in-out',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = 'scale(1.1)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = 'scale(1)')
      }
      title="Unlock with code"
      aria-label="Unlock with code"
    >
      <FaLock />
    </button>

    </div>
</div>
    );
  } else {
    // Si el enlace no requiere código o ya fue desbloqueado, se muestra el contenido normal.
    return (
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
    gap: '20px',
  }}
>
  {/* Contenido (título y descripción) */}
  <div style={{ flex: 1 }}>
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
  <p
    style={{
      fontSize: '14px',
      color: '#CBD5E1',
      fontStyle: 'italic',
      marginBottom: '12px',
      lineHeight: 1.4,
    }}
  >
    {enlace.descripcion}
  </p>
  </div>

  {/* Botones */}
 <div
    style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columnas iguales
    gap: '8px',                             // espacio entre botones
  }}
  >
    <button
      onClick={() => handleLinkClick(enlace)}
      style={{
        background: viewedItems?.includes(enlace.titulo)
          ? 'linear-gradient(135deg, #1E90FF, #0073E6)'
          : 'linear-gradient(135deg, #004AAD, #001F3F)',
        color: '#fff',
        borderRadius: '4px',
        padding: '4px 12px',
        border: 'none',
        fontWeight: 600,
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        display: 'flex',
              justifyContent: 'flex-start',

        alignItems: 'center',
        gap: '4px',
      }}
      aria-label={viewedItems?.includes(enlace.titulo) ? "Slide viewed" : "View slide"}
    >
      {viewedItems?.includes(enlace.titulo) ? <FaCheck /> : <FaBookOpen />}
    </button>

 {enlace.url2 && (
      <button
        onClick={() => handleLinkClick({ ...enlace, url: enlace.url2 })}
        style={{
          background: 'linear-gradient(135deg, #FF8C00, #FF4500)',
          color: '#fff',
          borderRadius: '4px',
          padding: '4px 12px',
          border: 'none',
          fontWeight: 600,
          fontSize: '13px',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
        aria-label="Watch video"
      >
        <FaVideo />
      </button>
    )}












    {enlace.url3 && (
      <button
        onClick={() => handleLinkClick({ ...enlace, url: enlace.url3 })}
        style={{
          background: 'linear-gradient(135deg, #004AAD, #001F3F)',
          color: '#fff',
          borderRadius: '4px',
          padding: '4px 12px',
          border: 'none',
          fontWeight: 600,
          fontSize: '13px',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
        aria-label="Take test"
      >
        <FaPencilAlt />
      </button>
    )}

   
    {enlace.url4 && (
  <button
    onClick={() => handleLinkClick({ ...enlace, url: enlace.url4 })}
    style={{
      background: 'linear-gradient(135deg, #FF8C00, #FF4500)', // Naranja a rojo
      color: '#fff',
      borderRadius: '4px',
      padding: '4px 12px',
      border: 'none',
      fontWeight: 600,
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }}
    aria-label="Desafío"
  >
  <GiRocketThruster  />   </button>
)}

{enlace.url5 && (
  <button
    onClick={() => handleLinkClick({ ...enlace, url: enlace.url5 })}
    style={{
      background: 'linear-gradient(135deg, #FF8C00, #FF4500)', // Naranja a rojo
      color: '#fff',
      borderRadius: '4px',
      padding: '4px 12px',
      border: 'none',
      fontWeight: 600,
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }}
    aria-label="Desafío"
  >
    <GiHealthPotion  />
  </button>
)}

{enlace.url6 && (
  <button
    onClick={() => handleLinkClick({ ...enlace, url: enlace.url6 })}
    style={{
      background: 'linear-gradient(135deg, #FF8C00, #FF4500)', // Naranja a rojo
      color: '#fff',
      borderRadius: '4px',
      padding: '4px 12px',
      border: 'none',
      fontWeight: 600,
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }}
    aria-label="Desafío"
  >
      <GiCrossedSwords />

  </button>
)}





  </div>
</div>

    );
  }
})}


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
     


      {showRewardPopup && (
  <div
    id="reward-popup"
    role="dialog"
    aria-modal="true"
    tabIndex={-1}
    onKeyDown={(e) => {
      if (e.key === "Escape") setShowRewardPopup(false);
    }}
    onClick={(e) => {
      if (e.target === e.currentTarget) setShowRewardPopup(false);
    }}
    className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-85 animate-fadeInUp"
  >
    {/* Contenedor interno con overlay y fondo */}
    <div
      className="relative flex flex-col md:flex-row items-center gap-6 w-full max-w-3xl ml-10 p-6 rounded-xl border border-gray-700 shadow-2xl overflow-hidden bg-overlay"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/fG47Jd8b/DALL-E-2025-03-14-16-28-39-A-futuristic-dark-cyberpunk-background-featuring-a-neon-lit-environment-T.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Capa de burbujas */}
      <div className="bubbles absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={index} style={{ "--i": index + 10 }}></span>
        ))}
      </div>

      {/* Sección de la Card */}
      <div className="futuristic-card-container relative w-full md:w-2/3">
        <div className="futuristic-card w-64 md:w-90 sm:w-72 rounded-xl overflow-hidden relative mx-auto">
          <div className="futuristic-card-content" style={{ zIndex: 2 }}>
            <h2 className="card-title">Epic Reward</h2>
            <p className="card-subtitle">
              You have acquired a legendary artifact of immense power!
            </p>
            <div className="futuristic-image-container mb-4">
              <div className="holo-overlay"></div>
              <div className="futuristic-particles"></div>
              <img
                src={reward}
                alt="Reward"
                className="futuristic-image"
              />
            </div>
            <p className="card-description">{rewardDescription}</p>
          </div>
        </div>
      </div>

      {/* Sección de Botones */}
      <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
        <button
          onClick={() => setShowRewardPopup(false)}
          className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-gray-100 font-bold py-2 px-6 rounded-full transition-all w-full"
        >
          Close
        </button>
           
      </div>
    </div>
  </div>
)}

 
{currentLockedLink && (
  <div
    className="modal-overlay"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
    }}
  >
    <div
      className="modal-content"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '24px',
        width: '320px',
        textAlign: 'center',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <h3 style={{ color: '#fff', marginBottom: '16px', fontSize: '1.5rem' }}>
        Desbloquear enlace
      </h3>
      <p style={{ color: '#ddd', marginBottom: '16px', fontSize: '1rem' }}>
        Ingresa el código para desbloquear: <br />
        <strong>{currentLockedLink.titulo}</strong>
      </p>
      <input
        type="text"
        placeholder="Ingresa el código"
        value={codeInputForPopup}
        onChange={(e) => setCodeInputForPopup(e.target.value)}
        style={{
          padding: '12px',
          width: '100%',
          marginBottom: '16px',
          borderRadius: '8px',
          border: 'none',
          outline: 'none',
          background: 'rgba(255, 255, 255, 0.2)',
          color: '#fff',
          fontSize: '1rem',
        }}
      />
      <button
        onClick={() => handleValidateLinkCodePopup()}
        style={{
          padding: '12px 0',
          background: 'linear-gradient(135deg, #6EE7B7, #3B82F6)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          width: '100%',
          cursor: 'pointer',
          fontSize: '1rem',
          marginBottom: '12px',
        }}
      >
        Enviar código
      </button>
      <button
        onClick={() => {
          setCurrentLockedLink(null);
          setCodeInputForPopup("");
        }}
        style={{
          padding: '12px 0',
          background: 'rgba(255, 0, 0, 0.7)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          width: '100%',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Cancelar
      </button>
    </div>
  </div>
)}





    </>
  );
};

export default Sidebar;
