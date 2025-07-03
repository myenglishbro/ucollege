"use client";
import React, { useState } from "react";
import { FaWhatsapp, FaCheckCircle, FaChevronDown } from "react-icons/fa";

function Accordion({ data }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-4">
      {data.map((bloque, idx) => (
        <div
          key={idx}
          className={`relative group bg-[#16171d] border border-[#23243b] rounded-xl shadow-md transition-all
            hover:border-[#8b5cf6] hover:shadow-lg`}
        >
          {/* Sutil efecto de borde a la izquierda al expandirse */}
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#8b5cf6] to-[#6ee7b7]
              transition-all duration-500 ${openIdx === idx ? "opacity-100" : "opacity-0"}`}
          ></span>
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between px-6 py-4 bg-transparent text-left font-semibold text-base tracking-tight focus:outline-none transition group"
          >
            <span className="flex items-center gap-3">
              <FaCheckCircle className={`text-[#8b5cf6] group-hover:scale-110 group-hover:text-[#6ee7b7] transition`} />
              {bloque.titulo}
              <span className="ml-2 text-xs bg-[#23243b] text-[#a1a1aa] rounded px-2 py-0.5 border border-[#23243b]">
                {bloque.tiempo}
              </span>
            </span>
            <FaChevronDown
              className={`ml-2 transition-transform group-hover:text-[#8b5cf6] ${
                openIdx === idx ? "rotate-180 text-[#6ee7b7]" : "text-[#a1a1aa]"
              }`}
            />
          </button>
          <div
            style={{
              maxHeight: openIdx === idx ? `${bloque.cursos.length * 52 + 10}px` : "0px",
              transition: "max-height 0.5s cubic-bezier(.48,1.27,.68,1.53), opacity 0.4s",
              opacity: openIdx === idx ? 1 : 0,
              overflow: "hidden",
            }}
          >
            <div className="pl-14 pr-8 py-2 flex flex-col gap-1 text-sm text-[#a1a1aa]">
              {bloque.cursos.map((curso, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 hover:text-[#e0e7ef] transition"
                >
                  <span className="text-[#8b5cf6] group-hover:text-[#6ee7b7]">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
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

function SeccionDocentes({ docentes }) {
  return (
    <div className="my-14">
      <div className="mb-3">
        <span className="inline-block px-2 py-0.5 bg-[#23243b] text-[#6ee7b7] rounded text-xs font-medium">
          Profes de la escuela
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-6 tracking-tight text-[#e4e7ef]">Conoce quién enseña</h2>
      <div className="flex flex-wrap gap-7">
        {docentes.map((prof, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center w-44 group transition"
          >
            <img
              src={prof.img}
              alt={prof.nombre}
              className="w-14 h-14 rounded-full border-2 border-[#23243b] group-hover:border-[#8b5cf6] shadow object-cover mb-2 transition"
              loading="lazy"
            />
            <span className="text-sm font-medium text-[#d4d4d8] group-hover:text-[#8b5cf6] transition">
              {prof.nombre}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingFuturista({
  rutas,
  docentes,
  precio,
  logo,
  titulo,
  video,
  soporte_wsp,
  onAccessClick,
}) {
  return (
    <div
      className="min-h-screen bg-[#16171d] text-[#e5e7eb] font-sans relative overflow-x-hidden mt-15"
      style={{
        background:
          "linear-gradient(120deg, #191b22 50%, #222334 100%)",
      }}
    >
      {/* Header */}
      <header className="flex items-center px-8 pt-8 pb-2 border-b border-[#23243b]">
        <img
          src={logo}
          alt="Logo"
          className="h-10 mr-4 rounded-lg bg-[#181a23] shadow border border-[#23243b]"
        />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{titulo}</h1>
        <button
          onClick={onAccessClick}
          className="ml-auto bg-[#222334] hover:bg-[#8b5cf6] hover:text-white transition text-[#c4b5fd] px-6 py-2 rounded-lg font-semibold shadow-sm border border-[#23243b] hover:border-[#8b5cf6]"
        >
          Acceder
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row gap-8 px-4 md:px-16 pt-6 pb-16 max-w-7xl mx-auto">
        {/* Sección Temario Central */}
        <section className="flex-1 w-full">
          <h2 className="text-xl font-bold mb-3 mt-3 text-[#e0e7ef]">
            Temario <span className="text-sm font-normal text-[#a1a1aa]">({rutas.length})</span>
          </h2>
          <Accordion data={rutas} />
          <SeccionDocentes docentes={docentes} />
        </section>

      {/* Panel Derecho Moderno y Futurista */}
<aside className="md:w-96 w-full flex-shrink-0">
  <div
    className={`
      relative bg-[#17181c] border border-[#23243b] rounded-2xl p-7 shadow-lg
      transition-shadow duration-300 group overflow-hidden
      hover:shadow-[0_2px_40px_0_rgba(94,234,212,0.13)]
    `}
    style={{ minHeight: 420 }}
  >
    {/* Glow decorativo animado */}
    <div
      className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2 w-60 h-40 bg-[#5eead4]/15 blur-2xl rounded-full pointer-events-none opacity-50 group-hover:opacity-90 transition"
    />
    <div className="relative z-10">
      <div className="w-full aspect-video rounded-xl overflow-hidden border border-[#23243b] shadow-lg bg-[#181a23] mb-5">
        <iframe
          src={video}
          title="Video Promocional"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ background: "#181a23" }}
        />
      </div>
      <div className="text-center mb-4">
        <span className="text-xl font-bold text-[#a78bfa]">{precio}</span>
        <div className="text-xs text-[#8b949e] mt-1">Plan anual todo incluido</div>
      </div>
      <div className="text-center mt-3 text-sm text-[#7f8996]">
        Más de <b>2000 estudiantes</b> ya están aprendiendo.
      </div>
      <div className="flex justify-center mt-4">
        <a
          href={soporte_wsp}
          className={`
            inline-flex items-center gap-2 px-5 py-2 rounded-xl
            text-[#5eead4] font-semibold border border-[#23243b]
            bg-[#191a23] hover:bg-[#23243b]/90 hover:text-[#a7f3d0]
            transition-all duration-200 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-[#5eead4]/30
            active:scale-95
          `}
          style={{
            boxShadow: "0 1px 14px 0 #11141b44"
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-lg" />
          <span>Soporte por WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
</aside>

      </main>
      {/* Footer */}
      <footer className="text-center text-xs text-[#71717a] py-6 opacity-80 border-t border-[#23243b]">
        © 2025 MyEnglishBro™. Todos los derechos reservados.
      </footer>
    </div>
  );
}
