import { FaWhatsapp, FaPlayCircle } from "react-icons/fa";
import { MdLockOpen } from "react-icons/md";
import { motion } from "framer-motion";

export default function AsidePanelModern({
  precio, precio_original, descuento, oferta_time, video, soporte_wsp, onAccessClick
}) {
  return (
    <aside className="w-full md:w-96 flex-shrink-0 mt-8 md:mt-0">
      <div className="sticky top-6">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`
            relative rounded-2xl p-6 border-2 shadow-2xl group overflow-hidden
            bg-gradient-to-br from-[#1c1e26]/95 via-[#171821]/96 to-[#23243b]/85
            border-[#23243b] hover:border-[#7c95c6] transition
          `}
        >
          {/* Luz glass animada sutil */}
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

          <div className="relative z-10 flex flex-col gap-7">
            {/* VIDEO */}
            <div className="
              w-full aspect-video rounded-xl overflow-hidden border border-[#24243b]
              shadow-xl bg-[#16171d]/60 flex items-center justify-center relative group/video
              transition-all duration-200
            ">
              <iframe
                src={video}
                title="Video Promocional"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ background: "transparent" }}
              />
             
            </div>

            {/* PRECIO */}
            {/* <div className="flex flex-col gap-2 items-center">
              <span className="text-3xl font-black tracking-wider text-[#e6eaf0] drop-shadow">
                {precio}
              </span>
              {precio_original && (
                <span className="line-through text-[#868c98] font-medium text-base">
                  {precio_original}
                </span>
              )}
              {descuento && (
                <span className="text-[#4fc0a9] font-semibold text-sm">{descuento}</span>
              )}
            </div> */}

            {/* BOTÓN ACCEDER CURSO */}
            <motion.button
              whileHover={{
                scale: 1.035,
                boxShadow: "0 2px 18px 0 #7c95c67a",
                borderColor: "#7c95c6",
                color: "#7c95c6",
                background: "linear-gradient(90deg, #23243b 92%, #262b43 100%)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onAccessClick}
              className={`
                w-full py-4 rounded-xl border-2 border-[#23243b] font-bold text-lg
                tracking-wide bg-gradient-to-r from-[#222336]/90 to-[#23243b]/92
                text-[#e3eaf5] shadow-lg
                hover:shadow-indigo-900/50 hover:text-[#7c95c6] hover:border-[#7c95c6]
                transition-all duration-200 focus:outline-none flex items-center justify-center gap-2
                active:scale-[0.97]
              `}
            >
              <MdLockOpen className="text-2xl opacity-80" />
              <span>Acceder al Repo</span>
            </motion.button>

            {/* SOPORTE WHATSAPP */}
            <motion.a
              whileHover={{ scale: 1.018, color: "#4fc0a9", backgroundColor: "#1e2a2e" }}
              href={soporte_wsp}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                w-full flex items-center justify-center gap-2 py-3 mt-0.5
                rounded-xl bg-[#222336]/70 text-[#bfcad6] font-medium border border-[#23243b]
                hover:border-[#4fc0a9] hover:text-[#4fc0a9]
                transition focus:outline-none shadow
              `}
            >
              <FaWhatsapp className="text-lg opacity-80" />
              <span>Soporte por WhatsApp</span>
            </motion.a>

            {/* MENSAJE DE OFERTA */}
            {oferta_time && (
              <motion.div
                initial={{ opacity: 0.62, scale: 1 }}
                animate={{ opacity: 1, scale: 1.02 }}
                transition={{
                  repeat: Infinity, duration: 1, repeatType: "reverse", ease: "easeInOut"
                }}
                className="text-xs text-[#7c95c6] font-medium text-center mt-2"
              >
                {oferta_time}
              </motion.div>
            )}

            {/* Garantía y acceso
            <div className="text-center text-[11px] text-[#b3b8c5] mt-2 opacity-75">
              <span className="block mb-0.5">Garantía de Reembolso 30 Días</span>
              <span className="text-[#4fc0a9] font-medium">Acceso de por vida</span>
            </div> */}
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
