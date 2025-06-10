import React from 'react';

const CodeAccessModal = ({
  enteredCode,
  setEnteredCode,
  handleCodeSubmit,
  setShowModal,
  error
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-30">
      <div className="bg-gray-900 w-[280px] p-6 rounded-2xl shadow-xl text-center text-white border border-gray-700">
        <p className="text-base font-semibold flex items-center justify-center gap-2">
          🔒 <span>Enter Code</span>
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Please enter the access code to unlock.
        </p>
        <input
          type="text"
          placeholder="Enter your code"
          value={enteredCode}
          onChange={(e) => setEnteredCode(e.target.value)}
          className="mt-4 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
        <button
          onClick={() => {
            handleCodeSubmit();
          }}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm w-full font-medium shadow-md transition-all duration-200 transform hover:scale-105"
        >
          Submit
        </button>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 text-gray-400 text-sm underline hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CodeAccessModal;
