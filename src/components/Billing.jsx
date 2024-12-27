import React from "react";
import { brainwaveSymbol, check } from "../assets2";
import { collabContent } from "../constants";
import Button from "./Button";

const Billing = () => (
  <div className="relative mx-auto max-w-6xl mt-10">
    {/* Outer Gradient Border */}
    <div
      className="rounded-xl p-1"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgb(79, 70, 229) 0%, rgb(165, 56, 164) 50%, rgb(220, 38, 38) 100%)",
      }}
    >
      {/* Inner Content */}
      <div className="rounded-lg bg-black/80 backdrop-blur">
        <div className="px-8 py-10 sm:px-16">
          {/* Title */}
          <h2 className="text-center block w-full pb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
            Rutas de Aprendizaje Autónomas ✨
          </h2>
          <p className="text-center mt-4 text-lg text-gray-400">
            Escoge el plan que mejor se adapte a tus necesidades profesionales y aprovecha nuestra tecnología avanzada para llevar tus proyectos al siguiente nivel.
          </p>

          {/* Pricing Plans */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {/* Standard Plan */}
            <div className="flex flex-col rounded-xl overflow-hidden border border-transparent hover:scale-105 transform transition-all max-w-xs">
              <div className="px-6 py-8 sm:p-10 sm:pb-6 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 rounded-xl">
                <div>
                  <span className="inline-flex rounded-full bg-indigo-300 px-4 py-1 text-sm font-semibold text-indigo-700">
                    Standard
                  </span>
                </div>
                <div className="mt-6 flex items-baseline text-3xl font-extrabold text-white">
                  $10-S/30
                </div>
                
                
              </div>
              <div className="flex flex-1 flex-col justify-between rounded-b-xl bg-gray-900 p-6 sm:p-10 sm:pb-6">
                <ul role="list" className="space-y-4">
                  {[" Ruta Básico a avanzado 🚀","Ruta Cambridge /toefl /ielts","Ruta B2/C1" ,"Ruta de medicina 💊", "Ruta de software","🎥 Videos explicativos ","📄 Ejercicios en PDF y manuales ","🎯 Ejercicios dinámicos","✅ Clases en vivo los fines de semana 📚✨"].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0">
                        <img src={check} alt="check" className="w-6 h-6 flex-shrink-0 text-violet-600" />
                      </div>
                      <p className="ml-3 text-sm text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="flex flex-col rounded-xl overflow-hidden border border-transparent hover:scale-105 transform transition-all max-w-xs">
              <div className="px-6 py-8 sm:p-10 sm:pb-6 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 rounded-xl">
                <div>
                  <span className="inline-flex rounded-full bg-indigo-300 px-4 py-1 text-sm font-semibold text-indigo-700">
                    Pro
                  </span>
                </div>
                <div className="mt-6 flex items-baseline text-3xl font-extrabold text-white">
                  $40-S/120
                </div>
                
                
              </div>
              <div className="flex flex-1 flex-col justify-between rounded-b-xl bg-gray-900 p-6 sm:p-10 sm:pb-6">
                <ul role="list" className="space-y-4">
                  {[" Ruta Básico a avanzado 🚀","Ruta Cambridge /toefl /ielts","Ruta B2/C1" ,"Ruta de medicina 💊", "Ruta de software","🎥 Videos explicativos ","📄 Ejercicios en PDF y manuales ","🎯 Ejercicios dinámicos","✅ Clases en vivo los fines de semana 📚✨"].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0">
                        <img src={check} alt="check" className="w-6 h-6 flex-shrink-0 text-violet-600" />
                      </div>
                      <p className="ml-3 text-sm text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Billing;
