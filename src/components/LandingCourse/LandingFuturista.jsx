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
  badge, ratings, last_updated, idiomas, learning, includes, rutas, docentes, onAccessClick
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#16171d] to-[#1a1c2b] text-[#e4e8f5] font-sans overflow-x-hidden pt-10 mt-16">
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto pt-3 px-4 gap-8">
        {/* Columna Izquierda */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="text-xs flex flex-wrap gap-2 mb-4">
            <span className="bg-[#23243b]/50 px-3 py-1.5 rounded-full border border-[#23243b]/50 text-[#8a99b6] font-semibold">
              Language Learning
            </span>
            <span className="text-[#343b5a] font-bold">/</span>
            <span className="bg-[#23243b]/50 px-3 py-1.5 rounded-full border border-[#23243b]/50 text-[#4fc0a9] font-semibold">
              Business English
            </span>
          </nav>
          {/* Título y Descripción */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight text-[#e6eaf0] drop-shadow">
            {titulo}
          </h1>
          <p className="text-lg text-[#a2aec3] mb-4 font-medium">{descripcion}</p>
          {/* Badge + Rating */}
          <div className="flex flex-wrap gap-3 items-center mb-2">
            <InfoBadge className="bg-[#23243b]/60 border border-[#343b5a] text-[#a3bbf7] shadow">
              {badge.label}
            </InfoBadge>
            <span className="flex items-center gap-1 text-sm font-bold text-[#dbc176] bg-[#23243b]/60 px-3 py-1.5 rounded-full border border-[#363743]/60">
              {ratings.score} 
              <Star size={16} className="inline text-[#dbc176]" fill="#dbc176" strokeWidth={1.1} />
              <span className="font-normal text-[#a2aec3] ml-1">({ratings.votes} ratings)</span>
            </span>
            <span className="text-[#7c95c6] text-xs ml-3 font-medium">{ratings.students} students</span>
          </div>
          <div className="text-xs text-[#54a6b8] mb-2">
            Created by <span className="underline hover:text-[#7c95c6] cursor-pointer transition">{teacher}</span>
          </div>
          <div className="flex gap-5 text-xs text-[#8a99b6] mb-7">
            <span>Last updated {last_updated}</span>
            {idiomas && idiomas.map((lang, idx) => (
              <span key={idx}>{lang}</span>
            ))}
          </div>
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
