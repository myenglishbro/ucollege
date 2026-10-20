import React, { useEffect, useMemo, useRef, useState } from "react";
import exercisesData from "./data/keywordExercises.json";
import {
  palette,
  sans,
  serif,
  sheetShadow,
  formatTime,
  readBest,
  writeBest,
  ExamBar,
  PartPill,
  FooterBrand,
  ScoreRing
} from "../shared/examUi";

const STORAGE_KEY = "uoe4-best-scores";
const MAX_WORDS = 5;

// Compare answers the way an examiner would: ignore case, spacing, final punctuation and contraction style
const normalise = value =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.!?,;]+$/g, "")
    .replace(/\bcan't\b/g, "cannot")
    .replace(/\bcan not\b/g, "cannot")
    .replace(/\bwon't\b/g, "will not")
    .replace(/n't\b/g, " not")
    .replace(/'m\b/g, " am")
    .replace(/'re\b/g, " are")
    .replace(/'ve\b/g, " have")
    .replace(/'ll\b/g, " will")
    .replace(/'d rather\b/g, " would rather")
    .replace(/\s+/g, " ")
    .trim();

const wordCount = value => (value.trim() ? value.trim().split(/\s+/).length : 0);

const isCorrect = (q, value) => {
  const typed = normalise(value);
  return !!typed && [q.answer, ...(q.alternatives || [])].some(a => normalise(a) === typed);
};

// The second sentence with the gap filled by `middle`
const Sentence = ({ q, middle, style }) => (
  <span style={style}>
    {q.lead && <span>{q.lead} </span>}
    {middle}
    {q.tail && <span>{/^[.,;:!?]/.test(q.tail) ? "" : " "}{q.tail}</span>}
  </span>
);

const KeywordBox = ({ children }) => (
  <span
    className="inline-block px-4 py-1.5 font-bold tracking-[0.16em] rounded-sm"
    style={{ fontFamily: sans, fontSize: "0.9rem", border: `1.5px solid ${palette.ink}`, color: palette.ink, background: palette.tint }}
  >
    {children}
  </span>
);

// ---------- Test selection ----------
function SetList({ levels, best, onStart }) {
  const done = levels.filter(l => best[l.level] !== undefined).length;
  return (
    <div className="min-h-screen" style={{ background: palette.page, fontFamily: sans }}>
      <ExamBar right={<span className="text-xs" style={{ opacity: 0.85 }}>{done} of {levels.length} completed</span>} />

      <section
        style={{
          background: `radial-gradient(circle at 85% 20%, rgba(200,16,46,0.28), transparent 45%), linear-gradient(135deg, ${palette.navy}, ${palette.navySoft})`,
          color: "#fff"
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#ff9aa8" }}>
            Part 4 · Key word transformation
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight" style={{ fontFamily: serif }}>
            Reading and Use of English
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base" style={{ opacity: 0.8 }}>
            Complete the second sentence so that it means the same as the first, using the word given. Do not change
            the word given. Use between two and five words, including the word given.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs">
            {[`${levels.length} tests`, "8 questions each", "Model answers & grammar tips"].map(chip => (
              <span
                key={chip}
                className="px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 -mt-6 pb-4 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {levels.map((level, idx) => {
            const total = level.questions.length;
            const score = best[level.level];
            const perfect = score === total;
            return (
              <button
                key={level.level}
                type="button"
                onClick={() => onStart(idx)}
                className="group text-left rounded-xl p-5 flex flex-col gap-4 transition-all hover:-translate-y-0.5"
                style={{ background: palette.paper, boxShadow: sheetShadow, border: `1px solid ${palette.hair}` }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl font-semibold leading-none" style={{ fontFamily: serif, color: palette.navy }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {score !== undefined ? (
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: perfect ? palette.successBg : palette.select,
                        color: perfect ? palette.success : palette.selectBorder
                      }}
                    >
                      {perfect ? "✓ " : ""}Best {score}/{total}
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: palette.tint, color: palette.muted }}>
                      New
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: palette.ink }}>
                    Transformation {idx + 1}
                  </h2>
                  <p className="text-xs mt-1" style={{ color: palette.muted }}>
                    Part 4 · {total} questions
                  </p>
                </div>
                <span
                  className="mt-auto text-sm font-semibold flex items-center gap-1 transition-all group-hover:gap-2"
                  style={{ color: palette.selectBorder }}
                >
                  {score !== undefined ? "Practise again" : "Start test"} <span aria-hidden>→</span>
                </span>
              </button>
            );
          })}
        </div>
        <FooterBrand />
      </main>
    </div>
  );
}

// ---------- Exam ----------
function Exam({ levels, index, best, onExit, onNext, onFinish }) {
  const level = levels[index];
  const questions = level.questions;
  const total = questions.length;
  const ids = useMemo(() => questions.map(q => q.id), [questions]);

  const [answers, setAnswers] = useState({});
  const [active, setActive] = useState(ids[0]);
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const inputRefs = useRef({});

  // A new test starts clean
  useEffect(() => {
    setAnswers({});
    setActive(ids[0]);
    setSubmitted(false);
    setElapsed(0);
    window.scrollTo(0, 0);
  }, [ids]);

  useEffect(() => {
    if (submitted) return undefined;
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [submitted, ids]);

  const numberOf = id => ids.indexOf(id) + 1;
  const answeredCount = ids.filter(id => (answers[id] || "").trim()).length;
  const score = questions.filter(q => isCorrect(q, answers[q.id])).length;

  const focusQuestion = id => {
    inputRefs.current[id]?.focus();
    inputRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const submit = () => {
    setSubmitted(true);
    onFinish(level.level, score);
    window.scrollTo(0, 0);
  };
  const retry = () => {
    setAnswers({});
    setActive(ids[0]);
    setSubmitted(false);
    setElapsed(0);
    window.scrollTo(0, 0);
  };

  const onKeyDown = (e, id) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const next = ids[ids.indexOf(id) + 1];
    if (next !== undefined) focusQuestion(next);
    else e.target.blur();
  };

  const exitButton = (
    <button
      type="button"
      onClick={onExit}
      className="text-xs font-semibold px-3 py-1.5 rounded-md"
      style={{ border: "1px solid rgba(255,255,255,0.35)" }}
    >
      Exit
    </button>
  );
  const timer = (
    <span
      className="text-sm font-semibold tabular-nums px-3 py-1 rounded-md"
      style={{ background: "rgba(255,255,255,0.12)" }}
      aria-label="Elapsed time"
    >
      ⏱ {formatTime(elapsed)}
    </span>
  );

  // ===== Results =====
  if (submitted) {
    const pct = Math.round((score / total) * 100);
    const perfect = score === total;
    const message = perfect
      ? "Perfect score. Every transformation is correct."
      : pct >= 75
      ? "Strong result. Check the few you missed."
      : pct >= 50
      ? "Getting there. Read the model answers and try again."
      : "Keep practising. Study the model answers, then retry.";
    const hasNext = index + 1 < levels.length;

    return (
      <div className="min-h-screen" style={{ background: palette.page, fontFamily: sans }}>
        <ExamBar left={<PartPill>Part 4</PartPill>} right={<>{timer}{exitButton}</>} />

        <section style={{ background: `linear-gradient(135deg, ${palette.navy}, ${palette.navySoft})`, color: "#fff" }}>
          <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center gap-6">
            <ScoreRing pct={pct} score={score} total={total} good={pct >= 60} />
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#ff9aa8" }}>
                Results · Transformation {index + 1}
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-semibold" style={{ fontFamily: serif }}>
                {pct}% correct · {formatTime(elapsed)}
              </h1>
              <p className="mt-2 text-sm md:text-base" style={{ opacity: 0.85 }}>
                {message}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Result per question">
                {questions.map(q => (
                  <span
                    key={q.id}
                    className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ background: isCorrect(q, answers[q.id]) ? "#1f9d6a" : "#cf4a3f", color: "#fff" }}
                  >
                    {numberOf(q.id)}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex md:flex-col gap-2">
              <button
                type="button"
                onClick={retry}
                className="px-5 py-2.5 rounded-md text-sm font-semibold"
                style={{ border: "1px solid rgba(255,255,255,0.5)" }}
              >
                Try again
              </button>
              {hasNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-5 py-2.5 rounded-md text-sm font-semibold"
                  style={{ background: "#fff", color: palette.navy }}
                >
                  Next test →
                </button>
              )}
            </div>
          </div>
        </section>

        <main className="max-w-4xl mx-auto px-4 py-8 space-y-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: palette.muted }}>
            Answer review
          </h2>
          {questions.map(q => {
            const ok = isCorrect(q, answers[q.id]);
            const mine = (answers[q.id] || "").trim();
            return (
              <div
                key={q.id}
                className="rounded-lg p-5 space-y-3"
                style={{
                  background: palette.paper,
                  boxShadow: "0 1px 2px rgba(12,35,64,0.08)",
                  borderLeft: `4px solid ${ok ? palette.success : palette.danger}`
                }}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white"
                    style={{ background: ok ? palette.success : palette.danger }}
                  >
                    {numberOf(q.id)}
                  </span>
                  <span style={{ color: ok ? palette.success : palette.danger }}>
                    {ok ? "Correct" : mine ? "Incorrect" : "Not answered"}
                  </span>
                </div>
                <p style={{ fontFamily: serif, color: palette.muted, lineHeight: 1.6 }}>{q.original}</p>
                <p style={{ fontFamily: serif, color: palette.ink, lineHeight: 1.9, fontSize: "1.05rem" }}>
                  <Sentence
                    q={q}
                    middle={
                      <strong
                        className="px-1.5 rounded-sm"
                        style={{ background: palette.successBg, color: palette.success, borderBottom: `2px solid ${palette.success}` }}
                      >
                        {q.answer}
                      </strong>
                    }
                  />
                </p>
                {!ok && (
                  <p className="text-sm" style={{ color: palette.danger }}>
                    {mine ? (
                      <>
                        Your answer: <strong>{mine}</strong>
                      </>
                    ) : (
                      "You left this gap empty."
                    )}
                  </p>
                )}
                {q.alternatives?.length > 0 && (
                  <p className="text-sm" style={{ color: palette.muted }}>
                    Also accepted: {q.alternatives.join(" · ")}
                  </p>
                )}
                {q.tip && (
                  <p className="text-sm" style={{ color: palette.muted }}>
                    <strong style={{ color: palette.ink }}>{q.keyword}</strong> – {q.tip}
                  </p>
                )}
              </div>
            );
          })}
        </main>
        <FooterBrand />
      </div>
    );
  }

  // ===== Answering =====
  const bestHere = best[level.level];
  return (
    <div className="min-h-screen pb-24" style={{ background: palette.page, fontFamily: sans }}>
      <ExamBar left={<PartPill>Part 4</PartPill>} right={<>{timer}{exitButton}</>} />

      <main className="max-w-4xl mx-auto px-3 md:px-4 py-6">
        <div className="rounded-lg px-5 py-7 md:px-12 md:py-10" style={{ background: palette.paper, boxShadow: sheetShadow }}>
          <div className="flex items-end justify-between gap-4 pb-3" style={{ borderBottom: `3px solid ${palette.navy}` }}>
            <h2 className="text-3xl md:text-4xl font-bold leading-none" style={{ fontFamily: serif, color: palette.navy }}>
              Part 4
            </h2>
            <p className="text-sm font-semibold" style={{ color: palette.muted }}>
              Questions 1–{total}
            </p>
          </div>

          <div
            className="mt-5 px-4 py-3 text-[0.95rem] md:text-base font-semibold"
            style={{ border: `1.5px solid ${palette.ink}`, color: palette.ink, fontFamily: serif, lineHeight: 1.6 }}
          >
            For questions 1–{total}, complete the second sentence so that it has a similar meaning to the first
            sentence, using the word given. Do not change the word given. You must use between two and five words,
            including the word given.
          </div>

          <div className="mt-2">
            {questions.map(q => {
              const value = answers[q.id] || "";
              const words = wordCount(value);
              const isActive = q.id === active;
              return (
                <div
                  key={q.id}
                  className="py-6 grid grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_1fr] gap-x-3"
                  style={{ borderBottom: `1px solid ${palette.hair}` }}
                >
                  <span className="text-lg font-bold" style={{ color: palette.navy }}>
                    {numberOf(q.id)}
                  </span>
                  <div className="space-y-3">
                    <p className="text-[1.05rem] md:text-[1.12rem]" style={{ fontFamily: serif, color: palette.ink, lineHeight: 1.7 }}>
                      {q.original}
                    </p>
                    <div className="flex justify-center">
                      <KeywordBox>{q.keyword}</KeywordBox>
                    </div>
                    <div
                      className="flex flex-wrap items-baseline gap-x-2 gap-y-2 text-[1.05rem] md:text-[1.12rem]"
                      style={{ fontFamily: serif, color: palette.ink, lineHeight: 1.7 }}
                    >
                      {q.lead && <span>{q.lead}</span>}
                      <input
                        ref={el => {
                          inputRefs.current[q.id] = el;
                        }}
                        type="text"
                        value={value}
                        onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                        onFocus={() => setActive(q.id)}
                        onKeyDown={e => onKeyDown(e, q.id)}
                        aria-label={`Answer to question ${numberOf(q.id)}, key word ${q.keyword}`}
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        className="flex-1 min-w-[12rem] px-2 py-1 text-center font-semibold rounded-sm focus:outline-none"
                        style={{
                          fontFamily: sans,
                          fontSize: "0.95rem",
                          color: palette.navy,
                          background: isActive ? "#fff6cc" : value ? palette.select : palette.tint,
                          borderBottom: `2px solid ${isActive || value ? palette.selectBorder : palette.ink}`,
                          outline: isActive ? `2px solid ${palette.selectBorder}` : "none",
                          outlineOffset: 1
                        }}
                      />
                      {q.tail && <span>{q.tail}</span>}
                    </div>
                    <p
                      className="text-xs"
                      style={{ color: words > MAX_WORDS ? palette.danger : palette.muted, minHeight: "1rem" }}
                    >
                      {value.trim() ? `${words} word${words === 1 ? "" : "s"} (use 2–${MAX_WORDS})` : ""}
                      {words > MAX_WORDS && " – too many words"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-xs hidden md:block" style={{ color: palette.muted }}>
            Tip: press Enter to jump to the next question. Contractions such as don't or do not are both accepted.
          </p>
        </div>
        <FooterBrand />
      </main>

      {/* Question navigator, as in the computer-based test */}
      <nav
        className="fixed bottom-0 inset-x-0 z-30"
        style={{ background: palette.paper, borderTop: `1px solid ${palette.hair}`, boxShadow: "0 -6px 24px rgba(12,35,64,0.08)" }}
        aria-label="Question navigator"
      >
        <div className="max-w-4xl mx-auto px-3 md:px-4 py-2.5 flex items-center gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto flex-1">
            {ids.map(id => {
              const answered = !!(answers[id] || "").trim();
              const isActive = id === active;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => focusQuestion(id)}
                  aria-label={`Go to question ${numberOf(id)}${answered ? " (answered)" : ""}`}
                  className="w-9 h-9 shrink-0 rounded-md text-sm font-bold"
                  style={{
                    background: answered ? palette.navy : palette.paper,
                    color: answered ? "#fff" : palette.navy,
                    border: `1.5px solid ${isActive ? palette.selectBorder : answered ? palette.navy : palette.hair}`,
                    boxShadow: isActive ? `0 0 0 2px ${palette.select}` : "none"
                  }}
                >
                  {numberOf(id)}
                </button>
              );
            })}
          </div>
          <span className="hidden md:block text-xs whitespace-nowrap" style={{ color: palette.muted }}>
            {answeredCount}/{total} answered{bestHere !== undefined && ` · best ${bestHere}/${total}`}
          </span>
          <button
            type="button"
            onClick={submit}
            disabled={answeredCount === 0}
            className="px-5 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap"
            style={{
              background: answeredCount === 0 ? "#cfd6de" : answeredCount < total ? palette.navySoft : palette.red,
              color: answeredCount === 0 ? "#6b7785" : "#fff",
              cursor: answeredCount === 0 ? "not-allowed" : "pointer"
            }}
          >
            {answeredCount === total ? "Check answers" : `Check (${total - answeredCount} left)`}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default function KeywordTransformation() {
  const levels = exercisesData.levels;
  const [selected, setSelected] = useState(null);
  const [best, setBest] = useState(() => readBest(STORAGE_KEY));

  const recordScore = (levelNumber, score) => {
    setBest(prev => {
      const next = { ...prev, [levelNumber]: Math.max(prev[levelNumber] ?? 0, score) };
      writeBest(STORAGE_KEY, next);
      return next;
    });
  };

  if (selected === null) return <SetList levels={levels} best={best} onStart={setSelected} />;

  return (
    <Exam
      levels={levels}
      index={selected}
      best={best}
      onExit={() => setSelected(null)}
      onNext={() => setSelected(selected + 1)}
      onFinish={recordScore}
    />
  );
}
