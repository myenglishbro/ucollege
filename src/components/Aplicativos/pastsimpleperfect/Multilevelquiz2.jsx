import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import levelsData from "../data/levelsExercises2.json";

export default function MultiLevelQuiz2() {
  const levels = levelsData.levels;
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [unlockedLevels, setUnlockedLevels] = useState({ 0: true });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setAnswersLog([]);
    setCodeInput("");
    setQuizFinished(false);
  }, [selectedLevel]);

  // Vertical timeline menu with images
  if (selectedLevel === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05020d] to-[#1d1b29] flex flex-col items-center justify-center p-4 text-gray-200">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-400 mb-8 drop-shadow-lg animate-pulse">
          Past Simple vs Present Perfect
        </h1>
        <div className="relative w-full max-w-lg flex flex-col items-center px-4 py-8">
          {/* Vertical line */}
          <div className="absolute top-16 bottom-16 left-1/2 w-1 bg-gray-800 transform -translate-x-1/2"></div>
          {levels.map((lvl, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={`relative w-full flex mb-6 items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              {/* Image thumbnail */}
              <img
                src={lvl.thumbnail}
                alt={`Level ${lvl.level}`}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-contain mr-2"
                style={{ order: idx % 2 === 0 ? 0 : 1 }}
              />
              <div className="relative flex flex-col items-center">
                <button
                  onClick={() => setSelectedLevel(idx)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold transition-shadow
                    ${unlockedLevels[idx]
                      ? 'bg-gradient-to-tr from-indigo-500 to-indigo-300 text-black shadow-[0_0_15px_rgba(130,130,200,0.6)]'
                      : 'bg-gray-700 text-gray-500 shadow-inner'
                  }`}>
                  {idx + 1}
                </button>
                {unlockedLevels[idx] && (
                  <motion.span
                    className="absolute -bottom-3 w-3 h-3 bg-indigo-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  const level = levels[selectedLevel];
  const exercises = level.exercises;
  const q = exercises[currentQuestion];

  const handleSubmitAnswer = () => {
    const isCorrect = selectedOption === q.answer;
    if (isCorrect) setScore(s => s + 1);
    setAnswersLog(log => [
      ...log,
      { prompt: q.prompt, selected: selectedOption, answer: q.answer, correct: isCorrect }
    ]);
    setSelectedOption("");
    if (currentQuestion + 1 < exercises.length) {
      setCurrentQuestion(i => i + 1);
    } else {
      setQuizFinished(true);
      const total = isCorrect ? score + 1 : score;
      if (total === exercises.length) {
        setUnlockedLevels(prev => ({ ...prev, [selectedLevel + 1]: true }));
      }
    }
  };

  // Locked screen
  if (selectedLevel > 0 && !unlockedLevels[selectedLevel]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05020d] to-[#1d1b29] flex items-center justify-center p-6 text-gray-200">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1f2130] p-8 rounded-3xl border border-gray-700 shadow-2xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">Level {selectedLevel + 1} Locked</h2>
          <p className="mb-4">Enter code to unlock:</p>
          <input
            type="text"
            value={codeInput}
            onChange={e => setCodeInput(e.target.value)}
            className="w-full p-3 bg-[#100f1e] border border-gray-600 rounded-lg text-lg mb-4"
            placeholder="Access Code"
          />
          <button
            onClick={() =>
              codeInput === level.prerequisiteCode
                ? setUnlockedLevels(prev => ({ ...prev, [selectedLevel]: true }))
                : alert('Wrong code')
            }
            className="w-full py-3 bg-gradient-to-tr from-indigo-500 to-indigo-300 text-black font-bold rounded-3xl mb-2"
          >Unlock</button>
          <button onClick={() => setSelectedLevel(null)} className="w-full py-2 text-gray-400 hover:text-gray-200">Back to Menu</button>
        </motion.div>
      </div>
    );
  }

  // Results screen
  if (quizFinished) {
    const allCorrect = score === exercises.length;
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05020d] to-[#1d1b29] flex flex-col items-center py-8 text-gray-200">
        <button onClick={() => setSelectedLevel(null)} className="self-start ml-4 mb-4 text-gray-400 hover:text-gray-200">Menu</button>
        <div className="w-full max-w-xl space-y-6 p-4">
          <h2 className="text-3xl font-bold text-indigo-400 text-center">Level {level.level} Results</h2>
          <div className="bg-[#1f2130] p-6 rounded-3xl space-y-4">
            {answersLog.map((e, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#2a2d48]">
                <p className="italic mb-1">{e.prompt}</p>
                <p>Your: <span className={e.correct ? 'text-indigo-300' : 'text-red-400'}>{e.selected}</span></p>
                {!e.correct && <p>Correct: <span className="text-indigo-300">{e.answer}</span></p>}
              </div>
            ))}
            <p className="font-bold">Score: {score} / {exercises.length}</p>
          </div>
          {allCorrect && (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-indigo-700 p-6 rounded-3xl text-center space-y-3">
              <p className="text-xl font-bold">You earned code:</p>
              <p className="text-2xl font-extrabold text-yellow-300">{level.levelCode}</p>
              <button onClick={() => setSelectedLevel(selectedLevel + 1)} className="mt-2 px-6 py-2 bg-gradient-to-tr from-indigo-300 to-indigo-500 rounded-3xl font-bold">
                Next Level
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Quiz interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05020d] to-[#1d1b29] flex flex-col items-center py-8 text-gray-200">
      <button onClick={() => setSelectedLevel(null)} className="self-start ml-4 mb-4 text-gray-400 hover:text-gray-200">Menu</button>
      <div className="w-full max-w-xl space-y-6 p-4">
        <h2 className="text-3xl font-bold text-indigo-400 text-center">Level {level.level} ({currentQuestion + 1}/{exercises.length})</h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1f2130] p-6 rounded-3xl border border-gray-700 shadow-2xl space-y-4">
          <p className="text-lg text-gray-100">{q.prompt}</p>
          <div className="grid grid-cols-1 gap-4">
            {q.options.map(opt => (
              <motion.button key={opt} onClick={() => setSelectedOption(opt)} whileTap={{ scale: 0.95 }} className={`py-3 px-4 rounded-3xl border border-gray-600 text-lg transition ${selectedOption===opt ? 'bg-indigo-600 text-white' : 'bg-[#2a2d48] text-gray-200'}`}>
                {opt}
              </motion.button>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <button onClick={handleSubmitAnswer} disabled={!selectedOption} className="px-6 py-2 bg-gradient-to-tr from-indigo-500 to-indigo-300 text-black rounded-3xl font-bold disabled:opacity-50">Submit</button>
            <div className="text-gray-400">Score: {score}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
