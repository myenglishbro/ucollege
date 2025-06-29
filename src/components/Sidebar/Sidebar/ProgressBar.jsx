import React from 'react';

/**
 * ProgressBar component
 * @param {{ percent: number }} props
 * @returns JSX.Element
 */
export default function ProgressBar({ percent }) {
  return (
    <div className="w-full px-4 mb-4">
      <div className="w-full bg-gray-700 h-2 rounded overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sm mt-1 text-right text-gray-300">
        {percent}% completed
      </p>
    </div>
  );
}
