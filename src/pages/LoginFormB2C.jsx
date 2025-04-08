import React, { useState } from 'react';
import { validCredentials } from '../utils/credentials';
import { FaWhatsapp, FaGlobe, FaUserAlt, FaLock } from 'react-icons/fa';

const LoginFormB2C = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [codigo, setCodigo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función de login
  const handleLogin = () => {
    const userCredential = validCredentials.find(
      (cred) => cred.usuario === usuario && cred.password === codigo
    );
    if (userCredential) {
      setErrorMessage('');
      onLoginSuccess(userCredential, codigo);
    } else {
      setErrorMessage('⚠️ Usuario o contraseña incorrectos.');
    }
  };

  // Función para el "Enter"
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  // Datos de los pasos
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
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center bg-black mt-10">
      {/* Fondo animado cyberpunk */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center animate-pulse-slow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] opacity-80" />

      {/* Contenedor Principal */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 py-12">
        {/* Sección de Login */}
        <div className="w-full max-w-sm p-8 rounded-3xl border border-gray-800 shadow-2xl backdrop-blur-lg bg-white/5">
          <h1 className="text-center text-3xl font-extrabold text-white mb-2 drop-shadow-lg">
            Cambridge B2 Access
          </h1>
          <p className="text-center text-indigo-300 text-sm mb-6 tracking-wide">
            Log in to ignite your exam journey.
          </p>

          <div className="space-y-6">
            <div className="relative">
              <FaUserAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#1f1f2e] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 bg-[#1f1f2e] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
            </div>

            {errorMessage && (
              <p className="text-red-400 text-center text-sm animate-pulse">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:brightness-110 transition duration-200"
            >
              Access My Roadmap
            </button>
          </div>

          <p className="mt-6 text-center text-gray-500 text-xs tracking-wide">
            Forgot your credentials?{' '}
            <a
              href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
              className="text-cyan-400 hover:underline"
            >
              Contact your instructor
            </a>
          </p>

          <p className="mt-4 text-center text-gray-600 italic text-xs">
            Powered by MyEnglishBro™
          </p>
        </div>

        {/* Sección de Información (Steps) */}
<section className="w-full max-w-4xl mt-12">
  <div className="bg-white/5 backdrop-blur-2xl border border-violet-900 rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-300 hover:scale-105">
    <h2 className="text-center text-4xl font-bold mb-4 drop-shadow-lg">
      ¿Cómo funciona?
    </h2>
    <p className="text-center text-gray-300 mb-8 tracking-wide">
      Sigue estos sencillos pasos para comenzar:
    </p>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {steps.map((step, index) => (
        <li
          key={index}
          className="relative group overflow-hidden p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-violet-700 transition-transform duration-300 hover:scale-105"
        >
          {/* Efecto neon al pasar el cursor */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>

          {/* Número del paso */}
          <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-2xl font-bold text-white shadow-xl border border-indigo-400 mb-4 transition-colors duration-300 group-hover:bg-indigo-700">
            {index + 1}
          </div>
          
          {/* Título y descripción */}
          <h3 className="relative z-10 text-xl font-semibold mb-2">
            {step.title}
          </h3>
          <p className="relative z-10 text-gray-300">
            {step.description}
          </p>
        </li>
      ))}
    </ul>
  </div>
</section>

      </div>

      {/* Botones flotantes cyberpunk */}
      <div className="fixed bottom-10 right-5 flex flex-col space-y-4 z-20">
        <a
          href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!"
          target="_blank"
          rel="noopener noreferrer"
          title="Contact on WhatsApp"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#0F0F0F] text-green-400 border border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-transform hover:scale-110 hover:shadow-[0_0_35px_rgba(34,197,94,0.8)]"
        >
          <span className="absolute w-full h-full rounded-full bg-green-500 opacity-20 group-hover:opacity-30 animate-ping"></span>
          <FaWhatsapp className="w-7 h-7 relative" />
        </a>
        <a
          href="https://myenglishbro-meb.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Website"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#0F0F0F] text-purple-400 border border-purple-500 shadow-[0_0_15px_rgba(192,132,252,0.5)] transition-transform hover:scale-110 hover:shadow-[0_0_35px_rgba(192,132,252,0.8)]"
        >
          <span className="absolute w-full h-full rounded-full bg-purple-500 opacity-20 group-hover:opacity-30 animate-ping"></span>
          <FaGlobe className="w-7 h-7 relative" />
        </a>
      </div>
    </div>
  );
};

export default LoginFormB2C;
