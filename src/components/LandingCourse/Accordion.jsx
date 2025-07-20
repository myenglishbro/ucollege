import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

export default function Accordion({ data }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="bg-[#dbe9ff] px-6 py-20 rounded-3xl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Título (puedes personalizarlo) */}
        <div>
          <span className="bg-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4 shadow-sm">
            Temario
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
            👀 Course Content
            <br />
            <span className="font-light">Don't you worry, my dear!</span>
          </h2>
        </div>

        {/* Acordeón */}
        <div className="space-y-5">
          {data.map((bloque, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div key={idx} className="bg-white rounded-[1.5rem] shadow-md overflow-hidden transition-all duration-300">
                <div className="flex justify-between items-start px-6 pt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{bloque.titulo}</h3>
                  </div>
                  {bloque.tiempo && (
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                        {bloque.tiempo}
                      </span>
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full border border-indigo-200 hover:scale-105 transition-all"
                      >
                        {isOpen ? <FaTimes size={14} /> : <FaPlus size={14} />}
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className={`px-6 pb-6 pt-2 text-gray-700 transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul className="mt-2 space-y-2">
                    {bloque.cursos.map((curso, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-snug">
                        <span className="font-mono text-indigo-600">
                          {i + 1 < 10 ? `0${i + 1}` : i + 1}
                        </span>
                        <span>{curso}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
