import React, { useEffect, useState } from 'react';

const Hito = ({ selectedLink }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState('');
  const [showNotepad, setShowNotepad] = useState(false);
  const [notes, setNotes] = useState("");
  const validCode = 'mybrosecretpw'; // Este es el código que debe ingresar el usuario para acceder al PDF

  const printNotes = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<pre>${notes}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  const handleCodeSubmit = () => {
    if (enteredCode === validCode) {
      setIsCodeValid(true);
      setError('');
    } else {
      setError('Incorrect code. Please try again.');
    }
  };
  useEffect(() => {
    if (selectedLink) {
      setIsLoading(true);
      if (selectedLink.url.includes('quizlet.com')) {
        setShowModal(true);
        setOverlayActive(true);
        openPopup(selectedLink.url);
      }
    }

    // Detectar intentos de inspección y capturas de pantalla
    const handleContextMenu = (e) => {
      e.preventDefault();
      setShowAlert(true);
    };

    const handleKeyDown = (e) => {
      // Bloquear F12, Ctrl + Shift + I, y capturas de pantalla
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
        setShowAlert(true);
      }

      // Simular pantalla negra al presionar PrintScreen
      if (e.key === 'PrintScreen') {
        setShowBlackScreen(true);
        setTimeout(() => setShowBlackScreen(false), 2000); // Pantalla negra por 2 segundos
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

      {/* Pantalla negra temporal */}
      {showBlackScreen && (
        <div className="fixed inset-0 bg-black z-50"></div>
      )}

      {/* Marca de agua dinámica */}
      <div className="fixed inset-0 pointer-events-none z-30">
  <div
    className="w-full h-full text-gray-300 opacity-30 flex items-center justify-center"
    style={{
      transform: 'rotate(-45deg)',
      whiteSpace: 'nowrap',
    }}
  >
    <img
      src="https://i.ibb.co/xsLbfhf/Fondos-de-zoom-10.png"
      className="opacity-30 w-full h-full object-contain"
      alt="sda"
      style={{
        transform: 'rotate(45deg)',
        opacity: 0.3, // Puedes ajustar la opacidad si lo deseas
      }}
    />
  </div>
</div>


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
            
            <div className="relative flex">
  {/* Botón para abrir el notepad */}
  <button
    onClick={() => setShowNotepad(!showNotepad)}
    className="absolute left-[-60px] top-10 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
  >
    📝 Notepad
  </button>

  {/* Iframe */}
  <iframe
    src={getEmbedUrl(selectedLink.url)}
    title={selectedLink.titulo}
    width="100%"
    height="450px"
    frameBorder="0"
    allow="fullscreen"
    onLoad={() => setIsLoading(false)}
    className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} border-4 rounded-lg shadow-lg`}
    style={{
      borderImageSource:
        "url('https://upload.wikimedia.org/wikipedia/commons/3/3a/Green_blackboard_with_chalk.jpg')",
      borderImageSlice: 1,
      borderWidth: "10px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  ></iframe>

  {/* Notepad Modal */}
  {showNotepad && (
    <div
      className="absolute left-[-360px] top-0 w-[300px] h-[450px] bg-white border rounded-lg shadow-lg p-3"
      style={{
        color: "#333",
        zIndex: 9999, // Asegura que el notepad esté por encima de todo
      }}
    >
      <div className="flex space-x-2 mb-2">
        {/* Botones de formato de texto */}
        <button
          onClick={() => document.execCommand("bold")}
          className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          B
        </button>
        <button
          onClick={() => document.execCommand("italic")}
          className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          I
        </button>
        <button
          onClick={() => document.execCommand("underline")}
          className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          U
        </button>
      </div>

      {/* Área editable para notas */}
      <div
        className="w-full h-[85%] p-2 border rounded-lg text-black overflow-auto"
        contentEditable
        placeholder="Take notes here..."
        value={notes}
        onInput={(e) => setNotes(e.target.innerHTML)}
        style={{
          minHeight: '200px',
          outline: 'none',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        }}
      ></div>

      <button
        onClick={printNotes}
        className="mt-2 w-full bg-green-600 text-white py-2 px-3 rounded-lg shadow hover:bg-green-700 transition"
      >
        🖨️ Print Notes
      </button>
    </div>
  )}
</div>








           
          )}

          {selectedLink.url.includes('drive.google.com') && !isCodeValid && (
  <div
    onClick={() => setShowModal(true)} // Abre el modal al hacer clic
    className="absolute top-4 right-4 w-[100px] h-[100px] bg-black/75 text-white rounded-full flex items-center justify-center z-10 cursor-pointer shadow-lg"
  >
    <p className="text-xs text-center font-semibold">
      🔒 Premium<br />Content
    </p>
  </div>
)}


{showModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-20">
    <div className="bg-white w-[250px] p-5 rounded-lg shadow-lg text-center">
      <p className="text-sm font-semibold text-gray-700">🔒 Enter Code</p>
      <p className="text-xs text-gray-500 mt-2">
        Please enter the access code to unlock.
      </p>
      <input
        type="text"
        placeholder="Code"
        value={enteredCode}
        onChange={(e) => setEnteredCode(e.target.value)}
        className="mt-3 px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring focus:ring-blue-200 w-full"
      />
      <button
        onClick={() => {
          handleCodeSubmit();
          setShowModal(false); // Cierra el modal después de enviar
        }}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm w-full"
      >
        Submit
      </button>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <button
        onClick={() => setShowModal(false)} // Cierra el modal al cancelar
        className="mt-3 text-gray-600 text-sm underline"
      >
        Cancel
      </button>
    </div>
  </div>
)}

{isCodeValid && (
  <div
    className="absolute top-4 right-4 w-[150px] h-[150px] bg-white/80 shadow-md rounded-lg flex flex-col items-center justify-center z-10 p-3 backdrop-blur"
  >
    <p className="text-xs font-semibold text-gray-700 text-center mb-1">
      ✅ Access Granted
    </p>
    <button
      onClick={() => {
        window.open(selectedLink.url, '_blank');
        setIsCodeValid(false); // Resetea estado después de abrir el PDF
        setEnteredCode('');
      }}
      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-[10px] w-full"
    >
      View PDF
    </button>
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
