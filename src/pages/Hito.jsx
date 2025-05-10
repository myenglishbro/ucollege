import React, { useEffect, useState, useRef } from 'react';
import TextBoxOverlay from './TextBoxOverlay';
import { FiMaximize } from 'react-icons/fi';
import { FiEdit, FiX } from 'react-icons/fi';
import { FiLock } from 'react-icons/fi';
import { FiPenTool } from 'react-icons/fi';
import { FiPrinter, FiMinimize } from 'react-icons/fi';

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

  const [fontSize, setFontSize] = useState("20");


  // Estado para la caja de texto
  const [textMode, setTextMode] = useState(false);
  const [overlayText, setOverlayText] = useState("");
  // Estado para detectar si estamos en pantalla completa
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Ref para el contenedor principal (que se usará para fullscreen)
  const containerRef = useRef(null);

  const validCode = 'nocode';

  const toggleSize = () => {
    setIsExpanded(!isExpanded);
  };

  const printNotes = () => {
    const printWindow = window.open("", "_blank");
    const styles = `
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 40px;
          color: #333;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 2px solid #2C3E50;
          padding-bottom: 10px;
        }
        .logo {
          width: 80px;
          height: auto;
        }
        .date {
          font-size: 14px;
          color: #555;
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
          grid-template-columns: 1fr;
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
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .footer {
          text-align: center;
          font-size: 12px;
          margin-top: 30px;
          color: #777;
        }
      </style>
    `;
    const date = new Date().toLocaleDateString();
    printWindow.document.write(styles);
    printWindow.document.write(`
      <div class="header">
        <img src="https://i.ibb.co/CpM0rk4q/logo-removebg-preview.png" class="logo" alt="Logo" />
        <span class="date">Fecha: ${date}</span>
      </div>
      <h1>Mis Notas</h1>
      <div class="notes-container">
        <div class="notes-content">${notes}</div>
      </div>
      <div class="footer">Generado automáticamente por la aplicación</div>
    `);
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

    const handleContextMenu = (e) => {
      e.preventDefault();
      setShowAlert(true);
    };

    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
        setShowAlert(true);
      }
      if (e.key === 'PrintScreen') {
        setShowBlackScreen(true);
        setTimeout(() => setShowBlackScreen(false), 2000);
      }
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        setShowAlert(true);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Evento para detectar cambios en el estado de fullscreen
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [selectedLink]);

