"use client";
import InfoBadge from './InfoBadge';
import Accordion from './Accordion';
import SeccionDocentes from './SeccionDocentes';
import AsidePanelModern from './AsidePanelModern';
import IncludesList from './IncludesList';
import LearningList from './LearningList';
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingVibrante({
  logo, titulo, descripcion, teacher, video, precio, precio_original, descuento, precio_anual, oferta_time, soporte_wsp,
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
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b29] via-[#2d1f37] to-[#1e1b29] text-[#FAF9F6] font-sans overflow-x-hidden pt-10 mt-16 relative">
      {/* Glow/blur effect */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#FFB703]/30 rounded-full blur-3xl opacity-60 pointer-events-none z-0" />

      <main className="flex flex-col md:flex-row max-w-7xl mx-auto pt-3 px-4 gap-8 z-10 relative">
        {/* Columna Izquierda (Hero + detalles) */}
        <div className="flex-1 min-w-0">
          <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-0">
            <div className="w-full md:w-2/3">
              <span className="text-xs font-bold tracking-widest text-[#FFB703] uppercase mb-1 inline-block">
                Your English Journey
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#FAF9F6] leading-tight drop-shadow mb-2">
                {titulo}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF] mb-3">
                <span>
                  Created by <span className="underline hover:text-[#3B82F6] cursor-pointer transition">{teacher}</span>
                </span>
                <span className="mx-1 text-[#9CA3AF] font-bold">·</span>
                <span>Last updated {last_updated}</span>
                {idiomas && idiomas.length > 0 && (
                  <>
                    <span className="mx-1 text-[#9CA3AF] font-bold">·</span>
                    {idiomas.map((lang, idx) => (
                      <span key={idx}>{lang}</span>
                    ))}
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="bg-[#FFB703]/20 border border-[#FFB703]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#FFB703] shadow hover:scale-105 transition">
                  {badge.label}
                </span>
                <span className="bg-[#8338EC]/20 border border-[#8338EC]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#8338EC] flex items-center gap-1 shadow hover:scale-105 transition">
                  {ratings.score}
                  <Star size={14} fill="#8338EC" strokeWidth={1.2} />
                  <span className="ml-1 text-[#f5f5f5] font-normal">{ratings.votes} ratings</span>
                </span>
                <span className="bg-[#3B82F6]/20 border border-[#3B82F6]/40 px-4 py-1.5 rounded-full text-xs font-semibold text-[#3B82F6] shadow hover:scale-105 transition">
                  Real Results
                </span>
              </div>
              <p className="text-lg md:text-xl font-medium text-[#E5E7EB] mb-5">
                {descripcion}
              </p>
            </div>

            {/* Mascot Image */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="w-full flex justify-center items-center md:w-1/3 relative z-10"
            >
              <motion.div
                className="relative w-[170px] md:w-[220px] rounded-2xl overflow-visible group transition-all duration-500"
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-70 scale-125
                  bg-gradient-to-tr from-[#FFB703]/20 via-[#3B82F6]/10 to-[#8338EC]/20"
                />
                <img
                  src={mascotImage || "/tupersonaje.png"}
                  alt="Mascota del curso"
                  className="w-full h-auto object-contain select-none transition-transform duration-500 ease-in-out group-hover:scale-105"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </section>

          <nav className="text-xs flex flex-wrap gap-2 mb-4 mt-3 items-center">
            <span className="bg-[#8338EC]/20 px-3 py-1.5 rounded-full border border-[#8338EC]/30 text-[#8338EC] font-semibold">
              Language Learning
            </span>
            <span className="text-[#9CA3AF] font-bold mx-1">/</span>
            <span className="bg-[#3B82F6]/20 px-3 py-1.5 rounded-full border border-[#3B82F6]/30 text-[#3B82F6] font-semibold">
              Business English
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mb-6"
          >
            <LearningList items={learning} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.11 }}
            className="mb-7"
          >
            <IncludesList includes={includes} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="bg-gradient-to-br from-[#8338EC]/10 to-[#1e1b29]/90 border border-[#8338EC]/30 rounded-xl p-6 mb-8 shadow-xl shadow-[#191c25cc] backdrop-blur"
          >
            <h2 className="font-bold text-lg mb-3 text-[#FAF9F6]">Course content</h2>
            <Accordion data={rutas} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <SeccionDocentes docentes={docentes} />
          </motion.div>
        </div>

        <AsidePanelModern
          video={video}
          precio={precio}
          precio_original={precio_original}
          precio_anual={precio_anual}
          oferta_time={oferta_time}
          soporte_wsp={soporte_wsp}
          onAccessClick={onAccessClick}
        />
      </main>

      <footer className="text-center text-xs text-[#9CA3AF] py-6 opacity-80 border-t border-[#2c2c3a] mt-10 tracking-wide">
        © 2025 <span className="text-[#FFB703] font-semibold">MyEnglishBro™</span>. Todos los derechos reservados.
      </footer>
    </div>
  );
}
