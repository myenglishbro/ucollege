import React, { useEffect, useMemo, useRef, useState } from "react";
import testsData from "../data/testsData2.json";
import {
  palette,
  sans,
  serif,
  sheetShadow,
  norm,
  formatTime,
  readBest,
  writeBest,
  ExamBar,
  PartPill,
  FooterBrand,
  ScoreRing
} from "../shared/examUi";

const STORAGE_KEY = "uoe2-best-scores";

// Split the segments into paragraphs; each gap gets its exam number (1, 2, 3…)
const describeTest = test => {
  const gapIds = test.segments.filter(s => typeof s !== "string").map(s => s.id);
  const numberOf = id => gapIds.indexOf(id) + 1;

  const paragraphs = [];
  let current = [];
  const flush = () => {
    if (current.length) paragraphs.push(current);
    current = [];
  };
  test.segments.forEach(seg => {
    if (typeof seg !== "string") {
      current.push({ gap: seg.id });
      return;
    }
    seg.split(/\n+/).forEach((part, i, arr) => {
      if (part) current.push({ text: part });
      if (i < arr.length - 1) flush();
    });
  });
  flush();

  return { gapIds, numberOf, paragraphs };
};

const acceptedFor = (test, id) => [test.correctAnswers[id], ...(test.acceptedAnswers?.[id] || [])];
const isCorrect = (test, id, value) => !!norm(value) && acceptedFor(test, id).some(a => norm(a) === norm(value));

