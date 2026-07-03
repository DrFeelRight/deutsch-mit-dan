const VARIANTS = {
  primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm',
  ghost: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
  outline: 'border border-slate-300 hover:border-brand-400 hover:text-brand-600 text-slate-700 bg-white',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white',
  danger: 'bg-rose-500 hover:bg-rose-600 text-white',
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
      className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
