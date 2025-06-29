import React from 'react';

/**
 * AccordionSection component
 * @param {{
 *   title: string;
 *   isOpen: boolean;
 *   isSelected: boolean;
 *   onToggle: () => void;
 *   children: React.ReactNode;
 * }} props
 * @returns JSX.Element
 */
export default function AccordionSection({ title, isOpen, isSelected, onToggle, children }) {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center px-4 py-2 font-bold text-left transition-colors rounded
          ${isSelected ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white'}`}
      >
        <span>{title}</span>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-2 bg-gray-900 rounded-b">
          {children}
        </div>
      )}
    </div>
  );
}
