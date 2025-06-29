import React from 'react';
import Modal from '../common/Modal';

/**
 * UnlockModal component
 * @param {{
 *   isOpen: boolean;
 *   enlaceTitle: string;
 *   onSubmit: (code: string) => void;
 *   onCancel: () => void;
 *   codeValue: string;
 *   onCodeChange: (val: string) => void;
 * }} props
 */
export default function UnlockModal({ isOpen, enlaceTitle, onSubmit, onCancel, codeValue, onCodeChange }) {
  return (
    <Modal isOpen={isOpen} title="Desbloquear enlace" onClose={onCancel}>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-gray-200 text-center">
          Ingresa el código para <strong>{enlaceTitle}</strong>
        </p>
        <input
          type="text"
          value={codeValue}
          onChange={e => onCodeChange(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Código de desbloqueo"
        />
        <div className="flex w-full justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSubmit(codeValue)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Enviar código
          </button>
        </div>
      </div>
    </Modal>
  );
}
