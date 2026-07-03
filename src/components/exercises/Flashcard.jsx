import { useState } from 'react';
import Button from '../ui/Button.jsx';

const GENDER_COLOR = { der: 'text-blue-600', die: 'text-rose-500', das: 'text-emerald-600' };

// Flip card with self-rated spaced repetition (Again / Good / Easy).
export default function Flashcard({ item, onResult, onRate, header }) {
  const [flipped, setFlipped] = useState(false);

  const rate = (rating) => {
    onRate(item.id, rating);
    onResult(rating !== 'again'); // "again" counts as not-yet-known for accuracy
  };

  const genderColor = GENDER_COLOR[item.gender] || 'text-slate-600';
  const noun = item.de.replace(`${item.gender} `, '');

  return (
    <div>
      {header}

      <div className="flip-scene mt-2">
        <div className={`flip-card relative w-full h-64 ${flipped ? 'is-flipped' : ''}`}>
          {/* Front (German) */}
          <div
            className="flip-face absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 flex flex-col items-center justify-center p-6 cursor-pointer"
            onClick={() => setFlipped(true)}
          >
            <span className="text-xs uppercase tracking-wide text-slate-400 mb-2">German</span>
            <span className="text-3xl font-bold text-slate-800">
              <span className={genderColor}>{item.gender}</span> {noun}
            </span>
            <span className="mt-6 text-xs text-slate-400">Tap to flip ↻</span>
          </div>

          {/* Back (English + example) */}
          <div
            className="flip-face flip-back absolute inset-0 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center p-6 text-center cursor-pointer"
            onClick={() => setFlipped(false)}
          >
            <span className="text-xs uppercase tracking-wide text-slate-400 mb-2">English</span>
            <span className="text-2xl font-bold text-slate-800">{item.en}</span>
            <p className="mt-4 text-sm text-slate-600 italic">„{item.example}“</p>
            <p className="text-xs text-slate-400 mt-1">{item.exampleEn}</p>
          </div>
        </div>
      </div>

      {!flipped ? (
        <p className="text-center text-sm text-slate-400 mt-5">
          Try to recall the meaning, then flip the card.
        </p>
      ) : (
        <div className="mt-5">
          <p className="text-center text-sm text-slate-500 mb-3">How well did you know it?</p>
          <div className="grid grid-cols-3 gap-2.5">
            <Button variant="danger" onClick={() => rate('again')}>
              Again
            </Button>
            <Button variant="ghost" onClick={() => rate('good')}>
              Good
            </Button>
            <Button variant="success" onClick={() => rate('easy')}>
              Easy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
