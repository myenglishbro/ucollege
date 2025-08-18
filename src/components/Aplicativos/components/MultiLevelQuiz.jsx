// quiz/MultiLevelQuiz.jsx
import React, { useEffect, useRef, useState } from "react";
import { ACCENT, BG_MAIN } from "./constants";
import HeaderBar from "./HeaderBar";
import LevelPicker from "./LevelPicker";
import QuizCard from "./QuizCard";
import ResultsPanel from "./ResultsPanel";
import { useQuizPersistence } from "./hooks/useQuizPersistence";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useQuizSecurity } from "./hooks/useQuizSecurity";

const FEEDBACK_HOLD_MS = 450; // tiempo visible de feedback antes de avanzar

export default function MultiLevelQuiz({ levelsData, title }) {
  const levels = levelsData?.levels || [];

  const [mode, setMode] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [codeInput, setCodeInput] = useState("");
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockModalLevel, setLockModalLevel] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useState(60);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showWrongMessage, setShowWrongMessage] = useState(false);

  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const {
    unlockedLevels,
    setUnlockedLevels,
    updateBestScore,
    wipeStorage,
  } = useQuizPersistence({ 0: true });

  const testUnlockedRef = useRef(unlockedLevels);

  const level = selectedLevel != null ? levels[selectedLevel] : null;
  const exercises = level?.exercises || [];
  const q = exercises[currentQuestion] || null;

  const { showBlackScreen } = useQuizSecurity(containerRef);

  const getPerQuestionTime = () => {
    if (mode !== "test") return 0;
    const t = level?.perQuestionTime;
    return typeof t === "number" && t > 0 ? t : 60;
  };

  const goHomeClean = () => {
    wipeStorage();
    clearInterval(timerRef.current);
    setSelectedLevel(null);
    setQuizFinished(false);
    setShowLockModal(false);
    setCodeInput("");
    setMode(null);
  };

  // Modo → práctica desbloquea todo; prueba restaura
  useEffect(() => {
    if (!levels.length) return;
    if (mode === "practice") {
      testUnlockedRef.current = unlockedLevels;
      const all = {};
      levels.forEach((_, i) => (all[i] = true));
      setUnlockedLevels(all);
    } else if (mode === "test") {
      setUnlockedLevels(testUnlockedRef.current || { 0: true });
    }
  }, [mode, levels]); // eslint-disable-line

  useEffect(() => {
    if (mode === "test") testUnlockedRef.current = unlockedLevels;
  }, [unlockedLevels, mode]);

  // Reset por cambio de nivel
  useEffect(() => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswersLog([]);
    setCodeInput("");
    setQuizFinished(false);
    setShowCorrectMessage(false);
    setShowWrongMessage(false);
    clearInterval(timerRef.current);
    if (mode === "test" && level) {
      setTimeLeft(getPerQuestionTime());
    }
  }, [selectedLevel]); // eslint-disable-line

  // Timer (solo test)
  useEffect(() => {
    clearInterval(timerRef.current);
    if (mode === "test" && selectedLevel !== null && !quizFinished && level) {
      setTimeLeft(getPerQuestionTime());
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitAnswer(undefined); // sin respuesta a tiempo
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [mode, selectedLevel, currentQuestion, quizFinished, level]); // eslint-disable-line

  // Atajos (A/B/C/D o 1/2/3/4) → envío inmediato
  useKeyboardShortcuts({
    enabled: !!level && !quizFinished,
    containerRef,
    options: q?.options,
    onChooseOption: (opt) => handleSubmitAnswer(opt),
  });

  const handleLevelClick = (idx) => {
    if (mode === "practice") {
      setSelectedLevel(idx);
    } else {
      if (unlockedLevels[idx]) {
        setSelectedLevel(idx);
      } else {
        setLockModalLevel(idx);
        setShowLockModal(true);
      }
    }
  };

  const handleUnlock = () => {
    const needed = levels[lockModalLevel]?.prerequisiteCode ?? "";
    if (codeInput.trim() && codeInput.trim() === needed) {
      setUnlockedLevels((prev) => ({ ...prev, [lockModalLevel]: true }));
      setShowLockModal(false);
      setCodeInput("");
    } else {
      alert("Código incorrecto");
    }
  };

  // Envía respuesta (chosenOption puede ser undefined si expira el tiempo)
  const handleSubmitAnswer = (chosenOption) => {
    clearInterval(timerRef.current);
    if (!q) return;

    const selected = chosenOption ?? "—";
    const isCorrect = selected === q.answer;

    // feedback
    if (isCorrect) {
      setScore((p) => p + 1);
      setShowCorrectMessage(true);
      setTimeout(() => setShowCorrectMessage(false), FEEDBACK_HOLD_MS);
    } else {
      setShowWrongMessage(true);
      setTimeout(() => setShowWrongMessage(false), FEEDBACK_HOLD_MS);
    }

    // log (incluye explanation del JSON)
    setAnswersLog((prev) => [
      ...prev,
      {
        prompt: q.prompt,
        selected,
        answer: q.answer,
        correct: isCorrect,
        explanation: q.explanation || "",
      },
    ]);

    // Avanza tras mostrar feedback/animación
    const advance = () => {
      if (currentQuestion + 1 < exercises.length) {
        setCurrentQuestion((p) => p + 1);
      } else {
        setQuizFinished(true);
        const finalScore = isCorrect ? score + 1 : score;
        if (level) updateBestScore(`level_${level.level}`, finalScore);

        if (
          mode === "test" &&
          finalScore === exercises.length &&
          selectedLevel + 1 < levels.length
        ) {
          setUnlockedLevels((prev) => ({ ...prev, [selectedLevel + 1]: true }));
        }
      }
    };
    setTimeout(advance, FEEDBACK_HOLD_MS);
  };

  // 1) Selección de modo
  if (mode === null) {
    return (
      <div
        ref={containerRef}
        tabIndex={0}
        className="min-h-screen flex flex-col items-center justify-center bg-white p-6 select-none"
      >
        <h1 className="text-3xl font-bold mb-6" style={{ color: ACCENT }}>
          {title}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setMode("test")}
            className="px-6 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: ACCENT, color: "#fff" }}
          >
            Modo Prueba
          </button>
          <button
            onClick={() => setMode("practice")}
            className="px-6 py-3 rounded-lg font-semibold border"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            Modo Práctica
          </button>
        </div>
      </div>
    );
  }

  // 2) Resto
  return (
    <div ref={containerRef} tabIndex={0} className="relative select-none">
      {/* Overlay seguridad */}
      {showBlackScreen && (
        <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center text-white text-2xl font-bold pointer-events-none">
          Captura bloqueada por seguridad
        </div>
      )}

      <HeaderBar mode={mode} accent={ACCENT} onHomeClean={goHomeClean} />

      {/* Selección de niveles */}
      {selectedLevel === null && (
        <LevelPicker
          title={title}
          levels={levels}
          unlockedLevels={unlockedLevels}
          onLevelClick={handleLevelClick}
          showLockModal={showLockModal}
          lockModalLevel={lockModalLevel}
          codeInput={codeInput}
          setCodeInput={setCodeInput}
          handleUnlock={handleUnlock}
          closeModal={() => setShowLockModal(false)}
        />
      )}

      {/* Quiz */}
      {selectedLevel !== null && !quizFinished && (
        <div
          style={{ background: BG_MAIN }}
          className="min-h-screen flex flex-col items-center px-2 py-6 pt-16"
        >
          <QuizCard
            accent={ACCENT}
            mode={mode}
            questionIndex={currentQuestion}
            totalQuestions={exercises.length}
            question={q}
            onChooseOption={(opt) => handleSubmitAnswer(opt)} // envío inmediato
            timeLeft={timeLeft}
            perQuestionTime={mode === "test" ? (level?.perQuestionTime || 60) : 0}
            showCorrectMessage={showCorrectMessage}
            showWrongMessage={showWrongMessage}
          />
        </div>
      )}

      {/* Resultados */}
      {selectedLevel !== null && quizFinished && (
        <ResultsPanel
          levelLabel={level?.level}
          levelCode={level?.levelCode}
          answersLog={answersLog}
          score={score}
          total={exercises.length}
          canGoNext={score === exercises.length && selectedLevel + 1 < levels.length}
          onNext={() => setSelectedLevel(selectedLevel + 1)}
        />
      )}
    </div>
  );
}
