import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, MessageCircle } from "lucide-react";

const ImageSlider = () => {
  const images = [
    { src: "https://i.ibb.co/gM9ZgSDz/20.jpg", text: "Grupo A - Lunes y Miércoles" },
    { src: "https://i.ibb.co/nM721v1r/21.jpg", text: "Grupo B - Martes y Jueves" },
    { src: "https://i.ibb.co/6cKwHZnV/22.jpg", text: "Grupo C - Viernes y Sábado" },
    { src: "https://i.ibb.co/RTTZ0NHn/23.jpg", text: "Grupo D - Lunes y Viernes" },
    { src: "https://i.ibb.co/zhmwsD2q/24.jpg", text: "Grupo E - Miércoles y Sábado" },
    { src: "https://i.ibb.co/kVX0bCzt/25.jpg", text: "Grupo F - Martes y Jueves" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Sección de slider */}
        <div className="relative w-full md:w-1/2 h-[600px] flex items-center justify-center">
          <h2 className="absolute top-4 left-4 text-white text-2xl font-bold">
            Horarios de los Grupos
          </h2>
          {images.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <AnimatePresence key={index}>
                {isActive && (
                  <motion.div
                    className="absolute w-80 h-[450px] bg-gray-900 rounded-xl shadow-lg flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    onClick={nextCard}
                  >
                    <p className="text-white text-lg font-semibold absolute top-4 bg-black/60 px-3 py-1 rounded-lg">
                      {item.text}
                    </p>
                    <img
                      src={item.src}
                      alt={item.text}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
          <button
            onClick={nextCard}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-800 transition"
          >
            <span>Siguiente</span>
            <ChevronRight size={24} />
          </button>
        </div>
        {/* Sección de texto y CTA */}
        <div className="md:w-1/2 text-center md:text-left text-white">
          <h1 className="text-4xl font-bold mb-4">¡Descubre Nuestros Horarios!</h1>
          <p className="text-lg text-gray-300 mb-6">
            Estos son nuestros horarios. Únete a nosotros y encuentra el grupo perfecto para aprender idiomas de forma divertida y dinámica.
          </p>
          <a
            href="https://wa.link/v7v6ga"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700 transition"
          >
            Únete Ahora
          </a>
        </div>
      </div>
      {/* Botón de WhatsApp */}
      <a
        href="https://wa.link/v7v6ga"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
};

export default ImageSlider;
