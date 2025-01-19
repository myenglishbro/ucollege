import React, { useState, useEffect } from 'react';

const Timer = ({ timerMinutes, setTimerMinutes, setShowModal }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setShowModal(true);  // Mostrar el modal cuando el tiempo termine
    }
  }, [isTimerRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(timerMinutes * 60);
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleRestartTimer = () => {
    setShowModal(false);
    setTimeLeft(timerMinutes * 60);
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setShowModal(false);
    setIsTimerRunning(false);
  };

  return (
    <div className="timer-container">
      <h2 className="timer-title">⏱ Timer</h2>
      <div className="timer-progress">
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{
              width: isTimerRunning
                ? `${(timeLeft / (timerMinutes * 60)) * 100}%`
                : "0%",
            }}
          ></div>
        </div>
        <span className="time-left">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>
      <div className="timer-input">
        <label className="input-title" htmlFor="input-minutes">
          Set Timer:
        </label>
        <input
          id="input-minutes"
          type="number"
          min="1"
          value={timerMinutes}
          onChange={(e) => setTimerMinutes(Number(e.target.value))}
          className="input-minutes"
          placeholder="00"
        />
      </div>
      <div className="timer-buttons">
        <button onClick={startTimer} className="timer-button">
          Start
        </button>
        <button onClick={stopTimer} className="timer-button stop">
          Stop
        </button>
      </div>
    </div>
  );
};

export default Timer;
