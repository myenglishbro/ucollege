// KeywordTransformerTrainer.jsx
import React, { useState, useEffect, useRef } from 'react';

const parseFlashcards = (encodedText) => {
  try {
    const decodedText = atob(encodedText);
    const pattern = /P:\s*(.*?)\s*K:\s*(.*?)\s*R:\s*(.*?)(?=(?:\r?\nP:|$))/gs;
    const matches = [];
    let match;
    while ((match = pattern.exec(decodedText)) !== null) {
      matches.push({
        question: match[1].trim(),
        keyword: match[2].trim(),
        answer: match[3].trim()
      });
    }
    return matches;
  } catch {
    return [];
  }
};

const KeywordTransformerTrainer = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(100);
  const [stage, setStage] = useState('upload');
  const timerRef = useRef(null);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    let cards = [];
    for (const file of files) {
      const content = await file.text();
      cards = cards.concat(parseFlashcards(content));
    }
    if (cards.length) {
      setFlashcards(cards);
      setAnswers(Array(cards.length).fill(null));
      setStage('playing');
      setCurrent(0);
      setInput('');
      setTimer(100);
    }
  };

  const nextQuestion = () => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[current] = input.trim();
      return updated;
    });
    if (current + 1 >= flashcards.length) {
      setStage('report');
      clearInterval(timerRef.current);
    } else {
      setCurrent((prev) => prev + 1);
      setInput('');
      setTimer(100);
    }
  };

  useEffect(() => {
    if (stage === 'playing') {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            nextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [stage, current]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans p-8">
      {stage === 'upload' && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-cyan-400 animate-pulse">🔥 KEY WORD TRANSFORMATION TRAINER 🔥</h1>
          <p className="mb-6 text-lg text-gray-300">Upload your challenge file and begin your epic transformation training.</p>
          <label className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer transition-all shadow-lg">
            Upload .txt File
            <input type="file" accept=".txt" multiple onChange={handleUpload} className="hidden" />
          </label>
        </div>
      )}

      {stage === 'playing' && (
        <div className="max-w-4xl mx-auto border-2 border-cyan-500 rounded-xl p-8 bg-gray-800 shadow-2xl animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 text-cyan-400">Question {current + 1} / {flashcards.length}</h2>
          <div className="mb-4">
            <p className="text-lg text-white mb-2">🧩 <span className="font-semibold">Transform this sentence:</span></p>
            <p className="bg-gray-700 p-4 rounded text-lg text-yellow-200">{flashcards[current].question}</p>
          </div>
          <div className="mb-6">
            <p className="text-sm uppercase tracking-wider text-pink-400">KEYWORD</p>
            <p className="text-xl font-semibold underline text-pink-300">{flashcards[current].keyword}</p>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your transformation..."
            className="w-full p-3 text-lg rounded-md bg-gray-900 border border-cyan-400 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <div className="flex justify-between items-center">
            <button onClick={nextQuestion} className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg shadow-md font-semibold">Next</button>
            <p className="text-sm text-gray-300">⏳ {timer}s remaining</p>
          </div>
        </div>
      )}

      {stage === 'report' && (
        <div className="max-w-5xl mx-auto p-6 bg-gray-900 border border-cyan-500 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">🚀 Final Results</h2>
          {flashcards.map((card, i) => {
            const userAnswer = answers[i] || '';
            const isCorrect = userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
            return (
              <div key={i} className={`p-4 mb-4 rounded-lg ${isCorrect ? 'bg-green-700' : 'bg-red-700'}`}>
                <p><strong className="text-white">P:</strong> {card.question}</p>
                <p><strong className="text-white">Keyword:</strong> {card.keyword}</p>
                <p><strong className="text-white">Your Answer:</strong> {userAnswer || '[No Answer]'}</p>
                <p className={isCorrect ? 'text-green-300' : 'text-yellow-200 font-semibold'}>
                  {isCorrect ? '✔ Correct' : `✘ Incorrect. Correct answer: ${card.answer}`}
                </p>
              </div>
            );
          })}
          <div className="flex gap-4 mt-8">
            <button onClick={() => { setStage('playing'); setCurrent(0); setInput(''); setAnswers(Array(flashcards.length).fill(null)); setTimer(100); }} className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg shadow">Try Again</button>
            <label className="bg-gray-700 text-white px-6 py-2 rounded-lg cursor-pointer shadow hover:bg-gray-600">
              Upload New File
              <input type="file" accept=".txt" multiple onChange={handleUpload} className="hidden" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordTransformerTrainer;
