import React, { useState } from "react";

const Roadmap = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Puedo faltar a clases ?",
answer:"Al cancelar la clase el mismo día o sin previo aviso, ten en cuenta que reservo ese tiempo exclusivamente para ti. Cancelaciones repentinas me dejan sin la posibilidad de asignar ese espacio a otro estudiante. Sin embargo, puedes reagendar tu clase si estás enfermo o ante una situación de fuerza mayor."
     } , 
     {
      "question": "¿Puedo obtener un reembolso?",
      "answer": "¡Por supuesto! Si después de tu primera clase no estás satisfecho con la metodología, puedes solicitar un reembolso. Valoramos tu experiencia y queremos asegurarnos de que estés completamente satisfecho."
    }
    ,
    {
      question: "puedo poner en pausa mis clases",
      answer:
        "¡Claro que sí! Pero recuerda que, al retomar, deberás revisar nuevamente los horarios disponibles, ya que no puedo garantizar que el horario anterior siga libre. ¡Los horarios están en constante movimiento con otros estudiantes!"
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


export default Roadmap;
