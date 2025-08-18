// quiz/hooks/useQuizPersistence.js
import { useEffect, useState, useCallback } from "react";

/** Persistimos SOLO niveles desbloqueados y mejores puntajes. NO el modo. */
export function useQuizPersistence(initialUnlocked = { 0: true }) {
  const [unlockedLevels, setUnlockedLevels] = useState(initialUnlocked);
  const [bestScores, setBestScores] = useState({});

  // Load
  useEffect(() => {
    try {
      const savedUnlocked = JSON.parse(localStorage.getItem("mlq_unlocked") || "null");
      const savedBest = JSON.parse(localStorage.getItem("mlq_best") || "null");
      if (savedUnlocked) setUnlockedLevels(savedUnlocked);
      if (savedBest) setBestScores(savedBest);
    } catch {}
  }, []);

  // Save
  useEffect(() => {
    try {
      localStorage.setItem("mlq_unlocked", JSON.stringify(unlockedLevels));
    } catch {}
  }, [unlockedLevels]);

  useEffect(() => {
    try {
      localStorage.setItem("mlq_best", JSON.stringify(bestScores));
    } catch {}
  }, [bestScores]);

  const updateBestScore = useCallback((levelKey, score) => {
    setBestScores(prev => {
      if (!prev[levelKey] || score > prev[levelKey]) {
        return { ...prev, [levelKey]: score };
      }
      return prev;
    });
  }, []);

  const wipeStorage = useCallback(() => {
    try {
      localStorage.removeItem("mlq_unlocked");
      localStorage.removeItem("mlq_best");
    } catch {}
    setUnlockedLevels({ 0: true });
    setBestScores({});
  }, []);

  return { unlockedLevels, setUnlockedLevels, bestScores, updateBestScore, wipeStorage };
}
