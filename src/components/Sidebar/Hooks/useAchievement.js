import { useState, useEffect } from 'react';
import { mensajes } from '../utils/mensajes';

/**
 * Custom hook to compute achievement messages based on progress percentage.
 * @param {Array} viewedItems - List of viewed item titles
 * @param {Array} road - The roadmap array with sections and enlaces
 * @returns {string} - Current achievement message (clears after 3s)
 */
export default function useAchievement(viewedItems, road) {
  const [achievementMessage, setAchievementMessage] = useState('');

  useEffect(() => {
    const totalItems = road.reduce((sum, section) => sum + section.enlaces.length, 0);
    const progress = totalItems > 0 ? Math.round((viewedItems.length / totalItems) * 100) : 0;
    const message = mensajes[progress];
    if (message) {
      setAchievementMessage(message);
      const timer = setTimeout(() => setAchievementMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [viewedItems, road]);

  return achievementMessage;
}
