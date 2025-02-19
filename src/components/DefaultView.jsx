import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DefaultView = ({ realname, userImage, nivel, expirationDate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            ></div>
            <motion.div
              className="relative bg-[#1C1C27] text-white rounded-2xl shadow-2xl w-11/12 sm:w-3/5 lg:w-1/3 p-6 md:p-8 border border-gray-700"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
              <div className="flex flex-col items-center text-center">
                <img
                  src={userImage}
                  alt="User"
                  className="w-24 h-24 rounded-full border-4 border-gray-500 shadow-lg mb-4"
                />
                <h2 className="text-2xl font-semibold">{realname}</h2>
                <p className="text-md text-gray-400 font-medium">{nivel}</p>
                <p className="text-xs text-gray-500 mt-1">Expira el: {expirationDate}</p>
              </div>

              <div className="mt-6 flex justify-between space-x-3">
                <a
                  href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-lg hover:scale-105 transition-transform"
                >
                  WhatsApp
                </a>
                <a
                  href="https://docs.google.com/document/d/1OV0QilMHzo3OsYqw1XveVlsfiFm90_Ji5_E5SIBpSSM/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:scale-105 transition-transform"
                >
                  Clase 🎥
                </a>
                <button
                  onClick={() => setIsScheduleOpen(true)}
                  className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl px-6 py-3 hover:scale-105 transition-transform"
                >
                  Horario 📅
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Modal */}
      <AnimatePresence>
        {isScheduleOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
              onClick={() => setIsScheduleOpen(false)}
            ></div>
            <motion.div
              className="relative bg-[#262636] rounded-2xl shadow-2xl w-11/12 sm:w-3/5 lg:w-1/3 p-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsScheduleOpen(false)}
              >
                ✕
              </button>
              <h3 className="mb-4 text-xl font-semibold text-white text-center">
                Horario de Clases
              </h3>
              {isLoading && (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              )}
              <iframe
                src="https://docs.google.com/spreadsheets/d/1vEAJ1H82jT4PBnQ7DNxgPJOeTf_YA2eNE41aOQaBlN0/edit?usp=sharing"
                title="Horario de Clases"
                className={`w-full h-96 rounded-lg border border-gray-700 shadow-lg transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DefaultView;
