import React, { useState, useEffect } from 'react';
import jsonData from './dataexam/useOfEnglishData.json';

// Utilidad para formatear tiempo mm:ss
const formatTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

function PartComponent({ part, data, onSubmit }) {
  const [answers, setAnswers] = useState(Array(data.questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const maxTime = 240; // Tiempo máximo por parte en segundos (4 minutos)

  const getBarColor = (percent) => {
    if (percent < 50) return 'bg-green-500';
    if (percent < 80) return 'bg-yellow-500';
    return 'bg-rose-500';
  };

  useEffect(() => {
    if (!started || submitted) return;
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [started, submitted]);

  const handleChange = (value, idx) => {
    const copy = [...answers];
    copy[idx] = value;
    setAnswers(copy);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit(part, answers, seconds);
  };

  const handleStart = () => setStarted(true);
  const nextQuestion = () => setCurrentQ(q => Math.min(q + 1, data.questions.length - 1));
  const prevQuestion = () => setCurrentQ(q => Math.max(q - 1, 0));

  // Mostrar botón de inicio si no ha comenzado
  if (!started) {
    return (
      <div className="p-6 bg-gradient-to-br from-[#12121c] to-[#1b1b2d] text-gray-100 rounded-2xl shadow-2xl my-6 border border-[#2c2c3e] text-center">
        <h2 className="text-3xl font-bold mb-4 text-teal-400 drop-shadow">🧠 {data.title}</h2>
        <p className="text-gray-400 mb-6">Click the button below when you're ready to start this part.</p>
        <button
          onClick={handleStart}
          className="px-6 py-3 text-lg bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl shadow-md transition"
        >
          🚀 Start Part
        </button>
      </div>
    );
  }

  // Slider para Part1, Part2, Part3
  if (['Part1', 'Part2', 'Part3'].includes(part)) {
    const q = data.questions[currentQ];
    const partScore = data.questions.reduce((acc, ques, i) => acc + (answers[i] === ques.answer ? 1 : 0), 0);

    return (
      <div className="p-6 bg-gradient-to-br from-[#12121c] to-[#1b1b2d] text-gray-100 rounded-2xl shadow-2xl my-6 border border-[#2c2c3e]">
        <h2 className="text-3xl font-bold mb-4 text-teal-400 drop-shadow">🧠 {data.title}</h2>

        {!submitted && (
          <div className="h-3 w-full bg-[#2d2d3d] rounded-full overflow-hidden mb-6 shadow-inner">
            <div
              className={`h-full ${getBarColor((seconds / maxTime) * 100)} transition-all duration-500 ease-out`}
              style={{ width: `${Math.min(100, (seconds / maxTime) * 100)}%` }}
            ></div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {data.passageImage && (
            <div className="md:w-1/2 flex justify-center">
              <img
                src={data.passageImage}
                alt={`Passage ${part}`}
                className="max-h-96 w-full object-contain rounded-lg shadow-inner border border-[#2e2e3e]"
              />
            </div>
          )}
          <div className="md:w-1/2">
            <p className="text-lg mb-4">
              <span className="text-teal-300 font-semibold">Q{currentQ + 1}.</span>{' '}
              {part === 'Part1' ? <span className="underline">________</span> : q.text.replace(/_+/, '_____')}
            </p>

            {part === 'Part1' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {q.options.map((opt, i) => (
                  <label key={i} className="flex items-center space-x-2 bg-[#232334] hover:bg-[#2c2c44] p-3 rounded-lg cursor-pointer transition">
                    <input
                      type="radio"
                      name={`p-${part}-${currentQ}`}
                      value={opt}
                      checked={answers[currentQ] === opt}
                      onChange={() => handleChange(opt, currentQ)}
                      disabled={submitted}
                      className="accent-teal-400"
                    />
                    <span className="text-gray-200 font-medium">{String.fromCharCode(65 + i)}. {opt}</span>
                  </label>
                ))}
              </div>
            ) : q.type === 'select' ? (
              <select
                value={answers[currentQ]}
                onChange={e => handleChange(e.target.value, currentQ)}
                disabled={submitted}
                className="w-full p-3 rounded-lg bg-[#232334] border border-[#3b3b4f] text-gray-100 mb-4"
              >
                <option value="">-- Select --</option>
                {q.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input
                type="text"
                value={answers[currentQ]}
                onChange={e => handleChange(e.target.value.toUpperCase(), currentQ)}
                disabled={submitted}
                placeholder="Your answer"
                className="w-full p-3 rounded-lg bg-[#232334] border border-[#3b3b4f] text-gray-100 mb-4"
              />
            )}

            {submitted && (
              <p className={`font-semibold mb-4 ${answers[currentQ] === q.answer ? 'text-green-400' : 'text-rose-400'}`}>
                {answers[currentQ] === q.answer ? '✔ Correct' : `✘ ${q.answer}`}
              </p>
            )}

            <div className="flex justify-between">
              <button onClick={prevQuestion} disabled={currentQ === 0} className="px-4 py-2 bg-[#3a3a4d] hover:bg-[#4a4a5f] rounded-lg text-sm">Prev</button>
              {currentQ < data.questions.length - 1 ? (
                <button onClick={nextQuestion} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm">Next</button>
              ) : (
                !submitted && (
                  <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">Submit All</button>
                )
              )}
            </div>
          </div>
        </div>

        {submitted && (
          <div className="mt-6 text-center space-y-1">
            <p><span className="text-lg font-semibold text-teal-300">Score: </span><span className="text-lg font-bold text-white">{partScore} / {data.questions.length}</span></p>
            <p className="text-sm text-gray-400">🕒 Time: <span className="text-cyan-300 font-semibold">{formatTime(seconds)}</span></p>
          </div>
        )}
      </div>
    );
  }

  // Render para Part4 (sin slider, sin botón Start por ahora)
  return (
    <div className="p-6 bg-gradient-to-br from-[#12121c] to-[#1b1b2d] text-gray-100 rounded-2xl shadow-2xl my-6 border border-[#2c2c3e]">
      <h2 className="text-3xl font-bold mb-6 text-teal-400 drop-shadow">🧠 {data.title}</h2>
      {data.questions.map((q, idx) => (
        <div key={idx} className="mb-6">
          <p className="text-lg mb-2">
            <span className="text-teal-300 font-semibold">Q{idx + 1}.</span>{' '}
            {q.text.replace(/_+/, '_____')}
          </p>
          <input
            type="text"
            value={answers[idx]}
            onChange={e => handleChange(e.target.value.toUpperCase(), idx)}
            disabled={submitted}
            placeholder="Your answer"
            className="w-full p-3 rounded-lg bg-[#232334] border border-[#3b3b4f] text-gray-100"
          />
          {submitted && (
            <p className={`font-semibold mt-2 ${answers[idx] === q.answer ? 'text-green-400' : 'text-rose-400'}`}>
              {answers[idx] === q.answer ? '✔ Correct' : `✘ ${q.answer}`}
            </p>
          )}
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit} className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg shadow-lg">
          Submit Part {part}
        </button>
      )}
    </div>
  );
}

export default function UseOfEnglishSimulator() {
  const [score, setScore] = useState({});
  const [timeTaken, setTimeTaken] = useState({});

  const handlePartSubmit = (part, answers, timeInSeconds) => {
    const correct = jsonData[part].questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
    setScore(prev => ({ ...prev, [part]: correct }));
    setTimeTaken(prev => ({ ...prev, [part]: timeInSeconds }));
  };

  const totalScore = Object.values(score).reduce((a, b) => a + b, 0);
  const totalQs = Object.keys(jsonData).reduce((sum, k) => sum + jsonData[k].questions.length, 0);
  const totalTime = Object.values(timeTaken).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d17] to-[#151526] text-gray-100 p-8">
      <h1 className="text-5xl font-extrabold text-center text-cyan-400 mb-12 tracking-tight drop-shadow-lg">⚔️ Use of English B2 Simulator</h1>
      {Object.keys(jsonData).map((part, i) => (
        <PartComponent key={i} part={part} data={jsonData[part]} onSubmit={handlePartSubmit} />
      ))}
      <div className="text-center mt-12 space-y-2">
        <h2 className="text-2xl font-semibold text-teal-300">Total Score: <span className="text-white">{totalScore} / {totalQs}</span></h2>
        <p className="text-sm text-gray-400">🕒 Total Time: <span className="text-cyan-300 font-semibold">{formatTime(totalTime)}</span></p>
      </div>
    </div>
  );
}
