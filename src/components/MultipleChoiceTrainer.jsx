import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [gameOver, setGameOver] = useState(false);
  const [finished, setFinished] = useState(false);

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

  const handleUpload = async e => {
    const file = e.target.files[0]; if (!file) return;
    let raw = await file.text(); raw = base64ToUtf8(raw);
    const loaded = parseTXT(raw);
    if (loaded.length) {
      setQuestions(loaded);
      setAnswersLog([]);
      resetState(false);
    }
  };

  const resetState = clear => {
    if (clear) setQuestions([]);
    setCurrentIndex(0);
    setFeedback('');
    setLives(3);
    setTimer(COUNTDOWN_START);
    setStreak(0);
    setGameOver(false);
    setFinished(false);
    setShowSettings(clear);
  };

  const handleAnswer = choice => {
    const q = questions[currentIndex]; if (!q) return;
    const correct = choice?.trim().toLowerCase() === q.answer.trim().toLowerCase();
    setAnswersLog(log => [...log, { question: q.error, chosen: choice || '⏰', correct: q.answer }]);
    if (mode === MODES.LIFE) {
      if (!correct) setLives(l => l - 1);
      else setStreak(s => s + 1);
      setFeedback(correct ? '✔️' : `✖️ ${q.answer}`);
      setTimeout(() => { setTimer(COUNTDOWN_START); setCurrentIndex(i => i + 1); setFeedback(''); }, 800);
    } else {
      if (!correct) setStreak(0); else setStreak(s => s + 1);
      setCurrentIndex(i => i + 1);
    }
  };

  if (showSettings) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D0D0D] font-sans px-4">
      <div className="p-8 bg-[#1E1E1E] rounded-2xl shadow-xl w-full max-w-md text-center text-[#E0E0E0] border border-[#2A2A2A]">
        <h1 className="text-3xl font-extrabold mb-6 uppercase tracking-wider text-[#FF8C00]">Multiple Choice Trainer 🚀</h1>
        <p className="text-sm text-[#B0B0B0] mb-4">Train smarter. Answer sharper.</p>
        <div className="flex justify-center gap-4 mb-6">
          {[MODES.LIFE, MODES.QUIZ].map(m => (
            <motion.button
              key={m}
              onClick={() => setMode(m)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition ${mode===m ? 'bg-gradient-to-r from-[#FF8C00] to-[#FF4500] text-white' : 'bg-[#2A2A2A] text-[#B0B0B0]'}`}
            >{m==='LIFE' ? '🎯 Modo Vida' : '🌀 Modo Quiz'}</motion.button>
          ))}
        </div>
        <label className="block cursor-pointer bg-[#2A2A2A] hover:bg-[#333333] text-sm py-2 px-4 rounded-full font-medium">
          📂 Subir archivo .txt
          <input type="file" accept=".txt" onChange={handleUpload} className="hidden" />
        </label>
      </div>
    </div>
  );

  if (gameOver || finished) {
    const total = answersLog.length;
    const correctCount = answersLog.filter(a=>a.chosen===a.correct).length;
    const accuracy = total ? Math.round((correctCount/total)*100):0;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D0D0D] font-sans p-4">
        <div className="bg-[#1E1E1E] p-6 rounded-2xl shadow-2xl w-full max-w-2xl text-[#E0E0E0] border border-[#2A2A2A]">
          <h2 className="text-2xl font-bold mb-4">{finished ? '✅ Quiz Completado' : '💀 Game Over'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="font-medium">Aciertos:</div><div>{correctCount}/{total} ({accuracy}%)</div>
            <div className="font-medium">Racha:</div><div>{streak}</div>
          </div>
          <div className="max-h-60 overflow-y-auto mb-4 space-y-1 px-3 py-2 bg-[#2A2A2A] rounded-lg">
            {answersLog.map((a,i)=>(
              <div key={i} className="flex justify-between text-xs">
                <span className="text-[#B0B0B0]">Q{i+1}: {a.question}</span>
                <span className={a.chosen===a.correct?'text-green-400':'text-red-400'}>{a.chosen}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <motion.button whileHover={{opacity:0.8}} onClick={()=>resetState(true)} className="px-4 py-2 bg-[#333333] rounded-full text-sm">📂 Subir otro</motion.button>
            <motion.button whileHover={{opacity:0.8}} onClick={()=>resetState(false)} className="px-4 py-2 bg-[#333333] rounded-full text-sm">🔁 Reintentar</motion.button>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[currentIndex]||{};
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D0D0D] font-sans p-4">
      <div className="bg-[#1E1E1E] p-6 rounded-2xl shadow-lg w-full max-w-3xl text-[#E0E0E0] border border-[#2A2A2A]">
        <div className="flex justify-between mb-4 text-sm text-[#B0B0B0]">
          {mode==='LIFE' ? <span>❤️ {lives} &nbsp; ⏳ {timer}s</span> : <span>🔥 Racha: {streak}</span>}
        </div>
        <div className="mb-6 text-lg font-semibold leading-tight text-white">{current.error}</div>
        <div className="grid grid-cols-2 gap-4">
          {current.options?.map((opt,i)=>(
            <motion.button key={i} onClick={()=>handleAnswer(opt)} whileHover={{scale:1.05}} whileTap={{scale:0.95}} className="p-3 bg-[#2A2A2A] hover:bg-[#333333] rounded-lg text-sm text-white transition-all">
              {opt}
            </motion.button>
          ))}
        </div>
        {feedback && <div className="mt-4 text-center text-sm font-bold text-green-400">{feedback}</div>}
      </div>
    </div>
  );
}
