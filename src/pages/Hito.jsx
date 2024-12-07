import React, { useEffect, useState } from 'react';

const Hito = ({ selectedLink }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedLink) {
      setIsLoading(true);
    }
  }, [selectedLink]);

  const getEmbedUrl = (url) => {
    if (url.includes('youtu.be') || url.includes('youtube.com')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('drive.google.com')) {
      const fileId = url.split('/d/')[1]?.split('/')[0];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return ''; // Devuelve vacío si no es un enlace soportado
  };

  return (
    <div className="hito-container mt-6 p-4 bg-white rounded shadow-md w-full max-w-3xl mx-auto transition-all ease-in-out duration-300 relative">
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
          {/* Superposición para bloquear el botón y mostrar mensaje */}
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
