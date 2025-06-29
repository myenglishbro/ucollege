// components/RewardPopup.jsx
import React from 'react';

export default function RewardPopup({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl relative max-w-lg w-full">
        <button onClick={onClose} className="absolute top-3 right-3 text-white text-2xl">✖</button>
        <h2 className="text-2xl font-bold mb-2">Epic Reward</h2>
        <p className="mb-4 text-white">{data.description}</p>
        <img src={data.image} alt="Reward" className="w-full rounded mb-4" />
        <button onClick={onClose} className="w-full py-2 bg-gray-600 rounded text-white">Close</button>
      </div>
    </div>
  );
}