import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AsidePanelModern({
  precio, precio_original, descuento, oferta_time, video, soporte_wsp, onAccessClick
}) {
  return (
    <aside className="w-full md:w-96 flex-shrink-0 mt-8 md:mt-0">
      <div className="sticky top-6">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`
            relative rounded-2xl p-6 border shadow-xl group overflow-hidden
            bg-gradient-to-br from-[#212334]/90 via-[#191b22]/93 to-[#23243b]/75
            backdrop-blur-[4px] border-[#23243b] hover:border-[#7c95c6] transition
          `}
        >
          {/* Sutil luz glass animada de fondo */}
          <motion.div
            initial={{ opacity: 0.25, scale: 0.8 }}
            animate={{ opacity: 0.45, scale: 1.03 }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="
              absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-56 h-32
              bg-gradient-to-tr from-[#7c95c6]/20 via-[#4fc0a9]/14 to-[#bfcad6]/8
              blur-2xl rounded-full opacity-50 pointer-events-none
            "
          />
          <div className="relative z-10 flex flex-col gap-6">
            {/* VIDEO */}
            <div className="
              w-full aspect-video rounded-xl overflow-hidden border border-[#23243b]
              shadow-lg mb-2 bg-[#1a1c22]/60 flex items-center justify-center
              transition group-hover:scale-[1.02]
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
            <div className="text-center flex flex-col items-center gap-1">
              <span className="text-2xl font-extrabold text-[#e6eaf0] tracking-wide drop-shadow-sm">
                {precio}
              </span>
              {precio_original && (
                <span className="line-through text-[#868c98] font-medium text-lg">
                  {precio_original}
                </span>
              )}
              {descuento && (
                <span className="text-[#4fc0a9] font-semibold text-base">{descuento}</span>
              )}
            </div>
            {/* BOTÓN ACCEDER */}
            <motion.button
              whileHover={{ scale: 1.025, borderColor: "#7c95c6", color: "#7c95c6" }}
              whileTap={{ scale: 0.97 }}
              onClick={onAccessClick}
              className={`
                w-full py-3 rounded-lg bg-gradient-to-r from-[#23243b]/80 to-[#191b22]/90
                text-[#e3eaf5] font-bold text-base tracking-wide border border-[#292c37]
                shadow hover:shadow-xl
                hover:bg-gradient-to-tr hover:from-[#22263c]/90 hover:to-[#25293d]/80
                hover:text-[#7c95c6] hover:border-[#7c95c6]
                transition-all duration-150 focus:outline-none active:scale-[0.97]
              `}
            >
              Acceder al Curso
            </motion.button>
            {/* WHATSAPP */}
            <motion.a
              whileHover={{ scale: 1.02, color: "#4fc0a9" }}
              href={soporte_wsp}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                w-full flex items-center justify-center gap-2 py-2 mt-1
                rounded-lg bg-[#23243b]/75 text-[#bfcad6] font-semibold
                border border-[#23243b] hover:border-[#4fc0a9]
                hover:text-[#4fc0a9] hover:bg-[#202b2e]/80 transition shadow-sm
                focus:outline-none
              `}
            >
              <FaWhatsapp className="text-lg" />
              Soporte WhatsApp
            </motion.a>
            {/* MENSAJE DE OFERTA */}
            {oferta_time && (
              <motion.div
                initial={{ opacity: 0.68 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1, repeatType: "reverse", ease: "easeInOut" }}
                className="text-xs text-[#7c95c6] font-medium text-center mt-1"
              >
                {oferta_time}
              </motion.div>
            )}
            <div className="text-center text-[11px] text-[#b3b8c5] mt-1 opacity-75">
              30-Day Money-Back Guarantee<br />
              <span className="text-[#4fc0a9]">Full Lifetime Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
