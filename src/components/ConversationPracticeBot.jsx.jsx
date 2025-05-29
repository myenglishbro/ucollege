import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ConversationPracticeBot() {
  const [scenarios, setScenarios] = useState([]);
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [stage, setStage] = useState('upload');
  const [transcriptLog, setTranscriptLog] = useState('');
  const recognitionRef = useRef(null);

  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/gi, '').trim();

  const handleUpload = async (file) => {
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const results = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('P:') && lines[i + 1]?.startsWith('R:')) {
        const question = lines[i].replace('P:', '').trim();
        const options = lines[i + 1].replace('R:', '').split('|').map(opt => opt.trim());
        results.push({ bot: question, options, answer: options[0] });
      }
    }
    setScenarios(results);
    setStep(0);
    setStage('playing');
  };

  const current = scenarios[step];

  useEffect(() => {
    if (current && 'speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(current.bot);
      utter.lang = 'en-US';
      utter.rate = 0.95;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }, [current]);

  const handleAnswer = (choice) => {
    const userAnswer = normalize(choice);
    const correctAnswer = normalize(current.answer);
    if (userAnswer !== correctAnswer) {
      setFeedback(`❌ "${choice}" is not quite right. Choose a more natural answer for the context.`);
      setStage('over');
      return;
    }

    setFeedback('✅ Good job!');
    if (step + 1 < scenarios.length) {
      setTimeout(() => {
        setStep(prev => prev + 1);
        setFeedback('');
        setTranscriptLog('');
      }, 1200);
    } else {
      setFeedback('🎉 Conversation completed!');
    }
  };

  const handleSpeak = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setTranscriptLog(transcript);
      handleAnswer(transcript);
    };

    recognition.onerror = () => {
      setTranscriptLog('');
      setFeedback('🎤 Could not understand. Try again.');
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] flex items-center justify-center p-6 text-white relative"
      onDrop={e => {
        e.preventDefault();
        handleUpload(e.dataTransfer.files[0]);
      }}
      onDragOver={e => e.preventDefault()}
    >
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center animate-pulse-slow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] opacity-90" />
      <div className="relative z-10 w-full max-w-xl">
        {stage === 'upload' && (
          <motion.div className="rounded-xl p-8 shadow-2xl bg-[#1c1e2f]/80 backdrop-blur text-center">
            <h1 className="text-2xl font-bold text-cyan-300 mb-4">Practice English Conversation</h1>
            <p className="text-gray-400 mb-4">Upload your TXT file</p>
            <label className="cursor-pointer bg-[#1f1f2e] hover:bg-[#29293d] border border-gray-600 text-sm py-2 px-4 rounded-xl inline-block">
              📂 Upload .txt
              <input type="file" accept=".txt" onChange={e => handleUpload(e.target.files[0])} className="hidden" />
            </label>
          </motion.div>
        )}

        {stage === 'playing' && current && (
          <div className="bg-[#1c1e2f]/80 rounded-xl shadow-2xl p-8 w-full text-center">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${((step + 1) / scenarios.length) * 100}%` }}
              ></div>
            </div>

            <h2 className="text-lg font-semibold text-cyan-300 mb-4">🤖 {current.bot}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {current.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="bg-[#2a2f45] hover:bg-[#3a3f5c] p-3 rounded-lg border border-gray-600 text-sm transition"
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleSpeak}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              🎤 Speak Your Answer
            </button>

            {transcriptLog && (
              <p className="mt-3 text-xs text-gray-400">You said: "{transcriptLog}"</p>
            )}

            {feedback && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-lg">
                {feedback}
              </motion.p>
            )}
          </div>
        )}

        {stage === 'over' && (
          <div className="text-center bg-[#1c1e2f]/80 rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-4">🚫 Game Over</h2>
            <p className="text-gray-300 mb-2">{feedback}</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white"
                onClick={() => {
                  setStage('playing');
                  setStep(0);
                  setFeedback('');
                  setTranscriptLog('');
                }}
              >
                🔁 Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
