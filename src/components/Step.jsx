import React from "react";

const Step = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Fondo radial futurista */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120%] h-[150%] bg-[radial-gradient(circle,rgba(79,70,229,0.3)_0%,rgba(0,0,0,0)_70%)] opacity-50"></div>
      
      {/* Líneas decorativas inspiradas en LoginForm */}
      <svg
        width="400"
        height="200"
        className="absolute top-[-20px] right-[-100px] opacity-30 z-0"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,50 C150,0 250,200 400,50"
          stroke="url(#loginLineGradient)"
          strokeWidth="4"
        />
        <defs>
          <linearGradient id="loginLineGradient" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B3F58" />
            <stop offset="1" stopColor="#575A78" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        width="400"
        height="200"
        className="absolute bottom-[-20px] left-[-100px] opacity-30 z-0"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,150 C150,200 250,0 400,150"
          stroke="url(#loginLineGradient2)"
          strokeWidth="4"
        />
        <defs>
          <linearGradient id="loginLineGradient2" x1="0" y1="200" x2="400" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B3F58" />
            <stop offset="1" stopColor="#575A78" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="flex flex-wrap items-center justify-center lg:justify-between">
          {/* Información principal */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
            <div className="max-w-md mx-auto lg:mx-0">
              <span className="text-lg font-bold text-indigo-500 uppercase tracking-widest animate-pulse">
                Empieza ahora
              </span>
              <h2 className="mt-6 mb-6 text-5xl font-extrabold leading-tight text-white">
                Tu camino hacia el <span className="text-indigo-400">éxito</span>
              </h2>
              <p className="mb-8 text-lg text-gray-300">
                Sigue estos sencillos pasos para obtener acceso y aprovechar todas las ventajas.
              </p>
              <a
                className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                href="#"
              >
                <span className="mr-2">🚀</span> Obtener cuenta ahora
              </a>
            </div>
          </div>

          {/* Lista de pasos con diseño futurista */}
          <div className="w-full lg:w-1/2">
            <ul className="space-y-8 relative">
              {[
                "Realiza el Pago",
                "Envía tu comprobante al wsp",
                "Envía tus datos y Ruta de Preferencia",
                "Accede"
              ].map((title, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-6 p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg border border-gray-700 backdrop-blur-md relative group transition-all duration-300 transform hover:scale-105"
                >
                  {/* Iluminación interactiva */}
                  <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-all duration-300 blur-md rounded-xl"></div>

                  {/* Número del paso */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-500 text-2xl font-bold text-white shadow-md border border-indigo-300 group-hover:bg-indigo-600 transition-all duration-300">
                    {index + 1}
                  </div>

                  {/* Contenido del paso */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-gray-300">
                      {index === 0
                        ? "Yape/Plin: 982668882 - PayPal: temis_it@hotmail.com"
                        : index === 1
                        ? "Manda la foto al +51 926922032"
                        : index === 2
                        ? "Indica la ruta que deseas junto con tus datos"
                        : "Inicia sesión y disfruta del contenido."}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step;
