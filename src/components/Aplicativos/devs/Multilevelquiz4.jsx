import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import levelsData from "../data/levelsExercises4.json";

/**
 * MultiLevelQuiz4 – Versión JS (sin TypeScript) con mejoras:
 * - Timer 90s por pregunta (barra + mm:ss) y auto-avance al terminar
 * - Auto-submit al hacer click en una opción (sin botón Submit)
 * - Progreso superior + “faltan X”
 * - Paleta cálida (rose/amber)
 * - Reporte final mejorado (porcentaje, badges y tarjetas por pregunta)
 * - Botón Retry que reinicia el nivel sin volver al menú
 */

export default function MultiLevelQuiz4() {
  const levels = levelsData.levels;

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [unlockedLevels, setUnlockedLevels] = useState({ 0: true });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Timer: 90 segundos por pregunta
  const QUESTION_TIME = 90;
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_TIME);

  // Reset general al cambiar de nivel
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setAnswersLog([]);
    setCodeInput("");
    setQuizFinished(false);
    setSecondsLeft(QUESTION_TIME);
  }, [selectedLevel]);

  const level = useMemo(
    () => (selectedLevel !== null ? levels[selectedLevel] : null),
    [levels, selectedLevel]
  );
  const exercises = useMemo(() => (level ? level.exercises : []), [level]);
  const q = useMemo(
    () => (exercises.length ? exercises[currentQuestion] : null),
    [exercises, currentQuestion]
  );

  // Progreso
  const total = exercises.length || 0;
  const answered = answersLog.length;
  const remaining = Math.max(total - answered - (quizFinished ? 0 : 1), 0);

  // Reset timer cada vez que cambia la pregunta
  useEffect(() => {
    if (selectedLevel === null || quizFinished) return;
    setSecondsLeft(QUESTION_TIME);
  }, [currentQuestion, selectedLevel, quizFinished]);

  // Tick del timer
  useEffect(() => {
    if (selectedLevel === null || quizFinished) return;

    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(tick);
          // Tiempo agotado: cuenta como no respondida
          handleAutoSubmit("");
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [currentQuestion, selectedLevel, quizFinished]);

  const handleAutoSubmit = (choice) => {
    if (!q) return;
    const isCorrect = choice === q.answer;
    if (isCorrect) setScore((s) => s + 1);

    setAnswersLog((log) => [
      ...log,
      {
        prompt: q.prompt,
        selected: choice || "(no answer)",
        answer: q.answer,
        correct: isCorrect,
      },
    ]);

    setSelectedOption("");

    // Avanzar o terminar
    if (currentQuestion + 1 < exercises.length) {
      setCurrentQuestion((i) => i + 1);
    } else {
      setQuizFinished(true);
      const finalTotal = isCorrect ? score + 1 : score;
      if (finalTotal === exercises.length) {
        setUnlockedLevels((prev) => ({ ...prev, [selectedLevel + 1]: true }));
      }
    }
  };

  const onSelectOption = (opt) => {
    setSelectedOption(opt);
    // ligera pausa para feedback visual
    setTimeout(() => handleAutoSubmit(opt), 250);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString();
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // Reset completo del nivel sin salir al menú
  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setAnswersLog([]);
    setQuizFinished(false);
    setSecondsLeft(QUESTION_TIME);
  };

  // ====== SCREENS ======

  // Menú (línea de tiempo vertical)
  if (selectedLevel === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 flex flex-col items-center justify-center p-4 text-stone-800">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-700 mb-8 drop-shadow-sm">
          IT Roadmap
        </h1>

        <div className="relative w-full max-w-2xl flex flex-col items-center px-4 py-8">
          {/* Línea vertical */}
          <div className="absolute top-16 bottom-16 left-1/2 w-1 bg-amber-200/70 -translate-x-1/2" />

          {levels.map((lvl, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className={`relative w-full flex mb-8 items-center ${
                idx % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <img
                src={lvl.thumbnail}
                alt={`Level ${lvl.level}`}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover shadow-md ring-2 ring-rose-200/70"
                style={{ order: idx % 2 === 0 ? 0 : 1 }}
              />

              <div className="relative flex flex-col items-center mx-3">
                <button
                  onClick={() => setSelectedLevel(idx)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-lg sm:text-xl font-extrabold transition-shadow shadow-md border
                    ${
                      unlockedLevels[idx]
                        ? "bg-gradient-to-tr from-amber-400 to-rose-300 text-stone-900 border-amber-300 hover:shadow-amber-300/60"
                        : "bg-stone-200 text-stone-400 border-stone-300"
                    }`}
                  aria-label={`Open level ${idx + 1}`}
                >
                  {idx + 1}
                </button>
                {unlockedLevels[idx] && (
                  <motion.span
                    className="absolute -bottom-3 w-3 h-3 bg-rose-400 rounded-full shadow"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Guard
  if (!level) return null;

  // Pantalla bloqueada por código
  if (selectedLevel > 0 && !unlockedLevels[selectedLevel]) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 flex items-center justify-center p-6 text-stone-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur p-8 rounded-3xl border border-amber-200 shadow-xl max-w-md w-full"
        >
          <h2 className="text-2xl font-extrabold text-amber-700 mb-3">
            Level {selectedLevel + 1} Locked
          </h2>
          <p className="mb-4 text-stone-700">Enter the access code to unlock:</p>
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            className="w-full p-3 bg-white border border-amber-200 rounded-xl text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="Access Code"
          />
          <button
            onClick={() =>
              codeInput === level.prerequisiteCode
                ? setUnlockedLevels((prev) => ({
                    ...prev,
                    [selectedLevel]: true,
                  }))
                : alert("Wrong code")
            }
            className="w-full py-3 bg-gradient-to-tr from-amber-400 to-rose-300 text-stone-900 font-extrabold rounded-2xl mb-2 shadow hover:opacity-95"
          >
            Unlock
          </button>
          <button
            onClick={() => setSelectedLevel(null)}
            className="w-full py-2 text-stone-500 hover:text-stone-700"
          >
            Back to Menu
          </button>
        </motion.div>
      </div>
    );
  }

  // Resultados
  if (quizFinished) {
    const allCorrect = score === exercises.length;
    const pct = total ? Math.round((score / total) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 flex flex-col items-center py-8 text-stone-800">
        <button
          onClick={() => setSelectedLevel(null)}
          className="self-start ml-4 mb-4 text-stone-500 hover:text-stone-700"
        >
          ← Menu
        </button>

        <div className="w-full max-w-3xl space-y-6 px-4">
          <div className="bg-white/80 backdrop-blur p-6 rounded-3xl border border-amber-200 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-3xl font-extrabold text-amber-700">
                Level {level.level} — Results
              </h2>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    pct >= 80
                      ? "bg-green-100 text-green-700"
                      : pct >= 50
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {pct}%
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-sm font-bold">
                  {score} / {total}
                </span>
              </div>
            </div>

            {/* Barra de % correctas */}
            <div className="mt-4">
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-amber-400 to-rose-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-stone-600">Correct answers</p>
            </div>

            {allCorrect && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="mt-6 bg-gradient-to-tr from-amber-100 to-rose-100 border border-amber-200 p-5 rounded-2xl text-center"
              >
                <p className="text-lg font-bold text-amber-800">
                  Perfect! You earned code:
                </p>
                <p className="text-2xl font-extrabold text-rose-600 tracking-widest mt-1">
                  {level.levelCode}
                </p>
                <button
                  onClick={() => setSelectedLevel(selectedLevel + 1)}
                  className="mt-3 px-6 py-2 bg-gradient-to-tr from-amber-400 to-rose-300 rounded-xl font-extrabold text-stone-900 shadow hover:opacity-95"
                >
                  Go to Next Level →
                </button>
              </motion.div>
            )}
          </div>

          {/* Revisión de respuestas */}
          <div className="bg-white/80 backdrop-blur p-6 rounded-3xl border border-amber-200 shadow-xl">
            <h3 className="text-xl font-extrabold text-stone-800 mb-4">
              Review your answers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {answersLog.map((e, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border shadow-sm ${
                    e.correct
                      ? "bg-green-50 border-green-200"
                      : "bg-rose-50 border-rose-200"
                  }`}
                >
                  <p className="text-sm text-stone-500 mb-1">Q{i + 1}</p>
                  <p className="font-semibold mb-2">{e.prompt}</p>
                  <p className="text-sm">
                    Your answer:{" "}
                    <span
                      className={
                        e.correct
                          ? "text-green-700 font-semibold"
                          : "text-rose-700 font-semibold"
                      }
                    >
                      {e.selected}
                    </span>
                  </p>
                  {!e.correct && (
                    <p className="text-sm">
                      Correct answer:{" "}
                      <span className="text-stone-900 font-semibold">
                        {e.answer}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleRetry}
                className="px-5 py-2 rounded-xl bg-stone-100 text-stone-800 font-bold hover:bg-stone-200"
              >
                Retry Level
              </button>
              <button
                onClick={() => setSelectedLevel(null)}
                className="px-5 py-2 rounded-xl bg-amber-400 text-stone-900 font-extrabold hover:opacity-95"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interfaz del quiz
  const pctTime = Math.max(
    0,
    Math.min(100, Math.round((secondsLeft / QUESTION_TIME) * 100))
  );
  const pctQuestions = total
    ? Math.round(((currentQuestion + 1) / total) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 flex flex-col items-center py-8 text-stone-800">
      <button
        onClick={() => setSelectedLevel(null)}
        className="self-start ml-4 mb-4 text-stone-500 hover:text-stone-700"
      >
        ← Menu
      </button>

      <div className="w-full max-w-3xl space-y-5 px-4">
        {/* Progreso superior */}
        <div className="bg-white/80 backdrop-blur p-4 rounded-3xl border border-amber-200 shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl md:text-2xl font-extrabold text-amber-700">
              Level {level.level}
            </h2>
            <p className="text-sm md:text-base text-stone-700">
              Question {currentQuestion + 1} / {total} ·{" "}
              <span className="font-semibold">{remaining} left</span>
            </p>
          </div>
          <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-amber-400 to-rose-300"
              style={{ width: `${pctQuestions}%` }}
            />
          </div>
        </div>

        {/* Tarjeta de pregunta */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur p-6 rounded-3xl border border-amber-200 shadow-xl space-y-5"
        >
          {/* Timer */}
          <div className="flex items-center gap-3">
            <div
              className="relative w-full h-2 bg-stone-100 rounded-full overflow-hidden"
              aria-label="Time left"
            >
              <motion.div
                initial={false}
                animate={{ width: `${pctTime}%` }}
                transition={{ ease: "linear", duration: 0.5 }}
                className={`h-2 ${
                  secondsLeft <= 10
                    ? "bg-rose-500"
                    : secondsLeft <= 25
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />
            </div>
            <span
              className={`min-w-[62px] text-sm font-bold px-2 py-1 rounded-md text-center ${
                secondsLeft <= 10
                  ? "bg-rose-100 text-rose-700"
                  : secondsLeft <= 25
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {formatTime(secondsLeft)}
            </span>
          </div>

          {/* Enunciado */}
          <p className="text-lg md:text-xl font-semibold text-stone-900">
            {q?.prompt}
          </p>

          {/* Opciones */}
          <div className="grid grid-cols-1 gap-3">
            {q?.options.map((opt) => (
              <motion.button
                key={opt}
                onClick={() => onSelectOption(opt)}
                whileTap={{ scale: 0.98 }}
                className={`text-left py-3 px-4 rounded-2xl border shadow-sm transition font-medium
                 ${
                   selectedOption === opt
                     ? "bg-amber-100 border-amber-300 text-stone-900"
                     : "bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50"
                 }`}
              >
                {opt}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-stone-600">
            <span>
              Score: <span className="font-bold text-stone-900">{score}</span>
            </span>
            <span>Auto-submits on selection · No need to press any button</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
