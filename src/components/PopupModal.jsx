import React from 'react';

const PopupModal = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <div className="text-gray-800">
          {content}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
