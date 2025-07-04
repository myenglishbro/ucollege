import Section from "./Section";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { benefits } from "../constants";
import Arrow from "../assets/svg/Arrow";

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
    <Section id="courses-hero">
      <div className="container max-w-[96vw] px-2 md:px-0">

        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-10 md:mb-12 text-center flex flex-col items-center select-none"
        >
          <div className="flex gap-3 mb-3 items-center">
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#46b3f7] to-[#253755] w-9 h-9 shadow-lg shadow-[#46b3f788]">
              <svg width="24" height="24" viewBox="0 0 24 24" className="animate-spin-slow">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#b5eaff" strokeWidth="2.6" opacity="0.14" />
                <path d="M12 6v6l4 2" stroke="#46b3f7" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="uppercase tracking-wider text-[#46b3f7] font-bold text-[0.98rem]">
              Elige tu mejor ruta
            </span>
          </div>
          <h2
            className="text-[2rem] md:text-[2.7rem] font-extrabold leading-tight tracking-tight mb-2"
            style={{
              background: "linear-gradient(110deg,#46b3f7 65%,#b5eaff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-1.5px",
              lineHeight: "1.07"
            }}
          >
            Nuestros Cursos y Planes
          </h2>
          <p
            className="text-[1.08rem] md:text-lg text-[#b5d1fc] font-medium mt-1 max-w-xl mx-auto bg-[#161e2ed8] rounded-xl px-5 py-2 border border-[#26314866] shadow-[0_4px_32px_0_#36a6f72b] backdrop-blur"
          >
            Elige tu ruta y lleva tu inglés al siguiente nivel.<br className="hidden md:block" />
            <span className="text-[#46b3f7] font-bold">Personalizado</span> y <span className="text-[#ffe185] font-bold">100% práctico</span>.
          </p>
        </motion.div>

        {/* CARD PRINCIPAL */}
        <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto h-[420px] sm:h-[480px] md:h-[31rem] lg:h-[33rem] mb-7 rounded-[2.3rem] border overflow-hidden shadow-2xl shadow-[#192237dd] border-[#223047] bg-gradient-to-tr from-[#161925e6] to-[#10121bcf]">
          {/* Imagen de fondo */}
          {benefit.imageUrl && (
            <motion.img
              key={benefit.imageUrl}
              src={benefit.imageUrl || benefit.imgGif}
              alt={benefit.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-65 blur-[2px] pointer-events-none"
              style={{
                filter: "saturate(1.18) brightness(1.13)",
              }}
              draggable={false}
              initial={{ scale: 1.06, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 0.65 }}
              transition={{ duration: 0.7 }}
            />
          )}

          {/* Glass Layer animado */}
          <motion.div
            className="relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-12 p-5 md:p-9 w-full max-w-4xl"
            initial={{ opacity: 0, y: 50, filter: "blur(7px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* LEFT: Info principal */}
            <div
              className="flex-1 flex flex-col gap-2 min-w-[170px] max-w-[400px] p-6 sm:p-7"
              style={{
                background: "rgba(18,22,34,0.89)",
                borderRadius: "1.4rem",
                border: "1px solid #23283bb7",
                boxShadow: "0 6px 48px 0 #101729ad, 0 2px 8px 0 #46b3f70f",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {(benefit.title.includes("Premium") || benefit.title.includes("C2")) && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#26344b] text-[#46b3f7] font-semibold text-xs uppercase mb-2 border border-[#314369] tracking-wide shadow shadow-[#46b3f755]">
                  <svg width="16" height="16" viewBox="0 0 18 18">
                    <path d="M9 1.5l2.1 4.25 4.6.5-3.4 3.3.9 4.6L9 11.35l-4.2 2.8.9-4.6-3.4-3.3 4.6-.5L9 1.5z" fill="#46b3f7" />
                  </svg>
                  PREMIUM
                </span>
              )}

              <h2 className="text-[1.3rem] sm:text-[1.55rem] md:text-[1.75rem] font-extrabold tracking-tight mb-1"
                style={{
                  letterSpacing: "-1.1px",
                  fontFamily: "inherit",
                  color: "#ecf1f9"
                }}>
                <span className="text-[#46b3f7]">{benefit.title}</span>
              </h2>

              <p className="text-[1.01rem] sm:text-[1.07rem] md:text-lg text-[#b5d1fc] font-normal mb-2 bg-[#1a202e44] rounded-lg px-4 py-1 border border-[#23283b55]">
                {benefit.text}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                {benefit.details?.price && (
                 <b className="text-[#fff8de] bg-[#ffe0852a] rounded px-2 py-0.5 shadow">
                    {benefit.details.price}
                  </b>
                )}
                {benefit.details?.enlace && (
                  <a
                    href={benefit.details.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group inline-flex items-center justify-center
                      rounded-2xl px-7 py-2 min-h-[44px]
                      bg-gradient-to-br from-[#252a44] to-[#182139]
                      border border-[#26344b]
                      text-[#e3eeff] font-semibold text-base tracking-tight
                      transition-all duration-200 outline-none
                      hover:text-[#46b3f7] hover:border-[#46b3f7]
                      hover:bg-[#1c263a] focus-visible:ring-2 focus-visible:ring-[#46b3f7]/40
                    "
                  >
                    ¡Comienza ahora!
                    <svg
                      className="ml-2 w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Botón ver detalles */}
              {benefit.details?.features && (
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ boxShadow: "0 0 0 2px #46b3f777, 0 2px 16px #10172988" }}
                  className="
                    mt-4 px-4 py-2 inline-flex items-center gap-2 rounded-lg border border-[#26344b]
                    text-[#99bee7] font-medium text-sm bg-transparent shadow-none
                    transition-all duration-200
                    hover:text-[#46b3f7] hover:border-[#46b3f7] hover:bg-[#191f2e]
                    focus-visible:ring-2 focus-visible:ring-[#46b3f7]/30 active:scale-95
                  "
                  style={{ fontWeight: 500, letterSpacing: "0.01em" }}
                  onClick={() => setOpen((o) => !o)}
                  aria-expanded={open}
                  aria-controls="features-list"
                >
                  <span>{open ? "Ocultar detalles" : "Ver detalles"}</span>
                  <Arrow className={`transition-transform duration-300 ${open ? "rotate-90 scale-110" : ""}`} />
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
                  animate={{ opacity: 1, maxHeight: 500 }}
                  exit={{ opacity: 0, maxHeight: 0 }}
                  transition={{ duration: 0.55, type: "spring" }}
                  className="w-full md:w-[260px] overflow-hidden shadow-inner"
                  style={{
                    background: "rgba(22,26,40,0.92)",
                    borderRadius: "1.15rem",
                    border: "1px solid #25314a80",
                    marginLeft: "0.5rem",
                    minHeight: "90px",
                    marginTop: "0.1rem",
                    boxShadow: "0 6px 22px 0 #18204888",
                  }}
                >
                  <ul className="space-y-2 p-4">
                    {benefit.details.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#eaf3fa] text-[13.2px]">
                        <span className="block w-2 h-2 mt-2 rounded-full bg-[#46b3f7] shadow shadow-[#46b3f7cc]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* SVG Badge decorativo */}
          <div className="absolute top-7 right-6 z-20 pointer-events-none">
            <svg width="30" height="30" viewBox="0 0 34 34">
              <path d="M17 3l4.09 8.26L30 12.27l-6.18 6.02L25.18 29 17 24.27 8.82 29l1.36-10.71L4 12.27l8.91-1.01L17 3z" fill="#46b3f7" stroke="#b8dafe" strokeWidth="1.5" opacity=".17" />
            </svg>
          </div>
        </div>

        {/* Slider nav */}
        <div className="flex items-center gap-2 justify-center mt-6 z-30 relative">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full bg-[#181c25] border border-[#23283b] flex items-center justify-center text-[#46b3f7] hover:bg-[#23283b] hover:border-[#46b3f7] hover:shadow-[0_0_0_2px_#46b3f744] transition"
            aria-label="Anterior"
            style={{ boxShadow: "0 2px 10px #161e2e88" }}
          >
            &#8592;
          </button>
          <span className="text-[#b5d1fc] font-bold px-4 py-1 bg-[#202840] rounded-full text-base select-none">{current + 1} / {benefits.length}</span>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full bg-[#181c25] border border-[#23283b] flex items-center justify-center text-[#46b3f7] hover:bg-[#23283b] hover:border-[#46b3f7] hover:shadow-[0_0_0_2px_#46b3f744] transition"
            aria-label="Siguiente"
            style={{ boxShadow: "0 2px 10px #161e2e88" }}
          >
            &#8594;
          </button>
        </div>
      </div>
    </Section>
  );
};

export default BenefitCardHero;