const getEmbedUrl = (url) => {
  if (url.includes('wordwall.net')) {
    return url.replace(
      'https://wordwall.net/play/',
      'https://wordwall.net/embed/play/'
    );
  }
  if (url.includes('youtu.be') || url.includes('youtube.com')) {
    const videoId =
      url.split('v=')[1]?.split('&')[0] ||
      url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('drive.google.com')) {
    const fileId = url.split('/d/')[1]?.split('/')[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  if (url.includes('forms.office.com')) {
    if (url.includes('/r/')) {
      return (
        url.replace('/r/', '/Pages/ResponsePage.aspx?id=') +
        '&embed=true'
      );
    }
    return url.includes('&embed=true')
      ? url
      : url + '&embed=true';
  }
  

  // Si no es ninguno de los anteriores, devolvemos la URL tal cual
  return url;
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

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) =>
          console.error("Error al activar pantalla completa:", err)
        );
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`hito-container mt-1 p-4 bg-white rounded shadow-md w-full ${isFullscreen ? 'h-screen' : 'h-[530px]'} max-w-3xl mx-auto transition-all ease-in-out duration-300 relative`}
    >
      {/* Overlay gris */}
      {overlayActive && (
        <div className="overlay fixed inset-0 bg-gray-500 opacity-50 z-40"></div>
      )}
      {/* Pantalla negra temporal */}
      {showBlackScreen && (
        <div className="fixed inset-0 bg-black z-50"></div>
      )}
      {/* Alerta de inspección */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60 backdrop-blur-md">
          <div className="bg-red-600 text-white p-6 rounded-2xl shadow-2xl flex items-center space-x-4 animate-pulse max-w-sm w-full border border-red-800">
            <img
              src="https://i.ibb.co/cDR4rhr/My-english-bro-Personajek-10.png"
              alt="Alert icon"
              className="w-12 h-12 drop-shadow-lg"
            />
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl font-extrabold">⚠️ ¡No hagas esto!</h2>
              <p className="text-sm opacity-90 leading-tight">
                Este contenido requiere respeto. Por favor, evita inspeccionarlo.
              </p>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="bg-white text-red-600 font-bold rounded-lg px-4 py-2 shadow-md hover:bg-gray-200 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {selectedLink ? (
        <>
          {isLoading && (
            <div className="loader-container absolute top-10 left-0 w-full h-[150px] flex flex-col justify-center items-center bg-black bg-opacity-5 backdrop-blur-sm z-50">
              <div className="flex flex-col items-center">
                {/* Loader */}
              </div>
            </div>
          )}

          {selectedLink.url.includes('quizlet.com') ? (
            <>
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                    <h2 className="text-xl font-semibold text-blue-600">
                      Abriendo Quizlet...
                    </h2>
                    <p className="mt-4 text-gray-600">
                      Estamos preparando todo para ti. Por favor, espera un momento.
                    </p>
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
                  <p>
                    El popup ha sido bloqueado. Por favor, permite popups en tu
                    navegador.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="relative flex bg-[#1c1c24] p-4 rounded-2xl shadow-lg">
              {/* Botón para abrir el notepad */}
              <button
            onClick={() => setShowNotepad(!showNotepad)}
            className="absolute left-[-20px] top-28 flex items-center justify-center w-10 h-10 bg-white/30 backdrop-blur-md rounded-full shadow-md hover:bg-white/40 transition duration-300 z-50"
          >
            <FiPenTool className="text-white" size={20} />
          </button> 

              <div
                className={`relative w-full ${isFullscreen ? "h-[920px]" : "h-[450px]"} rounded-3xl overflow-hidden`}
  style={{
    backgroundImage: 'linear-gradient(135deg, rgb(0, 74, 173), rgb(0, 31, 63))',
    color: 'rgb(255, 255, 255)',
    boxShadow: '0 4px 20px rgba(0,74,173,0.4), 0 0 40px rgba(0,31,63,0.6)',
    transition: 'all 0.3s ease-in-out',
  }}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <span className="animate-spin h-12 w-12 mt-1 border-4 border-t-transparent border-purple-500 rounded-full"></span>
                  </div>
                )}

                <iframe
    src={getEmbedUrl(selectedLink.url)}
    title={selectedLink.titulo}
    className={`w-full h-full transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
    frameBorder="0"
    allow="fullscreen"
    onLoad={() => setIsLoading(false)}
    style={{
      borderRadius: "12px",
      transition: "transform 0.3s ease-in-out",
    }}
  ></iframe>
              </div>
              {showNotepad && (
  <div
    className={`fixed top-0 ${
      isExpanded
        ? "left-[50px] top-20 w-[1050px] h-[480px]"
        : "left-[50px] top-20 w-[300px] h-[450px]"
    } bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl p-4 flex flex-col text-white transition-all duration-300`}
    style={{ zIndex: 9999 }}
  >
    {/* Barra de herramientas */}
    <div className="flex items-center space-x-2 mb-3">
      {/* Combo box para tamaño de fuente */}
      <select
        value={fontSize}
        onChange={(e) => {
          const newSize = e.target.value;
          setFontSize(newSize);

          const selection = window.getSelection();
          if (selection && !selection.isCollapsed) {
            // Si hay texto seleccionado, lo envolvemos en un span con el nuevo tamaño
            const range = selection.getRangeAt(0);
            // Creamos un span y asignamos el estilo
            const span = document.createElement("span");
            span.style.fontSize = `${newSize}px`;
            // Intentamos envolver la selección con el span
            try {
              range.surroundContents(span);
            } catch (error) {
              // Si la selección es compleja, usamos execCommand
              document.execCommand("styleWithCSS", false, true);
              document.execCommand("fontSize", false, "7");
              // Reemplazamos los elementos <font size="7">
              const editor = document.getElementById("notepadEditor");
              const fonts = editor.getElementsByTagName("font");
              for (let i = fonts.length - 1; i >= 0; i--) {
                const fontElem = fonts[i];
                if (fontElem.getAttribute("size") === "7") {
                  fontElem.removeAttribute("size");
                  fontElem.style.fontSize = `${newSize}px`;
                }
              }
            }
          }
          // Si no hay selección, el nuevo texto que se ingrese usará el nuevo tamaño.
          // (Esto depende de que el navegador mantenga el estilo del caret)
        }}
        className="px-2 py-1 bg-white text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="30">30</option>
        <option value="36">36</option>
        <option value="40">40</option>
      </select>
      
      {/* Botones de formato */}
      <button
        onClick={() => document.execCommand("bold")}
        className="px-2 py-1 bg-white/20 text-white rounded border border-white/20 hover:bg-white/30 transition"
        title="Negrita"
      >
        B
      </button>
      <button
        onClick={() => document.execCommand("italic")}
        className="px-2 py-1 bg-white/20 text-white rounded border border-white/20 hover:bg-white/30 transition"
        title="Cursiva"
      >
        I
      </button>
      <button
        onClick={() => document.execCommand("underline")}
        className="px-2 py-1 bg-white/20 text-white rounded border border-white/20 hover:bg-white/30 transition"
        title="Subrayado"
      >
        U
      </button>
    </div>

    {/* Área editable */}
    <div
      id="notepadEditor"
      className="w-full flex-grow p-3 border border-white/20 rounded-lg bg-[#1c1c24] bg-opacity-70 overflow-auto transition leading-relaxed"
      contentEditable
      placeholder="Toma notas aquí..."
      onInput={(e) => setNotes(e.target.innerHTML)}
      style={{
        minHeight: isExpanded ? "350px" : "250px",
        maxHeight: isExpanded ? "300px" : "550px",
        outline: "none",
        fontFamily: "Inter, sans-serif",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        lineHeight: "1.6",
        // No se fija fontSize aquí para que el contenido conserve sus propios estilos.
      }}
    ></div>

    {/* Botones de acción */}
    <div className="mt-3 flex justify-end space-x-2">
      <button
        onClick={printNotes}
        className="p-2 bg-white/30 backdrop-blur-md text-white rounded-full shadow-md hover:bg-white/40 transition duration-200"
        title="Imprimir Notas"
      >
        <FiPrinter size={20} />
      </button>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 bg-white/30 backdrop-blur-md text-white rounded-full shadow-md hover:bg-white/40 transition duration-200"
        title={isExpanded ? "Contraer" : "Expandir"}
      >
        {isExpanded ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
      </button>
    </div>
  </div>
)}




            </div>
          )}

          {selectedLink.url.includes('drive.google.com') && !isCodeValid && (
            <div
    onClick={() => setShowModal(true)}
    className="absolute top-4 right-4 flex items-center justify-center w-20 h-20 bg-black/75 rounded-full z-10 cursor-pointer shadow-lg transition hover:bg-black/90"
  >
    <FiLock className="text-white" size={20} />
  </div>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-30">
              <div className="bg-gray-900 w-[280px] p-6 rounded-2xl shadow-xl text-center text-white border border-gray-700">
                <p className="text-base font-semibold flex items-center justify-center gap-2">
                  🔒 <span>Enter Code</span>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Please enter the access code to unlock.
                </p>
                <input
                  type="text"
                  placeholder="Enter your code"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="mt-4 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
                <button
                  onClick={() => {
                    handleCodeSubmit();
                    setShowModal(false);
                  }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm w-full font-medium shadow-md transition-all duration-200 transform hover:scale-105"
                >
                  Submit
                </button>
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 text-gray-400 text-sm underline hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {isCodeValid && (
            <div className="absolute top-4 right-4 w-[160px] h-[160px] bg-white/30 shadow-xl rounded-2xl flex flex-col items-center justify-center z-20 p-4 backdrop-blur-lg border border-white/20 transition-all duration-300">
              <p className="text-sm font-semibold text-gray-800 text-center mb-2 flex items-center gap-1">
                <span className="text-green-500 text-lg">✔</span> Access Granted
              </p>
              <button
                onClick={() => {
                  const popup = window.open(selectedLink.url, 'PDFViewer', 'width=600,height=800');
                  if (!popup) {
                    alert('Popup blocked! Please allow popups for this site.');
                  }
                  setIsCodeValid(false);
                  setEnteredCode('');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs w-full font-medium shadow-md transition-all duration-200 transform hover:scale-105"
              >
                View PDF
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">
          Selecciona un enlace para visualizar el contenido.
        </p>
      )}

      {/* Botón para activar/desactivar la caja de texto */}
      <button
  onClick={() => setTextMode(!textMode)}
  className="absolute top-4 left-1 flex items-center justify-center w-10 h-10 bg-white/30 backdrop-blur-md rounded-full z-50 shadow-md transition-all duration-300"
>
  {textMode ? <FiX className="text-white" size={20} /> : <FiEdit className="text-white" size={20} />}
</button>

      {/* Botón para pantalla completa */}
      <button
  onClick={toggleFullscreen}
  className="absolute  left-[-6px] top-15 flex items-center justify-center w-10 h-10 bg-white/30 backdrop-blur-md rounded-full shadow-md hover:bg-white/40 transition duration-300 z-50"
>
  <FiMaximize className="text-white-600" size={20} />
      </button>

      {/* Componente de caja de texto */}
      <TextBoxOverlay
        active={textMode}
        onClose={() => setTextMode(false)}
        text={overlayText}
        setText={setOverlayText}
      />
    </div>
  );
};

export default Hito;
