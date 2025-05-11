import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GrammarSpaceDefender = () => {
  const COUNTDOWN_START = 15;
  const LOSE_LIFE_DAMAGE = 10;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(COUNTDOWN_START);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // End the game immediately when lives reach zero
  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
    }
  }, [lives]);

  // Countdown logic
  useEffect(() => {
    let countdown;
    if (questions.length && timer > 0 && !gameOver && !gameWon) {
      countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleTimeout();
    }
    return () => clearInterval(countdown);
  }, [timer, questions, gameOver, gameWon]);

  const parseTXT = (text) => {
    const pattern = /E:\s*(.*?)\s*O:\s*(.*?)\s*A:\s*(.*?)(?=\nE:|$)/gs;
    const matches = [...text.matchAll(pattern)];
    return matches.map(match => {
      const error = match[1].trim();
      const options = match[2].split('|').map(o => o.trim());
      const rawAnswer = match[3].trim();
      const answer = rawAnswer.split('→')[0].trim();
      return { error, options, answer };
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const parsed = parseTXT(text);
    setQuestions(parsed);
    resetGameState();
  };

  const resetGameState = (clear = false) => {
    if (clear) setQuestions([]);
    setCurrentIndex(0);
    setSelected(null);
    setFeedback(null);
    setProgress(0);
    setLives(3);
    setTimer(COUNTDOWN_START);
    setGameOver(false);
    setGameWon(false);
  };

  const loseLife = () => {
    // Decrease progress
    setProgress(prev => Math.max(0, prev - LOSE_LIFE_DAMAGE));
    // Decrement lives and optionally advance or end
    setLives(prev => {
      const newLives = Math.max(0, prev - 1);
      if (newLives > 0) {
        setTimeout(() => advance(), 1500);
      }
      return newLives;
    });
  };

  const handleTimeout = () => {
    setFeedback(`⏰ Tiempo agotado. Respuesta correcta: ${questions[currentIndex].answer}`);
    loseLife();
  };

  const checkAnswer = (option) => {
    const current = questions[currentIndex];
    setSelected(option);
    if (option.trim().toLowerCase() === current.answer.trim().toLowerCase()) {
      setFeedback('✅ ¡Correcto!');
      const nextProgress = Math.min(100, progress + LOSE_LIFE_DAMAGE);
      setProgress(nextProgress);
      setTimeout(() => {
        if (nextProgress >= 100 || currentIndex + 1 >= questions.length) {
          setGameWon(true);
        } else {
          advance();
        }
      }, 1500);
    } else {
      setFeedback(`❌ Incorrecto. Respuesta correcta: ${current.answer}`);
      loseLife();
    }
  };

  const advance = () => {
    setSelected(null);
    setFeedback(null);
    setTimer(COUNTDOWN_START);
    setCurrentIndex(i => (i + 1) % questions.length);
  };

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">🚀 Grammar Space Defender</h1>
          <p className="mb-4">Sube un archivo .txt con errores gramaticales</p>
          <input type="file" accept=".txt" onChange={handleUpload} className="bg-gray-800 p-2 rounded" />
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1.2, rotate: 20 }}
          transition={{ type: 'spring', stiffness: 100 }}
          src="https://i.ibb.co/8LNbbNTb/Chat-GPT-Image-May-8-2025-05-48-32-PM-removebg-preview.png"
          alt="explosion"
          className="w-32 mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">💥 ¡Perdiste! La nave ha explotado</h2>
        <div className="flex gap-4 mt-4">
          <button onClick={() => resetGameState(true)} className="bg-blue-600 px-4 py-2 rounded">Subir otro archivo</button>
          <button onClick={() => resetGameState()} className="bg-green-600 px-4 py-2 rounded">Jugar de nuevo</button>
        </div>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          src="https://i.ibb.co/hRZxMxbd/Chat-GPT-Image-May-8-2025-06-08-50-PM.png"
          alt="nave ganadora"
          className="w-32 mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">🎉 ¡Misión cumplida!</h2>
        <p className="mb-4">Has corregido todos los errores gramaticales</p>
        <div className="flex gap-4">
          <button onClick={() => resetGameState(true)} className="bg-blue-600 px-4 py-2 rounded">Subir otro archivo</button>
          <button onClick={() => resetGameState()} className="bg-green-600 px-4 py-2 rounded">Jugar de nuevo</button>
        </div>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-[url('https://i.ibb.co/x0Xwhp7/Chat-GPT-Image-May-8-2025-05-30-17-PM.png')] bg-cover bg-center text-white flex flex-col items-center justify-center p-4">
      <div className="bg-black bg-opacity-60 p-6 rounded-xl shadow-xl max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Corrige el error gramatical</h2>

        <div className="relative w-full mb-6">
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <motion.img
            src="https://i.ibb.co/wFLGC3GH/Chat-GPT-Image-May-8-2025-05-34-22-PM-removebg-preview-2.png"
            alt="nave"
            className="absolute -top-10 w-12"
            animate={{ left: `calc(${progress}% - 24px)` }}
            transition={{ type: 'spring', stiffness: 80 }}
          />
          <p className="text-sm text-center mt-1">Progreso de la nave</p>
        </div>

        <div className="flex justify-between items-center w-full mb-4 text-sm">
          <div>❤️ Vidas: {lives}</div>
          <div>⏳ Tiempo: {timer}s</div>
        </div>

        <p className="text-lg mb-4">❌ {current.error}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {current.options.map((opt, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => checkAnswer(opt)}
              className={`p-3 rounded transition-all bg-cover bg-center text-white font-bold ${selected === opt ? 'ring-2 ring-yellow-300' : ''}`}
              disabled={!!feedback}
            >
              {opt}
            </motion.button>
          ))}
        </div>
        {feedback && <p className="mt-4 text-center font-bold">{feedback}</p>}
      </div>
    </div>
  );
};

export default GrammarSpaceDefender;