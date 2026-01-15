import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// fallback accordion component in case import fails
const Accordion = ({ children }) => <div className="space-y-2">{children}</div>;
const AccordionItem = ({ value, children, openStates, toggleOpen }) => {
  const open = openStates[value] || false;
  return (
    <div className="border border-gray-700 rounded-lg bg-[#181b2f]">
      <button
        onClick={() => toggleOpen(value)}
        className="w-full text-left px-3 py-2 font-semibold text-white hover:bg-[#22263d] flex justify-between items-center"
      >
        {children[0]}
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-cyan-300"
        >
          {open ? '▲' : '▼'}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-3 pb-3 text-sm text-gray-300"
          >
            {children[1]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LOGO_URL = "https://i.ibb.co/v45SChgs/wwwee.png";

const getYouTubeID = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^\s&]+)/);
  return match ? match[1] : '';
};

const getDriveImageURL = (url) => {
  if (url.includes("https://drive.google.com")) {
    const match = url.match(/\/d\/(.*?)\//);
    if (match) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }
  return url;
};

export default function CreativeSlides() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState('upload');
  const [openSections, setOpenSections] = useState({});

  const handleUpload = async (file) => {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      setSlides(data);
      setStage('playing');
      setCurrentIndex(0);
    } catch (err) {
      alert('Error parsing file. Please upload a valid JSON with correct format.');
      console.error(err);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 < slides.length ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const toggleOpen = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    setOpenSections({});
  }, [currentIndex]);

  useEffect(() => {
    const handler = (e) => {
      if (stage !== 'playing') return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [stage, nextSlide, prevSlide]);

  const toggleFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  const current = slides[currentIndex] || {};

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0f1123] to-[#1c1e2f] text-white flex items-center justify-center p-6 relative overflow-hidden"
      onDrop={e => {
        e.preventDefault();
        handleUpload(e.dataTransfer.files[0]);
      }}
      onDragOver={e => e.preventDefault()}
    >
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/JRq450kr/Fondos-de-zoom-11.png')] bg-cover bg-center opacity-10 animate-pulse-slow" />

      {stage === 'upload' && (
        <motion.div className="relative z-10 max-w-2xl w-full text-center bg-black/60 p-8 rounded-xl shadow-xl backdrop-blur">
          <img src={LOGO_URL} alt="MyEnglishBro logo" className="mx-auto w-24 h-24 mb-4 opacity-70" />
          <h1 className="text-2xl font-bold text-cyan-300 mb-4">📂 Upload Presentation File</h1>
          <p className="text-gray-400 mb-4 text-sm">Upload a structured JSON file with your slides</p>
          <label className="cursor-pointer bg-[#1f1f2e] hover:bg-[#29293d] border border-gray-600 text-sm py-2 px-4 rounded-xl inline-block">
            Select file
            <input type="file" accept=".json" onChange={e => handleUpload(e.target.files[0])} className="hidden" />
          </label>
        </motion.div>
      )}

      {stage === 'playing' && (
        <div className="relative z-10 max-w-6xl w-full rounded-xl p-8 bg-black/60 backdrop-blur-lg shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div className="bg-cyan-400 h-2.5" style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}></div>
            </div>
            <button
              onClick={toggleFullScreen}
              className="ml-4 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
            >
              🖥 Full Screen
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-6 items-start bg-[#101322] p-6 rounded-lg"
            >
              <div className="w-full md:w-1/2">
                {current.image ? (
                  <img src={getDriveImageURL(current.image)} alt="Slide" className="rounded-lg shadow-md w-full object-cover max-h-64" />
                ) : current.video ? (
                  current.video.includes("youtube.com") || current.video.includes("youtu.be") ? (
                    <iframe
                      className="rounded-lg w-full aspect-video"
                      src={`https://www.youtube.com/embed/${getYouTubeID(current.video)}`}
                      title="YouTube video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video src={current.video} controls className="rounded-lg w-full max-h-64" />
                  )
                ) : null}
              </div>
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold text-cyan-400">{current.title}</h2>
                <Accordion type="multiple" className="mt-3 space-y-2">
                  <AccordionItem value="text" openStates={openSections} toggleOpen={toggleOpen}>
                    <h3 className="text-sm font-semibold text-white">📘 Summary</h3>
                    <div className="text-sm text-gray-300 whitespace-pre-line">{current.text}</div>
                  </AccordionItem>

                  {current.extra && (
                    <AccordionItem value="extra" openStates={openSections} toggleOpen={toggleOpen}>
                      <h3 className="text-sm font-semibold text-yellow-300">💡 Tip</h3>
                      <div className="text-sm italic text-yellow-200">{current.extra}</div>
                    </AccordionItem>
                  )}

                  {current.questions && current.questions.length > 0 && (
                    <AccordionItem value="questions" openStates={openSections} toggleOpen={toggleOpen}>
                      <h3 className="text-sm font-semibold text-cyan-300">🗣️ Questions</h3>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {current.questions.map((q, idx) => <li key={idx}>{q}</li>)}
                      </ul>
                    </AccordionItem>
                  )}

                  {current.useful_phrases && current.useful_phrases.length > 0 && (
                    <AccordionItem value="phrases" openStates={openSections} toggleOpen={toggleOpen}>
                      <h3 className="text-sm font-semibold text-cyan-300">💬 Useful phrases</h3>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {current.useful_phrases.map((p, idx) => <li key={idx}>{p}</li>)}
                      </ul>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 rounded-lg text-sm"
            >
              ◀ Prev
            </button>
            {currentIndex === slides.length - 1 ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setStage('upload')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
                >
                  📂 Upload new file
                </button>
                <button
                  onClick={() => setCurrentIndex(0)}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
                >
                  🔁 Restart presentation
                </button>
              </div>
            ) : (
              <button
                onClick={nextSlide}
                className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 rounded-lg text-sm"
              >
                Next ▶
              </button>
            )}
          </div>

          <div className="mt-4 text-right text-xs text-white/30 italic">
            Slide {currentIndex + 1} / {slides.length} • Powered by MyEnglishBro™
          </div>
        </div>
      )}
    </div>
  );
}
