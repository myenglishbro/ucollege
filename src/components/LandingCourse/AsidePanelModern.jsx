import { FaWhatsapp } from "react-icons/fa";
import { MdLockOpen } from "react-icons/md";
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
            className="
              absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-36
              bg-gradient-to-tr from-[#7c95c6]/25 via-[#4fc0a9]/10 to-[#bfcad6]/5
              blur-2xl rounded-full pointer-events-none
            "
          />

          <div className="relative z-10 flex flex-col gap-8">
            
            {/* VIDEO */}
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

            {/* PRECIOS */}
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

            {/* BOTÓN ACCESO */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 16px #7c95c670",
                borderColor: "#7c95c6",
                background: "linear-gradient(90deg, #222336 0%, #262b43 100%)",
              }}
              whileTap={{ scale: 0.96 }}
              onClick={onAccessClick}
              className="
                w-full py-4 rounded-2xl border border-[#2d2f40] font-semibold text-lg tracking-wide
                bg-gradient-to-r from-[#1c1d2a] to-[#23243b]
                text-[#e6eaf0] shadow hover:shadow-indigo-900/50 transition focus:outline-none
                flex items-center justify-center gap-2
              "
            >
              <MdLockOpen className="text-2xl opacity-80" />
              <span>Acceder al Repo</span>
            </motion.button>

            {/* SOPORTE WHATSAPP */}
            <motion.a
              whileHover={{
                scale: 1.03,
                color: "#4fc0a9",
                backgroundColor: "#1e2a2e",
              }}
              href={soporte_wsp}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full flex items-center justify-center gap-2 py-3 rounded-xl
                bg-[#222336]/70 text-[#bfcad6] border border-[#2d2f40]
                hover:border-[#4fc0a9] hover:text-[#4fc0a9] shadow transition focus:outline-none
              "
            >
              <FaWhatsapp className="text-lg opacity-80" />
              <span>Soporte por WhatsApp</span>
            </motion.a>

            {/* OFERTA TIEMPO */}
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
