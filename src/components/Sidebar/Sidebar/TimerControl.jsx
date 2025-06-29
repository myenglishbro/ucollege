import React from 'react';

/**
 * TimerControl component
 * @param {{
 *   timeLeft: number,
 *   minutes: number,
 *   onMinutesChange: (val: number) => void,
 *   onStart: () => void,
 *   onStop: () => void,
 * }} props
 * @returns JSX.Element
 */
export default function TimerControl({ timeLeft, minutes, onMinutesChange, onStart, onStop }) {
  const totalSeconds = minutes * 60;
  const percent = totalSeconds > 0 ? (timeLeft / totalSeconds) * 100 : 0;
  const displayMinutes = Math.floor(timeLeft / 60);
  const displaySeconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="timer-container p-4 rounded-lg text-white space-y-4 bg-gray-800">
      {/* Progress bar */}
      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Display MM:SS */}
      <span className="text-sm">
        {displayMinutes}:{displaySeconds}
      </span>

      {/* Input minutos */}
      <input
        type="number"
        min="1"
        value={minutes}
        onChange={e => onMinutesChange(Number(e.target.value))}
        className="w-24 p-2 rounded bg-[#1A1F2E] text-center text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2F78FF]"
        placeholder="Min"
      />

      {/* Botones Start / Stop */}
      <div className="flex gap-2">
        <button
          onClick={onStart}
          className="px-3 py-1 bg-gradient-to-br from-[#202632] to-[#1C1F26] text-gray-300 rounded transition-all"
        >
          Start
        </button>
        <button
          onClick={onStop}
          className="px-3 py-1 bg-gradient-to-br from-[#202632] to-[#1C1F26] text-gray-300 rounded transition-all"
        >
          Stop
        </button>
      </div>
    </div>
  );
}