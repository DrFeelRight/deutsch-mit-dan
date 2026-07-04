// Pill-shaped tag/row. Defaults to a quiet neutral chip; callers override
// colours via className (all token-based).
export default function Pill({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        className || 'bg-ink/5 text-muted'
      }`}
    >
      {children}
    </span>
  );
}
