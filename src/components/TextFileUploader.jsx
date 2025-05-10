import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, RefreshCw, Shuffle } from 'lucide-react';

// Componente de personaje con animaciones y tamaño aumentado
const Character = ({ lives }) => {
  const sprites = {
    3: 'https://i.ibb.co/KcTGpDp9/char-happy.png',
    2: 'https://i.ibb.co/S7GJRgRS/char-worried.png',
    1: 'https://i.ibb.co/BVswsW1n/char-injured.png',
    0: 'https://i.ibb.co/FLft914R/char-dead.png',
  };

  return (
    <motion.div
      className="p-4 bg-gray-900 rounded-2xl ring-4 ring-purple-600 shadow-2xl flex-shrink-0"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.img
        key={lives}
        src={sprites[lives]}
        alt={`Character with ${lives} lives`}
        className="w-80 h-80 mt-6"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: -10, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.15 }}
      />
    </motion.div>
  );
};

const TextFileUploader = () => {
  // Estado general
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

  // Parseo de flashcards
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

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimer(30);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          markWrong();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  const markCorrect = () => {
    setFeedback('¡Correcto!');
    setCorrect((c) => c + 1);
    setTimeout(nextCard, 1000);
  };

  const markWrong = () => {
    const correctAnswer = queue[index].answer;
    setFeedback('¡Incorrecto!');
    setShowCorrectAnswer(correctAnswer);
    setWrong((w) => w + 1);
    setLifeMessage(lifePhrases[Math.floor(Math.random() * lifePhrases.length)]);
    setLives((l) => {
      const newLives = l - 1;
      if (newLives <= 0) {
        stopTimer();
        setStage('over');
      }
      return newLives;
    });
    setTimeout(() => setLifeMessage(null), 1500);
    if (lives > 1) setTimeout(nextCard, 2000);
  };

  const check = () => {
    const clean = (s) => s.trim().toLowerCase().replace(/[.,!?¡¿'"`]/g, '');
    clean(input) === clean(queue[index].answer) ? markCorrect() : markWrong();
  };

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

  const progress = flashcards.length ? ((correct + wrong) / flashcards.length) * 100 : 0;

  // Renderizado
  if (stage === 'splash') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-700 p-6">
        <motion.div className="bg-gray-800 rounded-2xl shadow-2xl p-10 text-center w-full max-w-lg" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <h1 className="text-4xl font-extrabold mb-6 text-white">Bienvenido a EngHero!</h1>
          <p className="mb-8 text-gray-300">Sube tus archivos .txt para comenzar</p>
          <input type="file" accept=".txt" multiple onChange={handleUpload} className="w-full p-3 bg-gray-700 text-white rounded-lg cursor-pointer" />
        </motion.div>
      </div>
    );
  }

  if (stage === 'over') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 space-y-4">
        <Character lives={0} />
        {lifeMessage && <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-red-400 font-bold">{lifeMessage}</motion.div>}
        <h2 className="text-2xl font-bold">¡Game Over!</h2>
        <p>Correctas: {correct} — Incorrectas: {wrong}</p>
        <div className="flex gap-4">
          <button onClick={() => { resetGame(); setQueue(flashcards); setStage('playing'); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Reintentar</button>
          <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer">Subir otro archivo<input type="file" accept=".txt" multiple onChange={handleUpload} className="hidden"/></label>
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
          <button onClick={() => { resetGame(); setQueue(flashcards); setStage('playing'); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Jugar de nuevo</button>
          <label className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded cursor-pointer">Subir otro archivo<input type="file" accept=".txt" multiple onChange={handleUpload} className="hidden"/></label>
        </div>
      </div>
    );
  }

  // Juego activo
  const card = queue[index];
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <header className="w-full flex justify-between items-center max-w-2xl mb-4">
        <motion.div whileHover={{ scale:1.1 }} className="flex items-center gap-2">{[...Array(lives)].map((_,i)=><Heart key={i} className="w-7 h-7 text-red-500"/>)}</motion.div>
        <motion.div whileHover={{ scale:1.1 }} className="flex items-center gap-1"><Clock className="w-6 h-6"/><span className="text-lg">{timer}s</span></motion.div>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ rotate:360 }} onClick={()=>window.location.reload()}><RefreshCw className="w-6 h-6 text-blue-400"/></motion.button>
          <motion.button whileHover={{ scale:1.2 }} onClick={()=>{const shuffled=[...flashcards].sort(()=>Math.random()-0.5);setQueue(shuffled);setIndex(0);}}><Shuffle className="w-6 h-6 text-yellow-400"/></motion.button>
        </div>
      </header>

      <div className="w-full max-w-2xl bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
        <motion.div className="bg-purple-500 h-2" initial={{ width:0 }} animate={{ width:`${progress}%` }} transition={{ duration:0.5 }}/>      
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-2xl">
        <Character lives={lives}/>
        <motion.div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
          <h3 className="text-2xl font-semibold mb-3">Pregunta {index+1} de {queue.length}</h3>
          <p className="mb-6 text-xl leading-snug">{card.question}</p>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Escribe tu respuesta..." className="w-full p-4 rounded-lg bg-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          <AnimatePresence>
            {feedback && <motion.div className="mt-4 text-center font-bold" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
              <p className={feedback.includes('Correcto')?'text-green-400':'text-red-400'}>{feedback}</p>
              {showCorrectAnswer && <p className="mt-2 text-red-300">Respuesta correcta: {showCorrectAnswer}</p>}
            </motion.div>}
          </AnimatePresence>
          <div className="flex justify-center gap-6 mt-8">
            <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={check} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg shadow-md">Verificar</motion.button>
            {feedback && <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={nextCard} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md">Siguiente</motion.button>}
          </div>
        </motion.div>
      </div>

      <footer className="mt-auto text-gray-400 text-lg max-w-2xl w-full text-center">✔️ {correct} — ❌ {wrong}</footer>
    </div>
  );
};

export default TextFileUploader;