import { FaWhatsapp } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { motion } from "framer-motion";

export default function AsidePanelModern({
  precio,
  precio_original,
  descuento,
  precio_anual,
  oferta_time,
  video,
  soporte_wsp,
  onAccessClick,
}) {
  return (
    <aside className="w-full md:w-96 flex-shrink-0 mt-8 md:mt-0">
      <div className="sticky top-6">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-3xl p-6 border border-indigo-100 shadow-xl overflow-hidden bg-white backdrop-blur-lg"
        >
          {/* Animación decorativa de fondo */}
          <motion.div
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-200 opacity-30 blur-3xl rounded-full pointer-events-none"
          />

          <div className="relative z-10 flex flex-col gap-6">
            {/* Video */}
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <iframe
                src={video}
                title="Video Promocional"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Precios */}
            <div className="flex flex-col items-center text-gray-800">
              <span className="text-3xl font-extrabold tracking-tight text-indigo-700">
                {precio}
              </span>
              {precio_original && (
                <span className="line-through text-gray-400 text-sm">
                  {precio_original}
                </span>
              )}
              {descuento && (
                <span className="bg-violet-100 text-violet-600 text-xs font-medium px-3 py-1 rounded-full border border-violet-200 shadow-sm">
                  {descuento}
                </span>
              )}
              {precio_anual && (
                <span className="mt-2 text-xs text-gray-500 italic">
                  Precio anual:{" "}
                  <span className="text-purple-600 font-medium">{precio_anual}</span>
                </span>
              )}
            </div>

            {/* Botón Acceder */}
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 12px rgba(125, 86, 255, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onAccessClick}
              className="w-full py-3 rounded-full font-semibold text-sm tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transition duration-200 flex items-center justify-center gap-2 focus:outline-none hover:from-indigo-500 hover:to-purple-500"
              title="Haz clic para acceder"
            >
              <MdLogin className="text-xl opacity-90" />
              <span>Acceder</span>
            </motion.button>

            {/* Soporte WhatsApp */}
            <motion.a
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 8px rgba(0,0,0,0.08)",
              }}
              href={soporte_wsp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white border border-gray-300 text-gray-800 text-sm font-semibold shadow-sm hover:bg-gray-50 transition duration-200"
            >
              <FaWhatsapp className="text-green-500 text-lg" />
              <span>Soporte por WhatsApp</span>
            </motion.a>

            {/* Tiempo de oferta */}
            {oferta_time && (
              <div className="text-xs text-purple-500 text-center mt-1 font-medium">
                {oferta_time}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
