import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import quizzesData from "../data/quizbank01.json";

export default function Quizbank01() {
  const tests = quizzesData.tests;
  const [selectedTest, setSelectedTest] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [log, setLog] = useState([]);

  const questions = tests[selectedTest].questions;
  const totalQuestions = questions.length;

  useEffect(() => {
    setCurrentQuestion(0);
    setUserAnswer("");
    setShowResult(false);
    setScore(0);
    setLog([]);
    setFeedback(null);
  }, [selectedTest]);

  function handleSubmit() {
    const q = questions[currentQuestion];
    const correct = userAnswer.trim().toLowerCase() === q.answer.toLowerCase();
    if (correct) setScore(s => s + 1);

    setLog(l => [
      ...l,
      {
        id: q.id,
        userAnswer,
        correctAnswer: q.answer,
        isCorrect: correct
      }
    ]);

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
      <div className="flex flex-wrap gap-3 mb-6">
        {tests.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTest(idx)}
            className={`rounded-2xl px-5 py-2 font-semibold shadow-md transition-all duration-200 ${
              selectedTest === idx
                ? "bg-gradient-to-r from-blue-700 to-indigo-900 text-yellow-400 scale-105"
                : "bg-[#222439] hover:bg-[#1b1d2b] text-gray-400"
            }`}
          >
            Nivel {idx + 1}
          </button>
        ))}
      </div>

      {!showResult ? (
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <div className="bg-gradient-to-br from-[#242644]/80 to-[#1b1c2a]/80 border border-[#3a3e58] shadow-2xl rounded-2xl p-6 flex flex-col gap-4">
            <div className="text-xl md:text-2xl font-bold text-yellow-400 drop-shadow">
              {questions[currentQuestion].question}
            </div>
            <input
              autoFocus
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !feedback) handleSubmit();
              }}
              className="bg-[#191a23] border border-[#353863] rounded-xl p-3 text-lg text-gray-200 outline-none focus:border-yellow-400 transition"
              placeholder="Type your answer..."
            />
            <button
              onClick={feedback ? handleNext : handleSubmit}
              disabled={!userAnswer.trim() && !feedback}
              className="bg-gradient-to-r from-indigo-700 to-blue-900 text-yellow-300 font-bold rounded-xl px-8 py-2 hover:from-indigo-900 hover:to-blue-800 transition-all disabled:opacity-50"
            >
              {feedback ? (currentQuestion + 1 === totalQuestions ? "Finish" : "Next") : "Submit"}
            </button>
            <div className="text-sm text-gray-500 text-right">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>

            {feedback && (
              <div className={`p-4 rounded-xl mt-4 ${feedback.correct ? 'bg-green-800' : 'bg-red-800'}`}>
                <div className="font-semibold">
                  {feedback.correct ? 'Correct!' : 'Incorrect'}
                </div>
                <div className="mt-2 text-sm">
                  {!feedback.correct && (
                    <><strong>Correct Answer:</strong> {feedback.correctAnswer}<br/></>
                  )}
                  <strong>Example:</strong> {feedback.example}
                  <br />
                  <strong>Context:</strong> {feedback.context}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <div className="bg-gradient-to-br from-[#242644]/80 to-[#1b1c2a]/80 border border-[#3a3e58] shadow-2xl rounded-2xl p-6">
            <div className="text-3xl font-extrabold text-yellow-400 mb-4">
              Test Complete! 🎉
            </div>
            <div className="text-lg text-gray-200 mb-4">
              Score: {score} / {totalQuestions}
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {log.map(entry => (
                <div
                  key={entry.id}
                  className="p-3 rounded-lg bg-[#191a23] flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold">Q{entry.id}.</div>
                    <div className="text-sm">Your: {entry.userAnswer}</div>
                    <div className="text-sm">Ans: {entry.correctAnswer}</div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      entry.isCorrect ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {entry.isCorrect ? '✔️' : '❌'}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={retry}
              className="mt-6 bg-gradient-to-r from-purple-700 to-blue-900 text-yellow-300 font-bold rounded-xl px-8 py-2 hover:from-purple-900 hover:to-blue-800 transition-all"
            >
              Retry Test
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
