import { useState } from "react";
import { benefits } from "../constants"; // Asegúrate de que este array incluya las propiedades necesarias
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

// Definición de niveles para el filtrado
const levels = {
  Personalizadas: ["Paquete Premium", "Paquete Standard 10 horas","Paquete Standard 20 horas", "Paquete Básico"],
  Rutas: [
    "Ruta Autónoma A1",
    "Ruta Autónoma A2",
    "Ruta Autónoma B1",
    "Ruta Autónoma B2",
    "Ruta Autónoma C1",
    "Ruta Autónoma C2",
  ],
};

const Benefits = () => {
  const [selectedLevel, setSelectedLevel] = useState("Rutas");
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  const openModal = (benefit) => setSelectedBenefit(benefit);
  const closeModal = () => setSelectedBenefit(null);

  // Filtrar los beneficios según el nivel seleccionado (comparando con el título)
  const filteredBenefits = benefits.filter((benefit) =>
    levels[selectedLevel].includes(benefit.title)
  );

  return (
    <>
      <Section id="features">
        <div className="container relative z-2">
          <Heading
            className="md:max-w-md lg:max-w-2xl"
            title="Explora Nuestros Cursos"
          />

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

          {/* Tarjetas de beneficios filtradas en grid (3 por fila en md en adelante) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 mt-10">
            {filteredBenefits.map((item) => (
              <div
                key={item.id}
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
                style={{ backgroundImage: `url(${item.backgroundUrl})` }}
              >
                {/* Contenedor de contenido con pointer-events-none para conservar hover */}
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                  <h5 className="h5 mb-5">{item.title}</h5>
                  <p className="body-2 mb-6 text-n-3">{item.text}</p>
                  {/* Contenedor de botones con pointer-events-auto para que sean clickeables */}
                  <div className="flex items-center mt-auto pointer-events-auto">
                    {item.iconLink ? (
                      <a
                        href={item.iconLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={item.iconUrl}
                          width={48}
                          height={48}
                          alt={item.title}
                          className="cursor-pointer"
                        />
                      </a>
                    ) : (
                      <img
                        src={item.iconUrl}
                        width={48}
                        height={48}
                        alt={item.title}
                      />
                    )}
                    <button
                      onClick={() => openModal(item)}
                      className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider hover:underline"
                      aria-label={`Ver más detalles de ${item.title}`}
                    >
                      Explore more
                    </button>
                    <Arrow />
                  </div>
                </div>

                {item.light && <GradientLight />}

                {/* Efecto hover: al pasar el mouse se muestra la imagen overlay */}
                <div
                  className="absolute inset-0.5 bg-n-8"
                  style={{ clipPath: "url(#benefits)" }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        width={380}
                        height={362}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <ClipPath />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Popup Modal que muestra los detalles del beneficio */}
      {selectedBenefit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-gray-800 rounded-lg shadow-2xl w-11/12 max-w-4xl max-h-[95vh] overflow-hidden">
            {/* Botón para cerrar el modal */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-600 text-white font-semibold py-1 px-3 rounded-full shadow-md hover:bg-red-700 transition-all"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {/* Contenido del Modal */}
            <div className="flex flex-col lg:flex-row items-start p-6 space-y-4 lg:space-y-0 lg:space-x-8">
              {/* Izquierda: Imagen animada (usa imgGif si existe, o iconUrl), título y descripción */}
              <div className="flex-shrink-0 w-full lg:w-1/2">
                <div className="text-center lg:text-left">
                  <img
                    src={selectedBenefit.imgGif || selectedBenefit.iconUrl}
                    alt="Animación del plan"
                    className="w-full h-auto rounded-lg object-contain mb-4"
                  />
                  <h3 className="text-3xl font-extrabold text-teal-400 mb-2">
                    {selectedBenefit.title}
                  </h3>
                  <p className="text-gray-300 text-base">
                    {selectedBenefit.text}
                  </p>
                </div>
              </div>

              {/* Derecha: Lista de características */}
              {selectedBenefit.details &&
                selectedBenefit.details.features && (
                  <div className="flex-1 text-center lg:text-left">
                    <h4 className="text-xl font-semibold text-yellow-300 mb-2">
                      Lo que incluye este plan:
                    </h4>
                    <ul className="space-y-3 text-gray-300 text-sm">
                      {selectedBenefit.details.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <p>{feature}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Pie del Modal: Precio y botón de acción */}
            {selectedBenefit.details && (
              <div className="p-6 text-center border-t border-gray-700 bg-gray-900">
                <p className="text-lg font-bold text-yellow-400 mb-4">
                  Solo por: {selectedBenefit.details.price}
                </p>
                {selectedBenefit.details.enlace && (
                  <a
                    href={selectedBenefit.details.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full bg-teal-600 text-white font-bold py-3 rounded-full shadow-md hover:bg-teal-700 transition-all">
                      ¡Comienza ahora!
                    </button>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Benefits;
