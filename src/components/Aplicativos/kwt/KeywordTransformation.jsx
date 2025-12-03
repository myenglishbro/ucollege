import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import exercisesData from "./data/keywordExercises.json";

export default function KeywordTransformation() {
  const levels = exercisesData.levels;
  const QUESTION_TIME = 45;
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
      <div className="min-h-screen bg-gradient-to-br from-[#f7f3e9] via-[#f1ecdf] to-[#e7dfc8] text-slate-800 flex items-center justify-center px-6 py-12 font-serif">
        <div className="max-w-4xl w-full">
          <div className="bg-white/80 border border-[#d8c7a0] shadow-lg rounded-2xl p-10 backdrop-blur">
            <p className="uppercase tracking-[0.3em] text-xs text-[#7a5a2f] mb-3">Cambridge Paper Lab</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1f3553] mb-4">Keyword Simulation</h1>
            <p className="text-lg text-[#3a495f] mb-8 max-w-3xl">
              Elige un nivel y practica transformaciones al estilo de los papeles Cambridge. Mantente fiel a la palabra clave y al sentido de la frase.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {levels.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedLevel(idx)}
                  className="group relative px-6 py-4 bg-[#faf7f0] border border-[#d8c7a0] rounded-xl text-lg font-semibold text-[#1f3553] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition" />
                  Nivel {idx + 1}
                </button>
              ))}
            </div>
            <div className="mt-8 text-sm text-[#4a5568]">
              Instruccion breve: conserva el significado original, usa la palabra clave sin cambiarla y ajusta la gramatica para que la frase sea correcta.
            </div>
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
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3e9] via-[#f1ecdf] to-[#e7dfc8] text-slate-800 px-4 py-10 font-serif">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <p className="uppercase tracking-[0.3em] text-xs text-[#7a5a2f]">Cambridge Practice</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f3553]">
            Keyword Transformation · Nivel {selectedLevel + 1}
          </h1>
          <p className="text-[#4a5568] mt-2">
            Replica el tono de examen en papel: responde con calma, cuida la ortografia y revisa cada matiz del significado original.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 bg-white/80 border border-[#d8c7a0] rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#7a5a2f] mb-2">Niveles</div>
              <div className="flex flex-wrap gap-2">
                {levels.map((_, idx) => {
                  const active = idx === selectedLevel;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedLevel(idx)}
                      className={`px-3 py-2 rounded-lg border text-sm transition ${active
                        ? "bg-[#1f3553] text-white border-[#1f3553] shadow"
                        : "bg-[#faf7f0] text-[#1f3553] border-[#d8c7a0] hover:-translate-y-[2px]"
                      }`}
                    >
                      Nivel {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#7a5a2f] mb-2">Progreso</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#efe6d2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1f3553] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm text-[#1f3553] font-semibold">{progress}%</span>
              </div>
              <p className="text-xs text-[#4a5568] mt-1">
                Pregunta {currentQ + 1} de {total} · Aciertos {score}
              </p>
            </div>

            <div className="text-xs text-[#4a5568] leading-relaxed bg-[#fdfaf3] border border-[#e6d8b5] rounded-xl p-3">
              <strong className="block text-[#1f3553] mb-1">Formato paper based</strong>
              <span>Escribe la frase completa en mayusculas o minusculas; evita abreviaturas. Al finalizar, revisa el reporte de respuestas.</span>
            </div>
          </aside>

          <div className="flex-1 space-y-6">
            {!feedback ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/85 border border-[#d8c7a0] rounded-2xl shadow-lg p-8"
              >
                <div className="text-sm uppercase tracking-[0.2em] text-[#7a5a2f] mb-1">Frase original</div>
                <div className="text-lg text-[#1f3553] italic mb-4">{q.original}</div>

                <div className="text-sm uppercase tracking-[0.2em] text-[#7a5a2f] mb-1">Transforma usando</div>
                <div className="text-lg font-semibold text-[#1f3553] mb-6">
                  {q.transformed} <span className="text-[#7a5a2f]">(palabra clave: {q.keyword})</span>
                </div>

                <div className="flex items-center justify-between bg-[#fdfaf3] border border-[#e6d8b5] rounded-xl px-4 py-3 mb-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-[#7a5a2f]">Tiempo restante</div>
                    <div className="text-sm text-[#4a5568]">Gestiona ritmo como en el paper</div>
                  </div>
                  <div className={`text-xl font-bold tabular-nums px-3 py-1 rounded-lg ${timeLeft <= 10 ? "bg-[#a4342a] text-white" : "text-[#1f3553] bg-white"}`}>
                    {String(timeLeft).padStart(2, "0")}s
                  </div>
                </div>

                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className="w-full p-4 bg-[#fdfaf3] border border-[#d8c7a0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1f3553]/50 text-[#1f3553] placeholder:text-[#9ca3af] mb-4"
                  placeholder="Escribe la transformacion completa..."
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="px-6 py-3 bg-[#1f3553] text-white rounded-xl font-semibold shadow hover:-translate-y-0.5 transition disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    Enviar respuesta
                  </button>
                  <span className="text-sm text-[#4a5568]">Recuerda no modificar la palabra clave.</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/85 border border-[#d8c7a0] rounded-2xl shadow-lg p-8"
              >
                <div className={`pb-2 font-semibold text-lg ${feedback.correct ? "text-emerald-700" : "text-[#a4342a]"}`}>
                  {feedback.correct ? "Respuesta correcta" : "Revisa la respuesta"}
                </div>
                {!feedback.correct && (
                  <div className="text-sm text-[#4a5568] mb-3">
                    <strong className="text-[#1f3553]">Solucion modelo:</strong> {feedback.correctAnswer}
                  </div>
                )}
                <div className="flex gap-3">
                  {currentQ + 1 < total ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-[#1f3553] text-white rounded-xl font-semibold shadow hover:-translate-y-0.5 transition"
                  >
                    Siguiente item
                  </button>
                ) : (
                  <button
                      onClick={retry}
                      className="px-6 py-3 bg-[#2d6a4f] text-white rounded-xl font-semibold shadow hover:-translate-y-0.5 transition"
                    >
                      Repetir nivel
                    </button>
                  )}
                  <button
                    onClick={() => setFeedback(null)}
                    className="px-5 py-3 bg-[#fdfaf3] text-[#1f3553] border border-[#d8c7a0] rounded-xl font-semibold hover:-translate-y-0.5 transition"
                  >
                    Revisar item
                  </button>
                </div>
                <div className="mt-4 space-y-2 text-sm text-[#4a5568] bg-[#fdfaf3] border border-[#e6d8b5] rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span>Tiempo empleado</span>
                    <span className="font-semibold text-[#1f3553]">{feedback.timeTaken || 0}s</span>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[#7a5a2f] mb-1">Feedback</div>
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
                className="bg-white/90 border border-[#d8c7a0] rounded-2xl shadow p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#1f3553]">Reporte Nivel {selectedLevel + 1}</h2>
                  <div className="text-sm text-[#4a5568]">
                    Puntuacion: <span className="font-semibold text-[#1f3553]">{score}</span> / {total}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-[#fdfaf3] border border-[#e6d8b5] rounded-lg text-sm text-[#4a5568]">
                    Aciertos: <span className="text-[#1f3553] font-semibold">{score}</span>
                  </div>
                  <div className="px-4 py-2 bg-[#fdfaf3] border border-[#e6d8b5] rounded-lg text-sm text-[#4a5568]">
                    Tiempo medio: <span className="text-[#1f3553] font-semibold">
                      {log.length ? Math.round(log.reduce((s, e) => s + (e.timeTaken || 0), 0) / log.length) : 0}s
                    </span>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto border border-[#e6d8b5] rounded-xl">
                  <div className="grid grid-cols-6 gap-2 text-sm bg-[#fdfaf3] px-4 py-2 text-[#7a5a2f] uppercase tracking-[0.08em]">
                    <span>Item</span>
                    <span className="col-span-2">Tu respuesta</span>
                    <span>Estado</span>
                    <span>Modelo</span>
                    <span>Tiempo</span>
                  </div>
                  {log.map(entry => (
                    <div key={entry.id} className="grid grid-cols-6 gap-2 px-4 py-2 border-t border-[#e6d8b5] text-sm text-[#1f3553]">
                      <span className="font-semibold">Q{entry.id}</span>
                      <span className="col-span-2 break-words">
                        {entry.input || "Respuesta vacia"}
                      </span>
                      <span className={entry.correct ? "text-emerald-700 font-semibold" : "text-[#a4342a] font-semibold"}>
                        {entry.correct ? "Correcto" : entry.timedOut ? "Tiempo" : "Incorrecto"}
                      </span>
                      <span className="break-words">{entry.correctAnswer}</span>
                      <span>{entry.timeTaken ? `${entry.timeTaken}s` : "-"}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#fdfaf3] border border-[#e6d8b5] rounded-xl p-4 space-y-2">
                  <div className="text-sm uppercase tracking-[0.14em] text-[#7a5a2f]">Video guia nivel {selectedLevel + 1}</div>
                  <p className="text-sm text-[#4a5568]">Repasa la explicacion completa para este nivel.</p>
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#d8c7a0] bg-black">
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
                className="text-sm text-[#1f3553] underline underline-offset-4"
              >
                Volver al menu de niveles
              </button>
              <div className="text-xs text-[#4a5568]">
                Estilo papel Cambridge: responde con claridad y revisa puntuacion y mayusculas.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
