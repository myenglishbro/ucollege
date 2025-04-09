"use client";
import React, { useState } from "react";
import { validCredentials } from "../utils/credentials";
import { 
  FaWhatsapp, 
  FaUserAlt, 
  FaLock, 
  FaMoneyBillAlt, 
  FaFileUpload, 
  FaUserEdit, 
  FaSignInAlt 
} from "react-icons/fa";

// Componente Wrapper para el Tooltip con animación dinámica
const TooltipWrapper = ({ tooltip, children }) => (
  <div className="relative group">
    {children}
    <div
      className="
        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
        px-2 py-1 rounded bg-gray-800 text-white text-xs 
        opacity-0 translate-y-2 scale-95 
        group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 
        transition-all duration-300 ease-in-out pointer-events-none 
        whitespace-nowrap z-30"
    >
      {tooltip}
    </div>
  </div>
);

const LoginFormB2C = ({ onLoginSuccess }) => {
  // Estados para el login
  const [usuario, setUsuario] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Datos de los pasos con íconos y descripción para el tooltip
  const steps = [
    {
      title: "Realiza el Pago",
      description: "Yape/Plin: 982668882 - PayPal: temis_it@hotmail.com",
      icon: <FaMoneyBillAlt className="w-5 h-5 text-white" />,
    },
    {
      title: "Envía tu comprobante",
      description: "Manda la foto al +51 926922032",
      icon: <FaFileUpload className="w-5 h-5 text-white" />,
    },
    {
      title: "Envía tus datos y Ruta",
      description: "Indica la ruta deseada junto con tus datos",
      icon: <FaUserEdit className="w-5 h-5 text-white" />,
    },
    {
      title: "Accede",
      description: "Inicia sesión y disfruta del contenido.",
      icon: <FaSignInAlt className="w-5 h-5 text-white" />,
    },
  ];

  // Función de login
  const handleLogin = () => {
    const userCredential = validCredentials.find(
      (cred) => cred.usuario === usuario && cred.password === codigo
    );
    if (userCredential) {
      setErrorMessage("");
      onLoginSuccess(userCredential, codigo);
    } else {
      setErrorMessage("⚠️ Usuario o contraseña incorrectos.");
    }
  };

  // Login al presionar Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center pt-20">
      {/* Fondo animado cyberpunk */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center animate-pulse-slow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] opacity-80" />

      {/* Contenedor Principal */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-black/40 rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sección de Login */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-700">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white text-center mb-3">
                Cambridge B2 Access
              </h1>
              <p className="text-center text-indigo-300 text-sm mb-4">
                Log in to ignite your exam journey.
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <FaUserAlt className="absolute top-2 left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-[#1f1f2e] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>
                <div className="relative">
                  <FaLock className="absolute top-2 left-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-3 py-2 bg-[#1f1f2e] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>
                {errorMessage && (
                  <p className="text-red-400 text-center text-xs animate-pulse">
                    {errorMessage}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg shadow hover:brightness-110 transition duration-200 text-sm"
                >
                  Access My Roadmap
                </button>
              </div>
              <p className="mt-3 text-center text-gray-500 text-xs">
                Forgot your credentials?{" "}
                <a
                  href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
                  className="text-cyan-400 hover:underline"
                >
                  Contact your instructor
                </a>
              </p>
              <p className="mt-1 text-center text-gray-600 italic text-xs">
                Powered by MyEnglishBro™
              </p>
            </div>

            {/* Sección de Pasos */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <div className="text-center lg:text-left">
                <span className="inline-block text-base font-bold uppercase tracking-widest text-indigo-500 animate-pulse">
                  Empieza ahora
                </span>
                <h2 className="mt-1 text-3xl font-extrabold text-white drop-shadow-lg">
                  Tu camino hacia el <span className="text-indigo-400">éxito</span>
                </h2>
                <p className="mt-1 text-xs text-gray-300">
                  Sigue estos sencillos pasos y únete a la revolución del aprendizaje.
                </p>
              </div>

              {/* Grid de pasos en 1 o 2 columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {steps.map((step, index) => (
                  <TooltipWrapper key={index} tooltip={step.description}>
                    <div className="cursor-pointer p-3 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow border border-gray-700 backdrop-blur-sm transition-transform hover:scale-105 flex items-center space-x-3">
                      <div className="flex-shrink-0">{step.icon}</div>
                      <div>
                        <h3 className="text-xs font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </TooltipWrapper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón fijo de WhatsApp */}
      <div className="fixed bottom-6 right-6 z-20">
        <a
          href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!"
          target="_blank"
          rel="noopener noreferrer"
          title="Contact on WhatsApp"
          className="relative group flex items-center justify-center w-12 h-12 rounded-full bg-[#0F0F0F] text-green-400 border border-green-500 shadow-md transition-transform hover:scale-110 hover:shadow-xl"
        >
          <span className="absolute w-full h-full rounded-full bg-green-500 opacity-20 group-hover:opacity-30 animate-ping"></span>
          <FaWhatsapp className="w-6 h-6 relative" />
        </a>
      </div>
    </div>
  );
};

export default LoginFormB2C;
