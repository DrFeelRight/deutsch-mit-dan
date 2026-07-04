import { useState } from 'react';
import Feedback from '../Feedback.jsx';
import { CheckIcon, XIcon } from '../ui/Icon.jsx';

// Used by Grammar Identification and Reading Comprehension.
export default function MultipleChoice({ item, onResult, header, sub }) {
  const [choice, setChoice] = useState(null);
  const answered = choice !== null;
  const correct = choice === item.answer;

  return (
    <div>
      {header}
      {sub}

      <p className="mt-4 mb-3 font-serif text-lg font-semibold text-ink">{item.question}</p>

      <div className="grid gap-2.5">
        {item.options.map((opt) => {
          const isAnswer = opt === item.answer;
          const isChosen = opt === choice;
          // After answering, options are marked colourblind-safe: the right
          // answer gets teal + ✓, a wrong pick gets amber + ✗. Both carry an
          // icon and shape, never colour alone; no red/green pairing.
          let cls = 'border-line bg-surface hover:border-accent/50 text-ink';
          let mark = null;
          if (answered) {
            if (isAnswer) {
              cls = 'border-accent/60 bg-accent/10 text-ink';
              mark = <CheckIcon size={18} strokeWidth={2.25} className="text-accent-strong shrink-0" />;
            } else if (isChosen) {
              cls = 'border-warning/60 bg-warning/10 text-ink';
              mark = <XIcon size={18} strokeWidth={2.25} className="text-warning-strong shrink-0" />;
            } else {
              cls = 'border-line bg-surface text-muted opacity-70';
            }
          }
          return (
            <button
              key={opt}
              disabled={answered}
              onClick={() => setChoice(opt)}
              className={`flex items-center justify-between gap-3 text-left px-4 py-3 rounded-xl border font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${cls}`}
            >
              <span>{opt}</span>
              {mark}
            </button>
          );
        })}
      </div>

      {answered && (
        <Feedback
          correct={correct}
          correctAnswer={item.answer}
          explanation={item.explanation}
          onNext={() => onResult(correct)}
        />
      )}
    </div>
  );
}
