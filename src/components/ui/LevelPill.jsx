import Pill from './Pill.jsx';

const LABELS = { 1: 'A1–A2', 2: 'A2–B1', 3: 'B1' };

// Difficulty is signalled by the CEFR text, not by hue — one neutral pill in
// keeping with the single-accent scheme (no red/amber/green level trio).
export default function LevelPill({ level }) {
  const label = LABELS[level] || LABELS[1];
  return (
    <Pill className="bg-ink/[0.04] text-muted border border-line">
      <span className="text-accent-strong">Level {level}</span>
      <span className="text-line">·</span>
      {label}
    </Pill>
  );
}
