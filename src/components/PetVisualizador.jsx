import React, { useMemo, useState } from "react";
import petData from "./data/petvisualizador.json";

const PetVisualizador = () => {
  const items = useMemo(() => petData.items || [], []);
  const [selectedId, setSelectedId] = useState(items[0]?.id || null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId),
    [items, selectedId]
  );

  const questions = selected?.questions || [];
  const optionLabel = (index) => String.fromCharCode(97 + index);
  const labelStyleMap = {
    email: {
      border: "#cbd5f5",
      bg: "#f5f7ff",
      tagBg: "#e0e7ff",
      tagColor: "#1e3a8a"
    },
    notice: {
      border: "#c7d2fe",
      bg: "#f8fafc",
      tagBg: "#e2e8f0",
      tagColor: "#334155"
    },
    competition: {
      border: "#fde68a",
      bg: "#fffbeb",
      tagBg: "#fef3c7",
      tagColor: "#92400e"
    },
    "text message": {
      border: "#bae6fd",
      bg: "#f0f9ff",
      tagBg: "#dbeafe",
      tagColor: "#1d4ed8"
    },
    warning: {
      border: "#fecaca",
      bg: "#fff1f2",
      tagBg: "#fee2e2",
      tagColor: "#b91c1c"
    }
  };
  const resolveLabelStyles = (label) => {
    const key = (label || "").toLowerCase().trim();
    return (
      labelStyleMap[key] || {
        border: "#e2e8f0",
        bg: "#f8fafc",
        tagBg: "#e2e8f0",
        tagColor: "#334155"
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold">
            PET Visualizador
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Real World Multiple Choice
          </h1>
          <p className="text-sm text-slate-600">
            Selecciona un set y responde las preguntas. Las correctas se marcaran.
          </p>
        </header>

        {showIntro ? (
          <div className="flex items-center justify-center">
            <div className="relative max-w-3xl mx-auto h-[360px] md:h-[420px] w-full">
            {items
              .map((item, idx) => ({ item, idx }))
              .filter(({ idx }) => idx >= activeIndex && idx <= activeIndex + 2)
              .reverse()
              .map(({ item, idx }) => {
                const offset = idx - activeIndex;
                const isActive = offset === 0;
                return (
                  <div
                    key={item.id}
                    className="absolute left-0 right-0 rounded-2xl p-[1px]"
                    style={{
                      top: 0,
                      transform: `translateY(${offset * 16}px) scale(${1 - offset * 0.04})`,
                      opacity: 1 - offset * 0.2,
                      background: "linear-gradient(140deg, #0f1f30, #2bb6a8)",
                      boxShadow: "0 18px 50px rgba(12,19,42,0.18)",
                      pointerEvents: isActive ? "auto" : "none"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(item.id);
                        setAnswers({});
                        setShowResults(false);
                        setShowIntro(false);
                      }}
                      className="w-full h-full rounded-2xl bg-white p-6 md:p-8 text-left transition-transform duration-200 hover:-translate-y-1"
                      style={{ border: "1px solid #e5e7eb" }}
                    >
                      <div className="h-1.5 rounded-full mb-4" style={{ background: "linear-gradient(90deg, #f2b76b, #2bb6a8)" }} />
                      <div className="flex items-center justify-between">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                          style={{ background: "#f3f4f6", color: "#0f1f30" }}
                        >
                          {idx + 1}
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#e2e8f0", color: "#0f1f30" }}>
                          Available
                        </span>
                      </div>
                      <div className="mt-5">
                        <p className="text-sm uppercase tracking-[0.16em] text-slate-500 mb-2">Set {item.id}</p>
                        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">{item.title}</h2>
                        <p className="text-sm text-slate-600 mt-2">
                          {item.questions?.length || 0} questions
                        </p>
                      </div>
                    </button>
                  </div>
                );
              })}
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className="absolute -left-4 md:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold"
              style={{
                background: "#fff",
                color: "#0f1f30",
                border: "1px solid #e5e7eb",
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
              onClick={() => setActiveIndex((prev) => Math.min(items.length - 1, prev + 1))}
              disabled={activeIndex >= items.length - 1}
              className="absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold"
              style={{
                background: "#fff",
                color: "#0f1f30",
                border: "1px solid #e5e7eb",
                boxShadow: "0 10px 24px rgba(12,19,42,0.12)",
                opacity: activeIndex >= items.length - 1 ? 0.4 : 1,
                cursor: activeIndex >= items.length - 1 ? "not-allowed" : "pointer"
              }}
              aria-label="Next set"
            >
              &#x203A;
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              <span>Use arrows to browse</span>
            </div>
          </div>
          </div>
        ) : (
          <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">
                {selected?.title || "Sin seleccion"}
              </div>
              <button
                type="button"
                onClick={() => setShowIntro(true)}
                className="rounded-full border px-3 py-1 text-xs font-semibold"
                style={{ borderColor: "#e5e7eb", color: "#0f1f30" }}
              >
                Back to sets
              </button>
            </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const chosen = answers[question.id];
                    return (
                      <div key={question.id} className="rounded-xl border border-slate-200 p-4">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-semibold">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            {(() => {
                              const styles = resolveLabelStyles(question.label);
                              return (
                                <div
                                  className="rounded-lg border p-3 text-sm text-slate-800 whitespace-pre-line"
                                  style={{ borderColor: styles.border, background: styles.bg }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div
                                      className="text-xs uppercase tracking-[0.2em] font-semibold px-2 py-1 rounded-full"
                                      style={{ background: styles.tagBg, color: styles.tagColor }}
                                    >
                                      {question.label || "Text"}
                                    </div>
                                  </div>
                                  <p className="mt-2">{question.prompt}</p>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {question.options.map((option, optionIndex) => {
                            const isCorrect = optionIndex === question.answer;
                            const isSelected = chosen === optionIndex;
                            return (
                              <button
                                key={option}
                                onClick={() =>
                                  setAnswers((prev) => ({
                                    ...prev,
                                    [question.id]: optionIndex
                                  }))
                                }
                                className="rounded-lg border px-3 py-2 text-left text-sm transition"
                                style={{
                                  borderColor: showResults
                                    ? isCorrect
                                      ? "#16a34a"
                                      : isSelected
                                      ? "#dc2626"
                                      : "#e5e7eb"
                                    : isSelected
                                    ? "#0f1f30"
                                    : "#e5e7eb",
                                  backgroundColor: showResults
                                    ? isCorrect
                                      ? "rgba(22,163,74,0.08)"
                                      : isSelected
                                      ? "rgba(220,38,38,0.08)"
                                      : "#fff"
                                    : isSelected
                                    ? "rgba(15,31,48,0.08)"
                                    : "#fff",
                                  color: "#0f172a"
                                }}
                              >
                                {optionLabel(optionIndex)}. {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowResults(true)}
                    className="px-5 py-2 rounded-full text-sm font-semibold"
                    style={{ background: "#0f1f30", color: "#fff" }}
                  >
                    Revisar respuestas
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers({});
                      setShowResults(false);
                    }}
                    className="px-5 py-2 rounded-full text-sm font-semibold"
                    style={{ background: "#e2e8f0", color: "#0f172a" }}
                  >
                    Limpiar
                  </button>
                </div>
              </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PetVisualizador;
