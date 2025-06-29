import { useState, useEffect } from 'react';

/**
 * useTimer hook
 * @param {number} initialMinutes - Duración inicial en minutos
 * @returns {{
 *   timeLeft: number,       // segundos restantes
 *   isRunning: boolean,
 *   showModal: boolean,
 *   start: () => void,
 *   stop: () => void,
 *   reset: () => void
 * }}
 */
export default function useTimer(initialMinutes = 1) {
  const [minutes] = useState(initialMinutes);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Efecto principal del temporizador
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      setIsRunning(false);
      setShowModal(true);
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  const start = () => {
    setTimeLeft(minutes * 60);
    setIsRunning(true);
    setShowModal(false);
  };
  const stop = () => setIsRunning(false);
  const reset = () => {
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    setShowModal(false);
  };

  return { timeLeft, isRunning, showModal, start, stop, reset };
}
