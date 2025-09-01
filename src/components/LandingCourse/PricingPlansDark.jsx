"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Crown, Check, ArrowRight, Star } from "lucide-react";

/**
 * PricingPlansDark
 *
 * Estilo: super dark premium, compatible con tu UI (bordes brillantes, glass, sombras suaves).
 * Control por props: pasa los precios como en AsidePanelModern.
 *
 * Props:
 * - prices: { basicMonthly: number, plusQuarterly: number, proAnnual: number }
 * - currency: string (ej. "S/"), por defecto "S/"
 * - baseMonthly: número contra el cual calcular ahorros (por defecto 30)
 * - onSelect: (planKey: "basic" | "plus" | "pro") => void
 * - className: estilos opcionales
 */
export default function PricingPlansDark({
  prices = { basicMonthly: 30, plusQuarterly: 75, proAnnual: 240 },
  currency = "S/",
  baseMonthly = 30,
  onSelect,
  className = "",
}) {
  const savings = {
    plus: baseMonthly * 3 - (prices.plusQuarterly ?? 0), // 90 - 75 = 15
    pro: baseMonthly * 12 - (prices.proAnnual ?? 0), // 360 - 240 = 120
  };

  const cards = [
    {
      key: "basic",
      title: "Plan Básico",
      priceMain: prices.basicMonthly,
      cadence: "/ mes",
      pill: "Acceso completo",
      icon: ShieldCheck,
      features: [
        "Acceso completo a la plataforma",
        "Pago mes a mes",
        "Flexibilidad total",
      ],
      accent: "from-indigo-500/30 to-fuchsia-500/30",
      border: "via-violet-500/60",
      glow: "shadow-[0_0_40px_-10px_rgba(99,102,241,0.45)]",
      highlight: false,
    },
    {
      key: "plus",
      title: "Plan Plus",
      priceMain: prices.plusQuarterly,
      cadence: "/ 3 meses",
      pill: "Mejor relación trimestral",
      icon: Sparkles,
      features: [
        "Acceso por 3 meses",
        `Ahorro de ${currency}${savings.plus} frente al mensual`,
        "Ideal para estudiantes constantes",
      ],
      accent: "from-cyan-500/30 to-emerald-500/30",
      border: "via-cyan-400/70",
      glow: "shadow-[0_0_55px_-10px_rgba(34,197,94,0.5)]",
      highlight: true,
      ribbon: "Popular",
    },
    {
      key: "pro",
      title: "Plan Pro",
      priceMain: prices.proAnnual,
      cadence: "/ año",
      pill: "Plan más conveniente",
      icon: Crown,
      features: [
        "Acceso por 12 meses",
        `Ahorro de ${currency}${savings.pro} frente al mensual`,
        "Recomendado por estudiantes",
      ],
      accent: "from-amber-500/30 to-rose-500/30",
      border: "via-amber-400/70",
      glow: "shadow-[0_0_70px_-12px_rgba(251,191,36,0.55)]",
      highlight: false,
    },
  ];

  return (
    <section
      className={`relative w-full bg-gradient-to-b from-[#FE7EEB] via-[#FE7EEB] to-[#FE7EEB] text-white py-16 sm:py-20 ${className}`}
    >
      {/* Glow decor para continuidad con tu hero */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(600px_600px_at_center,rgba(21,21,255,0.35),transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white/5 ring-1 ring-white/10">
            <Star className="w-3.5 h-3.5" /> Planes diseñados para crecer
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">Elige tu plan</h2>
          <p className="mt-2 text-white/70">Paga solo por el tiempo que necesitas. Cambia o cancela cuando quieras.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`relative rounded-[28px] p-[2px] bg-gradient-to-b ${c.accent} ${c.glow}`}
            >
              {/* Sticker estilo "Aprende fluido" */}
              {c.highlight && (
                <div className="absolute -top-3 right-6 rotate-3 z-10">
                  <span className="text-[11px] font-bold tracking-wide bg-white text-[#1515FF] px-3 py-1 rounded-full shadow-xl ring-1 ring-black/5">
                    Recomendado
                  </span>
                </div>
              )}

              {/* Card blanca como tu AsidePanel */}
              <div className="rounded-[26px] h-full bg-white text-[#0e0f1a] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5 p-6 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${c.accent} ring-1 ring-black/5 text-[#0e0f1a]`}> 
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold">{c.title}</h3>
                    <span className="text-[12px] text-black/60">{c.pill}</span>
                  </div>
                </div>

                {/* Price (tipografía similar: grande, con "por"/cadencia en nueva línea) */}
                <div className="mt-6 leading-tight">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-[#1515FF]">
                      {currency}{Intl.NumberFormat("es-PE").format(c.priceMain)}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-black/60">{c.cadence}</div>
                </div>

                {/* Features */}
                <ul className="mt-6 space-y-2.5 text-[15px] text-black/80">
                  {c.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#22c55e]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA con el botón azul de tu hero */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelect?.(c.key)}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all shadow-lg ${
                    c.highlight
                      ? "bg-[#1515FF] text-white hover:brightness-110"
                      : "bg-[#1515FF] text-white hover:brightness-110"
                  }`}
                >
                  Elegir {c.title}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aviso */}
        <p className="mt-6 text-center text-xs text-white/60">
          * Puedes cambiar o cancelar tu plan cuando quieras. Los precios incluyen acceso completo al contenido indicado.
        </p>
      </div>
    </section>
  );
}
