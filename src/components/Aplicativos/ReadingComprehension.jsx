import React, { useMemo, useRef, useState } from "react";
import exercises from "./data/readingExercises.json";

const background = "from-[#051535] via-[#0a234f] to-[#0c2e63]";
const accent = "#ffd200";
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
    className="pointer-events-none select-none absolute -right-10 -bottom-6 w-[260px] md:w-[360px] opacity-10"
    style={{ filter: "grayscale(1)" }}
  />
);

const FooterBrand = () => (
  <div className="w-full mt-10 pb-8 flex flex-col items-center gap-4 text-slate-200">
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
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
          className="px-4 py-2 rounded-full text-xs font-semibold border border-white/20 bg-white/5 hover:bg-white/10 transition"
          style={{ color: accent }}
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
);

const ReadingComprehension = () => {
  const [exerciseId, setExerciseId] = useState(exercises[0]?.id || "");
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showExercise, setShowExercise] = useState(false);
  const [zoom, setZoom] = useState(1);
  const setsRef = useRef(null);
  const readingRef = useRef(null);

  const currentExercise = useMemo(
    () => exercises.find((exercise) => exercise.id === exerciseId),
    [exerciseId]
  );

  const handleStart = (id) => {
    setExerciseId(id);
    setAnswers({});
    setShowResults(false);
    setShowIntro(false);
    setShowExercise(false);
    setZoom(1);
    setTimeout(() => {
      if (setsRef.current) {
        setsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleSelectSet = (id) => {
    setExerciseId(id);
    setAnswers({});
    setShowResults(false);
    setShowExercise(true);
    setZoom(1);
    setTimeout(() => {
      if (readingRef.current) {
        readingRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleBackToMenu = () => {
    setShowExercise(false);
    setShowResults(false);
    setZoom(1);
    setTimeout(() => {
      if (setsRef.current) {
        setsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
    setShowResults(false);
  };

  const totalQuestions = currentExercise?.questions?.length || 0;

  const correctCount = currentExercise
    ? currentExercise.questions.reduce((total, question) => {
        const chosen = answers[question.id];
        return total + (chosen === question.answer ? 1 : 0);
      }, 0)
    : 0;

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-100 flex items-center justify-center">
        <p className="text-lg font-semibold">
          No hay lecturas disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${background} text-slate-50 py-10 px-4 relative overflow-hidden`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 top-12 h-64 w-64 rounded-full bg-[#0c4ab5]/30 blur-3xl" />
        <div
          className="absolute right-10 bottom-12 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${accent}30` }}
        />
      </div>

      {showIntro ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4">
          <div className="max-w-4xl w-full bg-slate-900/90 border border-[#ffd200]/50 rounded-3xl shadow-2xl p-10 space-y-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#ffd200] font-semibold">
              Part 1 · Reading Multiple Choice
            </p>
            <h1 className="text-4xl font-black text-white">
              B2 First · Reading & Use of English
            </h1>
            <p className="text-slate-200 text-lg leading-relaxed">
              Task: lectura con preguntas de opcion multiple. Distractores
              cercanos, collocations y patrones gramaticales. Sigue el estilo
              Cambridge B2 First.
            </p>
            <div className="grid gap-6 md:grid-cols-2 text-slate-200">
              <div>
                <h3 className="font-semibold text-white mb-2">Overview</h3>
                <p>Multiple choice; 1 punto por pregunta.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  Assessment Focus
                </h3>
                <p>Lexical nuance, collocations, phrasal verbs y registro.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  How to Approach
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Fijate en preposiciones y formas verbales.</li>
                  <li>Piensa en frases, no en palabras sueltas.</li>
                  <li>Lee todo el enunciado antes de decidir.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Tips</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Practica collocations y phrasal verbs.</li>
                  <li>Observa como cada palabra cambia el sentido.</li>
                  <li>Exponte a textos variados y tonos distintos.</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => handleStart(exerciseId)}
              className="w-full rounded-full bg-[#ffd200] text-slate-900 font-semibold py-3 hover:bg-[#ffde33] transition-colors"
            >
              Iniciar
            </button>
            <FooterBrand />
          </div>
        </div>
      ) : null}

      <div className="relative max-w-6xl mx-auto space-y-10 z-10">
        <Watermark />
        {!showExercise ? (
          <section
            ref={setsRef}
            className="bg-[#f3f0e6] text-[#0f1b3d] rounded-3xl shadow-2xl border border-white/70 overflow-hidden space-y-6 p-8 md:p-10"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#b38b00] font-semibold">
                Cambridge Practice
              </p>
              <h2 className="text-3xl font-black">
                Use of English – Multiple Choice
              </h2>
              <p className="text-slate-700">
                Paso 1: elige un set. Paso 2: lee y responde. Todo viene del
                JSON.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exercises.map((exercise, idx) => (
                <div
                  key={exercise.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-md p-5 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0f1b3d] text-[#f3f0e6] text-base font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] px-3 py-1 rounded-full font-semibold bg-[#c7dcff] text-[#0f1b3d]">
                      Disponible
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-[#b38b00]">
                    Set {idx + 1}
                  </p>
                  <h3 className="text-xl font-semibold mb-1 text-[#0f1b3d]">
                    {exercise.title}
                  </h3>
                  <p className="text-sm text-slate-700 mb-4">
                    Nivel: {exercise.level}. Items: {exercise.questions.length}.
                  </p>
                  <button
                    onClick={() => handleSelectSet(exercise.id)}
                    className="mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[#0f1b3d] text-[#f3f0e6] hover:bg-[#132a63] transition"
                  >
                    Desarrollar
                  </button>
                </div>
              ))}
            </div>
            <FooterBrand />
          </section>
        ) : null}

        {showExercise ? (
          <main className="grid gap-6 lg:grid-cols-3">
            <section ref={readingRef} className="lg:col-span-2 space-y-6">
              <div className="flex justify-start">
                <button
                  onClick={handleBackToMenu}
                  className="px-4 py-2 rounded-full bg-[#ffd200] text-[#0f1b3d] font-semibold hover:bg-[#ffde33] transition"
                >
                  ← Volver al menú
                </button>
              </div>
              <article className="rounded-3xl shadow-2xl overflow-hidden border border-slate-800 bg-slate-900/80">
                <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-800/70 bg-slate-900/70">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[#ffd200]">
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-[#ffd200]/20 text-[#ffd200] font-bold">
                      {currentExercise.level}
                    </span>
                    <span>Reading Text</span>
                  </div>
                  {currentExercise.image?.includes("drive.google.com") ? (
                    <div className="flex items-center gap-2 text-white text-sm">
                      <span className="text-slate-300">Zoom</span>
                      <button
                        onClick={() => setZoom((z) => Math.max(0.7, +(z - 0.1).toFixed(2)))}
                        className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-[#ffd200]"
                        aria-label="Reducir zoom"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-slate-100">{Math.round(zoom * 100)}%</span>
                      <button
                        onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))}
                        className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-[#ffd200]"
                        aria-label="Aumentar zoom"
                      >
                        +
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="px-6 pb-6 pt-2 space-y-3 bg-slate-900/60">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    {currentExercise.title}
                  </h2>
                </div>

                {currentExercise.image?.includes("drive.google.com") ? (
                  <div className="relative w-full overflow-hidden bg-[#0f1b3d]">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051535]/50 to-[#051535]/80 pointer-events-none" />
                    <div className="overflow-auto p-4">
                      <div
                        style={{
                          transform: `scale(${zoom})`,
                          transformOrigin: "top left",
                          width: `${100 / zoom}%`,
                        }}
                      >
                        <iframe
                          title={currentExercise.title}
                          src={currentExercise.image.replace("/view", "/preview")}
                          className="w-full h-[420px] md:h-[520px] border-0 rounded-2xl"
                          allow="autoplay"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative h-[280px] md:h-[340px] w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(5,21,53,0.15) 0%, rgba(5,21,53,0.7) 65%, rgba(5,21,53,0.9) 100%), url('${currentExercise.image || ""}')`,
                      backgroundColor: currentExercise.image ? undefined : "#0f1b3d",
                    }}
                  />
                )}
              </article>

              <section className="space-y-4">
                {currentExercise.questions.map((question, index) => {
                  const selected = answers[question.id];
                  const optionLabel = (i) => String.fromCharCode(65 + i);
                  return (
                    <div
                      key={question.id}
                      className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd200]/20 text-[#ffd200] font-semibold">
                          {index + 1}
                        </span>
                        <p className="text-lg text-white leading-snug">
                          {question.question}
                        </p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selected === optionIndex;
                          const isCorrect =
                            showResults && optionIndex === question.answer;
                          const isWrong =
                            showResults &&
                            isSelected &&
                            optionIndex !== question.answer;

                          return (
                            <button
                              key={option}
                              onClick={() =>
                                handleAnswer(question.id, optionIndex)
                              }
                              className={`text-left rounded-xl border px-4 py-3 transition-all duration-150 ${
                                isSelected
                                  ? "border-[#ffd200] bg-[#ffd200]/10 text-white shadow-[0_0_0_1px_rgba(255,210,0,0.25)]"
                                  : "border-slate-800 bg-slate-950/60 text-slate-100 hover:border-[#ffd200]/40 hover:bg-slate-900"
                              } ${
                                isCorrect
                                  ? "border-green-400 bg-green-500/10"
                                  : ""
                              } ${
                                isWrong ? "border-red-400 bg-red-500/10" : ""
                              }`}
                            >
                              {optionLabel(optionIndex)}. {option}
                            </button>
                          );
                        })}
                      </div>
                      {showResults ? (
                        <p
                          className={`mt-3 text-sm font-semibold ${
                            selected === question.answer
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {selected === question.answer
                            ? "Correcto"
                            : `Respuesta: ${optionLabel(
                                question.answer
                              )}. ${question.options[question.answer]}`}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </section>
            </section>

            <aside className="space-y-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow">
                <h3 className="text-xl font-semibold text-white mb-2">Estado</h3>
                <p className="text-slate-300">
                  Revisa tus respuestas cuando estes listo y valida el feedback.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#ffd200]/20 text-[#ffd200] font-semibold">
                    {correctCount}
                  </span>
                  <span>
                    Respuestas correctas de {totalQuestions} preguntas
                  </span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#ffd200] transition-all duration-300"
                    style={{
                      width:
                        totalQuestions === 0
                          ? "0%"
                          : `${(correctCount / totalQuestions) * 100}%`,
                    }}
                  />
                </div>
                {showResults ? (
                  <div className="mt-3 text-sm text-slate-400">
                    Retroalimentacion mostrada.
                  </div>
                ) : null}
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow space-y-3">
                <button
                  onClick={() => setShowResults(true)}
                  className="w-full rounded-lg bg-[#ffd200] text-slate-900 font-semibold py-3 hover:bg-[#ffde33] transition-colors shadow-md"
                >
                  Revisar respuestas
                </button>
                <button
                  onClick={() => {
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className="w-full rounded-lg border border-slate-700 text-white font-semibold py-3 hover:border-[#ffd200] transition-colors"
                >
                  Limpiar respuestas
                </button>
              </div>
              <FooterBrand />
            </aside>
          </main>
        ) : null}
      </div>
    </div>
  );
};

export default ReadingComprehension;
