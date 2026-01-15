import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function MultipleChoiceTrainer() {
  const [questions, setQuestions] = useState([]);
  const [answersLog, setAnswersLog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSettings, setShowSettings] = useState(true);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (currentIndex >= questions.length && questions.length > 0) setFinished(true);
  }, [currentIndex, questions.length]);

  const parseTXT = text => {
    const pattern = /E:\s*(.*?)\s*[\r\n]+O:\s*(.*?)\s*[\r\n]+A:\s*(.*?)\s*[\r\n]+N:\s*(.*?)(?=\nE:|$)/gs;
    return [...text.matchAll(pattern)].map(m => ({
      error: m[1].trim(),
      options: m[2].split('|').map(o => o.trim()),
      answer: m[3].trim(),
      note: m[4]?.trim() || ''
    }));
  };

  const base64ToUtf8 = b64 => {
    try {
      const clean = b64.replace(/\s/g, '');
      const bin = atob(clean);
      const arr = Uint8Array.from(bin, c => c.charCodeAt(0));
      return new TextDecoder().decode(arr);
    } catch {
      return b64;
    }
  };

  const handleUpload = async file => {
    if (!file) return;
    let raw = await file.text();
    raw = base64ToUtf8(raw);
    const loaded = parseTXT(raw);
    if (!loaded.length) {
      alert('❌ El archivo no tiene el formato esperado.\n\nEjemplo:\nE: pregunta\nO: opción1 | opción2 | opción3\nA: respuesta\nN: explicación');
      return;
    }
    setQuestions(loaded);
    setAnswersLog([]);
    resetState(false);
  };

  const handleFileChange = e => handleUpload(e.target.files[0]);

  const handleDrop = useCallback(e => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  }, [handleUpload]);

  const handleDrag = useCallback((e, state) => {
    e.preventDefault();
    setDragActive(state);
  }, []);

  const resetState = clear => {
    if (clear) setQuestions([]);
    setCurrentIndex(0);
    setFeedback('');
    setStreak(0);
    setMaxStreak(0);
    setFinished(false);
    setSelectedOption(null);
    setShowSettings(clear);
    setAnswersLog([]);
  };

  const handleAnswer = choice => {
    const q = questions[currentIndex];
    if (!q) return;
    const correct = choice?.trim().toLowerCase() === q.answer.trim().toLowerCase();
    setAnswersLog(log => [...log, { question: q.error, chosen: choice || '⏰', correct: q.answer }]);
    setSelectedOption(choice);
    if (correct) {
      setStreak(s => {
        const newStreak = s + 1;
        setMaxStreak(m => Math.max(m, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
    setFeedback(
      correct
        ? '✔️ ¡Correcto!'
        : `✖️ ${q.answer}${q.note ? ` → ${q.note}` : ''}`
    );
    setTimeout(() => {
      setCurrentIndex(i => i + 1);
      setFeedback('');
      setSelectedOption(null);
    }, 2000);
  };

  const current = questions[currentIndex] || {};

  return (
    <div
      className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden"
      onDrop={handleDrop}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
    >
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center animate-pulse-slow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] opacity-90" />
      <div className="relative z-10 w-full max-w-4xl">
        {showSettings ? (
          <div className={`rounded-2xl p-8 shadow-2xl border border-white/10 bg-[#0D122B]/60 backdrop-blur-xl text-center ${dragActive ? 'border-4 border-cyan-400' : ''}`}>
            <h1 className="text-3xl font-bold text-cyan-300 mb-4">Multiple Choice Cloze</h1>
            <p className="text-gray-400 text-sm mb-4">Sube tu archivo para comenzar.</p>
            <label className="cursor-pointer bg-[#1f1f2e] hover:bg-[#29293d] border border-gray-600 text-gray-200 text-sm py-2 px-4 rounded-xl inline-block">
              📂 Subir archivo .txt o arrástralo aquí
              <input type="file" accept=".txt" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        ) : finished ? (
          <div className="rounded-2xl p-8 shadow-2xl border border-white/10 bg-[#0D122B]/60 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">✅ Quiz Completado</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
              <div>Aciertos:</div>
              <div className="text-cyan-400 font-bold">
                {answersLog.filter(a => a.chosen === a.correct).length}/{answersLog.length} (
                {Math.round((answersLog.filter(a => a.chosen === a.correct).length / answersLog.length) * 100)}%)
              </div>
              <div>Racha Máxima:</div>
              <div className="text-pink-400 font-bold">{maxStreak}</div>
            </div>
            <div className="max-h-64 overflow-y-auto bg-[#1f1f2e]/60 rounded-lg p-3 mb-4">
              {answersLog.map((a, i) => (
                <div key={i} className="flex justify-between text-xs text-gray-400">
                  <span>Q{i + 1}: {a.question}</span>
                  <span className={a.chosen === a.correct ? 'text-cyan-400' : 'text-red-400'}>
                    {a.chosen}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => resetState(true)} className="px-4 py-2 rounded-lg bg-[#1f1f2e] text-white border border-gray-600 hover:bg-[#29293d] text-sm">
                📂 Subir otro
              </button>
              <button onClick={() => resetState(false)} className="px-4 py-2 rounded-lg bg-[#1f1f2e] text-white border border-gray-600 hover:bg-[#29293d] text-sm">
                🔁 Reintentar
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-8 shadow-2xl border border-white/10 bg-[#0D122B]/60 backdrop-blur-xl"
          >
            <div className="mb-6 text-white text-lg font-semibold">{current.error}</div>
            <div className="mb-4 text-xs text-gray-400">Streak: {streak}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {current.options?.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    py-3 px-4 rounded-xl text-sm font-semibold transition-all
                    ${
                      selectedOption === opt
                        ? (opt === current.answer
                            ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white shadow-lg shadow-cyan-400/40'
                            : 'bg-red-500/80 text-white shadow-md')
                        : 'bg-[#1f1f2e] hover:bg-[#29293d] text-gray-200 border border-gray-600'
                    }
                  `}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 text-center text-sm px-4 py-3 rounded-lg ${
                  feedback.startsWith('✔️')
                    ? 'bg-green-700 text-white'
                    : 'bg-red-700 text-white'
                }`}
              >
                {feedback}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
