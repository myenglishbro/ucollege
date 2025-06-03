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
            Initializing Secure Gateway
          </h1>
          <p className="text-sm text-gray-500 mt-2">Authenticating environment...</p>
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
            <div className="w-full lg:w-1/2 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-800">
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
                Trouble logging in?{' '}
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
          </div>
        </div>

        {[...Array(3)].map((_, i) => (
          <div key={i} className="mt-24">
            <div className="relative isolate overflow-clip bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 -z-10 aspect-square w-full max-w-3xl translate-x-3/4 rounded-full bg-gray-700/40 blur-[10rem] lg:-top-[40rem] lg:left-1/2 lg:-translate-x-1/2"
              ></div>
              <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-24 lg:text-start">
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Want to partner with design experts in SaaS?
                </h2>
                <p className="mt-6 text-base text-gray-300">
                  We're excited to talk to you about your project requirements and business goals.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <a
                    href="#"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Schedule a call
                  </a>
                  <a href="#" className="text-sm font-semibold leading-6 text-white">
                    Send an email
                  </a>
                </div>
              </div>
              <div className="relative mt-16 h-80 lg:mt-8 lg:h-auto">
                <img
                  width="1920"
                  height="1139"
                  className="absolute left-0 top-0 w-[58rem] max-w-none rounded-2xl bg-white/5 ring-1 ring-white/10 lg:top-14"
                  src="https://htmlwind.com/assets/images/dark-dashboard-screenshot.webp"
                  alt="dashboard screenshot"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginFormB2T;
