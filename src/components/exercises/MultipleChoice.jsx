import { useState } from 'react';
import Feedback from '../Feedback.jsx';

// Used by Grammar Identification and Reading Comprehension.
export default function MultipleChoice({ item, onResult, header, sub }) {
  const [choice, setChoice] = useState(null);
  const answered = choice !== null;
  const correct = choice === item.answer;

  return (
    <div>
      {header}
      {sub}

      <p className="mt-4 mb-3 font-semibold text-slate-800">{item.question}</p>

      <div className="grid gap-2.5">
        {item.options.map((opt) => {
          let cls = 'border-slate-200 hover:border-brand-400 bg-white';
          if (answered) {
            if (opt === item.answer) cls = 'border-emerald-400 bg-emerald-50';
            else if (opt === choice) cls = 'border-rose-400 bg-rose-50';
            else cls = 'border-slate-200 bg-white opacity-60';
          }
          return (
            <button
              key={opt}
              disabled={answered}
              onClick={() => setChoice(opt)}
              className={`text-left px-4 py-3 rounded-xl border font-medium text-slate-700 transition-all ${cls}`}
            >
              {opt}
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
