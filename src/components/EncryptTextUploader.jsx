import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const isValidFlashcardFormat = (text) => {
  const blocks = text.split(/\r?\n\r?\n/); // bloques separados por línea en blanco
  const invalidBlocks = [];

  blocks.forEach((block, index) => {
    const hasP = /^P:\s*.+/m.test(block);
    const hasR = /^R:\s*.+/m.test(block);
    if (!hasP || !hasR) {
      invalidBlocks.push(`🧩 Bloque ${index + 1}: ${!hasP ? 'Falta "P:"' : ''} ${!hasR ? 'Falta "R:"' : ''}`);
    }
  });

  return { valid: invalidBlocks.length === 0, errors: invalidBlocks };
};

const EncryptTextUploader = () => {
  const [encodedText, setEncodedText] = useState('');
  const [fileName, setFileName] = useState('encrypted-flashcards.txt');
  const [errorModal, setErrorModal] = useState({ open: false, messages: [] });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'text/plain') {
      setErrorModal({
        open: true,
        messages: ['❌ Por favor, sube un archivo .txt válido'],
      });
      return;
    }

    const text = await file.text();

    // Validar antes de cifrar
    const { valid, errors } = isValidFlashcardFormat(text);
    if (!valid) {
      setEncodedText('');
      setErrorModal({ open: true, messages: errors });
      return;
    }

const encoded = btoa(unescape(encodeURIComponent(text)));
    setEncodedText(encoded);
    const newFileName = file.name.replace('.txt', '-encrypted.txt');
    setFileName(newFileName);
  };

  const downloadEncodedFile = () => {
    const blob = new Blob([encodedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">🛡️ Cifrador de archivos .txt</h1>

      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className="bg-gray-700 p-3 rounded-lg text-white cursor-pointer"
      />

      {encodedText && (
        <div className="flex flex-col items-center space-y-4 mt-4">
          <textarea
            readOnly
            value={encodedText}
            rows={10}
            className="w-full max-w-xl bg-gray-800 p-4 rounded-lg text-sm"
          />
          <button
            onClick={downloadEncodedFile}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white text-lg"
          >
            Descargar archivo cifrado
          </button>
        </div>
      )}

      <AnimatePresence>
        {errorModal.open && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-red-900 text-white p-6 rounded-xl shadow-lg w-full max-w-lg"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4 text-red-300">❌ Error de formato</h2>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                {errorModal.messages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
              <div className="mt-6 text-right">
                <button
                  onClick={() => setErrorModal({ open: false, messages: [] })}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EncryptTextUploader;
