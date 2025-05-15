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

  if (stage === 'upload') {
    return (
      <div className="min-h-screen bg-white text-black p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Upload Encrypted Key Word Transformation File</h1>
        <input type="file" accept=".txt" multiple onChange={handleUpload} className="p-2 border rounded" />
      </div>
    );
  }

  if (stage === 'report') {
    return (
      <div className="min-h-screen bg-gray-100 text-black p-6">
        <h2 className="text-2xl font-bold mb-4">Resultado Final</h2>
        {flashcards.map((card, i) => {
          const userAnswer = answers[i] || '';
          const isCorrect = userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
          return (
            <div key={i} className="mb-4 p-4 border rounded bg-white shadow">
              <p><strong>P:</strong> {card.question}</p>
              <p><strong>Palabra clave:</strong> {card.keyword}</p>
              <p><strong>Tu respuesta:</strong> {userAnswer || '[Sin respuesta]'}</p>
              <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                {isCorrect ? '✔ Correcta' : `✘ Incorrecta. Respuesta correcta: ${card.answer}`}
              </p>
            </div>
          );
        })}
        <div className="flex gap-4 mt-6">
          <button onClick={() => { setStage('playing'); setCurrent(0); setInput(''); setAnswers(Array(flashcards.length).fill(null)); setTimer(100); }} className="bg-blue-600 text-white px-4 py-2 rounded">Intentar de nuevo</button>
          <label className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer">Subir otro archivo<input type="file" accept=".txt" multiple onChange={handleUpload} className="hidden"/></label>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Pregunta {current + 1} de {flashcards.length}</h2>
        <p className="mb-1 text-gray-800"><strong>Reescribe la oración usando la palabra clave:</strong></p>
        <p className="mb-2 text-gray-800">{flashcards[current].question}</p>
        <p className="mb-4 text-purple-700 font-semibold">Palabra clave: <span className="underline">{flashcards[current].keyword}</span></p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu transformación..."
          className="w-full p-3 border rounded mb-4"
        />
        <div className="flex items-center justify-between">
          <button onClick={nextQuestion} className="bg-blue-600 text-white px-4 py-2 rounded">Siguiente</button>
          <p className="text-gray-600">⏳ Tiempo restante: {timer}s</p>
        </div>
      </div>
    </div>
  );
};

export default KeywordTransformerTrainer;