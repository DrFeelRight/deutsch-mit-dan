// Token-driven buttons. Primary is the accent fill (on-accent label flips
// white↔near-black by theme so it always clears AA). Secondary is quiet.
//
// success/danger are kept as named variants for existing callers, but recoloured
// to be colourblind-safe: success = teal (never green-vs-red), danger = amber
// outline (never red). Meaning is always carried by label/icon too, not hue.
const VARIANTS = {
  primary: 'bg-accent-strong hover:bg-accent-hover text-on-accent',
  secondary: 'bg-transparent border border-line text-ink hover:bg-ink/5',
  ghost: 'bg-ink/5 hover:bg-ink/10 text-ink',
  success: 'bg-accent-strong hover:bg-accent-hover text-on-accent',
  danger: 'bg-transparent border border-warning text-warning-strong hover:bg-warning/10',
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
