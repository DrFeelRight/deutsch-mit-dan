// Floating card on the neutral ground: surface fill, ~1px warm border, soft
// shadow, 16px radius. Border carries the edge in dark mode where the shadow
// is barely visible.
export default function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl bg-surface border border-line shadow-soft ${className}`}>
      {children}
    </div>
  );
}
