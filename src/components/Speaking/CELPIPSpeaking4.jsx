import React, { useState, useEffect, useRef } from "react";
import questions from './data/celpipQuestion4.json';

const PREP_TIME = 30;
const ANSWER_TIME = 60;

const CELPIPSpeaking4= () => {
  const [step, setStep] = useState("prep");
  const [timer, setTimer] = useState(PREP_TIME);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef(null);

  const RecordingIndicator = () => (
    <div className="flex items-center gap-2 animate-pulse">
      <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
      <span className="text-base text-red-400 font-medium">Recording...</span>
    </div>
  );

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

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleNext = () => {
    setTranscript("");
    setStep("prep");
    setTimer(PREP_TIME);
    setCopied(false);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setQuestionIndex(0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const currentQuestion = questions[questionIndex];

  return (
    <div className="max-w-xl mx-auto py-8 px-6 bg-gradient-to-br from-[#161b22] via-[#202b3a] to-[#181d2a] text-[#eaf3fa] rounded-3xl shadow-2xl relative font-inter">
      <h1 className="text-3xl font-extrabold mb-6 text-center tracking-tight bg-gradient-to-r from-[#46b3f7] to-[#00ffd0] bg-clip-text text-transparent drop-shadow-lg">
        CELPIP Speaking (with Images)
      </h1>
      
      <div className="mb-6 flex flex-col items-center">
        {currentQuestion.image && (
          <img
            src={currentQuestion.image}
            alt="Prompt visual"
            className="mb-5 w-full max-w-sm h-56 object-cover rounded-2xl shadow-lg border-4 border-[#222d3f]"
            draggable={false}
          />
        )}
        <div className="w-full bg-[#212942] rounded-xl p-4 shadow-md border-l-4 border-[#46b3f7] mb-2">
          <span className="block text-base font-semibold text-[#46b3f7] mb-1">Task {questionIndex + 1}:</span>
          <span className="text-md">{currentQuestion.prompt}</span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-7">
        <div className="mb-2">
          {step === "answer" ? <RecordingIndicator /> : (
            <span className="text-sm text-[#a7b7c8]">
              {step === "prep" ? "Preparation Time" : "Finished"}
            </span>
          )}
        </div>
        <div className={`text-5xl font-mono px-7 py-2 rounded-xl transition-all duration-200 shadow-lg ${timer < 10 ? "text-[#3fe0c5] bg-[#243453]" : "text-[#eaf3fa] bg-[#222742]"}`}>
          {step === "finished" ? 0 : timer}
        </div>
      </div>

      {(step === "answer" || step === "finished") && (
        <div className="w-full mb-6">
          <label className="block text-xs text-[#46b3f7] mb-1 font-semibold">Your Answer (auto-transcribed):</label>
          <textarea
            value={transcript}
            readOnly
            className="w-full min-h-[112px] max-h-[300px] rounded-2xl bg-[#0f1523] border-2 border-[#2b344a] p-3 text-[#eaf3fa] focus:outline-none resize-y shadow-inner scroll-smooth"
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              fontFamily: "inherit",
              overflow: "auto",
            }}
            placeholder="Your speech will appear here..."
          />
        </div>
      )}

      {step === "finished" && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2 mb-4 w-full justify-center">
            <button
              className="px-4 py-2 rounded-lg bg-[#25314a] text-[#46b3f7] font-semibold hover:bg-[#46b3f7] hover:text-[#161b22] transition duration-200 shadow-md"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy Transcript"}
            </button>
            <a
              href={`https://wa.link/dzsnrd?text=${encodeURIComponent(transcript)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#25d366] text-white font-semibold hover:bg-[#128c7e] transition duration-200 shadow-md"
            >
              Send on WhatsApp
            </a>
          </div>
          <button
            className="mt-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#25314a] to-[#46b3f7] text-[#161b22] font-bold shadow-xl hover:opacity-80 transition text-lg"
            onClick={handleNext}
          >
            Next Question
          </button>
        </div>
      )}
      <div className="absolute top-3 right-7 text-xs text-[#344361] opacity-60 select-none">Powered by Web Speech API</div>
    </div>
  );
};

export default CELPIPSpeaking4;
