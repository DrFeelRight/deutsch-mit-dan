import Pill from './Pill.jsx';

const MAP = {
  1: ['A1–A2', 'bg-emerald-50 text-emerald-700'],
  2: ['A2–B1', 'bg-amber-50 text-amber-700'],
  3: ['B1', 'bg-rose-50 text-rose-700'],
};

export default function LevelPill({ level }) {
  const [label, cls] = MAP[level] || MAP[1];
  return (
    <Pill className={cls}>
      Level {level} · {label}
    </Pill>
  );
}
