import React, { useState, useEffect } from "react";

const sections = [
  {
    name: "Reading",
    questions: [
      { id: 1, text: "What is the main idea of the passage?", options: ["A", "B", "C", "D"], correct: "B" },
      { id: 2, text: "Which word is closest in meaning to 'abundant'?", options: ["Scarce", "Plentiful", "Small", "Limited"], correct: "Plentiful" }
    ],
    media: { type: "image", src: "https://th.bing.com/th/id/OIP.tyZYOs5J-Qn9QfEcemAJJwHaHs?rs=1&pid=ImgDetMain" }
  },
  {
    name: "Listening",
    questions: [
      { id: 3, text: "What did the speaker mention about the weather?", options: ["It was sunny", "It was rainy", "It was cloudy", "It was cold"], correct: "It was rainy" }
    ],
    media: { type: "video", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
  },
  {
    name: "Writing",
    questions: [
      { id: 4, text: "Write a short paragraph about your favorite hobby." }
    ],
    media: { type: "text" }
  },
  {
    name: "Speaking",
    questions: [
      { id: 5, text: "Describe a memorable trip you have taken." }
    ],
    media: { type: "video", src: "https://www.youtube.com/embed/3JZ_D3ELwOQ" }
  }
];

export default function CambridgeExam() {
  const [currentSection, setCurrentSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(67 * 60);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, timeLeft]);

  const startExam = () => setStarted(true);
  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerClick = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      {!started ? (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center max-w-lg">
          <h1 className="text-2xl font-bold">Cambridge Computer-Based Exam</h1>
          <p className="text-gray-400 mt-3">Follow the instructions carefully.</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600" onClick={startExam}>Start Test</button>
        </div>
      ) : (
        <div className="flex flex-col bg-gray-800 shadow-lg rounded-lg p-6 text-center w-full">
          <div className="flex flex-col items-center w-full p-4">
            <h2 className="text-xl font-semibold">{sections[currentSection].name} Section</h2>
            <span className="bg-gray-700 px-3 py-1 rounded mt-2">⏳ {formatTime(timeLeft)}</span>

            {sections[currentSection].media?.type === "image" && (
              <img src={sections[currentSection].media.src} alt="Reading passage" className="mt-4 rounded-lg w-full max-w-md" />
            )}

            {sections[currentSection].media?.type === "video" && (
              <iframe
                width="100%"
                height="250"
                src={sections[currentSection].media.src}
                title="Video"
                allowFullScreen
                className="rounded-lg mt-4 max-w-md"
              ></iframe>
            )}
          </div>

          <div className="flex flex-wrap w-full p-4 gap-4 justify-center">
            {sections[currentSection].questions.map((q) => (
              <div key={q.id} className="w-full md:w-1/2 lg:w-1/3 border p-4 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300">
                <h3 className="text-lg font-semibold">{q.text}</h3>
                {q.options ? (
                  <ul className="mt-2">
                    {q.options.map((option, index) => (
                      <li
                        key={index}
                        className={`border p-2 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200 ${
                          answers[q.id] === option ? "bg-blue-500" : ""
                        }`}
                        onClick={() => handleAnswerClick(q.id, option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {answers[q.id] && (
                  <p className={`mt-2 font-semibold ${answers[q.id] === q.correct ? "text-green-500" : "text-red-500"}`}>
                    {answers[q.id] === q.correct ? "✅ Correct!" : `❌ Incorrect. Correct answer: ${q.correct}`}
                  </p>
                )}
              </div>
            ))}
          </div>

          {sections[currentSection].media?.type === "text" && (
            <textarea
              className="w-full p-3 mt-4 bg-gray-700 rounded-lg"
              rows="5"
              placeholder="Write your answer here..."
            ></textarea>
          )}

          {currentSection < sections.length - 1 && (
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 self-center" 
              onClick={nextSection}
            >
              Next Section
            </button>
          )}
        </div>
      )}
    </div>
  );
}
