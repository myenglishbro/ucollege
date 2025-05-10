import React, { useState } from 'react';

const GrammarCodeQuest = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState(null);

  const current = questions[index];

  const handleAnswer = (opt) => {
    if (opt === current.answer) {
      setScore(s => s + 1);
      setCode(c => c + current.letter);
      setFeedback('✅ ¡Correcto!');
      setTimeout(() => {
        setFeedback(null);
        if (index + 1 < questions.length) {
          setIndex(i => i + 1);
        } else {
          alert('🎉 Código completo: ' + (code + current.letter));
        }
      }, 1000);
    } else {
      setLives(l => l - 1);
      setFeedback('❌ Incorrecto');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/);
    const parsed = lines.map(line => {
      const match = line.match(/Q:(.*?)\s*O:(.*?)\s*A:(.*?)\s*L:(.*)/);
      if (!match) return null;
      const [, text, opts, answer, letter] = match;
      return {
        text: text.trim(),
        options: opts.split('|').map(o => o.trim()),
        answer: answer.trim(),
        letter: letter.trim(),
      };
    }).filter(Boolean);
    setQuestions(parsed);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">🔐 Grammar Code Quest</h1>
        <input
          type="file"
          accept=".txt"
          onChange={handleUpload}
          className="mb-4 bg-gray-800 text-white px-4 py-2 rounded"
        />

        {current ? (
          <>
            <p className="mb-2 text-lg">{current.text}</p>
            <div className="flex gap-4 flex-wrap justify-center">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  {opt}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 text-xl font-semibold">{feedback}</p>}
            <p className="mt-6 text-sm">Score: {score} | Lives: {lives} | Code: {code}</p>
          </>
        ) : (
          <p className="text-xl mt-8">🎉 ¡Sube un archivo para comenzar!</p>
        )}
      </div>
    </div>
  );
};

export default GrammarCodeQuest;