"use client";
import React, { useState, useEffect } from "react";
import { validCredentials } from "../utils/credentials";

import {
  FaUserAlt,
  FaLock,
  FaMoneyBillAlt,
  FaFileUpload,
  FaUserEdit,
  FaSignInAlt,
} from "react-icons/fa";
import EpicAnimatedSvg from "./myenglishbro/components/EpicAnimatedSvg";

const LoginFormB2T = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center animate-pulse">
         <h1 className="text-3xl font-semibold text-gray-300 tracking-wide">
  Launching Valere English Core
</h1>
<p className="text-sm text-gray-500 mt-2">
  Empowering your journey to English mastery...
</p>

        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center pt-20 overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(150,150,150,0.08), transparent 80%)`,
        }}
      ></div>
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/hxFnL9kQ/Logo-Header-edited.png')] bg-cover bg-center animate-pulse-slow opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] opacity-90" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#141414]/80 rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
  {/* LADO IZQUIERDO - LOGIN */}
  <div className="w-full lg:w-1/2 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-800">
     {/* LOGO + TEXTO VALERE */}
  <div className="flex items-center justify-center gap-2 mb-4">
    <img
      src="https://i.ibb.co/hxFnL9kQ/Logo-Header-edited.png" // Cambia esta URL por la de tu logo si lo deseas
      alt="Valere Logo"
      className="w-8 h-8"
    />
    <span className="text-lg font-bold text-gray-300 tracking-widest">VALERE</span>
  </div>
    <h1 className="text-2xl font-bold text-gray-200 text-center mb-3 tracking-wide">
      Welcome Back
    </h1>
    <p className="text-center text-gray-500 text-sm mb-4 italic">
      Enter your credentials to continue.
    </p>
    <div className="space-y-3">
      <div className="relative">
        <FaUserAlt className="absolute top-2 left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Username"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full pl-10 pr-3 py-2 bg-[#1f1f1f] text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
        />
      </div>
      <div className="relative">
        <FaLock className="absolute top-2 left-3 text-gray-500" />
        <input
          type="password"
          placeholder="Password"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-3 py-2 bg-[#1f1f1f] text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center text-xs animate-pulse">
          {errorMessage}
        </p>
      )}
      <button
        type="button"
        onClick={handleLogin}
        className="w-full py-2 bg-[#232323] hover:bg-[#2a2a2a] text-gray-300 font-semibold rounded-lg border border-gray-700 transition duration-200 text-sm"
      >
        Access System
      </button>
    </div>
    <p className="mt-3 text-center text-gray-500 text-xs">
      Trouble logging in?{" "}
      <a
        href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
        className="text-gray-400 hover:underline"
      >
        Contact support
      </a>
    </p>
    <p className="mt-1 text-center text-gray-600 italic text-xs">
      © Valerians System
    </p>
  </div>

 
{/* LADO DERECHO - PRUEBA DE NIVEL */}
<div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center items-center text-center relative">
  {/* ESCENA 3D EN LUGAR DEL SVG */}
  <div className="mb-4 w-full flex justify-center">
  <EpicAnimatedSvg />

  </div>

  <h2 className="text-2xl font-semibold text-gray-100 mb-4 tracking-wide">
     Test your English level
  </h2>
  <p className="text-gray-400 text-sm mb-6 max-w-sm">
    Discover your current English level in just a few minutes with one of our placement tests.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-center">
    <a
      href="https://www.efset.org/4-skill/launch/"
       target="_blank"
          rel="noopener noreferrer"
      className="flex-1 px-6 py-2 text-center bg-[#232323] hover:bg-[#2a2a2a] text-gray-300 font-semibold rounded-lg border border-gray-700 transition duration-200 text-sm"
    >
       Full Test
    </a>
    <a
      href="https://www.efset.org/ef-set-50/launch/"
        target="_blank"
          rel="noopener noreferrer"
      className="flex-1 px-6 py-2 text-center bg-[#232323] hover:bg-[#2a2a2a] text-gray-300 font-semibold rounded-lg border border-gray-700 transition duration-200 text-sm"
    >
       Quick Test
    </a>
  </div>

  <p className="mt-4 text-xs text-gray-500 italic">
    Fast. Accurate. Free.
  </p>
</div>


</div>

        </div>

        
      </div>
    </div>
  );
};

export default LoginFormB2T;
