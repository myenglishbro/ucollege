import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COUNTDOWN_START = 15;
const MODES = { LIFE: 'LIFE', QUIZ: 'QUIZ' };

export default function MultipleChoiceTrainer() {
  const [mode, setMode] = useState(MODES.LIFE);
  const [showSettings, setShowSettings] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answersLog, setAnswersLog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(COUNTDOWN_START);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finished, setFinished] = useState(false);
  const [animateCorrect, setAnimateCorrect] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (mode !== MODES.LIFE || gameOver || finished) return;
    if (timer <= 0) return handleAnswer(null);
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, mode, gameOver, finished]);

  useEffect(() => {
    if (mode === MODES.QUIZ && currentIndex >= questions.length) setFinished(true);
  }, [currentIndex, mode, questions.length]);

  useEffect(() => {
    if (mode === MODES.LIFE && lives <= 0) setGameOver(true);
  }, [lives, mode]);

  const parseTXT = text => {
    const pattern = /E:\s*(.*?)\s*[\r\n]+O:\s*(.*?)\s*[\r\n]+A:(.*?)(?=[\r\n]+E:|$)/gs;
    return [...text.matchAll(pattern)].map(m => ({
      error: m[1].trim(),
      options: m[2].split('|').map(o => o.trim()),
      answer: m[3].split('→')[0].trim(),
    }));
  };

  const base64ToUtf8 = b64 => {
    try {
      const clean = b64.replace(/\s/g, '');
      const bin = atob(clean);
      const arr = Uint8Array.from(bin, c => c.charCodeAt(0));
      return new TextDecoder().decode(arr);
    } catch { return b64; }
  };

  const handleUpload = async file => {
    if (!file) return;
    let raw = await file.text(); raw = base64ToUtf8(raw);
    const loaded = parseTXT(raw);
    if (loaded.length) {
      setQuestions(loaded);
      setAnswersLog([]);
      resetState(false);
    }
  };

  const handleFileChange = e => handleUpload(e.target.files[0]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDrag = useCallback((e, state) => {
    e.preventDefault();
    setDragActive(state);
  }, []);

  const resetState = clear => {
    if (clear) setQuestions([]);
    setCurrentIndex(0);
    setFeedback('');
    setLives(3);
    setTimer(COUNTDOWN_START);
    setStreak(0);
    setMaxStreak(0);
    setGameOver(false);
    setFinished(false);
    setAnimateCorrect(false);
    setShowSettings(clear);
  };

  const handleAnswer = choice => {
    const q = questions[currentIndex]; if (!q) return;
    const correct = choice?.trim().toLowerCase() === q.answer.trim().toLowerCase();
    setAnswersLog(log => [...log, { question: q.error, chosen: choice || '⏰', correct: q.answer }]);
    setAnimateCorrect(correct);
    if (correct) {
      setStreak(s => {
        const newStreak = s + 1;
        setMaxStreak(m => Math.max(m, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
    setFeedback(correct ? '✔️ ¡Correcto!' : `✖️ ${q.answer}`);
    setTimeout(() => {
      if (mode === MODES.LIFE && !correct) setLives(l => l - 1);
      if (mode === MODES.LIFE) setTimer(COUNTDOWN_START);
      setCurrentIndex(i => i + 1);
      setFeedback('');
      setAnimateCorrect(false);
    }, 1000);
  };

  const current = questions[currentIndex] || {};
  const gradient = 'bg-gradient-to-br from-[#121212] via-[#1F1F1F] to-[#2B2B2B]';
  const card = 'rounded-3xl p-6 shadow-xl border border-[#333]';

  if (showSettings) return (
    <div
      className={`flex items-center justify-center min-h-screen ${gradient} text-white font-sans px-4 transition-all duration-500`}
      onDrop={handleDrop}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
    >
      <div className={`${card} w-full max-w-md text-center ${dragActive ? 'border-4 border-dashed border-[#FFD700]' : ''}`}>
        <h1 className="text-3xl font-bold mb-6 tracking-wider text-[#FFD700]">Multiple Choice Trainer 🚀</h1>
        <p className="text-sm text-gray-400 mb-4">Train smarter. Answer sharper.</p>
        <div className="flex justify-center gap-4 mb-6">
          {[MODES.LIFE, MODES.QUIZ].map(m => (
            <motion.button
              key={m}
              onClick={() => setMode(m)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${mode===m ? 'bg-[#FFD700] text-black' : 'bg-[#333] text-gray-300'}`}
            >{m==='LIFE' ? '🎯 Modo Vida' : '🌀 Modo Quiz'}</motion.button>
          ))}
        </div>
        <label className="block cursor-pointer bg-[#333] hover:bg-[#444] text-sm py-2 px-4 rounded-xl font-medium">
          📂 Subir archivo .txt o arrástralo aquí
          <input type="file" accept=".txt" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </div>
  );

  if (gameOver || finished) {
    const total = answersLog.length;
    const correctCount = answersLog.filter(a=>a.chosen===a.correct).length;
    const accuracy = total ? Math.round((correctCount/total)*100):0;
    return (
      <div className={`flex items-center justify-center min-h-screen ${gradient} text-white p-4`}>
        <div className={`${card} w-full max-w-2xl`}>
          <h2 className="text-2xl font-bold mb-4">{finished ? '✅ Quiz Completado' : '💀 Game Over'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>Aciertos:</div><div>{correctCount}/{total} ({accuracy}%)</div>
            <div>Racha Máxima:</div><div>{maxStreak}</div>
          </div>
          <div className="max-h-60 overflow-y-auto mb-4 space-y-1 px-3 py-2 bg-[#222] rounded-lg">
            {answersLog.map((a,i)=>(
              <div key={i} className="flex justify-between text-xs">
                <span className="text-gray-400">Q{i+1}: {a.question}</span>
                <span className={a.chosen===a.correct?'text-green-400':'text-red-400'}>{a.chosen}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <motion.button whileHover={{opacity:0.8}} onClick={()=>resetState(true)} className="px-4 py-2 bg-[#444] rounded-xl text-sm">📂 Subir otro</motion.button>
            <motion.button whileHover={{opacity:0.8}} onClick={()=>resetState(false)} className="px-4 py-2 bg-[#444] rounded-xl text-sm">🔁 Reintentar</motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${gradient} text-white p-4`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`${card} w-full max-w-3xl`}
      >
        <div className="flex justify-between mb-4 text-sm text-gray-400">
          {mode==='LIFE' ? <span>❤️ {lives} ⏳ {timer}s</span> : <span>🔥 Racha: {streak}</span>}
        </div>
        <div className="mb-6 text-lg font-semibold leading-tight text-white">{current.error}</div>
        <div className="grid grid-cols-2 gap-4">
          {current.options?.map((opt,i)=>(
            <motion.button
              key={i}
              onClick={()=>handleAnswer(opt)}
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
              animate={animateCorrect && opt.trim().toLowerCase() === current.answer.trim().toLowerCase() ? { scale: [1, 1.2, 1], backgroundColor: ["#2A2A2A", "#4CAF50", "#2A2A2A"] } : false}
              transition={{ duration: 0.6 }}
              className="p-3 bg-[#333] hover:bg-[#444] rounded-xl text-sm text-white transition-all"
            >
              {opt}
            </motion.button>
          ))}
        </div>
        {feedback && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center text-sm font-bold text-green-400">{feedback}</motion.div>}
      </motion.div>
    </div>
  );
}
