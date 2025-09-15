import React from "react";

const WHATSAPP_LINK = "https://wa.link/ywk26u";      // Acelerar acceso
const PERSONALIZE_LINK = "https://wa.link/1z4231";   // Personalizar cuenta
const START_URL = "https://learnibox.vercel.app/Store";                           // ← ajusta si tu ruta de inicio es otra

const DEFAULT_USER = "studentbro";
const DEFAULT_PASS = "unlimited";
const DEFAULT_CODE = "newbro";

export default function PaymentSuccess() {
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback para navegadores antiguos
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white flex items-center justify-center p-6">
      <style>{`
        .glass { backdrop-filter: blur(10px); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); }
        .shine { position: relative; overflow: hidden; }
        .shine::after { content: ""; position: absolute; top: -100%; left: -100%; width: 200%; height: 200%; background: radial-gradient(transparent 30%, rgba(255,255,255,0.06) 31%); transform: rotate(25deg); animation: float 10s linear infinite; pointer-events: none; }
        @keyframes float { 0% { transform: translateX(-10%) rotate(25deg); } 100% { transform: translateX(10%) rotate(25deg); } }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{ opacity: .9 } 50%{ opacity: 1 } }
        .tick { filter: drop-shadow(0 6px 24px rgba(0,255,170,0.35)); }
        .cta { transition: transform .15s ease, box-shadow .2s ease; }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(0, 140, 255, .25); }
        .progress { height: 6px; width: 100%; background: rgba(255,255,255,.08); border-radius: 999px; overflow: hidden; }
        .bar { height: 100%; width: 45%; border-radius: 999px; background: linear-gradient(90deg, #00E5FF, #00FFA3, #83FF6F); animation: indet 2.2s ease-in-out infinite; }
        @keyframes indet { 0%{ margin-left: -40%; width: 35% } 50%{ margin-left: 30%; width: 55% } 100%{ margin-left: 110%; width: 40% } }
        .pill { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); }
        .mini { font-size: 11px; letter-spacing: .3px; }
      `}</style>

      <div className="max-w-3xl w-full">
        {/* Card principal */}
        <div className="glass rounded-3xl p-8 md:p-10 shadow-2xl shine">
          <div className="flex items-center gap-4 mb-6">
            <svg className="w-14 h-14 tick" viewBox="0 0 24 24" fill="none" stroke="#00FFA3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">¡Pago recibido con éxito!</h1>
              <p className="text-sm md:text-base text-zinc-300">Gracias por tu compra. Estamos preparando tu acceso ahora mismo.</p>
            </div>
          </div>

          {/* Mensaje principal */}
          <div className="space-y-4 text-zinc-200">
            <p>
              En unos minutos recibirás en tu correo <span className="font-semibold text-white">tus credenciales de acceso y tu código de descarga</span>.
              Revisa también tu bandeja de spam/promociones por si acaso.
            </p>
            <div className="progress"><div className="bar"/></div>
          </div>

         

          {/* Tarjeta de credenciales por defecto */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="glass rounded-2xl p-5 border border-zinc-800">
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-semibold">Acceso rápido</h2>
                <span className="mini pill px-2 py-1 rounded-full text-zinc-300">Predeterminado</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 pill rounded-xl px-3 py-2">
                  <span className="text-zinc-300 shrink-0 w-28">Usuario</span>
                  <code className="text-white/95">{DEFAULT_USER}</code>
                  <button onClick={() => copy(DEFAULT_USER)} className="ml-auto mini underline underline-offset-2 text-zinc-300 hover:text-white">Copiar</button>
                </div>

                <div className="flex items-center gap-2 pill rounded-xl px-3 py-2">
                  <span className="text-zinc-300 shrink-0 w-28">Contraseña</span>
                  <code className="text-white/95">{DEFAULT_PASS}</code>
                  <button onClick={() => copy(DEFAULT_PASS)} className="ml-auto mini underline underline-offset-2 text-zinc-300 hover:text-white">Copiar</button>
                </div>

                <div className="flex items-center gap-2 pill rounded-xl px-3 py-2">
                  <span className="text-zinc-300 shrink-0 w-28">Cód. descarga</span>
                  <code className="text-white/95">{DEFAULT_CODE}</code>
                  <button onClick={() => copy(DEFAULT_CODE)} className="ml-auto mini underline underline-offset-2 text-zinc-300 hover:text-white">Copiar</button>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => (window.location.href = START_URL)}
                    className="cta rounded-xl px-4 py-3 bg-gradient-to-r from-[#00E5FF] to-[#00FFA3] text-black font-semibold"
                    aria-label="Empezar ahora"
                  >
                    Empezar
                  </button>

                  <button
                    type="button"
                    onClick={() => window.open(PERSONALIZE_LINK, "_blank", "noopener,noreferrer")}
                    className="cta rounded-xl px-4 py-3 bg-white/10 text-white font-semibold border border-white/15"
                    aria-label="Personalizar cuenta por WhatsApp"
                  >
                    Personalizar cuenta
                  </button>
                </div>

                <p className="text-xs text-zinc-400">
                  *Si prefieres, podemos crear un usuario y contraseña personalizados a tu nombre. Solo toca “Personalizar cuenta”.
                </p>
              </div>
            </div>

            {/* Bloque de ayuda */}
            <div className="p-5 rounded-2xl border border-zinc-800 bg-black/30">
              <h3 className="font-semibold mb-2">¿Necesitas ayuda?</h3>
              <p className="text-sm text-zinc-300">
                ¿No llegó el correo en 10–15 minutos? Escríbenos por WhatsApp con tu comprobante para activar tu acceso al instante.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer")}
                  className="cta rounded-xl px-4 py-3 bg-white/10 text-white font-semibold border border-white/15 w-full"
                >
                  Abrir WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer sutil */}
        <footer className="text-xs text-zinc-400 mt-6 text-center">
          Si necesitas una boleta/factura, responde al correo de confirmación con tus datos.
        </footer>
      </div>
    </div>
  );
}
