export default function InfoBadge({ children }) {
  return (
    <span className="inline-block px-3 py-1 rounded bg-[#22242c]/70 text-[#4fc0a9] font-semibold text-xs mr-2 mb-1 border border-[#bfcad6]/30 shadow-sm backdrop-blur-[1.5px]">
      {children}
    </span>
  );
}
