// components/UnlockLinkModal.jsx
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';

export default function UnlockLinkModal({ link, onConfirm, onClose }) {
  const [code, setCode] = useState('');
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-white mb-4 text-xl font-semibold">Desbloquear enlace</h3>
        <p className="text-gray-200 mb-4">Ingresa el código para desbloquear: <strong className="text-white">{link.titulo}</strong></p>
        <input type="text" value={code} onChange={e => setCode(e.target.value)} className="w-full p-2 mb-4 rounded text-black" placeholder="Código" />
        <button onClick={() => onConfirm(code)} className="w-full py-2 mb-2 bg-green-500 rounded text-white flex justify-center items-center gap-2"><FaLock/> Enviar código</button>
        <button onClick={onClose} className="w-full py-2 bg-red-500 rounded text-white">Cancelar</button>
      </div>
    </div>
  );
}
