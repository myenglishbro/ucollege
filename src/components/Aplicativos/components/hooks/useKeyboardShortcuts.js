// quiz/hooks/useKeyboardShortcuts.js
import { useEffect } from "react";

/** Envío inmediato con A/B/C/D o 1/2/3/4 */
export function useKeyboardShortcuts({ enabled, containerRef, options, onChooseOption }) {
  useEffect(() => {
    if (!enabled) return;
    const node = containerRef?.current || window;

    const handler = (e) => {
      const key = e.key?.toLowerCase?.();
      const mapLetter = { a: 0, b: 1, c: 2, d: 3 };
      const mapNumber = { "1": 0, "2": 1, "3": 2, "4": 3 };

      let idx;
      if (key in mapLetter) idx = mapLetter[key];
      if (key in mapNumber) idx = mapNumber[key];

      if (idx !== undefined && options?.[idx] !== undefined) {
        onChooseOption?.(options[idx]); // ← envío inmediato
      }
    };

    node.addEventListener("keydown", handler);
    return () => node.removeEventListener("keydown", handler);
  }, [enabled, containerRef, options, onChooseOption]);
}
