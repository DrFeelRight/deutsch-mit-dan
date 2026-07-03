export default function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl bg-white shadow-soft border border-slate-100 ${className}`}>
      {children}
    </div>
  );
}
