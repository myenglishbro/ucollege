import React, { useState } from 'react';

const FloatingButton = ({
  onClick,
  icon,
  position = "top-4 left-4",
  className = "",
  tooltip = ""
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`absolute ${position} z-50 group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Botón */}
      <button
        onClick={onClick}
        className={`flex items-center justify-center w-10 h-10 bg-white/30 backdrop-blur-md rounded-full shadow-md hover:bg-white/40 transition duration-300 ${className}`}
      >
        {icon}
      </button>

      {/* Tooltip */}
      {tooltip && hovered && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap transition-all duration-200 opacity-90 pointer-events-none">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
