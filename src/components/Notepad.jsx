import React from 'react';
import { FiPrinter, FiMaximize, FiMinimize } from 'react-icons/fi';

const Notepad = ({ 
  notes, 
  setNotes, 
  fontSize, 
  setFontSize, 
  isExpanded, 
  setIsExpanded, 
  printNotes 
}) => {
  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);

    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = `${newSize}px`;
      try {
        range.surroundContents(span);
      } catch {
        document.execCommand("styleWithCSS", false, true);
        document.execCommand("fontSize", false, "7");
        const editor = document.getElementById("notepadEditor");
        const fonts = editor.getElementsByTagName("font");
        for (let i = fonts.length - 1; i >= 0; i--) {
          const fontElem = fonts[i];
          if (fontElem.getAttribute("size") === "7") {
            fontElem.removeAttribute("size");
            fontElem.style.fontSize = `${newSize}px`;
          }
        }
      }
    }
  };

  return (
    <div
      className={`fixed top-0 ${
        isExpanded
          ? "left-[50px] top-20 w-[1050px] h-[480px]"
          : "left-[50px] top-20 w-[300px] h-[450px]"
      } bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl p-4 flex flex-col text-white transition-all duration-300`}
      style={{ zIndex: 9999 }}
    >
      {/* Barra de herramientas */}
      <div className="flex items-center space-x-2 mb-3">
        <select
          value={fontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)}
          className="px-2 py-1 bg-white text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
          <option value="24">24</option>
        </select>

        <button
          onClick={() => document.execCommand("bold")}
          className="px-2 py-1 bg-white/20 text-white rounded border border-white/20 hover:bg-white/30 transition"
          title="Negrita"
        >
          B
        </button>
        <button
          onClick={() => document.execCommand("italic")}
          className="px-2 py-1 bg-white/20 text-white rounded border border-white/20 hover:bg-white/30 transition"
          title="Cursiva"
        >
          I
        </button>
        <button
          onClick={() => document.execCommand("underline")}
          className="px-2 py-1 bg-white/20 text-white rounded border border-white/20 hover:bg-white/30 transition"
          title="Subrayado"
        >
          U
        </button>
      </div>

      {/* Área editable */}
      <div
        id="notepadEditor"
        className="w-full flex-grow p-3 border border-white/20 rounded-lg bg-[#1c1c24] bg-opacity-70 overflow-auto transition leading-relaxed"
        contentEditable
        placeholder="Toma notas aquí..."
        onInput={(e) => setNotes(e.target.innerHTML)}
        style={{
          minHeight: isExpanded ? "350px" : "250px",
          maxHeight: isExpanded ? "300px" : "550px",
          outline: "none",
          fontFamily: "Inter, sans-serif",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          lineHeight: "1.6",
        }}
      ></div>

      {/* Botones */}
      <div className="mt-3 flex justify-end space-x-2">
        <button
          onClick={printNotes}
          className="p-2 bg-white/30 backdrop-blur-md text-white rounded-full shadow-md hover:bg-white/40 transition duration-200"
          title="Imprimir Notas"
        >
          <FiPrinter size={20} />
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 bg-white/30 backdrop-blur-md text-white rounded-full shadow-md hover:bg-white/40 transition duration-200"
          title={isExpanded ? "Contraer" : "Expandir"}
        >
          {isExpanded ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Notepad;
