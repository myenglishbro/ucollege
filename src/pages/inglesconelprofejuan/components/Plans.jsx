import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

const plans = [
  {
    name: "Paquete de Clases Privadas",
    description: "Este paquete de clases cuenta con 20 horas de clases en vivo",
    imgSrc: "https://i.ibb.co/ymhFCdRW/claseindividual.jpg",
    features: [
      "Tu clase se graba y se envia por correo a cada correo   ",
      "Puedes hacer preguntas al profe por wsp directamente  ",
      "Acceso al Roadmap con Material Exclusivo",
      "Google Meet Premium",
      "Material de Estudio de cada clase",
      "Clases Personalizadas (decideden que quieren aprender)",
      "Hora peruana (GMT-5), previa entrevista",
    ],
    price: " USD 200  ",
enlace:"https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/preview",
ruta: "https://learnibox.vercel.app/plataforma",

  },
  {
    name: "Paquete de Clases Grupales",
    description: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    imgSrc: "https://i.ibb.co/LLZ4ymC/clasegrupal.jpg",
    features: [
      "Tu clase se graba y se envia por correo a cada correo   ",
      "Puedes hacer preguntas al profe por wsp directamente  ",
      "Acceso al Roadmap con Material Exclusivo",
      "Google Meet Premium",
      "Material de Estudio de cada clase",
      "Clases Personalizadas (decideden que quieren aprender)",
      "Hora peruana (GMT-5), previa entrevista",
    ],
    price: " 110 USD - 350 PEN ",
enlace:"https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/preview",
ruta: "https://learnibox.vercel.app/plataforma",

  },
  {
    name: "Ruta de Aprendizaje Autonoma",
    description: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    imgSrc: "https://i.ibb.co/9HLwLnzb/logo.jpg",
    features: [
      "Técnicas básicas de pronunciación 🗣️",
      "Reglas gramaticales fundamentales 📚",
      "Vocabulario esencial 📝",
      "Ejercicios interactivos 🎮",
      "Tarjetas didácticas para aprendizaje rápido 📖",
      "Clases grabadas y lecciones en video 🎥",
      "Cuestionarios y exámenes finales 📝"
    ],
    price: "$90",
    enlace: "https://i.ibb.co/Syb9m2M/Black-And-White-Aesthetic-Minimalist-Modern-Simple-Typography-Coconut-Cosmetics-Logo-6.png",
    ruta: "https://learnibox.vercel.app/plataforma",

  },
  
];

const levels = {
  Clases: ["Paquete de Clases Privadas", "Paquete de Clases Grupales"],
  Ruta: ["Ruta de Aprendizaje Autonoma"],

  
};

export const Plans = () => {
  const [selectedLevel, setSelectedLevel] = useState("Clases");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [scheduleLink, setScheduleLink] = useState(null);

  const handleLearnMore = (plan) => {
    setSelectedPlan(plan);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  const openSchedule = (link) => {
    setScheduleLink(link);
  };

  const closeSchedulePopup = () => {
    setScheduleLink(null);
  };

  const filteredPlans = plans.filter((plan) =>
    levels[selectedLevel].includes(plan.name)
  );

  return (
    <div className="relative mx-auto max-w-7xl mt-16 mb-15 px-6 sm:px-12">
      {/* Encabezado */}
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-400 to-blue-600 blur-3xl opacity-25" />
        <h2 className="relative z-10 text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
          Explora Mis Cursos
        </h2>
        <p className="relative z-10 mt-4 text-lg text-gray-100">
          Encuentra el curso ideal para tus metas y comienza a aprender hoy.
        </p>
      </div>

      {/* Pills para selección de nivel */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 sm:gap-6">
        {Object.keys(levels).map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base font-medium rounded-full transition-all ${
              selectedLevel === level
                ? "bg-teal-500 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-teal-400 hover:text-white"
            }`}
            aria-label={`Seleccionar nivel ${level}`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Tarjetas filtradas */}
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-16">
        {filteredPlans.map((plan, index) => (
          <li
            key={index}
            className="relative flex flex-col items-start bg-gray-900 border border-gray-700 rounded-3xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={plan.imgSrc}
                alt={`Imagen representativa del plan ${plan.name}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="relative p-6">
              <h3 className="text-xl font-bold text-teal-400">{plan.name}</h3>
              <p className="text-gray-300 mt-2">{plan.description}</p>
              <p className="text-lg font-semibold text-yellow-400 mt-4">
                {plan.price}
              </p>
                        <a
            href={plan.ruta}
            className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-400 transition-all text-center block py-3 px-6 rounded-full"
            aria-label={`Seleccionar plan ${plan.ruta}`}
          >
            Go to Road
          </a>
              <button
                onClick={() => handleLearnMore(plan)}
                className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-400 transition-all"
                aria-label={`Seleccionar plan ${plan.name}`}
              >
                Más detalles
              </button>
              
            </div>
          </li>
        ))}
      </ul>

     {/* Pop-up Modal */}
{selectedPlan && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative bg-gray-800 rounded-lg shadow-2xl w-11/12 max-w-4xl max-h-[90vh] overflow-hidden">
      {/* Botón Cerrar */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 bg-red-600 text-white font-semibold py-1 px-3 rounded-full shadow-md hover:bg-red-700 transition-all"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Contenido del Modal */}
      <div className="flex flex-col lg:flex-row items-start p-6 space-y-4 lg:space-y-0 lg:space-x-8">
        {/* GIF y Nombre + Descripción */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <div className="text-center lg:text-left">
            <img
              src={selectedPlan.imgGif}
              alt="Plan animation"
              className="w-full h-auto rounded-lg object-contain mb-4"
            />
            <h3 className="text-3xl font-extrabold text-teal-400 mb-2">
              {selectedPlan.name}
            </h3>
            <p className="text-gray-300 text-base">{selectedPlan.description}</p>
          </div>
        </div>

        {/* Características del Plan (Lado Derecho) */}
        <div className="flex-1 text-center lg:text-left">
          <h4 className="text-xl font-semibold text-yellow-300 mb-2">
            Lo que incluye este plan:
          </h4>
          <ul className="space-y-3 text-gray-300 text-sm">
            {selectedPlan.features.map((feature, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="inline-block w-5 h-5 bg-green-400 rounded-full mt-1"></span>
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Precio y Botón */}
      <div className="p-6 text-center border-t border-gray-700 bg-gray-900">
        <p className="text-lg font-bold text-yellow-400 mb-4">
          Solo por: {selectedPlan.price}
        </p>
        <a
  href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
  target="_blank"
  rel="noopener noreferrer"
>
  <button
    className="w-full bg-teal-600 text-white font-bold py-3 rounded-full shadow-md hover:bg-teal-700 transition-all"
  >
    ¡Comienza ahora!
  </button>
  
</a>

      </div>
    </div>
  </div>
)}

      {/* Pop-up para el enlace del horario */}
      {scheduleLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 rounded-xl p-8 w-11/12 max-w-4xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-teal-400">Horario</h3>
              <button
                onClick={closeSchedulePopup}
                className="text-gray-400 hover:text-gray-200"
              >
                ✖
              </button>
            </div>
            <iframe
              src={scheduleLink}
              width="100%"
              height="500"
              className="rounded-lg mt-4"
              frameBorder="0"
              title="Horario"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;