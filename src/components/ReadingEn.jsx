import React, { useState } from 'react';

const ReadingEn = () => {
  const [encodedText, setEncodedText] = useState('');
  const [fileName, setFileName] = useState('archivo_cifrado.txt');
  const [ready, setReady] = useState(false);

  const toBase64 = (str) => {
    const utf8Bytes = new TextEncoder().encode(str);
    const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
    return btoa(binary);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'text/plain') {
      alert('❌ Sube un archivo .txt válido');
      return;
    }

    const text = await file.text();
    const encoded = toBase64(text);
    setEncodedText(encoded);
    setFileName(file.name.replace(/\.txt$/, '') + '_encrypted.txt');
    setReady(true);
  };

  const handleDownload = () => {
    const blob = new Blob([encodedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">🔐 Cifrador de Archivos .TXT</h1>

      <div className="w-full max-w-xl bg-white/5 p-6 rounded-2xl backdrop-blur-md shadow-lg">
        <label className="block mb-3 text-gray-300 font-semibold">Sube un archivo .txt:</label>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="w-full bg-gray-100 text-black rounded px-3 py-2 mb-4"
        />

        {ready && (
          <>
            <textarea
              readOnly
              value={encodedText}
              rows={8}
              className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-green-400 font-mono text-sm border border-green-500"
            />
            <button
              onClick={handleDownload}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow"
            >
              Descargar archivo cifrado
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadingEn;
