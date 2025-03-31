import React, { useState } from 'react';
import { validCredentials } from '../utils/credentials';
import { FaWhatsapp, FaGlobe } from 'react-icons/fa';

const LoginForm = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [codigo, setCodigo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const userCredential = validCredentials.find(
      (cred) => cred.usuario === usuario && cred.password === codigo
    );
    if (userCredential) {
      setErrorMessage('');
      onLoginSuccess(userCredential, codigo);
    } else {
      setErrorMessage('La contraseña o usuario es incorrecto.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="overflow-hidden pb-9 px-4 md:px-8 bg-gray-900 min-h-screen flex flex-col mt-6 ">
      {/* Cabecera */}
   

      {/* Sección principal con fondos SVG, formulario y la ilustración */}
      <section className="relative flex flex-col-reverse md:flex-row max-w-[1300px] mx-auto justify-between items-center gap-9 md:gap-4 py-4 my-12">
        {/* Fondos SVG */}
        <svg
          width="736"
          height="423"
          className="absolute top-[50px] sm:top-[200px] sm:right-[-150px]"
          viewBox="0 0 736 423"
          fill="none"
        >
          <path
            d="M738.5 4.5C491.667 -7.66666 -0.9 58.9 3.5 422.5"
            stroke="url(#paint0_linear_16_172)"
            strokeWidth="6"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16_172"
              x1="700.5"
              y1="-4"
              x2="14.5"
              y2="361"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1F1B24" />
              <stop offset="0.21" stopColor="#3B3F58" />
              <stop offset="0.72" stopColor="#575A78" />
              <stop offset="1" stopColor="#1F1B24" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute sm:right-28 md:right-6"
          width="383"
          height="846"
          viewBox="0 0 383 846"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.19293 0C-0.08791 140.127 37.2087 433.314 212.642 485.053C388.075 536.792 391.776 746.576 371.697 845"
            stroke="url(#paint0_linear_16_173)"
            strokeWidth="6"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16_173"
              x1="16.5"
              y1="39.5"
              x2="363"
              y2="814"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.01" stopColor="#1F1B24" />
              <stop offset="0.23" stopColor="#3B3F58" />
              <stop offset="0.78" stopColor="#575A78" />
              <stop offset="1" stopColor="#1F1B24" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute -top-14 sm:right-7"
          width="416"
          height="675"
          viewBox="0 0 416 675"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M415 3C325.774 17.8434 155.913 102.224 190.271 320.998C224.63 539.772 78.4065 646.155 1 672"
            stroke="url(#paint0_linear_16_171)"
            strokeWidth="6"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16_171"
              x1="365.5"
              y1="28"
              x2="110"
              y2="594"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1F1B24" />
              <stop offset="0.28" stopColor="#575A78" />
              <stop offset="0.74" stopColor="#3B3F58" />
              <stop offset="1" stopColor="#1F1B24" />
            </linearGradient>
          </defs>
        </svg>

        {/* Sección izquierda: Formulario de login */}
        <div className="z-20 md:w-[520px] bg-black bg-opacity-30 p-6 rounded-lg">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-4">
            Welcome, Mybro! 🗽
          </h1>
          <p className="text-gray-300 text-sm mb-6">
            Enter your credentials below to access your USA exam roadmap.
          </p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errorMessage && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Access Roadmap
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-4">
            Forgot your credentials?{' '}
            <a
              href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
              className="text-indigo-400 hover:underline"
            >
              Contact your instructor
            </a>
            .
          </p>
        </div>

        {/* Sección derecha: Ilustración */}
        <div className="z-20 p-4 bg-black rounded-[100px] md:rounded-bl-[200px] lg:rounded-bl-[250px] bg-opacity-30">
          <img
            className="max-w-[490px] w-full"
            src="https://iili.io/39E0tiQ.png"
            alt="Ilustración de aprendizaje"
          />
        </div>
      </section>

      {/* Botones flotantes */}
      <div className="fixed bottom-10 right-5 flex flex-col space-y-4 z-50">
        <a
          href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!"
          target="_blank"
          rel="noopener noreferrer"
          title="Contact me on WhatsApp"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#0F0F0F] text-green-400 border border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] active:scale-95"
        >
          <span className="absolute w-full h-full rounded-full bg-green-500 opacity-20 group-hover:opacity-30 animate-ping"></span>
          <FaWhatsapp className="w-7 h-7 relative" />
        </a>
        <a
          href="https://myenglishbro-meb.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          title="Go to my Website"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#0F0F0F] text-purple-400 border border-purple-500 shadow-[0_0_15px_rgba(192,132,252,0.5)] transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_35px_rgba(192,132,252,0.8)] active:scale-95"
        >
          <span className="absolute w-full h-full rounded-full bg-purple-500 opacity-20 group-hover:opacity-30 animate-ping"></span>
          <FaGlobe className="w-7 h-7 relative" />
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
