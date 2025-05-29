import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AudioListeningQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [stage, setStage] = useState('splash');
  const [correctCount, setCorrectCount] = useState(0);

  const handleUpload = async (file) => {
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).map(l => l.trim());
    const parsed = [];
    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i].startsWith('P:') && lines[i + 1]?.startsWith('R:')) {
        parsed.push({
          clue: lines[i].replace('P:', '').trim(),
          answer: lines[i + 1].replace('R:', '').trim().toLowerCase()
        });
      }
    }
    if (parsed.length === 0) return;
    setQuestions(parsed);
    setCurrentIndex(0);
    setUserInput('');
    setFeedback('');
    setCorrectCount(0);
    setStage('playing');
  };

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.8;
    speechSynthesis.speak(utter);
  };

  const handleCheck = () => {
    const current = questions[currentIndex];
    if (userInput.trim().toLowerCase() === current.answer) {
      setFeedback('✔️ ¡Correcto!');
      setCorrectCount(prev => prev + 1);
      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(currentIndex + 1);
          setUserInput('');
          setFeedback('');
        } else {
          setStage('finished');
        }
      }, 1000);
    } else {
      setFeedback('❌ Inténtalo de nuevo');
    }
  };

  const current = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center animate-pulse-slow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] opacity-90" />
      <div className="relative z-10 w-full max-w-xl text-white text-center">
        {stage === 'splash' && (
          <motion.div className="rounded-xl p-8 shadow-2xl bg-[#1c1e2f]/80 backdrop-blur">
            <h1 className="text-3xl font-bold text-cyan-300 mb-4">🎧 Audio Quiz</h1>
            <p className="text-gray-400 mb-4">Sube tu archivo .txt con pistas y respuestas</p>
            <label className="cursor-pointer bg-[#1f1f2e] hover:bg-[#29293d] border border-gray-600 text-sm py-2 px-4 rounded-xl inline-block">
              📂 Subir archivo .txt
              <input type="file" accept=".txt" onChange={e => handleUpload(e.target.files[0])} className="hidden" />
            </label>
          </motion.div>
        )}

        {stage === 'playing' && current && (
          <motion.div className="rounded-xl p-6 shadow-2xl bg-[#1c1e2f]/80 backdrop-blur">
            <p className="text-cyan-300 text-lg font-semibold mb-2">{current.clue}</p>

            <button
              onClick={() => speak(current.answer)}
              className="mb-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
            >
              🔊 Reproducir audio
            </button>

            <div className="flex flex-col items-center gap-2">
              <input
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="Escribe lo que escuchaste"
                className="px-4 py-2 rounded-lg text-black text-center"
              />
              <button
                onClick={handleCheck}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
              >
                Verificar
              </button>
            </div>
            {feedback && <p className="mt-3 text-lg font-bold animate-pulse">{feedback}</p>}

            <div className="mt-6 w-full bg-gray-800 h-2 rounded-full">
              <div
                className="bg-cyan-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </motion.div>
        )}

        {stage === 'finished' && (
          <motion.div className="rounded-xl p-6 shadow-2xl bg-[#1c1e2f]/80 backdrop-blur space-y-4">
            <h2 className="text-2xl font-bold text-green-400">¡Completado!</h2>
            <p className="text-cyan-300">✔️ Correctas: {correctCount} / {questions.length}</p>
            <button
              onClick={() => setStage('splash')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              Practicar de nuevo
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
