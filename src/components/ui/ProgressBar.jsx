export default function ProgressBar({ value, total, className = '' }) {
  const pct = total ? (value / total) * 100 : 0;
  return (
    <div className={`h-2 w-full rounded-full bg-slate-100 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-brand-500 transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
