// quiz/components/HeaderBar.jsx
import React from "react";

export default function HeaderBar({ mode, accent, onHomeClean }) {
  if (mode === null) return null;
  const pillText = mode === "test" ? "Modo Prueba" : "Modo Práctica";
  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #e9ecff",
      }}
    >
      <button
        onClick={onHomeClean}
        className="text-sm md:text-base font-semibold hover:underline"
        style={{ color: accent }}
        title="Volver al inicio (limpio)"
      >
        🏠 Home
      </button>

      <span
        className="text-xs md:text-sm px-2 py-1 rounded-full"
        style={{ background: "#e8ebff", color: accent, fontWeight: 700 }}
      >
        {pillText}
      </span>
    </div>
  );
}
