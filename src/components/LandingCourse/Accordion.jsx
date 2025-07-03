import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Accordion({ data }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-2">
      {data.map((bloque, idx) => (
        <div key={idx} className="
          border border-[#23243b] rounded-xl bg-gradient-to-br from-[#191b22]/90 to-[#23243b]/60
          transition shadow group overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="flex items-center justify-between w-full px-5 py-3 text-left group focus:outline-none"
          >
            <span className="flex items-center gap-3">
              <FaCheckCircle className="text-[#4fc0a9] group-hover:scale-110 transition" />
              <span className="font-bold text-[#e6eaf3]">{bloque.titulo}</span>
              <span className="ml-2 text-xs bg-[#1c1d22]/60 text-[#bfcad6] rounded px-2 py-0.5 border border-[#bfcad6]/10">{bloque.tiempo}</span>
            </span>
            <svg className={`w-5 h-5 ml-3 transition-transform
              ${openIdx === idx ? "rotate-180 text-[#4fc0a9]" : "text-[#bfcad6]"}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            style={{
              maxHeight: openIdx === idx ? `${bloque.cursos.length * 48 + 10}px` : "0px",
              transition: "max-height 0.5s cubic-bezier(.48,1.27,.68,1.53), opacity 0.4s",
              opacity: openIdx === idx ? 1 : 0,
              overflow: "hidden"
            }}>
            <div className="pl-12 pr-6 py-3 flex flex-col gap-2 text-sm font-medium text-[#bfcad6]">
              {bloque.cursos.map((curso, i) => (
                <div key={i} className="flex items-center gap-2 hover:text-[#4fc0a9] transition">
                  <span className="text-[#72b4fa] font-mono">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                  <span>{curso}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
