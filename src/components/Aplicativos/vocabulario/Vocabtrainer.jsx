import React, { useEffect, useMemo, useRef, useState } from "react";
import vocabJSON from "../data/celpip_vocab.json"; // JSON local junto al componente

// ✨ VocabTrainer — Dark Premium (azules)
// Cambios:
// - FIX: bloqueo al hacer click en Collocations (rehecho como bloque inline dentro de Study)
// - UI: Collocations ahora va JUNTO a la información de la palabra
// - Ejemplos: soporta `examples` (array) además de `example`
// - Menú: Tipo → Categoría (solo Study / Practice)

const TABS = ["Study", "Practice"]; // quitamos la pestaña Collocations separada

function similarity(a, b) {
  const s1 = (a || "").trim().toLowerCase();
  const s2 = (b || "").trim().toLowerCase();
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 1;
  return 0;
}

export default function VocabTrainer({ data }) {
  // Datos: props > JSON importado
  const [vocab] = useState(Array.isArray(data) ? data : (vocabJSON || []));

  // Estado global de práctica
  const [tab, setTab] = useState("Study");
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(0);
  const [ans, setAns] = useState(""); // Practice (typing)
  const [feedback, setFeedback] = useState(""); // Practice feedback
  const [session, setSession] = useState({ total: 0, correct: 0 });
  const [hintStep, setHintStep] = useState(0);

  // Input focus en Practice
  const practiceRef = useRef(null);
  const focusInput = () => requestAnimationFrame(() => practiceRef.current?.focus());

  // Derivados
  const topics = useMemo(() => Array.from(new Set((vocab || []).map(x => x.topic))).sort(), [vocab]);
  const items = useMemo(() => (filter === "All" ? vocab : (vocab || []).filter(x => x.topic === filter)), [vocab, filter]);
  const it = items.length ? items[index % items.length] : null;

  useEffect(() => { setIndex(0); }, [filter]);

  // Hotkeys globales (no interceptar cuando se escribe)
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      const tag = t?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable) return;

      if (e.key === "Enter") {
        if (tab === "Practice") { handleCheck(); focusInput(); }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "ArrowRight") {
        e.preventDefault();
        next();
        if (tab === "Practice") focusInput();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "h") {
        e.preventDefault();
        cycleHint();
        if (tab === "Practice") focusInput();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, filter, items.length, handleCheck, next, cycleHint, focusInput]);

  // Acciones
  function next() {
    if (!items.length) return;
    setAns("");
    setFeedback("");
    setHintStep(0);
    setIndex(v => (v + 1) % items.length);
  }

  const grade = (ok) => setSession(s => ({ total: s.total + 1, correct: s.correct + (ok ? 1 : 0) }));
  function cycleHint() {
    setHintStep(h => (h + 1) % 3);
  }

  // ── UI blocks ────────────────────────────────────────────────────────────────
  const Shell = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <ModeMenu />
        <main>
          <Header />
          {children}
          <footer className="mt-10 text-xs text-slate-400">
            Atajos: <b>Enter</b> comprobar · <b>Ctrl+→</b> siguiente · <b>Ctrl+H</b> pista.
          </footer>
        </main>
      </div>
    </div>
  );

  const Header = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-slate-100">Vocab Trainer</h1>
          {it?.level && (
            <span className="px-2 py-0.5 text-xs rounded-full border border-blue-500 text-blue-200 bg-blue-500/10">{it.level}</span>
          )}
        </div>
        <div className="text-sm text-slate-300">
          <span className="mr-3">Modo: <b className="text-slate-100">{tab}</b></span>
          <span className="mr-3">Tema: <b className="text-slate-100">{filter}</b></span>
          <span>Score: <b className="text-slate-100">{session.correct}</b>/<span>{session.total}</span></span>
        </div>
      </div>
      <div className="h-1 mt-3 bg-slate-800 rounded overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: `${items.length ? ((index + 1) / items.length) * 100 : 0}%` }} />
      </div>
    </div>
  );

  const Card = ({ children, title }) => (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 shadow-xl shadow-black/20">
      {title && <div className="mb-2 text-xs uppercase tracking-wide text-slate-400">{title}</div>}
      {children}
    </div>
  );

  function ModeMenu() {
    return (
      <aside className="space-y-3">
        {TABS.map((group) => (
          <Accordion key={group} title={group} defaultOpen={tab === group}>
            <MenuItem
              active={tab === group && filter === "All"}
              onClick={() => { setTab(group); setFilter("All"); setIndex(0); focusInput(); }}
              label={`All (${vocab.length})`}
            />
            {topics.map((t) => {
              const count = (vocab || []).filter((x) => x.topic === t).length;
              return (
                <MenuItem
                  key={`${group}-${t}`}
                  active={tab === group && filter === t}
                  onClick={() => { setTab(group); setFilter(t); setIndex(0); focusInput(); }}
                  label={`${t} (${count})`}
                />
              );
            })}
          </Accordion>
        ))}
      </aside>
    );
  }

  function Accordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    useEffect(() => { setOpen(defaultOpen); }, [defaultOpen]);
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60">
        <button className="w-full flex items-center justify-between px-4 py-3 text-left text-slate-100 hover:bg-slate-800/60 rounded-2xl" onClick={() => setOpen(o => !o)}>
          <span className="font-medium">{title}</span>
          <span className="text-slate-400">{open ? "–" : "+"}</span>
        </button>
        {open && <div className="px-2 pb-3 space-y-1">{children}</div>}
      </div>
    );
  }

  function MenuItem({ active, label, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`w-full text-left px-3 py-2 rounded-xl border transition ${active ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/30" : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-100"}`}
      >
        {label}
      </button>
    );
  }

  // ── Utilidades de ejemplos de colocaciones ───────────────────────────────
  function templateByTopic(topic = "", coll = "") {
    const t = String(topic).toLowerCase();
    if (t.includes("housing")) return `The building offers ${coll}.`;
    if (t.includes("work")) return `We should ${coll} to improve results.`;
    if (t.includes("transport")) return `There was ${coll} on the main road.`;
    if (t.includes("customer")) return `Our team ensures ${coll} for every client.`;
    if (t.includes("health")) return `Clinics provide ${coll} in our area.`;
    if (t.includes("education")) return `The course requires ${coll}.`;
    if (t.includes("environment")) return `Policies encourage ${coll}.`;
    if (t.includes("technology")) return `The team aims to ${coll}.`;
    if (t.includes("community")) return `Our community values ${coll}.`;
    if (t.includes("finance")) return `${coll} affects household budgets.`;
    return `Example: ${coll}.`;
  }

  function deriveCollocationExamples(item) {
    if (!item) return [];
    const colls = (item.collocations || []).filter(Boolean);
    const exs = (item.examples && item.examples.length ? item.examples : [item.example]).filter(Boolean);
    const out = [];
    for (const coll of colls) {
      const hit = exs.find((e) => String(e).toLowerCase().includes(String(coll).toLowerCase()));
      out.push({ coll, ex: hit || templateByTopic(item.topic, coll) });
    }
    return out;
  }

  // ── Modos ───────────────────────────────────────────────────────────────────
  const Study = () => {
    if (!it) return <EmptyState />;
    const examples = (it.examples && it.examples.length ? it.examples : [it.example]).filter(Boolean);
    const collEx = deriveCollocationExamples(it);
    return (
      <div className="grid gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>{it.topic}</span>
              {it.level && <span className="px-2 py-0.5 text-[10px] rounded-full border border-blue-500 text-blue-200 bg-blue-500/10">{it.level}</span>}
            </div>
            
          </div>
          <div className="mt-1 text-3xl font-semibold text-slate-100">{it.word}</div>
          <div className="mt-2 text-slate-200">{it.meaning_en}</div>
          <div className="text-slate-400">ES: {it.meaning_es}</div>
          
        </Card>

        <Card title="Colocaciones recurrentes">
          <div className="flex flex-wrap gap-2 mb-3">
            {(it.collocations || []).map((c) => (
              <span key={c} className="px-2 py-1 text-xs rounded-full bg-slate-800 text-blue-200 border border-slate-700">{c}</span>
            ))}
          </div>
        </Card>

        <Card title="Ejemplos de uso">
          <ul className="list-disc ml-5 text-slate-200 text-sm space-y-1">
            {collEx.map(({ coll, ex }) => (
              <li key={coll}>
                <span className="text-blue-200 font-medium">{coll}</span>: {ex}
              </li>
            ))}
            {examples.length > 0 && !collEx.length && examples.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        </Card>

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-600" onClick={() => { next(); focusInput(); }}>Siguiente →</button>
        </div>
      </div>
    );
  };

  const Practice = () => {
    if (!it) return <EmptyState />;
    const hints = [
      `ES: ${it.meaning_es}`,
      `Ejemplo: ${String((it.examples && it.examples[0]) || it.example || "").replace(new RegExp(it.word || "", "i"), "_____")}`,
      `Inicial: ${String(it.word || "").slice(0, 1).toUpperCase()}…`,
    ];

    const handle = () => handleCheck();

    return (
      <div className="grid gap-4">
        <Card title="Pista">
          <div className="text-slate-200">{hints[hintStep]}</div>
        </Card>
        <input
          ref={practiceRef}
          autoFocus
          className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe la palabra en inglés"
          value={ans}
          onChange={(e) => setAns(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handle()}
        />
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl border border-blue-500 bg-blue-600 text-white hover:bg-blue-500" onClick={handle}>Comprobar (Enter)</button>
          <button className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-600" onClick={() => { next(); focusInput(); }}>Siguiente (Ctrl→)</button>
          <button className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-600" onClick={() => { cycleHint(); focusInput(); }}>Otra pista (Ctrl+H)</button>
        </div>
        {feedback && <div className={`text-sm ${feedback.startsWith("✅") ? "text-green-400" : "text-rose-400"}`}>{feedback}</div>}
      </div>
    );
  };

  function EmptyState() {
    return <Card><div className="text-slate-300">No hay ítems para este filtro.</div></Card>;
  }

  // Handlers (Practice)
  function handleCheck() {
    if (!it) return;
    const ok = similarity(ans, it.word) === 1;
    grade(ok);
    setFeedback(ok ? "✅ Correcto" : `❌ Era: ${it.word}`);
  }

  // Render
  return (
    <Shell>
      {tab === "Study" && <Study />}
      {tab === "Practice" && <Practice />}
    </Shell>
  );
}
