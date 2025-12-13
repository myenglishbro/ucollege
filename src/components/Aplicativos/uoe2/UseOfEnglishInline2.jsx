import React, { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import testsData from "../data/testsData2.json";

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

export default function UseOfEnglishInline2() {
  const [mode, setMode] = useState("exam"); // exam | practice
  const [examUnlocked, setExamUnlocked] = useState({ 0: true });
  const [unlocked, setUnlocked] = useState({ 0: true });
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [unlockCode, setUnlockCode] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [modalLevel, setModalLevel] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(360);
  const [showIntro, setShowIntro] = useState(true);
  const timerRef = useRef(null);

  const isPractice = mode === "practice";

  // Reset unlocks when switching to practice: open access to all sets, keep progress in exam
  useEffect(() => {
    if (isPractice) {
      const all = {};
      testsData.tests.forEach((_, idx) => {
        all[idx] = true;
      });
      setUnlocked(all);
    } else {
      setUnlocked(examUnlocked);
    }
  }, [isPractice, examUnlocked]);

  // Timer only in exam mode
  useEffect(() => {
    clearInterval(timerRef.current);
    if (selectedTest !== null && !submitted && !isPractice) {
      setTimeLeft(360);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [selectedTest, submitted, isPractice]);

  const resetQuiz = () => {
    setSelectedTest(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setFeedback(null);
    setUnlockCode("");
    setTimeLeft(360);
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
              Part 2 - Open Cloze
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: palette.navy, fontFamily: serif }}
            >
              B2 First · Reading & Use of English
            </h1>
            <p className="text-base md:text-lg" style={{ color: palette.deepBlue }}>
              Fill each gap with one precise word; expect grammar-heavy items like pronouns, articles, prepositions, auxiliaries, and fixed phrases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base" style={{ color: palette.deepBlue }}>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                Overview
              </h3>
              <p>8 gaps; each correct word = 1 point (8 total). Assesses grammar and lexico-grammar within a coherent text.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                How to approach
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Read around each gap for structure and agreement.</li>
                <li>Keep the full text in mind for cohesion.</li>
                <li>Use exactly one word; avoid contractions/abbreviations.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                Assessment focus
              </h3>
              <p>Articles, auxiliaries, prepositions, pronouns, verb forms/tenses, phrasal verbs, linkers, and fixed phrases.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                Tips
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Read widely to internalize patterns and register.</li>
                <li>Drill specific grammar areas (articles, tenses, linkers).</li>
                <li>Create your own cloze by blanking key words in passages.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm md:text-base" style={{ color: palette.deepBlue }}>
              Exam mode requires prerequisite codes to open each set. Practice mode unlocks everything and removes the timer.
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

  // Level selection screen
  if (selectedTest === null) {
    return (
      <div
        className="min-h-screen flex flex-col items-center py-10 px-4"
        style={{
          background: `radial-gradient(circle at 18% 20%, #20396d18, transparent 36%), radial-gradient(circle at 82% 8%, #c6a24a24, transparent 32%), linear-gradient(140deg, ${palette.navy}, ${palette.deepBlue})`,
          fontFamily: sans
        }}
      >
        <div className="w-full max-w-5xl">
          <div
            className="rounded-3xl p-8 md:p-10 mb-8 shadow-2xl"
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
                  Cambridge Grammar Studio
                </p>
                <h1
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: palette.navy, fontFamily: serif }}
                >
                  Use of English – Open Cloze Lab
                </h1>
                <p className="text-base md:text-lg" style={{ color: palette.deepBlue }}>
                  Choose the mode you need. Exam replicates timing and lock codes; Practice opens every set without codes.
                </p>
              </div>
              <div className="flex gap-2 bg-white rounded-full p-1 border" style={{ borderColor: palette.border }}>
                {["exam", "practice"].map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
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
            {testsData.tests.map((test, idx) => {
              const isUnlocked = isPractice || unlocked[idx];
              return (
                <motion.div
                  key={test.id}
                  whileHover={{ y: isUnlocked ? -6 : 0, scale: isUnlocked ? 1.01 : 1 }}
                  whileTap={{ scale: isUnlocked ? 0.98 : 1 }}
                  onClick={() => {
                    if (isUnlocked) setSelectedTest(idx);
                    else {
                      setModalLevel(idx);
                      setShowCodeModal(true);
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
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
                        style={{
                          background: "#fff",
                          color: palette.navy,
                          border: `1px solid ${palette.border}`,
                          fontFamily: serif,
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)"
                        }}
                      >
                        {(test.title?.[0] || "S").toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm uppercase tracking-[0.12em] text-slate-500 mb-1">Set {idx + 1}</p>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: palette.navy, fontFamily: serif }}
                        >
                          {test.title}
                        </h3>
                        <p className="text-sm" style={{ color: palette.deepBlue }}>
                          {test.subtitle || "Refine tone, register, and precision."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm" style={{ color: palette.deepBlue }}>
                      <span>Items: {Object.keys(test.correctAnswers).length}</span>
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
            {showCodeModal && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-2xl w-80 max-w-xs space-y-3"
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 10 }}
                  style={{ border: `1px solid ${palette.border}` }}
                >
                  <h2
                    className="text-xl font-bold flex items-center gap-2"
                    style={{ color: palette.navy, fontFamily: serif }}
                  >
                    Set {modalLevel + 1} locked
                  </h2>
                  <p className="text-sm" style={{ color: palette.deepBlue }}>
                    Enter the access code to open this set.
                  </p>
                  <input
                    type="text"
                    value={unlockCode}
                    onChange={e => setUnlockCode(e.target.value)}
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
                      if (unlockCode === testsData.tests[modalLevel].prerequisiteCode) {
                        setExamUnlocked(prev => ({ ...prev, [modalLevel]: true }));
                        setUnlocked(prev => ({ ...prev, [modalLevel]: true }));
                        setShowCodeModal(false);
                        setUnlockCode("");
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
                    onClick={() => setShowCodeModal(false)}
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

  // Quiz logic
  const test = testsData.tests[selectedTest];
  const blanks = test.segments.filter(seg => typeof seg !== "string");
  const total = blanks.length;

  const handleChange = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }));

  const handleSubmit = () => {
    let correctCount = 0;
    blanks.forEach(({ id }) => {
      const ans = test.correctAnswers[id];
      if (answers[id]?.trim().toLowerCase() === ans.trim().toLowerCase()) correctCount++;
    });
    setScore(correctCount);
    setFeedback(correctCount === total ? "correct" : "incorrect");
    setSubmitted(true);
  };

  const nextIndex = selectedTest + 1;

  if (!submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center py-10 px-4"
        style={{
          background: `linear-gradient(160deg, ${palette.navy}, ${palette.deepBlue})`,
          fontFamily: sans
        }}
      >
        <div className="w-full max-w-3xl space-y-6">
          <div className="flex items-center justify-between">
            <button onClick={resetQuiz} className="text-sm font-semibold" style={{ color: palette.sky }}>
              Back to menu
            </button>
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ background: palette.sky, color: palette.navy, border: `1px solid ${palette.border}` }}
            >
              {isPractice ? "Practice" : "Exam"} – Set {selectedTest + 1}
            </div>
          </div>

          <div
            className="rounded-3xl p-8 space-y-6 shadow-2xl"
            style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: palette.gold }}>
                  Use of English
                </p>
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: palette.navy, fontFamily: serif }}
                >
                  {test.title}
                </h2>
                <p className="text-sm" style={{ color: palette.deepBlue }}>
                  {test.subtitle || "Type the exact word that best completes each gap."}
                </p>
              </div>
              {!isPractice && (
                <div
                  className="px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                  style={{
                    background: palette.sky,
                    color: palette.navy,
                    border: `1px solid ${palette.border}`
                  }}
                >
                  <span>Time</span>
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{ background: "#fff", color: palette.navy, border: `1px solid ${palette.border}` }}
                  >
                    {timeLeft}s
                  </span>
                </div>
              )}
            </div>

            <AnimatePresence>
              {feedback === "correct" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-xl text-center font-semibold"
                  style={{ background: "#e6f5ee", color: palette.success, border: `1px solid ${palette.border}` }}
                >
                  Excellent pace. Keep it going.
                </motion.div>
              )}
              {feedback === "incorrect" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-xl text-center font-semibold"
                  style={{ background: "#ffecec", color: palette.danger, border: `1px solid ${palette.border}` }}
                >
                  Review the gaps and adjust.
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="p-4 md:p-5 rounded-2xl"
              style={{ background: "#fff", border: `1px solid ${palette.border}` }}
            >
              <p className="text-base leading-relaxed" style={{ color: palette.deepBlue }}>
                {test.segments.map((seg, idx) =>
                  typeof seg === "string" ? (
                    seg.split("\n").map((line, i, arr) => (
                      <Fragment key={`${idx}-${i}`}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </Fragment>
                    ))
                  ) : (
                    <input
                      key={idx}
                      type="text"
                      placeholder="Type your answer"
                      value={answers[seg.id] || ""}
                      onChange={e => handleChange(seg.id, e.target.value)}
                      className="mx-1 px-3 py-2 rounded-xl text-sm md:text-base focus:outline-none"
                      style={{
                        border: `2px solid ${palette.border}`,
                        background: "#fff",
                        color: palette.navy
                      }}
                    />
                  )
                )}
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < total}
              className="w-full py-3 rounded-full font-semibold transition-colors"
              style={{
                background: Object.keys(answers).length < total ? "#d8d8d8" : palette.gold,
                color: Object.keys(answers).length < total ? "#6b7280" : palette.navy,
                cursor: Object.keys(answers).length < total ? "not-allowed" : "pointer",
                boxShadow: Object.keys(answers).length < total ? "none" : "0 12px 32px rgba(198,162,74,0.35)"
              }}
            >
              Submit answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results view
  const perfect = score === total;
  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{
        background: `linear-gradient(160deg, ${palette.navy}, ${palette.deepBlue})`,
        fontFamily: sans
      }}
    >
      <div className="w-full max-w-3xl space-y-6">
        <button onClick={resetQuiz} className="text-sm font-semibold" style={{ color: palette.sky }}>
          Back to menu
        </button>

        <div
          className="w-full rounded-3xl p-8 space-y-6 shadow-2xl"
          style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-2xl font-bold"
              style={{ color: palette.navy, fontFamily: serif }}
            >
              Score
            </h2>
            <div
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: palette.sky,
                color: palette.navy,
                border: `1px solid ${palette.border}`
              }}
            >
              {score} / {total}
            </div>
          </div>

          {perfect && !isPractice && nextIndex < testsData.tests.length && (
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
              <p className="text-2xl font-bold tracking-wide">{testsData.tests[nextIndex].prerequisiteCode}</p>
              <p className="text-sm opacity-90">
                En modo examen necesitas este código (prerequisiteCode) en el menú para abrir el siguiente set.
              </p>
              <button
                onClick={resetQuiz}
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

          {perfect && isPractice && nextIndex < testsData.tests.length && (
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
                  setSelectedTest(nextIndex);
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                  setFeedback(null);
                  setUnlockCode("");
                }}
                className="mt-3 px-6 py-3 rounded-full font-semibold"
                style={{
                  background: palette.navy,
                  color: "#fff",
                  border: `1px solid ${palette.border}`
                }}
              >
                Next practice set
              </button>
            </motion.div>
          )}

          {!perfect && (
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3 rounded-full font-semibold"
              style={{ background: "#d8d8d8", color: "#1f2937" }}
            >
              Try again
            </button>
          )}

          {perfect && nextIndex >= testsData.tests.length && (
            <p className="text-center font-semibold" style={{ color: palette.success }}>
              All sets completed. Well done.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
