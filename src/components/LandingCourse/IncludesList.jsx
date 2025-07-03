import { FaRegPlayCircle, FaRegClock, FaCheckCircle, FaRegFileAlt } from "react-icons/fa";
const iconMap = {
  FaRegPlayCircle: <FaRegPlayCircle />,
  FaRegClock: <FaRegClock />,
  FaCheckCircle: <FaCheckCircle />,
  FaRegFileAlt: <FaRegFileAlt />,
};

export default function IncludesList({ includes }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-6">
      {includes.map(([text, icon], i) => (
        <span key={i} className="flex items-center gap-2 bg-[#181a23] border border-[#23243b] rounded-md px-3 py-2 text-[#bfcad6] shadow-sm">
          <span className="text-[#72b4fa]">{iconMap[icon]}</span>
          {text}
        </span>
      ))}
    </div>
  );
}
