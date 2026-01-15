"use client";
import Accordion from './Accordion';
import SeccionDocentes from './SeccionDocentes';
import AsidePanelModern2 from './AsidePanelModern2';
import IncludesList from './IncludesList';
import LearningList from './LearningList';
import { Star } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Typing from 'react-typing-effect';
import { FaFacebookF, FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa';
import CategoryCarousel from './CategoryCarousel';
import HeroKicker from './HeroKicker';

/**
 * Dark Premium palette (subtle, sober, non‑neon)
 * --bg: slate-950 (#0b0f19)
 * --panel: #0f1626 / #121a2b
 * --muted: #9aa4b2
 * --ring: #c7d2fe (indigo-200) at low opacity
 * --accent: #4f46e5 (indigo-600) used sparingly
 */

// Reusable floating pill
function FloatingPill({ children, className = "", delay = 0, y = 12, rotate = 2, style }) {
  const prefersReducedMotion = useReducedMotion?.() ?? false;
  if (prefersReducedMotion) {
    return (
      <div className={`pointer-events-none select-none ${className}`} style={style} aria-hidden>
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] text-[12px] font-semibold text-zinc-100 px-3 py-1 shadow-xl">
          {children}
        </div>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y, rotate }}
      animate={{ opacity: 1, y: [y, -y, y], rotate: [rotate, -rotate, rotate] }}
      transition={{ delay, duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      className={`pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.06] text-[12px] font-semibold text-zinc-100 px-3 py-1 shadow-xl backdrop-blur">
        {children}
      </div>
    </motion.div>
  );
}

// Soft orb
function Orb({ className = "", delay = 0 }) {
  const prefersReducedMotion = useReducedMotion?.() ?? false;
  const anim = prefersReducedMotion
    ? {}
    : { scale: [1, 1.04, 1], opacity: [0.08, 0.14, 0.08] };
  return (
    <motion.div
      initial={{ opacity: 0.06 }}
      animate={anim}
      transition={{ delay, duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      aria-hidden
    />
  );
}

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
  mascotImage,
  registrarse
}) {
  const prefersReducedMotion = useReducedMotion?.() ?? false;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-zinc-100 font-sans overflow-x-hidden pt-10 relative">
      {/* HERO */}
      <section className="w-full relative overflow-hidden rounded-b-[2.5rem]" aria-label="Hero">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(79,70,229,0.18),transparent_60%),radial-gradient(900px_500px_at_-10%_10%,rgba(14,165,233,0.12),transparent_60%),linear-gradient(180deg,#0b0f19_0%,#0c1222_40%,#0b0f19_100%)]" />

        {/* Orbs */}
        <Orb className="-bottom-24 -left-24 h-96 w-96 bg-white/10" delay={0.2} />
        <Orb className="-top-10 right-0 h-64 w-64 bg-indigo-300/20" delay={0.5} />
        <Orb className="top-1/3 -right-32 h-72 w-72 bg-sky-300/15" delay={1.2} />

        {/* Floating Pills Layer */}
      
        
        <FloatingPill className="absolute top-10 right-16" delay={0.6} y={14}>
          🔬 Método moderno
        </FloatingPill>
        <FloatingPill className="absolute bottom-12 right-10" delay={1.1} y={20}>
          🤝 Convenios top
        </FloatingPill>

       

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
              <HeroKicker />

           

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-zinc-50">
              <span className="sr-only">Ruta de Aprendizaje</span>
              <span aria-hidden>CIC - </span>
              <Typing text={[titulo, 'potencIA', 'tu experiencIA']} speed={60} eraseSpeed={38} eraseDelay={1400} typingDelay={250} />
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-300/80">
              <span>
                By{' '}
                <button
                  type="button"
                  className="underline decoration-dotted underline-offset-4 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 rounded"
                  onClick={onAccessClick}
                >
                  {teacher}
                </button>
              </span>
              <span className="mx-1 font-bold">·</span>
              <span>Updated {last_updated}</span>
              {idiomas?.map((lang, idx) => (
                <span key={idx} className="ml-1 px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                  {lang}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="bg-white/5 text-zinc-100 px-4 py-1.5 rounded-full text-sm font-semibold border border-white/10 backdrop-blur-sm">
                {badge.label}
              </span>
              <span className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full text-sm font-semibold border border-white/10 backdrop-blur-sm text-zinc-200">
                <Star size={14} strokeWidth={1.4} className="opacity-80" /> {ratings.score} ({ratings.votes})
              </span>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl">{descripcion}</p>

            <motion.button
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-6 py-3 font-semibold text-zinc-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] backdrop-blur hover:bg-zinc-900/70 focus:outline-none focus:ring-2 focus:ring-indigo-300/30"
              onClick={onAccessClick}
              aria-label="Get access"
            >
              <span>Start now</span>
              <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden>→</span>
            </motion.button>
          </div>

          <div className="lg:col-span-5 relative">
            
            {/* Side panel */}
            <AsidePanelModern2
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

            {/* Floating tag near panel */}
            <FloatingPill className="absolute -top-4 -left-4" delay={0.7} y={10}>🌎 Conexión global</FloatingPill>
          </div>
        </div>
      </section>

      {/* Category carousel */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
          <CategoryCarousel />
        </div>
      </div>

      {/* INCLUDES */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <IncludesList includes={includes} src={mascotImage || '/tupersonaje.png'} />
      </div>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 mt-8">
        <div className="mb-12">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur p-4 sm:p-6">
            <LearningList items={learning} />
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur p-4 sm:p-6">
            <Accordion data={rutas} />
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur p-4 sm:p-6">
            <SeccionDocentes docentes={docentes} />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0c1222] text-zinc-200 px-8 pt-16 pb-10 rounded-t-3xl border-t border-white/10 mt-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold mb-2 text-zinc-100 tracking-tight">Learnibox</h2>
            <p className="mb-4 text-base text-zinc-300">Stop studying, start learning.</p>
            <button className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 font-semibold text-zinc-100 shadow-sm hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-indigo-300/30">Iniciar sesión →</button>
          </div>

          {/* Escuela */}
          <div>
            <h3 className="font-bold text-xs text-zinc-400 uppercase tracking-wide mb-4">Escuela</h3>
            <ul className="space-y-2 text-zinc-300">
              <li><a className="hover:text-zinc-100" href="/courses">Cursos</a></li>
              <li><a className="hover:text-zinc-100" href="/workshops">Workshops</a></li>
              <li><a className="hover:text-zinc-100" href="/workbooks">Workbooks</a></li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-bold text-xs text-zinc-400 uppercase tracking-wide mb-4">Recursos</h3>
            <ul className="space-y-2 text-zinc-300">
              <li><a className="hover:text-zinc-100" href="/resources">Descargables</a></li>
              <li><a className="hover:text-zinc-100" href="/challenges">Challenges</a></li>
              <li><a className="hover:text-zinc-100" href="/podcast">Podcast</a></li>
              <li><a className="hover:text-zinc-100" href="/books">Libros</a></li>
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h3 className="font-bold text-xs text-zinc-400 uppercase tracking-wide mb-4">Nosotros</h3>
            <ul className="space-y-2 text-zinc-300">
              <li><a className="hover:text-zinc-100" href="/about">Sobre Nosotros</a></li>
              <li><a className="hover:text-zinc-100" href="/contact">Contacto</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400 gap-4">
          <div className="space-x-4">
            <span>© Myenglishbro! 2025</span>
            <a href="/privacy" className="hover:text-zinc-200">Política de Privacidad</a>
            <a href="/cookies" className="hover:text-zinc-200">Cookies</a>
            <a href="/terms" className="hover:text-zinc-200">Términos y Condiciones</a>
          </div>

          <div className="flex gap-4 text-zinc-300 text-xl">
            <a href="https://www.facebook.com/" className="hover:scale-[1.08] transition" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.instagram.com/_myenglishbro" className="hover:scale-[1.08] transition" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.youtube.com/@_myenglishbro" className="hover:scale-[1.08] transition" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://open.spotify.com/" className="hover:scale-[1.08] transition" aria-label="Spotify"><FaSpotify /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
