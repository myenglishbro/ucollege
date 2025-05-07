import React, { useState, useEffect, useRef } from 'react';
import { FaRedo, FaRandom } from 'react-icons/fa';

const TextFileUploader = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [reviewQueue, setReviewQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [modeFlexible, setModeFlexible] = useState(true);
    const [randomMode, setRandomMode] = useState(false);
    const [examMode, setExamMode] = useState(false);
  
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
  
    const [timer, setTimer] = useState(30);
    const timerRef = useRef(null);
  
    const [showSplash, setShowSplash] = useState(true);
    const [sessionFinished, setSessionFinished] = useState(false);
  
    const parseFlashcards = (text) => {
      const pattern = /P:\s*(.*?)\s*R:\s*(.*?)(?=\nP:|$)/gs;
      const matches = [...text.matchAll(pattern)];
      return matches.map(match => ({
        question: match[1].trim(),
        answer: match[2].trim(),
        id: Math.random().toString(36).substr(2, 9)
      }));
    };
  
    const handleFilesUpload = async (event) => {
      const files = Array.from(event.target.files);
      let allCards = [];
      for (const file of files) {
        const text = await file.text();
        const cards = parseFlashcards(text);
        allCards = [...allCards, ...cards];
      }
      const cardsToUse = randomMode ? shuffleArray(allCards) : allCards;
      setFlashcards(cardsToUse);
      setReviewQueue(cardsToUse);
      resetState();
      setShowSplash(false);
    };
  
    const clean = (text) =>
      text.trim().toLowerCase().replace(/[.,!?¡¿'"`]/g, '');
  
    const handleCheck = () => {
      const currentCard = reviewQueue[currentIndex];
      const isCorrect = modeFlexible
        ? clean(userInput) === clean(currentCard.answer)
        : userInput === currentCard.answer;
  
      if (isCorrect) {
        setFeedback('✅ ¡Correcto!');
        setCorrectCount(prev => prev + 1);
        const newQueue = reviewQueue.filter((_, idx) => idx !== currentIndex);
        setTimeout(() => {
          if (newQueue.length === 0) {
            setReviewQueue([]);
            setSessionFinished(true);
          } else {
            setReviewQueue(newQueue);
            setCurrentIndex(currentIndex % newQueue.length);
            setUserInput('');
            setFeedback(null);
          }
        }, 800);
      } else {
        setFeedback('❌ Incorrecto.');
        setIncorrectCount(prev => prev + 1);
        if (!examMode) clearInterval(timerRef.current);
        setTimeout(() => handleNext(), 1000);
      }
    };
  
    const handleNext = () => {
      const nextIndex = (currentIndex + 1) % reviewQueue.length;
      setCurrentIndex(nextIndex);
      setShowAnswer(false);
      setUserInput('');
      setFeedback(null);
      if (!examMode) resetTimer();
    };
  
    const resetTimer = () => {
      clearInterval(timerRef.current);
      setTimer(30);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            setFeedback('⏰ Tiempo agotado');
          }
          return prev - 1;
        });
      }, 1000);
    };
  
    const resetState = () => {
      setCurrentIndex(0);
      setShowAnswer(false);
      setUserInput('');
      setFeedback(null);
      setCorrectCount(0);
      setIncorrectCount(0);
      setSessionFinished(false);
      if (!examMode) resetTimer();
    };
  
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
  
    useEffect(() => {
      return () => clearInterval(timerRef.current);
    }, []);
  
    if (showSplash) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4"> Bienvenido a EngHelp</h1>
            <p className="mb-4 text-lg">Sube tus archivos para comenzar</p>
            
            <input
              type="file"
              accept=".txt"
              multiple
              onChange={handleFilesUpload}
              className="p-2 bg-gray-800 text-white rounded shadow"
            />
          </div>
        </div>
      );
    }
  
    if (sessionFinished) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4"> ¡Has completado todas las tarjetas!</h2>
            <p className="mb-6">✔️ {correctCount} correctas — ❌ {incorrectCount} incorrectas</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                const newQueue = randomMode ? shuffleArray(flashcards) : [...flashcards];
                setReviewQueue(newQueue);
                setShowAnswer(false);
                setUserInput('');
                setFeedback(null);
                setCorrectCount(0);
                setIncorrectCount(0);
                setCurrentIndex(0);
                setSessionFinished(false);
                if (!examMode) resetTimer();
              }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >Iniciar nuevamente</button>
              <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Subir otro archivo
                <input
                  type="file"
                  accept=".txt"
                  multiple
                  onChange={handleFilesUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      );
    }
  
    const currentCard = reviewQueue[currentIndex];
  
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-start">
        <header className="w-full max-w-5xl mb-6 flex justify-between items-center border-b border-gray-700 pb-3">
          <h1 className="text-2xl font-bold"> MyenglishBro!</h1>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={modeFlexible} onChange={() => setModeFlexible(!modeFlexible)} /> Flexible
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={randomMode} onChange={() => setRandomMode(!randomMode)} /> Aleatorio
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={examMode} onChange={() => setExamMode(!examMode)} /> Modo examen
            </label>
            <button
              onClick={resetState}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              <FaRedo />
            </button>
          </div>
        </header>
  
        <main className="bg-gray-800 w-full max-w-3xl p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold text-center mb-4">Tarjeta {currentIndex + 1}/{reviewQueue.length}</h2>
  
          <p className="mb-2">Pregunta:</p>
          <p className="text-lg font-medium mb-4">{currentCard.question}</p>
  
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Escribe tu respuesta..."
            className="w-full p-3 rounded bg-gray-700 text-white mb-3"
          />
  
          {feedback && (
            <p className={`text-lg mb-3 ${feedback.includes('Correcto') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</p>
          )}
  
          {!showAnswer ? (
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleCheck}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >Verificar</button>
              {!examMode && (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                >Mostrar Respuesta</button>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-gray-300">Respuesta correcta:</p>
              <p className="text-green-300 bg-gray-700 p-3 rounded mt-1">{currentCard.answer}</p>
              <button
                onClick={handleNext}
                className="mt-3 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
              >Siguiente</button>
            </div>
          )}
  
          {!examMode && (
            <footer className="mt-4 text-sm text-gray-400 text-center">
              ✔️ {correctCount} — ❌ {incorrectCount}
            </footer>
          )}
        </main>
      </div>
    );
  };
  
export default TextFileUploader;
