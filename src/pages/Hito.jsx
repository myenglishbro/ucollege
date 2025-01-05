import React, { useEffect, useState } from 'react';

const Hito = ({ selectedLink }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Estado para la alerta

  useEffect(() => {
    if (selectedLink) {
      setIsLoading(true);
      if (selectedLink.url.includes('quizlet.com')) {
        setShowModal(true);
        setOverlayActive(true);
        openPopup(selectedLink.url);
      }
    }

    // Detectar intentos de inspección
    const handleContextMenu = (e) => {
      e.preventDefault();
      setShowAlert(true);
    };

    const handleKeyDown = (e) => {
      // Bloquear F12 y Ctrl + Shift + I (para inspección)
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        setShowAlert(true);
      }

      // Bloquear Ctrl + C
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        setShowAlert(true);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedLink]);

  const getEmbedUrl = (url) => {
    if (url.includes('wordwall.net')) {
      return url.replace('https://wordwall.net/play/', 'https://wordwall.net/embed/play/');
    }
    if (url.includes('youtu.be') || url.includes('youtube.com')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('drive.google.com')) {
      const fileId = url.split('/d/')[1]?.split('/')[0];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return '';
  };

  const openPopup = (url) => {
    const width = 800;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(
      url,
      'QuizletPopup',
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
    );

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      setPopupBlocked(true);
      setShowModal(false);
      setOverlayActive(false);
    } else {
      setShowModal(false);
      setOverlayActive(false);
    }
  };

  return (
    <div className="hito-container mt-6 p-4 bg-white rounded shadow-md w-full max-w-3xl mx-auto transition-all ease-in-out duration-300 relative">
      {/* Overlay gris que cubre la página */}
      {overlayActive && (
        <div className="overlay fixed inset-0 bg-gray-500 opacity-50 z-40"></div>
      )}

      {/* Alerta para el intento de inspección */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4 animate-bounce max-w-xs w-full">
            <img
              src="https://i.ibb.co/cDR4rhr/My-english-bro-Personajek-10.png"
              alt="Alert icon"
              className="w-10 h-10"
            />
            <div>
              <h2 className="text-lg font-bold">¡No hagas esto! 🚫</h2>
              <p className="text-sm">
                Crear contenido toma tiempo y esfuerzo. Por favor, respeta nuestro trabajo.
              </p>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="bg-white text-red-500 font-bold rounded px-3 py-1"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {selectedLink ? (
        <>
          {isLoading && (
            <div className="loader-container flex flex-col justify-center items-center h-[450px]">
              <img
                src="https://i.ibb.co/cDR4rhr/My-english-bro-Personajek-10.png"
                alt="Loading animation"
                className="w-16 h-16 animate-spin"
              />
              <p className="text-lg text-blue-600 font-semibold mt-4">Let me think, my bro! Wait a sec...</p>
            </div>
          )}

          {selectedLink.url.includes('quizlet.com') ? (
            <>
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                    <h2 className="text-xl font-semibold text-blue-600">Abriendo Quizlet...</h2>
                    <p className="mt-4 text-gray-600">Estamos preparando todo para ti. Por favor, espera un momento.</p>
                    <div className="mt-4">
                      <img
                        src="https://i.ibb.co/cDR4rhr/My-english-bro-Personajek-10.png"
                        alt="Loading"
                        className="w-12 h-12 animate-spin mx-auto"
                      />
                    </div>
                  </div>
                </div>
              )}

              {popupBlocked && (
                <div className="text-center text-red-600 mt-4">
                  <p>El popup ha sido bloqueado. Por favor, permite popups en tu navegador.</p>
                </div>
              )}
            </>
          ) : (
            <iframe
              src={getEmbedUrl(selectedLink.url)}
              title={selectedLink.titulo}
              width="100%"
              height="450px"
              frameBorder="0"
              allow="fullscreen"
              onLoad={() => setIsLoading(false)}
              className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            ></iframe>
          )}

          {selectedLink.url.includes('drive.google.com') && (
            <div
              className="absolute top-0 right-0 w-[80px] h-[80px] bg-black/75 text-white flex justify-center items-center rounded-full z-10"
              style={{
                top: '10px',
                right: '10px',
                cursor: 'not-allowed',
              }}
            >
              <p className="text-xs font-bold text-center">Premium<br />Content</p>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">Selecciona un enlace para visualizar el contenido.</p>
      )}
    </div>
  );
};

export default Hito;
