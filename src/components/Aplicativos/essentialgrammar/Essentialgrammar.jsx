import React, { useMemo, useState } from "react";
import levelsData from "../data/levelsExercises6.json";

const ACCENT = "#0f3057"; // Cambridge navy
const HIGHLIGHT = "#d9e7f6";
const BACKGROUND =
  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04), transparent 30%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06), transparent 28%), linear-gradient(145deg, #0b2242 0%, #12335d 40%, #0f3057 100%)";

function CambridgeHeader() {
  return (
    <div className="flex items-center gap-3 mb-8 text-white">
      
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-700">
          Welcome to Challenges
        </p>
        <h1 className="text-2xl font-semibold leading-snug text-gray-700">
          by MyEnglishBro
        </h1>
      </div>
    </div>
  );
}

function ExamCodeGate({ codeInput, error, onChange, onSubmit }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: BACKGROUND }}
    >
      <div className="max-w-lg w-full bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/40">
        <CambridgeHeader />
        <div className="space-y-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            Introduce el c&oacute;digo de examen que recibiste. Este acceso es
            exclusivo para evaluaci&oacute;n
          </p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <label className="block text-sm font-semibold text-gray-800">
              C&oacute;digo de examen
            </label>
            <input
              value={codeInput}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f4f7fb] text-[#0f2240] placeholder:text-[#7689a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3057] focus:bg-white font-semibold tracking-[0.12em] uppercase transition-colors"
              placeholder="Ej. LEVEL1-KEY"
              required
            />
            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: ACCENT, boxShadow: "0 12px 30px rgba(15,48,87,0.35)" }}
            >
              Acceder al examen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  index,
  total,
  onAnswer,
  accent,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold" style={{ color: accent }}>
          Pregunta {index + 1} de {total}
        </div>
        <div className="h-1.5 w-32 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all"
            style={{
              width: `${Math.round(((index + 1) / total) * 100)}%`,
              backgroundColor: accent,
            }}
          />
        </div>
      </div>
      <p className="text-xl font-semibold text-gray-900 leading-relaxed mb-6">
        {question.prompt}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt, idx) => (
          <button
            key={`${opt}-${idx}`}
            onClick={() => onAnswer(opt)}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-transparent font-semibold transition-all hover:-translate-y-0.5"
            style={{
              color: accent,
              background: HIGHLIGHT,
              boxShadow: "0 10px 30px rgba(18, 63, 115, 0.14)",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReportCard({ exam, answers, onReset }) {
  const total = exam.exercises.length;
  const score = answers.filter((a) => a?.correct).length;
  const percent = Math.round((score / total) * 100);

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Reporte oficial
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            {exam.level}. Essential Grammar
          </h2>
        </div>
        <div className="px-4 py-2 rounded-xl font-bold text-white" style={{ backgroundColor: ACCENT }}>
          {score} / {total}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all"
            style={{ width: `${percent}%`, backgroundColor: ACCENT }}
          />
        </div>
        <span className="text-sm font-semibold" style={{ color: ACCENT }}>
          {percent}%
        </span>
      </div>

      <div className="space-y-4">
        {answers.map((item, idx) => (
          <div
            key={`answer-${idx}`}
            className="border rounded-2xl p-4"
            style={{ borderColor: item.correct ? "#c7e4ff" : "#fbd5d5" }}
          >
            <p className="text-sm text-gray-600 mb-1">Pregunta {idx + 1}</p>
            <p className="font-semibold text-gray-900 mb-2">{item.prompt}</p>
            <p className="text-sm text-gray-800">
              Tu respuesta:{" "}
              <span
                className="font-bold"
                style={{ color: item.correct ? ACCENT : "#b42318" }}
              >
                {item.selected}
              </span>
            </p>
            {!item.correct && (
              <p className="text-sm text-gray-800 mt-1">
                Correcta: <span className="font-bold" style={{ color: ACCENT }}>{item.answer}</span>
              </p>
            )}
            {item.explanation && (
              <p className="text-xs text-gray-600 mt-2">{item.explanation}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onReset}
          className="px-5 py-3 rounded-xl font-semibold text-white shadow-lg hover:-translate-y-0.5 transition-transform"
          style={{ backgroundColor: ACCENT }}
        >
          Ingresar otro examen
        </button>
      </div>
    </div>
  );
}

export default function Essentialgrammar() {
  const exams = useMemo(() => levelsData?.levels || [], []);
  const [codeInput, setCodeInput] = useState("");
  const [activeExam, setActiveExam] = useState(null);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleCodeSubmit = () => {
    const normalized = codeInput.trim().toUpperCase();
    const match = exams.find((exam) => {
      const codes = [exam.prerequisiteCode, exam.levelCode]
        .filter(Boolean)
        .map((c) => c.trim().toUpperCase());
      return codes.includes(normalized);
    });

    if (!match) {
      setError("C\u00f3digo no v\u00e1lido para Essential Grammar.");
      return;
    }

    setActiveExam(match);
    setError("");
    setFinished(false);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const resetExam = () => {
    setActiveExam(null);
    setFinished(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setCodeInput("");
  };

  const handleAnswer = (selected) => {
    if (!activeExam) return;
    const question = activeExam.exercises[currentQuestion];
    const answerEntry = {
      prompt: question.prompt,
      selected,
      answer: question.answer,
      correct: selected === question.answer,
      explanation: question.explanation || "",
    };

    const updated = [...answers];
    updated[currentQuestion] = answerEntry;
    setAnswers(updated);

    const isLast = currentQuestion + 1 === activeExam.exercises.length;
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  if (!activeExam) {
    return (
      <ExamCodeGate
        codeInput={codeInput}
        error={error}
        onChange={setCodeInput}
        onSubmit={handleCodeSubmit}
      />
    );
  }

  const question = activeExam.exercises[currentQuestion];

  return (
    <div className="min-h-screen" style={{ background: BACKGROUND }}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-white mb-6 gap-3">
          <CambridgeHeader />
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-sm">
              C&oacute;digo validado
            </div>
            <button
              onClick={resetExam}
              className="px-4 py-2 rounded-xl bg-white text-sm font-semibold text-[#0f274d] shadow-lg"
            >
              Cambiar examen
            </button>
          </div>
        </div>

        {!finished && (
          <QuestionCard
            accent={ACCENT}
            question={question}
            index={currentQuestion}
            total={activeExam.exercises.length}
            onAnswer={handleAnswer}
          />
        )}

        {finished && (
          <ReportCard exam={activeExam} answers={answers} onReset={resetExam} />
        )}
      </div>
    </div>
  );
}
