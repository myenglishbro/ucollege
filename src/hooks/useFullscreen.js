import { useEffect, useState } from 'react';

export const useFullscreen = (refElement) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      refElement.current?.requestFullscreen().catch((err) =>
        console.error('Error al activar pantalla completa:', err)
      );
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === refElement.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [refElement]);

  return { isFullscreen, toggleFullscreen };
};
