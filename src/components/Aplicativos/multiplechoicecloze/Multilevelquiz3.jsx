import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import levelsData from "../data/levelsExercises3.json";

// Modern, warm palette and typography
const palette = {
  navy: "#0f1f30",
  deepBlue: "#2b4157",
  gold: "#f2b76b",
  sky: "#e6eef7",
  porcelain: "#fdfbf7",
  surfaceAlt: "#ffffff",
  border: "#e5e9f0",
  muted: "#43556b",
  accent: "#2bb6a8",
  success: "#138a63",
  danger: "#d14343"
};
const serif = "var(--font-grotesk), 'Sora', 'Arial', sans-serif";
const sans = "var(--font-sora), 'Sora', 'Arial', sans-serif";
const logoUrl = "https://i.ibb.co/C3kRtYQG/zxczx-2-1.png";
const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@myenglishbro" },
  { label: "TikTok", href: "https://www.tiktok.com/@myenglishbro" },
  { label: "Instagram", href: "https://www.instagram.com/myenglishbro" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/myenglishbro" }
];

const Watermark = () => (
  <img
    src={logoUrl}
    alt=""
    aria-hidden="true"
    className="pointer-events-none select-none absolute -right-10 -bottom-6 w-[260px] md:w-[360px]"
    style={{ opacity: 0.05, filter: "grayscale(1)" }}
  />
);

