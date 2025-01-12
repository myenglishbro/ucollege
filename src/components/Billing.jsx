import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

const plans = [
  {
    name: "Paquete de Clases Premium",
    description: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    imgSrc: "https://i.ibb.co/Syb9m2M/Black-And-White-Aesthetic-Minimalist-Modern-Simple-Typography-Coconut-Cosmetics-Logo-6.png",
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
enlace:"https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/preview"

  },
  {
    name: "Celpip Preparation",
    description: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    imgSrc: "https://i.ibb.co/9wVtSxZ/B2-FIRST-18.png",
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

  },{
    name: "B2 Cambridge Preparation",
    description: "Domina lo esencial para comunicarte con confianza en situaciones cotidianas simples. ¡Empieza tu camino hacia la fluidez aquí! 🚀",
    imgSrc: "https://i.ibb.co/P1Cg8JT/Black-And-White-Aesthetic-Minimalist-Modern-Simple-Typography-Coconut-Cosmetics-Logo-3.png",
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
  },
  {
    name: "C1 Cambridge Preparation",
    description: "Domina lo esencial para comunicarte con confianza en situaciones cotidianas simples. ¡Empieza tu camino hacia la fluidez aquí! 🚀",
    imgSrc: "https://i.ibb.co/YkB6KMc/Black-And-White-Aesthetic-Minimalist-Modern-Simple-Typography-Coconut-Cosmetics-Logo-4.png",
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
  },
  {
    name: "Paquete de Clases Basic",
    description: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    imgSrc: "https://i.ibb.co/bFQXFcC/Black-And-White-Aesthetic-Minimalist-Modern-Simple-Typography-Coconut-Cosmetics-Logo-7.png",
    features: [
      "Tu clase se graba y se envia por correo a cada correo   ",
      "Puedes hacer preguntas al profe por wsp directamente  ",
      "Acceso al Roadmap con Material Exclusivo",
      "Google Meet Premium",
      "Material de Estudio de cada clase",
      "Clases Personalizadas (decideden que quieren aprender)",
      "Hora peruana (GMT-5), previa entrevista",
    ],
    price: " 106 USD - 330 PEN ",
  },
  {
    name: "Inglés A1 - La Base 🏗️",
    description: "Domina lo esencial para comunicarte con confianza en situaciones cotidianas simples. ¡Empieza tu camino hacia la fluidez aquí! 🚀",
    imgSrc: "https://i.ibb.co/9wVtSxZ/B2-FIRST-18.png",
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
  },
  {
    name: "Inglés A2 - El Conector 🔗",
    description: "Cierra la brecha hacia la comunicación intermedia. Habla y entiende expresiones comunes con confianza. 💬",
    imgSrc: "https://i.ibb.co/nRBctHK/B2-FIRST-19.png",
    features: [
      "Estructuras simples para el día a día 🌟",
      "Expresiones y frases comunes 🗨️",
      "Diálogos prácticos 👫",
      "Ejercicios interactivos y tarjetas didácticas 🧩",
      "Lecciones en video para mayor claridad 📹",
      "Clases grabadas y evaluaciones 📝"
    ],
    price: "$110",
  },
  {
    name: "Inglés B1 - El Avanzado 📈",
    description: "Lleva tus habilidades a un nuevo nivel. Maneja conversaciones detalladas y mejora tu escritura. ✍️",
    imgSrc: "https://i.ibb.co/yQ8fQ7L/B2-FIRST-12.png",
    features: [
      "Técnicas básicas de escritura 🖋️",
      "Conversaciones detalladas 🗨️",
      "Dominio de gramática intermedia 📖",
      "Tarjetas didácticas y práctica interactiva 🔄",
      "Lecciones completas en video 🎬",
      "Exámenes para medir tu progreso 📝"
    ],
    price: "$150",
  },
  {
    name: "Inglés B2 - El Orador Fluido 🗣️",
    description: "Gana confianza para comunicarte efectivamente en cualquier entorno, desde reuniones formales hasta charlas informales. 🌍",
    imgSrc: "https://i.ibb.co/NxMbVNf/B2-FIRST-10.png",
    features: [
      "Comprensión lectora avanzada 📚",
      "Expresiones formales y fluidez 🗨️",
      "Actividades interactivas y tarjetas didácticas 🧩",
      "Clases grabadas en video 🎥",
      "Evaluaciones detalladas y retroalimentación ✅",
      "Pruebas simuladas para prepararte para situaciones reales 📝"
    ],
    price: "$200",
  },
  {
    name: "Inglés C1 - El Perfeccionista 🎯",
    description: "Logra un dominio profesional del inglés. Realiza presentaciones, escribe con precisión y conversa con facilidad. 💼",
    imgSrc: "https://i.ibb.co/f4YQsS1/B2-FIRST-11.png",
    features: [
      "Presentaciones complejas 🎤",
      "Dominio de modismos y phrasal verbs 🗯️",
      "Excelencia en escritura académica 📘",
      "Tarjetas didácticas para términos avanzados 🧠",
      "Ejercicios interactivos y lecciones en video 🎬",
      "Evaluaciones finales y certificaciones 🏅"
    ],
    price: "$250",
  },
  {
    name: "Inglés C2 - El Nativo 🌟",
    description: "Domina el idioma inglés con vocabulario avanzado, tonos profesionales y matices culturales. 🏆",
    imgSrc: "https://i.ibb.co/DM385Vn/B2-FIRST-15.png",
    features: [
      "Vocabulario avanzado y frases 🔝",
      "Expresiones fluidas y nativas 🗣️",
      "Dominio del tono profesional 📈",
      "Tarjetas didácticas y clases grabadas 🎥",
      "Escenarios interactivos y evaluaciones 🔄",
      "Preparación para aplicaciones en el mundo real 🌐"
    ],
    price: "$300",
  },
  {
    name: "Inglés Médico - El Lenguaje del Sanador 🩺",
    description: "Aprende el idioma de los profesionales de la salud. Comunícate de manera efectiva en entornos clínicos. 🏥",
    imgSrc: "https://i.ibb.co/pQ7Y22x/B2-FIRST-20.png",
    features: [
      "Terminología médica 📋",
      "Simulaciones de entrevistas clínicas 👩‍⚕️",
      "Actividades basadas en casos clínicos 🩻",
      "Ejercicios interactivos y tarjetas didácticas 📖",
      "Lecciones grabadas para repaso 🎥",
      "Evaluaciones completas 📊"
    ],
    price: "$200",
  },
  {
    name: "Inglés para Programadores - El Toque del Coder 💻",
    description: "Impulsa tu carrera tecnológica con inglés especializado. Destácate en documentación técnica y reuniones de equipo. 🚀",
    imgSrc: "https://i.ibb.co/wc58x4y/B2-FIRST-23.png",
    features: [
      "Terminología técnica 🔧",
      "Comunicación efectiva en equipos de programación 👨‍💻",
      "Frases para documentación y reuniones 🗂️",
      "Escenarios interactivos de codificación 📟",
      "Lecciones en video aplicadas a la industria 🎥",
      "Evaluaciones finales para validar tus habilidades ✅"
    ],
    price: "$220",
  },
  {
    name: "Inglés de Negocios - El Camino Profesional 📊",
    description: "Avanza en tu carrera con inglés esencial para negocios. Domina presentaciones, correos y negociaciones. 💼",
    imgSrc: "https://i.ibb.co/pvLX9Xc/B2-FIRST-22.png",
    features: [
      "Presentaciones efectivas 🎤",
      "Escritura profesional de correos 📧",
      "Términos financieros y de negociación 💹",
      "Lecciones grabadas y tarjetas didácticas 📝",
      "Escenarios interactivos de negocios 🌐",
      "Exámenes completos 🏅"
    ],
    price: "$250",
  },
  {
    name: "Francés Básico - Le Voyageur 🗼",
    description: "Comienza tu viaje en el idioma francés. Construye una base sólida con saludos y frases comunes. ✨",
    imgSrc: "https://i.ibb.co/7rf31Ys/B2-FIRST-21.png",
    features: [
      "Saludos básicos y frases comunes 🗨️",
      "Estructuras gramaticales simples 📚",
      "Práctica interactiva y tarjetas didácticas 🔄",
      "Lecciones grabadas en video 🎥",
      "Evaluaciones y prueba final 📝",
      "Escenarios de práctica en la vida real 🌍"
    ],
    price: "$90",
  },
];

