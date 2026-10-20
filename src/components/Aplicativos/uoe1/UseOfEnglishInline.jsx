import React, { useEffect, useMemo, useRef, useState } from "react";
import testsData from "../data/testsData.json";
import {
  palette,
  sans,
  serif,
  sheetShadow,
  LETTERS,
  norm,
  formatTime,
  readBest,
  writeBest,
  ExamBar,
  PartPill,
  FooterBrand,
  ScoreRing
} from "../shared/examUi";

const STORAGE_KEY = "uoe1-best-scores";

// Which gap is the example (0) and which are scored questions
const describeTest = test => {
  const ids = Object.keys(test.options).map(Number).sort((a, b) => a - b);
  return { exampleId: ids.includes(0) ? 0 : null, questionIds: ids.filter(id => id !== 0) };
};

const correctWord = (test, id) => {
  const ans = norm(test.correctAnswers[id]);
  return test.options[id].find(o => norm(o) === ans) ?? test.correctAnswers[id];
};

// Explanations are stored as "word. reason" - show only the reason
const explanationText = (test, id) => {
  const raw = test.explanations[id] || "";
  const word = correctWord(test, id);
  return norm(raw).startsWith(norm(word) + ".") ? raw.slice(word.length + 1).trim() : raw;
};

// The sentence around a gap, split so the answer can be highlighted
const sentenceAround = (test, id) => {
  const idx = test.segments.findIndex(s => typeof s !== "string" && s.id === id);
  const prev = typeof test.segments[idx - 1] === "string" ? test.segments[idx - 1] : "";
  const next = typeof test.segments[idx + 1] === "string" ? test.segments[idx + 1] : "";
  const before = prev.split(/(?<=[.!?])\s+|\n+/).pop();
  const nextEnd = next.search(/[.!?](\s|$)/);
  const after = nextEnd === -1 ? next : next.slice(0, nextEnd + 1);
  return { before: before.trimStart(), after: after.trimEnd() };
};


