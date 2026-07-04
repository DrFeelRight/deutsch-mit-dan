// Accent fill on a neutral track. The track uses ink/10 (a clear lightness
// step from the accent in both modes), so empty vs. filled reads without
// relying on a subtle hue shift.
export default function ProgressBar({ value, total, className = '' }) {
  const pct = total ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;
  return (
    <div className={`h-2 w-full rounded-full bg-ink/10 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-accent transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
