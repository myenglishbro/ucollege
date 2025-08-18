// quiz/components/ResultsPanel.jsx
import React from "react";
import { ACCENT, BG_MAIN } from "./constants";

export default function ResultsPanel({
  levelLabel,
  levelCode,
  answersLog,   // [{ prompt, selected, answer, correct, explanation? }]
  score,
  total,
  canGoNext,
  onNext,
}) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const correct = score;
  const wrong = Math.max(0, total - score);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: BG_MAIN }}
    >
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-16 pb-10">
        {/* Card principal */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ color: ACCENT }}
            >
              Resultados — Nivel {levelLabel}
            </h2>

            {/* Chips de resumen */}
            <div className="flex items-center gap-2">
              <span
                className="text-xs md:text-sm px-3 py-1 rounded-full border"
                style={{ borderColor: ACCENT, color: ACCENT, background: "#EEF1FF" }}
                title="Preguntas correctas"
              >
                ✅ {correct} correctas
              </span>
              <span
                className="text-xs md:text-sm px-3 py-1 rounded-full border border-red-200 text-red-600 bg-red-50"
                title="Preguntas incorrectas"
              >
                ❌ {wrong} incorrectas
              </span>
            </div>
          </div>

          {/* Progreso */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: ACCENT }}>
                Progreso
              </span>
              <span className="text-sm font-semibold" style={{ color: ACCENT }}>
                {percent}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-2"
                style={{
                  width: `${percent}%`,
                  backgroundColor: ACCENT,
                  transition: "width .4s ease",
                }}
              />
            </div>
          </div>

          {/* Código desbloqueado (si aplica) */}
          {canGoNext && (
            <div className="mb-6">
              <div className="text-sm text-gray-700">
                Código desbloqueado:{" "}
                <span className="font-mono px-2 py-1 rounded-md border border-gray-200 bg-gray-50">
                  {levelCode || "—"}
                </span>
              </div>
            </div>
          )}

          {/* Lista de respuestas */}
          <div className="space-y-4">
            {answersLog.map((e, i) => {
              const isOk = e.correct;
              return (
                <div
                  key={i}
                  className="rounded-xl border bg-white overflow-hidden"
                  style={{
                    borderColor: isOk ? "#C7D2FE" : "#FECACA", // azul claro / rojo claro
                  }}
                >
                  <div className="px-4 py-3 border-b bg-gray-50/70">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg"
                        aria-hidden
                        style={{ color: isOk ? ACCENT : "#DC2626" }}
                      >
                        {isOk ? "✅" : "❌"}
                      </span>
                      <p className="font-semibold text-gray-900">{e.prompt}</p>
                    </div>
                  </div>

                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-800">
                      Tu respuesta:{" "}
                      <strong style={{ color: isOk ? ACCENT : "#DC2626" }}>
                        {e.selected}
                      </strong>
                    </p>

                    {!isOk && (
                      <p className="text-sm text-gray-800 mt-1">
                        Correcta:{" "}
                        <strong style={{ color: ACCENT }}>{e.answer}</strong>
                      </p>
                    )}

                    {e.explanation && e.explanation.trim() !== "" && (
                      <p className="text-xs md:text-sm text-gray-600 mt-3">
                        <span
                          className="font-semibold underline"
                          style={{ color: ACCENT }}
                        >
                          Explicación:
                        </span>{" "}
                        {e.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer de acciones */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <p className="text-base md:text-lg font-semibold" style={{ color: ACCENT }}>
              Puntuación: {score} / {total}
            </p>

            {canGoNext && (
              <button
                onClick={onNext}
                className="px-5 py-2 rounded-xl font-semibold shadow-sm border"
                style={{
                  backgroundColor: ACCENT,
                  color: "#fff",
                  borderColor: ACCENT,
                }}
              >
                Siguiente nivel →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
