"use client";
import React, { useState } from "react";
import {
  FaStar, FaCheckCircle, FaWhatsapp,
  FaRegPlayCircle, FaRegClock, FaRegFileAlt
} from "react-icons/fa";

// Icon mapping for includes (puedes agregar más si tu JSON lo requiere)
const iconMap = {
  FaRegPlayCircle: <FaRegPlayCircle />,
  FaRegClock: <FaRegClock />,
  FaCheckCircle: <FaCheckCircle />,
  FaRegFileAlt: <FaRegFileAlt />,
};

// Badge metalizada
function InfoBadge({ children }) {
  return (
    <span className="inline-block px-3 py-1 rounded bg-[#22242c]/70 text-[#4fc0a9] font-semibold text-xs mr-2 mb-1 border border-[#bfcad6]/30 shadow-sm backdrop-blur-[1.5px]">
      {children}
    </span>
  );
}

// Acordeón del temario
function Accordion({ data }) {
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
              ${openIdx === idx ? "rotate-180 text-[#4fc0a9]" : "text-[#bfcad6]"}
            `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

// Docentes
function SeccionDocentes({ docentes }) {
  return (
    <div className="my-14">
      <div className="mb-3">
        <span className="inline-block px-2 py-0.5 bg-[#23243b] text-[#4fc0a9] rounded text-xs font-medium">
          Profes de la escuela
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-6 tracking-tight text-[#e4e7ef]">Conoce quién enseña</h2>
      <div className="flex flex-wrap gap-7">
        {docentes.map((prof, idx) => (
          <div key={idx} className="flex flex-col items-center w-44 group transition">
            <img
              src={prof.img}
              alt={prof.nombre}
              className="w-14 h-14 rounded-full border-2 border-[#23243b] group-hover:border-[#4fc0a9] shadow object-cover mb-2 transition"
              loading="lazy"
            />
            <span className="text-sm font-medium text-[#d4d4d8] group-hover:text-[#4fc0a9] transition">
              {prof.nombre}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// PANEL DE COMPRA (glass/dark/steel)
function AsidePanelModern({ precio, precio_original, descuento, oferta_time, video, soporte_wsp, onAccessClick }) {
  return (
    <aside className="w-full md:w-96 flex-shrink-0 mt-8 md:mt-0">
      <div className="sticky top-6">
        <div className={`
          relative rounded-2xl p-6 border shadow-xl group overflow-hidden
          bg-gradient-to-br from-[#23243b]/80 via-[#191b22]/90 to-[#23243b]/70
          backdrop-blur-[3px] border-[#23243b] hover:border-[#4fc0a9] transition
        `}>
          {/* Glow decorativo, sutil */}
          <div className="
            absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-56 h-32
            bg-gradient-to-tr from-[#4fc0a9]/30 via-[#bfcad6]/10 to-[#72b4fa]/30
            blur-2xl rounded-full opacity-30 group-hover:opacity-70 pointer-events-none transition
          " />
          <div className="relative z-10 flex flex-col gap-6">
            {/* VIDEO */}
            <div className="
              w-full aspect-video rounded-lg overflow-hidden border border-[#23243b]
              shadow-lg mb-2 bg-[#1a1c22]/60 flex items-center justify-center
              transition group-hover:scale-[1.02]
            ">
              <iframe
                src={video}
                title="Video Promocional"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ background: "transparent" }}
              />
            </div>
            {/* PRECIO */}
            <div className="text-center flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-[#e6eaf0] tracking-wide drop-shadow-sm">
                {precio}
              </span>
              {precio_original && (
                <span className="line-through text-[#868c98] font-medium text-lg">
                  {precio_original}
                </span>
              )}
              {descuento && (
                <span className="text-[#4fc0a9] font-semibold text-base">{descuento}</span>
              )}
            </div>
            {/* BOTÓN ACCEDER */}
            <button
              onClick={onAccessClick}
              className={`
                w-full py-3 rounded-lg bg-gradient-to-r from-[#252733] to-[#191b22]/80
                text-[#e3eaf5] font-bold text-base tracking-wide border border-[#292c37]
                shadow hover:shadow-xl
                hover:bg-gradient-to-tr hover:from-[#21222b] hover:to-[#1b2026]/80
                hover:text-[#4fc0a9] hover:border-[#4fc0a9] transition-all duration-150
                focus:outline-none active:scale-[0.97]
              `}
            >
              Acceder al Curso
            </button>
            {/* WHATSAPP */}
            <a
              href={soporte_wsp}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                w-full flex items-center justify-center gap-2 py-2 mt-1
                rounded-lg bg-[#23243b]/70 text-[#bfcad6] font-semibold
                border border-[#23243b] hover:border-[#4fc0a9] hover:text-[#4fc0a9] 
                hover:bg-[#202b2e]/80 transition shadow-sm
                focus:outline-none
              `}
            >
              <FaWhatsapp className="text-lg" />
              Soporte WhatsApp
            </a>
            {/* MENSAJES */}
            {oferta_time && (
              <div className="text-xs text-[#72b4fa] font-medium text-center mt-1 animate-pulse">
                {oferta_time}
              </div>
            )}
            <div className="text-center text-[11px] text-[#b3b8c5] mt-1 opacity-70">
              30-Day Money-Back Guarantee<br />
              <span className="text-[#4fc0a9]">Full Lifetime Access</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// --- LANDING FINAL ---
export default function LandingFuturista({
  logo, titulo, descripcion, teacher, video, precio, precio_original, descuento, oferta_time, soporte_wsp,
  badge, ratings, last_updated, idiomas, learning, includes, rutas, docentes, onAccessClick
}) {
  return (
    <div className="
      min-h-screen bg-gradient-to-br from-[#16171d] to-[#23243b] text-white font-sans overflow-x-hidden pt-10 mt-15
    ">
      
      {/* MAIN */}
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto pt-3 px-4 gap-8">
        {/* Columna Izquierda */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="text-xs text-[#bfcad6] mb-3 flex flex-wrap gap-2">
            <span>Language Learning</span> <span className="text-[#4fc0a9]">/</span>
            <span>Business English</span>
          </nav>
          {/* Título y Descripción */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight text-[#e6eaf0]">{titulo}</h1>
          <p className="text-lg text-[#bfcad6] mb-3">{descripcion}</p>
          {/* Badge + Rating */}
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <InfoBadge>{badge.label}</InfoBadge>
            <span className="text-[#ffd700] flex items-center gap-1 text-sm font-bold">
              {ratings.score} <FaStar className="inline" /> <span className="font-normal text-[#bfcad6]">({ratings.votes} ratings)</span>
            </span>
            <span className="text-[#bfcad6] text-sm ml-2">{ratings.students} students</span>
          </div>
          <div className="text-sm text-[#4fc0a9] mb-2">
            Created by <span className="underline hover:text-[#72b4fa]">{teacher}</span>
          </div>
          <div className="flex gap-5 text-xs text-[#8b949e] mb-7">
            <span>Last updated {last_updated}</span>
            {idiomas && idiomas.map((lang, idx) => <span key={idx}>{lang}</span>)}
          </div>
          {/* What you'll learn */}
          <div className="bg-gradient-to-br from-[#23243b]/40 to-[#16171d]/60 border border-[#23243b] rounded-xl p-5 mb-6">
            <h2 className="font-bold text-lg mb-3 text-[#e6eaf0]">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-2">
              {learning.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-[#bfcad6]">
                  <FaCheckCircle className="mt-1 text-[#4fc0a9]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Course includes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-6">
            {includes.map(([text, icon], i) => (
              <span key={i} className="flex items-center gap-2 bg-[#181a23] border border-[#23243b] rounded-md px-3 py-2 text-[#bfcad6] shadow-sm">
                <span className="text-[#72b4fa]">{iconMap[icon]}</span>{text}
              </span>
            ))}
          </div>
          {/* Temario */}
          <div className="bg-gradient-to-br from-[#23243b]/30 to-[#16171d]/70 border border-[#23243b] rounded-xl p-5 mb-8">
            <h2 className="font-bold text-lg mb-3 text-[#e6eaf0]">Course content</h2>
            <Accordion data={rutas} />
          </div>
          {/* Docentes */}
          <SeccionDocentes docentes={docentes} />
        </div>
        {/* Panel de compra */}
        <AsidePanelModern
          video={video}
          precio={precio}
          precio_original={precio_original}
          descuento={descuento}
          oferta_time={oferta_time}
          soporte_wsp={soporte_wsp}
          onAccessClick={onAccessClick}
        />
      </main>
      {/* Footer */}
      <footer className="text-center text-xs text-[#7b8494] py-6 opacity-80 border-t border-[#23243b] mt-10">
        © 2025 MyEnglishBro™. Todos los derechos reservados.
      </footer>
    </div>
  );
}
