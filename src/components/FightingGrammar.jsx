import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import presetData from './Aplicativos/data/fightingGrammar.json';

import playerImg from '../assets/warrior.png';
import playerHurtImg from '../assets/warrior_hurt.png';
import monsterImg from '../assets/monster.png';
import monsterHurtImg from '../assets/monster_hurt.png';

const MAX_HP = 100;
const COUNTDOWN_START = 10;

const FightingGrammar = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [timer, setTimer] = useState(COUNTDOWN_START);
  const [playerHP, setPlayerHP] = useState(MAX_HP);
  const [monsterHP, setMonsterHP] = useState(MAX_HP);
  const [feedback, setFeedback] = useState(null);
  const [battleAnim, setBattleAnim] = useState(null);
  const [endState, setEndState] = useState(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const [victoryCode, setVictoryCode] = useState('');
  const [showMenu, setShowMenu] = useState(true);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    const parsed = lines
      .filter(line => line.startsWith('Q:'))
      .map(line => {
        const m = line.match(/Q:(.*?)\s*O:(.*?)\s*A:(.*)/);
        if (!m) return null;
        const [, question, opts, answer] = m;
        return {
          question: question.trim(),
          options: opts.split('|').map(o => o.trim()),
          answer: answer.trim()
        };
      })
      .filter(Boolean);
    const codeLine = lines.find(line => line.startsWith('CODIGO:'));
    setQuestions(parsed);
    setVictoryCode(codeLine ? codeLine.split(':')[1].trim() : '');
    setShowMenu(false);
  };

  const startWithPreset = () => {
    setQuestions(presetData.questions || []);
    setVictoryCode(presetData.victoryCode || '');
    setShowMenu(false);
  };

  useEffect(() => {
    if (!questions.length) return;
    setCurrentQ(questions[0]);
    setPlayerHP(MAX_HP);
    setMonsterHP(MAX_HP);
    setTimer(COUNTDOWN_START);
    setFeedback(null);
    setEndState(null);
    setCountdown(COUNTDOWN_START);
    setQIndex(0);
  }, [questions]);

  useEffect(() => {
    if (!currentQ || endState) return;
    if (timer === 0) { handleAnswer(null); return; }
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, currentQ, endState]);

  const endGame = (state) => setEndState(state);

  const nextQuestion = () => {
    const next = (qIndex + 1) % questions.length;
    setQIndex(next);
    setCurrentQ(questions[next]);
    setTimer(monsterHP <= 30 ? Math.ceil(COUNTDOWN_START / 2) : COUNTDOWN_START);
    setFeedback(null);
  };

  const handleAnswer = (opt) => {
    if (!currentQ || endState) return;
    const correct = opt === currentQ.answer;
    if (correct) {
      setBattleAnim('player');
      setFeedback('Attack!');
      setMonsterHP(hp => { const nh = Math.max(0, hp - 10); if (nh === 0) endGame('win'); return nh; });
    } else {
      setBattleAnim('monster');
      setFeedback('Study More!');
      setPlayerHP(hp => { const nh = Math.max(0, hp - 10); if (nh === 0) endGame('lose'); return nh; });
    }
    setTimeout(nextQuestion, 500);
  };

  useEffect(() => {
    if (!endState) return;
    if (countdown === 0) {
      setEndState(null);
      setQuestions([]);
      setShowMenu(true);
      return;
    }
    const id = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(id);
  }, [endState, countdown]);

  const floatAnim = { y: [0, -10, 0], transition: { duration: 2, repeat: Infinity } };
  const hpPercentage = hp => `${(hp / MAX_HP) * 100}%`;

  if (endState) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
        <h1 className="text-white text-4xl mb-4">
          {endState === 'win' ? 'Victory!' : 'Defeat!'}
        </h1>
        {endState === 'win' && victoryCode && (
          <div className="bg-gray-800 p-4 rounded mb-4 w-full max-w-md">
            <h2 className="text-green-400 mb-2">Your Victory Code:</h2>
            <pre className="text-sm text-white overflow-x-auto">{victoryCode}</pre>
          </div>
        )}
        <p className="text-gray-300 mb-6">Return to start in {countdown}s</p>
        <div className="flex gap-4">
          <button onClick={() => window.location.reload()} className="bg-green-800 text-white px-6 py-2 rounded">Restart</button>
          <button onClick={() => { setQuestions([]); setShowMenu(true); }} className="bg-red-800 text-white px-6 py-2 rounded">Exit</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-900">
      {showMenu ? (
        <div className="flex flex-col items-center justify-center h-full px-4 text-center space-y-4">
          <h1 className="text-white text-4xl mb-2">Fighting Grammar Quest</h1>
          <p className="text-gray-300 max-w-xl">
            Usa el banco oficial o sube tu archivo .txt con formato Q:... O: opt1|opt2|opt3|opt4 A: correcta, y opcional CODIGO: para el código de victoria.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button onClick={startWithPreset} className="bg-green-700 hover:bg-green-600 text-white px-5 py-2 rounded shadow">
              Usar banco Cambridge
            </button>
            <label className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded shadow cursor-pointer">
              Subir .txt propio
              <input type="file" accept=".txt" onChange={handleUpload} className="hidden" />
            </label>
          </div>
          <p className="text-gray-400 text-sm">Incluye CODIGO: en el txt si quieres mostrar un código al ganar.</p>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/zTLqyY2b/battle-bg.png')" }} />
          <motion.img
            src={playerHP <= 20 ? playerHurtImg : playerImg}
            alt="Player"
            className="absolute bottom-4 left-4 w-32 h-32"
            animate={[
              floatAnim,
              battleAnim === 'player' && { x: [0, 15, 0], transition: { duration: 0.3 } },
              battleAnim === 'monster' && { filter: ['none','brightness(2)','none'], transition: { duration: 0.3 } }
            ]}
          />
          <motion.img
            src={monsterHP <= 30 ? monsterHurtImg : monsterImg}
            alt="Monster"
            className="absolute bottom-4 right-4 w-24 h-24"
            animate={[
              floatAnim,
              battleAnim === 'monster' && { x: [0, -15, 0], transition: { duration: 0.3 } },
              battleAnim === 'player' && { filter: ['none','brightness(2)','none'], transition: { duration: 0.3 } }
            ]}
          />
          <div className="relative z-10 mx-auto bg-black bg-opacity-70 p-4 rounded-2xl max-w-md">
            <div className="flex justify-between mb-4 text-gray-200">
              <div className="w-1/2 pr-2">
                <div className="h-3 bg-red-700 rounded overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: hpPercentage(playerHP) }} />
                </div>
                <p className="mt-1 text-xs text-white text-center">Player: {playerHP}</p>
              </div>
              <div className="w-1/2 pl-2">
                <div className="h-3 bg-red-700 rounded overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: hpPercentage(monsterHP) }} />
                </div>
                <p className="mt-1 text-xs text-white text-center">Monster: {monsterHP}</p>
              </div>
            </div>
            <div className="text-center text-sm font-bold text-gray-100 mb-4">Time: {timer}s</div>
            <h2 className="text-xl font-bold text-white mb-4 text-center">{currentQ?.question}</h2>
            <div className="grid grid-cols-1 gap-3">
              {currentQ?.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded transition transform hover:scale-105 text-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 text-center text-lg text-yellow-300 font-bold">{feedback}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default FightingGrammar;
