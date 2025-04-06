import React from "react";
import { check2, grid } from "../asset";
import { Gradient } from "../components/design/Roadmap";
import Tagline from "../components/Tagline";
import { motion } from "framer-motion";

const Producto = ({ thumbnail, title, subtitle, description, demo,calificacion, precio, enlaces }) => {
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
              <span className="text-sm font-semibold">Verificado</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">{title}</h2>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl">{description}</p>

          <div className="flex items-center flex-wrap gap-6 mt-2 text-lg font-semibold">
            <span className="text-yellow-400">{calificacion} </span>
            <span className="text-blue-400">{demo} </span>

            <span className="text-green-400 text-2xl font-bold">S/. {precio}</span>
          </div>

          {/* Botones de acción mejorados */}
          <motion.div
            className="mt-4 flex flex-col md:flex-row gap-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={enlaces}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-indigo-500 hover:to-sky-500 text-white px-5 py-2.5 rounded-full text-base font-bold shadow-lg transition-all duration-300"
            >
              Ir a la Ruta
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://wa.link/d1m1h1"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-full text-base font-bold shadow-lg transition-all duration-300"
            >
              🚀 Comprar Ahora
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6-6 6" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
      <Gradient />
    </div>
  );
};

export default Producto;
