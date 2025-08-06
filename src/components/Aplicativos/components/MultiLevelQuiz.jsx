import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const accent = "#1515FF";
const bgMain = "#F6F8FF";
const circleLockedBg = "#EEF1FF";
const circleShadow = "0 4px 24px 0 #1515FF10";

export default function MultiLevelQuiz({ levelsData, title }) {
  const levels = levelsData.levels;
  // Mode: 'test' (timer & codes) or 'practice' (no timer, no codes)
  const [mode, setMode] = useState(null);
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
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockModalLevel, setLockModalLevel] = useState(null);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const timerRef = useRef(null);

  // Unlock all levels in practice mode
  useEffect(() => {
    if (mode === 'practice') {
      const all = {};
      levels.forEach((_, i) => all[i] = true);
      setUnlockedLevels(all);
    }
  }, [mode, levels]);

  // Reset quiz state on level change
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setAnswersLog([]);
    setCodeInput("");
    setQuizFinished(false);
  }, [selectedLevel]);

  // Timer effect (only in test mode)
  useEffect(() => {
    if (mode === 'test' && selectedLevel !== null && !quizFinished) {
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
  }, [mode, selectedLevel, currentQuestion, quizFinished]);

  // Security blocking copy/screenshot (applies to both modes)
  useEffect(() => {
    const disableRightClick = e => e.preventDefault();
    const disableSelection = e => e.preventDefault();
    const handleKeyDown = e => {
      const forbidden = ['c','u','s'];
      if ((e.ctrlKey && forbidden.includes(e.key.toLowerCase())) || ['F12','PrintScreen'].includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = e => {
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        setShowBlackScreen(true);
        setTimeout(() => setShowBlackScreen(false), 3000);
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('selectstart', disableSelection);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('selectstart', disableSelection);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const level = selectedLevel != null ? levels[selectedLevel] : null;
  const exercises = level?.exercises || [];
  const q = exercises[currentQuestion] || {};

  const handleLevelClick = idx => {
    if (mode === 'practice') {
      setSelectedLevel(idx);
    } else {
      if (unlockedLevels[idx]) {
        setSelectedLevel(idx);
      } else {
        setLockModalLevel(idx);
        setShowLockModal(true);
      }
    }
  };

  const handleUnlock = () => {
    if (codeInput === levels[lockModalLevel].prerequisiteCode) {
      setUnlockedLevels(prev => ({ ...prev, [lockModalLevel]: true }));
      setShowLockModal(false);
      setCodeInput("");
    } else {
      alert("Código incorrecto");
    }
  };

  const handleSubmitAnswer = () => {
    clearInterval(timerRef.current);
    const isCorrect = selectedOption === q.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setShowCorrectMessage(true);
      setTimeout(() => setShowCorrectMessage(false), 2000);
    }
    setAnswersLog(prev => [...prev, { prompt: q.prompt, selected: selectedOption || '—', answer: q.answer, correct: isCorrect }]);
    setSelectedOption("");
    if (currentQuestion + 1 < exercises.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizFinished(true);
      const total = isCorrect ? score + 1 : score;
      if (mode === 'test' && total === exercises.length) {
        setUnlockedLevels(prev => ({ ...prev, [selectedLevel + 1]: true }));
      }
    }
  };

  const BlackScreenOverlay = () => showBlackScreen && (
    <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center text-white text-2xl font-bold pointer-events-none">
      Captura bloqueada por seguridad
    </div>
  );

  // Initial mode selection screen
  if (mode === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <h1 className="text-3xl font-bold mb-6" style={{ color: accent }}>{title}</h1>
        <div className="flex gap-4">
          <button onClick={() => setMode('test')} className="px-6 py-3 rounded-lg font-semibold" style={{ backgroundColor: accent, color: '#fff' }}>
            Modo Prueba
          </button>
          <button onClick={() => setMode('practice')} className="px-6 py-3 rounded-lg font-semibold border" style={{ borderColor: accent, color: accent }}>
            Modo Práctica
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="relative noselect">
      {BlackScreenOverlay()}

      {/* Level Selection Screen */}
      {selectedLevel === null && (
        <div style={{ background: bgMain }} className="min-h-screen flex flex-col items-center justify-center py-6 px-2">
          <h1 style={{ color: accent, fontWeight: 800, letterSpacing: 0.5 }}
            className="text-2xl sm:text-3xl md:text-5xl mb-2 md:mb-8 text-center drop-shadow-lg">{title}</h1>
          <div className="w-full max-w-3xl flex flex-col items-center">
            <div className="flex gap-4 justify-center w-full flex-wrap md:flex-nowrap mb-4">
              {levels.map((lvl, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: unlockedLevels[idx] ? 1.13 : 1 }}
                  whileTap={{ scale: unlockedLevels[idx] ? 0.97 : 1 }}
                  onClick={() => handleLevelClick(idx)}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-150 ${unlockedLevels[idx] ? "" : "opacity-50"}`}
                  style={{ minWidth: 74, minHeight: 74 }}
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 mb-2"
                    style={{
                      borderColor: unlockedLevels[idx] ? accent : "#AAA",
                      background: unlockedLevels[idx] ? "#fff" : circleLockedBg,
                      boxShadow: circleShadow
                    }}
                  >
                    {unlockedLevels[idx]
                      ? <span style={{ color: accent, fontWeight: 800, fontSize: 30 }}>{idx + 1}</span>
                      : <span className="text-2xl" style={{ color: "#999" }}>🔒</span>
                    }
                  </div>
                  <span style={{
                    color: unlockedLevels[idx] ? accent : "#8787a3",
                    fontWeight: unlockedLevels[idx] ? 700 : 400,
                    fontSize: 17
                  }}>
                    Nivel {lvl.level}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* Unlock Modal */}
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
                    <h2 style={{ color: accent, fontWeight: 700 }} className="text-xl md:text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                      <span role="img" aria-label="lock" style={{ fontSize: 22 }}>🔒</span>
                      Nivel {lockModalLevel + 1}
                    </h2>
                    <p className="mb-2 text-gray-700 text-base text-center">
                      Ingresa el código de acceso para desbloquear este nivel:
                    </p>
                    <input
                      type="text"
                      value={codeInput}
                      onChange={e => setCodeInput(e.target.value)}
                      className="w-full p-3 border border-[#1515FF] rounded-lg mb-4 focus:border-[#1515FF] text-[#1515FF] font-semibold bg-white placeholder:text-[#B3B8C2]"
                      placeholder="Código de acceso"
                      style={{ fontSize: 18 }}
                    />
                    <button
                      onClick={handleUnlock}
                      className="w-full py-2 md:py-3 bg-[#1515FF] hover:bg-[#0e0ec9] text-white rounded-lg font-semibold mb-2 transition"
                    >Desbloquear</button>
                    <button
                      onClick={() => setShowLockModal(false)}
                      style={{ color: accent }}
                      className="w-full py-2 hover:underline text-sm"
                    >Cancelar</button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    
      {/* Quiz Screen */}
      {selectedLevel !== null && !quizFinished && (
        <div style={{ background: bgMain }} className="min-h-screen flex flex-col items-center px-2 py-6">
          <AnimatePresence>
            {showCorrectMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="fixed top-4 right-4 md:top-8 md:right-8 text-white px-4 py-2 rounded-lg shadow-lg z-50"
                style={{ backgroundColor: "green" }}
              >¡Genial! ✅</motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setSelectedLevel(null)} style={{ color: accent }} className="self-start mb-4 text-sm md:text-base hover:underline">Menú</button>
          <div className="w-full max-w-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <span style={{ color: accent, fontWeight: 700 }}>Pregunta {currentQuestion + 1} de {exercises.length}</span>
              <span style={{ color: accent, fontWeight: 700 }}>⏱️ {timeLeft}s</span>
            </div>
            {/* Quiz Card */}
            <div className="bg-white p-5 rounded-2xl shadow-md border mb-6" style={{ borderColor: "#E0E0E0" }}>
              <h2 style={{ color: accent }} className="text-xl md:text-2xl font-semibold mb-4 text-center">{q.prompt}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.options.map(opt => (
                  <motion.button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    whileTap={{ scale: 0.97 }}
                    className="py-2 px-3 rounded-xl border transition-shadow duration-200 focus:outline-none"
                    style={{
                      background: selectedOption === opt ? accent : "#FFFFFF",
                      color: selectedOption === opt ? "#fff" : accent,
                      borderColor: accent,
                      fontWeight: 600
                    }}
                  >{opt}</motion.button>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption}
                  className="px-6 py-2 rounded-lg font-semibold transition-colors"
                  style={{
                    backgroundColor: accent,
                    color: "#FFFFFF",
                    opacity: !selectedOption ? 0.5 : 1,
                    cursor: !selectedOption ? "not-allowed" : "pointer"
                  }}
                >Enviar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Screen */}
     {/* Results Screen - Dark Premium Elegante */}
{selectedLevel !== null && quizFinished && (
  <div className="min-h-screen flex flex-col items-center p-6 bg-gray-900">
    <button
      onClick={() => setSelectedLevel(null)}
      className="self-start mb-6 text-sm md:text-base text-white hover:underline"
    >
      Menú
    </button>

    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Resultados Nivel <span className="font-bold">{level.level}</span>
      </h2>

      <div className="space-y-4">
        {answersLog.map((e, i) => (
          <div
            key={i}
            className={`p-4 rounded border-l-4 border-opacity-50 bg-gray-700 ${
              e.correct ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <p className="italic mb-1 text-gray-200">
              <strong>{e.prompt}</strong>
            </p>
            <p className="text-gray-100">
              Tu respuesta: <strong className={`${e.correct ? 'text-green-300' : 'text-red-300'}`}>
                {e.selected}
              </strong>
            </p>
            {!e.correct && (
              <p className="text-gray-100">
                Correcta: <strong className="text-green-300">{e.answer}</strong>
              </p>
            )}
          </div>
        ))}

        <p className="mt-6 font-medium text-lg text-white">
          Puntuación: {score} / {exercises.length}
        </p>
      </div>

      {score === exercises.length && (
        <div className="mt-8 flex flex-col items-center">
          <p className="text-xl font-semibold mb-2 text-white">
            ¡Felicidades! 🎉
          </p>
          <p className="text-base text-gray-200 mb-4">
            Código desbloqueado:{' '}
            <span className="font-mono text-white">{level.levelCode}</span>
          </p>
          <button
            onClick={() => setSelectedLevel(selectedLevel + 1)}
            className="px-6 py-2 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 transition-shadow shadow-md text-white"
          >
            Siguiente Nivel
          </button>
        </div>
      )}
    </div>
  </div>
)}


    </div>
  );
}

