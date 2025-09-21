export default function HeroKicker({
  text = "Your English Journey",
  icon = null,          // ej. <svg .../> o un <Sparkles />
  className = "",
}) {
  return (
    <div className={`inline-flex ${className}`} role="note" aria-label={text}>
      {/* Wrapper con borde degradado real */}
      <div className="rounded-full p-[1px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.12),rgba(99,102,241,0.25),rgba(255,255,255,0.12))]">
        {/* Contenido glass */}
        <div className="inline-flex items-center gap-2 rounded-full
                        bg-white/[0.06] backdrop-blur
                        border border-white/10
                        px-3 py-1
                        text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-200">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-200/80 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
          {icon ? <span className="opacity-90">{icon}</span> : null}
          <span className="opacity-90 whitespace-nowrap">{text}</span>
        </div>
      </div>
    </div>
  );
}
