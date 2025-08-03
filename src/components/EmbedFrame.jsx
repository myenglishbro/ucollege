import React, { useEffect, useState } from 'react';
import { getEmbedUrl, isGoogleDriveFolder } from '../utils/getEmbedUrl';

const EmbedFrame = ({ url, title, isLoading, setIsLoading }) => {
  const isFolder = isGoogleDriveFolder(url);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (isFolder) {
      const width = 1000;
      const height = 700;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      window.open(
        url,
        '_blank',
        `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${width},height=${height},top=${top},left=${left}`
      );
    } else {
      setIsLoading(true);
      setFade(false);
    }
  }, [url]);

  const handleLoad = () => {
    setIsLoading(false);
    setTimeout(() => setFade(true), 50); // Fade in después de carga
  };

  if (isFolder) return null;

  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-lg bg-white shadow-xl border border-gray-300">
      {/* Loader oscuro mientras carga */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 transition-opacity duration-300">
          <span className="text-white text-sm">Cargando documento...</span>
        </div>
      )}

      <iframe
        src={getEmbedUrl(url)}
        title={title}
        className={`w-full h-full transition-opacity duration-500 ${
          fade ? 'opacity-100' : 'opacity-0'
        } custom-scroll`}
        frameBorder="0"
        allow="fullscreen"
        onLoad={handleLoad}
        style={{
          border: 'none',
          borderRadius: '8px',
          position: 'relative',
          zIndex: 5,
        }}
      ></iframe>

      {/* Scrollbar personalizado */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f0f0f0;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default EmbedFrame;
