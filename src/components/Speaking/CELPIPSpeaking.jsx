import React, { useState, useEffect, useRef } from "react";
import questions from "./data/celpipQuestion.json";

const PREP_TIME = 30;
const ANSWER_TIME = 90;
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
const logoUrl = "https://i.ibb.co/C3kRtYQG/zxczx-2-1.png";
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

export default function CELPIPSpeakingClassicUI() {
  const [step, setStep] = useState("prep"); 
  const [timer, setTimer] = useState(PREP_TIME);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [showSample, setShowSample] = useState(false);
  const recognitionRef = useRef(null);

  const totalThisPhase = step === "prep" ? PREP_TIME : ANSWER_TIME;
  const elapsed = step === "finished" ? totalThisPhase : totalThisPhase - timer;
  const progressPct = Math.min(100, Math.max(0, (elapsed / totalThisPhase) * 100));

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
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, step]);

  const startRecognition = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
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
      setTranscript(finalTxt + interim);
    };
    recognitionRef.current = rec;
    rec.start();
  };
  const stopRecognition = () => recognitionRef.current && recognitionRef.current.stop();

  const goNext = () => {
    stopRecognition();
    setTranscript("");
    setShowSample(false);
    setStep("prep");
    setTimer(PREP_TIME);
    setQuestionIndex(i => (i < questions.length - 1 ? i + 1 : 0));
  };
  const goBack = () => {
    stopRecognition();
    setTranscript("");
    setShowSample(false);
    setStep("prep");
    setTimer(PREP_TIME);
    setQuestionIndex(i => (i > 0 ? i - 1 : questions.length - 1));
  };

  const q = questions[questionIndex];

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, rgba(43,182,168,0.18), transparent 40%), linear-gradient(150deg, #f6f2eb 0%, #eef3f8 55%, #f7f2ea 100%)",
        fontFamily: sans
      }}
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
              <span className="celp-primary">Cambridge Speaking Part 1</span> - Interview
            </span>
          </div>
          <div className="celp-metrics">
            <span>Warm-up: <b>{PREP_TIME} seconds</b></span>
            <span>Response: <b>{ANSWER_TIME} seconds</b></span>
            <button className="btn btn-next" onClick={goNext}>NEXT</button>
          </div>
        </div>

        {/* Body */}
        <div className="celp-body">
          <span className="celp-prompt celp-primary">
            {q?.prompt || "Tell me about your hometown. What do you like most about it?"}
          </span>
          {q?.useful_verbs?.length > 0 && (
            <div className="celp-verbwrap">
              <div className="celp-subtitle">Useful verbs</div>
              <div className="celp-chips">
                {q.useful_verbs.map((verb) => (
                  <span key={verb} className="celp-chip">{verb}</span>
                ))}
              </div>
            </div>
          )}

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
                <div className="text-sm text-[#4b5563]">Your recording time has ended. You can copy or share your auto-transcription below.</div>
              </div>
            )}
          </div>

          <div className="celp-note">*Note: This practice prompt does not record audio.</div>

          {step !== "prep" && (
            <div className="mt-4" style={{ maxWidth: 720, margin: "0 auto" }}>
              <label className="block text-sm" style={{ color: "var(--celp-blue)", fontWeight: 600, marginBottom: 4 }}>
                Your answer (auto-transcribed)
              </label>
              <textarea className="textarea" value={transcript} readOnly placeholder="Your speech will appear here." />
              <div className="actions-centered">
                <button className="btn btn-back" onClick={() => navigator.clipboard.writeText(transcript || "")}>
                  COPY TRANSCRIPTION
                </button>
                <a className="btn btn-back" href={`https://wa.me/?text=${encodeURIComponent(transcript)}`} target="_blank" rel="noreferrer">
                  SEND VIA WHATSAPP
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="celp-footer">
          <button className="btn btn-back" onClick={goBack}>BACK</button>
        </div>
        <FooterBrand />
      </div>
    </div>
  );
}



