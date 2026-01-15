"use client";
import React, { useState } from "react";
import { validCredentials } from "../utils/credentials";
import {
  FaWhatsapp,
  FaUserAlt,
  FaLock,
  FaBookOpen,
  FaLightbulb,
  FaPenFancy,
  FaSignInAlt
} from "react-icons/fa";

const TooltipWrapper = ({ tooltip, children }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap z-30">
      {tooltip}
    </div>
  </div>
);

const LoginLibro = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const features = [
    { title: "Accede al Libro", description: "Explora todos los capítulos del método Key Word Transformation.", icon: <FaBookOpen className="w-5 h-5 text-white" /> },
    { title: "Aprende Estrategias", description: "Domina trucos, estructuras y patrones del examen.", icon: <FaLightbulb className="w-5 h-5 text-white" /> },
    { title: "Practica con Confianza", description: "Ejercicios interactivos, ejemplos resueltos y más.", icon: <FaPenFancy className="w-5 h-5 text-white" /> },
    { title: "Comienza ya", description: "Inicia sesión y continúa donde lo dejaste.", icon: <FaSignInAlt className="w-5 h-5 text-white" /> }
  ];

  const temario = [
    "Speculating about the Present",
    "Speculating about the Past",
    "Time Expressions: ago / for / last",
    "Time Expressions: ago ↔ since / since ↔ for",
    "Too to Enough / Enough to Too",
    "Reported Speech (Indirect Speech)",
    "Active → Passive Transformations",
    "Conditional Sentences (0th, 1st, 2nd, 3rd)",
    "Adjectives –ed → –ing / –ing → –ed",
    "Comparatives and Superlatives",
    "Causative Verbs (have, get, let, make, help)",
    "Phrasal Verbs",
    "Set Phrases",
    "Inverted Sentences",
    "Verbs Followed by Gerund (–ing)",
    "Negative Words and Constructions",
    "Modal Verbs and Semi-modals",
    "Common Idioms",
    "Prepositional Verbs",
    "Unreal Past Tenses (wishes, regrets, preferences)",
    "Verb Patterns: Gerund vs. Infinitive",
    "Sentences Requiring Two Changes",
    "Adjective ↔ Noun Transformations",
    "Fixed Phrases & Paraphrasing 24.1 to 24.4",
    "Linking Words & Conjunctive Phrases",
    "Verbs Followed by To-Infinitive"
  ];

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
    if (event.key === "Enter") handleLogin();
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center opacity-20 animate-pulse-slow" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] opacity-90" />

      <div className="relative z-10 flex flex-col items-center px-6 py-16 space-y-14 max-w-6xl mx-auto mt-10">
        {/* Login al inicio */}
        <section className="w-full max-w-md bg-black/50 p-6 rounded-xl border border-gray-700 shadow animate-fade-in">
          <h3 className="text-center font-bold text-white text-lg mb-4">
            Accede al Libro
          </h3>
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
              onClick={handleLogin}
              className="w-full py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg shadow hover:brightness-110 transition duration-200 text-sm"
            >
              Entrar
            </button>
            <p className="mt-3 text-center text-gray-500 text-xs">
              ¿Problemas de acceso? {" "}
              <a
                href="https://api.whatsapp.com/send?phone=51926922032&text=Hi!%20I%20need%20help%20accessing%20the%20book."
                className="text-cyan-400 hover:underline"
              >
                Contacta soporte
              </a>
            </p>
          </div>
        </section>

        <section className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-wide text-white drop-shadow-lg">
            KEY WORD TRANSFORMATION MASTERY
          </h1>
          <p className="text-lg lg:text-xl text-indigo-300 max-w-3xl mx-auto">
            Domina cada transformación con claridad, estrategia y precisión. El libro visual más avanzado para aprobar el FCE.
          </p>
        </section>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((step, index) => (
            <TooltipWrapper key={index} tooltip={step.description}>
              <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm shadow hover:scale-105 transition-transform flex flex-col items-center text-center">
                {step.icon}
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {step.title}
                </h3>
              </div>
            </TooltipWrapper>
          ))}
        </section>

        <section className="text-center max-w-4xl space-y-3">
          <h2 className="text-2xl font-bold text-indigo-400">Contenido del libro</h2>
          <p className="text-gray-300 text-sm">
            Explora todos los temas clave a través de un enfoque progresivo y visualmente atractivo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {temario.map((tema, idx) => (
              <div key={idx} className="bg-[#1f1f2e] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2a3a] transition">
                {idx + 1}. {tema}
              </div>
            ))}
          </div>
        </section>

        <footer className="text-xs text-gray-500 text-center mt-12">
          © 2025 MyEnglishBro™. All rights reserved.
        </footer>

        <div className="fixed bottom-6 right-6 z-20">
          <a
            href="https://api.whatsapp.com/send?phone=51926922032&text=Hi!%20I%20need%20help%20with%20my%20access."
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center justify-center w-12 h-12 rounded-full bg-[#0F0F0F] text-green-400 border border-green-500 shadow-md transition-transform hover:scale-110 hover:shadow-xl"
          >
            <span className="absolute w-full h-full rounded-full bg-green-500 opacity-20 group-hover:opacity-30 animate-ping"></span>
            <FaWhatsapp className="w-6 h-6 relative" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginLibro;
