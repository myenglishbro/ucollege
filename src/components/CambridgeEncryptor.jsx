import React, { useState } from 'react';

const CambridgeEncryptor = () => {
  const [encodedText, setEncodedText] = useState('');
  const [fileName, setFileName] = useState('kwt-encrypted.txt');
  const [ready, setReady] = useState(false);

  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch {
      return false;
    }
  };

  const isCambridgeFormat = (text) => {
    const blocks = text
      .split(/\n\s*\n/) // Permite bloques separados por líneas en blanco
      .map((b) => b.trim())
      .filter(Boolean);

    let errorMessages = [];

    blocks.forEach((block, index) => {
      const blockLabel = `🧩 Bloque ${index + 1}`;
      if (!/P:\s*.+/.test(block)) {
        errorMessages.push(`${blockLabel} ➤ Falta la línea que empieza con "P:"`);
      }
      if (!/K:\s*.+/.test(block)) {
        errorMessages.push(`${blockLabel} ➤ Falta la línea que empieza con "K:"`);
      }
      if (!/R:\s*.+/.test(block)) {
        errorMessages.push(`${blockLabel} ➤ Falta la línea que empieza con "R:"`);
      }
    });

    if (errorMessages.length > 0) {
      alert(`❌ Formato inválido. Revisa lo siguiente:\n\n${errorMessages.join('\n')}`);
      return false;
    }

    return true;
  };

  // ✅ Función segura para codificar texto con caracteres especiales
  const encodeToBase64 = (str) => {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      alert('❌ Error al codificar el archivo. Verifica que no contenga caracteres inválidos.');
      return null;
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.toLowerCase().endsWith('.txt')) {
      alert('❌ Sube un archivo .txt válido');
      return;
    }

    // Derivar nombre de archivo para descarga
    const originalName = file.name;
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    setFileName(`${baseName}-encrypted.txt`);

    const text = await file.text();

    if (isBase64(text)) {
      alert('⚠️ El archivo ya está cifrado.');
      return;
    }

    if (!isCambridgeFormat(text)) {
      return;
    }

    const encoded = encodeToBase64(text);
    if (!encoded) return;

    setEncodedText(encoded);
    setReady(true);
  };

  const downloadFile = () => {
    const blob = new Blob([encodedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    reset();
  };

  const reset = () => {
    setEncodedText('');
    setReady(false);
    setFileName('kwt-encrypted.txt');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold text-center">Encriptador Cambridge 🔐</h1>
      <p className="text-sm text-gray-400 text-center">
        Solo acepta archivos con formato:<br />
        P: oración original<br />
        K: palabra clave<br />
        R: transformación correcta
      </p>

      {!ready && (
        <input
          type="file"
          accept=".txt"
          onChange={handleUpload}
          className="bg-gray-800 p-3 rounded-lg text-white cursor-pointer"
        />
      )}

      {ready && (
        <div className="flex flex-col items-center space-y-4 mt-4 w-full max-w-2xl">
          <textarea
            readOnly
            value={encodedText}
            rows={10}
            className="w-full bg-gray-800 p-4 rounded-lg text-sm"
          />
          <button
            onClick={downloadFile}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white text-lg"
          >
            Descargar archivo cifrado
          </button>
          <button
            onClick={reset}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
          >
            Subir otro archivo
          </button>
        </div>
      )}
    </div>
  );
};

export default CambridgeEncryptor;
