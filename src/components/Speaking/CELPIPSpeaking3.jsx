import React, { useState, useEffect, useRef, useCallback } from "react";
import questions from "./data/celpipQuestion3.json";

const ANSWER_TIME = 60;
const palette = {
  navy: "#0b1f3a",
  gold: "#c9a24b",
  goldSoft: "#f6ecd2",
  paper: "#faf8f3",
  surface: "#ffffff",
  border: "#e3dfd3",
  muted: "#5b6577",
  success: "#13795b",
  successSoft: "#dff3ea",
  sky: "#e3ecf8",
  skyText: "#1e4f91",
  danger: "#b3372f"
};
const serif = "'Playfair Display', 'Georgia', serif";
const sans = "var(--font-sora), 'Sora', 'Arial', sans-serif";
const logoUrl = "https://i.ibb.co/C3kRtYQG/zxczx-2-1.png";
const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@myenglishbro" },
  { label: "TikTok", href: "https://www.tiktok.com/@myenglishbro" },
  { label: "Instagram", href: "https://www.instagram.com/myenglishbro" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/myenglishbro" }
];

const FooterBrand = () => (
  <div className="w-full mt-8 pb-6 flex flex-col items-center gap-4">
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]" style={{ color: palette.muted }}>
      <span>Powered by</span>
      <img src={logoUrl} alt="MyEnglishBro logo" className="h-6 w-auto" />
    </div>
    <div className="flex flex-wrap items-center justify-center gap-2">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full text-xs font-semibold"
          style={{ color: palette.navy, border: `1px solid ${palette.border}`, background: palette.surface }}
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
);

