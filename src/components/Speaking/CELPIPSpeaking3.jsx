import React, { useState, useEffect, useRef } from "react";
import questions from "./data/celpipQuestion3.json";

const PREP_TIME = 30;
const ANSWER_TIME = 60;
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
  const recognitionRef = useRef(null);

  // Imagen: estados de carga / error
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const q = questions[questionIndex];
  const driveMatch = q?.image?.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  const driveIframeSrc = driveMatch ? `https://drive.google.com/file/d/${driveMatch[1]}/preview` : null;
  const useIframe = Boolean(driveIframeSrc || q?.image?.includes("/preview"));

  const totalThisPhase = step === "prep" ? PREP_TIME : ANSWER_TIME;
  const elapsed = step === "finished" ? totalThisPhase : totalThisPhase - timer;
  const progressPct = Math.min(100, Math.max(0, (elapsed / totalThisPhase) * 100));

  // Reinicia loader de imagen cuando cambie de pregunta
  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [questionIndex]);

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

  const resetForNewQuestion = () => {
    stopRecognition();
    setTranscript("");
    setStep("prep");
    setTimer(PREP_TIME);
  };

  const goNext = () => {
    resetForNewQuestion();
    setQuestionIndex(i => (i < questions.length - 1 ? i + 1 : 0));
  };
  const goBack = () => {
    resetForNewQuestion();
    setQuestionIndex(i => (i > 0 ? i - 1 : questions.length - 1));
  };

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
          --celpip-blue:${palette.navy};
          --celpip-blue2:${palette.accent};
          --celpip-gray:${palette.sky};
          --celpip-border:${palette.border};
          --celpip-text:${palette.navy};
          --celpip-muted:${palette.muted};
          --celpip-red:${palette.danger};
          --celpip-red-border:${palette.danger};
          --next-top:${palette.navy}; --next-bot:${palette.deepBlue};
        }
        .sysfont{ font-family:${sans}; }

        .topbar{ height:52px; background:#fff; border-bottom:1px solid #e5e7eb; }

        .celp-shell{ max-width:940px; margin:22px auto; background:#fff; border:1px solid #d9d9d9; border-radius:6px; box-shadow:0 1px 0 rgba(0,0,0,.02); }
        .celp-header{ display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-bottom:1px solid #e6e6e6; color:#4a4a4a; font-size:14px; }
        .celp-title{ font-weight:600; }
        .celp-primary{ color:var(--celpip-blue); }
        .celp-metrics{ color:#6b7280; display:flex; align-items:center; gap:10px; }
        .celp-body{ padding:16px; }
        .celp-prompt{ display:block; color:#1f2937; font-weight:600; font-size:16px; margin:6px 0 10px; }
        .celp-centerWrap{ display:flex; justify-content:center; }
        .celp-panel{ margin:16px 0 0; width:460px; max-width:92%; background:var(--celpip-gray); border-radius:12px; padding:18px 16px; border:1px solid var(--celpip-border); box-shadow: inset 0 1px 0 rgba(255,255,255,.7); }
        .celp-row{ display:flex; align-items:center; gap:12px; }
        .celp-iconbox{ width:42px;height:42px;border-radius:6px;background:#dfe3e8;display:flex;align-items:center;justify-content:center;border:1px solid #cfd6de; }
        .celp-bigtime{ margin-left:auto; font-size:28px; font-weight:700; color:var(--celpip-text); }
        .celp-bar{ height:14px; background:#d8dee6; border-radius:6px; overflow:hidden; border:1px solid #cbd5df; }
        .celp-bar-fill{ height:100%; background:var(--celpip-blue2); transition:width .3s ease-in-out; }
        .celp-note{ color:var(--celpip-muted); font-size:12px; margin-top:10px; }

        .celp-footer{ display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-top:1px solid #e6e6e6; }

        .btn{ font-weight:700; font-size:13px; padding:7px 14px; border-radius:4px; cursor:pointer; user-select:none; border:1px solid transparent; }
        .btn-next{
          color:#fff; text-shadow:0 -1px 0 rgba(0,0,0,0.25);
          background-color:#006dcc;
          background-image:linear-gradient(to bottom,var(--next-top),var(--next-bot));
          border-color:#0044cc #0044cc #002a80;
        }
        .btn-back{
          color:#fff; text-transform:uppercase; text-shadow:0 -1px 0 rgba(0,0,0,0.25);
          background-color:var(--celpip-red);
          background-image:linear-gradient(to bottom,var(--celpip-red),var(--celpip-red));
          border-color:var(--celpip-red-border);
          border-radius:0 !important;
        }
        .actions-centered{ display:flex; justify-content:center; align-items:center; gap:10px; margin-top:10px; flex-wrap:wrap; }
        .textarea{ width:100%; min-height:120px; border:1px solid #cfd6de; border-radius:6px; padding:10px 12px; font-size:14px; color:#111827; background:#fff; outline:none; }

        /* Visor de imagen */
        .image-card{ border:1px solid #e5e7eb; border-radius:8px; padding:10px; background:#fafbfc; }
        .ratio{ position:relative; width:100%; }
        .ratio-4x3{ padding-top:75%; } /* 4:3 */
        .ratio > .media{
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          background:#fff; overflow:hidden; border-radius:6px;
        }
        .task-img{
          max-width:100%; max-height:100%; object-fit:contain; display:block;
        }
        .task-iframe{
          width:100%; height:100%; border:0; pointer-events:none;
        }
        .iframe-cover{
          position:absolute; top:6px; right:6px; width:34px; height:34px;
          background:#fff; border-radius:8px; box-shadow:0 2px 6px rgba(15,31,48,0.12);
        }
        .skeleton{
          width:100%; height:100%; background:linear-gradient(90deg,#f3f4f6,#e5e7eb,#f3f4f6);
          background-size:200% 100%; animation:shimmer 1.2s infinite;
          border-radius:6px;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        .error-box{ font-size:13px; color:#b91c1c; background:#fee2e2; border:1px solid #fecaca; border-radius:6px; padding:8px; text-align:center; }
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
              <span className="celp-primary">Cambridge Speaking Part 2</span> - Describe the picture
            </span>
          </div>
          <div className="celp-metrics">
            <span>Preparation: <b>{PREP_TIME} seconds</b></span>
            <span>Recording: <b>{ANSWER_TIME} seconds</b></span>
            <button className="btn btn-next" onClick={goNext}>NEXT</button>
          </div>
        </div>

        {/* Body */}
        <div className="celp-body">
          <span className="celp-prompt celp-primary">
            {q?.prompt || "A friend is looking for a summer job. Advise him about different ways he can find work for the summer."}
          </span>

          {/* VISOR DE IMAGEN */}
          <div style={{ maxWidth: 820, margin: "0 auto 12px" }}>
            <div className="image-card">
              <div className="ratio ratio-4x3">
                <div className="media">
                  {/* Skeleton mientras carga */}
                  {!imgLoaded && !imgError && <div className="skeleton" aria-hidden="true" />}
                  {/* Imagen */}
                  {!imgError && !useIframe && (
                    <img
                      src={q?.image}
                      alt={`Task ${q?.id || questionIndex + 1} image`}
                      className="task-img"
                      loading="lazy"
                      style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity .25s ease" }}
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgError(true)}
                    />
                  )}
                  {!imgError && useIframe && (
                    <>
                      <iframe
                        title={`Task ${q?.id || questionIndex + 1} preview`}
                        src={driveIframeSrc || q?.image}
                        className="task-iframe"
                        allow="autoplay"
                        onLoad={() => setImgLoaded(true)}
                      />
                      <div className="iframe-cover" aria-hidden="true" />
                    </>
                  )}
                  {/* Fallback si falla */}
                  {imgError && (
                    <div className="error-box">
                      We couldn't load the image. Please check your connection or try another question.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

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
              <label className="block text-sm" style={{ color: "var(--celpip-blue)", fontWeight: 600, marginBottom: 4 }}>
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
          <div style={{ flex: 1 }} />
          <button className="btn btn-next" onClick={goNext}>NEXT</button>
        </div>
        <FooterBrand />
      </div>
    </div>
  );
}
