// quiz/components/QuizCard.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizCard({
  accent,
  mode,
  questionIndex,
  totalQuestions,
  question,
  onChooseOption,      // envío inmediato
  timeLeft,
  perQuestionTime,
  showCorrectMessage,  // banner verde
  showWrongMessage,    // banner rojo + shake
}) {
  const timePct =
    mode === "test"
      ? Math.max(0, Math.min(100, (timeLeft / (perQuestionTime || 60)) * 100))
      : 0;

  // keyframes de "shake" cuando hay error
  const shakeAnim = showWrongMessage
    ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
    : { x: 0 };

  return (
    <div className="w-full max-w-lg">
      {/* Banners de feedback */}
      <AnimatePresence>
        {showCorrectMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 md:top-8 md:right-8 text-white px-4 py-2 rounded-lg shadow-lg z-50"
            style={{ backgroundColor: "green" }}
          >
            ¡Genial! ✅
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWrongMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 md:top-8 md:right-8 text-white px-4 py-2 rounded-lg shadow-lg z-50"
            style={{ backgroundColor: "#e03131" }}
          >
            ¡Oh no! ❌
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span style={{ color: accent, fontWeight: 700 }}>
          Pregunta {questionIndex + 1} de {totalQuestions}
        </span>
        {mode === "test" && (
          <span style={{ color: accent, fontWeight: 700 }}>⏱️ {timeLeft}s</span>
        )}
      </div>

      {/* Barra de tiempo (solo test) */}
      {mode === "test" && (
        <div className="w-full h-2 bg-gray-200 rounded mb-4 overflow-hidden">
          <div
            className="h-2"
            style={{
              width: `${timePct}%`,
              backgroundColor: accent,
              transition: "width 1s linear",
            }}
          />
        </div>
      )}

      {/* Tarjeta de pregunta con shake en error */}
      <motion.div
        animate={shakeAnim}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="bg-white p-5 rounded-2xl shadow-md border mb-6"
        style={{ borderColor: "#E0E0E0" }}
      >
        <h2
          style={{ color: accent }}
          className="text-xl md:text-2xl font-semibold mb-4 text-center"
        >
          {question?.prompt || "—"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(question?.options || []).map((opt, idx) => (
            <motion.button
              key={`${opt}-${idx}`}
              onClick={() => onChooseOption(opt)}   // ← envío inmediato
              whileTap={{ scale: 0.97 }}
              className="py-2 px-3 rounded-xl border transition-shadow duration-200 focus:outline-none"
              style={{
                background: "#FFFFFF",
                color: accent,
                borderColor: accent,
                fontWeight: 600,
              }}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
