import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import testsData from "../data/testsData.json";

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
  { label: "YouTube", href: "https://www.youtube.com/@_myenglishbro" },
  { label: "TikTok", href: "https://www.tiktok.com/@myenglishbro" },
  { label: "Instagram", href: "https://www.instagram.com/_myenglishbro" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/carlosapolaya/" }
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

export default function UseOfEnglishInline() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showMsg, setShowMsg] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const unlocked = testsData.tests.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {});

  const total = selectedTest !== null ? Object.keys(testsData.tests[selectedTest].options).length : 0;
  const answeredCount = Object.keys(answers).length;
  const progressPct = total ? Math.round((answeredCount / total) * 100) : 0;
  const totalSets = testsData.tests.length;
  const totalItems = testsData.tests.reduce((acc, test) => acc + Object.keys(test.options).length, 0);

  const resetAll = () => {
    setSelectedTest(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowMsg(null);
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
              Part 1 - Multiple Choice Cloze 2025
            </p>
            <h1
              className="text-3xl md:text-5xl font-semibold leading-tight"
              style={{ color: palette.navy, fontFamily: serif }}
            >
              B2 First - Reading & Use of English
            </h1>
            <p className="text-base md:text-lg" style={{ color: palette.muted }}>
              Choose the precise option for each gap. Expect close-meaning distractors, collocations, and grammar
              patterns.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "8 gaps per set",
                `${totalSets} sets`,
                `${totalItems} total items`,
                "Cambridge style"
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
            <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
              {[
                { label: "Sets", value: totalSets },
                { label: "Total items", value: totalItems },
                { label: "Unlocked", value: totalSets }
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

          <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base" style={{ color: palette.muted }}>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                Overview
              </h3>
              <p>8 gaps; 1 point each. Tests vocabulary nuance and grammar in context across the Reading & Use of English paper.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                How to Approach
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Watch prepositions/adverbs/verb forms around the gap.</li>
                <li>Think in phrases and collocations, not isolated words.</li>
                <li>Read the whole sentence before locking your choice.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                Assessment Focus
              </h3>
              <p>Lexical nuance, collocations, phrasal verbs, register, and grammatical patterns within sentences and passages.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
                Tips
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Drill common collocations and phrasal verbs.</li>
                <li>Dissect sentences to see how each word shapes meaning.</li>
                <li>Read varied texts and note author word choices for nuance.</li>
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
  if (selectedTest === null) {
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
                  Use of English - Multiple Choice Cloze
                </h1>
                <p className="text-base md:text-lg" style={{ color: palette.muted }}>
                  Pick a set and jump in. Everything is unlocked for you.
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-3xl mx-auto h-[360px] md:h-[420px]">
            {testsData.tests
              .map((test, idx) => ({ test, idx }))
              .filter(({ idx }) => idx >= activeIndex && idx <= activeIndex + 2)
              .reverse()
              .map(({ test, idx }) => {
                const offset = idx - activeIndex;
                const isActive = offset === 0;
                const isUnlocked = !!unlocked[idx];
                return (
                  <motion.div
                    key={test.id}
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
                        <div
                          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
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
                          <p className="text-sm uppercase tracking-[0.16em] text-slate-500 mb-2">Set {idx + 1}</p>
                          <h3
                            className="text-2xl md:text-3xl font-semibold"
                            style={{ color: palette.navy, fontFamily: serif }}
                          >
                            {test.title}
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
                            {test.subtitle || "Lexical nuance and collocation drill."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm md:text-base" style={{ color: palette.muted }}>
                        <span>Items: {Object.keys(test.options).length}</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (isActive && isUnlocked) setSelectedTest(idx);
                          }}
                          className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold"
                          style={{
                            background: palette.navy,
                            color: "#fff"
                          }}
                        >
                          Start set
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
              aria-label="Previous set"
            >
              &#x2039;
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex(prev => Math.min(testsData.tests.length - 1, prev + 1))}
              disabled={activeIndex >= testsData.tests.length - 1}
              className="absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold"
              style={{
                background: "#fff",
                color: palette.navy,
                border: `1px solid ${palette.border}`,
                boxShadow: "0 10px 24px rgba(12,19,42,0.12)",
                opacity: activeIndex >= testsData.tests.length - 1 ? 0.4 : 1,
                cursor: activeIndex >= testsData.tests.length - 1 ? "not-allowed" : "pointer"
              }}
              aria-label="Next set"
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

  // Quiz logic
  const test = testsData.tests[selectedTest];
  const handleChange = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));

  const handleSubmit = () => {
    let correct = 0;
    Object.entries(test.correctAnswers).forEach(([id, ans]) => {
      if (answers[id]?.trim().toLowerCase() === ans.trim().toLowerCase()) correct++;
    });
    setScore(correct);
    setShowMsg(correct === total ? "correct" : "incorrect");
    setSubmitted(true);
    setTimeout(() => setShowMsg(null), 1400);
  };

  const nextIndex = selectedTest + 1;

  // Before submit
  if (!submitted) {
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
          <div className="flex items-center justify-between">
            <button
              onClick={resetAll}
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{ color: palette.muted, background: palette.surfaceAlt, border: `1px solid ${palette.border}` }}
            >
              Back to menu
            </button>
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ background: palette.sky, color: palette.navy, border: `1px solid ${palette.border}` }}
            >
              Set {selectedTest + 1}
            </div>
          </div>

          <div
            className="rounded-3xl p-8 space-y-6 shadow-2xl"
            style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: palette.gold }}>
                Use of English
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: palette.navy, fontFamily: serif }}
              >
                {test.title}
              </h2>
              <p className="text-sm" style={{ color: palette.muted }}>
                {test.subtitle || "Select the option that best fits each gap."}
              </p>
            </div>

            <AnimatePresence>
              {showMsg === "correct" && (
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
              {showMsg === "incorrect" && (
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
              <p className="text-base leading-relaxed" style={{ color: palette.muted }}>
                {test.segments.map((seg, idx) =>
                  typeof seg === "string" ? (
                    <span key={idx}>{seg}</span>
                  ) : (
                    <select
                      key={idx}
                      value={answers[seg.id] || ""}
                      onChange={e => handleChange(seg.id, e.target.value)}
                      className="mx-1 px-3 py-2 rounded-xl text-sm md:text-base focus:outline-none"
                      style={{
                        border: `2px solid ${palette.border}`,
                        background: "#fff",
                        color: palette.navy
                      }}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {test.options[seg.id].map(o => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  )
                )}
              </p>
            </div>

            <div className="rounded-2xl p-4" style={{ background: palette.surfaceAlt, border: `1px solid ${palette.border}` }}>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                <span style={{ color: palette.muted }}>Progress</span>
                <span style={{ color: palette.navy }}>
                  {answeredCount} / {total}
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full" style={{ background: palette.sky }}>
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${progressPct}%`,
                    background: `linear-gradient(90deg, ${palette.accent}, ${palette.gold})`
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={answeredCount < total}
              className="w-full py-3 rounded-full font-semibold transition-colors"
              style={{
                background: answeredCount < total ? "#d8d8d8" : palette.navy,
                color: answeredCount < total ? "#6b7280" : "#fff",
                cursor: answeredCount < total ? "not-allowed" : "pointer",
                boxShadow: answeredCount < total ? "none" : "0 12px 30px rgba(12,19,42,0.2)"
              }}
            >
              Submit answers
            </button>
          </div>
        </div>
        <FooterBrand />
      </div>
    );
  }

  // Results and next
  const perfect = score === total;
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
        <button
          onClick={resetAll}
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{ color: palette.muted, background: palette.surfaceAlt, border: `1px solid ${palette.border}` }}
        >
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

          <div className="rounded-2xl p-4" style={{ background: palette.surfaceAlt, border: `1px solid ${palette.border}` }}>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
              <span style={{ color: palette.muted }}>Score</span>
              <span style={{ color: palette.navy }}>{total ? Math.round((score / total) * 100) : 0}%</span>
            </div>
            <div className="mt-3 h-2 rounded-full" style={{ background: palette.sky }}>
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${total ? Math.round((score / total) * 100) : 0}%`,
                  background: perfect
                    ? `linear-gradient(90deg, ${palette.accent}, ${palette.gold})`
                    : `linear-gradient(90deg, ${palette.danger}, ${palette.gold})`
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold" style={{ color: palette.muted }}>
              Explanations
            </h3>
            <ul className="list-decimal list-inside text-sm md:text-base space-y-2" style={{ color: palette.muted }}>
              {Object.entries(test.explanations).map(([key, txt]) => (
                <li key={key}>{txt}</li>
              ))}
            </ul>
          </div>

          {perfect && nextIndex < testsData.tests.length && (
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
                  setSelectedTest(nextIndex);
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                  setShowMsg(null);
                }}
                className="mt-3 px-6 py-3 rounded-full font-semibold"
                style={{
                  background: palette.navy,
                  color: "#fff",
                  border: `1px solid ${palette.border}`
                }}
              >
                Next set
              </button>
            </motion.div>
          )}

          {!perfect && (
            <button
              onClick={() => {
                setSubmitted(false);
                setScore(0);
                setShowMsg(null);
              }}
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
      <FooterBrand />
    </div>
  );
}
