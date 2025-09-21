function IconPill({ icon: Icon, label = "", className = "", delay = 0, y = 10, rotate = 0 }) {
  const prefersReducedMotion = useReducedMotion?.() ?? false;
  const inner = (
    <div
      className="grid place-items-center h-10 w-10 sm:h-11 sm:w-11 rounded-full
                 bg-white/[0.06] border border-white/10 backdrop-blur
                 text-zinc-100/90 shadow-xl"
      title={label} // tooltip nativo
      aria-label={label}
      role="img"
    >
      <Icon size={16} strokeWidth={1.8} />
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div className={`pointer-events-none select-none ${className}`} aria-hidden>{inner}</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, rotate }}
      animate={{ opacity: 1, y: [y, -y, y], rotate: [rotate, -rotate, rotate] }}
      transition={{ delay, duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
    >
      {inner}
    </motion.div>
  );
}
