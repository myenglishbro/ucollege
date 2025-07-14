import React, { useState } from 'react';
import jsonData from './dataexam/useOfEnglishData.json';

const PartComponent = ({ part, data, onSubmit }) => {
  const [answers, setAnswers] = useState(Array(data.questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (value, idx) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit(part, answers);
  };

  return (
    <div className="p-6 bg-zinc-900 text-zinc-100 rounded-xl shadow-2xl my-6 border border-zinc-700">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">{data.title}</h2>

      {data.questions.map((q, idx) => (
        <div key={idx} className="mb-6">
          {part === 'Part4' ? (
            <>
              <p className="text-lg text-zinc-300 mb-1">
                <strong>Q{idx + 25}:</strong> {q.original}
              </p>
              <p className="text-lg text-cyan-300 italic mb-1">
                (Word given: <strong>{q.keyword}</strong>)
              </p>
              <p className="text-zinc-100 mb-2">{q.transformed.replace('_____', '__________')}</p>
              <input
                type="text"
                className="w-full p-3 rounded bg-zinc-800 border border-zinc-600 text-zinc-100"
                value={answers[idx]}
                onChange={(e) => handleChange(e.target.value.toUpperCase(), idx)}
                disabled={submitted}
                placeholder="Write between 2 and 5 words"
              />
            </>
          ) : (
            <>
              <p className="mb-2 text-lg">
                <strong className="text-cyan-300">Q{idx + 1}:</strong>{' '}
                {q.text.replace('_____', '_____')}
              </p>
              {q.type === 'select' ? (
                <select
                  className="w-full p-3 rounded bg-zinc-800 border border-zinc-600 text-zinc-100"
                  value={answers[idx]}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  disabled={submitted}
                >
                  <option value="">-- Select an option --</option>
                  {q.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="w-full p-3 rounded bg-zinc-800 border border-zinc-600 text-zinc-100"
                  value={answers[idx]}
                  onChange={(e) => handleChange(e.target.value.toUpperCase(), idx)}
                  disabled={submitted}
                  placeholder="Type your answer"
                />
              )}
            </>
          )}

          {submitted && (
            <p className={`mt-2 font-semibold ${
              answers[idx] === q.answer ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {answers[idx] === q.answer
                ? '✓ Correct'
                : `✗ Incorrect — Correct answer: ${q.answer}`}
            </p>
          )}
        </div>
      ))}

      {!submitted && (
        <button
          className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded shadow-lg transition-all"
          onClick={handleSubmit}
        >
          Submit Part {part}
        </button>
      )}
    </div>
  );
};

export default function UseOfEnglishSimulator() {
  const [score, setScore] = useState({});

  const handlePartSubmit = (part, answers) => {
    const correct = jsonData[part].questions.reduce((acc, q, i) => (
      acc + (answers[i] === q.answer ? 1 : 0)
    ), 0);
    setScore((prev) => ({ ...prev, [part]: correct }));
  };

  const totalScore = Object.values(score).reduce((a, b) => a + b, 0);
  const totalQuestions = Object.keys(jsonData).reduce(
    (sum, part) => sum + jsonData[part].questions.length, 0
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-cyan-500 mb-10">
        Use of English B2 Simulator
      </h1>
      {Object.keys(jsonData).map((part, idx) => (
        <PartComponent
          key={idx}
          part={part}
          data={jsonData[part]}
          onSubmit={handlePartSubmit}
        />
      ))}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-cyan-300">
          Total Score: {totalScore} / {totalQuestions}
        </h2>
      </div>
    </div>
  );
}
