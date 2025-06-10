import React from 'react';

const AccessGrantedBox = ({ url, onClose }) => {
  const handleOpenPDF = () => {
    const popup = window.open(url, 'PDFViewer', 'width=600,height=800');
    if (!popup) {
      alert('Popup blocked! Please allow popups for this site.');
    }
    onClose();
  };

  return (
    <div className="absolute top-4 right-4 w-[160px] h-[160px] bg-white/30 shadow-xl rounded-2xl flex flex-col items-center justify-center z-20 p-4 backdrop-blur-lg border border-white/20 transition-all duration-300">
      <p className="text-sm font-semibold text-gray-800 text-center mb-2 flex items-center gap-1">
        <span className="text-green-500 text-lg">✔</span> Access Granted
      </p>
      <button
        onClick={handleOpenPDF}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs w-full font-medium shadow-md transition-all duration-200 transform hover:scale-105"
      >
        View PDF
      </button>
    </div>
  );
};

export default AccessGrantedBox;
