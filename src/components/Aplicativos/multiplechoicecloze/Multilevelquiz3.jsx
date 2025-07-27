import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import levelsData from "../data/levelsExercises3.json";

// Paleta base
const accent = "#1515FF";
const bgMain = "#F6F8FF";
const circleLockedBg = "#EEF1FF";
const circleShadow = "0 4px 24px 0 #1515FF10";

export default function MultiLevelQuiz3() {
  const levels = levelsData.levels;
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [unlockedLevels, setUnlockedLevels] = useState({ 0: true });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showWrongMessage, setShowWrongMessage] = useState(false);
  const timerRef = useRef(null);
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockModalLevel, setLockModalLevel] = useState(null);

  // Reset quiz when level changes
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setAnswersLog([]);
    setCodeInput("");
    setQuizFinished(false);
    setTimeLeft(60);
    clearInterval(timerRef.current);
  }, [selectedLevel]);

  // Timer effect
  useEffect(() => {
    if (selectedLevel !== null && !quizFinished) {
      setTimeLeft(60);
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitAnswer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [selectedLevel, currentQuestion, quizFinished]);

  // MENÚ DE NIVELES - horizontal, responsive, candaditos, miniaturas
  if (selectedLevel === null) {
    return (
      <div style={{ background: bgMain }} className="min-h-screen flex flex-col items-center justify-center py-8 px-2">
        <h1
          style={{ color: accent, fontWeight: 800, letterSpacing: 0.5 }}
          className="text-2xl sm:text-3xl md:text-5xl mb-6 text-center drop-shadow-lg"
        >
          Multiple Choice Cloze
        </h1>
        <div className="w-full max-w-3xl flex flex-col items-center">
          <div className="flex gap-3 justify-center w-full flex-wrap mb-4 overflow-x-auto">
            {levels.map((lvl, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: unlockedLevels[idx] ? 1.06 : 1 }}
                whileTap={{ scale: unlockedLevels[idx] ? 0.95 : 1 }}
                onClick={() => {
                  if (unlockedLevels[idx]) setSelectedLevel(idx);
                  else {
                    setLockModalLevel(idx);
                    setShowLockModal(true);
                  }
                }}
                className={`flex flex-col items-center cursor-pointer transition-all duration-150 ${unlockedLevels[idx] ? "" : "opacity-40"}`}
                style={{ minWidth: 55 }}
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 shadow mb-1 relative bg-white"
                  style={{
                    borderColor: unlockedLevels[idx] ? accent : "#AAA",
                    boxShadow: circleShadow
                  }}
                >
                  {unlockedLevels[idx] ? (
                    <span style={{ color: accent, fontWeight: 800, fontSize: 15 }}>{idx + 1}</span>
                  ) : (
                    <span className="text-sm md:text-lg" style={{ color: "#888" }}>🔒</span>
                  )}
                  {/* Miniatura */}
                  <img
                    src={lvl.thumbnail}
                    alt={`Nivel ${lvl.level}`}
                    className="absolute -bottom-2 right-0 w-5 h-5 md:w-6 md:h-6 rounded-md object-contain border border-[#f1f1f1] bg-white shadow"
                  />
                </div>
                <span
                  style={{
                    color: unlockedLevels[idx] ? accent : "#8787a3",
                    fontWeight: unlockedLevels[idx] ? 700 : 400,
                    fontSize: 13
                  }}
                >
                  {lvl.level}
                </span>
              </motion.div>
            ))}
            {/* Modal para código de desbloqueo (sólo si el usuario intenta entrar a un nivel bloqueado) */}
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
                    className="bg-white p-6 rounded-xl shadow-xl w-80 max-w-xs"
                  >
                    <h2 style={{ color: accent }} className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span>🔒</span>
                      Nivel {lockModalLevel + 1}
                    </h2>
                    <p className="mb-2 text-gray-700 text-center">Ingresa el código de acceso para desbloquear:</p>
                    <input
                      type="text"
                      value={codeInput}
                      onChange={e => setCodeInput(e.target.value)}
                      className="w-full p-3 border border-[#1515FF] rounded-lg mb-4 focus:border-[#1515FF] text-[#1515FF] font-semibold bg-white placeholder:text-[#B3B8C2]"
                      placeholder="Código de acceso"
                    />
                    <button
                      onClick={() => {
                        if (codeInput === levels[lockModalLevel].prerequisiteCode) {
                          setUnlockedLevels(prev => ({ ...prev, [lockModalLevel]: true }));
                          setShowLockModal(false);
                          setCodeInput("");
                        } else {
                          alert("Código incorrecto");
                        }
                      }}
                      className="w-full py-2 bg-[#1515FF] hover:bg-[#0e0ec9] text-white rounded-lg font-semibold mb-2 transition"
                    >
                      Desbloquear
                    </button>
                    <button
                      onClick={() => setShowLockModal(false)}
                      style={{ color: accent }}
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
      </div>
    );
  }

  const level = levels[selectedLevel];
  const exercises = level.exercises;
  const q = exercises[currentQuestion];

  function handleSubmitAnswer() {
    clearInterval(timerRef.current);
    const isCorrect = selectedOption === q.answer;
    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrectMessage(true);
      setTimeout(() => setShowCorrectMessage(false), 1400);
    } else {
      setShowWrongMessage(true);
      setTimeout(() => setShowWrongMessage(false), 1400);
    }
    setAnswersLog(log => [
      ...log,
      { prompt: q.prompt, selected: selectedOption, answer: q.answer, correct: isCorrect }
    ]);
    setSelectedOption("");
    if (currentQuestion + 1 < exercises.length) {
      setCurrentQuestion(i => i + 1);
      setTimeLeft(60);
    } else {
      setQuizFinished(true);
      // **Desbloquear automáticamente el siguiente nivel**
      if (selectedLevel + 1 < levels.length) {
        setUnlockedLevels(prev => ({ ...prev, [selectedLevel + 1]: true }));
      }
    }
  }

  // RESULTS SCREEN
  if (quizFinished) {
    const allCorrect = score === exercises.length;
    return (
      <div style={{ background: bgMain }} className="min-h-screen flex flex-col items-center py-8">
        <button onClick={() => setSelectedLevel(null)} style={{ color: accent }} className="self-start ml-4 mb-4 hover:underline">Menú</button>
        <div className="w-full max-w-xl space-y-6 p-4">
          <h2 style={{ color: accent }} className="text-3xl font-bold text-center">Resultados Nivel {level.level}</h2>
          <div className="bg-white p-6 rounded-2xl space-y-4 border shadow-md">
            {answersLog.map((e, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#F7F9FF]">
                <p className="italic mb-1" style={{ color: accent }}>{e.prompt}</p>
                <p>Tu respuesta: <span style={{ color: e.correct ? "green" : "red" }}>{e.selected}</span></p>
                {!e.correct && <p>Correcta: <span style={{ color: accent }}>{e.answer}</span></p>}
              </div>
            ))}
            <p className="font-bold" style={{ color: accent }}>Puntaje: {score} / {exercises.length}</p>
          </div>
          {allCorrect && (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#1515FF] p-6 rounded-2xl text-center space-y-3">
              <p className="text-xl font-bold text-white">¡Código desbloqueado!</p>
              <p className="text-2xl font-extrabold text-yellow-300">{level.levelCode}</p>
              <button
                onClick={() => setSelectedLevel(selectedLevel + 1)}
                className="mt-2 px-6 py-2 bg-white text-[#1515FF] rounded-xl font-bold shadow"
              >
                Siguiente Nivel
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // QUIZ INTERFACE
  return (
    <div style={{ background: bgMain }} className="min-h-screen flex flex-col items-center py-8">
      <AnimatePresence>
        {showCorrectMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-xl shadow-lg z-50 font-bold text-lg"
          >
            ¡Buen trabajo! 🎉
          </motion.div>
        )}
        {showWrongMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-xl shadow-lg z-50 font-bold text-lg"
          >
            ¡Keep trying!
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setSelectedLevel(null)} style={{ color: accent }} className="self-start ml-4 mb-4 hover:underline">Menú</button>
      <div className="w-full max-w-xl space-y-6 p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 style={{ color: accent }} className="text-2xl font-bold">Nivel {level.level}</h2>
          <span className="font-semibold" style={{ color: accent }}>
            ⏱️ {timeLeft}s
          </span>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-5 rounded-2xl border shadow-md space-y-4">
          <p className="text-lg" style={{ color: accent }}>{q.prompt}</p>
          <div className="grid grid-cols-1 gap-2">
            {q.options.map(opt => (
              <motion.button
                key={opt}
                onClick={() => setSelectedOption(opt)}
                whileTap={{ scale: 0.96 }}
                className="py-2 px-3 rounded-md border transition focus:outline-none font-medium text-base"
                style={{
                  background: selectedOption === opt ? accent : "#F7F9FF",
                  color: selectedOption === opt ? "#fff" : accent,
                  borderColor: accent
                }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
          <div className="flex justify-end items-center mt-4">
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className="px-5 py-2 rounded-md font-bold transition-colors"
              style={{
                backgroundColor: accent,
                color: "#FFFFFF",
                opacity: !selectedOption ? 0.5 : 1,
                cursor: !selectedOption ? "not-allowed" : "pointer"
              }}
            >
              Enviar
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
