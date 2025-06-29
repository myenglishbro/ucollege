import React from 'react';

/**
 * Generic Modal component
 * @param {boolean} isOpen - whether to show the modal
 * @param {string} title - modal header title
 * @param {React.ReactNode} children - content inside the modal
 * @param {() => void} onClose - callback when closing the modal
 */
export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          ✖
        </button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}
