// quiz/hooks/useQuizSecurity.js
import { useEffect, useState } from "react";

/** Bloqueos básicos en el contenedor + overlay al PrintScreen */
export function useQuizSecurity(containerRef) {
  const [showBlackScreen, setShowBlackScreen] = useState(false);

  useEffect(() => {
    const node = containerRef?.current;
    if (!node) return;

    const prevent = (e) => e.preventDefault();
    const handleKeyDownLocal = (e) => {
      const forbidden = ["c", "u", "s"]; // Ctrl/Cmd + C/U/S
      const isCtrl = e.ctrlKey || e.metaKey;
      if ((isCtrl && forbidden.includes(e.key.toLowerCase())) || e.key === "F12") {
        e.preventDefault();
      }
    };
    node.addEventListener("contextmenu", prevent);
    node.addEventListener("selectstart", prevent);
    node.addEventListener("keydown", handleKeyDownLocal);

    const handleKeyUpWin = (e) => {
      if (e.key === "PrintScreen") {
        if (navigator?.clipboard?.writeText) navigator.clipboard.writeText("");
        setShowBlackScreen(true);
        setTimeout(() => setShowBlackScreen(false), 3000);
      }
    };
    window.addEventListener("keyup", handleKeyUpWin);

    return () => {
      node.removeEventListener("contextmenu", prevent);
      node.removeEventListener("selectstart", prevent);
      node.removeEventListener("keydown", handleKeyDownLocal);
      window.removeEventListener("keyup", handleKeyUpWin);
    };
  }, [containerRef]);

  return { showBlackScreen };
}
