import React, { useState, useEffect, useRef } from "react";
import levelsData from "./data/cayetanoQuestions.json";

const DEFAULT_PREP_TIME = 60;
const DEFAULT_ANSWER_TIME = 90;
const PAUSE_THRESHOLD_MS = 2000;
const palette = {
  navy: "#0f1f30",
  deepBlue: "#2b4157",
  gold: "#f2b76b",
  sky: "#e6eef7",
  porcelain: "#fdfbf7",
  surfaceAlt: "#ffffff",
  border: "#e5e9f0",
  muted: "#43556b",
  accent: "#2bb6a8",
  success: "#138a63",
  danger: "#d14343"
};
const serif = "var(--font-grotesk), 'Sora', 'Arial', sans-serif";
const sans = "var(--font-sora), 'Sora', 'Arial', sans-serif";
const logoUrl = "https://idiomas.cayetano.edu.pe/wp-content/uploads/sites/14/2023/06/logo-idiomas-240x99.png";
const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@myenglishbro" },
  { label: "TikTok", href: "https://www.tiktok.com/@myenglishbro" },
  { label: "Instagram", href: "https://www.instagram.com/myenglishbro" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/myenglishbro" }
];

const Watermark = () => (
  <img
    src={logoUrl}
    alt=""
    aria-hidden="true"
    className="pointer-events-none select-none absolute -right-10 -bottom-6 w-[260px] md:w-[360px]"
    style={{ opacity: 0.05, filter: "grayscale(1)" }}
  />
);

