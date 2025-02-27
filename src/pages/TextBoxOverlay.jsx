import React, { useState, useRef } from 'react';

const TextBoxOverlay = ({ active, text, setText, onClose }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    draggingRef.current = true;
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!draggingRef.current) return;
    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
        }}
        onMouseDown={handleMouseDown}
        className="p-2 cursor-move"
      >
        <textarea
          className="bg-transparent text-black border border-gray-300 p-2 rounded resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ minWidth: '200px', minHeight: '100px' }}
          placeholder="Escribe aquí..."
        />
        <div className="mt-2 text-right">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-2 py-1 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextBoxOverlay;
