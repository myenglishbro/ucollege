import React, { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_TURN_TIME = 20;
const palette = {
  navy: "#0b1f3a",
  gold: "#c9a24b",
  goldSoft: "#f6ecd2",
  paper: "#faf8f3",
  surface: "#ffffff",
  border: "#e3dfd3",
  muted: "#5b6577",
  success: "#13795b",
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

// Image sources to try, in order. Drive links (/file/d/<id> or ?id=<id>) are turned into direct image URLs.
const imageSources = (url = "") => {
  const m = url.match(/\/file\/d\/([^/?]+)/) || url.match(/[?&]id=([^&]+)/);
  if (!m) return url ? [url] : [];
  return [
    `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1600`,
    `https://drive.google.com/uc?export=view&id=${m[1]}`
  ];
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

// Examiner and partner get different voices when the browser offers more than one English voice.
const pickVoice = (role) => {
  const voices = (window.speechSynthesis?.getVoices() || []).filter((v) => /^en/i.test(v.lang));
  if (voices.length === 0) return null;
  if (role === "partner") return voices[1] || voices[0];
  return voices[0];
};

// Shared engine for the simulated speaking conversations (Part 3 and Part 4).
// Turns: "examiner" and "partner" are read aloud by the computer, "you" is recorded.
export default function SpeakingConversation({ tasks, partLabel, headRight }) {
  const [taskIndex, setTaskIndex] = useState(0);
  // -1 = examiner intro, 0..n-1 = conversation turns, n = finished
  const [cursor, setCursor] = useState(-1);
  const [timer, setTimer] = useState(DEFAULT_TURN_TIME);
  const [answers, setAnswers] = useState({});
  const [live, setLive] = useState("");
  const [showHint, setShowHint] = useState({});
  const [micError, setMicError] = useState(false);
  const [imgTry, setImgTry] = useState(0);
  const recognitionRef = useRef(null);
  const activeRef = useRef(false);
  const finalRef = useRef("");
  const token = useRef(0);
  const endRef = useRef(null);

  const task = tasks[taskIndex];
  const heading = task.question || task.title || "";
  const conversation = task.conversation;
  const finished = cursor >= conversation.length;
  const turn = cursor >= 0 && !finished ? conversation[cursor] : null;
  const sources = imageSources(task.image);

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
      setLive(finalRef.current + interim);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        activeRef.current = false;
        setMicError(true);
      }
    };
    rec.onend = () => {
      if (activeRef.current) {
        try { rec.start(); } catch (err) { /* ignore */ }
      }
    };
    recognitionRef.current = rec;
    try { rec.start(); } catch (err) { /* ignore */ }
  }, []);

  const cancelSpeech = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  // Speaks `text` with the given role's voice and calls `done` once, even if speech is unavailable.
  const speak = useCallback((text, role, done) => {
    const my = token.current;
    const proceed = () => {
      if (token.current === my) done();
    };
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setTimeout(proceed, 600);
      return;
    }
    const u = new window.SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.95;
    u.pitch = role === "partner" ? 1.1 : 1;
    const voice = pickVoice(role);
    if (voice) u.voice = voice;
    u.onend = proceed;
    u.onerror = proceed;
    window.speechSynthesis.speak(u);
  }, []);

  const finishTurn = useCallback((index) => {
    stopRecognition();
    setAnswers((a) => ({ ...a, [index]: finalRef.current.trim() || a[index] || "" }));
    setLive("");
    setCursor(index + 1);
  }, [stopRecognition]);

  // Drives the conversation: examiner intro, then each turn in order.
  useEffect(() => {
    const my = ++token.current;
    cancelSpeech();
    if (cursor === -1) {
      speak(`${task.examiner_prompt} ${task.question || ""}`, "examiner", () => setCursor(0));
    } else if (turn?.speaker === "examiner") {
      speak(turn.text, "examiner", () => setCursor(cursor + 1));
    } else if (turn?.speaker === "partner") {
      speak(turn.text, "partner", () => setCursor(cursor + 1));
    } else if (turn?.speaker === "you") {
      setTimer(turn.time || DEFAULT_TURN_TIME);
      setLive("");
      startRecognition();
    }
    return () => {
      if (token.current === my) token.current++;
      cancelSpeech();
    };
  }, [taskIndex, cursor]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (turn?.speaker !== "you") return;
    if (timer === 0) {
      finishTurn(cursor);
      return;
    }
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, cursor, turn, finishTurn]);

  useEffect(() => () => {
    token.current++;
    cancelSpeech();
    stopRecognition();
  }, [stopRecognition]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [cursor, live]);

  const restart = (index = taskIndex) => {
    stopRecognition();
    cancelSpeech();
    token.current++;
    setAnswers({});
    setLive("");
    setShowHint({});
    setImgTry(0);
    setTaskIndex(index);
    setCursor(-1);
  };
  const goNext = () => restart(taskIndex < tasks.length - 1 ? taskIndex + 1 : 0);
  const goBack = () => restart(taskIndex > 0 ? taskIndex - 1 : tasks.length - 1);
  const skipIntro = () => {
    token.current++;
    cancelSpeech();
    setCursor(0);
  };

  const speaking = cursor === -1 || turn?.speaker === "partner";
  const userTurnTotal = turn?.speaker === "you" ? turn.time || DEFAULT_TURN_TIME : DEFAULT_TURN_TIME;
  const urgent = turn?.speaker === "you" && timer <= 5;
  const visible = conversation.slice(0, Math.min(cursor + 1, conversation.length));
  const statusText = finished
    ? "Conversation finished"
    : cursor === -1
    ? "The examiner is speaking…"
    : turn?.speaker === "examiner"
    ? "The examiner is asking…"
    : turn?.speaker === "partner"
    ? "Your partner is speaking…"
    : "Your turn — speak now";

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: palette.paper, fontFamily: sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');
        .p3-top{ background:${palette.navy}; color:#fff; height:56px; display:flex; align-items:center; justify-content:space-between; padding:0 24px; border-bottom:3px solid ${palette.gold}; }
        .p3-top-title{ font-family:${serif}; font-size:17px; display:flex; align-items:center; gap:12px; }
        .p3-top-title small{ font-family:${sans}; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:${palette.gold}; }
        .p3-shell{ max-width:980px; margin:32px auto; background:${palette.surface}; border:1px solid ${palette.border}; border-radius:14px; box-shadow:0 18px 50px -24px rgba(11,31,58,.35); overflow:hidden; }
        .p3-head{ display:flex; justify-content:space-between; align-items:center; padding:14px 28px; background:linear-gradient(180deg,#fff,#f7f4ec); border-bottom:1px solid ${palette.border}; font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:${palette.muted}; }
        .p3-head b{ color:${palette.navy}; }
        .p3-body{ padding:32px 40px 28px; }
        .p3-examiner{ display:flex; gap:16px; align-items:flex-start; }
        .p3-avatar{ flex:none; width:44px; height:44px; border-radius:50%; background:${palette.navy}; color:${palette.gold}; font-family:${serif}; font-size:18px; display:flex; align-items:center; justify-content:center; }
        .p3-label{ font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:${palette.gold}; font-weight:700; margin-bottom:6px; }
        .p3-question{ font-family:${serif}; font-size:24px; line-height:1.35; color:${palette.navy}; margin:0; }
        .p3-intro{ margin:8px 0 0; font-size:14px; line-height:1.6; color:${palette.muted}; }

        .p3-visual{ margin-top:24px; padding:10px; border:1px solid ${palette.border}; border-radius:12px; background:#f4f1e8; }
        .p3-visual img{ display:block; width:100%; max-height:520px; object-fit:contain; background:#fff; border-radius:8px; }
        .p3-options{ background:#fff; border-radius:8px; padding:26px 20px; text-align:center; }
        .p3-options-q{ font-family:${serif}; font-size:20px; color:${palette.navy}; margin:0 auto 18px; max-width:520px; line-height:1.35; }
        .p3-options-grid{ display:flex; flex-wrap:wrap; gap:10px; justify-content:center; }
        .p3-option{ padding:12px 18px; border:1.5px solid ${palette.navy}; border-radius:10px; font-weight:600; color:${palette.navy}; font-size:14px; background:#fff; }

        .p3-chat{ margin-top:24px; padding:18px; border:1px solid ${palette.border}; border-radius:12px; background:${palette.paper}; min-height:140px; max-height:440px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; }
        .p3-empty{ margin:auto; color:#9aa3b2; font-style:italic; font-size:14px; text-align:center; }
        .p3-row{ display:flex; gap:10px; align-items:flex-end; }
        .p3-row.you{ flex-direction:row-reverse; }
        .p3-mini{ flex:none; width:32px; height:32px; border-radius:50%; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; background:${palette.navy}; color:${palette.gold}; }
        .p3-row.you .p3-mini{ background:${palette.gold}; color:${palette.navy}; }
        .p3-bubble{ max-width:78%; padding:12px 16px; border-radius:16px; font-size:15px; line-height:1.6; background:#fff; border:1px solid ${palette.border}; color:#1f2937; border-bottom-left-radius:4px; }
        .p3-row.you .p3-bubble{ background:${palette.navy}; color:#fff; border-color:${palette.navy}; border-bottom-left-radius:16px; border-bottom-right-radius:4px; }
        .p3-bubble.ghost{ background:transparent; border-style:dashed; color:#9aa3b2; }
        .p3-row.you .p3-bubble.ghost{ background:transparent; color:${palette.muted}; border-color:${palette.gold}; }
        .p3-divider{ display:flex; align-items:center; gap:12px; font-size:11px; letter-spacing:.2em; text-transform:uppercase; font-weight:700; color:${palette.gold}; }
        .p3-divider::before,.p3-divider::after{ content:""; flex:1; height:1px; background:${palette.border}; }
        .p3-hintlink{ background:none; border:none; padding:0; margin-top:8px; font-size:12px; font-weight:700; letter-spacing:.06em; color:${palette.gold}; cursor:pointer; text-transform:uppercase; }
        .p3-hint{ margin-top:8px; padding:10px 12px; border-radius:8px; background:rgba(255,255,255,.1); font-size:14px; line-height:1.55; }

        .p3-bar{ display:flex; align-items:center; gap:18px; margin-top:16px; padding:14px 20px; border-radius:12px; background:#fff; border:1px solid ${palette.border}; }
        .p3-status{ display:flex; align-items:center; gap:10px; font-weight:700; color:${palette.navy}; font-size:15px; flex:1; }
        .p3-dot{ width:10px; height:10px; border-radius:50%; background:${palette.gold}; animation:p3Pulse 1.2s infinite; }
        .p3-dot.rec{ background:${palette.danger}; }
        .p3-dot.done{ background:${palette.success}; animation:none; }
        @keyframes p3Pulse{ 0%{ box-shadow:0 0 0 0 rgba(201,162,75,.55);} 100%{ box-shadow:0 0 0 10px rgba(201,162,75,0);} }
        .p3-time{ font-family:${serif}; font-size:26px; font-weight:700; color:${palette.navy}; font-variant-numeric:tabular-nums; min-width:44px; text-align:right; }
        .p3-time.urgent{ color:${palette.danger}; }
        .p3-prog{ height:5px; background:#ebe7da; border-radius:999px; overflow:hidden; margin-top:10px; }
        .p3-prog > div{ height:100%; background:linear-gradient(90deg,${palette.gold},${palette.navy}); transition:width 1s linear; }

        .p3-foot{ display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; padding:16px 28px; border-top:1px solid ${palette.border}; background:#fbfaf6; }
        .p3-btn{ font-weight:700; font-size:12px; letter-spacing:.12em; text-transform:uppercase; padding:11px 22px; border-radius:8px; cursor:pointer; border:1px solid transparent; text-decoration:none; display:inline-block; transition:transform .15s ease; }
        .p3-btn:hover{ transform:translateY(-1px); }
        .p3-btn.primary{ background:${palette.navy}; color:#fff; box-shadow:0 8px 18px -10px rgba(11,31,58,.8); }
        .p3-btn.ghost{ background:#fff; color:${palette.navy}; border-color:${palette.border}; }
        .p3-btn.gold{ background:${palette.gold}; color:${palette.navy}; }
        .p3-note{ font-size:12px; color:${palette.muted}; margin-top:16px; }
        .p3-warn{ margin-top:12px; padding:10px 14px; border-radius:8px; background:#fdecea; color:${palette.danger}; font-size:13px; }
        @media (max-width:640px){
          .p3-body{ padding:22px 16px; } .p3-question{ font-size:19px; } .p3-head{ padding:12px 18px; }
          .p3-bubble{ max-width:88%; } .p3-bar{ flex-wrap:wrap; }
        }
      `}</style>

      <div className="p3-top">
        <div className="p3-top-title">
          <img src={logoUrl} alt="MyEnglishBro logo" style={{ height: 26, width: "auto" }} />
          <span>Speaking <small>{partLabel}</small></span>
        </div>
        <div style={{ fontSize: 12, letterSpacing: ".14em", color: palette.gold }}>B2 FIRST</div>
      </div>

      <div className="p3-shell">
        <div className="p3-head">
          <span>Task <b>{taskIndex + 1}</b> / {tasks.length}</span>
          <span>{headRight}</span>
        </div>

        <div className="p3-body">
          <div className="p3-examiner">
            <div className="p3-avatar">E</div>
            <div>
              <div className="p3-label">Examiner</div>
              <h2 className="p3-question">{heading}</h2>
              {task.question && <p className="p3-intro">{task.examiner_prompt}</p>}
            </div>
          </div>

          {(sources.length > 0 || (task.options || []).length > 0) && (
          <div className="p3-visual">
            {sources.length > 0 && imgTry < sources.length ? (
              <img
                key={sources[imgTry]}
                src={sources[imgTry]}
                alt={task.question}
                onError={() => setImgTry((n) => n + 1)}
              />
            ) : (
              <div className="p3-options">
                <p className="p3-options-q">{task.question}</p>
                <div className="p3-options-grid">
                  {(task.options || []).map((o) => (
                    <span className="p3-option" key={o}>{o}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          )}

          <div className="p3-chat">
            {visible.length === 0 && (
              <div className="p3-empty">The conversation will appear here once the examiner finishes.</div>
            )}
            {visible.map((item, i) => {
              const isYou = item.speaker === "you";
              const isExaminer = item.speaker === "examiner";
              const text = isYou ? (i === cursor ? live : answers[i]) : item.text;
              return (
                <React.Fragment key={i}>
                  {item.stage === "decision" && (
                    <div className="p3-divider">Decision · {task.decision_prompt}</div>
                  )}
                  <div className={`p3-row ${isYou ? "you" : ""}`}>
                    <div className="p3-mini">{isYou ? "You" : isExaminer ? "E" : "P"}</div>
                    <div>
                      <div className={`p3-bubble ${isYou && !text ? "ghost" : ""}`}>
                        {text || (isYou ? (i === cursor ? "Listening…" : "(no answer recorded)") : "")}
                      </div>
                      {isYou && item.suggested && (
                        <>
                          <button
                            type="button"
                            className="p3-hintlink"
                            onClick={() => setShowHint((h) => ({ ...h, [i]: !h[i] }))}
                          >
                            {showHint[i] ? "Hide suggested reply" : "Show suggested reply"}
                          </button>
                          {showHint[i] && (
                            <div className="p3-hint" style={{ color: palette.navy, background: palette.goldSoft }}>
                              {item.suggested}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={endRef} />
          </div>

          <div className="p3-bar">
            <div className="p3-status">
              <span className={`p3-dot ${finished ? "done" : turn?.speaker === "you" ? "rec" : ""}`} />
              {statusText}
            </div>
            {turn?.speaker === "you" && (
              <>
                <div className={`p3-time ${urgent ? "urgent" : ""}`}>{timer}s</div>
                <button className="p3-btn primary" onClick={() => finishTurn(cursor)}>I'm done →</button>
              </>
            )}
            {cursor === -1 && <button className="p3-btn ghost" onClick={skipIntro}>Skip audio</button>}
          </div>
          {turn?.speaker === "you" && (
            <div className="p3-prog"><div style={{ width: ((userTurnTotal - timer) / userTurnTotal) * 100 + "%" }} /></div>
          )}
          {micError && (
            <div className="p3-warn">
              Microphone or speech recognition is not available. Allow mic access or try Chrome / Edge.
            </div>
          )}
          <div className="p3-note">*Note: This practice does not record audio. The examiner's and partner's lines are pre-written and read aloud by the computer.</div>
        </div>

        <div className="p3-foot">
          <button className="p3-btn ghost" onClick={goBack}>← Back</button>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="p3-btn ghost" onClick={() => restart()}>Try again</button>
            {finished && (
              <button
                className="p3-btn gold"
                onClick={() =>
                  navigator.clipboard.writeText(
                    conversation.map((c, i) => (c.speaker === "you" ? `You: ${answers[i] || ""}` : `${c.speaker === "examiner" ? "Examiner" : "Partner"}: ${c.text}`)).join("\n")
                  )
                }
              >
                Copy conversation
              </button>
            )}
            <button className="p3-btn primary" onClick={goNext}>Next →</button>
          </div>
        </div>
        <FooterBrand />
      </div>
    </div>
  );
}
