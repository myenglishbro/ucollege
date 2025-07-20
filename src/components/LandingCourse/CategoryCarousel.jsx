import React from "react";

const categories = [
  "Grammar",
  "Writing",
  "Pronunciation",
  "Exams",
  "Listening",
  "Speaking",
  "Vocabulary",
  "Reading",
];

export default function CategoryCarousel() {
  // Duplicamos los ítems para efecto infinito
  const items = [...categories, ...categories];

  return (
    <div className="w-full bg-white py-6 overflow-hidden">
      <div className="marquee flex gap-10 px-6 whitespace-nowrap">
        {items.map((cat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-indigo-500 font-semibold text-lg shrink-0"
          >
            ✻ <span>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
