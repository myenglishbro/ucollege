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
  const [isExpanded, setIsExpanded] = useState(false);

  const validCode = 'nocode'; // Este es el código que debe ingresar el usuario para acceder al PDF
  const toggleSize = () => {
    setIsExpanded(!isExpanded);
  };
  const printNotes = () => {
    const printWindow = window.open("", "_blank");
  
    // Estilos personalizados para la impresión
    const styles = `
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 40px;
          color: #333;
        }
        h1 {
          font-size: 22px;
          color: #2C3E50;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 15px;
        }
        .notes-container {
          display: grid;
          grid-template-columns: 1fr 1fr; /* Dos columnas */
          gap: 20px;
        }
        .notes-content {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .notes-content span {
          background-color: #FFFF00; /* Resaltado amarillo */
        }
      </style>
    `;
  
    // Estructura del contenido impreso
    printWindow.document.write(styles);
    printWindow.document.write(`<h1>My Notes</h1>`);
    printWindow.document.write(`<div class="notes-container"><div class="notes-content">${notes}</div></div>`);
    printWindow.document.close();
  
    // Abre la ventana de impresión
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
    if (url.includes('forms.office.com')) {
      if (url.includes('/r/')) {
        // Convierte la URL corta en la versión embebida
        return url.replace('/r/', '/Pages/ResponsePage.aspx?id=') + '&embed=true';
      } 
      // Si ya es una URL larga, solo aseguramos que tenga '&embed=true'
      return url.includes('&embed=true') ? url : url + '&embed=true';
    }
    if (url.includes('flippity.net')) {
      // Aseguramos que la URL esté embebida y en minúsculas, extrayendo el parámetro 'k'
      return `https://www.flippity.net/fc.php?k=${url.split('k=')[1]}`;
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
      src="https://i.ibb.co/CpM0rk4q/logo-removebg-preview.png"
      className="opacity-30 w-full h-full object-contain"
      alt="sda"
      style={{
        transform: 'rotate(45deg)',
        opacity: 0.1, // Puedes ajustar la opacidad si lo deseas
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
        <div className="loader-container absolute top-10 left-0 w-full h-[150px] flex flex-col justify-center items-center bg-black bg-opacity-5 backdrop-blur-sm  z-50">
          <div className="flex flex-col items-center">
            <img
              src="https://i.ibb.co/0RsdKWdT/logo-removebg-preview.png"
              alt="Loading animation"
              className="w-20 h-20 animate-pulse drop-shadow-lg"
            />
            <p className="text-xl text-purple-400 font-semibold mt-4 animate-bounce">
              Let me think please!  Wait a sec...
            </p>
          </div>
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
            <div className="relative flex bg-[#1c1c24] p-4 rounded-2xl shadow-lg">
      {/* Botón para abrir el notepad */}
      <button
        onClick={() => setShowNotepad(!showNotepad)}
        className="absolute left-[-60px] top-10 bg-purple-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition"
      >
        📝
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
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} border-4 rounded-lg shadow-lg border-purple-700`}
      ></iframe>

{showNotepad && (
  <div
  className={`fixed top-0 ${
    isExpanded ? "left-[50px] top-20  w-[1050px] h-[480px]" : "left-[50px] top-20 w-[300px]  h-[450px]"
  } bg-[#13131a] border border-purple-600 rounded-lg shadow-xl p-3 flex flex-col text-white transition-all duration-300`}
  style={{ zIndex: 9999 }}
>

    {/* Botones de formato */}
    <div className="flex space-x-2 mb-2">
      <select
        onChange={(e) => document.execCommand("fontSize", false, e.target.value)}
        className="px-2 py-1 bg-gray-800 text-white rounded"
      >
        <option value="1">Small</option>
        <option value="3" selected>Medium</option>
        <option value="5">Big</option>
      </select>

      <button onClick={() => document.execCommand("bold")} className="px-2 py-1 text-white bg-purple-600 rounded hover:bg-purple-700">B</button>
      <button onClick={() => document.execCommand("italic")} className="px-2 py-1 text-white bg-purple-600 rounded hover:bg-purple-700">I</button>
      <button onClick={() => document.execCommand("underline")} className="px-2 py-1 text-white bg-purple-600 rounded hover:bg-purple-700">U</button>
      <button onClick={() => document.execCommand("backColor", false, "#FFFF00")} className="px-2 py-1 text-black bg-yellow-400 rounded hover:bg-yellow-500">H</button>
    </div>

    {/* Área editable con scroll mejorado */}
    <div
      className="w-full flex-grow p-2 border border-gray-700 rounded-lg text-white bg-[#1c1c24] overflow-auto"
      contentEditable
      placeholder="Take notes here..."
      onInput={(e) => setNotes(e.target.innerHTML)}
      style={{
        minHeight: isExpanded ? "350px" : "250px",
        maxHeight: isExpanded ? "300px" : "550px",
        outline: "none",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
      }}
    ></div>

   {/* Contenedor de botones */}
<div className="mt-2 flex justify-end space-x-2">
  {/* Botón de impresión */}
  <button
    onClick={printNotes}
    className="p-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
    title="Print Notes"
  >
    🖨️
  </button>

  {/* Botón para expandir/cerrar */}
  <button
    onClick={() => setIsExpanded(!isExpanded)}
    className="p-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
    title={isExpanded ? "Collapse" : "Expand"}
  >
    {isExpanded ? "🔽" : "🔼"}
  </button>
</div>

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
