import { FaCheckCircle } from "react-icons/fa";

export default function LearningList({ items }) {
  return (
    <div className="bg-gradient-to-br from-[#23243b]/40 to-[#16171d]/60 border border-[#23243b] rounded-xl p-5 mb-6">
      <h2 className="font-bold text-lg mb-3 text-[#e6eaf0]">What you'll learn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-[#bfcad6]">
            <FaCheckCircle className="mt-1 text-[#4fc0a9]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
