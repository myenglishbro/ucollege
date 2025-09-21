"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function AsidePanelModern({
  video,
  precio,
  precio_original,
  descuento,
  precio_anual,
  oferta_time,
  soporte_wsp,
  onAccessClick,
  registrarse // opcional
}) {
  const prefersReducedMotion = useReducedMotion?.() ?? false;
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <motion.aside
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      aria-label="Panel de compra"
      className="relative w-full md:w-80 mx-auto"
    >
      {/* Glass frame con borde degradado + shine superior */}
      <div className="relative rounded-[1.5rem] p-[1px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.10),rgba(99,102,241,0.22),rgba(255,255,255,0.10))]">
        <div className="relative rounded-[1.4rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl text-zinc-100 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]">
          {/* shine superior */}
          <div className="pointer-events-none absolute inset-x-4 -top-1 h-8 rounded-b-[1rem] bg-white/10 blur" />

          <div className="p-5 sm:p-6">
            {/* Video */}
            {video && (
              <div className="mb-5">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                  {/* skeleton shimmer mientras carga */}
                  {!videoLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(255,255,255,0.05)_8%,rgba(255,255,255,0.12)_18%,rgba(255,255,255,0.05)_33%)] bg-[length:200%_100%]" />
                  )}
                  <iframe
                    src={video}
                    title="Video Promocional"
                    className="w-full h-full"
                    onLoad={() => setVideoLoaded(true)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Precios */}
            <div className="text-center">
              <div className="text-3xl font-extrabold tracking-tight text-zinc-50">
                {precio}
                {precio_original && (
                  <span className="ml-2 align-middle text-base text-zinc-500 line-through font-medium">
                    {precio_original}
                  </span>
                )}
              </div>

              {descuento && (
                <div className="mt-1 text-sm font-semibold text-emerald-300">
                  ¡{descuento}!
                </div>
              )}

              {precio_anual && (
                <div className="mt-1 text-sm text-zinc-300">
                  <span className="font-medium text-indigo-300">Plan anual:</span> {precio_anual}
                </div>
              )}
            </div>

            {/* separador sutil */}
            <div className="my-5 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />

            {/* Oferta temporal */}
            {oferta_time && (
              <div className="flex justify-center mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium border border-amber-200/20 bg-amber-400/10 text-amber-200">
                  {oferta_time}
                </span>
              </div>
            )}

            {/* CTA principal */}
       {/* Botón principal (CTA) */}
<motion.button
  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
  onClick={onAccessClick}
  className="group relative z-10 mb-3 w-full rounded-full px-5 py-3 font-semibold
             border border-indigo-400/20 bg-indigo-400/10 hover:bg-indigo-400/15
             text-indigo-200 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]
             focus:outline-none focus:ring-2 focus:ring-indigo-400/30 backdrop-blur-sm transition"
  aria-label="Acceder"
>
  <span className="inline-flex items-center justify-center gap-1.5">
    Acceder
    <span
      aria-hidden
      className="transition-transform group-hover:translate-x-1"
    >
      →
    </span>
  </span>
</motion.button>


            {/* CTA Registrarse (opcional) */}
            {registrarse && (
              <motion.button
                whileHover={prefersReducedMotion ? undefined : { y: -1.5 }}
                onClick={() => window.open(registrarse, "_blank")}
                className="mb-4 w-full rounded-full px-5 py-3 font-semibold
                           border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] text-zinc-100
                           shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300/30"
                aria-label="Registrarse"
              >
                Registrarse
              </motion.button>
            )}

            {/* WhatsApp soporte */}
            {soporte_wsp && (
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/${soporte_wsp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm
                             border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] text-emerald-300
                             focus:outline-none focus:ring-2 focus:ring-emerald-300/25"
                  aria-label="Soporte por WhatsApp"
                >
                  <FaWhatsapp className="text-base" />
                  Soporte por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
