"use client";
import InfoBadge from './InfoBadge';
import Accordion from './Accordion';
import SeccionDocentes from './SeccionDocentes';
import AsidePanelModern from './AsidePanelModern';
import IncludesList from './IncludesList';
import LearningList from './LearningList';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Typing from 'react-typing-effect';
import { FaFacebookF, FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa';
import CategoryCarousel from './CategoryCarousel';
import PricingPlansDark from "./PricingPlansDark";
import FeaturedInStrip from "./FeaturedInStrip";
import React, { useRef } from "react";
export default function LandingVibrante({
  logo,
  titulo,
  descripcion,
  teacher,
  pricing, 

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
  mascotImage,
  registrarse
  
}) {

   const showPricing =
    !!pricing &&
    !!pricing.prices &&
    typeof pricing.prices.basicMonthly === "number" &&
    typeof pricing.prices.plusQuarterly === "number" &&
    typeof pricing.prices.proAnnual === "number";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden mt-10 relative">

      {/* Hero renovado */}
      <section className="w-full bg-[#1515FF] text-white px-6 py-20 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FE7EEB]/20 rounded-full blur-3xl opacity-30 animate-pulse" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="w-full lg:w-2/3 space-y-6">
            <span className="text-xs font-semibold tracking-wide bg-white text-[#1515FF] uppercase px-3 py-1.5 rounded-full shadow-sm inline-block">
              Your English Journey
            </span>
            <h1 className="text-5xl font-extrabold leading-tight">
              <span role="img" aria-label="comet">Ruta de Aprendizaje</span>{" "}
              <Typing
                text={[titulo, "Autónomo", "Real"]}
                speed={70}
                eraseSpeed={40}
                eraseDelay={1500}
                typingDelay={300}
              />
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
              <span>By <span className="underline hover:text-white cursor-pointer">{teacher}</span></span>
              <span className="mx-1 font-bold">·</span>
              <span>Updated {last_updated}</span>
              {idiomas?.map((lang, idx) => (
                <span key={idx} className="ml-1">{lang}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white text-[#1515FF] px-4 py-1.5 rounded-full text-sm font-semibold shadow">
                {badge.label}
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full text-sm font-semibold shadow">
                <Star size={14} strokeWidth={1.2} /> {ratings.score} ({ratings.votes})
              </span>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">{descripcion}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-pink-400 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-pink-500 transition"
              onClick={onAccessClick}
            >
              Let's get fluent!
            </motion.button>
          </div>

          <div className="relative overflow-visible">
            <AsidePanelModern
              video={video}
              precio={precio}
              precio_original={precio_original}
              descuento={descuento}
              precio_anual={precio_anual}
              oferta_time={oferta_time}
              soporte_wsp={soporte_wsp}
              onAccessClick={onAccessClick}
                registrarse={registrarse}   

            />
          </div>
        </div>
      </section>

    
<CategoryCarousel />

 {/* Solo se muestra si viene `pricing` válido */}
      {showPricing && (
        <PricingPlansDark
          prices={pricing.prices}
          currency={pricing.currency}
          baseMonthly={pricing.baseMonthly}
          onSelect={onAccessClick}
        />
      )}
{/* <FeaturedInStrip
  title="Somos partners de"
  logos={[
    { src: "https://i.ibb.co/1cjHk17/logo-1.png", alt: "ACE", name: "A.C.E. Academy" },
    { src: "https://i.ibb.co/1cjHk17/logo-1.png", alt: "ACE", name: "A.C.E. Academy" },
    { src: "https://i.ibb.co/1cjHk17/logo-1.png", alt: "ACE", name: "A.C.E. Academy" },
  ]}
  tone="light"
  autoScroll
  speed={40}
  pauseOnHover
  accent="#1515FF"
  logoHeight={80}   // más grande
  itemGap={64}      // espacio extra
  edgeWidth={96}
  showLabel         // muestra nombres
/> */}

      {/* INCLUDES FULL-WIDTH SECTION */}
        <IncludesList includes={includes} src={mascotImage || '/tupersonaje.png'} />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-6 mt-6">
        <div className="mb-12">
          
          <LearningList items={learning}  />
           <div className="mt-12">
             <Accordion data={rutas} />
           </div>
           
          <SeccionDocentes docentes={docentes} />
        </div>
      </main>

      {/* Footer */}
       
    <footer className="bg-[#1200ff] text-white px-8 pt-16 pb-10 rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo y CTA */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Learnibox</h2>
          <p className="mb-4 text-lg font-medium">
            Stop studying, start learning! ✨
          </p>
          <button className="bg-white text-[#1200ff] font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-all">
            Iniciar sesión →
          </button>
        </div>

        {/* Escuela */}
        <div>
          <h3 className="font-bold text-sm text-white/60 uppercase tracking-wide mb-4">Escuela</h3>
          <ul className="space-y-2">
            <li>Cursos</li>
            <li>Workshops</li>
            <li>Workbooks</li>
          </ul>
        </div>

        {/* Recursos */}
        <div>
          <h3 className="font-bold text-sm text-white/60 uppercase tracking-wide mb-4">Recursos</h3>
          <ul className="space-y-2">
            <li>Descargables</li>
            <li>Challenges</li>
            <li>Podcast</li>
            <li>Libros</li>
          </ul>
        </div>

        {/* Nosotros */}
        <div>
          <h3 className="font-bold text-sm text-white/60 uppercase tracking-wide mb-4">Nosotros</h3>
          <ul className="space-y-2">
            <li>Sobre Nosotros</li>
            <li>Contacto</li>
          </ul>
        </div>
      </div>

      {/* Línea divisoria */}
      <hr className="border-white/20 my-10" />

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80 gap-4">
        <div className="space-x-4">
          <span>© Myenglishbro! 2025</span>
          <a href="#" className="hover:underline">Política de Privacidad</a>
          <a href="#" className="hover:underline">Cookies</a>
          <a href="#" className="hover:underline">Términos y Condiciones</a>
        </div>

        <div className="flex gap-4 text-white text-xl">
          <a href="#" className="hover:scale-110 transition"><FaFacebookF /></a>
          <a href="#" className="hover:scale-110 transition"><FaInstagram /></a>
          <a href="#" className="hover:scale-110 transition"><FaYoutube /></a>
          <a href="#" className="hover:scale-110 transition"><FaSpotify /></a>
        </div>
      </div>
    </footer>
    </div>
  );
}
