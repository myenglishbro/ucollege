import Section from "./Section";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { benefits } from "../constants";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const BenefitCardHero = () => {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const benefit = benefits[current];

  const next = () => {
    setCurrent((current + 1) % benefits.length);
    setOpen(false);
  };
  const prev = () => {
    setCurrent((current - 1 + benefits.length) % benefits.length);
    setOpen(false);
  };

  return (
    <Section id="courses-hero" className="relative ">
      <div className="container max-w-[96vw] px-2 md:px-0">
        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-10 md:mb-12 text-center flex flex-col items-center select-none"
        >
          <div className="flex gap-3 mb-3 items-center">
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#223047] to-[#1a2336] w-9 h-9 shadow"
            >
              <Star className="text-[#bbc9e7] opacity-85" size={23} />
            </motion.span>
            <span className="uppercase tracking-wider text-[#7c95c6] font-bold text-[0.98rem]">
              Elige tu mejor ruta
            </span>
          </div>
          <h2
            className="text-[2rem] md:text-[2.7rem] font-extrabold leading-tight tracking-tight mb-2"
            style={{
              WebkitBackgroundClip: "text",
              letterSpacing: "-1.3px",
              lineHeight: "1.07",
            }}
          >
            Nuestros Cursos y Planes
          </h2>
          <p
            className="text-[1.08rem] md:text-lg text-[#b5d1fc] font-medium mt-1 max-w-xl mx-auto bg-[#181c28ec] rounded-xl px-5 py-2 border border-[#23263a75] shadow-[0_4px_32px_0_#26315218] backdrop-blur"
          >
            Elige tu ruta y lleva tu inglés al siguiente nivel.<br className="hidden md:block" />
            <span className="text-[#7c95c6] font-bold">Personalizado</span> y{" "}
            <span className="text-[#fbe49b] font-bold">100% práctico</span>.
          </p>
        </motion.div>

        {/* CARD PRINCIPAL */}
        <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto h-[420px] sm:h-[480px] md:h-[31rem] lg:h-[33rem] mb-7 rounded-[2.2rem] border overflow-hidden shadow-2xl shadow-[#181c28cc] border-[#23263a] bg-gradient-to-tr from-[#181c28f2] to-[#11131b]">
          {/* Imagen de fondo (blur) */}
          {benefit.imageUrl && (
            <motion.img
              key={benefit.imageUrl}
              src={benefit.imageUrl || benefit.imgGif}
              alt={benefit.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-60 blur-[2.5px] pointer-events-none"
              style={{
                filter: "saturate(1.09) brightness(1.06)",
              }}
              draggable={false}
              initial={{ scale: 1.045, opacity: 0.35 }}
              animate={{ scale: 1, opacity: 0.60 }}
              transition={{ duration: 0.7 }}
            />
          )}

          {/* Glass Layer animado */}
          <motion.div
            className="relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-10 p-4 md:p-9 w-full max-w-4xl"
            initial={{ opacity: 0, y: 54, filter: "blur(9px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            {/* LEFT: Info principal */}
            <div
              className="flex-1 flex flex-col gap-2 min-w-[170px] max-w-[400px] p-6 sm:p-7"
              style={{
                background: "rgba(18,22,34,0.90)",
                borderRadius: "1.3rem",
                border: "1px solid #23263a70",
                boxShadow: "0 8px 38px 0 #181b2a88, 0 2px 8px 0 #7c95c60a",
                backdropFilter: "blur(11px)",
              }}
            >
              {(benefit.title.includes("Premium") || benefit.title.includes("C2")) && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#202944] text-[#7c95c6] font-semibold text-xs uppercase mb-2 border border-[#263152] tracking-wide shadow">
                  <Star size={15} className="text-[#7c95c6]" />
                  PREMIUM
                </span>
              )}

              <h2 className="text-[1.28rem] sm:text-[1.54rem] md:text-[1.67rem] font-extrabold tracking-tight mb-1"
                style={{
                  letterSpacing: "-1.09px",
                  fontFamily: "inherit",
                  color: "#ecf1f9",
                }}>
                <span className="text-[#7c95c6]">{benefit.title}</span>
              </h2>

              <p className="text-[1.02rem] sm:text-[1.09rem] md:text-lg text-[#b5d1fc] font-normal mb-2 bg-[#1a202e2a] rounded-lg px-4 py-1 border border-[#23283b22]">
                {benefit.text}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                {benefit.details?.price && (
                  <b className="text-[#ede8c8] bg-[#3b394029] rounded px-2 py-0.5 shadow">
                    {benefit.details.price}
                  </b>
                )}
                {benefit.details?.enlace && (
                  <a
                    href={benefit.details.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      group inline-flex items-center justify-center
                      rounded-2xl px-7 py-2 min-h-[44px]
                      bg-[#21243a] border border-[#29314a88]
                      text-[#e3eeff] font-semibold text-base tracking-tight
                      transition-all duration-200 outline-none
                      hover:text-[#7c95c6] hover:border-[#7c95c6]
                      hover:bg-[#23263a] focus-visible:ring-2 focus-visible:ring-[#7c95c6]/30
                    `}
                  >
                    ¡Comienza ahora!
                    <ArrowRight className="ml-2 w-4 h-4 opacity-85 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                )}
              </div>

              {/* Botón ver detalles */}
              {benefit.details?.features && (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ boxShadow: "0 0 0 2px #7c95c677, 0 2px 12px #181c2866" }}
                  className={`
                    mt-4 px-4 py-2 inline-flex items-center gap-2 rounded-lg border border-[#263152]
                    text-[#9fbfe2] font-medium text-sm bg-transparent shadow-none
                    transition-all duration-200
                    hover:text-[#7c95c6] hover:border-[#7c95c6] hover:bg-[#191f2e]
                    focus-visible:ring-2 focus-visible:ring-[#7c95c6]/30 active:scale-95
                  `}
                  style={{ fontWeight: 500, letterSpacing: "0.01em" }}
                  onClick={() => setOpen((o) => !o)}
                  aria-expanded={open}
                  aria-controls="features-list"
                >
                  <span>{open ? "Ocultar detalles" : "Ver detalles"}</span>
                  <ArrowRight className={`transition-transform duration-300 ${open ? "rotate-90 scale-110" : ""}`} />
                </motion.button>
              )}
            </div>

            {/* Accordion: Detalles animados */}
            <AnimatePresence initial={false}>
              {open && benefit.details?.features && (
                <motion.div
                  key="features"
                  id="features-list"
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: 580 }}
                  exit={{ opacity: 0, maxHeight: 0 }}
                  transition={{ duration: 0.55, type: "spring" }}
                  className="w-full md:w-[260px] overflow-hidden shadow-inner"
                  style={{
                    background: "rgba(22,26,40,0.94)",
                    borderRadius: "1.13rem",
                    border: "1px solid #23263a60",
                    marginLeft: "0.5rem",
                    minHeight: "90px",
                    marginTop: "0.1rem",
                    boxShadow: "0 6px 22px 0 #23263a44",
                  }}
                >
                  <ul className="space-y-3 p-4">
                    {benefit.details.features.map((f, i) =>
                      typeof f === "string" ? (
                        <li key={i} className="flex items-start gap-2 text-[#eaf3fa] text-[13.5px]">
                          <span className="block w-2 h-2 mt-2 rounded-full bg-[#7c95c6] shadow shadow-[#7c95c6cc]" />
                          {f}
                        </li>
                      ) : (
                        <li key={i} className="flex items-center gap-2 text-[#eaf3fa] text-[14px]">
                          <span className="block">{f.icon}</span>
                          <span>{f.text}</span>
                        </li>
                      )
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* SVG Badge decorativo */}
          <div className="absolute top-7 right-6 z-20 pointer-events-none">
            <Star size={28} className="text-[#7c95c6] opacity-16" />
          </div>
        </div>

        {/* Slider nav */}
        <div className="flex items-center gap-2 justify-center mt-6 z-30 relative">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-[#20243a] border border-[#23263a] flex items-center justify-center text-[#7c95c6] hover:bg-[#23263a] hover:border-[#7c95c6] hover:shadow-[0_0_0_2px_#7c95c644] transition active:scale-95"
            aria-label="Anterior"
            style={{ boxShadow: "0 2px 10px #181c2844" }}
          >
            <ArrowLeft size={20} strokeWidth={2.1} />
          </button>
          <span className="text-[#b5d1fc] font-bold px-4 py-1 bg-[#23263a] rounded-full text-base select-none">
            {current + 1} / {benefits.length}
          </span>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-[#20243a] border border-[#23263a] flex items-center justify-center text-[#7c95c6] hover:bg-[#23263a] hover:border-[#7c95c6] hover:shadow-[0_0_0_2px_#7c95c644] transition active:scale-95"
            aria-label="Siguiente"
            style={{ boxShadow: "0 2px 10px #181c2844" }}
          >
            <ArrowRight size={20} strokeWidth={2.1} />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default BenefitCardHero;
