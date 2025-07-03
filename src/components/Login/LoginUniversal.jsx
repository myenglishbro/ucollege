// components/Login/LoginForm.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginUniversal = ({
  onLoginSuccess,
  validCredentials,
  backgroundImage,
  robotImage,
  title = "Inicia sesión",
  theme = {},
}) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const userRef = useRef(null);

  useEffect(() => {
    userRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleLogin = () => {
    const userCredential = validCredentials.find(
      cred => cred.usuario === usuario && cred.password === clave
    );
    if (userCredential) {
      setError("");
      onLoginSuccess(userCredential, clave);
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  function handleKeyPress(e) {
    if (e.key === "Enter") handleLogin();
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative font-sans bg-[#101015] overflow-hidden mt-10">
      {/* Fondo */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Fondo"
          className="fixed inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
          draggable={false}
          style={{ objectPosition: "center" }}
        />
      )}
      {/* Overlay */}
      <div className="fixed inset-0 z-10 bg-gradient-to-br from-[#181B1Eea] via-[#181C2290] to-[#0a0c10ef]" />
      {/* Robot */}
      {robotImage && (
        <img
          src={robotImage}
          alt="Robot"
          className="absolute z-30 top-[8%] left-1/2 -translate-x-1/2 w-[120px] md:w-[160px] lg:w-[150px] pointer-events-none select-none drop-shadow-xl animate-bounce-slow"
          style={{ maxWidth: "34vw" }}
        />
      )}
      {/* FORMULARIO */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen px-3">
        <div
          className="w-full max-w-[370px] sm:max-w-md mx-auto rounded-2xl px-7 py-10 md:px-8 md:py-12 shadow-2xl border border-[#232b34] bg-[#191A23ee] backdrop-blur-sm"
          style={{
            boxShadow: "0 8px 32px #000c, 0 1.5px 0 #232b3460 inset",
            background: "linear-gradient(135deg,#181C23f8 50%,#161821ec 100%)",
            border: "1.2px solid #232b3480",
            ...theme.box,
          }}
        >
          <h2 className="text-2xl font-bold text-[#e3eaf5] mb-7 text-center tracking-tight">
            {title}
          </h2>
          <div className="mb-5 relative">
            <FaUserAlt className="absolute left-3 top-3 text-[#667088] opacity-55" />
            <input
              ref={userRef}
              type="text"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#191A23] text-[#f3f6fa] border border-[#232b34] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none transition-all duration-150 font-medium"
              placeholder="Usuario o email"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              onKeyDown={handleKeyPress}
              autoComplete="username"
              spellCheck={false}
            />
          </div>
          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-3 text-[#667088] opacity-55" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#191A23] text-[#f3f6fa] border border-[#232b34] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none transition-all duration-150 font-medium"
              placeholder="Contraseña"
              value={clave}
              onChange={e => setClave(e.target.value)}
              onKeyDown={handleKeyPress}
              autoComplete="current-password"
              spellCheck={false}
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShowPassword(s => !s)}
              className="absolute right-3 top-2.5 text-[#38bdf8] hover:text-[#89d6fb] transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-400 mb-4 text-center">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-[#222735] hover:bg-[#232a40] text-[#f3f6fa] font-semibold tracking-wide shadow hover:text-[#38bdf8] transition-all duration-150 border border-[#232b34] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] backdrop-blur-sm"
          >
            Acceder
          </button>
        </div>
      </div>
      {/* Animaciones */}
      <style>{`
        html, body, #__next { overflow: hidden !important; height: 100% !important; }
        ::selection { background: #23283a; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s cubic-bezier(.44,2,.56,.81) infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginUniversal;
