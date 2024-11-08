import React, { useEffect, useState } from 'react';

const Hito = ({ selectedLink }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cambia el estado de carga cuando se selecciona un nuevo enlace
    if (selectedLink) {
      setIsLoading(true);
    }
  }, [selectedLink]);

  const getEmbedUrl = (url) => {
    if (url.includes('youtu.be') || url.includes('youtube.com')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Para Google Drive o enlaces similares
    if (url.includes('drive.google.com')) {
      const fileId = url.split('/d/')[1]?.split('/')[0];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url; // Si no es YouTube ni Drive, se devuelve la URL original
  };

  return (
    <div className="hito-container mt-6 p-4 bg-white rounded shadow-md w-full max-w-3xl mx-auto transition-all ease-in-out duration-300">
      {selectedLink ? (
        <>
          {isLoading && <p>Cargando...</p>}
          <iframe
            src={getEmbedUrl(selectedLink.url)}
            title={selectedLink.titulo}
            width="100%"
            height="450px"
            frameBorder="0"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </>
      ) : (
        <p>Selecciona un enlace para visualizar el contenido.</p>
      )}
    </div>
  );
};

export default Hito;
