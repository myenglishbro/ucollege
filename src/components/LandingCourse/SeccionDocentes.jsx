export default function SeccionDocentes({ docentes }) {
  return (
    <div className="my-14">
      <div className="mb-3">
        <span className="inline-block px-2 py-0.5 bg-[#23243b] text-[#4fc0a9] rounded text-xs font-medium">
          Profes de la escuela
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-6 tracking-tight text-[#e4e7ef]">Conoce quién enseña</h2>
      <div className="flex flex-wrap gap-7">
        {docentes.map((prof, idx) => (
          <div key={idx} className="flex flex-col items-center w-44 group transition">
            <img
              src={prof.img}
              alt={prof.nombre}
              className="w-14 h-14 rounded-full border-2 border-[#23243b] group-hover:border-[#4fc0a9] shadow object-cover mb-2 transition"
              loading="lazy"
            />
            <span className="text-sm font-medium text-[#d4d4d8] group-hover:text-[#4fc0a9] transition">
              {prof.nombre}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
