import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import quizzesData from "../data/quizbank01.json";

export default function Quizbank01() {
  const tests = quizzesData.tests;
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (selectedTest !== null) {
      setCurrentQuestion(0);
      setUserAnswer("");
      setShowResult(false);
      setScore(0);
      setLog([]);
      setFeedback(null);
    }
  }, [selectedTest]);

  // Menu para seleccionar nivel
  if (selectedTest === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#16181f] to-[#222439] text-gray-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-extrabold mb-12 text-yellow-400 drop-shadow-lg">Phrasal Verbs</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tests.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedTest(idx)}
              whileHover={{ scale: 1.05 }}
              className="py-6 px-8 bg-[#222439] hover:bg-[#2a2d48] rounded-2xl shadow-2xl border border-[#3a3e58] text-xl font-semibold text-gray-300 transition"
            >
              Nivel {idx + 1}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const questions = tests[selectedTest].questions;
  const totalQuestions = questions.length;
  const q = questions[currentQuestion];

  function handleSubmit() {
    const correct = userAnswer.trim().toLowerCase() === q.answer.toLowerCase();
    if (correct) setScore(s => s + 1);
    setLog(l => [...l, { id: q.id, userAnswer, correctAnswer: q.answer, isCorrect: correct }]);
    setFeedback({ correct, example: q.example, context: q.context, correctAnswer: q.answer });
  }

  function handleNext() {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(i => i + 1);
      setUserAnswer("");
      setFeedback(null);
    } else {
      setShowResult(true);
    }
  }

  function retry() {
    setCurrentQuestion(0);
    setUserAnswer("");
    setShowResult(false);
    setScore(0);
    setLog([]);
    setFeedback(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#16181f] to-[#222439] text-gray-200 flex flex-col items-center py-8">
      {/* Botón para regresar al menú */}
      <button
        onClick={() => setSelectedTest(null)}
        className="self-start ml-8 mb-4 text-gray-400 hover:text-gray-200 underline"
      >
        Volver al menú
      </button>

      {!showResult ? (
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <div className="bg-[#242644]/80 border border-[#3a3e58] shadow-2xl rounded-2xl p-6 space-y-6">
            <div className="text-2xl font-bold text-yellow-400 drop-shadow">
              {q.question}
            </div>
            <input
              autoFocus
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !feedback && handleSubmit()}
              className="w-full p-4 bg-[#191a23] border border-[#353863] rounded-xl text-lg text-gray-200 outline-none focus:border-yellow-400 transition"
              placeholder="Tu respuesta..."
            />
            <div className="flex justify-between items-center">
              <motion.button
                onClick={feedback ? handleNext : handleSubmit}
                whileTap={{ scale: 0.95 }}
                disabled={!userAnswer.trim() && !feedback}
                className="px-8 py-3 bg-gradient-to-r from-indigo-700 to-blue-900 text-yellow-300 font-bold rounded-xl shadow-lg disabled:opacity-50 transition"
              >
                {feedback ? (currentQuestion + 1 === totalQuestions ? 'Finalizar' : 'Siguiente') : 'Enviar'}
              </motion.button>
              <div className="text-sm text-gray-500">
                {currentQuestion + 1} / {totalQuestions}
              </div>
            </div>
            {feedback && (
              <div className={`${feedback.correct ? 'bg-green-800' : 'bg-red-800'} p-4 rounded-xl`}>
                <div className="text-xl font-semibold mb-2">
                  {feedback.correct ? '¡Correcto!' : 'Incorrecto'}
                </div>
                <div className="text-sm">
                  {!feedback.correct && <p><strong>Respuesta correcta:</strong> {feedback.correctAnswer}</p>}
                  <p><strong>Ejemplo:</strong> {feedback.example}</p>
                  <p><strong>Contexto:</strong> {feedback.context}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <div className="bg-[#242644]/80 border border-[#3a3e58] shadow-2xl rounded-2xl p-6 space-y-6">
            <div className="text-3xl font-extrabold text-yellow-400 text-center">
              🎉 Test Completado
            </div>
            <div className="text-xl text-gray-200 text-center">
              Puntuación: <span className="font-bold text-yellow-300">{score} / {totalQuestions}</span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {log.map(entry => (
                <div key={entry.id} className="flex justify-between p-3 bg-[#191a23] rounded-lg">
                  <div>
                    <p className="font-semibold">Q{entry.id}</p>
                    <p className="text-sm">Tu: {entry.userAnswer}</p>
                    <p className="text-sm">Resp: {entry.correctAnswer}</p>
                  </div>
                  <div className={`text-2xl ${entry.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {entry.isCorrect ? '✔️' : '❌'}
                  </div>
                </div>
              ))}
            </div>
            <motion.button
              onClick={retry}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-purple-700 to-blue-900 text-yellow-300 font-bold rounded-xl shadow-lg"
            >
              Reintentar Test
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
