import React, { useEffect } from 'react';
import { getEmbedUrl, isGoogleDriveFolder } from '../utils/getEmbedUrl';

const EmbedFrame = ({ url, title, isLoading, setIsLoading }) => {
  const isFolder = isGoogleDriveFolder(url);

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
    }
  }, [url]);

  if (isFolder) return null;

  return (
    <div className="relative w-full h-[80vh] rounded-xl shadow-lg bg-black/5 overflow-hidden">
      <iframe
        src={getEmbedUrl(url)}
        title={title}
        className={`w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        frameBorder="0"
        allow="fullscreen"
        onLoad={() => setIsLoading(false)}
        style={{
          borderRadius: '12px',
          transition: 'transform 0.3s ease-in-out',
        }}
      ></iframe>
    </div>
  );
};

export default EmbedFrame;
