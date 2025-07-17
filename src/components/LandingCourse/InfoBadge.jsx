export default function InfoBadge({ children }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-xs mr-2 mb-1 border border-indigo-200 shadow-sm">
      {children}
    </span>
  );
}
