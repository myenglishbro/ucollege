// src/hooks/useSecurityListeners.js
import { useEffect } from "react";

export const useSecurityListeners = (setShowAlert, setShowBlackScreen) => {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();             // Bloquea clic derecho
      setShowAlert(true);
    };

    const handleKeyDown = (e) => {
      const isDevTools =
        e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I");

      const isCopy = e.ctrlKey && e.key === "c";

      if (isDevTools || isCopy || e.key === "PrintScreen") {
        e.preventDefault();
        setShowAlert(true);
      }

      if (e.key === "PrintScreen") {
        setShowBlackScreen(true);
        setTimeout(() => setShowBlackScreen(false), 2000);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
