import React, { useState } from 'react';
import { FiTool, FiPenTool, FiEdit, FiMaximize } from 'react-icons/fi';

const ToolboxButton = ({ onToggleNotepad, onToggleTextBox, onToggleFullscreen }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4 -left-4 z-50 flex flex-col items-start gap-2">
      {/* Main toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:bg-white/40 transition"
        aria-label="Abrir caja de herramientas"
      >
        <FiTool className="text-white" />
      </button>

      {/* Tool options */}
      {open && (
        <div className="flex flex-col gap-2 mt-1">
          <button
            onClick={onToggleNotepad}
            className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center shadow hover:bg-white/40 transition"
            aria-label="Bloc de notas"
          >
            <FiPenTool className="text-white" />
          </button>
          <button
            onClick={onToggleTextBox}
            className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center shadow hover:bg-white/40 transition"
            aria-label="Caja de texto"
          >
            <FiEdit className="text-white" />
          </button>
          <button
            onClick={onToggleFullscreen}
            className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center shadow hover:bg-white/40 transition"
            aria-label="Pantalla completa"
          >
            <FiMaximize className="text-white" />
          </button>
          
        </div>
      )}
    </div>
  );
};

export default ToolboxButton;
