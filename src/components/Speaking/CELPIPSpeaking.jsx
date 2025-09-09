import React, { useState, useEffect, useRef } from "react";
import questions from './data/celpipQuestion.json';

const PREP_TIME = 30; // segundos
const ANSWER_TIME = 90; // segundos

const CELPIPSpeaking = () => {
  const [step, setStep] = useState("prep"); // prep | answer | finished
  const [timer, setTimer] = useState(PREP_TIME);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef(null);

  // Animación "grabando"
  const RecordingIndicator = () => (
    <div className="flex items-center gap-2 animate-pulse">
      <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
      <span className="text-base text-red-400 font-medium">Recording...</span>
    </div>
  );

  // Temporizador y lógica de cambio de fases
  useEffect(() => {
    if (step === "finished") return;
    if (timer === 0) {
      if (step === "prep") {
        setStep("answer");
        setTimer(ANSWER_TIME);
        startRecognition();
      } else if (step === "answer") {
        setStep("finished");
        stopRecognition();
      }
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, step]);

  // Iniciar reconocimiento de voz
  const startRecognition = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech Recognition not supported");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + " ";
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };
    recognition.onerror = (e) => console.error(e);
    recognition.onend = () => {};
    recognitionRef.current = recognition;
    recognition.start();
  };

  // Detener reconocimiento de voz
  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Reiniciar para siguiente pregunta
  const handleNext = () => {
    setTranscript("");
    setStep("prep");
    setTimer(PREP_TIME);
    setCopied(false);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setQuestionIndex(0); // o finalizar todo
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const currentQuestion = questions[questionIndex];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#11161d] via-[#161a28] to-[#0e1018] px-2 sm:px-6 py-5">
      <div className="
        w-full max-w-md sm:max-w-lg md:max-w-xl 
        bg-gradient-to-br from-[#161a23f7] via-[#172a3bfb] to-[#10111dd6] 
        text-[#eaf3fa] rounded-3xl shadow-2xl relative font-inter 
        p-4 sm:p-7 md:p-10
        border border-[#23283a]
        backdrop-blur-md
        transition-all
        ">
        {/* Header */}
        <h1 className="
          text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center tracking-tight 
          bg-gradient-to-r from-[#46b3f7] via-[#8257e6] to-[#00ffd0] bg-clip-text text-transparent drop-shadow-lg
          ">
          Speaking Simulator Task 01
        </h1>

        {/* Pregunta */}
        <div className="
          mb-8 p-4 sm:p-5 bg-[#1a2236e6] rounded-2xl shadow-lg border-l-4 border-[#46b3f7]
          text-sm sm:text-base
        ">
          <span className="block text-base sm:text-lg font-semibold mb-1 text-[#6ee7ff]">
            Task {questionIndex + 1}:
          </span>
          <span className="block">{currentQuestion.prompt}</span>
        </div>

        {/* Timer y estado */}
        <div className="flex flex-col items-center mb-7">
          <div className="mb-3">
            {step === "answer" ? <RecordingIndicator /> : (
              <span className="text-xs sm:text-sm text-[#a7b7c8]">
                {step === "prep" ? "Preparation Time" : "Finished"}
              </span>
            )}
          </div>
          <div className={`
            text-4xl sm:text-5xl md:text-6xl font-mono px-5 py-2 sm:px-8 sm:py-3 rounded-xl 
            transition-all duration-200 shadow-lg 
            ${timer < 10 ? "text-[#3fe0c5] bg-[#243453]" : "text-[#eaf3fa] bg-[#23283e]"}
            `}>
            {step === "finished" ? 0 : timer}
          </div>
        </div>

        {/* Transcripción */}
        {(step === "answer" || step === "finished") && (
          <div className="w-full mb-6">
            <label className="block text-xs text-[#46b3f7] mb-1 font-semibold">Your Answer (auto-transcribed):</label>
            <textarea
              value={transcript}
              readOnly
              className="
                w-full min-h-[112px] max-h-[300px] rounded-2xl 
                bg-[#0f1523ef] border-2 border-[#232c46] p-2.5 sm:p-3 text-[#eaf3fa]
                focus:outline-none resize-y shadow-inner scroll-smooth
                text-sm sm:text-base
              "
              style={{
                fontSize: "1rem",
                lineHeight: "1.65",
                fontFamily: "inherit",
                overflow: "auto",
              }}
              placeholder="Your speech will appear here..."
            />
          </div>
        )}

        {/* Botones finales */}
        {step === "finished" && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full justify-center">
              <button
                className="
                  px-4 py-2 rounded-lg bg-[#25314a] text-[#46b3f7] font-semibold 
                  hover:bg-[#46b3f7] hover:text-[#161b22] transition duration-200 shadow-md
                  w-full sm:w-auto text-sm sm:text-base
                "
                onClick={handleCopy}
              >
                {copied ? "¡Copiado!" : "Copiar transcripción"}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(transcript)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-4 py-2 rounded-lg bg-[#25d366] text-white font-semibold 
                  hover:bg-[#128c7e] transition duration-200 shadow-md
                  w-full sm:w-auto text-sm sm:text-base
                "
              >
                Enviar por WhatsApp
              </a>
            </div>
            <button
              className="
                mt-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#25314a] to-[#46b3f7]
                text-[#161b22] font-bold shadow-xl hover:opacity-80 transition text-base sm:text-lg w-full sm:w-auto
              "
              onClick={handleNext}
            >
              Next Question
            </button>
          </div>
        )}

        <div className="absolute top-3 right-5 text-xs text-[#344361] opacity-60 select-none hidden sm:block">Powered by Web Speech API</div>
        <div className="mt-7 sm:hidden text-xs text-[#344361] opacity-60 text-center">Powered by Web Speech API</div>
      </div>
    </div>
  );
};

export default CELPIPSpeaking;
