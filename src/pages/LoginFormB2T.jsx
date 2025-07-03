"use client";
import React, { useState, useEffect } from "react";
import { validCredentials } from "../utils/credentials";
import { motion } from "framer-motion";
import {
  FaUserAlt,
  FaLock,
  FaSignInAlt,
  FaWhatsapp,
} from "react-icons/fa";
import EpicAnimatedSvg from "./myenglishbro/components/EpicAnimatedSvg";

const LoginFormA1 = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track mouse for dynamic spotlight effect
    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  useEffect(() => {
    // Initial splash before showing login
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    setErrorMessage("");
    // simulate auth delay
    await new Promise((res) => setTimeout(res, 1000));
    const cred = validCredentials.find(
      (c) => c.usuario === usuario && c.password === codigo
    );
    if (cred) onLoginSuccess(cred, codigo);
    else setErrorMessage("⚠️ Usuario o contraseña incorrectos.");
  };

  const handleKeyPress = (e) => e.key === "Enter" && handleLogin();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse text-center text-gray-300">
          <h1 className="text-3xl font-semibold tracking-wide">
            Cargando Nivel A1...
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Preparando tu camino hacia el inglés básico...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Spotlight follow mouse */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 80%)`,
        }}
      />
      {/* Background layers */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center opacity-10 animate-pulse-slow" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] opacity-90" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto bg-[#141414]/70 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Login Form */}
          <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-800">
            <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center tracking-wide">
              Acceso Nivel A1
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <FaUserAlt className="absolute top-3 left-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-500" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-center text-sm"
                >
                  {errorMessage}
                </motion.p>
              )}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogin}
                className="w-full py-2 flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:brightness-110 transition"
              >
                <FaSignInAlt className="mr-2" /> Iniciar Sesión
              </motion.button>
            </div>
            <div className="mt-6 text-center text-gray-500 text-xs">
              <a
                href="https://api.whatsapp.com/send?phone=51926922032&text=Hola%20Carlos!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-green-400 transition"
              >
                <FaWhatsapp className="mr-2" /> Contactar Soporte
              </a>
            </div>
          </div>

          {/* Right: Animated SVG / CTA */}
          <div className="p-8 flex flex-col items-center justify-center bg-[#1c1c1c]">
            <EpicAnimatedSvg className="w-64 h-64 mb-6" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2 tracking-wide">
              Empieza tu Aprendizaje
            </h3>
            <p className="text-gray-400 text-sm text-center mb-4 max-w-xs">
              Explora el contenido nivel A1 y da tus primeros pasos en inglés.
            </p>
            <motion.a
              href="#content"
              whileHover={{ scale: 1.02 }}
              className="px-6 py-2 bg-[#232323] hover:bg-[#2a2a2a] text-gray-300 rounded-lg border border-gray-700 transition text-sm"
            >
              Ver Contenido A1
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormA1;