const FooterBrand = () => (
  <div className="w-full mt-10 pb-8 flex flex-col items-center gap-4">
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]" style={{ color: palette.muted }}>
      <span>Powered by</span>
      <img src={logoUrl} alt="MyEnglishBro logo" className="h-6 w-auto" />
    </div>
    <div className="flex flex-wrap items-center justify-center gap-2">
      {socialLinks.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full text-xs font-semibold"
          style={{
            color: palette.navy,
            border: `1px solid ${palette.border}`,
            background: palette.surfaceAlt
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
);

export default function MultiLevelQuiz3() {
  const levels = levelsData.levels;

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showWrongMessage, setShowWrongMessage] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const unlocked = levels.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {});
  const totalLevels = levels.length;
  const totalItems = levels.reduce((acc, level) => acc + level.exercises.length, 0);

  // Reset quiz when level changes
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setAnswersLog([]);
    setQuizFinished(false);
  }, [selectedLevel]);

  function handleSubmitAnswer() {
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
    setShowCorrectMessage(false);
    setShowWrongMessage(false);
    setActiveIndex(0);
  };

  // Intro screen
  if (showIntro) {
    return (
      <div
        className="min-h-screen flex items-center justify-center py-12 px-5 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(43,182,168,0.18), transparent 45%), radial-gradient(circle at 85% 10%, rgba(246,194,114,0.18), transparent 35%), linear-gradient(145deg, #f6f2eb 0%, #eef3f8 55%, #f7f2ea 100%)",
          fontFamily: sans
        }}
      >
        <Watermark />
        <div
          className="w-full max-w-5xl rounded-[32px] p-8 md:p-12 space-y-8 shadow-2xl"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.98))",
            border: `1px solid ${palette.border}`,
            boxShadow: "0 35px 90px rgba(12,19,42,0.12)"
          }}
        >
          <div className="space-y-3">
            <img
              src={logoUrl}
              alt="MyEnglishBro logo"
              className="h-10 md:h-12 w-auto"
              style={{ filter: "drop-shadow(0 8px 18px rgba(12,19,42,0.12))" }}
            />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: palette.accent }}>
              Part 1 - Multiple Choice Cloze
            </p>
            <h1
              className="text-3xl md:text-5xl font-semibold leading-tight"
              style={{ color: palette.navy, fontFamily: serif }}
            >
              B2 First - Reading & Use of English
            </h1>
            <p className="text-base md:text-lg" style={{ color: palette.muted }}>
              Choose the exact word or phrase that fits each gap. Expect close meanings, collocations, and grammatical
              patterns.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "8 gaps per set",
                `${totalLevels} levels`,
                `${totalItems} total items`,
                "Multiple choice cloze"
              ].map(chip => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: palette.sky,
                    color: palette.deepBlue,
                    border: `1px solid ${palette.border}`
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base" style={{ color: palette.muted }}>
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
            <p className="text-sm md:text-base" style={{ color: palette.muted }}>
              All sets are available. Start wherever you want and track your progress as you go.
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
          <FooterBrand />
        </div>
      </div>
    );
  }

  // Level selection
  if (selectedLevel === null) {
    return (
      <div
        className="min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(43,182,168,0.18), transparent 40%), radial-gradient(circle at 85% 10%, rgba(242,183,107,0.18), transparent 35%), linear-gradient(150deg, #f6f2eb 0%, #eef3f8 55%, #f7f2ea 100%)",
          fontFamily: sans
        }}
      >
        <Watermark />
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
                <img
                  src={logoUrl}
                  alt="MyEnglishBro logo"
                  className="h-8 md:h-10 w-auto mb-4"
                  style={{ filter: "drop-shadow(0 8px 18px rgba(12,19,42,0.12))" }}
                />
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
                <p className="text-base md:text-lg" style={{ color: palette.muted }}>
                  Pick a level and jump in. Everything is unlocked for you.
                </p>
              </div>
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
              {[
                { label: "Levels", value: totalLevels },
                { label: "Total items", value: totalItems },
                { label: "Unlocked", value: totalLevels }
              ].map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl px-4 py-3 flex items-center justify-between"
                  style={{
                    background: palette.surfaceAlt,
                    border: `1px solid ${palette.border}`,
                    color: palette.deepBlue
                  }}
                >
                  <span>{stat.label}</span>
                  <span className="text-base font-semibold" style={{ color: palette.navy }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-3xl mx-auto h-[360px] md:h-[420px]">
            {levels
              .map((lvl, idx) => ({ lvl, idx }))
              .filter(({ idx }) => idx >= activeIndex && idx <= activeIndex + 2)
              .reverse()
              .map(({ lvl, idx }) => {
                const offset = idx - activeIndex;
                const isActive = offset === 0;
                const isUnlocked = !!unlocked[idx];
                return (
                  <motion.div
                    key={idx}
                    animate={{
                      x: 0,
                      y: offset * 16,
                      scale: 1 - offset * 0.04,
                      opacity: 1 - offset * 0.2
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 26 }}
                    className="absolute left-0 right-0 cursor-pointer rounded-2xl p-[1px]"
                    style={{
                      top: 0,
                      background: `linear-gradient(140deg, ${palette.gold}, ${palette.accent})`,
                      boxShadow: "0 18px 50px rgba(12,19,42,0.18)",
                      pointerEvents: isActive ? "auto" : "none"
                    }}
                  >
                    <div
                      className="h-full rounded-2xl bg-white p-6 md:p-8 flex flex-col gap-5"
                      style={{
                        background: palette.porcelain,
                        border: `1px solid ${palette.border}`
                      }}
                    >
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${palette.gold}, ${palette.accent})`
                        }}
                      />
                      <div className="flex items-center justify-between">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
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
                            background: palette.sky,
                            color: palette.navy,
                            border: `1px solid ${palette.border}`
                          }}
                        >
                          Available
                        </span>
                      </div>

                      <div className="flex items-start gap-4 md:gap-5">
                        <img
                          src={lvl.thumbnail}
                          alt={`Level ${lvl.level}`}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border"
                          style={{ borderColor: palette.border }}
                        />
                        <div className="flex-1">
                          <p className="text-sm uppercase tracking-[0.16em] text-slate-500 mb-2">Level {lvl.level}</p>
                          <h3
                            className="text-2xl md:text-3xl font-semibold"
                            style={{ color: palette.navy, fontFamily: serif }}
                          >
                            {lvl.title || "Cambridge Drill"}
                          </h3>
                          <p
                            className="text-base md:text-lg"
                            style={{
                              color: palette.muted,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              minHeight: "2.8em"
                            }}
                          >
                            {lvl.summary || "Refine precision, tone, and grammar control."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm md:text-base" style={{ color: palette.muted }}>
                        <span>Items: {lvl.exercises.length}</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (isActive && isUnlocked) setSelectedLevel(idx);
                          }}
                          className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold"
                          style={{
                            background: palette.navy,
                            color: "#fff"
                          }}
                        >
                          Start level
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            <button
              type="button"
              onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className="absolute -left-4 md:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold"
              style={{
                background: "#fff",
                color: palette.navy,
                border: `1px solid ${palette.border}`,
                boxShadow: "0 10px 24px rgba(12,19,42,0.12)",
                opacity: activeIndex === 0 ? 0.4 : 1,
                cursor: activeIndex === 0 ? "not-allowed" : "pointer"
              }}
              aria-label="Previous level"
            >
              &#x2039;
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex(prev => Math.min(levels.length - 1, prev + 1))}
              disabled={activeIndex >= levels.length - 1}
              className="absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold"
              style={{
                background: "#fff",
                color: palette.navy,
                border: `1px solid ${palette.border}`,
                boxShadow: "0 10px 24px rgba(12,19,42,0.12)",
                opacity: activeIndex >= levels.length - 1 ? 0.4 : 1,
                cursor: activeIndex >= levels.length - 1 ? "not-allowed" : "pointer"
              }}
              aria-label="Next level"
            >
              &#x203A;
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em]" style={{ color: palette.muted }}>
            <span>Use arrows to browse</span>
          </div>
          <FooterBrand />
        </div>
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
        className="min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(43,182,168,0.18), transparent 40%), linear-gradient(150deg, #f6f2eb 0%, #eef3f8 55%, #f7f2ea 100%)",
          fontFamily: sans
        }}
      >
        <Watermark />
        <div className="w-full max-w-3xl space-y-6">
          <div className="flex justify-between items-center">
            <button
              onClick={resetAll}
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{ color: palette.muted, background: palette.surfaceAlt, border: `1px solid ${palette.border}` }}
            >
              Back to menu
            </button>
            <div className="text-xs uppercase tracking-[0.18em]" style={{ color: palette.gold }}>
              Level {level.level}
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

            <div className="rounded-2xl p-4" style={{ background: palette.surfaceAlt, border: `1px solid ${palette.border}` }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: palette.muted }}>
                Correct answers
              </h3>
              <ul className="mt-3 list-decimal list-inside text-sm md:text-base space-y-2" style={{ color: palette.muted }}>
                {answersLog.map((e, i) => (
                  <li key={`${e.prompt}-${i}`}>
                    <span style={{ color: palette.navy, fontWeight: 600 }}>{e.prompt}</span>{" "}
                    →{" "}
                    <span style={{ color: palette.deepBlue }}>{e.answer}</span>
                  </li>
                ))}
              </ul>
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

            

                        {allCorrect && selectedLevel + 1 < levels.length && (
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
                  Great job
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
                  Next level
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
        <FooterBrand />
      </div>
    );
  }

  // QUIZ INTERFACE
  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, rgba(43,182,168,0.18), transparent 40%), linear-gradient(150deg, #f6f2eb 0%, #eef3f8 55%, #f7f2ea 100%)",
        fontFamily: sans
      }}
    >
      <Watermark />
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
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ color: palette.muted, background: palette.surfaceAlt, border: `1px solid ${palette.border}` }}
          >
            Back to menu
          </button>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold"
            style={{
              background: palette.sky,
              border: `1px solid ${palette.border}`,
              color: palette.navy
            }}
          >
            <span>Level {level.level}</span>
          </div>
        </div>

        <div
          className="rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
          style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: palette.accent }}>
                Level {level.level}
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: palette.navy, fontFamily: serif }}
              >
                Precision Checkpoint
              </h2>
            </div>
            <div className="text-sm font-semibold" style={{ color: palette.muted }}>
              Item {currentQuestion + 1} / {exercises.length}
            </div>
          </div>

          <div className="w-full h-2 rounded-full" style={{ background: palette.sky }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${palette.accent}, ${palette.gold})`
              }}
            />
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-lg md:text-xl font-semibold mb-4" style={{ color: palette.muted }}>
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
                background: selectedOption ? palette.navy : "#d8d8d8",
                color: selectedOption ? "#fff" : "#6b7280",
                cursor: selectedOption ? "pointer" : "not-allowed",
                boxShadow: selectedOption ? "0 12px 30px rgba(12,19,42,0.2)" : "none"
              }}
            >
              Submit answer
            </button>
          </div>
        </div>
      </div>
      <FooterBrand />
    </div>
  );
}
