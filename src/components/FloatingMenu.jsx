import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMenu = ({ setActivePopup }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    { id: 1, label: "📘 Info", popup: "info" },
    { id: 2, label: "📅 Agenda", popup: "agenda" },
    { id: 3, label: "🧠 Tips", popup: "tips" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <AnimatePresence>
          {isOpen &&
            buttons.map((btn, i) => (
              <motion.button
                key={btn.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -70 - i * 60 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActivePopup(btn.popup)}
                className="absolute right-0 mb-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
              >
                {btn.label}
              </motion.button>
            ))}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-purple-700 text-white text-2xl flex items-center justify-center shadow-xl hover:bg-purple-800"
        >
          {isOpen ? "×" : "+"}
        </button>
      </div>
    </div>
  );
};

export default FloatingMenu;
