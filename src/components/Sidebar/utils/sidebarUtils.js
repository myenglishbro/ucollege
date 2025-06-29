/**
 * Utilities for Sidebar component
 */

/**
 * Normalize a URL to ensure it uses https://
 * @param {string} url
 * @returns {string}
 */
export function normalizeUrl(url) {
  if (!url) return url;
  return url.startsWith('http://')
    ? url.replace(/^http:\/\//, 'https://')
    : url;
}

/**
 * Calculate completion progress as a percentage
 * @param {string[]} viewedItems - Array of viewed enlace titles
 * @param {Array<{ enlaces: Array }>} road - The roadmap data structure
 * @returns {number} - Percentage (0–100)
 */
export function calculateProgress(viewedItems, road) {
  const total = road.reduce((sum, section) => sum + (section.enlaces?.length || 0), 0);
  if (total === 0) return 0;
  return Math.round((viewedItems.length / total) * 100);
}
