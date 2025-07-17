import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

export default function Accordion({ data }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-md divide-y divide-gray-200">
      {data.map((bloque, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="first:rounded-t-xl last:rounded-b-xl">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className={`
                w-full flex items-center justify-between px-6 py-4
                transition-colors duration-200
                ${isOpen ? "border-b-2 border-blue-600" : ""}
                focus:outline-none
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`text-left font-medium transition-colors duration-200
                  ${isOpen ? "text-gray-900" : "text-gray-800"}`}>
                  {bloque.titulo}
                </span>
                {/* si quieres mantener el badge de tiempo */}
                {bloque.tiempo && (
                  <span className="ml-2 text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5 border border-gray-200">
                    {bloque.tiempo}
                  </span>
                )}
              </div>
              <span
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full border
                  transition-colors duration-200
                  ${isOpen ? "border-blue-600" : "border-gray-300"}
                `}
              >
                {isOpen
                  ? <FaTimes className="text-blue-600" />
                  : <FaPlus  className="text-gray-400" />}
              </span>
            </button>

            <div
              className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <div className="px-6 pb-6 text-gray-600 space-y-2">
                {bloque.cursos.map((curso, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-mono text-blue-600">
                      {i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </span>
                    <span>{curso}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
);
}
