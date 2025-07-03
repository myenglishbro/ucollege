import { FaWhatsapp } from "react-icons/fa";

export default function AsidePanelModern({
  precio, precio_original, descuento, oferta_time, video, soporte_wsp, onAccessClick
}) {
  return (
    <aside className="w-full md:w-96 flex-shrink-0 mt-8 md:mt-0">
      <div className="sticky top-6">
        <div className={`
          relative rounded-2xl p-6 border shadow-xl group overflow-hidden
          bg-gradient-to-br from-[#23243b]/80 via-[#191b22]/90 to-[#23243b]/70
          backdrop-blur-[3px] border-[#23243b] hover:border-[#4fc0a9] transition
        `}>
          <div className="
            absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-56 h-32
            bg-gradient-to-tr from-[#4fc0a9]/30 via-[#bfcad6]/10 to-[#72b4fa]/30
            blur-2xl rounded-full opacity-30 group-hover:opacity-70 pointer-events-none transition
          " />
          <div className="relative z-10 flex flex-col gap-6">
            {/* VIDEO */}
            <div className="
              w-full aspect-video rounded-lg overflow-hidden border border-[#23243b]
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
              <span className="text-2xl font-bold text-[#e6eaf0] tracking-wide drop-shadow-sm">
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
            <button
              onClick={onAccessClick}
              className={`
                w-full py-3 rounded-lg bg-gradient-to-r from-[#252733] to-[#191b22]/80
                text-[#e3eaf5] font-bold text-base tracking-wide border border-[#292c37]
                shadow hover:shadow-xl
                hover:bg-gradient-to-tr hover:from-[#21222b] hover:to-[#1b2026]/80
                hover:text-[#4fc0a9] hover:border-[#4fc0a9] transition-all duration-150
                focus:outline-none active:scale-[0.97]
              `}
            >
              Acceder al Curso
            </button>
            {/* WHATSAPP */}
            <a
              href={soporte_wsp}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                w-full flex items-center justify-center gap-2 py-2 mt-1
                rounded-lg bg-[#23243b]/70 text-[#bfcad6] font-semibold
                border border-[#23243b] hover:border-[#4fc0a9] hover:text-[#4fc0a9] 
                hover:bg-[#202b2e]/80 transition shadow-sm
                focus:outline-none
              `}
            >
              <FaWhatsapp className="text-lg" />
              Soporte WhatsApp
            </a>
            {/* MENSAJES */}
            {oferta_time && (
              <div className="text-xs text-[#72b4fa] font-medium text-center mt-1 animate-pulse">
                {oferta_time}
              </div>
            )}
            <div className="text-center text-[11px] text-[#b3b8c5] mt-1 opacity-70">
              30-Day Money-Back Guarantee<br />
              <span className="text-[#4fc0a9]">Full Lifetime Access</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
