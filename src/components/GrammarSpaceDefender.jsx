import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const GrammarSpaceDefender = () => {
  const COUNTDOWN_START = 15;
  const LOSE_LIFE_DAMAGE = 10;

  const [showSettings, setShowSettings] = useState(true);
  const [showTimer, setShowTimer] = useState(true);
  const [showLives, setShowLives] = useState(true);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(COUNTDOWN_START);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (lives <= 0) setGameOver(true);
  }, [lives]);

  useEffect(() => {
    let countdown;
    if (questions.length && timer > 0 && !gameOver && !gameWon && showTimer) {
      countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0 && showTimer) {
      handleTimeout();
    }
    return () => clearInterval(countdown);
  }, [timer, questions, gameOver, gameWon, showTimer]);

  const parseTXT = text => {
const pattern = /E:\s*(.*?)\s*[\r\n]+O:\s*(.*?)\s*[\r\n]+A:\s*(.*?)(?=[\r\n]+E:|$)/gs;
    const matches = [...text.matchAll(pattern)];
    return matches.map(match => {
      const error = match[1].trim();
      const options = match[2].split('|').map(o => o.trim());
      const rawAnswer = match[3].trim();
      const answer = rawAnswer.split('→')[0].trim();
      return { error, options, answer };
    });
  };

  const base64ToUtf8 = (base64) => {
  // Quita posibles saltos de línea o espacios
  const cleaned = base64.replace(/[\r\n\s]/g, '');
  const binary = atob(cleaned);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};


const handleText = useCallback(async (text) => {
  try {
    text = base64ToUtf8(text);
    alert('✅ Archivo descifrado correctamente.');
  } catch {
    console.log('⚠️ No es Base64 válido. Usando texto plano.');
  }
  setQuestions(parseTXT(text));
  resetGameState();
  setShowSettings(false);
}, []);


  const handleUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    handleText(text);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const text = await file.text();
      handleText(text);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
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
    setShowSettings(clear);
  };

  const loseLife = () => {
    setProgress(prev => Math.max(0, prev - LOSE_LIFE_DAMAGE));
    setLives(prev => {
      const newLives = Math.max(0, prev - 1);
      if (newLives > 0) setTimeout(() => advance(), 1500);
      return newLives;
    });
  };

  const handleTimeout = () => {
    setFeedback(`⏰ Tiempo agotado. Respuesta correcta: ${questions[currentIndex].answer}`);
    loseLife();
  };

  const checkAnswer = option => {
    if (!questions.length || !questions[currentIndex]) return;
    const current = questions[currentIndex];
    setSelected(option);
    if (option.trim().toLowerCase() === current.answer.trim().toLowerCase()) {
      setFeedback('✅ Correcto');
      const nextProgress = Math.min(100, progress + LOSE_LIFE_DAMAGE);
      setProgress(nextProgress);
      setTimeout(() => {
        if (nextProgress >= 100 || currentIndex + 1 >= questions.length) setGameWon(true);
        else advance();
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

  if (showSettings) {
    return (
      <div onDrop={handleDrop} onDragOver={handleDrag} onDragEnter={handleDrag} onDragLeave={handleDrag} className={`min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 p-4 ${dragActive ? 'ring-4 ring-purple-500' : ''}`}>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-700 text-center">
          <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Multiple Choice Trainer</h1>
          <p className="mb-4 text-sm text-gray-400">Arrastra y suelta un archivo .txt aquí o usa el botón</p>
          <input type="file" accept=".txt" onChange={handleUpload} className="mb-6 block w-full text-gray-200" />
          <motion.button
            onClick={() => resetGameState(false)}
            className="w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-green-400 to-blue-600 shadow-md hover:from-green-500 hover:to-blue-700 focus:outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Iniciar sin archivo
          </motion.button>
        </div>
      </div>
    );
  }

  if (!questions.length || !questions[currentIndex]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">❌ No se pudo cargar el archivo</h2>
        <p className="mb-6">Verifica que el archivo esté en formato correcto (.txt con bloques E:, O:, A:).</p>
        <button
          onClick={() => setShowSettings(true)}
          className="px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          Volver a cargar archivo
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center uppercase tracking-widest text-indigo-300">Selecciona la respuesta correcta</h2>
        <p className="text-center text-gray-400 mb-6">Elige la opción que consideres correcta para completar la oración dada.</p>

        <div className="mb-6">
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
          </div>
          <p className="text-sm text-center mt-1 text-gray-400">Progreso</p>
        </div>

        <div className="flex justify-between text-sm mb-6">
          {showLives && <div className="flex items-center gap-1">❤️ <span className="text-red-500 font-semibold">{lives}</span></div>}
          {showTimer && <div className="flex items-center gap-1">⏳ <span className="text-yellow-300 font-semibold">{timer}s</span></div>}
        </div>

        <p className="text-xl mb-6 text-gray-200">{current.error}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {current.options.map((opt, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => checkAnswer(opt)}
              className={`p-4 rounded-xl border border-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-800 hover:bg-gray-700 transition-colors ${
                selected === opt ? 'ring-4 ring-purple-600 bg-gray-700' : ''
              }`}
              disabled={!!feedback}
            >
              {opt}
            </motion.button>
          ))}
        </div>

        {feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center font-bold text-lg">{feedback}</motion.p>}
      </div>
    </div>
  );
};

export default GrammarSpaceDefender;
