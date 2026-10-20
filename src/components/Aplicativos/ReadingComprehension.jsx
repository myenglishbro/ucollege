import React, { useEffect, useMemo, useRef, useState } from "react";
import exercises from "./data/readingExercises.json";
import {
  palette,
  sans,
  serif,
  sheetShadow,
  LETTERS,
  formatTime,
  readBest,
  writeBest,
  ExamBar,
  PartPill,
  FooterBrand,
  ScoreRing
} from "./shared/examUi";

const STORAGE_KEY = "uoe5-best-scores";

// The reading texts are images hosted on Google Drive. Try a direct image URL first, then a thumbnail,
// and only fall back to Drive's embedded viewer if neither loads.
const driveId = url => {
  const m = String(url || "").match(/\/d\/([^/?#]+)/) || String(url || "").match(/[?&]id=([^&#]+)/);
  return m ? m[1] : null;
};
const imageSources = url => {
  const id = driveId(url);
  if (!id) return url ? [url] : [];
  return [`https://lh3.googleusercontent.com/d/${id}`, `https://drive.google.com/thumbnail?id=${id}&sz=w2000`];
};
const previewUrl = url => {
  const id = driveId(url);
  return id ? `https://drive.google.com/file/d/${id}/preview` : url;
};

// ---------- Text image viewer ----------
function TextViewer({ exercise, zoom, setZoom, heightClass }) {
  const sources = useMemo(() => imageSources(exercise.image), [exercise.image]);
  const [srcIndex, setSrcIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSrcIndex(0);
    setLoaded(false);
  }, [exercise.id]);

  const useIframe = srcIndex >= sources.length;
  const openUrl = sources[0] || exercise.image;

  const zoomBtn = {
    border: `1px solid ${palette.hair}`,
    background: palette.paper,
    color: palette.navy
  };

  return (
    <div className="rounded-lg overflow-hidden flex flex-col" style={{ background: palette.paper, boxShadow: sheetShadow }}>
      <div className="flex items-center justify-between gap-3 px-4 py-2.5" style={{ borderBottom: `1px solid ${palette.hair}`, background: palette.tint }}>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: palette.muted }}>
          Reading text
        </span>
        {!useIframe && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setZoom(z => Math.max(60, z - 20))}
              disabled={zoom <= 60}
              className="w-8 h-8 rounded-md font-bold"
              style={{ ...zoomBtn, opacity: zoom <= 60 ? 0.4 : 1 }}
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setZoom(100)}
              className="px-2 h-8 rounded-md text-xs font-semibold tabular-nums min-w-[3.2rem]"
              style={zoomBtn}
              aria-label="Reset zoom to fit width"
            >
              {zoom}%
            </button>
            <button
              type="button"
              onClick={() => setZoom(z => Math.min(240, z + 20))}
              disabled={zoom >= 240}
              className="w-8 h-8 rounded-md font-bold"
              style={{ ...zoomBtn, opacity: zoom >= 240 ? 0.4 : 1 }}
              aria-label="Zoom in"
            >
              +
            </button>
            <a
              href={openUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-1 px-3 h-8 rounded-md text-xs font-semibold flex items-center"
              style={zoomBtn}
            >
              Open ↗
            </a>
          </div>
        )}
      </div>

      <div className={`${heightClass} overflow-auto relative`} style={{ background: "#fff" }}>
        {useIframe ? (
          <iframe title={exercise.title} src={previewUrl(exercise.image)} className="w-full h-full min-h-[480px] border-0" allow="autoplay" />
        ) : (
          <>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center text-sm" style={{ color: palette.muted }}>
                Loading text…
              </div>
            )}
            <img
              key={sources[srcIndex]}
              src={sources[srcIndex]}
              alt={`Reading text: ${exercise.title}`}
              onLoad={() => setLoaded(true)}
              onError={() => setSrcIndex(i => i + 1)}
              draggable={false}
              style={{ width: `${zoom}%`, maxWidth: "none", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 200ms" }}
            />
          </>
        )}
      </div>
    </div>
  );
}

