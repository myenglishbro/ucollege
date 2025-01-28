import React, { useState } from 'react';

const DefaultView = ({ realname, userImage, nivel, expirationDate }) => {
  const [isOpen, setIsOpen] = useState(true); // Controla el modal principal
  const [isScheduleOpen, setIsScheduleOpen] = useState(false); // Controla el modal del horario
  const [isLoading, setIsLoading] = useState(true); // Estado de carga del iframe

  if (!isOpen) return null; // Si el modal principal está cerrado, no se renderiza

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)} // Cierra el modal principal
      ></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-8 md:p-12">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(false)} // Cierra el modal principal
        >
          ✕
        </button>
        <div className="text-center">
          <h2 className="mb-6 text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
            ¡Bienvenido a MyEnglishBro, {realname}!
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Accede a recursos como el temporizador Pomodoro, lecciones grabadas, y sesiones en vivo. ¡Explora y aprende con nosotros!
          </p>
          <div className="flex items-center justify-center mb-6">
            <img
              src={userImage || 'https://via.placeholder.com/150'}
              alt={`${realname}'s profile`}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-md mr-4"
            />
            <div className="text-left">
              <p className="text-lg font-medium text-gray-700">
                Nivel actual: <span className="font-bold text-gray-900">{nivel}</span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                Vence: <span className="font-bold text-gray-900">{expirationDate}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <a
              href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
              target="_blank"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg hover:opacity-90 hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              Contáctanos por WhatsApp
            </a>
            <a
              href="https://docs.google.com/document/d/1OV0QilMHzo3OsYqw1XveVlsfiFm90_Ji5_E5SIBpSSM/edit?usp=sharing"
              target="_blank"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:opacity-90 hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              Clase en Vivo 🎥
            </a>
            <button
              onClick={() => setIsScheduleOpen(true)}
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg hover:opacity-90 hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              Ver Horario 📅
            </button>
          </div>
        </div>

        {/* Modal del Horario */}
        {isScheduleOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsScheduleOpen(false)} // Cierra el modal del horario
            ></div>
            <div className="relative bg-white rounded-3xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={() => setIsScheduleOpen(false)} // Cierra el modal del horario
              >
                ✕
              </button>
              <h3 className="mb-4 text-2xl font-semibold text-gray-800 text-center">
                Horario de Clases
              </h3>
              {isLoading && (
                <div className="flex items-center justify-center h-96">
                  <p className="text-gray-600 font-medium">Cargando horario...</p>
                </div>
              )}
              <iframe
                src="https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/edit?usp=sharing"
                title="Horario de Clases"
                className={`w-full h-96 rounded-lg border-2 border-gray-300 shadow-lg transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setIsLoading(false)} // Oculta el loader cuando el iframe se carga
              ></iframe>
            </div>
          </div>
        )}

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            className="absolute w-12 h-14 animate-bounce opacity-40 hover:opacity-80"
            style={{ animationDelay: '0.2s', top: '10%', left: '10%' }}
            src="https://i.ibb.co/rc6YV8j/Sin-t-tulo-1-09.png"
            alt="Icon 1"
          />
       
          
         
        </div>
      </div>
    </div>
  );
};

export default DefaultView;
