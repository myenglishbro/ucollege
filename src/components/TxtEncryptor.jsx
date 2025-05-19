import React, { useState } from 'react';

const TxtEncryptor = () => {
  const [encodedText, setEncodedText] = useState('');
  const [ready, setReady] = useState(false);
  const [originalName, setOriginalName] = useState('');

  // Usa TextEncoder para UTF-8 y evita unescape/btoa directo
  const toBase64 = (str) => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    // Convierte el Uint8Array a cadena “binary” antes de btoa
    const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
    return btoa(binary);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'text/plain') {
      alert('❌ Sube un archivo .txt válido');
      return;
    }
    setOriginalName(file.name.replace(/\.txt$/i, ''));
    const text = await file.text();
    const encoded = toBase64(text);
    setEncodedText(encoded);
    setReady(true);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const blob = new Blob([encodedText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(blob);
    const downloadName = `${originalName}_encrypted.txt`;
    element.download = downloadName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">🔐 Cifrador de archivos .txt</h1>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className="mb-4 bg-gray-800 p-2 rounded"
      />
      {ready && (
        <>
          <textarea
            value={encodedText}
            onChange={(e) => setEncodedText(e.target.value)}
            rows={10}
            className="w-full max-w-2xl mb-4 p-3 bg-gray-800 rounded"
          />
          <button
            onClick={handleDownload}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded font-bold"
          >
            Descargar archivo cifrado
          </button>
        </>
      )}
    </div>
  );
};

export default TxtEncryptor;