const levels = {
  ClasesPersonalizadas: ["Paquete de Clases Premium", "Paquete de Clases Basic"],
  Cambridge: ["B2 Cambridge Preparation","C1 Cambridge Preparation"],
  Celpip: ["Celpip Preparation"],

  Básico: ["Inglés A1 - La Base 🏗️", "Inglés A2 - El Conector 🔗"],
  Intermedio: ["Inglés B1 - El Avanzado 📈", "Inglés B2 - El Orador Fluido 🗣️"],
  Avanzado: ["Inglés C1 - El Perfeccionista 🎯", "Inglés C2 - El Nativo 🌟"],
  Profesional: [
    "Inglés Médico - El Lenguaje del Sanador 🩺",
    "Inglés para Programadores - El Toque del Coder 💻",
    "Inglés de Negocios - El Camino Profesional 📊",
    "Francés Básico - Le Voyageur 🗼",
  ],
};

export const Billing = () => {
  const [selectedLevel, setSelectedLevel] = useState("Básico");
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
          Explora Nuestros Cursos
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

              <button
                onClick={() => handleLearnMore(plan)}
                className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-400 transition-all"
                aria-label={`Seleccionar plan ${plan.name}`}
              >
                Más detalles
              </button>
              {plan.enlace && (
                <button
                  onClick={() => openSchedule(plan.enlace)}
                  className="mt-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-400 transition-all"
                  aria-label={`Ver horario del plan ${plan.name}`}
                >
                  Ver Horario
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Pop-up Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-gray-800 rounded-xl shadow-lg p-8 w-11/12 max-w-lg">
            <h3 className="text-2xl font-bold text-teal-400">
              {selectedPlan.name}
            </h3>
            <p className="text-gray-300 mt-2">{selectedPlan.description}</p>

            <ul className="mt-4 space-y-2 text-gray-300 text-sm">
              {selectedPlan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-green-400 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <p className="text-lg font-semibold text-yellow-400 mt-6">
              Precio: {selectedPlan.price}
            </p>

            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-all"
            >
              Cerrar
            </button>
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

export default Billing;