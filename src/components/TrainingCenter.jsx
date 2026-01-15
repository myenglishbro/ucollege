// TrainingCenter.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const parseFlashcards = (encodedText) => {
  try {
    const decodedText = atob(encodedText);
    const pattern = /P:\s*([\s\S]*?)\nR:\s*([\s\S]*?)(?=(?:\n{2,}|$))/g;
    const matches = [];
    let match;
    while ((match = pattern.exec(decodedText)) !== null) {
      matches.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      });
    }
    return matches;
  } catch {
    return [];
  }
};

const TrainingCenter = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [stage, setStage] = useState('upload');
  const [timer, setTimer] = useState(30);
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(() => parseInt(localStorage.getItem('bestScore') || '0'));
  const [noTime, setNoTime] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const timerRef = useRef(null);

  // Confetti & best score update
  useEffect(() => {
    if (stage === 'report') {
      const correctCount = flashcards.filter((card, i) =>
        (userAnswers[i] || '').trim().toLowerCase() === card.answer.toLowerCase()
      ).length;
      const percent = (correctCount / flashcards.length) * 100;
      if (percent >= 70) confetti();
      if (correctCount > bestScore) {
        localStorage.setItem('bestScore', correctCount.toString());
        setBestScore(correctCount);
      }
    }
  }, [stage, flashcards, userAnswers, bestScore]);

  // File upload handler
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const content = await file.text();
    const cards = parseFlashcards(content);
    if (cards.length) {
      setFlashcards(cards);
      setUserAnswers(Array(cards.length).fill(null));
      setCurrent(0);
      setInput('');
      setStage('playing');
      setTimer(30);
      setStreak(0);
      setFileUploaded(true);
      setTimeout(() => setFileUploaded(false), 2000);
    }
  };

  // Answer checking
  const checkAnswer = () => {
    const user = input.trim();
    const correct = flashcards[current].answer.trim();
    const isCorrect = user.toLowerCase() === correct.toLowerCase();
    const updated = [...userAnswers];
    updated[current] = user;
    setUserAnswers(updated);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      let msg = '✅ Great!';
      if (newStreak >= 3) msg = `🔥 ${newStreak} in a row! Keep going!`;
      setFeedback({ type: 'success', message: msg });
    } else {
      setStreak(0);
      setFeedback({ type: 'error', message: `✘ Correct: ${correct}` });
    }

    setTimeout(() => {
      setFeedback(null);
      if (current + 1 < flashcards.length) {
        setCurrent(current + 1);
        setInput('');
        setTimer(30);
      } else {
        setStage('report');
        clearInterval(timerRef.current);
      }
    }, 1500);
  };

  // Timer effect
  useEffect(() => {
    if (stage === 'playing' && !noTime) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev <= 1 ? (clearInterval(timerRef.current), checkAnswer(), 30) : prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [stage, current, noTime, checkAnswer]);

  // UPLOAD VIEW
  if (stage === 'upload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
        <motion.h1 className="text-5xl font-extrabold mb-6 text-purple-400" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          🚀 Welcome to Training Center
        </motion.h1>
        <motion.p className="mb-4 text-lg text-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Upload your .txt to begin
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
          <label className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer">
            Upload File
            <input type="file" accept=".txt" onChange={handleUpload} className="hidden" />
          </label>
          {fileUploaded && (
            <motion.span
              className="absolute -right-2 -top-6 text-green-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              📂 Archivo subido!
            </motion.span>
          )}
        </motion.div>
        <motion.button
          onClick={() => setNoTime(!noTime)}
          className="mt-6 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          {noTime ? 'Enable Timer' : 'Disable Timer'}
        </motion.button>
      </div>
    );
  }

  // PLAYING VIEW
  if (stage === 'playing') {
    const card = flashcards[current];
    const progress = ((current + 1) / flashcards.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
        <motion.div
          className="max-w-3xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-2xl border-purple-500 border"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="h-2 bg-gray-700 rounded-full mb-4">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Q {current + 1} / {flashcards.length}</h2>
          <p className="text-sm mb-4">🔥 Streak: {streak}</p>
          <motion.p className="text-yellow-300 mb-6 text-xl" initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            {card.question}
          </motion.p>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Answer..."
            className="w-full p-4 rounded bg-gray-700 mb-4"
            disabled={!!feedback}
          />
          <AnimatePresence>
            {feedback && (
              <motion.div
                key={feedback.message}
                className={`${feedback.type === 'success' ? 'bg-green-700' : 'bg-red-700'} p-3 rounded text-center`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
              >
                {feedback.message}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-between items-center mt-4">
            <motion.button
              onClick={checkAnswer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 px-6 py-2 rounded"
              disabled={!!feedback}
            >
              Submit
            </motion.button>
            {!noTime && <span>⏳ {timer}s</span>}
          </div>
        </motion.div>
      </div>
    );
  }

  // REPORT VIEW
  if (stage === 'report') {
    const correctCount = flashcards.filter((card, i) =>
      (userAnswers[i] || '').trim().toLowerCase() === card.answer.toLowerCase()
    ).length;
    const percent = (correctCount / flashcards.length) * 100;
    let medal = { text: '😓 Keep Training', class: 'bg-red-800' };
    if (percent >= 90) medal = { text: '🥇 Gold!', class: 'bg-yellow-500' };
    else if (percent >= 70) medal = { text: '🥈 Silver!', class: 'bg-gray-400' };
    else if (percent >= 50) medal = { text: '🥉 Bronze!', class: 'bg-amber-700' };

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
        <motion.div
          className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow border-purple-500 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl mb-4">🏁 Your Training Results</h2>
          <p>Score: {correctCount}/{flashcards.length} ({Math.round(percent)}%)</p>
          <p>Best: {bestScore}</p>
          <motion.div
            className={`${medal.class} text-center p-4 rounded mt-4`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {medal.text}
          </motion.div>
          <div className="mt-6 space-y-2">
            {flashcards.map((card, i) => {
              const user = userAnswers[i] || '[No]';
              const ok = user.toLowerCase() === card.answer.toLowerCase();
              return (
                <motion.div
                  key={i}
                  className={`${ok ? 'bg-green-700' : 'bg-red-700'} p-3 rounded`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <p><strong>P:</strong> {card.question}</p>
                  <p><strong>Your:</strong> {user}</p>
                  {!ok && <p><strong>Ans:</strong> {card.answer}</p>}
                </motion.div>
              );
            })}
          </div>
          <motion.button
            onClick={() => {
              setStage('playing');
              setCurrent(0);
              setInput('');
              setUserAnswers(Array(flashcards.length).fill(null));
              setTimer(30);
              setStreak(0);
            }}
            className="mt-6 bg-purple-600 px-6 py-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔁 Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default TrainingCenter;
