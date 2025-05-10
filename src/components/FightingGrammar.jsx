import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [battleAnim, setBattleAnim] = useState(null); // 'player' | 'monster'
  const [endState, setEndState] = useState(null);     // 'win' | 'lose'
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const [victoryCode, setVictoryCode] = useState('');

  // Carga preguntas e identifica código al final del TXT
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    // Extraer preguntas
    const parsed = lines
      .filter(line => line.startsWith('Q:'))
      .map(line => {
        const m = line.match(/Q:(.*?)\s*O:(.*?)\s*A:(.*)/);
        if (!m) return null;
        const [, question, opts, answer] = m;
        return {
          question: question.trim(),
          options: opts.split('|').map(o=>o.trim()),
          answer: answer.trim()
        };
      })
      .filter(Boolean);
    // Extraer código (línea 'CODIGO:')
    const codeLine = lines.find(line => line.startsWith('CODIGO:'));
    const codeValue = codeLine ? codeLine.split(':')[1].trim() : '';

    setQuestions(parsed);
    setVictoryCode(codeValue);
    setQIndex(0);
  };

  // Inicializar combate
  useEffect(() => {
    if (!questions.length) return;
    setCurrentQ(questions[0]);
    setPlayerHP(MAX_HP);
    setMonsterHP(MAX_HP);
    setTimer(COUNTDOWN_START);
    setFeedback(null);
    setEndState(null);
    setCountdown(COUNTDOWN_START);
  }, [questions]);

  // Temporizador
  useEffect(() => {
    if (!currentQ || endState) return;
    if (timer === 0) { handleAnswer(null); return; }
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, currentQ, endState]);

  const endGame = (state) => setEndState(state);

  // Siguiente pregunta cíclica
  const nextQuestion = () => {
    const next = (qIndex + 1) % questions.length;
    setQIndex(next);
    setCurrentQ(questions[next]);
    // Ajuste timer
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

  // Cuenta regresiva final
  useEffect(() => {
    if (!endState) return;
    if (countdown === 0) { setEndState(null); setQuestions([]); return; }
    const id = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(id);
  }, [endState, countdown]);

  // Animación flotante
  const floatAnim = { y: [0, -10, 0], transition: { duration: 2, repeat: Infinity } };

  // Render pantalla final con código extraído
  if (endState) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
        <h1 className="text-white text-4xl mb-4">
          {endState === 'win' ? '🎉 Victory!' : '💀 Defeat!'}
        </h1>
        {endState === 'win' && victoryCode && (
          <div className="bg-gray-800 p-4 rounded mb-4 w-full max-w-xl">
            <h2 className="text-green-400 mb-2">Your Victory Code:</h2>
            <pre className="text-sm text-white overflow-x-auto">
              {victoryCode}
            </pre>
          </div>
        )}
        <p className="text-gray-300 mb-6">Return to start in {countdown}s</p>
        <div className="flex gap-4">
          <button onClick={() => {
              setEndState(null);
              setCurrentQ(questions[0]);
              setQIndex(0);
              setPlayerHP(MAX_HP);
              setMonsterHP(MAX_HP);
              setTimer(COUNTDOWN_START);
              setFeedback(null);
              setCountdown(COUNTDOWN_START);
            }}
            className="bg-green-800 text-white px-6 py-2 rounded"
          >Restart</button>
          <button onClick={() => setQuestions([])} className="bg-red-800 text-white px-6 py-2 rounded">Exit</button>
        </div>
      </div>
    );
  }

  const hpPercentage = hp => `${(hp / MAX_HP) * 100}%`;

  return (
    <div className="min-h-screen relative bg-gray-900">
      {!currentQ ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-white text-4xl mb-4">Fighting Grammar Quest</h1>
          <input type="file" accept=".txt" onChange={handleUpload} className="p-2 bg-gray-700 text-white rounded mb-2"/>
          <p className="text-gray-400">Upload your questions file</p>
        </div>
      ) : (
        <> 
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/zTLqyY2b/battle-bg.png')" }} />
          <motion.img
            src={playerHP <= 20 ? playerHurtImg : playerImg}
            alt="Player"
            className="absolute bottom-4 left-4 w-64 h-64"
            animate={[
              floatAnim,
              battleAnim === 'player' && { x: [0,20,0], transition: { duration: 0.3 } },
              battleAnim === 'monster' && { filter: ['none','brightness(2)','none'], transition: { duration: 0.3 } }
            ]}
          />
          <motion.img
            src={monsterHP <= 30 ? monsterHurtImg : monsterImg}
            alt="Monster"
            className="absolute bottom-4 right-4 w-64 h-64"
            animate={[
              floatAnim,
              battleAnim === 'monster' && { x: [0,-20,0], transition: { duration: 0.3 } },
              battleAnim === 'player' && { filter: ['none','brightness(2)','none'], transition: { duration: 0.3 } }
            ]}
          />
          <div className="relative z-10 max-w-3xl mx-auto bg-black bg-opacity-70 p-8 rounded-2xl">
            <div className="flex justify-between mb-6 text-gray-200">
              <div className="w-1/2 pr-4">
                <div className="h-4 bg-red-700 rounded overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: hpPercentage(playerHP) }} />
                </div>
                <p className="mt-1 text-sm text-white text-center">Player: {playerHP}</p>
              </div>
              <div className="w-1/2 pl-4">
                <div className="h-4 bg-red-700 rounded overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: hpPercentage(monsterHP) }} />
                </div>
                <p className="mt-1 text-sm text-white text-center">Monster: {monsterHP}</p>
              </div>
            </div>
            <div className="text-center text-lg font-bold text-gray-100 mb-6">⏳ {timer}s</div>
            <h2 className="text-2xl font-bold text-white mb-6">{currentQ.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((opt,i)=>(
                <button key={i} onClick={()=>handleAnswer(opt)} className="bg-blue-800 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition">
                  {opt}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-6 text-center text-2xl text-yellow-300 font-extrabold">{feedback}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default FightingGrammar;