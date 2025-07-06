"use client";
import InfoBadge from './InfoBadge';
import Accordion from './Accordion';
import SeccionDocentes from './SeccionDocentes';
import AsidePanelModern from './AsidePanelModern';
import IncludesList from './IncludesList';
import LearningList from './LearningList';
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingFuturista({
  logo, titulo, descripcion, teacher, video, precio, precio_original, descuento, oferta_time, soporte_wsp,
  badge = { label: "Premium" },
  ratings = { score: 4.9, votes: 320, students: 1200 },
  last_updated,
  idiomas,
  learning,
  includes,
  rutas,
  docentes,
  onAccessClick,
  mascotImage
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171924] via-[#181a26] to-[#171924] text-[#e4e8f5] font-sans overflow-x-hidden pt-10 mt-16 relative">
      {/* Glow/blur effect */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#7c95c66a] rounded-full blur-3xl opacity-60 pointer-events-none z-0" />
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto pt-3 px-4 gap-8 z-10 relative">
        {/* Columna Izquierda (Hero + detalles) */}
        <div className="flex-1 min-w-0">
          {/* Hero */}
          <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-0">
            {/* Hero Text */}
            <div className="w-full md:w-2/3">
              <span className="text-xs font-bold tracking-widest text-[#54a6b8] uppercase mb-1 inline-block">
                Your English Journey
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#e6eaf0] leading-tight drop-shadow mb-2">
                {titulo}
              </h1>

              {/* Detalles del curso: autor, actualizado, idiomas */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#8a99b6] mb-3">
                <span>
                  Created by <span className="underline hover:text-[#7c95c6] cursor-pointer transition">{teacher}</span>
                </span>
                <span className="mx-1 text-[#343b5a] font-bold">·</span>
                <span>Last updated {last_updated}</span>
                {idiomas && idiomas.length > 0 && (
                  <>
                    <span className="mx-1 text-[#343b5a] font-bold">·</span>
                    {idiomas.map((lang, idx) => (
                      <span key={idx}>{lang}</span>
                    ))}
                  </>
                )}
              </div>

              {/* Modern badges */}
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="bg-[#23243b]/90 border border-[#253755]/60 px-4 py-1.5 rounded-full text-xs font-bold text-[#4fc0a9] shadow hover:scale-105 transition">
                  {badge.label}
                </span>
                <span className="bg-[#181a26]/90 border border-[#343b5a]/60 px-4 py-1.5 rounded-full text-xs font-bold text-[#dbc176] flex items-center gap-1 shadow hover:scale-105 transition">
                  {ratings.score}
                  <Star size={14} className="inline text-[#dbc176]" fill="#dbc176" strokeWidth={1.2} />
                  <span className="ml-1 text-[#a2aec3] font-normal">{ratings.votes} ratings</span>
                </span>
                <span className="bg-[#23243b]/80 border border-[#23243b]/60 px-4 py-1.5 rounded-full text-xs font-semibold text-[#7c95c6] shadow hover:scale-105 transition">
                  Resultados Reales
                </span>
              </div>

              <p className="text-lg md:text-xl font-medium text-[#a2aec3] mb-5">
                {descripcion}
              </p>
            </div>
            {/* Hero Mascot/Imagen con efecto */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              whileHover={{ scale: 1.04, rotate: -2 }}
              className="w-full flex justify-center items-center md:w-1/3 relative z-10"
            >
              {/* Glow detrás de la imagen */}
              <motion.div
                className="absolute -z-10 left-1/2 top-1/2 w-52 h-32 md:w-72 md:h-44
                  bg-gradient-to-br from-[#4fc0a9]/30 via-[#7c95c6]/15 to-[#72b4fa]/25
                  blur-2xl rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.09, 1],
                  opacity: [0.60, 0.75, 0.60]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }}
              />
              <motion.img
                src={mascotImage || "/tupersonaje.png"}
                alt="Mascota divertida de inglés"
                className="w-[170px] md:w-[200px] rounded-xl shadow-2xl object-contain select-none bg-[#181a26]/40 backdrop-blur-lg"
                draggable={false}
                whileHover={{ y: -10, scale: 1.06, boxShadow: "0px 12px 40px 0px #4fc0a955" }}
                transition={{ type: "spring", stiffness: 180, damping: 12 }}
              />
            </motion.div>
          </section>

          {/* Breadcrumb */}
          <nav className="text-xs flex flex-wrap gap-2 mb-4 mt-3 items-center">
            <span className="bg-[#23243b]/60 px-3 py-1.5 rounded-full border border-[#23243b]/40 text-[#8a99b6] font-semibold">
              Language Learning
            </span>
            <span className="text-[#343b5a] font-bold mx-1">/</span>
            <span className="bg-[#23243b]/60 px-3 py-1.5 rounded-full border border-[#23243b]/40 text-[#4fc0a9] font-semibold">
              Business English
            </span>
          </nav>

          {/* What you'll learn */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mb-6"
          >
            <LearningList items={learning} />
          </motion.div>

          {/* Course includes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.11 }}
            className="mb-7"
          >
            <IncludesList includes={includes} />
          </motion.div>

          {/* Temario */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="bg-gradient-to-br from-[#23243b]/40 to-[#16171d]/90 border border-[#23243b] rounded-xl p-6 mb-8 shadow-xl shadow-[#191c25cc] backdrop-blur"
          >
            <h2 className="font-bold text-lg mb-3 text-[#e6eaf0]">Course content</h2>
            <Accordion data={rutas} />
          </motion.div>

          {/* Docentes */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <SeccionDocentes docentes={docentes} />
          </motion.div>
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
      <footer className="text-center text-xs text-[#677289] py-6 opacity-80 border-t border-[#23243b] mt-10 tracking-wide">
        © 2025 <span className="text-[#7c95c6] font-semibold">MyEnglishBro™</span>. Todos los derechos reservados.
      </footer>
    </div>
  );
}
