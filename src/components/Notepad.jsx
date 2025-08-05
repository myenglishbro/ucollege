import React, { useRef, useState, useEffect } from 'react';
import { FiPrinter, FiMaximize, FiMinimize, FiMic, FiSmile } from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';

const Notepad = ({
  notes,
  setNotes,
  fontSize,
  setFontSize,
  isExpanded,
  setIsExpanded,
  printNotes,
}) => {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [listening, setListening] = useState(false);
  const [savedRange, setSavedRange] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = false;
      rec.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(r => r[0].transcript)
          .join('');
        insertTextAtCursor(transcript);
        updateCounts();
      };
      rec.onend = () => setListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = notes;
      updateCounts();
    }
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.fontSize = `${fontSize}px`;
    }
  }, [fontSize]);

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  const updateCounts = () => {
    const text = editorRef.current.innerText || '';
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharCount(text.length);
  };

  const handleInput = (e) => {
    setNotes(e.currentTarget.innerHTML);
    updateCounts();
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSavedRange(sel.getRangeAt(0));
    }
  };

  const insertTextAtCursor = (text) => {
    const sel = window.getSelection();
    sel.removeAllRanges();

    if (savedRange) {
      sel.addRange(savedRange);
    }

    const range = sel.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    // Move the cursor after the inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    sel.removeAllRanges();
    sel.addRange(range);

    setSavedRange(range);
  };

  const onEmojiClick = (emojiData) => {
    editorRef.current.focus();
    insertTextAtCursor(emojiData.emoji);
    setShowEmojiPicker(false);
    updateCounts();
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setListening(!listening);
  };

  return (
    <div
      className={`fixed top-0 ${
        isExpanded
          ? 'left-[50px] top-20 w-[1050px] h-[480px]'
          : 'left-[50px] top-20 w-[300px] h-[450px]'
      } bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-4 flex flex-col text-gray-200 transition-all duration-300`}
      style={{ zIndex: 9999 }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <select
            value={fontSize}
            onChange={(e) => handleFontSizeChange(e.target.value)}
            className="px-2 py-1 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="20">20px</option>
            <option value="24">24px</option>
          </select>
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1 bg-gray-700/50 rounded-full hover:bg-gray-700/70 transition"
            title="Insertar Emoji"
          >
            <FiSmile size={20} />
          </button>
          <button
            onClick={toggleListening}
            className={`p-1 rounded-full transition ${listening ? 'bg-red-600' : 'bg-gray-700/50 hover:bg-gray-700/70'}`}
            title={listening ? 'Detener voz' : 'Dictado por voz'}
          >
            <FiMic size={20} />
          </button>
        </div>
        <div className="text-sm">
          <span className="mr-2">Words: {wordCount}</span>
          <span>Chars: {charCount}</span>
        </div>
      </div>

      {showEmojiPicker && (
        <div className="absolute top-12 left-4 z-50">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      <div
        ref={editorRef}
        id="notepadEditor"
        className="notepad-editable w-full flex-grow p-4 border border-gray-700 rounded-lg bg-gray-900/90 overflow-auto leading-relaxed"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        style={{
          minHeight: isExpanded ? '350px' : '250px',
          maxHeight: isExpanded ? '480px' : '450px',
          outline: 'none',
          fontFamily: 'Inter, sans-serif',
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
          lineHeight: '1.6',
          fontSize: `${fontSize}px`,
          color: '#E5E7EB',
        }}
        placeholder="Toma tus notas aquí..."
      />

      <div className="mt-3 flex justify-end space-x-2">
        <button
          onClick={printNotes}
          className="p-2 bg-gray-700/50 backdrop-blur-sm text-gray-200 rounded-full shadow-lg hover:bg-gray-700/70 transition duration-200"
          title="Imprimir Notas"
        >
          <FiPrinter size={20} />
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 bg-gray-700/50 backdrop-blur-sm text-gray-200 rounded-full shadow-lg hover:bg-gray-700/70 transition duration-200"
          title={isExpanded ? 'Contraer' : 'Expandir'}
        >
          {isExpanded ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Notepad;
