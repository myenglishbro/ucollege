import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import testsData from "../data/testsData.json";

// Theme colors
const accent = "#1515FF";
const bgMain = "#F6F8FF";
const codeBg = "#EEF1FF";
const codeText = "#1515FF";

export default function UseOfEnglishInline() {
  const [unlocked, setUnlocked] = useState({ 0: true });
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [unlockCode, setUnlockCode] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [modalLevel, setModalLevel] = useState(null);
  const [showMsg, setShowMsg] = useState(null);

  // Level menu
  if (selectedTest === null) {
    return (
      <div style={{ background: bgMain }} className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 style={{ color: accent }} className="text-5xl font-extrabold mb-10">Selecciona un nivel</h1>
        <div className="flex flex-wrap gap-8">
          {testsData.tests.map((test, idx) => (
            <motion.div
              key={test.id}
              whileHover={{ scale: unlocked[idx] ? 1.03 : 1 }}
              onClick={() => unlocked[idx] ? setSelectedTest(idx) : (setModalLevel(idx), setShowCodeModal(true))}
              className={`relative flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-opacity ${unlocked[idx] ? 'cursor-pointer' : 'opacity-50'}`}
            >
              <div className="w-24 h-24 mb-2 rounded-full overflow-hidden border-4" style={{ borderColor: accent }}>
                {unlocked[idx] ? (
                  <img src={test.thumbnail} alt={test.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: codeBg }}>
                    <span className="text-4xl text-gray-600">🔒</span>
                  </div>
                )}
              </div>
              <span style={{ color: accent }} className="font-semibold text-center">{test.title}</span>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {showCodeModal && (
            <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-white p-6 rounded-2xl shadow-lg w-80"
                initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                <h2 style={{ color: accent }} className="text-2xl font-bold mb-4">🔒 Nivel {modalLevel + 1}</h2>
                <p className="text-gray-700 mb-2">Ingresa el código:</p>
                <input type="text" value={unlockCode} onChange={e => setUnlockCode(e.target.value)}
                  className="w-full p-2 mb-4 text-center rounded-lg" style={{ border: `2px solid ${accent}`, color: accent }}
                  placeholder="Código de acceso" />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowCodeModal(false)} className="text-gray-600">Cancelar</button>
                  <button onClick={() => {
                      if (unlockCode === testsData.tests[modalLevel].prerequisiteCode) {
                        setUnlocked(prev => ({ ...prev, [modalLevel]: true }));
                        setShowCodeModal(false);
                        setUnlockCode("");
                      } else alert("Código incorrecto");
                    }}
                    className="px-4 py-2 text-white rounded-lg" style={{ background: accent }}>
                    Desbloquear
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Quiz logic
  const test = testsData.tests[selectedTest];
  const total = Object.keys(test.options).length;
  const handleChange = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));

  const handleSubmit = () => {
    // Debug: log selections vs correct
    console.group("Debug: Violence quiz answers vs correctAnswers");
    Object.entries(test.correctAnswers).forEach(([id, ans]) => {
      const selected = answers[id] || '';
      console.log(`id ${id}: selected='${selected}', correct='${ans}'`);
    });
    console.groupEnd();

    let correct = 0;
    Object.entries(test.correctAnswers).forEach(([id, ans]) =>
      answers[id]?.trim().toLowerCase() === ans.trim().toLowerCase() && correct++
    );
    setScore(correct);
    setShowMsg(correct === total ? 'correct' : 'incorrect');
    setSubmitted(true);
    setTimeout(() => setShowMsg(null), 1500);
  };

  const reset = () => {
    setSelectedTest(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowMsg(null);
    setUnlockCode("");
  };
  const nextIndex = selectedTest + 1;

  // Before submit
  if (!submitted) {
    return (
      <div style={{ background: bgMain }} className="min-h-screen flex flex-col items-center p-6">
        <button onClick={reset} className="self-start mb-4" style={{ color: accent }}>← Volver</button>
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md">
          <h2 style={{ color: accent }} className="text-2xl font-bold mb-6">{test.title}</h2>
          <AnimatePresence>
            {showMsg === 'correct' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="mb-4 p-2 bg-green-100 text-green-800 rounded-lg text-center">
                ¡Genial! 🎉 Todas correctas.
              </motion.div>
            )}
            {showMsg === 'incorrect' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="mb-4 p-2 bg-red-100 text-red-800 rounded-lg text-center">
                Faltaron respuestas. 🚫
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-gray-700 mb-8 leading-relaxed">
            {test.segments.map((seg, idx) =>
              typeof seg === 'string' ? seg : (
                <select key={idx} value={answers[seg.id]||''} onChange={e => handleChange(seg.id, e.target.value)}
                  disabled={submitted}
                  className="mx-1 p-2 rounded-lg"
                  style={{
                    border: `2px solid ${accent}`,
                    background: submitted
                      ? (answers[seg.id]?.trim().toLowerCase() === test.correctAnswers[seg.id]?.trim().toLowerCase()
                        ? '#d4f8e8' : '#ffecec')
                      : '#fff',
                    color: accent
                  }}>
                  <option value="" disabled>…</option>
                  {test.options[seg.id].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              )
            )}
          </p>
          <button onClick={handleSubmit}
            disabled={Object.keys(answers).length < total}
            className="w-full py-3 rounded-lg text-white"
            style={{ background: accent, opacity: Object.keys(answers).length < total ? 0.5 : 1 }}>
            Enviar respuestas
          </button>
        </div>
      </div>
    );
  }

  // Results and next
  return (
    <div style={{ background: bgMain }} className="min-h-screen flex flex-col items-center p-6">
      <button onClick={reset} className="self-start mb-4" style={{ color: accent }}>← Volver</button>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
        <p style={{ color: accent }} className="text-3xl font-bold mb-4">Puntuación</p>
        <p className="text-xl text-gray-800 mb-6">{score} de {total}</p>
        <div className="mb-6 text-left">
          <h3 style={{ color: accent }} className="font-semibold mb-2">Explicaciones:</h3>
          <ul className="list-decimal list-inside text-gray-700 space-y-1">
            {Object.entries(test.explanations).map(([_, txt]) => <li key={_}>{txt}</li>)}
          </ul>
        </div>
        {score === total && nextIndex < testsData.tests.length && (
          <>
            <p className="mb-2" style={{ color: accent }}>¡Correcto! Código:</p>
            <code style={{ background: codeBg, color: codeText }} className="font-mono px-3 py-1 rounded-lg mb-4 inline-block">
              {testsData.tests[nextIndex].prerequisiteCode}
            </code>
            <button
              onClick={() => {
                setUnlocked(prev => ({ ...prev, [nextIndex]: true }));
                setSelectedTest(nextIndex);
                setAnswers({});
                setSubmitted(false);
                setScore(0);
                setShowMsg(null);
                setUnlockCode("");
              }}
              className="w-full py-2 text-white rounded-lg"
              style={{ background: accent }}>
              Next Level →
            </button>
          </>
        )}
        {score !== total && (
          <button onClick={() => setSubmitted(false)} className="mt-4 w-full py-2 bg-gray-300 text-gray-800 rounded-lg">
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