export default function CELPIPSpeakingClassicUI() {
  const [step, setStep] = useState("reading"); // "reading" | "answer" | "finished"
  const [timer, setTimer] = useState(ANSWER_TIME);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [micError, setMicError] = useState(false);
  const recognitionRef = useRef(null);
  const activeRef = useRef(false);
  const finalRef = useRef("");
  const readToken = useRef(0);
  const questionIndexRef = useRef(0);

  const q = questions[questionIndex];
  const prompt = q?.examiner_prompt || q?.prompt || "";

  const stopRecognition = useCallback(() => {
    activeRef.current = false;
    const rec = recognitionRef.current;
    recognitionRef.current = null;
    if (rec) {
      rec.onend = null;
      try { rec.stop(); } catch (e) { /* already stopped */ }
    }
  }, []);

  const startRecognition = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setMicError(true);
      return;
    }
    setMicError(false);
    finalRef.current = "";
    activeRef.current = true;
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRef.current += r[0].transcript + " ";
        else interim += r[0].transcript;
      }
      setTranscript(finalRef.current + interim);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        activeRef.current = false;
        setMicError(true);
      }
    };
    // Chrome ends continuous sessions on silence; keep listening until time is up.
    rec.onend = () => {
      if (activeRef.current) {
        try { rec.start(); } catch (err) { /* ignore */ }
      }
    };
    recognitionRef.current = rec;
    try { rec.start(); } catch (err) { /* ignore */ }
  }, []);

  const startAnswer = useCallback(() => {
    setStep("answer");
    setTimer(ANSWER_TIME);
    startRecognition();
  }, [startRecognition]);

  const cancelSpeech = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  // The examiner reads the instructions aloud, then the one minute starts (no warm-up).
  const beginQuestion = useCallback(() => {
    stopRecognition();
    cancelSpeech();
    setTranscript("");
    setShowSample(false);
    setTimer(ANSWER_TIME);

    const token = ++readToken.current;
    const proceed = () => {
      if (readToken.current === token) startAnswer();
    };
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      startAnswer();
      return;
    }
    setStep("reading");
    const text = questions[questionIndexRef.current];
    const utter = new window.SpeechSynthesisUtterance(text?.examiner_prompt || text?.prompt || "");
    utter.lang = "en-US";
    utter.rate = 0.95;
    utter.onend = proceed;
    utter.onerror = proceed;
    window.speechSynthesis.speak(utter);
  }, [startAnswer, stopRecognition]);

  useEffect(() => {
    questionIndexRef.current = questionIndex;
    beginQuestion();
    return () => {
      readToken.current++;
      cancelSpeech();
      stopRecognition();
    };
  }, [questionIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (step !== "answer") return;
    if (timer === 0) {
      setStep("finished");
      stopRecognition();
      return;
    }
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, step, stopRecognition]);

  const skipReading = () => {
    readToken.current++;
    cancelSpeech();
    startAnswer();
  };
  const goNext = () => setQuestionIndex((i) => (i < questions.length - 1 ? i + 1 : 0));
  const goBack = () => setQuestionIndex((i) => (i > 0 ? i - 1 : questions.length - 1));

  const progressPct = ((ANSWER_TIME - timer) / ANSWER_TIME) * 100;
  const ringR = 44;
  const ringC = 2 * Math.PI * ringR;
  const urgent = step === "answer" && timer <= 10;
  const mm = String(Math.floor(timer / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");
  const photos = q?.images || [];

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: palette.paper, fontFamily: sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');
        .cb-top{ background:${palette.navy}; color:#fff; height:56px; display:flex; align-items:center; justify-content:space-between; padding:0 24px; border-bottom:3px solid ${palette.gold}; }
        .cb-top-title{ font-family:${serif}; font-size:17px; letter-spacing:.02em; display:flex; align-items:center; gap:12px; }
        .cb-top-title small{ font-family:${sans}; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:${palette.gold}; }
        .cb-shell{ max-width:980px; margin:32px auto; background:${palette.surface}; border:1px solid ${palette.border}; border-radius:14px; box-shadow:0 18px 50px -24px rgba(11,31,58,.35); overflow:hidden; }
        .cb-head{ display:flex; justify-content:space-between; align-items:center; padding:14px 28px; background:linear-gradient(180deg,#fff,#f7f4ec); border-bottom:1px solid ${palette.border}; font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:${palette.muted}; }
        .cb-head b{ color:${palette.navy}; }
        .cb-body{ padding:34px 40px 30px; }
        .cb-examiner{ display:flex; gap:16px; align-items:flex-start; }
        .cb-avatar{ flex:none; width:44px; height:44px; border-radius:50%; background:${palette.navy}; color:${palette.gold}; font-family:${serif}; font-size:18px; display:flex; align-items:center; justify-content:center; }
        .cb-label{ font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:${palette.gold}; font-weight:700; margin-bottom:6px; }
        .cb-question{ font-family:${serif}; font-size:24px; line-height:1.4; color:${palette.navy}; margin:0; }

        .cb-photos{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:26px; }
        .cb-photo{ margin:0; background:#f4f1e8; border:1px solid ${palette.border}; border-radius:12px; padding:8px; position:relative; }
        .cb-photo img{ display:block; width:100%; height:320px; object-fit:contain; background:#fff; border-radius:8px; }
        .cb-photo figcaption{ position:absolute; top:16px; left:16px; width:26px; height:26px; border-radius:50%; background:${palette.navy}; color:${palette.gold}; font-family:${serif}; font-weight:700; font-size:13px; display:flex; align-items:center; justify-content:center; }

        .cb-stage{ display:flex; align-items:center; gap:32px; margin:18px 0 6px; padding:22px 28px; border-radius:12px; background:${palette.paper}; border:1px solid ${palette.border}; }
        .cb-ring{ position:relative; width:112px; height:112px; flex:none; }
        .cb-ring svg{ transform:rotate(-90deg); }
        .cb-ring-num{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:${serif}; font-size:28px; font-weight:700; color:${palette.navy}; font-variant-numeric:tabular-nums; }
        .cb-ring-num.urgent{ color:${palette.danger}; }
        .cb-status{ display:flex; align-items:center; gap:10px; font-weight:700; color:${palette.navy}; font-size:15px; }
        .cb-dot{ width:10px; height:10px; border-radius:50%; background:${palette.danger}; animation:cbPulse 1.2s infinite; }
        .cb-dot.done{ background:${palette.success}; animation:none; }
        @keyframes cbPulse{ 0%{ box-shadow:0 0 0 0 rgba(179,55,47,.5);} 100%{ box-shadow:0 0 0 10px rgba(179,55,47,0);} }
        .cb-hint{ font-size:13px; color:${palette.muted}; margin-top:6px; line-height:1.5; }
        .cb-bar{ height:6px; background:#ebe7da; border-radius:999px; overflow:hidden; margin-top:14px; }
        .cb-bar-fill{ height:100%; background:linear-gradient(90deg,${palette.gold},${palette.navy}); transition:width 1s linear; }

        .cb-sub{ font-size:11px; letter-spacing:.2em; text-transform:uppercase; font-weight:700; color:${palette.muted}; margin:26px 0 10px; }
        .cb-transcript{ min-height:120px; padding:16px 18px; border:1px solid ${palette.border}; border-radius:10px; background:#fff; font-size:16px; line-height:1.75; color:#1f2937; }
        .cb-transcript.empty{ color:#9aa3b2; font-style:italic; }
        .cb-sample-toggle{ margin-top:22px; padding:9px 18px; border-radius:999px; border:1px solid ${palette.navy}; background:transparent; color:${palette.navy}; font-size:12px; font-weight:700; letter-spacing:.08em; cursor:pointer; }
        .cb-sample-toggle:hover{ background:${palette.navy}; color:#fff; }
        .cb-sample{ margin-top:12px; padding:16px 20px; background:${palette.goldSoft}; border-left:4px solid ${palette.gold}; border-radius:6px; font-size:15px; line-height:1.7; color:#2a2a2a; }
        .cb-foot{ display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; padding:16px 28px; border-top:1px solid ${palette.border}; background:#fbfaf6; }
        .cb-btn{ font-weight:700; font-size:12px; letter-spacing:.12em; text-transform:uppercase; padding:11px 22px; border-radius:8px; cursor:pointer; border:1px solid transparent; text-decoration:none; display:inline-block; transition:transform .15s ease; }
        .cb-btn:hover{ transform:translateY(-1px); }
        .cb-btn.primary{ background:${palette.navy}; color:#fff; box-shadow:0 8px 18px -10px rgba(11,31,58,.8); }
        .cb-btn.ghost{ background:#fff; color:${palette.navy}; border-color:${palette.border}; }
        .cb-btn.gold{ background:${palette.gold}; color:${palette.navy}; }
        .cb-note{ font-size:12px; color:${palette.muted}; margin-top:18px; }
        .cb-warn{ margin-top:14px; padding:10px 14px; border-radius:8px; background:#fdecea; color:${palette.danger}; font-size:13px; }
        @media (max-width:640px){
          .cb-photos{ grid-template-columns:1fr; }
          .cb-body{ padding:24px 18px; } .cb-photo img{ height:200px; } .cb-question{ font-size:19px; } .cb-stage{ flex-direction:column; text-align:center; gap:18px; }
          .cb-status{ justify-content:center; } .cb-head{ padding:12px 18px; }
        }
      `}</style>

      <div className="cb-top">
        <div className="cb-top-title">
          <img src={logoUrl} alt="MyEnglishBro logo" style={{ height: 26, width: "auto" }} />
          <span>Speaking <small>Part 2 · Long turn</small></span>
        </div>
        <div style={{ fontSize: 12, letterSpacing: ".14em", color: palette.gold }}>B2 FIRST</div>
      </div>

      <div className="cb-shell">
        <div className="cb-head">
          <span>Task <b>{questionIndex + 1}</b> / {questions.length}</span>
          <span>Speaking time: <b>1 minute</b></span>
        </div>

        <div className="cb-body">
          <div className="cb-examiner">
            <div className="cb-avatar">E</div>
            <div>
              <div className="cb-label">Examiner</div>
              <h2 className="cb-question">{prompt}</h2>
            </div>
          </div>

          <div className="cb-photos">
                {photos.map((src, n) => (
                  <figure className="cb-photo" key={src}>
                    <img src={src} alt={`Photograph ${n + 1}`} />
                    <figcaption>{n + 1}</figcaption>
                  </figure>
                ))}
              </div>

          <div className="cb-stage">
            <div className="cb-ring">
              <svg width="112" height="112" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r={ringR} fill="none" stroke="#ebe7da" strokeWidth="7" />
                <circle
                  cx="56" cy="56" r={ringR} fill="none"
                  stroke={urgent ? palette.danger : palette.gold}
                  strokeWidth="7" strokeLinecap="round"
                  strokeDasharray={ringC}
                  strokeDashoffset={ringC * (progressPct / 100)}
                  style={{ transition: "stroke-dashoffset 1s linear, stroke .3s" }}
                />
              </svg>
              <div className={`cb-ring-num ${urgent ? "urgent" : ""}`}>{mm}:{ss}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="cb-status">
                <span className={`cb-dot ${step === "finished" ? "done" : ""}`} />
                {step === "reading" ? "The examiner is speaking…" : step === "answer" ? "Listening… compare the photographs" : "Time is up"}
              </div>
              <div className="cb-hint">
                {step === "reading"
                  ? "Listen to the instructions. Your minute starts right after."
                  : step === "answer"
                  ? "Describe both photos, say what is similar and different, and give your opinion."
                  : "Compare your answer with the suggested one below."}
              </div>
              <div className="cb-bar"><div className="cb-bar-fill" style={{ width: progressPct + "%" }} /></div>
            </div>
          </div>
          {micError && (
            <div className="cb-warn">
              Microphone or speech recognition is not available. Allow mic access or try Chrome / Edge.
            </div>
          )}


          <div className="cb-sub"><span>Your answer</span></div>
          <div className={`cb-transcript ${transcript ? "" : "empty"}`}>
            {transcript || "Your speech will appear here."}
          </div>

          {q?.model_answer_b2 && (
            <>
              <button type="button" className="cb-sample-toggle" onClick={() => setShowSample((v) => !v)}>
                {showSample ? "HIDE SUGGESTED ANSWER" : "SHOW SUGGESTED ANSWER"}
              </button>
              {showSample && (
                <div className="cb-sample">
                  <div className="cb-label">Suggested answer · B2</div>
                  {q.model_answer_b2}
                </div>
              )}
            </>
          )}

          <div className="cb-note">*Note: This practice prompt does not record audio.</div>
        </div>

        <div className="cb-foot">
          <button className="cb-btn ghost" onClick={goBack}>← Back</button>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {step === "reading" && <button className="cb-btn ghost" onClick={skipReading}>Skip audio</button>}
            <button className="cb-btn ghost" onClick={beginQuestion}>Try again</button>
            {step === "finished" && transcript && (
              <>
                <button className="cb-btn gold" onClick={() => navigator.clipboard.writeText(transcript)}>Copy</button>
                <a className="cb-btn gold" href={`https://wa.me/?text=${encodeURIComponent(transcript)}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </>
            )}
            <button className="cb-btn primary" onClick={goNext}>Next →</button>
          </div>
        </div>
        <FooterBrand />
      </div>
    </div>
  );
}
