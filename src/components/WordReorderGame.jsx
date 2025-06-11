import React, { useState } from 'react';
import { motion } from 'framer-motion';

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function WordReorderGame() {
  const [pairs, setPairs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [answersLog, setAnswersLog] = useState([]);
  const [stage, setStage] = useState('splash');

  const handleUpload = async (file) => {
    if (!file) return;
    const text = await file.text();
    console.log("Texto cargado:", text);

    const lines = text
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean); // quita líneas vacías

    const results = [];

    for (let i = 0; i < lines.length - 1; i++) {
      const lineP = lines[i].trim().toLowerCase();
      const lineR = lines[i + 1].trim().toLowerCase();

      if (lineP.startsWith('p:') && lineR.startsWith('r:')) {
        results.push({
          question: lines[i].substring(2).trim(),
          answer: lines[i + 1].substring(2).trim().toLowerCase(),
        });
        i++; // salta la siguiente línea (R)
      }
    }

    if (!results.length) {
      alert("❌ El archivo no contiene pares válidos con 'P:' y 'R:'.");
      console.error("Archivo no válido. Líneas leídas:", lines);
      return;
    }

    setPairs(results);
    setCurrentIndex(0);
    setLetters(shuffleArray(results[0].answer.split('')));
    setAnswersLog([]);
    setStage('playing');
  };

  const resetGame = (data) => {
    setPairs(data);
    setCurrentIndex(0);
    setLetters(shuffleArray(data[0].answer.split('')));
    setAnswersLog([]);
    setStage('playing');
  };

  const handleDrop = (index) => {
    const updated = [...letters];
    const temp = updated[dragIndex];
    updated[dragIndex] = updated[index];
    updated[index] = temp;
    setLetters(updated);
    setDragIndex(null);
  };

  const getLetterStyle = (letter, index, answer) => {
    return letter === answer[index] ? 'bg-green-500 text-white' : 'bg-gray-700 text-white';
  };

  const handleCorrect = () => {
    const current = pairs[currentIndex];
    setAnswersLog(log => [...log, { question: current.question, answer: current.answer }]);
    if (currentIndex + 1 < pairs.length) {
      const next = pairs[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      setLetters(shuffleArray(next.answer.split('')));
    } else {
      setStage('finished');
    }
  };

  const current = pairs[currentIndex];
  const progress = ((currentIndex) / pairs.length) * 100;
  const isCorrect = letters.join('') === current?.answer;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6" onDragOver={e => e.preventDefault()}>
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center animate-pulse-slow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] opacity-90" />
      <div className="relative z-10 w-full max-w-3xl">
        {stage === 'splash' && (
          <motion.div className="rounded-xl p-8 shadow-2xl bg-[#1c1e2f]/80 backdrop-blur text-center">
            <h1 className="text-3xl font-bold text-cyan-300 mb-4">Ordena las letras</h1>
            <p className="text-gray-400 mb-4">Sube tu archivo .txt con preguntas</p>
            <label className="cursor-pointer bg-[#1f1f2e] hover:bg-[#29293d] border border-gray-600 text-sm py-2 px-4 rounded-xl inline-block">
              📂 Subir archivo .txt
              <input type="file" accept=".txt" onChange={e => handleUpload(e.target.files[0])} className="hidden" />
            </label>
          </motion.div>
        )}

        {stage === 'playing' && current && (
          <motion.div className="rounded-xl p-8 shadow-2xl bg-[#1c1e2f]/80 backdrop-blur text-center">
            <p className="text-cyan-300 text-lg font-semibold mb-6">{current.question}</p>
            <div className="w-full bg-gray-800 h-2 rounded-full mb-4">
              <div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {letters.map((letter, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => setDragIndex(index)}
                  onDrop={() => handleDrop(index)}
                  onDragOver={(e) => e.preventDefault()}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold shadow transition-transform cursor-move ${getLetterStyle(letter, index, current.answer)}`}
                >
                  {letter}
                </div>
              ))}
            </div>
            {isCorrect && setTimeout(() => handleCorrect(), 1000) && (
              <p className="text-green-400 font-bold animate-pulse">🎉 ¡Correcto!</p>
            )}
          </motion.div>
        )}

        {stage === 'finished' && (
          <motion.div className="rounded-xl p-8 shadow-2xl bg-[#1c1e2f]/80 backdrop-blur text-center space-y-4 text-white">
            <h2 className="text-2xl font-bold">¡Completado!</h2>
            <p className="text-cyan-300 font-bold">✔️ Total: {answersLog.length}</p>
            <div className="flex flex-col items-center gap-3">
              <button onClick={() => resetGame(pairs)} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">
                Practicar nuevamente
              </button>
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm">
                Subir nuevo archivo
                <input type="file" accept=".txt" onChange={e => handleUpload(e.target.files[0])} className="hidden" />
              </label>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
