import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import presetData from './Aplicativos/data/fightingGrammar.json';

import playerImg from '../assets/warrior.png';
import playerHurtImg from '../assets/warrior_hurt.png';
import monsterImg from '../assets/monster.png';
import monsterHurtImg from '../assets/monster_hurt.png';

const MAX_HP = 100;
const COUNTDOWN_START = 10;
const STORAGE_KEY = 'fightingGrammarUnlocked';

const LEVEL_DEFS = [
  {
    id: 'dock',
    title: 'Dockside Spar',
    boss: 'Captain Past',
    bossTitle: 'Past Tense',
    questionCount: 3,
    bossHP: 85,
    timeLimit: 12,
    bg: 'from-slate-900 via-slate-800 to-amber-900',
    accent: 'amber',
    taunt: 'You better respect the timeline.',
    rewardCode: 'PAST-LOCK',
    bossImage: '',
    bossHurtImage: '',
  },
  {
    id: 'forge',
    title: 'Grammar Forge',
    boss: 'Lady Condition',
    bossTitle: 'If-Clauses',
    questionCount: 3,
    bossHP: 95,
    timeLimit: 11,
    bg: 'from-zinc-900 via-red-900 to-orange-900',
    accent: 'orange',
    taunt: 'Choose wisely, or get burned.',
    rewardCode: 'IF-BLADE',
    bossImage: '',
    bossHurtImage: '',
  },
  {
    id: 'spire',
    title: 'Syntax Spire',
    boss: 'The Inverter',
    bossTitle: 'Inversions',
    questionCount: 4,
    bossHP: 110,
    timeLimit: 10,
    bg: 'from-slate-900 via-cyan-900 to-blue-900',
    accent: 'cyan',
    taunt: 'Order matters. I will twist you.',
    rewardCode: 'INVERT-KEY',
    bossImage: '',
    bossHurtImage: '',
  },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const buildLevelsFromQuestions = (allQuestions) => {
  let cursor = 0;
  const levels = LEVEL_DEFS.map((def) => {
    const chunk = allQuestions.slice(cursor, cursor + def.questionCount);
    cursor += def.questionCount;
    return { ...def, questions: chunk };
  }).filter(level => level.questions.length);

  if (!levels.length && allQuestions.length) {
    return [
      {
        ...LEVEL_DEFS[0],
        id: 'custom',
        title: 'Custom Gauntlet',
        boss: 'The Compiler',
        bossTitle: 'Final Form',
        questionCount: allQuestions.length,
        bossHP: MAX_HP,
        timeLimit: 12,
        bg: 'from-slate-900 via-emerald-900 to-cyan-900',
        accent: 'emerald',
        taunt: 'Every answer has a cost.',
        rewardCode: 'CUSTOM-KEY',
        questions: allQuestions,
      },
    ];
  }

  return levels;
};

const normalizeLevels = (inputLevels) => {
  if (!Array.isArray(inputLevels)) return [];
  return inputLevels
    .map((level, idx) => {
      const fallback = LEVEL_DEFS[idx] || {};
      const id = level.id || fallback.id || `level-${idx + 1}`;
      const title = level.title || fallback.title || `Level ${idx + 1}`;
      const boss = level.boss || fallback.boss || `Boss ${idx + 1}`;
      const bossTitle = level.bossTitle || fallback.bossTitle || 'Grammar';
      const taunt = level.taunt || fallback.taunt || 'Stay sharp.';
      const timeLimit = Number.isFinite(level.timeLimit) ? level.timeLimit : (fallback.timeLimit || COUNTDOWN_START);
      const bossHP = Number.isFinite(level.bossHP) ? level.bossHP : (fallback.bossHP || MAX_HP);
      const rewardCode = (level.rewardCode || fallback.rewardCode || `CODE-${idx + 1}`).toString();
      const bg = level.bg || fallback.bg || 'from-slate-900 via-slate-800 to-slate-950';
      const accent = level.accent || fallback.accent || 'amber';
      const bossImage = level.bossImage || fallback.bossImage || '';
      const bossHurtImage = level.bossHurtImage || fallback.bossHurtImage || '';

      return {
        ...fallback,
        ...level,
        id,
        title,
        boss,
        bossTitle,
        taunt,
        timeLimit,
        bossHP,
        rewardCode,
        bg,
        accent,
        bossImage,
        bossHurtImage,
        questions: Array.isArray(level.questions) ? level.questions : [],
      };
    })
    .filter(level => level.questions.length);
};

const FightingGrammar = () => {
  const [levels, setLevels] = useState([]);
  const [unlockedLevels, setUnlockedLevels] = useState([]);
  const [levelIndex, setLevelIndex] = useState(0);
  const [currentQ, setCurrentQ] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [timer, setTimer] = useState(COUNTDOWN_START);
  const [playerHP, setPlayerHP] = useState(MAX_HP);
  const [bossHP, setBossHP] = useState(MAX_HP);
  const [combo, setCombo] = useState(0);
  const [meter, setMeter] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [battleAnim, setBattleAnim] = useState(null);
  const [phase, setPhase] = useState('menu');
  const [endState, setEndState] = useState(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const [victoryCode, setVictoryCode] = useState('');
  const [showMenu, setShowMenu] = useState(true);
  const [showRoster, setShowRoster] = useState(false);
  const [unlockInput, setUnlockInput] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [pendingUnlockIndex, setPendingUnlockIndex] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const loadUnlocked = (levelsList) => {
    if (!levelsList.length) return [];
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (err) {
      stored = [];
    }
    const storedSet = new Set(Array.isArray(stored) ? stored : []);
    storedSet.add(levelsList[0].id);
    return levelsList.map(level => level.id).filter(id => storedSet.has(id));
  };

  const persistUnlocked = (ids) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (err) {
      // Ignore storage errors.
    }
  };

  const unlockLevel = (id) => {
    if (!id) return;
    setUnlockedLevels(prev => {
      const next = new Set(prev);
      next.add(id);
      const arr = Array.from(next);
      persistUnlocked(arr);
      return arr;
    });
  };

  const resetToMenu = () => {
    setEndState(null);
    setLevels([]);
    setUnlockedLevels([]);
    setLevelIndex(0);
    setShowMenu(true);
    setShowRoster(false);
    setPhase('menu');
    setCountdown(COUNTDOWN_START);
    setTimer(COUNTDOWN_START);
    setCombo(0);
    setMeter(0);
    setUnlockInput('');
    setUnlockError('');
    setShowUnlockModal(false);
    setPendingUnlockIndex(null);
    setShowHelp(false);
  };

  const startWithPreset = () => {
    const presetLevels = presetData.levels
      ? normalizeLevels(presetData.levels)
      : buildLevelsFromQuestions(presetData.questions || []);

    setVictoryCode(presetData.victoryCode || '');
    setLevels(presetLevels);
    setLevelIndex(0);
    setShowMenu(false);
    setShowRoster(true);
    setPlayerHP(MAX_HP);
    setCombo(0);
    setMeter(0);
    setEndState(null);
  };

  useEffect(() => {
    if (!levels.length) return;
    const unlocked = loadUnlocked(levels);
    setUnlockedLevels(unlocked);
  }, [levels]);

  useEffect(() => {
    if (!levels.length) return;
    const level = levels[levelIndex];
    setCurrentQ(level.questions[0]);
    setQIndex(0);
    setTimer(level.timeLimit || COUNTDOWN_START);
    setBossHP(level.bossHP || MAX_HP);
    setFeedback(null);
    setBattleAnim(null);
    setUnlockInput('');
    setUnlockError('');
    setPhase('loading');
    const timerId = setTimeout(() => setPhase('intro'), 1200);
    return () => clearTimeout(timerId);
  }, [levels, levelIndex]);

  useEffect(() => {
    if (!currentQ || endState || phase !== 'fight') return;
    if (timer === 0) {
      handleAnswer(null, { timedOut: true });
      return;
    }
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, currentQ, endState, phase]);

  useEffect(() => {
    if (!levels.length || endState) return;
    if (bossHP === 0) {
      const currentLevel = levels[levelIndex];
      if (currentLevel?.id) {
        unlockLevel(currentLevel.id);
      }
      const nextLevel = levels[levelIndex + 1];
      if (nextLevel?.id) {
        unlockLevel(nextLevel.id);
      }
      if (levelIndex >= levels.length - 1) {
        endGame('win');
      } else {
        setPhase('clear');
      }
    }
  }, [bossHP, levelIndex, levels, endState]);

  const endGame = (state) => {
    if (state === 'lose') {
      resetToMenu();
      return;
    }
    setEndState(state);
    setCountdown(COUNTDOWN_START);
    setPhase('end');
  };

  const nextQuestion = () => {
    const level = levels[levelIndex];
    if (!level) return;
    const next = (qIndex + 1) % level.questions.length;
    setQIndex(next);
    setCurrentQ(level.questions[next]);
    const baseTime = level.timeLimit || COUNTDOWN_START;
    setTimer(bossHP <= 30 ? Math.max(6, baseTime - 3) : baseTime);
    setFeedback(null);
  };

  const handleAnswer = (opt, options = {}) => {
    if (!currentQ || endState || phase !== 'fight') return;
    const level = levels[levelIndex];
    const timeLimit = level?.timeLimit || COUNTDOWN_START;
    const correct = opt === currentQ.answer;
    const isCritical = correct && timer >= Math.ceil(timeLimit * 0.7);
    const isEnraged = bossHP <= 30;

    if (correct) {
      setBattleAnim(isCritical ? 'critical' : 'player');
      setFeedback(isCritical ? 'Critical hit!' : 'Combo hit!');
      setCombo(c => c + 1);
      setMeter(m => clamp(m + (isCritical ? 35 : 20), 0, 100));
      const comboBonus = Math.min(combo, 5) * 2;
      const totalDamage = 10 + comboBonus + (isCritical ? 8 : 0);
      setBossHP(hp => Math.max(0, hp - totalDamage));
    } else {
      setBattleAnim('boss');
      setFeedback(options.timedOut ? 'Time out!' : 'Counter hit!');
      setCombo(0);
      setMeter(m => clamp(m - 10, 0, 100));
      const totalDamage = 12 + (isEnraged ? 6 : 0);
      setPlayerHP(hp => {
        const nextHP = Math.max(0, hp - totalDamage);
        if (nextHP === 0) endGame('lose');
        return nextHP;
      });
    }

    setTimeout(nextQuestion, 700);
  };

  const useSpecial = () => {
    if (meter < 100 || phase !== 'fight') return;
    setBattleAnim('special');
    setFeedback('Special attack!');
    setMeter(0);
    setBossHP(hp => Math.max(0, hp - 25));
  };

  const validateRosterUnlock = () => {
    if (pendingUnlockIndex == null) return;
    const prevLevel = levels[pendingUnlockIndex - 1];
    if (!prevLevel) {
      setShowUnlockModal(false);
      return;
    }
    if (unlockInput.trim().toUpperCase() === prevLevel.rewardCode.trim().toUpperCase()) {
      const targetLevel = levels[pendingUnlockIndex];
      if (targetLevel?.id) {
        unlockLevel(targetLevel.id);
      }
      setShowUnlockModal(false);
      setPendingUnlockIndex(null);
      setUnlockInput('');
      setUnlockError('');
      setLevelIndex(pendingUnlockIndex);
      setShowRoster(false);
      return;
    }
    setUnlockError('Codigo incorrecto.');
  };

  const goNextLevel = () => {
    setPlayerHP(hp => clamp(hp + 20, 0, MAX_HP));
    setCombo(0);
    setMeter(0);
    setLevelIndex(i => i + 1);
    setPhase('loading');
  };

  useEffect(() => {
    if (!endState) return;
    if (countdown === 0) {
      resetToMenu();
      return;
    }
    const id = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(id);
  }, [endState, countdown]);

  const floatAnim = { y: [0, -10, 0], transition: { duration: 2, repeat: Infinity } };
  const hpPercentage = hp => `${(hp / MAX_HP) * 100}%`;
  const level = levels[levelIndex];

  const isLevelUnlocked = (lvl, idx) => {
    if (!lvl) return false;
    if (idx === 0) return true;
    return unlockedLevels.includes(lvl.id);
  };

  const getBossImage = (lvl, hurt) => {
    if (!lvl) return hurt ? monsterHurtImg : monsterImg;
    if (hurt) return lvl.bossHurtImage || monsterHurtImg;
    return lvl.bossImage || monsterImg;
  };

  if (endState) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4 text-white">
        <h1 className="text-4xl mb-4" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
          Victory!
        </h1>
        {victoryCode && (
          <div className="bg-gray-800 p-4 rounded mb-4 w-full max-w-md">
            <h2 className="text-green-400 mb-2">Your Victory Code:</h2>
            <pre className="text-sm text-white overflow-x-auto">{victoryCode}</pre>
          </div>
        )}
        <p className="text-gray-300 mb-6">Return to start in {countdown}s</p>
        <div className="flex gap-4">
          <button onClick={resetToMenu} className="bg-green-800 text-white px-6 py-2 rounded">
            Restart
          </button>
          <button onClick={resetToMenu} className="bg-red-800 text-white px-6 py-2 rounded">
            Exit
          </button>
        </div>
      </div>
    );
  }

  if (showMenu) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-900 opacity-80" />
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 45%)' }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-6">
          <div className="uppercase tracking-[0.4em] text-xs text-amber-300">Grammar Combat League</div>
          <h1 className="text-5xl sm:text-6xl" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
            Fighting Grammar
          </h1>
          <p className="text-slate-200 max-w-xl">
            Los niveles estan definidos en el JSON. Cada boss tiene su codigo de desbloqueo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={startWithPreset} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl shadow-lg">
              Iniciar campana
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              Como jugar
            </button>
          </div>
          <p className="text-sm text-slate-400">
            Todo el contenido se lee desde el archivo JSON.
          </p>
        </div>

        {showHelp && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
            <div className="bg-slate-900 text-white rounded-2xl p-6 w-full max-w-lg space-y-4">
              <h3 className="text-2xl" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
                Como funciona
              </h3>
              <p className="text-sm text-white/80">
                Responde rapido para hacer mas dano y subir combo. Al vencer un boss se desbloquea el siguiente nivel.
              </p>
              <div className="text-sm text-white/70">
                - Cada nivel tiene su boss y sus propias preguntas.
                - El combo y el meter suben con aciertos rapidos.
                - Usa Special Attack cuando el meter llega a 100.
                - Los niveles vencidos quedan guardados en cache.
                - Para entrar a cualquier nivel desde el roster, debes poner el codigo del boss anterior.
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 py-2 rounded-lg"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (showRoster) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 opacity-90" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="uppercase tracking-[0.4em] text-xs text-amber-300">Boss Roster</div>
              <h2 className="text-4xl mt-2" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
                Choose Your Run
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowHelp(true)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl"
              >
                Como jugar
              </button>
              <button
                onClick={() => {
                  setShowRoster(false);
                  setPhase('loading');
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl shadow-lg"
              >
                Start Campaign
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {levels.map((lvl, idx) => {
              const unlocked = isLevelUnlocked(lvl, idx);
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    if (idx === 0) {
                      setLevelIndex(idx);
                      setShowRoster(false);
                      return;
                    }
                    setPendingUnlockIndex(idx);
                    setUnlockInput('');
                    setUnlockError('');
                    setShowUnlockModal(true);
                  }}
                  className={`relative text-left rounded-2xl border border-white/10 p-5 shadow-xl transition ${
                    unlocked ? 'bg-slate-900/70 hover:bg-slate-800/80' : 'bg-slate-900/40 opacity-80'
                  }`}
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Level {idx + 1}</div>
                  <div className="flex items-center gap-4 mt-3">
                    <img
                      src={getBossImage(lvl, false)}
                      alt={lvl.boss}
                      className="w-16 h-16 rounded-xl object-cover bg-black/40"
                    />
                    <div>
                      <h3 className="text-2xl" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
                        {lvl.title}
                      </h3>
                      <p className="text-sm text-slate-300 mt-1">Boss: {lvl.boss}</p>
                      <p className="text-xs text-slate-400 mt-1">{lvl.bossTitle}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-slate-400">Questions: {lvl.questions.length}</div>
                  {!unlocked && (
                    <div className="absolute top-3 right-3 text-xs bg-black/60 px-2 py-1 rounded-full text-amber-300">
                      Locked
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {showUnlockModal && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
            <div className="bg-slate-900 text-white rounded-2xl p-6 w-full max-w-md space-y-4">
              <h3 className="text-2xl" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
                Unlock Level
              </h3>
              <p className="text-sm text-white/70">
                Ingresa el codigo del boss anterior para entrar a este nivel.
              </p>
              <input
                type="text"
                value={unlockInput}
                onChange={(e) => {
                  setUnlockInput(e.target.value);
                  setUnlockError('');
                }}
                placeholder="Codigo"
                className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
              {unlockError && <p className="text-rose-400 text-sm">{unlockError}</p>}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUnlockModal(false);
                    setPendingUnlockIndex(null);
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={validateRosterUnlock}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-900 py-2 rounded-lg"
                >
                  Unlock
                </button>
              </div>
            </div>
          </div>
        )}

        {showHelp && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
            <div className="bg-slate-900 text-white rounded-2xl p-6 w-full max-w-lg space-y-4">
              <h3 className="text-2xl" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
                Como funciona
              </h3>
              <p className="text-sm text-white/80">
                Responde rapido para hacer mas dano y subir combo. Al vencer un boss se desbloquea el siguiente nivel.
              </p>
              <div className="text-sm text-white/70">
                - Cada nivel tiene su boss y sus propias preguntas.
                - El combo y el meter suben con aciertos rapidos.
                - Usa Special Attack cuando el meter llega a 100.
                - Los niveles vencidos quedan guardados en cache.
                - Para entrar a cualquier nivel desde el roster, debes poner el codigo del boss anterior.
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 py-2 rounded-lg"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative text-white overflow-hidden"
      style={{ fontFamily: '"Rajdhani", "Teko", "Oswald", sans-serif' }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${level?.bg || 'from-slate-900 via-slate-800 to-slate-950'}`} />
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2), transparent 45%)' }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/70">Level {levelIndex + 1} / {levels.length}</div>
            <h1 className="text-4xl" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
              {level?.title}
            </h1>
            <p className="text-sm text-white/70 mt-1">{level?.taunt}</p>
          </div>
          <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Boss</div>
            <div className="text-lg">{level?.boss}</div>
            <div className="text-xs text-white/50">{level?.bossTitle}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-center">
          <div className="space-y-4">
            <div className="bg-black/50 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>Player</span>
                <span>{playerHP} HP</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-emerald-400" style={{ width: hpPercentage(playerHP) }} />
              </div>
              <div className="mt-3 text-xs text-white/60">Combo x{combo}</div>
            </div>
            <div className="bg-black/50 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>Boss</span>
                <span>{bossHP} HP</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-rose-500" style={{ width: hpPercentage(bossHP) }} />
              </div>
              <div className="mt-3 text-xs text-white/60">
                {bossHP <= 30 ? 'Enraged: +damage' : 'Phase: steady'}
              </div>
            </div>
            <div className="bg-black/50 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>Meter</span>
                <span>{meter}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-amber-400" style={{ width: `${meter}%` }} />
              </div>
              <button
                onClick={useSpecial}
                disabled={meter < 100 || phase !== 'fight'}
                className="mt-3 w-full bg-amber-500 disabled:bg-white/10 disabled:text-white/30 text-slate-900 py-2 rounded-lg text-sm font-semibold"
              >
                Special Attack
              </button>
            </div>
          </div>

          <div className="relative flex items-end justify-between h-64 lg:h-80">
            <motion.img
              src={playerHP <= 20 ? playerHurtImg : playerImg}
              alt="Player"
              className="w-40 h-40 lg:w-52 lg:h-52"
              animate={[
                floatAnim,
                battleAnim === 'player' && { x: [0, 18, 0], transition: { duration: 0.3 } },
                battleAnim === 'boss' && { x: [0, -8, 8, 0], transition: { duration: 0.3 } },
                battleAnim === 'critical' && { filter: ['none', 'brightness(1.6)', 'none'], transition: { duration: 0.4 } },
              ]}
            />
            <motion.img
              src={getBossImage(level, bossHP <= 30)}
              alt="Boss"
              className="w-32 h-32 lg:w-44 lg:h-44"
              animate={[
                floatAnim,
                battleAnim === 'boss' && { x: [0, -18, 0], transition: { duration: 0.3 } },
                battleAnim === 'player' && { x: [0, 8, -8, 0], transition: { duration: 0.3 } },
                battleAnim === 'special' && { filter: ['none', 'brightness(2)', 'none'], transition: { duration: 0.4 } },
              ]}
            />
            {battleAnim && (
              <motion.div
                key={battleAnim}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 0.9] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/40 blur-xl" />
              </motion.div>
            )}
          </div>

          <div className="bg-black/60 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>Round {qIndex + 1}</span>
              <span className="text-amber-300">Time {timer}s</span>
            </div>
            <h2 className="text-xl font-semibold mt-4">{currentQ?.question}</h2>
            <div className="grid gap-3 mt-4">
              {currentQ?.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition transform hover:scale-[1.02] text-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 text-center text-amber-300 font-semibold">{feedback}</p>}
          </div>
        </div>
      </div>

      {phase === 'loading' && (
        <div className="absolute inset-0 bg-slate-950/90 flex items-center justify-center z-30">
          <div className="text-center space-y-4">
            <div className="text-xs uppercase tracking-[0.4em] text-amber-300">Loading Arena</div>
            <div className="relative w-32 h-32 mx-auto">
              <motion.div
                className="absolute inset-0 border-4 border-amber-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-3 border-4 border-emerald-400/40 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-6 border-4 border-white/40 rounded-full"
                animate={{ scale: [0.9, 1.05, 0.9] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </div>
            <p className="text-sm text-white/70">Charge up... the boss is arriving.</p>
          </div>
        </div>
      )}

      {phase === 'intro' && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="text-center space-y-4">
            <div className="text-xs uppercase tracking-[0.4em] text-amber-300">Boss Incoming</div>
            <h2 className="text-5xl" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
              {level?.boss}
            </h2>
            <p className="text-white/70">{level?.bossTitle}</p>
            <button
              onClick={() => setPhase('fight')}
              className="mt-4 bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-3 rounded-xl"
            >
              Enter the Arena
            </button>
          </div>
        </div>
      )}

      {phase === 'clear' && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="text-center space-y-4 w-full max-w-md">
            <div className="text-xs uppercase tracking-[0.4em] text-emerald-300">Level Clear</div>
            <h2 className="text-4xl" style={{ fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif' }}>
              Boss Defeated
            </h2>
            <p className="text-white/70">Reward code unlocked:</p>
            <div className="bg-black/60 rounded-xl px-4 py-3 text-emerald-300 font-semibold tracking-widest">
              {level?.rewardCode}
            </div>
            <button onClick={goNextLevel} className="mt-2 bg-emerald-500 text-slate-900 px-8 py-3 rounded-xl w-full">
              Next Level
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FightingGrammar;
