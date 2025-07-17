"use client";
import InfoBadge from './InfoBadge';
import Accordion from './Accordion';
import SeccionDocentes from './SeccionDocentes';
import AsidePanelModern from './AsidePanelModern';
import IncludesList from './IncludesList';
import LearningList from './LearningList';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingVibrante({
  logo,
  titulo,
  descripcion,
  teacher,
  video,
  precio,
  precio_original,
  descuento,
  precio_anual,
  oferta_time,
  soporte_wsp,
  badge = { label: 'Premium' },
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c15] via-[#1b1136] to-[#0f0c15] text-slate-200 font-sans overflow-x-hidden pt-10 mt-16 relative">
      {/* Intensified gradient glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#4f46e5]/20 via-[#3b82f6]/20 to-[#9333ea]/20 rounded-full blur-2xl opacity-50 pointer-events-none z-0" />

      <main className="flex flex-col md:flex-row max-w-7xl mx-auto pt-3 px-6 gap-10 z-10 relative">
        {/* Left Column */}
        <div className="md:w-2/3 flex-1 min-w-0">
          <section className="flex flex-col md:flex-row items-start gap-8 mb-6">
            <div className="w-full md:w-2/3">
              <span className="text-sm font-semibold tracking-wide bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent uppercase mb-1 inline-block">
                Your English Journey
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent leading-tight mb-3">
                {titulo}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-4">
                <span>
                  By <span className="underline hover:text-slate-200 cursor-pointer transition">{teacher}</span>
                </span>
                <span className="mx-1 font-bold">·</span>
                <span>Updated {last_updated}</span>
                {idiomas && idiomas.length > 0 && (
                  <>
                    <span className="mx-1 font-bold">·</span>
                    {idiomas.map((lang, idx) => (
                      <span key={idx}>{lang}</span>
                    ))}
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <span className="inline-block bg-gradient-to-r from-indigo-700 to-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold text-white shadow-lg">
                  {badge.label}
                </span>
                <span className="flex items-center gap-1 bg-gradient-to-r from-purple-700 to-indigo-600 px-3 py-1.5 rounded-full text-sm font-semibold text-white shadow-lg">
                  <Star size={14} strokeWidth={1.2} className="text-white" />
                  {ratings.score} ({ratings.votes})
                </span>
              </div>

              <p className="text-lg font-medium text-slate-300 mb-6">
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
                  className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-30 scale-110 bg-gradient-to-tr from-[#4f46e5]/30 via-[#3b82f6]/20 to-[#9333ea]/30"
                />
                <img
                  src={mascotImage || '/tupersonaje.png'}
                  alt="Mascota del curso"
                  className="w-full h-auto object-contain select-none transition-transform duration-500 ease-in-out group-hover:scale-105"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </section>

          {/* Navigation Tags */}
          <nav className="flex flex-wrap text-sm gap-3 mb-6">
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 text-white font-medium">
              Language Learning
            </span>
            <span className="text-slate-400">/</span>
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 text-white font-medium">
              Business English
            </span>
          </nav>

          {/* Learning & Includes Lists */}
          <div className="mb-6">
            <LearningList items={learning} />
          </div>
          <div className="mb-8">
            <IncludesList includes={includes} />
          </div>

          {/* Course Content Accordion */}
          <div className="bg-gradient-to-br from-[#1b1136]/80 via-[#2b1b4a]/80 to-[#1b1136]/80 border border-slate-600 rounded-xl p-6 mb-8 backdrop-blur-sm shadow-lg">
            <h2 className="font-semibold text-xl bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent mb-4">
              Course content
            </h2>
            <Accordion data={rutas} />
          </div>

          {/* Instructors Section */}
          <SeccionDocentes docentes={docentes} />
        </div>

        {/* Aside Panel */}
        <div className="md:w-1/3 flex-shrink-0 mt-8 md:mt-0">
          <AsidePanelModern
            video={video}
            precio={precio}
            precio_original={precio_original}
            precio_anual={precio_anual}
            oferta_time={oferta_time}
            soporte_wsp={soporte_wsp}
            onAccessClick={onAccessClick}
          />
        </div>
      </main>

      <footer className="text-center text-sm text-slate-400 py-6 border-t border-slate-700 mt-12 tracking-wide">
        © 2025 <span className="text-slate-200 font-semibold">MyEnglishBro™</span>. Todos los derechos reservados.
      </footer>
    </div>
  );
}
