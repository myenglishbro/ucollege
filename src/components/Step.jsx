import React from "react";

const Step = () => {
  // Datos de los pasos y sus descripciones personalizados
  const steps = [
    {
      title: "Realiza el Pago",
      description: "Yape/Plin: 982668882 - PayPal: temis_it@hotmail.com",
    },
    {
      title: "Envía tu comprobante",
      description: "Manda la foto al +51 926922032",
    },
    {
      title: "Envía tus datos y Ruta de Preferencia",
      description: "Indica la ruta que deseas junto con tus datos",
    },
    {
      title: "Accede",
      description: "Inicia sesión y disfruta del contenido.",
    },
  ];

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center text-white">
      {/* Fondo animado cyberpunk (mismo fondo que en el login) */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png)] bg-cover bg-center animate-pulse-slow opacity-30" />

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20 py-20">
        <div className="flex flex-wrap items-center justify-center lg:justify-between">
          {/* Sección de información principal */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
            <div className="max-w-md mx-auto lg:mx-0">
              <span className="inline-block text-lg font-bold uppercase tracking-widest text-indigo-500 animate-pulse">
                Empieza ahora
              </span>
              <h2 className="mt-6 mb-6 text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
                Tu camino hacia el{" "}
                <span className="text-indigo-400">éxito</span>
              </h2>
              <p className="mb-8 text-lg text-gray-300">
                Sigue estos sencillos pasos y únete a la revolución del aprendizaje.
              </p>
              <a
                href="/signup"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">🚀</span> Obtener cuenta ahora
              </a>
            </div>
          </div>

          {/* Lista de pasos con efectos futuristas y glasmorfismo */}
          <div className="w-full lg:w-1/2">
            <ul className="space-y-8 relative">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="relative flex items-center space-x-6 p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg border border-gray-700 backdrop-blur-md group transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  {/* Efecto de iluminación interactivo */}
                  <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-all duration-300 blur-md rounded-xl"></div>

                  {/* Número del paso */}
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-indigo-500 text-2xl font-bold text-white shadow-md border border-indigo-300 group-hover:bg-indigo-600 transition-all duration-300">
                    {index + 1}
                  </div>

                  {/* Contenido del paso */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-300">{step.description}</p>
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
