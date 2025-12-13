import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import testsData from "../data/testsData.json";

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

export default function UseOfEnglishInline() {
  const [unlocked, setUnlocked] = useState({ 0: true });
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [unlockCode, setUnlockCode] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [modalLevel, setModalLevel] = useState(null);
  const [showMsg, setShowMsg] = useState(null);

  const total = selectedTest !== null ? Object.keys(testsData.tests[selectedTest].options).length : 0;

  // Level selection
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
            className="rounded-3xl p-8 md:p-10 mb-10 shadow-2xl"
            style={{
              background: palette.porcelain,
              border: `1px solid ${palette.border}`,
              boxShadow: "0 30px 80px rgba(12,19,42,0.22)"
            }}
          >
            <p
              className="uppercase tracking-[0.25em] text-xs font-semibold mb-4"
              style={{ color: palette.gold, fontFamily: serif }}
            >
              Cambridge Grammar Studio
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: palette.navy, fontFamily: serif }}
            >
              Use of English – Inline Transformations
            </h1>
            <p className="text-base md:text-lg" style={{ color: palette.deepBlue }}>
              Navigate each passage, choose the exact fit for every gap, and unlock the next dossier with flawless work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testsData.tests.map((test, idx) => {
              const isUnlocked = !!unlocked[idx];
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
                          background: isUnlocked ? palette.sky : "#f1f1f1",
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
                        src={test.thumbnail}
                        alt={test.title}
                        className="w-14 h-14 rounded-xl object-cover border"
                        style={{ borderColor: palette.border }}
                      />
                      <div className="flex-1">
                        <p className="text-sm uppercase tracking-[0.12em] text-slate-500 mb-1">Set {idx + 1}</p>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: palette.navy, fontFamily: serif }}
                        >
                          {test.title}
                        </h3>
                        <p className="text-sm" style={{ color: palette.deepBlue }}>
                          {test.subtitle || "Polish precision, tone, and register control."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm" style={{ color: palette.deepBlue }}>
                      <span>Items: {Object.keys(test.options).length}</span>
                      <span>{isUnlocked ? "Begin practice" : "Enter code"}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

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

  const reset = () => {
    setSelectedTest(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowMsg(null);
    setUnlockCode("");
  };
  const nextIndex = selectedTest + 1;

  // Before submit
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
            <button onClick={reset} className="text-sm font-semibold" style={{ color: palette.sky }}>
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
              <p className="text-sm" style={{ color: palette.deepBlue }}>
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
              <p className="text-base leading-relaxed" style={{ color: palette.deepBlue }}>
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

  // Results and next
  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{
        background: `linear-gradient(160deg, ${palette.navy}, ${palette.deepBlue})`,
        fontFamily: sans
      }}
    >
      <div className="w-full max-w-3xl space-y-6">
        <button onClick={reset} className="text-sm font-semibold" style={{ color: palette.sky }}>
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

          <div className="space-y-3">
            <h3 className="font-semibold" style={{ color: palette.deepBlue }}>
              Explanations
            </h3>
            <ul className="list-decimal list-inside text-sm md:text-base space-y-2" style={{ color: palette.deepBlue }}>
              {Object.entries(test.explanations).map(([key, txt]) => (
                <li key={key}>{txt}</li>
              ))}
            </ul>
          </div>

          {score === total && nextIndex < testsData.tests.length && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-2xl text-center"
              style={{
                background: `linear-gradient(135deg, ${palette.navy}, ${palette.deepBlue})`,
                color: "#fff",
                border: `1px solid ${palette.border}`,
                boxShadow: "0 16px 44px rgba(12,19,42,0.28)"
              }}
            >
              <p className="text-lg font-semibold" style={{ fontFamily: serif }}>
                Access code unlocked
              </p>
              <p className="text-2xl font-bold tracking-wide mt-2">{testsData.tests[nextIndex].prerequisiteCode}</p>
              <button
                onClick={() => {
                  setUnlocked(prev => ({ ...prev, [nextIndex]: true }));
                  setSelectedTest(nextIndex);
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                  setShowMsg(null);
                  setUnlockCode("");
                }}
                className="mt-4 px-6 py-3 rounded-full font-semibold"
                style={{
                  background: "#fff",
                  color: palette.navy,
                  border: `1px solid ${palette.border}`
                }}
              >
                Continue to next set
              </button>
            </motion.div>
          )}

          {score !== total && (
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3 rounded-full font-semibold"
              style={{ background: "#d8d8d8", color: "#1f2937" }}
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
