import React, { useState } from 'react';

const GappedTextQuizUploader = () => {
  const [text, setText] = useState('');
  const [gaps, setGaps] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctMap, setCorrectMap] = useState({});

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const content = await file.text();
    const [rawText, ...rawOptions] = content.split(/\n(?=\d+\.\s)/g);

    const gapPattern = /\((\d)\)/g;
    const extractedGaps = [...rawText.matchAll(gapPattern)].map(m => Number(m[1]));
    const displayText = rawText.replace(gapPattern, (match, p1) => `<<<${p1}>>>`);

    const cleanedOptions = rawOptions
      .join('\n')
      .split(/\n/)
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, ''));

    const map = {};
    extractedGaps.forEach((num, idx) => {
      if (cleanedOptions[idx]) {
        map[num] = cleanedOptions[idx];
      }
    });

    setText(displayText);
    setGaps(extractedGaps);
    setOptions(cleanedOptions);
    setCorrectMap(map);
    setAnswers({});
    setSubmitted(false);
  };

  const handleChange = (gapNum, value) => {
    setAnswers(prev => ({ ...prev, [gapNum]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const handleResetAll = () => {
    setText('');
    setGaps([]);
    setOptions([]);
    setAnswers({});
    setCorrectMap({});
    setSubmitted(false);
  };

  const score = gaps.filter(g => answers[g] === correctMap[g]).length;

  const renderGapSelect = (gapNum) => (
    <select
      key={gapNum}
      value={answers[gapNum] || ''}
      onChange={(e) => handleChange(gapNum, e.target.value)}
      disabled={submitted}
      className={`mx-2 px-2 py-1 rounded-xl border-2 bg-white/90 text-black backdrop-blur-md shadow ${
        submitted ?
          answers[gapNum] === correctMap[gapNum] ? 'border-green-500' : 'border-red-500'
          : 'border-gray-300'
      }`}
    >
      <option value="">--Selecciona--</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
  );

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-900 via-gray-800 to-black text-white p-8 font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">📄 Gapped Text Select Quiz</h1>

      {!text && (
        <div className="mb-8 max-w-xl mx-auto bg-white/5 p-4 rounded-xl backdrop-blur-lg shadow">
          <label className="block mb-2 font-semibold text-gray-300">Sube el archivo .txt (texto con huecos + opciones):</label>
          <input type="file" accept=".txt" onChange={handleFileUpload} className="w-full bg-white text-black rounded p-2" />
        </div>
      )}

      {text && (
        <div className="max-w-5xl mx-auto bg-white/5 p-6 rounded-3xl shadow-2xl backdrop-blur-md text-lg leading-relaxed text-white whitespace-pre-wrap">
          {text.split(/(<<<\d+>>>)/g).map((part, index) => {
            const match = part.match(/<<<(\d+)>>>/);
            if (match) {
              const gapNum = Number(match[1]);
              return renderGapSelect(gapNum);
            }
            return <span key={index}>{part}</span>;
          })}
        </div>
      )}

      {text && !submitted && (
        <div className="text-center mt-10">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition-all"
          >
            Verificar respuestas
          </button>
        </div>
      )}

      {submitted && (
        <div className="text-center mt-12 max-w-xl mx-auto bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-bold text-green-300 mb-4">Resultado</h2>
          <p className="text-lg mb-4">✅ Has obtenido <strong>{score}/{gaps.length}</strong> respuestas correctas.</p>
          <ul className="text-left list-disc list-inside space-y-1 text-sm text-gray-300">
            {gaps.map(gap => (
              <li key={gap}>
                <strong>{`(${gap})`}</strong>: Tu respuesta: <span className={answers[gap] === correctMap[gap] ? 'text-green-400' : 'text-red-400'}>{answers[gap] || '—'}</span>. Correcta: <span className="text-green-300">{correctMap[gap]}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-x-4">
            <button
              onClick={handleResetQuiz}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full shadow-lg transition-all"
            >
              Intentar nuevamente
            </button>
            <button
              onClick={handleResetAll}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-lg"
            >
              Subir otro archivo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GappedTextQuizUploader;
