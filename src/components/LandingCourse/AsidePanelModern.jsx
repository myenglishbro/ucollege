"use client";
import { motion } from "framer-motion";
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
    registrarse   // 👈 agregado aquí

}) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white shadow-xl rounded-3xl p-6 w-full md:w-80 border border-gray-200 mx-auto"
    >
      {/* Letrero decorativo flotante */}
      <motion.div
        initial={{ opacity: 0, x: 20, rotate: 4 }}
        animate={{ opacity: 1, x: 0, rotate: 6 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute -top-6 -right-6 rotate-6 bg-white px-4 py-2 rounded-2xl shadow-xl border text-sm font-semibold text-[#1515FF] z-20"
      >
        🧠 Aprende fluido
      </motion.div>

      {/* Video promocional (iframe) */}
      {video && (
        <div className="flex justify-center mb-4">
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <iframe
              src={video}
              title="Video Promocional"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Precio y descuentos centrado */}
      <div className="text-center mb-4">
        <div className="text-[#1515FF] font-bold text-3xl">
          {precio}
          {precio_original && (
            <span className="text-gray-400 text-base line-through font-medium ml-2">
              {precio_original}
            </span>
          )}
        </div>
        {descuento && (
          <div className="text-sm text-green-600 font-semibold mt-1">
            ¡{descuento}% OFF!
          </div>
        )}
        {precio_anual && (
          <div className="text-sm text-gray-600 mt-1">
            <span className="font-medium text-[#6330F7]">Plan Anual:</span> {precio_anual}
          </div>
        )}
      </div>

      {/* Oferta time centrado */}
      {oferta_time && (
        <div className="flex justify-center mb-4">
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
            {oferta_time}
          </span>
        </div>
      )}

      {/* Botón principal centrado */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="block w-full bg-[#1515FF] text-white py-3 rounded-full font-semibold text-sm transition shadow-md hover:bg-[#1a1aff] mb-4"
        onClick={onAccessClick}
      >
        Acceder
      </motion.button>

      {registrarse && (
  <motion.button
    whileHover={{ scale: 1.05 }}
        className="block w-full bg-[#1515FF] text-white py-3 rounded-full font-semibold text-sm transition shadow-md hover:bg-[#1a1aff] mb-4"
    onClick={() => window.open(registrarse, "_blank")}
  >
    Registrarse
  </motion.button>
)}


      {/* Soporte por WhatsApp centrado */}
      {soporte_wsp && (
        <div className="flex justify-center">
          <a
            href={`https://wa.me/${soporte_wsp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-green-600 hover:underline"
          >
            <FaWhatsapp className="text-lg" />
            Soporte por WhatsApp
          </a>
        </div>
      )}
    </motion.aside>
  );
}
