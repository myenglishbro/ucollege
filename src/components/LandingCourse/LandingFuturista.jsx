"use client";
import InfoBadge from './InfoBadge';
import Accordion from './Accordion';
import SeccionDocentes from './SeccionDocentes';
import AsidePanelModern from './AsidePanelModern';
import IncludesList from './IncludesList';
import LearningList from './LearningList';
import { FaStar } from "react-icons/fa";

export default function LandingFuturista({
  logo, titulo, descripcion, teacher, video, precio, precio_original, descuento, oferta_time, soporte_wsp,
  badge, ratings, last_updated, idiomas, learning, includes, rutas, docentes, onAccessClick
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#16171d] to-[#23243b] text-white font-sans overflow-x-hidden pt-10 mt-15">
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
          <LearningList items={learning} />
          {/* Course includes */}
          <IncludesList includes={includes} />
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
      <footer className="text-center text-xs text-[#7b8494] py-6 opacity-80 border-t border-[#23243b] mt-10">
        © 2025 MyEnglishBro™. Todos los derechos reservados.
      </footer>
    </div>
  );
}