// ---------- Exercise selection ----------
function SetCard({ exercise, index, score, onStart }) {
  const total = exercise.questions.length;
  const perfect = score === total;
  const [thumbFailed, setThumbFailed] = useState(false);
  const thumb = imageSources(exercise.image)[0];
  return (
    <button
      type="button"
      onClick={onStart}
      className="group text-left rounded-xl overflow-hidden flex flex-col transition-all hover:-translate-y-0.5"
      style={{ background: palette.paper, boxShadow: sheetShadow, border: `1px solid ${palette.hair}` }}
    >
      <div
        className="relative h-28 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${palette.navy}, ${palette.navySoft})` }}
      >
        {thumb && !thumbFailed && (
          <img
            src={`${thumb}=w600`}
            alt=""
            aria-hidden="true"
            onError={() => setThumbFailed(true)}
            className="w-full h-full object-cover object-top"
            style={{ opacity: 0.9 }}
          />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,35,64,0) 40%, rgba(12,35,64,0.75) 100%)" }} />
        <span className="absolute left-4 bottom-2 text-3xl font-semibold text-white" style={{ fontFamily: serif }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        {score !== undefined && (
          <span
            className="absolute right-3 top-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: perfect ? palette.successBg : palette.select, color: perfect ? palette.success : palette.selectBorder }}
          >
            {perfect ? "✓ " : ""}Best {score}/{total}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h2 className="text-lg font-semibold" style={{ color: palette.ink }}>
          {exercise.title}
        </h2>
        <p className="text-xs" style={{ color: palette.muted }}>
          {exercise.level} · {total} questions
        </p>
        <span
          className="mt-auto pt-2 text-sm font-semibold flex items-center gap-1 transition-all group-hover:gap-2"
          style={{ color: palette.selectBorder }}
        >
          {score !== undefined ? "Practise again" : "Start reading"} <span aria-hidden>→</span>
        </span>
      </div>
    </button>
  );
}

function SetList({ best, onStart }) {
  const done = exercises.filter(e => best[e.id] !== undefined).length;
  return (
    <div className="min-h-screen" style={{ background: palette.page, fontFamily: sans }}>
      <ExamBar right={<span className="text-xs" style={{ opacity: 0.85 }}>{done} of {exercises.length} completed</span>} />

      <section
        style={{
          background: `radial-gradient(circle at 85% 20%, rgba(200,16,46,0.28), transparent 45%), linear-gradient(135deg, ${palette.navy}, ${palette.navySoft})`,
          color: "#fff"
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#ff9aa8" }}>
            Part 5 · Multiple choice
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight" style={{ fontFamily: serif }}>
            Reading and Use of English
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base" style={{ opacity: 0.8 }}>
            Read the article and choose the answer that fits best according to the text. The text stays on screen
            beside the questions so you can go back to it, just like in the real exam.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs">
            {[`${exercises.length} texts`, "Text beside the questions", "Zoomable reading text"].map(chip => (
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
          {exercises.map((exercise, idx) => (
            <SetCard key={exercise.id} exercise={exercise} index={idx} score={best[exercise.id]} onStart={() => onStart(idx)} />
          ))}
        </div>
        <FooterBrand />
      </main>
    </div>
  );
}

// ---------- Exam ----------
function Exam({ index, best, onExit, onNext, onFinish }) {
  const exercise = exercises[index];
  const questions = exercise.questions;
  const total = questions.length;

  const [answers, setAnswers] = useState({});
  const [active, setActive] = useState(questions[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [zoom, setZoom] = useState(100);
  const cardRefs = useRef({});

  // A new text starts clean
  useEffect(() => {
    setAnswers({});
    setActive(exercise.questions[0].id);
    setSubmitted(false);
    setElapsed(0);
    setZoom(100);
    window.scrollTo(0, 0);
  }, [exercise]);

  useEffect(() => {
    if (submitted) return undefined;
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [submitted, exercise]);

  const activeIdx = questions.findIndex(q => q.id === active);
  const answeredCount = questions.filter(q => answers[q.id] !== undefined).length;
  const score = questions.filter(q => answers[q.id] === q.answer).length;

  const focusQuestion = id => {
    setActive(id);
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const choose = (id, optionIndex) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [id]: optionIndex }));
    setActive(id);
  };
  const move = delta => {
    const next = questions[activeIdx + delta];
    if (next) focusQuestion(next.id);
  };

  const submit = () => {
    setSubmitted(true);
    onFinish(exercise.id, score);
    window.scrollTo(0, 0);
  };
  const retry = () => {
    setAnswers({});
    setActive(questions[0].id);
    setSubmitted(false);
    setElapsed(0);
    window.scrollTo(0, 0);
  };

  // Keyboard: A-D answers the active question, arrows move between questions
  useEffect(() => {
    if (submitted) return undefined;
    const onKey = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const q = questions[activeIdx];
      const letter = LETTERS.indexOf(e.key.toUpperCase());
      if (e.key.length === 1 && letter !== -1 && q && q.options[letter] !== undefined) {
        choose(q.id, letter);
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

  const questionPanel = (
    <div className="space-y-4">
      {questions.map((q, qi) => {
        const chosen = answers[q.id];
        const isActive = !submitted && q.id === active;
        const ok = chosen === q.answer;
        return (
          <div
            key={q.id}
            ref={el => {
              cardRefs.current[q.id] = el;
            }}
            onClick={() => !submitted && setActive(q.id)}
            className="rounded-lg p-5"
            style={{
              background: palette.paper,
              border: `1px solid ${isActive ? palette.selectBorder : palette.hair}`,
              boxShadow: isActive ? `0 0 0 2px ${palette.select}` : "0 1px 2px rgba(12,35,64,0.06)",
              borderLeft: submitted ? `4px solid ${ok ? palette.success : palette.danger}` : undefined,
              transition: "box-shadow 120ms, border-color 120ms"
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold shrink-0"
                style={{
                  background: submitted ? (ok ? palette.success : palette.danger) : chosen !== undefined ? palette.navy : palette.tint,
                  color: submitted || chosen !== undefined ? "#fff" : palette.navy
                }}
              >
                {qi + 1}
              </span>
              <p className="font-semibold leading-snug pt-1" style={{ color: palette.ink, fontFamily: serif, fontSize: "1.05rem" }}>
                {q.question}
              </p>
            </div>

            <div className="mt-4 space-y-2" role="radiogroup" aria-label={`Options for question ${qi + 1}`}>
              {q.options.map((opt, oi) => {
                const selected = chosen === oi;
                const isRight = submitted && oi === q.answer;
                const isWrong = submitted && selected && oi !== q.answer;
                let bg = palette.paper;
                let border = palette.hair;
                let color = palette.ink;
                if (isRight) {
                  bg = palette.successBg;
                  border = palette.success;
                  color = palette.success;
                } else if (isWrong) {
                  bg = palette.dangerBg;
                  border = palette.danger;
                  color = palette.danger;
                } else if (selected && !submitted) {
                  bg = palette.select;
                  border = palette.selectBorder;
                  color = palette.navy;
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={submitted}
                    onClick={e => {
                      e.stopPropagation();
                      choose(q.id, oi);
                    }}
                    className="w-full flex items-start gap-3 px-3 py-2.5 rounded-md text-left text-[0.95rem]"
                    style={{
                      background: bg,
                      color,
                      border: `${selected || isRight ? 2 : 1}px solid ${border}`,
                      fontWeight: selected || isRight ? 600 : 500,
                      cursor: submitted ? "default" : "pointer"
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5"
                      style={{
                        background: isRight ? palette.success : isWrong ? palette.danger : selected ? palette.selectBorder : "transparent",
                        color: isRight || isWrong || selected ? "#fff" : palette.muted,
                        border: isRight || isWrong || selected ? "none" : `1.5px solid ${palette.hair}`
                      }}
                    >
                      {LETTERS[oi]}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isRight && <span aria-label="Correct answer">✓</span>}
                    {isWrong && <span aria-label="Your answer, incorrect">✗</span>}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <p className="mt-3 text-sm font-semibold" style={{ color: ok ? palette.success : palette.danger }}>
                {ok
                  ? "Correct"
                  : chosen === undefined
                  ? `Not answered. Correct answer: ${LETTERS[q.answer]}`
                  : `Correct answer: ${LETTERS[q.answer]}`}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  // ===== Results =====
  if (submitted) {
    const pct = Math.round((score / total) * 100);
    const perfect = score === total;
    const message = perfect
      ? "Perfect score. You understood the text very well."
      : pct >= 75
      ? "Strong result. Re-read the text for the ones you missed."
      : pct >= 50
      ? "Getting there. Go back to the text and check each answer."
      : "Keep practising. Re-read the text carefully, then try again.";
    const hasNext = index + 1 < exercises.length;

    return (
      <div className="min-h-screen" style={{ background: palette.page, fontFamily: sans }}>
        <ExamBar left={<PartPill>Part 5</PartPill>} right={<>{timer}{exitButton}</>} />

        <section style={{ background: `linear-gradient(135deg, ${palette.navy}, ${palette.navySoft})`, color: "#fff" }}>
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center gap-6">
            <ScoreRing pct={pct} score={score} total={total} good={pct >= 60} />
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#ff9aa8" }}>
                Results · {exercise.title}
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-semibold" style={{ fontFamily: serif }}>
                {pct}% correct · {formatTime(elapsed)}
              </h1>
              <p className="mt-2 text-sm md:text-base" style={{ opacity: 0.85 }}>
                {message}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Result per question">
                {questions.map((q, qi) => (
                  <span
                    key={q.id}
                    className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ background: answers[q.id] === q.answer ? "#1f9d6a" : "#cf4a3f", color: "#fff" }}
                  >
                    {qi + 1}
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
                  Next text →
                </button>
              )}
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-6 items-start">
          <div className="lg:sticky lg:top-20">
            <TextViewer exercise={exercise} zoom={zoom} setZoom={setZoom} heightClass="h-[60vh] lg:h-[calc(100vh-9rem)]" />
          </div>
          <div>{questionPanel}</div>
        </main>
        <FooterBrand />
      </div>
    );
  }

  // ===== Answering =====
  const bestHere = best[exercise.id];
  return (
    <div className="min-h-screen pb-24" style={{ background: palette.page, fontFamily: sans }}>
      <ExamBar left={<PartPill>Part 5</PartPill>} right={<>{timer}{exitButton}</>} />

      <main className="max-w-6xl mx-auto px-3 md:px-4 py-6 space-y-5">
        <div className="rounded-lg px-5 py-4" style={{ background: palette.paper, boxShadow: sheetShadow }}>
          <div className="flex items-end justify-between gap-4 pb-2" style={{ borderBottom: `3px solid ${palette.navy}` }}>
            <h2 className="text-2xl md:text-3xl font-bold leading-none" style={{ fontFamily: serif, color: palette.navy }}>
              Part 5
            </h2>
            <p className="text-sm font-semibold" style={{ color: palette.muted }}>
              Questions 1–{total}
            </p>
          </div>
          <p
            className="mt-3 px-4 py-2.5 text-[0.95rem] font-semibold"
            style={{ border: `1.5px solid ${palette.ink}`, color: palette.ink, fontFamily: serif, lineHeight: 1.6 }}
          >
            You are going to read a text called “{exercise.title}”. For questions 1–{total}, choose the answer (A, B
            {total > 0 && questions.some(q => q.options.length > 3) ? ", C or D" : " or C"}) which you think fits best
            according to the text.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="lg:sticky lg:top-20">
            <TextViewer exercise={exercise} zoom={zoom} setZoom={setZoom} heightClass="h-[55vh] lg:h-[calc(100vh-15rem)]" />
          </div>
          <div>{questionPanel}</div>
        </div>
        <FooterBrand />
      </main>

      {/* Question navigator, as in the computer-based test */}
      <nav
        className="fixed bottom-0 inset-x-0 z-30"
        style={{ background: palette.paper, borderTop: `1px solid ${palette.hair}`, boxShadow: "0 -6px 24px rgba(12,35,64,0.08)" }}
        aria-label="Question navigator"
      >
        <div className="max-w-6xl mx-auto px-3 md:px-4 py-2.5 flex items-center gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto flex-1">
            {questions.map((q, qi) => {
              const answered = answers[q.id] !== undefined;
              const isActive = q.id === active;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => focusQuestion(q.id)}
                  aria-label={`Go to question ${qi + 1}${answered ? " (answered)" : ""}`}
                  className="w-9 h-9 shrink-0 rounded-md text-sm font-bold"
                  style={{
                    background: answered ? palette.navy : palette.paper,
                    color: answered ? "#fff" : palette.navy,
                    border: `1.5px solid ${isActive ? palette.selectBorder : answered ? palette.navy : palette.hair}`,
                    boxShadow: isActive ? `0 0 0 2px ${palette.select}` : "none"
                  }}
                >
                  {qi + 1}
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

const ReadingComprehension = () => {
  const [selected, setSelected] = useState(null);
  const [best, setBest] = useState(() => readBest(STORAGE_KEY));

  const recordScore = (exerciseId, score) => {
    setBest(prev => {
      const next = { ...prev, [exerciseId]: Math.max(prev[exerciseId] ?? 0, score) };
      writeBest(STORAGE_KEY, next);
      return next;
    });
  };

  if (selected === null) return <SetList best={best} onStart={setSelected} />;

  return (
    <Exam
      index={selected}
      best={best}
      onExit={() => setSelected(null)}
      onNext={() => setSelected(selected + 1)}
      onFinish={recordScore}
    />
  );
};

export default ReadingComprehension;
