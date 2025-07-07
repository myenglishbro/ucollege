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
    <div className="min-h-screen w-full flex items-center justify-center relative font-sans bg-[#0c0c13] overflow-hidden mt-10">
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
      <div className="fixed inset-0 z-10 bg-gradient-to-br from-[#1a1424cc] via-[#18182370] to-[#07081acc]" />
      
      {/* Glow debajo del robot */}
      {robotImage && (
        <div className="absolute z-30 top-[8.5%] left-1/2 -translate-x-1/2 w-[175px] h-8 rounded-full blur-xl bg-gradient-to-r from-[#6658f6cc] via-[#38bdf899] to-[#6658f6cc] opacity-55" />
      )}
      {/* Robot */}
      {robotImage && (
        <img
          src={robotImage}
          alt="Robot"
          className="absolute z-40 top-[6.7%] left-1/2 -translate-x-1/2 w-[110px] md:w-[170px] lg:w-[160px] pointer-events-none select-none drop-shadow-[0_6px_32px_#6644f6cc] animate-bounce-slow"
          style={{ maxWidth: "36vw" }}
        />
      )}

      {/* FORMULARIO */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen px-3">
        <div
          className="w-full max-w-[370px] sm:max-w-md mx-auto rounded-3xl px-8 py-12 shadow-2xl border bg-[#19192be6] backdrop-blur-lg"
          style={{
            boxShadow: "0 8px 32px #000a, 0 2px 0 #37314f80 inset",
            background: "linear-gradient(133deg,#181831e9 45%,#0c0c18d8 100%)",
            border: "1.7px solid #37314f80",
            ...theme.box,
          }}
        >
          <h2 className="text-3xl font-extrabold text-[#e6eaff] mb-8 text-center tracking-tight drop-shadow-[0_1.5px_7px_#5a4ac1cc]">
            {title}
          </h2>
          {/* Usuario */}
          <div className="mb-6 relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#232241a0] via-[#34286b42] to-[#0e0e1899] shadow-md border border-[#30236d32]">
              <FaUserAlt className="text-[#7269e6] text-lg" />
            </span>
            <input
              ref={userRef}
              type="text"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#161725ee] text-[#e3eafc] border border-[#322a4f] focus:border-[#725cff] focus:ring-2 focus:ring-[#4e40d7] outline-none transition-all duration-200 font-medium placeholder:text-[#7a7ca5] shadow-sm"
              placeholder="Usuario o email"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              onKeyDown={handleKeyPress}
              autoComplete="username"
              spellCheck={false}
            />
          </div>
          {/* Contraseña */}
          <div className="mb-8 relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#232241a0] via-[#34286b42] to-[#0e0e1899] shadow-md border border-[#30236d32]">
              <FaLock className="text-[#38bdf8] text-lg" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-[#161725ee] text-[#e3eafc] border border-[#322a4f] focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8] outline-none transition-all duration-200 font-medium placeholder:text-[#7a7ca5] shadow-sm"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#38bdf8] hover:text-[#b2e3fb] transition-colors text-lg px-1"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* Error */}
          {error && (
            <div className="flex justify-center mb-5">
              <span className="px-4 py-2 rounded-lg bg-[#422737]/60 text-[#ffb0b0] text-xs font-semibold shadow animate-shake">
                {error}
              </span>
            </div>
          )}
          {/* Botón */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-2xl bg-gradient-to-tr from-[#30236d] via-[#383883] to-[#2e60ab] hover:from-[#38247a] hover:to-[#38bdf8] text-[#eaf3ff] font-bold tracking-wide shadow-lg hover:shadow-[0_0_16px_#38bdf855] focus:ring-2 focus:ring-[#38bdf8] border border-[#393986] transition-all duration-200 backdrop-blur-xl"
          >
            Acceder
          </button>
        </div>
      </div>
      {/* Animaciones */}
      <style>{`
        html, body, #__next { overflow: hidden !important; height: 100% !important; }
        ::selection { background: #322964; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-13px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5.5s cubic-bezier(.44,2,.56,.81) infinite;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(3px); }
          30%, 50%, 70% { transform: translateX(-5px); }
          40%, 60% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.42s;
        }
      `}</style>
    </div>
  );
};

export default LoginUniversal;
