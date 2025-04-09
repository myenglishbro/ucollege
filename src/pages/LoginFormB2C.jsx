import React, { useState } from 'react';
import { validCredentials } from '../utils/credentials';
import { FaWhatsapp, FaUserAlt, FaLock } from 'react-icons/fa';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      {/* Fondo animado cyberpunk */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center animate-pulse-slow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] opacity-80" />

      {/* Contenedor Principal centrado */}
      <div className="relative z-10 w-full max-w-sm p-8 rounded-3xl border border-gray-800 shadow-2xl backdrop-blur-lg bg-white/5">
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
      </div>
    </div>
  );
};

export default LoginFormB2C;
