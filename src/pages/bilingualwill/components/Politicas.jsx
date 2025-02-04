import React, { useState } from "react";

const Politicas = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "¿A quién está dirigido este taller?",
answer:"Este taller es ideal para quienes desean mejorar su fluidez y pronunciación en inglés. No importa tu nivel, ya que nos enfocaremos en hablar con confianza sin entrar en estructuras gramaticales avanzadas"
     } , 
     {
      "question": "¿Cómo funciona la garantía?",
      "answer": "¡Por supuesto! Tienes 15 días para solicitar un reembolso completo si el taller no cumple tus expectativas. Queremos que aprendas con total tranquilidad"
    }
    ,
    {
      question: "¿Cómo reservo mi cupo?",
      answer:
        "Escríbeme por WhatsApp o correo electrónico y te enviaré toda la información de pago para asegurar tu lugar."
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos pagos a través de PayPal, Binance (billeteras virtuales), Western Union y Pesos Argentinos."
    },
    {
      question: "¿Cómo accedo al taller?",
      answer:
        "Una vez confirmado tu pago y seleccionado tu horario, recibirás un enlace de Zoom para unirte a las sesiones en vivo."
    },
    {
      question: "¿Cómo ingreso al grupo de WhatsApp?",
      answer:
        "Después de inscribirte, recibirás una invitación al grupo exclusivo de WhatsApp, donde compartimos tips, recursos y ejercicios adicionales para reforzar tu aprendizaje."
    },
    {
      question: "¿Habrá tareas fuera de clase?",
      answer:
        "Sí, después de cada sesión tendrás actividades dinámicas diseñadas para que practiques lo aprendido y consolides tu conocimiento."
    },
  ];
  return (
    <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Left Section */}
      <div className="flex flex-col text-left basis-1/2">
        <p className="inline-block font-semibold text-primary mb-4"> FAQ</p>
        <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
          Políticas de Clases a Distancia
        </p>
      </div>

      {/* FAQ List */}
      <ul className="basis-1/2">
        {faqItems.map((item, index) => (
          <li key={index}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
              aria-expanded={activeIndex === index}
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 text-base-content">{item.question}</span>
              <svg
                className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transition-transform duration-200 ${
                  activeIndex === index ? "rotate-90" : ""
                }`}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="7" width="16" height="2" rx="1"></rect>
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className="transform origin-center rotate-90"
                ></rect>
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                activeIndex === index ? "max-h-screen" : "max-h-0"
              }`}
              style={{
                maxHeight: activeIndex === index ? "100%" : "0",
              }}
            >
              <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed">{item.answer}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Politicas;
