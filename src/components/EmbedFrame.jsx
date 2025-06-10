import React from 'react';
import { getEmbedUrl } from '../utils/getEmbedUrl';

const EmbedFrame = ({ url, title, isLoading, setIsLoading }) => {
  return (
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
  );
};

export default EmbedFrame;
