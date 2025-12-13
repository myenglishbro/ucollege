import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import levelsData from "../data/levelsExercises3.json";

// Cambridge-inspired palette and typography
const palette = {
  navy: "#0f1c3f",
  deepBlue: "#1c2f5d",
  gold: "#c6a24a",
  sky: "#dbe6ff",
  porcelain: "#f7f5ee",
  border: "#e4e7f0",
  success: "#1f9b6b",
  danger: "#d64545"
};
const serif = "'Merriweather', 'Georgia', serif";
const sans = "'Poppins', 'Inter', 'Helvetica Neue', 'Arial', sans-serif";

export default function MultiLevelQuiz3() {
  const levels = levelsData.levels;

  const [mode, setMode] = useState("exam"); // exam | practice
  const [examUnlocked, setExamUnlocked] = useState({ 0: true });
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [codeInput, setCodeInput] = useState("");
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
  const [showIntro, setShowIntro] = useState(true);

  const isPractice = mode === "practice";

  // Derived unlocked map
  const unlocked = isPractice
    ? levels.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {})
    : examUnlocked;

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

  // Timer effect (exam mode only)
  useEffect(() => {
    clearInterval(timerRef.current);
    if (selectedLevel !== null && !quizFinished && !isPractice) {
      setTimeLeft(60);
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
  }, [selectedLevel, currentQuestion, quizFinished, isPractice]);

  function handleSubmitAnswer() {
    clearInterval(timerRef.current);
    const level = levels[selectedLevel];
    const exercises = level.exercises;
    const q = exercises[currentQuestion];
    const isCorrect = selectedOption === q.answer;
    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrectMessage(true);
      setTimeout(() => setShowCorrectMessage(false), 1200);
    } else {
      setShowWrongMessage(true);
      setTimeout(() => setShowWrongMessage(false), 1200);
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
    }
  }

  const resetAll = () => {
    setSelectedLevel(null);
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setAnswersLog([]);
    setQuizFinished(false);
    setTimeLeft(60);
    setShowCorrectMessage(false);
    setShowWrongMessage(false);
  };

  // Intro screen
  if (showIntro) {
    return (
      <div
        className="min-h-screen flex items-center justify-center py-12 px-5"
        style={{
          background: `linear-gradient(160deg, ${palette.navy}, ${palette.deepBlue})`,
          fontFamily: sans
        }}
      >
        <div
          className="w-full max-w-4xl rounded-3xl p-10 space-y-6 shadow-2xl"
          style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: palette.gold }}>
              Part 1 - Multiple Choice Cloze
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: palette.navy, fontFamily: serif }}
            >
              B2 First · Reading & Use of English
            </h1>
            <p className="text-base md:text-lg" style={{ color: palette.deepBlue }}>
              Choose the exact word or phrase that fits each gap; expect close meanings, collocations, and grammatical patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base" style={{ color: palette.deepBlue }}>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                Overview
              </h3>
              <p>8 gaps; each correct option = 1 point (8 total). Assesses vocabulary nuance and grammar in context.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                How to approach
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Read around each gap and note prepositions, adverbs, or verb forms.</li>
                <li>Think in phrases/collocations, not isolated words.</li>
                <li>Read the whole sentence before locking your choice.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                Assessment focus
              </h3>
              <p>Lexical nuance, collocations, phrasal verbs, register, and grammar patterns within context.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                Tips
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Practice collocations and phrasal verbs in real contexts.</li>
                <li>Analyze sentences to see how each word shapes meaning.</li>
                <li>Read varied texts and track author word choices for nuance.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm md:text-base" style={{ color: palette.deepBlue }}>
              Exam mode requires prerequisite codes to open sets. Practice mode unlocks everything and removes the code requirement.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="px-6 py-3 rounded-full font-semibold"
              style={{
                background: palette.navy,
                color: "#fff",
                border: `1px solid ${palette.border}`,
                boxShadow: "0 12px 32px rgba(12,19,42,0.28)"
              }}
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Level selection
  if (selectedLevel === null) {
    return (
      <div
        className="min-h-screen flex flex-col items-center py-10 px-4"
        style={{
          background: `radial-gradient(circle at 20% 20%, #20396d20, transparent 35%), radial-gradient(circle at 80% 0%, #c6a24a1a, transparent 30%), linear-gradient(140deg, ${palette.navy}, ${palette.deepBlue})`,
          fontFamily: sans
        }}
      >
        <div className="w-full max-w-5xl">
          <div
            className="rounded-3xl p-8 md:p-10 mb-10 shadow-2xl"
            style={{
              background: palette.porcelain,
              border: `1px solid ${palette.border}`,
              boxShadow: "0 30px 80px rgba(12,19,42,0.22)"
            }}
          >
            <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:items-center md:justify-between">
              <div>
                <p
                  className="uppercase tracking-[0.25em] text-xs font-semibold mb-3"
                  style={{ color: palette.gold, fontFamily: serif }}
                >
                  Cambridge Practice
                </p>
                <h1
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: palette.navy, fontFamily: serif }}
                >
                  Multiple Choice Cloze Atelier
                </h1>
                <p className="text-base md:text-lg" style={{ color: palette.deepBlue }}>
                  Pick your mode: Exam replicates lock codes; Practice opens all sets with no codes.
                </p>
              </div>
              <div className="flex gap-2 bg-white rounded-full p-1 border" style={{ borderColor: palette.border }}>
                {["exam", "practice"].map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setSelectedLevel(null);
                    }}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                    style={{
                      background: mode === m ? palette.navy : "transparent",
                      color: mode === m ? "#fff" : palette.deepBlue,
                      boxShadow: mode === m ? "0 8px 18px rgba(12,19,42,0.18)" : "none"
                    }}
                  >
                    {m === "exam" ? "Exam mode" : "Practice mode"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {levels.map((lvl, idx) => {
              const isUnlocked = !!unlocked[idx];
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: isUnlocked ? -6 : 0, scale: isUnlocked ? 1.01 : 1 }}
                  whileTap={{ scale: isUnlocked ? 0.98 : 1 }}
                  onClick={() => {
                    if (isUnlocked) setSelectedLevel(idx);
                    else {
                      setLockModalLevel(idx);
                      setShowLockModal(true);
                    }
                  }}
                  className={`cursor-pointer rounded-2xl p-[1px] transition-all duration-200 ${isUnlocked ? "" : "opacity-70"}`}
                  style={{
                    background: `linear-gradient(140deg, ${palette.gold}, ${palette.deepBlue})`,
                    boxShadow: isUnlocked ? "0 16px 46px rgba(12,19,42,0.18)" : "none"
                  }}
                >
                  <div
                    className="h-full rounded-2xl bg-white p-5 flex flex-col gap-4"
                    style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{
                          background: palette.sky,
                          color: palette.navy,
                          border: `1px solid ${palette.border}`,
                          fontFamily: serif
                        }}
                      >
                        {idx + 1}
                      </div>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          background: isUnlocked ? palette.sky : "#f6d9d9",
                          color: isUnlocked ? palette.navy : palette.danger,
                          border: `1px solid ${palette.border}`
                        }}
                      >
                        {isUnlocked ? "Unlocked" : "Locked"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={lvl.thumbnail}
                        alt={`Level ${lvl.level}`}
                        className="w-14 h-14 rounded-xl object-cover border"
                        style={{ borderColor: palette.border }}
                      />
                      <div className="flex-1">
                        <p className="text-sm uppercase tracking-[0.12em] text-slate-500 mb-1">Level {lvl.level}</p>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: palette.navy, fontFamily: serif }}
                        >
                          {lvl.title || "Cambridge Drill"}
                        </h3>
                        <p className="text-sm" style={{ color: palette.deepBlue }}>
                          {lvl.summary || "Refine precision, tone, and grammar control."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm" style={{ color: palette.deepBlue }}>
                      <span>Items: {lvl.exercises.length}</span>
                      <span>{isUnlocked ? (isPractice ? "Start practice" : "Begin exam") : "Enter code"}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {!isPractice && (
          <AnimatePresence>
            {showLockModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 10 }}
                  className="bg-white p-6 rounded-2xl shadow-2xl w-80 max-w-xs space-y-3"
                  style={{ border: `1px solid ${palette.border}` }}
                >
                  <h2
                    className="text-xl font-bold flex items-center gap-2"
                    style={{ color: palette.navy, fontFamily: serif }}
                  >
                    Level {lockModalLevel + 1} locked
                  </h2>
                  <p className="text-sm" style={{ color: palette.deepBlue }}>
                    Enter the prerequisite code to open this level (Exam mode).
                  </p>
                  <input
                    type="text"
                    value={codeInput}
                    onChange={e => setCodeInput(e.target.value)}
                    className="w-full p-3 rounded-lg mb-1 focus:outline-none"
                    style={{
                      border: `1px solid ${palette.border}`,
                      background: "#fff",
                      color: palette.navy
                    }}
                    placeholder="Access code"
                  />
                  <button
                    onClick={() => {
                      if (codeInput === levels[lockModalLevel].prerequisiteCode) {
                        setExamUnlocked(prev => ({ ...prev, [lockModalLevel]: true }));
                        setShowLockModal(false);
                        setCodeInput("");
                      } else {
                        alert("Incorrect code. Try again.");
                      }
                    }}
                    className="w-full py-2 rounded-lg font-semibold transition-colors"
                    style={{ background: palette.navy, color: "#fff" }}
                  >
                    Unlock
                  </button>
                  <button
                    onClick={() => setShowLockModal(false)}
                    className="w-full py-2 rounded-lg font-semibold"
                    style={{ color: palette.deepBlue }}
                  >
                    Cancel
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  }

  const level = levels[selectedLevel];
  const exercises = level.exercises;
  const q = exercises[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / exercises.length) * 100);

  // RESULTS SCREEN
  if (quizFinished) {
    const allCorrect = score === exercises.length;
    return (
      <div
        className="min-h-screen flex flex-col items-center py-10 px-4"
        style={{
          background: `linear-gradient(160deg, ${palette.navy}, ${palette.deepBlue})`,
          fontFamily: sans
        }}
      >
        <div className="w-full max-w-3xl space-y-6">
          <div className="flex justify-between items-center">
            <button
              onClick={resetAll}
              className="text-sm font-semibold"
              style={{ color: palette.sky }}
            >
              Back to menu
            </button>
            <div className="text-xs uppercase tracking-[0.18em]" style={{ color: palette.gold }}>
              Level {level.level} · {isPractice ? "Practice" : "Exam"}
            </div>
          </div>

          <div
            className="rounded-3xl p-8 space-y-5 shadow-2xl"
            style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
          >
            <div className="flex items-center justify-between">
              <h2
                className="text-2xl font-bold"
                style={{ color: palette.navy, fontFamily: serif }}
              >
                Results
              </h2>
              <div
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: palette.sky,
                  color: palette.navy,
                  border: `1px solid ${palette.border}`
                }}
              >
                Score {score} / {exercises.length}
              </div>
            </div>

            <div className="space-y-3">
              {answersLog.map((e, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl"
                  style={{
                    background: "#fff",
                    border: `1px solid ${palette.border}`,
                    boxShadow: "0 8px 22px rgba(12,19,42,0.08)"
                  }}
                >
                  <p className="text-sm font-semibold mb-2" style={{ color: palette.navy }}>
                    {e.prompt}
                  </p>
                  <p className="text-sm">
                    Your answer:{" "}
                    <span style={{ color: e.correct ? palette.success : palette.danger, fontWeight: 700 }}>
                      {e.selected || "No answer"}
                    </span>
                  </p>
                  {!e.correct && (
                    <p className="text-sm">
                      Correct: <span style={{ color: palette.navy, fontWeight: 700 }}>{e.answer}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {allCorrect && !isPractice && selectedLevel + 1 < levels.length && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-2xl text-center space-y-3"
                style={{
                  background: `linear-gradient(135deg, ${palette.navy}, ${palette.deepBlue})`,
                  color: "#fff",
                  border: `1px solid ${palette.border}`,
                  boxShadow: "0 16px 44px rgba(12,19,42,0.28)"
                }}
              >
                <p className="text-lg font-semibold" style={{ fontFamily: serif }}>
                  Código de acceso desbloqueado
                </p>
                <p className="text-2xl font-bold tracking-wide">{level.levelCode}</p>
                <p className="text-sm opacity-90">
                  Usa este prerequisiteCode en el menú (modo examen) para abrir el siguiente nivel.
                </p>
                <button
                  onClick={resetAll}
                  className="mt-2 px-6 py-3 rounded-full font-semibold"
                  style={{
                    background: "#fff",
                    color: palette.navy,
                    border: `1px solid ${palette.border}`
                  }}
                >
                  Volver al menú
                </button>
              </motion.div>
            )}

            {allCorrect && isPractice && selectedLevel + 1 < levels.length && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: "#fff",
                  color: palette.navy,
                  border: `1px solid ${palette.border}`,
                  boxShadow: "0 16px 44px rgba(12,19,42,0.12)"
                }}
              >
                <p className="text-lg font-semibold" style={{ fontFamily: serif }}>
                  Practice complete
                </p>
                <button
                  onClick={() => {
                    setSelectedLevel(selectedLevel + 1);
                    setCurrentQuestion(0);
                    setSelectedOption("");
                    setScore(0);
                    setAnswersLog([]);
                    setQuizFinished(false);
                  }}
                  className="mt-3 px-6 py-3 rounded-full font-semibold"
                  style={{
                    background: palette.navy,
                    color: "#fff",
                    border: `1px solid ${palette.border}`
                  }}
                >
                  Next practice level
                </button>
              </motion.div>
            )}

            {!allCorrect && (
              <button
                onClick={() => {
                  setQuizFinished(false);
                  setCurrentQuestion(0);
                  setSelectedOption("");
                  setScore(0);
                  setAnswersLog([]);
                  setTimeLeft(60);
                }}
                className="w-full py-3 rounded-full font-semibold"
                style={{ background: "#d8d8d8", color: "#1f2937" }}
              >
                Try again
              </button>
            )}

            {allCorrect && selectedLevel + 1 >= levels.length && (
              <p className="text-center font-semibold" style={{ color: palette.success }}>
                All levels completed. Well done.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // QUIZ INTERFACE
  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{
        background: `linear-gradient(160deg, ${palette.navy}, ${palette.deepBlue})`,
        fontFamily: sans
      }}
    >
      <AnimatePresence>
        {showCorrectMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-semibold z-50"
            style={{ background: palette.success, color: "#fff", boxShadow: "0 12px 30px rgba(31,155,107,0.35)" }}
          >
            Excellent choice. Keep the cadence.
          </motion.div>
        )}
        {showWrongMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-semibold z-50"
            style={{ background: palette.danger, color: "#fff", boxShadow: "0 12px 30px rgba(214,69,69,0.35)" }}
          >
            Review the nuance and try again.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={resetAll}
            className="text-sm font-semibold"
            style={{ color: palette.sky }}
          >
            Back to menu
          </button>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold"
            style={{
              background: palette.porcelain,
              border: `1px solid ${palette.border}`,
              color: palette.navy
            }}
          >
            <span>{isPractice ? "Practice" : "Exam"}</span>
            {!isPractice && (
              <span
                className="px-2 py-1 rounded-full"
                style={{ background: palette.sky, color: palette.navy }}
              >
                {timeLeft}s
              </span>
            )}
          </div>
        </div>

        <div
          className="rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
          style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: palette.gold }}>
                Level {level.level}
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: palette.navy, fontFamily: serif }}
              >
                Precision Checkpoint
              </h2>
            </div>
            <div className="text-sm font-semibold" style={{ color: palette.deepBlue }}>
              Item {currentQuestion + 1} / {exercises.length}
            </div>
          </div>

          <div className="w-full bg-white h-2 rounded-full" style={{ border: `1px solid ${palette.border}` }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: palette.gold }}
            />
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-lg md:text-xl font-semibold mb-4" style={{ color: palette.deepBlue }}>
              {q.prompt}
            </p>
            <div className="grid grid-cols-1 gap-3">
              {q.options.map(opt => {
                const isSelected = selectedOption === opt;
                return (
                  <motion.button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    whileTap={{ scale: 0.98 }}
                    className="text-left rounded-2xl p-4 border font-semibold transition"
                    style={{
                      background: isSelected ? palette.navy : "#fff",
                      color: isSelected ? "#fff" : palette.navy,
                      borderColor: palette.border,
                      boxShadow: isSelected ? "0 12px 32px rgba(12,19,42,0.28)" : "0 8px 18px rgba(12,19,42,0.06)"
                    }}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className="px-6 py-3 rounded-full font-semibold transition-colors"
              style={{
                background: selectedOption ? palette.gold : "#d8d8d8",
                color: selectedOption ? palette.navy : "#6b7280",
                cursor: selectedOption ? "pointer" : "not-allowed",
                boxShadow: selectedOption ? "0 12px 32px rgba(198,162,74,0.35)" : "none"
              }}
            >
              Submit answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
