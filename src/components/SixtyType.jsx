import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, RefreshCw, Shuffle, BrainCircuit } from 'lucide-react';

export default function SixtyType() {
  const [flashcards, setFlashcards] = useState([]);
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(null);
  const [lives, setLives] = useState(3);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timer, setTimer] = useState(60);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [stage, setStage] = useState('splash');
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  const timerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const parseFlashcards = encodedText => {
    try {
      const decoded = atob(encodedText);
      const pattern = /P:\s*([\s\S]*?)\s*R:\s*([\s\S]*?)(?=(?:\r?\nP:|$))/g;
      const matches = [];
      let m;
      while ((m = pattern.exec(decoded)) !== null) {
        matches.push({ question: m[1].trim(), answer: m[2].trim() });
      }
      return matches;
    } catch {
      alert('❌ El archivo no está correctamente cifrado o es inválido.');
      return [];
    }
  };

  const resetGame = (cards) => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setIndex(0);
    setLives(3);
    setCorrect(0);
    setWrong(0);
    setStreak(0);
    setMaxStreak(0);
    setInput('');
    setFeedback(null);
    setShowCorrectAnswer(null);
    setTimer(60);
  };

  const handleUpload = async file => {
    const text = await file.text();
    const cards = parseFlashcards(text);
    if (!cards.length) return alert('No se encontraron tarjetas válidas');
    setFlashcards(cards);
    resetGame(cards);
    setStage('playing');
  };

  const handleDrop = useCallback(e => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleUpload(e.dataTransfer.files[0]);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimer(60);
    timerRef.current = setInterval(() => {
      setTimer(t => {
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
    setFeedback('✔️ Correct!');
    setCorrect(c => c + 1);
    setStreak(s => {
      const updated = s + 1;
      setMaxStreak(ms => Math.max(ms, updated));
      return updated;
    });
    setTimeout(nextCard, 1000);
  };

  const markWrong = () => {
    const ans = queue[index]?.answer;
    setFeedback('✖️');
    setShowCorrectAnswer(ans);
    setWrong(w => w + 1);
    setStreak(0);
    setLives(l => {
      const nl = l - 1;
      if (nl <= 0) {
        stopTimer();
        setStage('over');
      }
      return nl;
    });
    setTimeout(() => {
      nextCard();
    }, 1500);
  };

  const check = () => {
    const clean = s => s.trim().toLowerCase().replace(/[.,!?¡¿'"`]/g, '');
    const userAnswer = input.trim();
    const correctAnswer = queue[index]?.answer || '';
    const isCorrect = clean(userAnswer) === clean(correctAnswer);

    setAttempts(prev => [
      ...prev,
      {
        question: queue[index]?.question,
        userAnswer,
        correctAnswer,
        isCorrect,
      }
    ]);

    isCorrect ? markCorrect() : markWrong();
  };

  const nextCard = () => {
    setInput('');
    setFeedback(null);
    setShowCorrectAnswer(null);
    const ni = index + 1;
    if (ni >= queue.length) {
      stopTimer();
      setStage('finished');
    } else {
      setIndex(ni);
      startTimer();
    }
  };

  useEffect(() => {
    if (stage === 'playing') startTimer();
    return () => stopTimer();
  }, [stage]);

  const card = queue[index] || {};
  const progress = flashcards.length ? ((correct + wrong) / flashcards.length) * 100 : 0;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a]
" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
      <div className="absolute inset-0 backdrop-blur bg-gradient-to-br from-[#10141f] via-[#1a1f2f] to-[#0f0f0f] opacity-80" />

      <AnimatePresence>
        {loading && (
          <motion.div className="z-50 absolute inset-0 flex flex-col items-center justify-center text-white bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="flex items-center gap-3 mb-4 animate-pulse">
              <BrainCircuit className="text-cyan-400" size={32} />
              <h1 className="text-4xl font-extrabold text-cyan-400 tracking-wide">SIXTY TYPE</h1>
            </motion.div>
            <motion.p className="text-lg text-gray-300">Loading interface...</motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative z-10 w-full max-w-3xl">
          {stage === 'splash' && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-10 shadow-2xl bg-white/5 backdrop-blur-md text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BrainCircuit className="text-cyan-400" size={36} />
                <h1 className="text-4xl font-bold text-cyan-300 tracking-widest">SIXTY TYPE</h1>
              </div>
              <p className="mb-4 text-gray-300">Type the correct answer in less than <span className="text-yellow-300 font-bold">60 seconds</span>.</p>
              <p className="mb-4 text-gray-400">You have <span className="text-red-400 font-bold">3 lives</span>. Miss one, lose a heart.</p>
              <label className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 border border-cyan-400 text-sm py-3 px-6 rounded-xl inline-block">
                Upload encrypted .txt file
                <input type="file" accept=".txt" onChange={e => handleUpload(e.target.files[0])} className="hidden" />
              </label>
            </motion.div>
          )}
          {(stage === 'over' || stage === 'finished' || stage === 'playing') && (
            <>
              {stage === 'playing' && (
                <motion.div className="rounded-xl p-8 shadow-2xl bg-[#1c1e2f]/90 mt-4">
                  <div className="flex items-center justify-between mb-4 text-white">
                    <div className="flex gap-1">{[...Array(lives)].map((_, i) => <Heart key={i} className="text-red-500 w-6 h-6" />)}</div>
                    <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> {timer}s</div>
                    <div className="flex gap-2">
                      <button onClick={() => window.location.reload()}><RefreshCw className="text-cyan-400 w-5 h-5" /></button>
                      <button onClick={() => { const shuffled = [...flashcards].sort(() => Math.random() - 0.5); setQueue(shuffled); setIndex(0); }}><Shuffle className="text-yellow-400 w-5 h-5" /></button>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
                    <motion.div className="h-2 bg-purple-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
                  </div>
                  <div>
                    <p className="text-xl text-white mb-4">{card.question || 'Cargando pregunta...'}</p>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Escribe tu respuesta..." className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-400" />
                    <div className="mt-4">
                      {feedback && <p className={`font-bold text-lg ${feedback.includes('✔️') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</p>}
                      {showCorrectAnswer && <p className="text-red-300">Respuesta correcta: {showCorrectAnswer}</p>}
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button onClick={check} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white">Verificar</button>
                      {feedback && <button onClick={nextCard} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Siguiente</button>}
                    </div>
                  </div>
                </motion.div>
              )}
              {(stage === 'over' || stage === 'finished') && (
                <div className="text-center space-y-4 text-white mt-6">
                  <h2 className="text-2xl font-bold">{stage === 'over' ? 'Game Over' : '¡Completado!'}</h2>
                  <p>✔️ {correct} — ❌ {wrong}</p>
                  <p className="text-cyan-300 font-bold">🔥 Racha Máxima: {maxStreak}</p>
                  <p className="text-gray-400">Sigue estudiando</p>
                  <div className="text-left bg-[#0f1123]/60 p-4 rounded-lg max-h-[300px] overflow-y-auto border border-gray-700">
                    <h3 className="text-lg font-bold text-cyan-300 mb-2">📋 Resumen de respuestas</h3>
                    <ul className="space-y-2 text-sm">
                      {attempts.map((a, i) => (
                        <li key={i} className={`p-2 rounded ${a.isCorrect ? 'bg-green-800/40' : 'bg-red-800/40'}`}>
                          <p><strong>❓ Pregunta:</strong> {a.question}</p>
                          <p><strong>📝 Tu respuesta:</strong> <span className={a.isCorrect ? 'text-green-300' : 'text-red-300'}>{a.userAnswer}</span></p>
                          {!a.isCorrect && <p><strong>✅ Respuesta correcta:</strong> <span className="text-green-400">{a.correctAnswer}</span></p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <button onClick={() => { resetGame(flashcards); setStage('playing'); }} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">Reintentar</button>
                    <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm">
                      Subir nuevo archivo
                      <input type="file" accept=".txt" onChange={e => handleUpload(e.target.files[0])} className="hidden" />
                    </label>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
