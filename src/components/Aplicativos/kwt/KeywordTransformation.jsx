import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import exercisesData from "./data/keywordExercises.json";

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

export default function KeywordTransformation() {
  const levels = exercisesData.levels;
  const QUESTION_TIME = 45;
  const totalLevels = levels.length;
  const totalQuestions = levels.reduce((acc, level) => acc + level.questions.length, 0);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [log, setLog] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [questionStart, setQuestionStart] = useState(Date.now());

  useEffect(() => {
    if (selectedLevel !== null) {
      setCurrentQ(0);
      setInput("");
      setFeedback(null);
      setScore(0);
      setLog([]);
      setTimeLeft(QUESTION_TIME);
      setQuestionStart(Date.now());
    }
  }, [selectedLevel]);

  useEffect(() => {
    if (selectedLevel === null) return undefined;
    if (feedback) return undefined;

    const tick = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(tick);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [selectedLevel, feedback, currentQ]); // eslint-disable-line react-hooks/exhaustive-deps

  if (selectedLevel === null) {
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
        <div className="w-full max-w-5xl">
          <div
            className="rounded-[32px] p-8 md:p-12 space-y-8 shadow-2xl"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.98))",
              border: `1px solid ${palette.border}`,
              boxShadow: "0 35px 90px rgba(12,19,42,0.12)"
            }}
          >
            <div className="space-y-4">
              <img
                src={logoUrl}
                alt="MyEnglishBro logo"
                className="h-10 md:h-12 w-auto"
                style={{ filter: "drop-shadow(0 8px 18px rgba(12,19,42,0.12))" }}
              />
              <p className="uppercase tracking-[0.3em] text-xs font-semibold" style={{ color: palette.accent }}>
                Cambridge Paper Lab
              </p>
              <h1
                className="text-4xl md:text-5xl font-semibold"
                style={{ color: palette.navy, fontFamily: serif }}
              >
                Keyword Transformation
              </h1>
              <p className="text-lg" style={{ color: palette.muted }}>
                Elige un nivel y practica transformaciones al estilo Cambridge. Mantente fiel a la palabra clave y al
                sentido de la frase.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  `${totalLevels} niveles`,
                  `${totalQuestions} preguntas`,
                  `${QUESTION_TIME}s por item`,
                  "Keyword transformation"
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {levels.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedLevel(idx)}
                  className="px-6 py-4 rounded-2xl text-lg font-semibold transition hover:-translate-y-1"
                  style={{
                    background: palette.surfaceAlt,
                    color: palette.navy,
                    border: `1px solid ${palette.border}`,
                    boxShadow: "0 10px 24px rgba(12,19,42,0.1)"
                  }}
                >
                  Nivel {idx + 1}
                </button>
              ))}
            </div>

            <div className="text-sm" style={{ color: palette.muted }}>
              Instruccion breve: conserva el significado original, usa la palabra clave sin cambiarla y ajusta la
              gramatica para que la frase sea correcta.
            </div>
            <FooterBrand />
          </div>
        </div>
      </div>
    );
  }

  const questions = levels[selectedLevel].questions;
  const total = questions.length;
  const q = questions[currentQ];
  const answeredCount = feedback ? currentQ + 1 : currentQ;
  const progress = Math.round((answeredCount / total) * 100);
  const elapsedSeconds = Math.max(0, Math.round((Date.now() - questionStart) / 1000));
  const levelVideos = {
    1: "https://www.youtube.com/embed/2X1p0YdE7Vw",
    2: "https://www.youtube.com/embed/baXq2pIc6Jw",
    3: "https://www.youtube.com/embed/7i9nV4aLZqo",
    4: "https://www.youtube.com/embed/SbaqU19p9fQ",
    5: "https://www.youtube.com/embed/uTkNXXMObLo",
    6: "https://www.youtube.com/embed/5mYFXhHUPn0",
    default: "https://www.youtube.com/embed/rQ5yNj8c9fA"
  };
  const levelVideoUrl = levels[selectedLevel].video || levelVideos[selectedLevel + 1] || levelVideos.default;

  function handleSubmit() {
    if (feedback) return;
    const correct = input.trim().toUpperCase() === q.answer.toUpperCase();
    if (correct) setScore(s => s + 1);

    const timeTaken = Math.min(elapsedSeconds, QUESTION_TIME);
    setLog(l => [
      ...l,
      { id: q.id, input, correct, correctAnswer: q.answer, timeTaken }
    ]);
    setFeedback({ correct, correctAnswer: q.answer, attempt: input, timeTaken });
  }

  function handleNext() {
    if (currentQ + 1 < total) {
      setCurrentQ(i => i + 1);
      setInput("");
      setFeedback(null);
      setTimeLeft(QUESTION_TIME);
      setQuestionStart(Date.now());
    }
  }

  function retry() {
    setCurrentQ(0);
    setInput("");
    setFeedback(null);
    setScore(0);
    setLog([]);
    setTimeLeft(QUESTION_TIME);
    setQuestionStart(Date.now());
  }

  function handleTimeout() {
    if (feedback) return;
    const timeTaken = QUESTION_TIME;
    setLog(l => [
      ...l,
      { id: q.id, input, correct: false, correctAnswer: q.answer, timeTaken, timedOut: true }
    ]);
    setFeedback({ correct: false, correctAnswer: q.answer, attempt: input, timedOut: true, timeTaken });
  }

  return (
    <div
      className="min-h-screen px-4 py-10 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, rgba(43,182,168,0.18), transparent 40%), linear-gradient(150deg, #f6f2eb 0%, #eef3f8 55%, #f7f2ea 100%)",
        fontFamily: sans,
        color: palette.navy
      }}
    >
      <Watermark />
      <div className="max-w-6xl mx-auto">
                <header className="mb-8">
          <img
            src={logoUrl}
            alt="MyEnglishBro logo"
            className="h-8 md:h-10 w-auto mb-4"
            style={{ filter: "drop-shadow(0 8px 18px rgba(12,19,42,0.12))" }}
          />
          <p className="uppercase tracking-[0.3em] text-xs font-semibold" style={{ color: palette.accent }}>
            Cambridge Practice
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold" style={{ color: palette.navy, fontFamily: serif }}>
            Keyword Transformation - Nivel {selectedLevel + 1}
          </h1>
          <p className="mt-2" style={{ color: palette.muted }}>
            Replica el tono de examen en papel: responde con calma, cuida la ortografia y revisa cada matiz del
            significado original.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside
            className="lg:w-72 rounded-2xl p-5 space-y-4"
            style={{
              background: palette.surfaceAlt,
              border: `1px solid ${palette.border}`,
              boxShadow: "0 16px 40px rgba(12,19,42,0.08)"
            }}
          >
            <div>
              <div
                className="text-xs uppercase tracking-[0.2em] mb-2"
                style={{ color: palette.accent }}
              >
                Niveles
              </div>
              <div className="flex flex-wrap gap-2">
                {levels.map((_, idx) => {
                  const active = idx === selectedLevel;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedLevel(idx)}
                      className="px-3 py-2 rounded-lg border text-sm transition hover:-translate-y-[2px]"
                      style={{
                        background: active ? palette.navy : palette.surfaceAlt,
                        color: active ? "#fff" : palette.navy,
                        border: `1px solid ${active ? palette.navy : palette.border}`,
                        boxShadow: active ? "0 10px 24px rgba(12,19,42,0.16)" : "none"
                      }}
                    >
                      Nivel {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div
                className="text-xs uppercase tracking-[0.2em] mb-2"
                style={{ color: palette.accent }}
              >
                Progreso
              </div>
                            <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: palette.sky }}>
                  <div
                    className="h-full transition-all"
                    style={{ width: `${progress}%`, background: palette.navy }}
                  />
                </div>
                <span className="text-sm font-semibold" style={{ color: palette.navy }}>
                  {progress}%
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: palette.muted }}>
                Pregunta {currentQ + 1} de {total} - Aciertos {score}
              </p>
            </div>

            <div
              className="text-xs leading-relaxed rounded-xl p-3"
              style={{
                color: palette.muted,
                background: palette.porcelain,
                border: `1px solid ${palette.border}`
              }}
            >
              <strong className="block mb-1" style={{ color: palette.navy }}>
                Formato paper based
              </strong>
              <span>Escribe la frase completa en mayusculas o minusculas; evita abreviaturas. Al finalizar, revisa el reporte de respuestas.</span>
            </div>
          </aside>

          <div className="flex-1 space-y-6">
            {!feedback ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-8"
                style={{
                  background: palette.surfaceAlt,
                  border: `1px solid ${palette.border}`,
                  boxShadow: "0 18px 50px rgba(12,19,42,0.12)"
                }}
              >
                <div className="text-sm uppercase tracking-[0.2em] mb-1" style={{ color: palette.accent }}>
                  Frase original
                </div>
                <div className="text-lg italic mb-4" style={{ color: palette.navy }}>
                  {q.original}
                </div>

                <div className="text-sm uppercase tracking-[0.2em] mb-1" style={{ color: palette.accent }}>
                  Transforma usando
                </div>
                <div className="text-lg font-semibold mb-6" style={{ color: palette.navy }}>
                  {q.transformed}{" "}
                  <span style={{ color: palette.accent }}>(palabra clave: {q.keyword})</span>
                </div>

                <div
                  className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
                  style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em]" style={{ color: palette.accent }}>
                      Tiempo restante
                    </div>
                    <div className="text-sm" style={{ color: palette.muted }}>
                      Gestiona ritmo como en el paper
                    </div>
                  </div>
                  <div
                    className="text-xl font-bold tabular-nums px-3 py-1 rounded-lg"
                    style={{
                      background: timeLeft <= 10 ? palette.danger : "#fff",
                      color: timeLeft <= 10 ? "#fff" : palette.navy,
                      border: `1px solid ${palette.border}`
                    }}
                  >
                    {String(timeLeft).padStart(2, "0")}s
                  </div>
                </div>

                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className="w-full p-4 rounded-xl focus:outline-none mb-4"
                  style={{
                    background: palette.porcelain,
                    border: `1px solid ${palette.border}`,
                    color: palette.navy,
                    boxShadow: "inset 0 1px 2px rgba(15,23,42,0.08)"
                  }}
                  placeholder="Escribe la transformacion completa..."
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="px-6 py-3 rounded-xl font-semibold shadow hover:-translate-y-0.5 transition disabled:opacity-60 disabled:hover:translate-y-0"
                    style={{ background: palette.navy, color: "#fff" }}
                  >
                    Enviar respuesta
                  </button>
                  <span className="text-sm" style={{ color: palette.muted }}>
                    Recuerda no modificar la palabra clave.
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-8"
                style={{
                  background: palette.surfaceAlt,
                  border: `1px solid ${palette.border}`,
                  boxShadow: "0 18px 50px rgba(12,19,42,0.12)"
                }}
              >
                <div
                  className="pb-2 font-semibold text-lg"
                  style={{ color: feedback.correct ? palette.success : palette.danger }}
                >
                  {feedback.correct ? "Respuesta correcta" : "Revisa la respuesta"}
                </div>
                {!feedback.correct && (
                  <div className="text-sm mb-3" style={{ color: palette.muted }}>
                    <strong style={{ color: palette.navy }}>Solucion modelo:</strong> {feedback.correctAnswer}
                  </div>
                )}
                <div className="flex gap-3">
                  {currentQ + 1 < total ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl font-semibold shadow hover:-translate-y-0.5 transition"
                      style={{ background: palette.navy, color: "#fff" }}
                  >
                    Siguiente item
                  </button>
                ) : (
                  <button
                      onClick={retry}
                      className="px-6 py-3 rounded-xl font-semibold shadow hover:-translate-y-0.5 transition"
                      style={{ background: palette.success, color: "#fff" }}
                    >
                      Repetir nivel
                    </button>
                  )}
                  <button
                    onClick={() => setFeedback(null)}
                    className="px-5 py-3 rounded-xl font-semibold hover:-translate-y-0.5 transition"
                    style={{ background: palette.porcelain, color: palette.navy, border: `1px solid ${palette.border}` }}
                  >
                    Revisar item
                  </button>
                </div>
                <div
                  className="mt-4 space-y-2 text-sm rounded-xl p-4"
                  style={{ color: palette.muted, background: palette.porcelain, border: `1px solid ${palette.border}` }}
                >
                  <div className="flex items-center justify-between">
                    <span>Tiempo empleado</span>
                    <span className="font-semibold" style={{ color: palette.navy }}>
                      {feedback.timeTaken || 0}s
                    </span>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] mb-1" style={{ color: palette.accent }}>
                      Feedback
                    </div>
                    <p>
                      {feedback.correct
                        ? "Buen control de estructura y palabra clave. Pasa al siguiente item manteniendo consistencia."
                        : "Revisa concordancia y orden de palabras. Asegurate de que la palabra clave no cambie y que el tiempo verbal coincida."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {feedback && currentQ + 1 === total && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-6 space-y-4"
                style={{
                  background: palette.surfaceAlt,
                  border: `1px solid ${palette.border}`,
                  boxShadow: "0 18px 50px rgba(12,19,42,0.12)"
                }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold" style={{ color: palette.navy }}>
                    Reporte Nivel {selectedLevel + 1}
                  </h2>
                  <div className="text-sm" style={{ color: palette.muted }}>
                    Puntuacion: <span className="font-semibold" style={{ color: palette.navy }}>{score}</span> / {total}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div
                    className="px-4 py-2 rounded-lg text-sm"
                    style={{ background: palette.porcelain, border: `1px solid ${palette.border}`, color: palette.muted }}
                  >
                    Aciertos: <span className="font-semibold" style={{ color: palette.navy }}>{score}</span>
                  </div>
                  <div
                    className="px-4 py-2 rounded-lg text-sm"
                    style={{ background: palette.porcelain, border: `1px solid ${palette.border}`, color: palette.muted }}
                  >
                    Tiempo medio: <span className="font-semibold" style={{ color: palette.navy }}>
                      {log.length ? Math.round(log.reduce((s, e) => s + (e.timeTaken || 0), 0) / log.length) : 0}s
                    </span>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto rounded-xl" style={{ border: `1px solid ${palette.border}` }}>
                  <div
                    className="grid grid-cols-6 gap-2 text-sm px-4 py-2 uppercase tracking-[0.08em]"
                    style={{ background: palette.porcelain, color: palette.accent }}
                  >
                    <span>Item</span>
                    <span className="col-span-2">Tu respuesta</span>
                    <span>Estado</span>
                    <span>Modelo</span>
                    <span>Tiempo</span>
                  </div>
                  {log.map(entry => (
                    <div
                      key={entry.id}
                      className="grid grid-cols-6 gap-2 px-4 py-2 border-t text-sm"
                      style={{ borderColor: palette.border, color: palette.navy }}
                    >
                      <span className="font-semibold">Q{entry.id}</span>
                      <span className="col-span-2 break-words">
                        {entry.input || "Respuesta vacia"}
                      </span>
                      <span
                        className="font-semibold"
                        style={{ color: entry.correct ? palette.success : palette.danger }}
                      >
                        {entry.correct ? "Correcto" : entry.timedOut ? "Tiempo" : "Incorrecto"}
                      </span>
                      <span className="break-words">{entry.correctAnswer}</span>
                      <span>{entry.timeTaken ? `${entry.timeTaken}s` : "-"}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{ background: palette.porcelain, border: `1px solid ${palette.border}` }}
                >
                  <div className="text-sm uppercase tracking-[0.14em]" style={{ color: palette.accent }}>
                    Video guia nivel {selectedLevel + 1}
                  </div>
                  <p className="text-sm" style={{ color: palette.muted }}>
                    Repasa la explicacion completa para este nivel.
                  </p>
                  <div className="aspect-video w-full rounded-lg overflow-hidden border" style={{ borderColor: palette.border, background: "#000" }}>
                    <iframe
                      title={`Video nivel ${selectedLevel + 1}`}
                      src={levelVideoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedLevel(null)}
                className="text-sm underline underline-offset-4"
                style={{ color: palette.navy }}
              >
                Volver al menu de niveles
              </button>
              <div className="text-xs" style={{ color: palette.muted }}>
                Estilo papel Cambridge: responde con claridad y revisa puntuacion y mayusculas.
              </div>
            </div>
            <FooterBrand />
          </div>
        </div>
      </div>
    </div>
  );
}
