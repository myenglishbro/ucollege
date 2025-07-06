import React from "react";
import { Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";

const flareVariants = {
  initial: { opacity: 0, scale: 0.5, rotate: 0 },
  animate: {
    opacity: [0.5, 1, 0],
    scale: [0.5, 1.6, 2.4],
    rotate: [0, 44, 88],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 2,
      ease: "easeInOut"
    }
  }
};

const Hero = () => {
  return (
    <Section>
      {/* Glass Card Main */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-4 md:gap-0"
        style={{
          backdropFilter: "blur(14px)",
          background: "rgba(18,21,34,0.88)",
          borderRadius: "2.4rem",
          border: "2px solid #23263a99",
        }}
      >
        {/* Text Side */}
        <div className="w-full md:w-[54%] p-6 md:pl-10 md:py-12 flex flex-col items-start">
          <div className="flex gap-2 mb-2 items-center">
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="rounded-full bg-gradient-to-br from-[#253152] to-[#202334] w-9 h-9 flex items-center justify-center"
            >
              <Sparkles className="text-[#5d6b86] opacity-80" size={25} />
            </motion.span>
            <span className="uppercase tracking-wider text-[#5a6d92] font-semibold text-xs">
              Your English Journey
            </span>
          </div>
          <h1 className="text-[2.2rem] md:text-[2.6rem] font-extrabold leading-tight tracking-tight text-[#e8ebf1] mb-2">
            <span className="text-[#42587a]">Hello!</span> MyEnglishBro
          </h1>
          <p className="text-lg md:text-xl text-[#8b97ae] mb-8 font-medium">
            Aprender inglés{" "}
            <span className="relative inline-block group">
              <b
                className="text-[#ede8c8] bg-[#3b394026] rounded px-2 py-0.5 shadow-sm transition-all duration-200"
                style={{
                  boxShadow: "0 0 12px 0 #ede8c826",
                }}
              >
                puede ser fácil y divertido
              </b>
              {/* Glow animado sutil */}
              <motion.span
                layoutId="glow"
                className="absolute -inset-1 z-[-1] rounded blur-[7px] opacity-55 pointer-events-none"
                initial={{ opacity: 0.35 }}
                animate={{ opacity: [0.35, 0.65, 0.35] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                style={{
                  background: "radial-gradient(ellipse at 60% 70%, #ede8c844 40%, transparent 75%)"
                }}
              />
            </span>
            .<br />
            Clases 1:1, feedback en vivo y{" "}
            <span className="text-[#788db5] font-semibold">progreso real</span>. <br />
            {/* Badge animado para Level Up */}
            <motion.span
              className="inline-flex items-center mt-2 text-[#9ba6c4] font-bold text-base gap-2"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.11, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            >
              Level Up{" "}
              <span className="font-normal text-[#6a7a97]">/ˈlɛvəl ʌp/</span>
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <circle cx={8} cy={8} r={7.3} stroke="#7c95c6" strokeWidth={1.4} opacity={0.16} />
                <circle cx={8} cy={8} r={2.6} fill="#7c95c6" opacity={0.22} />
              </svg>
            </motion.span>
          </p>
          {/* Tooltip con AnimatePresence */}
          <div className="relative group">
            <motion.a
              href="https://api.whatsapp.com/send?phone=51926922032&text=Hola%20quiero%20informacion%20sobre%20el%20curso"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.065,
                boxShadow: "0 0 0 3px #313c5275",
              }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center gap-2
                px-8 py-3 rounded-2xl font-bold uppercase text-sm
                bg-[#181b2a]/90 border border-[#29314a88]
                text-[#e8ebf1]
                transition-all duration-200
                hover:bg-[#23263a]/90
                hover:text-[#7c95c6]
                focus-visible:ring-2 focus-visible:ring-[#313c52]
                outline-none
                shadow-none
              `}
              tabIndex={0}
            >
              Start Now
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                className="inline align-middle text-[#475470] group-hover:text-[#7c95c6] transition-colors"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
            <AnimatePresence>
              <motion.div
                className="absolute left-1/2 top-full mt-3 -translate-x-1/2 w-max bg-[#161b28] px-4 py-2 rounded-xl text-xs text-[#b6bad6] font-medium border border-[#2a2e41] opacity-0 group-hover:opacity-100 pointer-events-none z-30 transition-all shadow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.23 }}
              >
                Escríbeme directo por WhatsApp
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Image Side with Glass Style */}
        <div className="flex justify-center items-center w-full md:w-[46%] p-4 md:pr-10 md:py-12 -mt-8 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.13 }}
            whileHover={{
              boxShadow: "0 0 36px 0 #7c95c633",
              scale: 1.025,
            }}
            className="relative rounded-3xl p-2 transition-all duration-200"
            style={{
              background: "linear-gradient(120deg,rgba(38,42,60,0.18) 70%,rgba(60,90,127,0.11) 100%)",
              border: "2px solid #2d314055",
              maxWidth: "330px",
            }}
          >
            <img
              className="w-full max-w-[310px] rounded-[1.4rem] bg-[#181b2a]"
              src="https://i.ibb.co/YBBvdhz8/Chat-GPT-Image-4-jul-2025-11-23-15.png"
              alt="MyEnglishBro Mascot"
              draggable={false}
            />
            {/* Star icon badge con flare animado */}
            <div className="absolute bottom-4 right-4">
              <Star size={27} className="text-[#d7bd71]" strokeWidth={1.5} />
              {/* Flare animado sobre la estrella */}
              <motion.svg
                width={18}
                height={18}
                className="absolute -top-2 left-2 pointer-events-none"
                variants={flareVariants}
                initial="initial"
                animate="animate"
                style={{ filter: "blur(2.5px)" }}
              >
                <circle
                  cx={9}
                  cy={9}
                  r={6}
                  fill="#fff4db"
                  fillOpacity={0.4}
                />
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Hero;
