import React from "react";
import { motion } from "framer-motion";
import { brainwaveSymbol, check } from "../assets2";
import Button from "./Button";

const plans = [
  {
    name: "Standard",
    price: "$10 - S/30",
    features: [
      "1 mes",
      "Ruta Básico a Avanzado 🚀",
      "Ruta Cambridge / TOEFL / IELTS",
      "Ruta B2/C1",
      "Ruta de Medicina 💊",
      "Ruta de Software",
      "🎥 Videos Explicativos",
      "📄 Ejercicios en PDF y Manuales",
      "🎯 Ejercicios Dinámicos",
      "✅ Clases en Vivo los Fines de Semana 📚✨",
    ],
    gradient: "from-indigo-600 via-purple-700 to-pink-600",
  },
  {
    name: "Pro",
    price: "$40 - S/120",
    features: [
      "6 meses",
      "Ruta Básico a Avanzado 🚀",
      "Ruta Cambridge / TOEFL / IELTS",
      "Ruta B2/C1",
      "Ruta de Medicina 💊",
      "Ruta de Software",
      "🎥 Videos Explicativos",
      "📄 Ejercicios en PDF y Manuales",
      "🎯 Ejercicios Dinámicos",
      "✅ Clases en Vivo los Fines de Semana 📚✨",
    ],
    gradient: "from-teal-500 via-green-500 to-blue-500",
  },
];

const Billing = () => (
  <div className="relative mx-auto max-w-6xl mt-10">
    {/* Outer Gradient Border */}
      {/* Inner Content */}
      <div className="rounded-lg  backdrop-blur-md">
        <div className="px-8 py-10 sm:px-16">
          {/* Title */}
          <h2 className="text-center w-full pb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
            Rutas de Aprendizaje Autónomas ✨
          </h2>
          <p className="text-center mt-4 text-lg text-gray-400">
            Escoge el plan que mejor se adapte a tus necesidades profesionales y aprovecha nuestra tecnología avanzada para llevar tus proyectos al siguiente nivel.
          </p>

          {/* Pricing Plans */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className="flex flex-col rounded-xl overflow-hidden border hover:scale-105 transform transition-all max-w-xs shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                {/* Plan Header */}
                <div
                  className={`px-6 py-8 sm:p-10 sm:pb-6 bg-gradient-to-r ${plan.gradient} rounded-xl`}
                >
                  <div>
                    <span className="inline-flex rounded-full bg-indigo-300 px-4 py-1 text-sm font-semibold text-indigo-700">
                      {plan.name}
                    </span>
                  </div>
                  <div className="mt-6 flex items-baseline text-3xl font-extrabold text-white">
                    {plan.price}
                  </div>
                </div>

                {/* Plan Details */}
                <div className="flex flex-1 flex-col justify-between rounded-b-xl bg-gray-900 p-6 sm:p-10">
                  <ul role="list" className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <img
                          src={check}
                          alt="check"
                          className="w-6 h-6 flex-shrink-0 text-violet-600"
                        />
                        <p className="ml-3 text-sm text-gray-300">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
  </div>
);

export default Billing;
