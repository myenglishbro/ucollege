import React from 'react';

const SecurityAlert = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60 backdrop-blur-md" role="alert">
      <div className="bg-red-600 text-white p-6 rounded-2xl shadow-2xl flex items-center space-x-4 animate-pulse max-w-sm w-full border border-red-800">
        <img
          src="https://i.ibb.co/cDR4rhr/My-english-bro-Personajek-10.png"
          alt="Alert icon"
          className="w-12 h-12 drop-shadow-lg"
        />
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-extrabold">⚠️ ¡No hagas esto!</h2>
          <p className="text-sm opacity-90 leading-tight">
            Este contenido requiere respeto. Por favor, evita inspeccionarlo.
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-white text-red-600 font-bold rounded-lg px-4 py-2 shadow-md hover:bg-gray-200 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SecurityAlert;
