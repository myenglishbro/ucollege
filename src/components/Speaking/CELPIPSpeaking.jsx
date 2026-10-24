import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import questions from "./data/celpipQuestion.json";

const ANSWER_TIME = 15;
const palette = {
  navy: "#0b1f3a",
  deepBlue: "#16335c",
  gold: "#c9a24b",
  goldSoft: "#f6ecd2",
  paper: "#faf8f3",
  surface: "#ffffff",
  border: "#e3dfd3",
  muted: "#5b6577",
  success: "#13795b",
  successSoft: "#dff3ea",
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

// "studying", "studies" and "studied" all match the recommended verb "study".
const stemOf = (word) => {
  const w = word.toLowerCase().replace(/[^a-z']/g, "");
  return w.length > 4 ? w.replace(/(e|y)$/, "") : w;
};
const matchesVerb = (word, verb) => {
  const w = word.toLowerCase().replace(/[^a-z']/g, "");
  if (!w) return false;
  return w === verb.toLowerCase() || w.startsWith(stemOf(verb));
};

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
  const [step, setStep] = useState("answer"); // "answer" | "finished"
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
  const verbs = q?.useful_verbs || [];

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

  // The examiner reads the question aloud, then the 15 seconds start (no warm-up).
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
    const utter = new window.SpeechSynthesisUtterance(questions[questionIndexRef.current]?.prompt || "");
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

  const skipReading = () => {
    readToken.current++;
    cancelSpeech();
    startAnswer();
  };

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

  const goNext = () => setQuestionIndex((i) => (i < questions.length - 1 ? i + 1 : 0));
  const goBack = () => setQuestionIndex((i) => (i > 0 ? i - 1 : questions.length - 1));

  const words = useMemo(() => transcript.split(/(\s+)/), [transcript]);
  const usedVerbs = useMemo(
    () => verbs.filter((v) => transcript.split(/\s+/).some((w) => matchesVerb(w, v))),
    [verbs, transcript]
  );

  const progressPct = ((ANSWER_TIME - timer) / ANSWER_TIME) * 100;
  const ringR = 44;
  const ringC = 2 * Math.PI * ringR;
  const urgent = step === "answer" && timer <= 5;

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: palette.paper, fontFamily: sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');
        .cb-top{ background:${palette.navy}; color:#fff; height:56px; display:flex; align-items:center; justify-content:space-between; padding:0 24px; border-bottom:3px solid ${palette.gold}; }
        .cb-top-title{ font-family:${serif}; font-size:17px; letter-spacing:.02em; display:flex; align-items:center; gap:12px; }
        .cb-top-title small{ font-family:${sans}; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:${palette.gold}; }
        .cb-shell{ max-width:880px; margin:32px auto; background:${palette.surface}; border:1px solid ${palette.border}; border-radius:14px; box-shadow:0 18px 50px -24px rgba(11,31,58,.35); overflow:hidden; }
        .cb-head{ display:flex; justify-content:space-between; align-items:center; padding:14px 28px; background:linear-gradient(180deg,#fff,#f7f4ec); border-bottom:1px solid ${palette.border}; font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:${palette.muted}; }
        .cb-head b{ color:${palette.navy}; }
        .cb-body{ padding:34px 40px 30px; }
        .cb-examiner{ display:flex; gap:16px; align-items:flex-start; }
        .cb-avatar{ flex:none; width:44px; height:44px; border-radius:50%; background:${palette.navy}; color:${palette.gold}; font-family:${serif}; font-size:18px; display:flex; align-items:center; justify-content:center; }
        .cb-label{ font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:${palette.gold}; font-weight:700; margin-bottom:6px; }
        .cb-question{ font-family:${serif}; font-size:28px; line-height:1.3; color:${palette.navy}; margin:0; }

        .cb-stage{ display:flex; align-items:center; gap:32px; margin:30px 0 6px; padding:24px 28px; border-radius:12px; background:${palette.paper}; border:1px solid ${palette.border}; }
        .cb-ring{ position:relative; width:112px; height:112px; flex:none; }
        .cb-ring svg{ transform:rotate(-90deg); }
        .cb-ring-num{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:${serif}; font-size:38px; font-weight:700; color:${palette.navy}; }
        .cb-ring-num.urgent{ color:${palette.danger}; }
        .cb-status{ display:flex; align-items:center; gap:10px; font-weight:700; color:${palette.navy}; font-size:15px; }
        .cb-dot{ width:10px; height:10px; border-radius:50%; background:${palette.danger}; animation:cbPulse 1.2s infinite; }
        .cb-dot.done{ background:${palette.success}; animation:none; }
        @keyframes cbPulse{ 0%{ box-shadow:0 0 0 0 rgba(179,55,47,.5);} 100%{ box-shadow:0 0 0 10px rgba(179,55,47,0);} }
        .cb-hint{ font-size:13px; color:${palette.muted}; margin-top:6px; line-height:1.5; }
        .cb-bar{ height:6px; background:#ebe7da; border-radius:999px; overflow:hidden; margin-top:14px; }
        .cb-bar-fill{ height:100%; background:linear-gradient(90deg,${palette.gold},${palette.navy}); transition:width 1s linear; }

        .cb-sub{ font-size:11px; letter-spacing:.2em; text-transform:uppercase; font-weight:700; color:${palette.muted}; margin:26px 0 10px; display:flex; justify-content:space-between; align-items:center; }
        .cb-chips{ display:flex; flex-wrap:wrap; gap:10px; }
        .cb-chip{ padding:8px 16px; border-radius:999px; border:1.5px dashed ${palette.gold}; background:${palette.goldSoft}; color:${palette.navy}; font-size:14px; font-weight:600; transition:all .25s ease; display:inline-flex; align-items:center; gap:6px; }
        .cb-chip.hit{ border:1.5px solid ${palette.success}; background:${palette.successSoft}; color:${palette.success}; transform:scale(1.06); box-shadow:0 4px 14px -6px rgba(19,121,91,.6); }
        .cb-score{ color:${palette.success}; letter-spacing:.08em; }

        .cb-transcript{ min-height:96px; padding:16px 18px; border:1px solid ${palette.border}; border-radius:10px; background:#fff; font-size:16px; line-height:1.75; color:#1f2937; }
        .cb-transcript.empty{ color:#9aa3b2; font-style:italic; }
        .cb-mark{ background:linear-gradient(transparent 40%, rgba(19,121,91,.28) 40%); color:${palette.success}; font-weight:700; border-radius:3px; padding:0 2px; }

        .cb-sample-toggle{ margin-top:22px; padding:9px 18px; border-radius:999px; border:1px solid ${palette.navy}; background:transparent; color:${palette.navy}; font-size:12px; font-weight:700; letter-spacing:.08em; cursor:pointer; }
        .cb-sample-toggle:hover{ background:${palette.navy}; color:#fff; }
        .cb-sample{ margin-top:12px; padding:16px 20px; background:${palette.goldSoft}; border-left:4px solid ${palette.gold}; border-radius:6px; font-size:15px; line-height:1.65; color:#2a2a2a; }

        .cb-foot{ display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; padding:16px 28px; border-top:1px solid ${palette.border}; background:#fbfaf6; }
        .cb-btn{ font-weight:700; font-size:12px; letter-spacing:.12em; text-transform:uppercase; padding:11px 22px; border-radius:8px; cursor:pointer; border:1px solid transparent; text-decoration:none; display:inline-block; transition:transform .15s ease, box-shadow .15s ease; }
        .cb-btn:hover{ transform:translateY(-1px); }
        .cb-btn.primary{ background:${palette.navy}; color:#fff; box-shadow:0 8px 18px -10px rgba(11,31,58,.8); }
        .cb-btn.ghost{ background:#fff; color:${palette.navy}; border-color:${palette.border}; }
        .cb-btn.gold{ background:${palette.gold}; color:${palette.navy}; }
        .cb-note{ font-size:12px; color:${palette.muted}; margin-top:18px; }
        .cb-warn{ margin-top:14px; padding:10px 14px; border-radius:8px; background:#fdecea; color:${palette.danger}; font-size:13px; }
        @media (max-width:640px){
          .cb-body{ padding:24px 20px; } .cb-question{ font-size:22px; } .cb-stage{ flex-direction:column; text-align:center; gap:18px; }
          .cb-status{ justify-content:center; } .cb-head{ padding:12px 18px; }
        }
      `}</style>

      <div className="cb-top">
        <div className="cb-top-title">
          <img src={logoUrl} alt="MyEnglishBro logo" style={{ height: 26, width: "auto" }} />
          <span>Speaking <small>Part 1 · Interview</small></span>
        </div>
        <div style={{ fontSize: 12, letterSpacing: ".14em", color: palette.gold }}>B2 FIRST</div>
      </div>

      <div className="cb-shell">
        <div className="cb-head">
          <span>Question <b>{questionIndex + 1}</b> / {questions.length}</span>
          <span>Time to answer: <b>{ANSWER_TIME} seconds</b></span>
        </div>

        <div className="cb-body">
          <div className="cb-examiner">
            <div className="cb-avatar">E</div>
            <div>
              <div className="cb-label">Examiner</div>
              <h2 className="cb-question">{q?.prompt}</h2>
            </div>
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
              <div className={`cb-ring-num ${urgent ? "urgent" : ""}`}>{timer}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="cb-status">
                <span className={`cb-dot ${step === "finished" ? "done" : ""}`} />
                {step === "reading" ? "The examiner is asking…" : step === "answer" ? "Listening… speak now" : "Time is up"}
              </div>
              <div className="cb-hint">
                {step === "reading"
                  ? "Listen to the question. Your 15 seconds start right after."
                  : step === "answer"
                  ? "Answer in 2–3 sentences. Recommended words light up as you say them."
                  : `You used ${usedVerbs.length} of ${verbs.length} recommended words. Compare with the sample answer below.`}
              </div>
              <div className="cb-bar"><div className="cb-bar-fill" style={{ width: progressPct + "%" }} /></div>
            </div>
          </div>
          {micError && (
            <div className="cb-warn">
              Microphone or speech recognition is not available. Allow mic access or try Chrome / Edge.
            </div>
          )}

          {verbs.length > 0 && (
            <>
              <div className="cb-sub">
                <span>Recommended words</span>
                <span className="cb-score">{usedVerbs.length} / {verbs.length}</span>
              </div>
              <div className="cb-chips">
                {verbs.map((verb) => {
                  const hit = usedVerbs.includes(verb);
                  return (
                    <span key={verb} className={`cb-chip ${hit ? "hit" : ""}`}>
                      {hit && <span aria-hidden="true">✓</span>}
                      {verb}
                    </span>
                  );
                })}
              </div>
            </>
          )}

          <div className="cb-sub"><span>Your answer</span></div>
          <div className={`cb-transcript ${transcript ? "" : "empty"}`}>
            {transcript
              ? words.map((w, i) =>
                  verbs.some((v) => matchesVerb(w, v)) && w.trim()
                    ? <span key={i} className="cb-mark">{w}</span>
                    : <React.Fragment key={i}>{w}</React.Fragment>
                )
              : "Your speech will appear here."}
          </div>

          {q?.model_answer_b2 && (
            <>
              <button type="button" className="cb-sample-toggle" onClick={() => setShowSample((v) => !v)}>
                {showSample ? "HIDE SAMPLE ANSWER" : "SHOW SAMPLE ANSWER"}
              </button>
              {showSample && (
                <div className="cb-sample">
                  <div className="cb-label">Sample answer · B2</div>
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