// ---------- Test selection ----------
function SetList({ best, onStart }) {
  const tests = testsData.tests;
  const done = tests.filter(t => best[t.id] !== undefined).length;
  return (
    <div className="min-h-screen" style={{ background: palette.page, fontFamily: sans }}>
      <ExamBar right={<span className="text-xs" style={{ opacity: 0.85 }}>{done} of {tests.length} completed</span>} />

      <section
        style={{
          background: `radial-gradient(circle at 85% 20%, rgba(200,16,46,0.28), transparent 45%), linear-gradient(135deg, ${palette.navy}, ${palette.navySoft})`,
          color: "#fff"
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#ff9aa8" }}>
            Part 1 · Multiple-choice cloze
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight" style={{ fontFamily: serif }}>
            Reading and Use of English
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base" style={{ opacity: 0.8 }}>
            Read the text and choose the word or phrase that best fits each gap. One mark per correct answer. Expect
            close-meaning distractors, collocations, phrasal verbs and grammar patterns, just like the real paper.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs">
            {[`${tests.length} tests`, "4 options per gap (A–D)", "Instant feedback & explanations"].map(chip => (
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test, idx) => {
            const { questionIds } = describeTest(test);
            const score = best[test.id];
            const perfect = score === questionIds.length;
            return (
              <button
                key={test.id}
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
                      {perfect ? "✓ " : ""}Best {score}/{questionIds.length}
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: palette.tint, color: palette.muted }}>
                      New
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: palette.ink }}>
                    {test.title}
                  </h2>
                  <p className="text-xs mt-1" style={{ color: palette.muted }}>
                    Part 1 · {questionIds.length} questions
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
function Exam({ test, index, best, onExit, onNext, onFinish }) {
  const { exampleId, questionIds } = useMemo(() => describeTest(test), [test]);
  const total = questionIds.length;
  const firstQ = questionIds[0];
  const lastQ = questionIds[total - 1];

  const [answers, setAnswers] = useState({});
  const [active, setActive] = useState(firstQ);
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const rowRefs = useRef({});

  // A new test starts clean
  useEffect(() => {
    setAnswers({});
    setActive(firstQ);
    setSubmitted(false);
    setElapsed(0);
    window.scrollTo(0, 0);
  }, [test, firstQ]);

  useEffect(() => {
    if (submitted) return undefined;
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [submitted, test]);

  const isRight = id => norm(answers[id]) === norm(test.correctAnswers[id]);
  const answeredCount = questionIds.filter(id => answers[id]).length;
  const score = questionIds.filter(isRight).length;
  const activeIdx = questionIds.indexOf(active);

  const focusQuestion = id => {
    setActive(id);
    rowRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const choose = (id, word) => {
    setAnswers(prev => ({ ...prev, [id]: word }));
    setActive(id);
  };
  const move = delta => {
    const next = questionIds[activeIdx + delta];
    if (next !== undefined) focusQuestion(next);
  };

  const submit = () => {
    setSubmitted(true);
    onFinish(test.id, score);
    window.scrollTo(0, 0);
  };
  const retry = () => {
    setAnswers({});
    setActive(firstQ);
    setSubmitted(false);
    setElapsed(0);
    window.scrollTo(0, 0);
  };

  // Keyboard: A-D answers the active question, arrows move between questions
  useEffect(() => {
    if (submitted) return undefined;
    const onKey = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const letter = LETTERS.indexOf(e.key.toUpperCase());
      if (e.key.length === 1 && letter !== -1 && test.options[active][letter] !== undefined) {
        choose(active, test.options[active][letter]);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        move(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Inline gap in the passage: bracketed number, filled with the chosen word
  const renderGap = id => {
    const isExample = id === exampleId;
    const chosen = isExample ? correctWord(test, id) : answers[id];
    const isActive = !submitted && id === active;
    const wrong = submitted && !isExample && !isRight(id);

    let colors = { color: palette.muted, borderColor: palette.ink, background: "transparent" };
    if (isExample) colors = { color: palette.example, borderColor: palette.example, background: palette.exampleBg };
    else if (submitted) {
      colors = isRight(id)
        ? { color: palette.success, borderColor: palette.success, background: palette.successBg }
        : { color: palette.danger, borderColor: palette.danger, background: palette.dangerBg };
    } else if (chosen) colors = { color: palette.navy, borderColor: palette.selectBorder, background: palette.select };
    if (isActive) colors = { ...colors, background: chosen ? palette.select : "#fff6cc" };

    return (
      <button
        key={`gap-${id}`}
        type="button"
        disabled={isExample || submitted}
        onClick={() => focusQuestion(id)}
        aria-label={isExample ? "Example, gap 0" : `Gap ${id}${chosen ? `, answered ${chosen}` : ", empty"}`}
        className="inline-flex items-baseline gap-1.5 mx-0.5 px-2 rounded-sm font-semibold align-baseline"
        style={{
          ...colors,
          fontFamily: sans,
          fontSize: "0.82em",
          lineHeight: 1.7,
          minWidth: "4.2rem",
          justifyContent: "center",
          borderBottom: `2px solid ${colors.borderColor}`,
          outline: isActive ? `2px solid ${palette.selectBorder}` : "none",
          outlineOffset: 1,
          cursor: isExample || submitted ? "default" : "pointer"
        }}
      >
        <span style={{ fontSize: "0.8em", fontWeight: 700, opacity: 0.85 }}>{id}</span>
        {chosen && <span style={{ textDecoration: wrong ? "line-through" : "none" }}>{chosen}</span>}
        {wrong && <span>{correctWord(test, id)}</span>}
      </button>
    );
  };

  const passage = (
    <div className="mt-6">
      <h3 className="text-center text-xl md:text-2xl font-bold mb-5" style={{ fontFamily: serif, color: palette.ink }}>
        {test.title}
      </h3>
      <p
        className="text-[1.05rem] md:text-[1.15rem]"
        style={{ fontFamily: serif, color: palette.ink, lineHeight: 2.15, whiteSpace: "pre-line", textAlign: "justify", hyphens: "auto" }}
      >
        {test.segments.map((seg, i) => (typeof seg === "string" ? <span key={i}>{seg}</span> : renderGap(seg.id)))}
      </p>
    </div>
  );

  const examBarExit = (
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
      ? "Perfect score. Every gap is correct."
      : pct >= 75
      ? "Strong result. Check the few gaps you missed."
      : pct >= 50
      ? "Getting there. Read the explanations and try again."
      : "Keep practising. Study the explanations, then retry.";
    const hasNext = index + 1 < testsData.tests.length;

    return (
      <div className="min-h-screen" style={{ background: palette.page, fontFamily: sans }}>
        <ExamBar left={<PartPill>Part 1</PartPill>} right={<>{timer}{examBarExit}</>} />

        <section style={{ background: `linear-gradient(135deg, ${palette.navy}, ${palette.navySoft})`, color: "#fff" }}>
          <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center gap-6">
            <ScoreRing pct={pct} score={score} total={total} good={pct >= 60} />
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#ff9aa8" }}>
                Results · {test.title}
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-semibold" style={{ fontFamily: serif }}>
                {pct}% correct · {formatTime(elapsed)}
              </h1>
              <p className="mt-2 text-sm md:text-base" style={{ opacity: 0.85 }}>
                {message}
              </p>
              <div className="mt-4 flex gap-1.5" aria-label="Result per question">
                {questionIds.map(id => (
                  <span
                    key={id}
                    className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ background: isRight(id) ? "#1f9d6a" : "#cf4a3f", color: "#fff" }}
                  >
                    {id}
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

        <main className="max-w-5xl mx-auto px-4 py-8 grid lg:grid-cols-5 gap-6 items-start">
          <section
            className="lg:col-span-3 rounded-lg px-6 py-7 md:px-9"
            style={{ background: palette.paper, boxShadow: sheetShadow }}
          >
            {passage}
          </section>

          <section className="lg:col-span-2 space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: palette.muted }}>
              Answer review
            </h2>
            {questionIds.map(id => {
              const ok = isRight(id);
              const right = correctWord(test, id);
              const mine = answers[id];
              const { before, after } = sentenceAround(test, id);
              return (
                <div
                  key={id}
                  className="rounded-lg p-4 space-y-2"
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
                      {id}
                    </span>
                    <span style={{ color: ok ? palette.success : palette.danger }}>
                      {ok ? "Correct" : mine ? "Incorrect" : "Not answered"}
                    </span>
                  </div>
                  <p className="text-sm" style={{ fontFamily: serif, color: palette.ink, lineHeight: 1.65 }}>
                    …{before}{" "}
                    <strong style={{ color: palette.success, borderBottom: `2px solid ${palette.success}` }}>{right}</strong>
                    {after}
                  </p>
                  {!ok && (
                    <p className="text-sm" style={{ color: palette.danger }}>
                      {mine ? (
                        <>
                          Your answer: <strong>{LETTERS[test.options[id].indexOf(mine)]} {mine}</strong>
                        </>
                      ) : (
                        "You left this gap empty."
                      )}
                    </p>
                  )}
                  <p className="text-sm" style={{ color: palette.muted }}>
                    <strong style={{ color: palette.ink }}>
                      {LETTERS[test.options[id].indexOf(right)]} {right}
                    </strong>
                    {" – "}
                    {explanationText(test, id)}
                  </p>
                </div>
              );
            })}
          </section>
        </main>
        <FooterBrand />
      </div>
    );
  }

  // ===== Answering =====
  const bestHere = best[test.id];
  const renderOptionRow = id => {
    const isExample = id === exampleId;
    const isActive = id === active;
    const picked = isExample ? correctWord(test, id) : answers[id];
    return (
      <div
        key={id}
        ref={el => {
          rowRefs.current[id] = el;
        }}
        className="flex items-stretch rounded-md overflow-hidden"
        style={{
          border: `1px solid ${isActive ? palette.selectBorder : palette.hair}`,
          boxShadow: isActive ? `0 0 0 2px ${palette.select}` : "none",
          background: isExample ? palette.exampleBg : palette.paper,
          transition: "box-shadow 120ms, border-color 120ms"
        }}
      >
        <button
          type="button"
          disabled={isExample}
          onClick={() => focusQuestion(id)}
          className="w-11 md:w-14 shrink-0 flex items-center justify-center text-base font-bold"
          style={{
            background: isExample ? palette.example : answers[id] ? palette.navy : palette.tint,
            color: isExample || answers[id] ? "#fff" : palette.navy,
            cursor: isExample ? "default" : "pointer"
          }}
          aria-label={`Question ${id}`}
        >
          {id}
        </button>
        <div className="grid grid-cols-2 md:grid-cols-4 flex-1">
          {test.options[id].map((opt, i) => {
            const selected = picked === opt;
            return (
              <button
                key={opt}
                type="button"
                disabled={isExample}
                role="radio"
                aria-checked={selected}
                onClick={() => choose(id, opt)}
                className="flex items-center gap-2.5 px-3 py-3 text-left text-[0.95rem]"
                style={{
                  background: selected ? (isExample ? "transparent" : palette.select) : "transparent",
                  color: selected ? (isExample ? palette.example : palette.navy) : palette.ink,
                  fontWeight: selected ? 700 : 500,
                  cursor: isExample ? "default" : "pointer",
                  borderLeft: i > 0 ? `1px solid ${palette.hair}` : "none"
                }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                  style={{
                    background: selected ? (isExample ? palette.example : palette.selectBorder) : "transparent",
                    color: selected ? "#fff" : palette.muted,
                    border: selected ? "none" : `1.5px solid ${palette.hair}`
                  }}
                >
                  {LETTERS[i]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: palette.page, fontFamily: sans }}>
      <ExamBar left={<PartPill>Part 1</PartPill>} right={<>{timer}{examBarExit}</>} />

      <main className="max-w-4xl mx-auto px-3 md:px-4 py-6">
        <div className="rounded-lg px-5 py-7 md:px-12 md:py-10" style={{ background: palette.paper, boxShadow: sheetShadow }}>
          <div className="flex items-end justify-between gap-4 pb-3" style={{ borderBottom: `3px solid ${palette.navy}` }}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-none" style={{ fontFamily: serif, color: palette.navy }}>
                Part 1
              </h2>
            </div>
            <p className="text-sm font-semibold" style={{ color: palette.muted }}>
              Questions {firstQ}–{lastQ}
            </p>
          </div>

          <div
            className="mt-5 px-4 py-3 text-[0.95rem] md:text-base font-semibold"
            style={{ border: `1.5px solid ${palette.ink}`, color: palette.ink, fontFamily: serif, lineHeight: 1.6 }}
          >
            For questions {firstQ}–{lastQ}, read the text below and decide which answer (A, B, C or D) best fits each
            gap.
            {exampleId !== null && " There is an example at the beginning (0)."}
          </div>

          {passage}

          <div className="mt-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: palette.muted }}>
              Choose your answers
            </p>
            <div className="space-y-2.5" role="radiogroup">
              {exampleId !== null && renderOptionRow(exampleId)}
              {questionIds.map(renderOptionRow)}
            </div>
            <p className="mt-4 text-xs hidden md:block" style={{ color: palette.muted }}>
              Tip: press A–D to answer the highlighted question, and ↑ ↓ to move between questions.
            </p>
          </div>
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
            {questionIds.map(id => {
              const answered = !!answers[id];
              const isActive = id === active;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => focusQuestion(id)}
                  aria-label={`Go to question ${id}${answered ? " (answered)" : ""}`}
                  className="w-9 h-9 shrink-0 rounded-md text-sm font-bold"
                  style={{
                    background: answered ? palette.navy : palette.paper,
                    color: answered ? "#fff" : palette.navy,
                    border: `1.5px solid ${isActive ? palette.selectBorder : answered ? palette.navy : palette.hair}`,
                    boxShadow: isActive ? `0 0 0 2px ${palette.select}` : "none"
                  }}
                >
                  {id}
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

export default function UseOfEnglishInline() {
  const [selected, setSelected] = useState(null);
  const [best, setBest] = useState(() => readBest(STORAGE_KEY));

  const recordScore = (testId, score) => {
    setBest(prev => {
      const next = { ...prev, [testId]: Math.max(prev[testId] ?? 0, score) };
      writeBest(STORAGE_KEY, next);
      return next;
    });
  };

  if (selected === null) return <SetList best={best} onStart={setSelected} />;

  return (
    <Exam
      test={testsData.tests[selected]}
      index={selected}
      best={best}
      onExit={() => setSelected(null)}
      onNext={() => setSelected(selected + 1)}
      onFinish={recordScore}
    />
  );
}