const FooterBrand = () => (
  <div className="w-full mt-8 pb-6 flex flex-col items-center gap-4">
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]" style={{ color: palette.muted }}>
      <span>Powered by</span>
      <img src={logoUrl} alt="MyEnglishBro logo" className="h-6 w-auto" />
    </div>
    <div className="flex flex-wrap items-center justify-center gap-2">
      {socialLinks.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full text-xs font-semibold"
          style={{
            color: palette.navy,
            border: `1px solid ${palette.border}`,
            background: palette.surfaceAlt
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
);

export default function SpeakingCayetano() {
  const [step, setStep] = useState("prep"); 
  const [timer, setTimer] = useState(DEFAULT_PREP_TIME);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const recognitionRef = useRef(null);
  const lastSpeechAtRef = useRef(0);
  const pauseActiveRef = useRef(false);

  const levels = levelsData.levels || [];
  const level = selectedLevel !== null ? levels[selectedLevel] : null;
  const questions = level?.questions || [];
  const prepTime = level?.prep_time ?? DEFAULT_PREP_TIME;
  const answerTime = level?.answer_time ?? DEFAULT_ANSWER_TIME;

  const totalThisPhase = step === "prep" ? prepTime : answerTime;
  const elapsed = step === "finished" ? totalThisPhase : totalThisPhase - timer;
  const progressPct = Math.min(100, Math.max(0, (elapsed / totalThisPhase) * 100));

  useEffect(() => {
    if (selectedLevel === null) return;
    if (step === "finished") return;
    if (timer === 0) {
      if (step === "prep") {
        setStep("answer");
        setTimer(answerTime);
        setStartTime(new Date());
        setEndTime(null);
        startRecognition();
      } else if (step === "answer") {
        setStep("finished");
        setEndTime(new Date());
        stopRecognition();
      }
      return;
    }
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, step, answerTime, selectedLevel]);

  useEffect(() => {
    if (step !== "answer") {
      setIsPaused(false);
      return undefined;
    }
    const tick = setInterval(() => {
      const since = Date.now() - lastSpeechAtRef.current;
      if (since > PAUSE_THRESHOLD_MS && !pauseActiveRef.current) {
        pauseActiveRef.current = true;
        setPauseCount(count => count + 1);
        setIsPaused(true);
      }
    }, 500);
    return () => clearInterval(tick);
  }, [step]);

  const startRecognition = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      lastSpeechAtRef.current = Date.now();
      pauseActiveRef.current = false;
      setIsPaused(false);
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    let finalTxt = "";
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalTxt += r[0].transcript + " ";
        else interim += r[0].transcript;
      }
      lastSpeechAtRef.current = Date.now();
      pauseActiveRef.current = false;
      setIsPaused(false);
      setTranscript(finalTxt + interim);
    };
    recognitionRef.current = rec;
    lastSpeechAtRef.current = Date.now();
    pauseActiveRef.current = false;
    setIsPaused(false);
    rec.start();
  };
  const stopRecognition = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsPaused(false);
  };

  const goNext = () => {
    stopRecognition();
    setTranscript("");
    setShowSample(false);
    setPauseCount(0);
    setIsPaused(false);
    setStartTime(null);
    setEndTime(null);
    setStep("prep");
    setTimer(prepTime);
    setQuestionIndex(i => (i < questions.length - 1 ? i + 1 : 0));
  };
  const goBack = () => {
    stopRecognition();
    setTranscript("");
    setShowSample(false);
    setPauseCount(0);
    setIsPaused(false);
    setStartTime(null);
    setEndTime(null);
    setStep("prep");
    setTimer(prepTime);
    setQuestionIndex(i => (i > 0 ? i - 1 : questions.length - 1));
  };
  const backToLevels = () => {
    stopRecognition();
    setTranscript("");
    setShowSample(false);
    setPauseCount(0);
    setIsPaused(false);
    setStartTime(null);
    setEndTime(null);
    setStep("prep");
    setTimer(DEFAULT_PREP_TIME);
    setQuestionIndex(0);
    setSelectedLevel(null);
  };

  const q = questions[questionIndex];
  const rawVideoUrl = level?.video || "";
  const normalizeVideoUrl = (input) => {
    if (!input) return "";
    if (input.includes("youtube.com/watch")) {
      const match = input.match(/[?&]v=([^&]+)/);
      if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}`;
    }
    if (input.includes("youtu.be/")) {
      const match = input.match(/youtu\.be\/([^?&]+)/);
      if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}`;
    }
    if (input.includes("drive.google.com")) {
      const match = input.match(/drive\.google\.com\/file\/d\/([^/]+)/);
      if (match?.[1]) return `https://drive.google.com/file/d/${match[1]}/preview`;
      if (input.includes("/preview")) return input;
      return input.replace("/view", "/preview");
    }
    return input;
  };
  const embedVideoUrl = normalizeVideoUrl(rawVideoUrl);
  const transcriptLower = transcript.toLowerCase();
  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  const formatTime = (value) =>
    value
      ? value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      : "--:--:--";
  const verbChecks = (q?.useful_verbs || []).map((verb) => {
    const token = verb.toLowerCase().trim();
    return {
      verb,
      used: token && transcriptLower.includes(token)
    };
  });

  if (selectedLevel === null) {
    return (
      <div
        className="min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4 py-12"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(43,182,168,0.18), transparent 40%), linear-gradient(150deg, #f6f2eb 0%, #eef3f8 55%, #f7f2ea 100%)",
          fontFamily: sans,
          userSelect: "none"
        }}
        onCopy={(event) => event.preventDefault()}
        onCut={(event) => event.preventDefault()}
        onContextMenu={(event) => event.preventDefault()}
      >
        <Watermark />
        <div
          className="w-full max-w-5xl rounded-[32px] p-8 md:p-12 space-y-8 shadow-2xl"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.98))",
            border: `1px solid ${palette.border}`,
            boxShadow: "0 35px 90px rgba(12,19,42,0.12)"
          }}
        >
          <div className="space-y-3">
            <img
              src={logoUrl}
              alt="MyEnglishBro logo"
              className="h-10 md:h-12 w-auto"
              style={{ filter: "drop-shadow(0 8px 18px rgba(12,19,42,0.12))" }}
            />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: palette.accent }}>
              Speaking Cayetano
            </p>
            <h1
              className="text-3xl md:text-5xl font-semibold leading-tight"
              style={{ color: palette.navy, fontFamily: serif }}
            >
              Levels & Prompts
            </h1>
            <p className="text-base md:text-lg" style={{ color: palette.muted }}>
              Choose a level to start. Each level includes 6 prompts with prep/answer timing.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {levels.map((lvl, idx) => (
              <button
                key={lvl.id || idx}
                onClick={() => {
                  setSelectedLevel(idx);
                  setQuestionIndex(0);
                  setTranscript("");
                  setShowSample(false);
                  setPauseCount(0);
                  setIsPaused(false);
                  setStartTime(null);
                  setEndTime(null);
                  setStep("prep");
                  setTimer(lvl?.prep_time ?? DEFAULT_PREP_TIME);
                }}
                className="px-6 py-4 rounded-2xl text-lg font-semibold transition hover:-translate-y-1"
                style={{
                  background: palette.surfaceAlt,
                  color: palette.navy,
                  border: `1px solid ${palette.border}`,
                  boxShadow: "0 10px 24px rgba(12,19,42,0.1)"
                }}
              >
                {lvl.title || `Nivel ${idx + 1}`}
              </button>
            ))}
          </div>
          <FooterBrand />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, rgba(43,182,168,0.18), transparent 40%), linear-gradient(150deg, #f6f2eb 0%, #eef3f8 55%, #f7f2ea 100%)",
        fontFamily: sans,
        userSelect: "none"
      }}
      onCopy={(event) => event.preventDefault()}
      onCut={(event) => event.preventDefault()}
      onContextMenu={(event) => event.preventDefault()}
    >
      <Watermark />
      <style>{`
        :root{
          --celp-blue:${palette.navy};
          --celp-blue2:${palette.accent};
          --celp-gray:${palette.sky};
          --celp-border:${palette.border};
          --celp-text:${palette.navy};
          --celp-muted:${palette.muted};
          --celp-red:${palette.danger};
          --celp-red-border:${palette.danger};
          --next-top:${palette.navy}; --next-bot:${palette.deepBlue};
        }
        .sysfont{ font-family:${sans}; }

        .topbar{ height:52px; background:#fff; border-bottom:1px solid #e5e7eb; }

        .celp-shell{ max-width:940px; margin:22px auto; background:#fff; border:1px solid #d9d9d9; border-radius:6px; box-shadow:0 1px 0 rgba(0,0,0,.02); }
        .celp-header{ display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-bottom:1px solid #e6e6e6; color:#4a4a4a; font-size:14px; }
        .celp-title{ font-weight:600; }
        .celp-primary{ color:var(--celp-blue); }
        .celp-metrics{ color:#6b7280; display:flex; align-items:center; gap:10px; }
        .celp-body{ padding:16px; }
        .celp-prompt{ display:block; color:#1f2937; font-weight:600; font-size:16px; margin:6px 0 10px; }
        .celp-centerWrap{ display:flex; justify-content:center; }
        .celp-panel{ margin:16px 0 0; width:460px; max-width:92%; background:var(--celp-gray); border-radius:12px; padding:18px 16px; border:1px solid var(--celp-border); box-shadow: inset 0 1px 0 rgba(255,255,255,.7); }
        .celp-row{ display:flex; align-items:center; gap:12px; }
        .celp-iconbox{ width:42px;height:42px;border-radius:6px;background:#dfe3e8;display:flex;align-items:center;justify-content:center;border:1px solid #cfd6de; }
        .celp-bigtime{ margin-left:auto; font-size:28px; font-weight:700; color:var(--celp-text); }
        .celp-bar{ height:14px; background:#d8dee6; border-radius:6px; overflow:hidden; border:1px solid #cbd5df; }
        .celp-bar-fill{ height:100%; background:var(--celp-blue2); transition:width .3s ease-in-out; }
        .celp-note{ color:var(--celp-muted); font-size:12px; margin-top:10px; }
        .celp-verbwrap{ margin-top:10px; }
        .celp-subtitle{ font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:var(--celp-muted); margin-bottom:6px; }
        .celp-chips{ display:flex; flex-wrap:wrap; gap:8px; }
        .celp-chip{ padding:6px 10px; border-radius:999px; background:rgba(43,182,168,0.12); color:var(--celp-blue); border:1px solid rgba(43,182,168,0.35); font-size:12px; font-weight:600; }
        .celp-sample{ margin-top:12px; padding:12px 14px; background:var(--celp-gray); border-radius:10px; border:1px solid var(--celp-border); }
        .celp-sample-text{ margin:0; color:#1f2937; font-size:14px; line-height:1.5; }
        .celp-sample-toggle{ margin-top:10px; padding:6px 12px; border-radius:999px; border:1px solid var(--celp-blue); background:transparent; color:var(--celp-blue); font-size:12px; font-weight:700; cursor:pointer; }
        .celp-footer{ display:flex; justify-content:flex-end; padding:10px 14px; border-top:1px solid #e6e6e6; }

        .btn{ font-weight:700; font-size:13px; padding:7px 14px; border-radius:4px; cursor:pointer; user-select:none; }
        .btn-next{
          color:#fff; text-shadow:0 -1px 0 rgba(0,0,0,0.25);
          background-color:#006dcc;
          background-image:linear-gradient(to bottom,var(--next-top),var(--next-bot));
          border-color:#0044cc #0044cc #002a80;
        }
        .btn-back{
          color:#fff; text-transform:uppercase; text-shadow:0 -1px 0 rgba(0,0,0,0.25);
          background-color:var(--celp-red);
          background-image:linear-gradient(to bottom,var(--celp-red),var(--celp-red));
          border-color:var(--celp-red-border);
          border-radius:0 !important;
        }
        .actions-centered{ display:flex; justify-content:center; align-items:center; gap:10px; margin-top:10px; flex-wrap:wrap; }
        .textarea{ width:100%; min-height:120px; border:1px solid #cfd6de; border-radius:6px; padding:10px 12px; font-size:14px; color:#111827; background:#fff; outline:none; }
      `}</style>

      {/* Empty top bar */}
      <div className="topbar" />

      {/* Caja principal */}
      <div className="celp-shell sysfont">
        {/* Header con NEXT */}
        <div className="celp-header">
          <div className="celp-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={logoUrl}
              alt="MyEnglishBro logo"
              style={{ height: 24, width: "auto" }}
            />
            <span>
              <span className="celp-primary">Speaking Cayetano</span> - Level {selectedLevel + 1}
            </span>
          </div>
          <div className="celp-metrics">
            <span>Warm-up: <b>{prepTime} seconds</b></span>
            <span>Response: <b>{answerTime} seconds</b></span>
            <button className="btn btn-next" onClick={goNext}>NEXT</button>
          </div>
        </div>

        {/* Body */}
        <div className="celp-body">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="celp-prompt celp-primary">
                {q?.prompt || "Prompt not set yet."}
              </span>
              {q?.useful_verbs?.length > 0 && (
                <div className="celp-verbwrap">
                  <div className="celp-subtitle">Useful verbs</div>
                  <div className="celp-chips">
                    {verbChecks.map((item) => (
                      <span
                        key={item.verb}
                        className="celp-chip"
                        style={{
                          background: item.used ? "rgba(19,138,99,0.16)" : "rgba(43,182,168,0.12)",
                          color: item.used ? palette.success : "var(--celp-blue)",
                          borderColor: item.used ? "rgba(19,138,99,0.45)" : "rgba(43,182,168,0.35)"
                        }}
                      >
                        {item.used ? "OK " : ""}{item.verb}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="celp-subtitle">Video</div>
              <div className="mt-3 rounded-xl overflow-hidden border" style={{ borderColor: palette.border }}>
                {embedVideoUrl ? (
                  <iframe
                    title={`Speaking video level ${selectedLevel + 1}`}
                    src={embedVideoUrl}
                    className="w-full h-[220px] md:h-[260px]"
                    allow="autoplay; fullscreen"
                  />
                ) : (
                  <div className="h-[220px] md:h-[260px] flex items-center justify-center text-sm" style={{ color: palette.muted }}>
                    No video set for this level.
                  </div>
                )}
              </div>
            </div>
          </div>

          {q?.model_answer_b2 && (
            <div className="celp-verbwrap">
              <button
                type="button"
                className="celp-sample-toggle"
                onClick={() => setShowSample((value) => !value)}
              >
                {showSample ? "Hide sample answer" : "Show sample answer"}
              </button>
              {showSample && (
                <div className="celp-sample">
                  <div className="celp-subtitle">Sample answer (B2)</div>
                  <p className="celp-sample-text">{q.model_answer_b2}</p>
                </div>
              )}
            </div>
          )}

          <div className="celp-centerWrap">
            {step === "prep" && (
              <div className="celp-panel">
                <div className="celp-row">
                  <div className="celp-iconbox">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#6b7280">
                      <path d="M12 1.75a10.25 10.25 0 1 0 0 20.5 10.25 10.25 0 0 0 0-20.5Zm0 18.5a8.25 8.25 0 1 1 0-16.5 8.25 8.25 0 0 1 0 16.5Z"/>
                      <path d="M12.75 7.5a.75.75 0 0 0-1.5 0v5.05c0 .2.08.39.22.53l3.25 3.25a.75.75 0 1 0 1.06-1.06l-3.03-3.03V7.5Z"/>
                    </svg>
                  </div>
                  <div className="text-[#374151] font-semibold">Preparation Time</div>
                  <div className="celp-bigtime">{timer}</div>
                </div>
              </div>
            )}

            {step === "answer" && (
              <div className="celp-panel">
                <div className="celp-row" style={{ marginBottom: 10 }}>
                  <div className="celp-iconbox">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#6b7280">
                      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z"/>
                      <path d="M5 11a1 1 0 1 0-2 0 9 9 0 0 0 8 8.94V22H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-2.06A9 9 0 0 0 21 11a1 1 0 1 0-2 0 7 7 0 1 1-14 0Z"/>
                    </svg>
                  </div>
                  <div className="text-[#374151] font-semibold">Recording</div>
                </div>
                <div className="celp-bar">
                  <div className="celp-bar-fill" style={{ width: progressPct + "%" }} />
                </div>
              </div>
            )}

            {step === "finished" && (
              <div className="celp-panel">
                <div className="text-[#374151] font-semibold mb-2">Finished</div>
                <div className="text-sm text-[#4b5563]">Your recording time has ended. Review your transcript below.</div>
              </div>
            )}
          </div>

          <div className="celp-note">*Note: This practice prompt does not record audio.</div>
          <div className="mt-2 text-xs" style={{ color: palette.muted }}>
            Start: {formatTime(startTime)} | End: {formatTime(endTime)}
          </div>

          {step !== "prep" && (
            <div className="mt-4" style={{ maxWidth: 720, margin: "0 auto" }}>
              <label className="block text-sm" style={{ color: "var(--celp-blue)", fontWeight: 600, marginBottom: 4 }}>
                Your answer (auto-transcribed)
              </label>
              <textarea className="textarea" value={transcript} readOnly placeholder="Your speech will appear here." />
              <div className="mt-2 text-xs" style={{ color: palette.muted }}>
                Words: {wordCount} | Pauses: {pauseCount} {isPaused ? "(paused)" : ""}
              </div>
              <div className="actions-centered">
                <button
                  className="btn btn-back"
                  onClick={() => {
                    const code = window.prompt("Enter code to copy");
                    if (code !== "cayetanoy") return;
                    navigator.clipboard.writeText(transcript || "");
                  }}
                >
                  COPY TRANSCRIPTION
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="celp-footer">
          <button className="btn btn-back" onClick={backToLevels}>LEVELS</button>
          <div style={{ flex: 1 }} />
          <button className="btn btn-back" onClick={goBack}>BACK</button>
        </div>
        <FooterBrand />
      </div>
    </div>
  );
}

