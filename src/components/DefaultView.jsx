import React, { useState } from 'react';

const DefaultView = ({ realname, userImage, nivel, expirationDate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
        <div className="relative bg-[#13131a] text-white rounded-xl shadow-xl w-4/5 md:w-3/5 lg:w-2/5 p-6 md:p-8 transform transition-all duration-300 ease-in-out hover:scale-105 border-2 border-gray-700">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 transition-colors duration-200 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          <div className="flex items-center justify-center mb-6 gap-4">
            <img
              src={userImage}
              alt="User"
              className="w-24 h-24 rounded-full border-4 border-gradient-to-r from-purple-500 to-pink-500 shadow-xl"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold">{realname}</h2>
              <p className="text-sm text-purple-300 font-semibold">{nivel}</p>
              <p className="text-xs text-gray-400 mt-1">Expira el: {expirationDate}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <a
              href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              WhatsApp
            </a>
            <a
              href="https://docs.google.com/document/d/1OV0QilMHzo3OsYqw1XveVlsfiFm90_Ji5_E5SIBpSSM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Clase 🎥
            </a>
            <button
              onClick={() => setIsScheduleOpen(true)}
              className="w-1/3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl p-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Horario</span>
              <span>📅</span>
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {isScheduleOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={() => setIsScheduleOpen(false)}
          ></div>
          <div className="relative bg-[#2e2e38] rounded-xl shadow-xl w-4/5 md:w-3/5 lg:w-2/5 p-6 transform transition-all duration-300 ease-in-out hover:scale-105 border-2 border-gray-700">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors duration-200 focus:outline-none"
              onClick={() => setIsScheduleOpen(false)}
            >
              ✕
            </button>
            <h3 className="mb-4 text-xl font-bold text-gray-100 text-center">
              Horario de Clases
            </h3>
            {isLoading && (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            )}
            <iframe
              src="https://docs.google.com/spreadsheets/d/1vEAJ1H82jT4PBnQ7DNxgPJOeTf_YA2eNE41aOQaBlN0/edit?usp=sharing"
              title="Horario de Clases"
              className={`w-full h-96 rounded-lg border-2 border-gray-300 shadow-xl transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default DefaultView;
