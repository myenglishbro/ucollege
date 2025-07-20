// LearningList.jsx
export default function LearningList({ items }) {
  return (
    <div className="bg-[#1515FF] text-white rounded-[2rem] px-6 py-16 w-full max-w-6xl mx-auto shadow-xl relative overflow-hidden">
      {/* Encabezado */}
      <div className="text-center mb-10 relative z-10">
        <span className="bg-white/20 text-sm px-4 py-1 rounded-full font-semibold uppercase tracking-wide inline-block mb-2">
          • Oh dear!
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">¿Nivel de inglés? Estancado… ¿Te suena?</h2>
      </div>

      {/* Lista de items (renderiza strings directamente) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {items.map((text, i) => (
          <div
            key={i}
            className="bg-white text-[#1515FF] rounded-xl p-5 flex gap-3 items-start shadow-md transition-transform duration-200 hover:scale-[1.02]"
          >
            <span className="text-2xl">✅</span>
            <p className="text-sm leading-snug">{text}</p>
          </div>
        ))}
      </div>

      {/* Fondo decorativo opcional */}
      <div className="absolute bottom-0 right-0 w-full h-full bg-white/10 rounded-[2rem] -z-0 skew-y-3 origin-bottom-right"></div>
    </div>
  );
}
