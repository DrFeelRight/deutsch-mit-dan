import { useState } from 'react';
import Button from '../ui/Button.jsx';

// Flip card with self-rated spaced repetition (Again / Good / Easy).
export default function Flashcard({ item, onResult, onRate, header }) {
  const [flipped, setFlipped] = useState(false);

  const rate = (rating) => {
    onRate(item.id, rating);
    onResult(rating !== 'again'); // "again" counts as not-yet-known for accuracy
  };

  const noun = item.de.replace(`${item.gender} `, '');

  return (
    <div>
      {header}

      <div className="flip-scene mt-2">
        <div className={`flip-card relative w-full h-64 ${flipped ? 'is-flipped' : ''}`}>
          {/* Front (German). Gender is shown by the article word itself, in the
              accent colour — no red/green gender coding to trip up CVD. */}
          <div
            className="flip-face absolute inset-0 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col items-center justify-center p-6 cursor-pointer"
            onClick={() => setFlipped(true)}
          >
            <span className="text-xs uppercase tracking-wide text-muted mb-2">German</span>
            <span className="font-serif text-3xl font-bold text-ink">
              <span className="text-accent-strong">{item.gender}</span> {noun}
            </span>
            <span className="mt-6 text-xs text-muted">Tap to flip ↻</span>
          </div>

          {/* Back (English + example) */}
          <div
            className="flip-face flip-back absolute inset-0 rounded-2xl bg-surface-2 border border-line flex flex-col items-center justify-center p-6 text-center cursor-pointer"
            onClick={() => setFlipped(false)}
          >
            <span className="text-xs uppercase tracking-wide text-muted mb-2">English</span>
            <span className="font-serif text-2xl font-bold text-ink">{item.en}</span>
            <p className="mt-4 text-sm text-ink italic">„{item.example}“</p>
            <p className="text-xs text-muted mt-1">{item.exampleEn}</p>
          </div>
        </div>
      </div>

      {!flipped ? (
        <p className="text-center text-sm text-muted mt-5">
          Try to recall the meaning, then flip the card.
        </p>
      ) : (
        <div className="mt-5">
          <p className="text-center text-sm text-muted mb-3">How well did you know it?</p>
          <div className="grid grid-cols-3 gap-2.5">
            <Button variant="danger" onClick={() => rate('again')}>
              Again
            </Button>
            <Button variant="secondary" onClick={() => rate('good')}>
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
