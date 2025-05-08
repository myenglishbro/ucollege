import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, RefreshCw, Shuffle } from 'lucide-react';

// Componente de personaje con marco épico y animación
const Character = ({ lives }) => {
  const sprites = {
    3: 'https://i.ibb.co/KcTGpDp9/char-happy.png',
    2: 'https://i.ibb.co/S7GJRgRS/char-worried.png',
    1: 'https://i.ibb.co/BVswsW1n/char-injured.png',
    0: 'https://i.ibb.co/FLft914R/20250508-1255-Mueca-Festiva-Azul-remix-01jtrgjctzfw8avzzb9cty172g-removebg-preview.png',
  };
  return (
    <motion.div
      className="p-2 bg-gray-900 rounded-xl ring-4 ring-purple-600 shadow-2xl flex-shrink-0"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        key={lives}
        src={sprites[lives]}
        alt={`Character with ${lives} lives`}
        className="w-36 h-36 md:w-48 md:h-48"
      />
    </motion.div>
  );
};

const TextFileUploader = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(null);
  const [lives, setLives] = useState(3);
  const [lifeMessage, setLifeMessage] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timer, setTimer] = useState(30);
  const timerRef = useRef(null);
  const [stage, setStage] = useState('splash');

  const lifePhrases = [
    '¡Por favor, ayúdame!',
    '¡No quiero morir!',
    '¡Socorro, estoy en peligro!'
  ];

  // Parseo robusto de P: pregunta / R: respuesta
  const parseFlashcards = (text) => {
    const pattern = /P:\s*([\s\S]*?)\s*R:\s*([\s\S]*?)(?=(?:\r?\nP:|$))/g;
    const matches = [];
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matches.push({ question: match[1].trim(), answer: match[2].trim() });
    }
    return matches;
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    let cards = [];
    for (const f of files) {
      const text = await f.text();
      cards = cards.concat(parseFlashcards(text));
    }
    if (!cards.length) {
      alert('No se encontraron tarjetas en los archivos .txt');
      return;
    }
    setFlashcards(cards);
    setQueue(cards);
    resetGame();
    setStage('playing');
  };

  // Resetea estados de juego
  const resetGame = () => {
    setIndex(0);
    setLives(3);
    setCorrect(0);
    setWrong(0);
    setFeedback(null);
    setShowCorrectAnswer(null);
    setLifeMessage(null);
    setTimer(30);
  };

  // Inicia cuenta regresiva
  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimer(30);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          markWrong(); // tiempo agotado cuenta como fallo
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  // Maneja respuesta correcta
  const markCorrect = () => {
    setFeedback('¡Correcto!');
    setCorrect((c) => c + 1);
    nextCard();
  };

  // Maneja fallo y reduce vida
  const markWrong = () => {
    const correctAnswer = queue[index].answer;
    setFeedback('¡Incorrecto!');
    setShowCorrectAnswer(correctAnswer);
    setWrong((w) => w + 1);
    const phrase = lifePhrases[Math.floor(Math.random() * lifePhrases.length)];
    setLifeMessage(phrase);
    setLives((l) => {
      const newLives = l - 1;
      if (newLives <= 0) {
        stopTimer();
        setStage('over');
      } else {
        setTimeout(() => nextCard(), 2000);
      }
      return newLives;
    });
    setTimeout(() => setLifeMessage(null), 1500);
  };

  // Verifica la respuesta del usuario
  const check = () => {
    const clean = (s) => s.trim().toLowerCase().replace(/[.,!?¡¿'"`]/g, '');
    const card = queue[index];
    clean(input) === clean(card.answer) ? markCorrect() : markWrong();
  };

  // Avanza a la siguiente tarjeta
  const nextCard = () => {
    setInput('');
    setFeedback(null);
    setShowCorrectAnswer(null);
    const nextIdx = (index + 1) % queue.length;
    setIndex(nextIdx);
    if (correct + wrong + 1 >= queue.length) {
      stopTimer();
      setStage('finished');
    } else {
      startTimer();
    }
  };

  useEffect(() => {
    if (stage === 'playing') startTimer();
    return () => stopTimer();
  }, [stage]);

  // --- RENDER POR ETAPA ---
  if (stage === 'splash') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-700 p-4">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 text-center w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-white">Bienvenido a EngHero!</h1>
          <p className="mb-6 text-gray-200">Sube tus archivos .txt para comenzar</p>
          <input
            type="file" accept=".txt" multiple onChange={handleUpload}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>
      </div>
    );
  }

  if (stage === 'over') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 space-y-4">
        <Character lives={0} />
        <AnimatePresence>
          {lifeMessage && (
            <motion.div className="text-center text-red-400 font-bold"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {lifeMessage}
            </motion.div>
          )}
        </AnimatePresence>
        <h2 className="text-2xl font-bold">¡Game Over!</h2>
        <p>Correctas: {correct} — Incorrectas: {wrong}</p>
        <div className="flex gap-4">
          <button onClick={() => { resetGame(); setQueue(flashcards); setStage('playing'); }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Reintentar
          </button>
          <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer">
            Subir otro archivo
            <input type="file" accept=".txt" multiple onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>
    );
  }

  if (stage === 'finished') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 text-white p-4 space-y-4">
        <Character lives={3} />
        <h2 className="text-2xl font-bold">¡Completado!</h2>
        <p>Correctas: {correct} — Incorrectas: {wrong}</p>
        <div className="flex gap-4">
          <button onClick={() => { resetGame(); setQueue(flashcards); setStage('playing'); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Jugar de nuevo
          </button>
          <label className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded cursor-pointer">
            Subir otro archivo
            <input type="file" accept=".txt" multiple onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>
    );
  }

  // Estado de juego activo
  const card = queue[index];
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center space-y-4">
      <header className="w-full flex justify-between items-center max-w-xl">
        <div className="flex items-center gap-2">
          {[...Array(lives)].map((_, i) => (
            <Heart key={i} className="w-6 h-6 text-red-500" />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-5 h-5" /> <span>{timer}s</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 cursor-pointer" onClick={() => window.location.reload()} />
          <Shuffle
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
              setQueue(shuffled);
              setIndex(0);
            }}
          />
        </div>
      </header>
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-xl w-full space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-col items-center">
          <Character lives={lives} />
          <AnimatePresence>
            {lifeMessage && (
              <motion.div className="mt-2 text-center text-red-400 font-bold"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {lifeMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="bg-gray-800 rounded-xl shadow-xl p-6 w-full">
          <h3 className="text-xl font-semibold mb-2">Pregunta {index + 1}/{queue.length}</h3>
          <p className="mb-4 text-lg">{card.question}</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu respuesta..."
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <AnimatePresence>
            {feedback && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <p className={`text-center font-bold ${feedback.includes('Correcto') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</p>
                {showCorrectAnswer && <p className="mt-2 text-red-300 text-center">Respuesta correcta: {showCorrectAnswer}</p>}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-6">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={check}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Verificar
            </motion.button>
            {feedback && (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextCard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Siguiente
              </motion.button>
            )}
          </div>
        </div>
      </div>
      <footer className="text-gray-500 text-center max-w-xl w-full">✔️ {correct} — ❌ {wrong}</footer>
    </div>
  );
};

export default TextFileUploader;