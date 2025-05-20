import React, { useState, useEffect, useRef } from 'react';

const GappedTextQuizUploader = () => {
  const [text, setText] = useState('');
  const [gaps, setGaps] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctMap, setCorrectMap] = useState({});
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);

  // Fisher–Yates shuffle
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const startTimer = () => {
    startRef.current = Date.now();
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    stopTimer();
    setSubmitted(false);
    setAnswers({});
    setElapsed(0);

    let content = await file.text();

    // Try Base64 decode
    try {
      const binary = atob(content.replace(/\s/g, ''));
      const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
      const decoded = new TextDecoder().decode(bytes);
      if (decoded.includes('(1)') && /\d+\.\s/.test(decoded)) {
        content = decoded;
        alert('✅ Archivo descifrado automáticamente.');
      }
    } catch { }

    // Robust split: lines starting with "n." go to options
    const lines = content.split(/\r?\n/);
    const textLines = [];
    const optionLines = [];
    let seenOptions = false;

    for (let line of lines) {
      if (seenOptions || /^\d+\.\s*/.test(line)) {
        seenOptions = true;
        optionLines.push(line);
      } else {
        textLines.push(line);
      }
    }

    const rawText = textLines.join('\n');
    const rawOptions = optionLines;

    // Extract gaps
    const gapPattern = /\((\d)\)/g;
    const extracted = [...rawText.matchAll(gapPattern)].map(m => Number(m[1]));
    const display = rawText.replace(gapPattern, (m, p1) => `<<<${p1}>>>`);

    // Clean options
    const cleanedOrdered = rawOptions
      .filter(l => l.trim())
      .map(l => l.replace(/^\d+\.\s*/, ''));

    // Map correct answers
    const map = {};
    extracted.forEach((num, i) => map[num] = cleanedOrdered[i]);

    // Shuffle for display
    const shuffled = shuffleArray(cleanedOrdered);

    setText(display);
    setGaps(extracted);
    setOptions(shuffled);
    setCorrectMap(map);
    startTimer();
  };

  const handleChange = (gapNum, value) => {
    setAnswers(a => ({ ...a, [gapNum]: value }));
  };

  const handleSubmit = () => {
    stopTimer();
    setSubmitted(true);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    startTimer();
  };

  const handleResetAll = () => {
    stopTimer();
    setText('');
    setGaps([]);
    setOptions([]);
    setAnswers({});
    setCorrectMap({});
    setSubmitted(false);
    setElapsed(0);
  };

  const score = gaps.filter(g => answers[g] === correctMap[g]).length;

  const renderSelect = (n) => (
    <select
      key={n}
      value={answers[n] || ''}
      onChange={e => handleChange(n, e.target.value)}
      disabled={submitted}
      className={`
        mx-1 px-2 py-1 text-sm rounded-lg 
        bg-gray-800 text-white 
        border-2 
        focus:outline-none focus:ring-2 focus:ring-indigo-400
        ${submitted
          ? answers[n] === correctMap[n]
            ? 'border-green-500'
            : 'border-red-500'
          : 'border-gray-600 hover:border-gray-400'}
      `}
    >
      <option value="">–</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  );

  return (
    <div className="max-w-md mx-auto bg-black bg-opacity-60 text-white p-4 rounded-xl shadow-lg font-sans text-sm">
      <h1 className="text-xl font-bold text-center mb-2">Gapped Text Quiz</h1>

      {!text ? (
        <div className="mb-4">
          <label className="block mb-1">Sube archivo .txt:</label>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="w-full text-xs p-1 bg-gray-800 rounded-lg"
          />
        </div>
      ) : (
        <>
          <div className="mb-2 text-right text-xs">
            Tiempo: <span className="font-mono">{elapsed}s</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl mb-3 max-h-64 overflow-y-auto whitespace-pre-wrap">
            {text.split(/(<<<\d+>>>)/g).map((part, idx) => {
              const m = part.match(/<<<(\d+)>>>/);
              return m
                ? renderSelect(Number(m[1]))
                : <span key={idx}>{part}</span>;
            })}
          </div>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="w-full py-1 bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm"
            >
              Verificar
            </button>
          ) : (
            <div className="space-y-2">
              <div className="text-center">
                Resultado: <strong>{score}/{gaps.length}</strong>
              </div>
              <ul className="text-xs list-disc list-inside mb-2 max-h-32 overflow-y-auto">
                {gaps.map(n => (
                  <li key={n}>
                    ({n}) Tu: <span className={answers[n] === correctMap[n] ? 'text-green-400' : 'text-red-400'}>
                      {answers[n] || '–'}
                    </span> | ✔ {correctMap[n]}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between">
                <button onClick={handleResetQuiz} className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs">
                  Reintentar
                </button>
                <button onClick={handleResetAll} className="px-2 py-1 bg-gray-700 hover:bg-gray-800 rounded text-xs">
                  Subir otro
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GappedTextQuizUploader;
