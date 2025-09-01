"use client";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * FeaturedInStrip – "Nos has visto en…" (logos grandes + nombre al lado) ✨
 *
 * Cambios:
 * - Logos más grandes por defecto (logoHeight = 80)
 * - Etiqueta/nombre al lado del logo (showLabel=true)
 * - Mantiene marquee continuo con fade lateral y pausa on hover
 */
const FeaturedInStrip = forwardRef(function FeaturedInStrip(
  {
    title = "Nos has visto en…",
    logos = [], // ahora soporta { src, alt, href, name? }
    tone = "light",
    autoScroll = true,
    speed = 120,
    pauseOnHover = true,
    accent = "#1515FF",
    logoHeight = 80,    // ▲ más grande
    itemGap = 56,       // ▲ un poco más de espacio por el nombre
    edgeWidth = 96,
    showGlow = false,
    showLabel = true,   // ▲ mostrar nombre al lado
    className = "",
  },
  ref
) {
  const isDark = tone === "dark";
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const controls = useAnimation();
  const [halfWidth, setHalfWidth] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useImperativeHandle(ref, () => ({ element: wrapperRef.current }), []);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Medición del track (usa duplicado para loop infinito)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setHalfWidth(el.scrollWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [logos]);

  // Animación marquee
  useEffect(() => {
    if (!autoScroll || halfWidth === 0 || prefersReduced) return;
    controls.start({
      x: -halfWidth,
      transition: {
        ease: "linear",
        duration: Math.max(1, halfWidth / speed),
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [autoScroll, halfWidth, speed, controls, prefersReduced]);

  const duplicated = [...logos, ...logos];

  const handleMouseEnter = () => { if (pauseOnHover) controls.stop(); };
  const handleMouseLeave = () => {
    if (pauseOnHover && autoScroll && halfWidth > 0 && !prefersReduced) {
      controls.start({
        x: -halfWidth,
        transition: {
          ease: "linear",
          duration: Math.max(1, halfWidth / speed),
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
  };

  const fadeLeft = isDark
    ? "bg-gradient-to-r from-[#0b0b12] to-transparent"
    : "bg-gradient-to-r from-white to-transparent";
  const fadeRight = isDark
    ? "bg-gradient-to-l from-[#0b0b12] to-transparent"
    : "bg-gradient-to-l from-white to-transparent";

  const labelBaseColor = isDark ? "#e5e7eb" : "#111827"; // stone-200 / gray-900

  return (
    <section className={`w-full ${isDark ? "bg-[#0b0b12] text-white" : "bg-white text-[#0e0f1a]"} ${className}`}>
      <div className={`relative max-w-7xl mx-auto px-6 ${isDark ? "border-t border-white/10" : "border-t border-black/10"} py-8`}>
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-6">
         
          <div className="flex items-center gap-3">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: accent }}>
              {title}
            </h3>
            <span
              className="text-[11px] font-semibold px-2 py-1 rounded-full select-none"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.08)",
              }}
            >
              Verified Partners
            </span>
          </div>
        </div>

        {/* Glow tras los logos (opcional) */}
        {showGlow && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 h-24 w-[85%] rounded-full blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${accent}22, transparent 70%)` }}
          />
        )}

        {/* Marquee wrapper */}
        <div
          ref={wrapperRef}
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Fades laterales */}
          <div className={`pointer-events-none absolute inset-y-0 left-0`} style={{ width: edgeWidth }}>
            <div className={`${fadeLeft} w-full h-full`} />
          </div>
          <div className={`pointer-events-none absolute inset-y-0 right-0`} style={{ width: edgeWidth }}>
            <div className={`${fadeRight} w-full h-full`} />
          </div>

          {/* Track animado */}
          <motion.div
            ref={trackRef}
            animate={controls}
            initial={{ x: 0 }}
            className="flex items-center py-3"
            style={{ willChange: "transform", gap: itemGap }}
          >
            {duplicated.map((logo, idx) => {
              const label = logo.name || logo.alt || "";
              const body = (
                <div className="group inline-flex items-center gap-4">
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    src={logo.src}
                    alt={logo.alt || "logo"}
                    width={logo.width || undefined}
                    height={logo.height || logoHeight}
                    className={`w-auto select-none ${
                      isDark ? "opacity-85 contrast-75 brightness-95" : "opacity-75 grayscale"
                    } group-hover:opacity-100 group-hover:grayscale-0`}
                    style={{ height: logoHeight }}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  {showLabel && (
                    <span
                      className="whitespace-nowrap text-base sm:text-lg font-semibold tracking-tight opacity-80 group-hover:opacity-100"
                      style={{ color: labelBaseColor }}
                    >
                      {label}
                    </span>
                  )}
                </div>
              );

              return (
                <div key={idx} className="shrink-0">
                  {logo.href ? (
                    <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.alt || "link"}>
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default FeaturedInStrip;

/* USO (ejemplo):
<FeaturedInStrip
  title="Somos partners de"
  avatars={["https://i.ibb.co/TqrbVmdM/Chat-GPT-Image-2-jul-2025-18-43-49.png"]}
  logos=[
    { src: "https://i.ibb.co/1cjHk17/logo-1.png", alt: "ACE", name: "ACE Academy" },
    { src: "https://i.ibb.co/1cjHk17/logo-1.png", alt: "ACE", name: "ACE Academy" },
    { src: "https://i.ibb.co/1cjHk17/logo-1.png", alt: "ACE", name: "ACE Academy" },
  ]
  tone="light"
  autoScroll
  speed={40}
  pauseOnHover
  accent="#1515FF"
  logoHeight={80}  // tamaño del logo
  itemGap={64}     // espacio logo-nombre y entre items
  edgeWidth={96}
  showLabel        // asegura que se muestre el nombre
/>
*/
