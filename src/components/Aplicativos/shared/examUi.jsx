import React from "react";

// Shared Cambridge-style exam chrome used by the Use of English apps (/uoepart1 to /uoepart5)
export const palette = {
  page: "#e6eaf0",
  paper: "#ffffff",
  navy: "#0c2340",
  navySoft: "#1b3a63",
  ink: "#1a2230",
  muted: "#5f6c7b",
  hair: "#d9dfe7",
  tint: "#f4f6f9",
  select: "#e8f1fb",
  selectBorder: "#2563a8",
  red: "#c8102e",
  success: "#17794f",
  successBg: "#e6f4ec",
  danger: "#b3261e",
  dangerBg: "#fcebe9",
  example: "#7a6212",
  exampleBg: "#faf3d9"
};
export const sans = "var(--font-sora), 'Sora', 'Segoe UI', Arial, sans-serif";
export const serif = "'Source Serif 4', Georgia, 'Times New Roman', serif";
export const sheetShadow = "0 1px 2px rgba(12,35,64,0.06), 0 12px 40px rgba(12,35,64,0.10)";
export const LETTERS = ["A", "B", "C", "D"];

const logoUrl = "https://i.ibb.co/C3kRtYQG/zxczx-2-1.png";
const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@_myenglishbro" },
  { label: "TikTok", href: "https://www.tiktok.com/@myenglishbro" },
  { label: "Instagram", href: "https://www.instagram.com/_myenglishbro" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/carlosapolaya/" }
];

export const norm = s => String(s ?? "").trim().toLowerCase();

export const formatTime = secs => `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

export const readBest = key => {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
};
export const writeBest = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable: progress simply isn't remembered
  }
};

export const ExamBar = ({ left, right }) => (
  <header className="sticky top-0 z-30" style={{ background: palette.navy, color: "#fff", fontFamily: sans }}>
    <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <span className="bg-white rounded-md px-2 py-1 flex items-center shrink-0">
          <img src={logoUrl} alt="MyEnglishBro" className="h-5 w-auto" />
        </span>
        <span className="hidden sm:block w-px h-6" style={{ background: "rgba(255,255,255,0.25)" }} />
        <div className="min-w-0 leading-tight">
          <p className="text-sm font-semibold truncate">B2 First</p>
          <p className="text-[11px] truncate" style={{ opacity: 0.75 }}>
            Reading and Use of English
          </p>
        </div>
        {left}
      </div>
      <div className="flex items-center gap-3 shrink-0">{right}</div>
    </div>
  </header>
);

export const PartPill = ({ children }) => (
  <span
    className="hidden md:inline-block ml-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.18em]"
    style={{ background: "rgba(255,255,255,0.12)" }}
  >
    {children}
  </span>
);

export const FooterBrand = () => (
  <footer className="mt-10 pb-10 flex flex-wrap items-center justify-center gap-2" style={{ fontFamily: sans }}>
    <span className="text-[11px] uppercase tracking-[0.22em]" style={{ color: palette.muted }}>
      Powered by MyEnglishBro
    </span>
    {socialLinks.map(link => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1 rounded-full text-xs font-semibold"
        style={{ color: palette.navy, border: `1px solid ${palette.hair}`, background: palette.paper }}
      >
        {link.label}
      </a>
    ))}
  </footer>
);

export const ScoreRing = ({ pct, score, total, good }) => {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-36 h-36 shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={good ? "#5ad39b" : "#ffb86b"}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * pct) / 100}
          style={{ transition: "stroke-dashoffset 900ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-4xl font-bold leading-none">{score}</span>
        <span className="text-[11px] mt-1 uppercase tracking-[0.16em]" style={{ opacity: 0.75 }}>
          of {total}
        </span>
      </div>
    </div>
  );
};
