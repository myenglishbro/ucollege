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
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden pt-10 mt-16 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-100 via-white to-indigo-100 animate-pulse-slow" />

      <main className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] max-w-7xl mx-auto px-6 gap-12 z-10 relative">
        <div>
          <section className="flex flex-col lg:flex-row items-start gap-8 mb-10">
            <div className="w-full lg:w-3/5 space-y-5">
              <span className="text-xs font-semibold tracking-wide bg-indigo-100 text-indigo-600 uppercase inline-block px-3 py-1.5 rounded-full shadow-sm">
                Your English Journey
              </span>
              <h1 className="text-5xl font-extrabold leading-tight">
                <span role="img" aria-label="comet">☄️</span> {titulo}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span>
                  By <span className="underline hover:text-gray-900 cursor-pointer transition">{teacher}</span>
                </span>
                <span className="mx-1 font-bold">·</span>
                <span>Updated {last_updated}</span>
                {idiomas?.length > 0 && (
                  <>
                    <span className="mx-1 font-bold">·</span>
                    {idiomas.map((lang, idx) => (
                      <span key={idx}>{lang}</span>
                    ))}
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="inline-block bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow">
                  {badge.label}
                </span>
                <span className="flex items-center gap-1 bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-full text-sm font-semibold shadow">
                  <Star size={14} strokeWidth={1.2} />
                  {ratings.score} ({ratings.votes})
                </span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {descripcion}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="w-full lg:w-2/5 flex justify-center"
            >
              <motion.div
                className="relative w-48 md:w-60 rounded-full overflow-visible group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-30 scale-110 bg-gradient-to-tr from-indigo-100 via-violet-100 to-pink-100" />
                <img
                  src={mascotImage || '/tupersonaje.png'}
                  alt="Mascota"
                  className="w-full object-contain select-none group-hover:scale-105 transition-transform"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </section>

          <div className="flex flex-wrap text-sm gap-3 mb-8">
            <span className="px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-600 font-medium">
              Language Learning
            </span>
            <span className="text-gray-400">/</span>
            <span className="px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-600 font-medium">
              Business English
            </span>
          </div>

          <LearningList items={learning} />
          <IncludesList includes={includes} />

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-10">
            <h2 className="text-3xl font-extrabold mb-2 text-indigo-800">
              Course Content 🚀
            </h2>
            <Accordion data={rutas} />
          </div>

          <SeccionDocentes docentes={docentes} />
        </div>

        <AsidePanelModern
          video={video}
          precio={precio}
          precio_original={precio_original}
          descuento={descuento}
          precio_anual={precio_anual}
          oferta_time={oferta_time}
          soporte_wsp={soporte_wsp}
          onAccessClick={onAccessClick}
        />
      </main>

      <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-200 mt-12">
        © 2025 <span className="text-gray-900 font-semibold">MyEnglishBro™</span>. Todos los derechos reservados.
      </footer>
    </div>
  );
}
