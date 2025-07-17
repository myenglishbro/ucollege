import { FaRegPlayCircle, FaRegClock, FaCheckCircle, FaRegFileAlt } from "react-icons/fa";

const iconMap = {
  FaRegPlayCircle: <FaRegPlayCircle />,
  FaRegClock: <FaRegClock />,
  FaCheckCircle: <FaCheckCircle />,
  FaRegFileAlt: <FaRegFileAlt />,
};

export default function IncludesList({ includes }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-6">
      {includes.map(([text, icon], i) => (
        <span
          key={i}
          className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 text-gray-700 shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md"
        >
          <span className="text-indigo-500">{iconMap[icon]}</span>
          {text}
        </span>
      ))}
    </div>
  );
}
