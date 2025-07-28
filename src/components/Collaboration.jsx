import { collabContent } from "../constants";

const Collaboration = () => {
  return (
    <div className="relative mx-auto max-w-5xl mt-10">
      {/* Outer Gradient Border */}
      <div
        className="rounded-xl p-1"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgb(79, 70, 229) 0%, rgb(165, 56, 164) 50%, rgb(220, 38, 38) 100%)",
        }}
      >
        {/* Inner Content */}
        <div className="rounded-lg bg-black/80 backdrop-blur">
          <div className="flex flex-wrap w-full items-center justify-between gap-8 px-8 py-10 sm:px-16">
            {/* Left Content: Header and Highlights */}
            <div className="lg:max-w-xl">
              <h2 className="block w-full pb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
                🌟 Clases de Inglés Personalizadas
              </h2>
              <p className="my-4 bg-transparent font-medium leading-relaxed tracking-wide text-gray-400">
                Aprende inglés de forma efectiva y divertida. 🎯 Diseñamos las clases a tu medida: individuales o grupales, ¡tú eliges! 💬
              </p>
              <ul className="mt-6 space-y-4">
                {collabContent.map((item) => (
                  <li key={item.id} className="flex items-start space-x-3">
                    <span className="text-xl">✅</span>
                    <span className="text-gray-300">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Content: Visual and Call to Action */}
            <div className="flex flex-col items-center justify-center gap-6">
              
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center rounded-full transition-transform transform hover:scale-105 px-6 py-3 text-sm font-medium shadow-lg">
                🚀 Comienza Hoy
              </button>
              <button className="flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-center text-white backdrop-blur transition-transform transform hover:scale-105 px-6 py-3 text-sm font-medium">
                📚 Aprende Más
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
