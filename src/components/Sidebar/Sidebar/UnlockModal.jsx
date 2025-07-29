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
      <div className="flex flex-col items-center space-y-6 bg-[#11131A] rounded-xl p-4 text-[#E5E7EB]">
        <p className="text-center text-base font-medium leading-relaxed">
          Ingresa el código para acceder a{" "}
          <strong className="text-[#FFA8F4]">{enlaceTitle}</strong>
        </p>

        <input
          type="text"
          value={codeValue}
          onChange={(e) => onCodeChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-[#1A1C27] text-[#E5E7EB] text-lg placeholder:text-gray-500 border border-[#2E3352] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1515FF] focus:border-[#1515FF] transition-all duration-200 shadow-inner"
          placeholder="Código de desbloqueo"
        />

        <div className="flex w-full justify-between gap-4 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-[#FFA8F4] text-[#11131A] font-semibold rounded-xl hover:bg-[#f58ee6] transition duration-200 shadow-md hover:shadow-lg"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSubmit(codeValue)}
            className="flex-1 px-4 py-2.5 bg-[#1515FF] text-white font-semibold rounded-xl hover:bg-[#0f0fdd] transition duration-200 shadow-md hover:shadow-lg"
          >
            Enviar código
          </button>
        </div>
      </div>
    </Modal>
  );
}
