import { FaCheckCircle } from "react-icons/fa";

export default function LearningList({ items }) {
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-6 shadow-sm">
      <h2 className="font-bold text-lg mb-4 text-indigo-800">What you'll learn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 text-gray-700 transition-transform duration-200 hover:scale-[1.02]"
          >
            <FaCheckCircle className="mt-1 text-purple-500" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
