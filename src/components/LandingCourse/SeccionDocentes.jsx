export default function SeccionDocentes({ docentes }) {
  return (
    <div className="my-14">
      {/* Badge */}
      <div className="mb-3">
        <span className="inline-block px-2 py-0.5 bg-violet-100 text-violet-600 rounded text-xs font-medium">
          Profes de la escuela
        </span>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold mb-6 tracking-tight text-gray-800">
        Conoce quién enseña
      </h2>

      {/* Lista de docentes */}
      <div className="flex flex-wrap gap-7">
        {docentes.map((prof, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center w-44 group transition"
          >
            <img
              src={prof.img}
              alt={prof.nombre}
              className="
                w-14 h-14 rounded-full border-2 border-gray-200
                group-hover:border-purple-400 shadow-sm object-cover mb-2
                transition duration-200
              "
              loading="lazy"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition">
              {prof.nombre}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
