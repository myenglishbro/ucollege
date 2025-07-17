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
          className="
            relative rounded-3xl p-8 border border-[#2d2f40] shadow-2xl group overflow-hidden
            bg-gradient-to-br from-[#181a23]/95 via-[#161821]/96 to-[#1f2130]/85
            hover:border-[#7c95c6] transition
          "
        >
          <motion.div
            initial={{ opacity: 0.18, scale: 0.7 }}
            animate={{ opacity: 0.32, scale: 1.06 }}
            transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-36 bg-gradient-to-tr from-[#7c95c6]/25 via-[#4fc0a9]/10 to-[#bfcad6]/5 blur-2xl rounded-full pointer-events-none"
          />

          <div className="relative z-10 flex flex-col gap-8">
            {/* Video */}
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-[#2d2f40] shadow-lg bg-[#16171d]/60 flex items-center justify-center">
              <iframe
                src={video}
                title="Video Promocional"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ background: "transparent" }}
              />
            </div>

            {/* Precios */}
            <div className="flex flex-col items-center text-[#e6eaf0]">
              <span className="text-4xl font-extrabold tracking-wider text-[#ffffff] drop-shadow mb-1">
                {precio}
              </span>
              {precio_original && (
                <span className="line-through text-[#7c8295] text-sm mb-1">
                  {precio_original}
                </span>
              )}
              {descuento && (
                <span className="bg-[#4fc0a9]/10 text-[#4fc0a9] text-xs font-semibold px-3 py-1 rounded-full mb-1 shadow-sm border border-[#4fc0a9]/30">
                  {descuento}
                </span>
              )}
              {precio_anual && (
                <span className="mt-2 text-xs text-[#bfcad6] italic">
                  Precio anual:{" "}
                  <span className="text-[#4fc0a9] font-medium">{precio_anual}</span>
                </span>
              )}
            </div>

            {/* Botón Acceder (degradado Indigo→Azul) */}
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 16px rgba(66, 153, 225, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onAccessClick}
              className="
                w-full py-4 rounded-xl font-semibold text-lg tracking-wide
                bg-gradient-to-r from-indigo-700 to-blue-600
                text-white shadow-lg transition
                flex items-center justify-center gap-2 focus:outline-none
                hover:from-indigo-600 hover:to-blue-500
              "
              title="Haz clic para iniciar sesión o acceder a tu cuenta"
            >
              <MdLogin className="text-2xl opacity-90" />
              <span>Acceder</span>
            </motion.button>

            {/* Soporte WhatsApp (degradado Púrpura→Índigo) */}
            <motion.a
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 16px rgba(131, 110, 255, 0.6)",
              }}
              href={soporte_wsp}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full flex items-center justify-center gap-2 py-3 rounded-xl
                bg-gradient-to-r from-purple-700 to-indigo-600
                text-white shadow-lg transition focus:outline-none
                hover:from-purple-600 hover:to-indigo-500
              "
            >
              <FaWhatsapp className="text-lg opacity-90" />
              <span>Soporte por WhatsApp</span>
            </motion.a>

            {/* Oferta Tiempo */}
            {oferta_time && (
              <motion.div
                initial={{ opacity: 0.7, scale: 1 }}
                animate={{ opacity: 1, scale: 1.03 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="text-xs text-[#7c95c6] font-medium text-center mt-1"
              >
                {oferta_time}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
