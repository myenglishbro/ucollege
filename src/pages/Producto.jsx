import React from "react";
import { check2, grid } from "../asset";
import { Gradient } from "../components/design/Roadmap";
import Tagline from "../components/Tagline";
import { motion } from "framer-motion";

const Producto = ({ thumbnail, title, subtitle, description, calificacion, precio, enlaces }) => {
  return (
    <div className="relative rounded-3xl bg-n-6 overflow-hidden shadow-2xl">
      <div className="relative flex flex-col lg:flex-row gap-8 bg-n-8 rounded-3xl overflow-hidden p-6 md:p-10">
        {/* Fondo decorativo */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img className="w-full h-full object-cover" src={grid} alt="Grid" />
        </motion.div>

        {/* Imagen a la izquierda */}
        <motion.div
          className="relative z-10 w-full lg:w-1/3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            className="rounded-2xl w-full h-auto object-cover shadow-xl max-h-[220px] lg:max-h-[250px]"
            src={thumbnail}
            alt={title}
          />
        </motion.div>

        {/* Información a la derecha */}
        <motion.div
          className="relative z-10 w-full lg:w-2/3 flex flex-col justify-between gap-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-between">
            <Tagline>{subtitle}</Tagline>
            <div className="flex items-center px-4 py-1 bg-white rounded-full text-n-8 shadow">
              <img className="mr-2.5" src={check2} width={16} height={16} alt="Verified" />
              <span className="text-sm font-semibold">Verified</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">{title}</h2>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl">{description}</p>

          <div className="flex items-center flex-wrap gap-6 mt-2 text-lg font-semibold">
            <span className="text-yellow-400">{calificacion} ⭐</span>
            <span className="text-green-400 text-2xl font-bold">S/. {precio}</span>
          </div>

          <motion.div
            className="mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={enlaces}
              className="inline-block bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-full text-base font-bold shadow-lg transition-all duration-300"
            >
              🚀 Comprar Ahora
            </a>
          </motion.div>
        </motion.div>
      </div>
      <Gradient />
    </div>
  );
};

export default Producto;
