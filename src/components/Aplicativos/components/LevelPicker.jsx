// quiz/components/LevelPicker.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ACCENT, CIRCLE_LOCKED_BG, CIRCLE_SHADOW } from "./constants";

export default function LevelPicker({
  title,
  levels,
  unlockedLevels,
  onLevelClick,
  showLockModal,
  lockModalLevel,
  codeInput,
  setCodeInput,
  handleUnlock,
  closeModal,
}) {
  return (
    <div
      style={{ background: "#F6F8FF" }}
      className="min-h-screen flex flex-col items-center justify-center py-6 px-2 pt-16"
    >
      <h1
        style={{ color: ACCENT, fontWeight: 800, letterSpacing: 0.5 }}
        className="text-2xl sm:text-3xl md:text-5xl mb-2 md:mb-8 text-center drop-shadow-lg"
      >
        {title}
      </h1>

      <div className="w-full max-w-3xl flex flex-col items-center">
        <div className="flex gap-4 justify-center w-full flex-wrap md:flex-nowrap mb-4">
          {levels.map((lvl, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: unlockedLevels[idx] ? 1.13 : 1 }}
              whileTap={{ scale: unlockedLevels[idx] ? 0.97 : 1 }}
              onClick={() => onLevelClick(idx)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-150 ${
                unlockedLevels[idx] ? "" : "opacity-50"
              }`}
              style={{ minWidth: 74, minHeight: 74 }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 mb-2"
                style={{
                  borderColor: unlockedLevels[idx] ? ACCENT : "#AAA",
                  background: unlockedLevels[idx] ? "#fff" : CIRCLE_LOCKED_BG,
                  boxShadow: CIRCLE_SHADOW,
                }}
              >
                {unlockedLevels[idx] ? (
                  <span style={{ color: ACCENT, fontWeight: 800, fontSize: 30 }}>
                    {idx + 1}
                  </span>
                ) : (
                  <span className="text-2xl" style={{ color: "#999" }}>
                    🔒
                  </span>
                )}
              </div>
              <span
                style={{
                  color: unlockedLevels[idx] ? ACCENT : "#8787a3",
                  fontWeight: unlockedLevels[idx] ? 700 : 400,
                  fontSize: 17,
                }}
              >
                Nivel {lvl.level}
              </span>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showLockModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white p-6 md:p-8 rounded-xl shadow-xl w-72 md:w-96"
              >
                <h2
                  style={{ color: ACCENT, fontWeight: 700 }}
                  className="text-xl md:text-2xl font-bold mb-4 flex items-center justify-center gap-2"
                >
                  <span role="img" aria-label="lock" style={{ fontSize: 22 }}>
                    🔒
                  </span>
                  Nivel {lockModalLevel + 1}
                </h2>
                <p className="mb-2 text-gray-700 text-base text-center">
                  Ingresa el código de acceso para desbloquear este nivel:
                </p>
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  className="w-full p-3 border border-[#1515FF] rounded-lg mb-4 focus:border-[#1515FF] text-[#1515FF] font-semibold bg-white placeholder:text-[#B3B8C2]"
                  placeholder="Código de acceso"
                  style={{ fontSize: 18 }}
                />
                <button
                  onClick={handleUnlock}
                  className="w-full py-2 md:py-3 bg-[#1515FF] hover:bg-[#0e0ec9] text-white rounded-lg font-semibold mb-2 transition"
                >
                  Desbloquear
                </button>
                <button
                  onClick={closeModal}
                  style={{ color: ACCENT }}
                  className="w-full py-2 hover:underline text-sm"
                >
                  Cancelar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
