import React from 'react';
import { FaSearch } from 'react-icons/fa';

/**
 * SearchBar component
 * @param {{ value: string; onChange: (val: string) => void; onClear: () => void }} props
 */
export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative flex items-center bg-gray-800 rounded-full shadow-md p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500">
      <FaSearch className="text-gray-400 ml-3" />
      <input
        type="text"
        placeholder="Buscar..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none px-3 text-white placeholder-gray-500 transition-all duration-300 focus:placeholder-gray-400"
      />
      {value && (
        <button
          className="text-gray-400 hover:text-white transition-all pr-3"
          onClick={onClear}
        >
          ✖
        </button>
      )}
    </div>
  );
}
