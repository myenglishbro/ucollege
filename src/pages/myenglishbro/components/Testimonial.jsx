import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://i.ibb.co/n12V4rY/eee.png",
  "https://i.ibb.co/Nn7th16/wwwwwww.png",
  "https://i.ibb.co/SmnHPYR/ej.png",
  "https://i.ibb.co/wRL1kk7/wewewewqqq.png",
  "https://i.ibb.co/LQNj4qx/Captura-de-pantalla-2025-01-02-122115.png",
  "https://i.ibb.co/n31h7T0/aswwq.png",
  "https://i.ibb.co/71NCRwB/wsw.png",
  "https://i.ibb.co/9bBMJcX/sss.png",
  "https://i.ibb.co/khxw777/aaa.png",
];

const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  const next = () =>
    setCurrent(current === images.length - 1 ? 0 : current + 1);

  const goTo = (i) => setCurrent(i);

  return (
    <section className="max-w-3xl mx-auto mt-14 px-2 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative rounded-3xl bg-gradient-to-br from-[#141928ee] via-[#1a2034ee] to-[#181e2aee] border border-[#242942] backdrop-blur-lg shadow-[0_6px_60px_0_#21306844] overflow-hidden"
      >
        {/* Carousel */}
        <div className="relative aspect-video sm:h-96 flex items-center justify-center bg-gradient-to-tr from-[#212436] via-[#1b2034] to-[#23273f]">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={`Testimonio ${current + 1}`}
              className="object-contain w-full h-full select-none rounded-2xl pointer-events-none transition-all"
              initial={{ opacity: 0, scale: 0.98, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.97, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              draggable={false}
            />
          </AnimatePresence>
        </div>
        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`
                w-4 h-4 rounded-full border
                transition-all duration-200
                ${current === i
                  ? "bg-[#6ca1ff] shadow-[0_0_6px_1px_#a5b4fc88] border-[#a5b4fc]"
                  : "bg-[#242942] hover:bg-[#384179] border-[#33384a]"}
                outline-none focus:ring-2 focus:ring-[#a5b4fc66]
              `}
            />
          ))}
        </div>
        {/* Controls */}
        <button
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#191d2a]/70 border border-[#283056] shadow-xl hover:bg-[#242942]/90 active:scale-90 transition rounded-full w-11 h-11 flex items-center justify-center backdrop-blur-lg group"
          onClick={prev}
        >
          <ChevronLeft className="w-6 h-6 text-[#a5b4fc] group-hover:text-white transition-colors" />
        </button>
        <button
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#191d2a]/70 border border-[#283056] shadow-xl hover:bg-[#242942]/90 active:scale-90 transition rounded-full w-11 h-11 flex items-center justify-center backdrop-blur-lg group"
          onClick={next}
        >
          <ChevronRight className="w-6 h-6 text-[#a5b4fc] group-hover:text-white transition-colors" />
        </button>
      </motion.div>

      {/* Call to action */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55 }}
        className="mt-8 text-gray-400 text-lg"
      >
        Deja tu testimonio en{" "}
        <a
          href="https://www.linkedin.com/in/carlosapolaya/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7ca3ff] hover:underline hover:text-[#a5b4fc] transition"
        >
          LinkedIn y gana 1 semana en la plataforma
        </a>
        .
      </motion.p>
    </section>
  );
};

export default Testimonial;
