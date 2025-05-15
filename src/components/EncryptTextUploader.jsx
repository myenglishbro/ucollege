import React, { useState } from 'react';

const EncryptTextUploader = () => {
  const [encodedText, setEncodedText] = useState('');
  const [fileName, setFileName] = useState('encrypted-flashcards.txt');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'text/plain') {
      alert('Por favor, sube un archivo .txt válido');
      return;
    }

    const text = await file.text();
    const encoded = btoa(text);
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
      <h1 className="text-3xl font-bold">Cifrador de archivos .txt 🔐</h1>

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
    </div>
  );
};

export default EncryptTextUploader;