// Explanations are stored as "word. reason" - show only the reason
const explanationText = (test, id) => {
  const raw = test.explanations?.[id] || "";
  const word = test.correctAnswers[id];
  return norm(raw).startsWith(norm(word) + ".") ? raw.slice(word.length + 1).trim() : raw;
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
            Part 2 · Open cloze
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight" style={{ fontFamily: serif }}>
            Reading and Use of English
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base" style={{ opacity: 0.8 }}>
            Think of the word that best fits each gap. Use only one word in each gap. One mark per correct answer.
            Expect prepositions, auxiliaries, pronouns, articles, linkers and fixed phrases.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs">
            {[`${tests.length} tests`, "One word per gap", "Instant feedback & explanations"].map(chip => (
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
            const total = describeTest(test).gapIds.length;
            const score = best[test.id];
            const perfect = score === total;
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
                    Open cloze {idx + 1}
                  </h2>
                  <p className="text-xs mt-1" style={{ color: palette.muted }}>
                    Part 2 · {total} questions
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
  const { gapIds, numberOf, paragraphs } = useMemo(() => describeTest(test), [test]);
  const total = gapIds.length;
  const firstId = gapIds[0];

  const [answers, setAnswers] = useState({});
  const [active, setActive] = useState(firstId);
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const inputRefs = useRef({});

  // A new test starts clean
  useEffect(() => {
    setAnswers({});
    setActive(firstId);
    setSubmitted(false);
    setElapsed(0);
    window.scrollTo(0, 0);
  }, [test, firstId]);

  useEffect(() => {
    if (submitted) return undefined;
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [submitted, test]);

  const answeredCount = gapIds.filter(id => norm(answers[id])).length;
  const score = gapIds.filter(id => isCorrect(test, id, answers[id])).length;

  const focusGap = id => {
    inputRefs.current[id]?.focus();
    inputRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const submit = () => {
    setSubmitted(true);
    onFinish(test.id, score);
    window.scrollTo(0, 0);
  };
  const retry = () => {
    setAnswers({});
    setActive(firstId);
    setSubmitted(false);
    setElapsed(0);
    window.scrollTo(0, 0);
  };

  const onKeyDown = (e, id) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const next = gapIds[gapIds.indexOf(id) + 1];
    if (next !== undefined) focusGap(next);
    else e.target.blur();
  };

  // Renders one paragraph; in results mode the gaps show the marked answer
  const renderParagraph = (nodes, key) => (
    <p
      key={key}
      className="py-4 text-[1.05rem] md:text-[1.15rem]"
      style={{
        fontFamily: serif,
        color: palette.ink,
        lineHeight: 2.2,
        borderBottom: `1px solid ${palette.hair}`
      }}
    >
      {nodes.map((n, i) => {
        if (n.text !== undefined) return <span key={i}>{n.text}</span>;
        const id = n.gap;
        const num = numberOf(id);
        if (submitted) {
          const ok = isCorrect(test, id, answers[id]);
          const mine = norm(answers[id]) ? answers[id].trim() : "";
          return (
            <span
              key={i}
              className="inline-flex items-baseline gap-1.5 mx-0.5 px-2 rounded-sm font-semibold"
              style={{
                fontFamily: sans,
                fontSize: "0.82em",
                background: ok ? palette.successBg : palette.dangerBg,
                color: ok ? palette.success : palette.danger,
                borderBottom: `2px solid ${ok ? palette.success : palette.danger}`
              }}
            >
              <span style={{ fontSize: "0.8em", opacity: 0.85 }}>{num}</span>
              {!ok && mine && <span style={{ textDecoration: "line-through" }}>{mine}</span>}
              <span>{ok ? mine : test.correctAnswers[id]}</span>
            </span>
          );
        }
        const value = answers[id] || "";
        const isActive = id === active;
        return (
          <input
            key={i}
            ref={el => {
              inputRefs.current[id] = el;
            }}
            type="text"
            value={value}
            placeholder={String(num)}
            onChange={e => setAnswers(prev => ({ ...prev, [id]: e.target.value }))}
            onFocus={() => setActive(id)}
            onKeyDown={e => onKeyDown(e, id)}
            aria-label={`Gap ${num}`}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="mx-1 px-2 text-center font-semibold rounded-sm focus:outline-none"
            style={{
              fontFamily: sans,
              fontSize: "0.82em",
              lineHeight: 1.7,
              width: `${Math.max(6.5, value.length + 3)}ch`,
              color: palette.navy,
              background: isActive ? "#fff6cc" : value ? palette.select : "transparent",
              borderBottom: `2px solid ${isActive || value ? palette.selectBorder : palette.ink}`,
              outline: isActive ? `2px solid ${palette.selectBorder}` : "none",
              outlineOffset: 1
            }}
          />
        );
      })}
    </p>
  );

  const passage = (
    <div className="mt-2">{paragraphs.map((nodes, i) => renderParagraph(nodes, i))}</div>
  );

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
      ? "Perfect score. Every gap is correct."
      : pct >= 75
      ? "Strong result. Check the few gaps you missed."
      : pct >= 50
      ? "Getting there. Read the explanations and try again."
      : "Keep practising. Study the explanations, then retry.";
    const hasNext = index + 1 < testsData.tests.length;

    return (
      <div className="min-h-screen" style={{ background: palette.page, fontFamily: sans }}>
        <ExamBar left={<PartPill>Part 2</PartPill>} right={<>{timer}{exitButton}</>} />

        <section style={{ background: `linear-gradient(135deg, ${palette.navy}, ${palette.navySoft})`, color: "#fff" }}>
          <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center gap-6">
            <ScoreRing pct={pct} score={score} total={total} good={pct >= 60} />
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#ff9aa8" }}>
                Results · Open cloze {index + 1}
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-semibold" style={{ fontFamily: serif }}>
                {pct}% correct · {formatTime(elapsed)}
              </h1>
              <p className="mt-2 text-sm md:text-base" style={{ opacity: 0.85 }}>
                {message}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Result per question">
                {gapIds.map(id => (
                  <span
                    key={id}
                    className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ background: isCorrect(test, id, answers[id]) ? "#1f9d6a" : "#cf4a3f", color: "#fff" }}
                  >
                    {numberOf(id)}
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
          <section className="lg:col-span-3 rounded-lg px-6 py-5 md:px-9" style={{ background: palette.paper, boxShadow: sheetShadow }}>
            {passage}
          </section>

          <section className="lg:col-span-2 space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: palette.muted }}>
              Answer review
            </h2>
            {gapIds.map(id => {
              const ok = isCorrect(test, id, answers[id]);
              const mine = norm(answers[id]) ? answers[id].trim() : "";
              const alts = test.acceptedAnswers?.[id] || [];
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
                      {numberOf(id)}
                    </span>
                    <span style={{ color: ok ? palette.success : palette.danger }}>
                      {ok ? "Correct" : mine ? "Incorrect" : "Not answered"}
                    </span>
                  </div>
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
                  <p className="text-sm" style={{ color: palette.muted }}>
                    <strong style={{ color: palette.ink }}>{test.correctAnswers[id]}</strong>
                    {alts.length > 0 && <span> (also accepted: {alts.join(", ")})</span>}
                    {explanationText(test, id) && <> – {explanationText(test, id)}</>}
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
  const firstNum = 1;
  const lastNum = total;
  return (
    <div className="min-h-screen pb-24" style={{ background: palette.page, fontFamily: sans }}>
      <ExamBar left={<PartPill>Part 2</PartPill>} right={<>{timer}{exitButton}</>} />

      <main className="max-w-4xl mx-auto px-3 md:px-4 py-6">
        <div className="rounded-lg px-5 py-7 md:px-12 md:py-10" style={{ background: palette.paper, boxShadow: sheetShadow }}>
          <div className="flex items-end justify-between gap-4 pb-3" style={{ borderBottom: `3px solid ${palette.navy}` }}>
            <h2 className="text-3xl md:text-4xl font-bold leading-none" style={{ fontFamily: serif, color: palette.navy }}>
              Part 2
            </h2>
            <p className="text-sm font-semibold" style={{ color: palette.muted }}>
              Questions {firstNum}–{lastNum}
            </p>
          </div>

          <div
            className="mt-5 px-4 py-3 text-[0.95rem] md:text-base font-semibold"
            style={{ border: `1.5px solid ${palette.ink}`, color: palette.ink, fontFamily: serif, lineHeight: 1.6 }}
          >
            For questions {firstNum}–{lastNum}, think of the word which best fits each gap. Use only one word in each
            gap.
          </div>

          <div className="mt-6">{passage}</div>

          <p className="mt-5 text-xs hidden md:block" style={{ color: palette.muted }}>
            Tip: type your answer in each box and press Enter to jump to the next gap.
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
            {gapIds.map(id => {
              const answered = !!norm(answers[id]);
              const isActive = id === active;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => focusGap(id)}
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

export default function UseOfEnglishInline2() {
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
