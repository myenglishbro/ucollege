import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import exercisesData from "./data/keywordExercises.json";

export default function KeywordTransformation() {
  const levels = exercisesData.levels;
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (selectedLevel !== null) {
      setCurrentQ(0);
      setInput("");
      setFeedback(null);
      setScore(0);
      setLog([]);
    }
  }, [selectedLevel]);

  if (selectedLevel === null) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-8">Selecciona un Nivel</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {levels.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedLevel(idx)}
              className="px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg"
            >
              Nivel {idx + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const questions = levels[selectedLevel].questions;
  const total = questions.length;
  const q = questions[currentQ];

  function handleSubmit() {
    const correct = input.trim().toUpperCase() === q.answer.toUpperCase();
    if (correct) setScore(s => s + 1);

    setLog(l => [...l, { id: q.id, input, correct }]);
    setFeedback({ correct, correctAnswer: q.answer });
  }

  function handleNext() {
    if (currentQ + 1 < total) {
      setCurrentQ(i => i + 1);
      setInput("");
      setFeedback(null);
    }
  }

  function retry() {
    setCurrentQ(0);
    setInput("");
    setFeedback(null);
    setScore(0);
    setLog([]);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Keyword Transformation - Nivel {selectedLevel + 1}</h1>

      {!feedback ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-2xl w-full max-w-2xl"
        >
          <div className="mb-2 text-sm text-gray-400">
            Original: <span className="italic">{q.original}</span>
          </div>
          <div className="mb-4 text-lg">
            {q.transformed}
            <span className="font-bold ml-1">({q.keyword})</span>
          </div>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 mb-4"
            placeholder="Complete la frase..."
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="px-6 py-2 bg-blue-600 rounded-lg font-semibold disabled:opacity-50"
          >
            Enviar
          </button>
          <div className="text-sm text-gray-500 mt-2">
            Pregunta {currentQ + 1} de {total}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-2xl w-full max-w-2xl"
        >
          <div className={`pb-2 font-semibold ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
            {feedback.correct ? '¡Correcto!' : 'Incorrecto'}
          </div>
          {!feedback.correct && (
            <div className="text-sm mb-2">
              <strong>Respuesta correcta:</strong> {feedback.correctAnswer}
            </div>
          )}
          <div className="flex gap-4">
            {currentQ + 1 < total ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-500 rounded-lg font-semibold"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={retry}
                className="px-6 py-2 bg-green-500 rounded-lg font-semibold"
              >
                Reintentar Nivel
              </button>
            )}
          </div>
        </motion.div>
      )}

      {feedback && currentQ + 1 === total && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full max-w-2xl"
        >
          <div className="text-xl font-bold mb-2">Reporte Nivel {selectedLevel + 1}</div>
          <div className="bg-gray-800 p-4 rounded-lg max-h-64 overflow-y-auto">
            {log.map(entry => (
              <div key={entry.id} className="flex justify-between items-center mb-2">
                <span>Q{entry.id}</span>
                <span className="flex-1 px-2">{entry.input || '<vacío>'}</span>
                <span>{entry.correct ? '✔️' : '❌'}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">Puntuación: {score} / {total}</div>
        </motion.div>
      )}

      <button
        onClick={() => setSelectedLevel(null)}
        className="mt-6 text-sm text-gray-400 underline"
      >
        Volver al menú de niveles
      </button>
    </div>
  );
}
