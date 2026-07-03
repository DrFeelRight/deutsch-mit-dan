import { useState } from 'react';
import Feedback from '../Feedback.jsx';
import Button from '../ui/Button.jsx';
import { isMatch } from '../../lib/helpers.js';

// Free-text input used by Sentence Completion, Translation and Error Correction.
// The parent supplies the prompt markup; grading uses the item's `accept` list.
export default function TextChallenge({ item, onResult, header, promptNode, sub, placeholder }) {
  const [val, setVal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const correct = isMatch(val, item.accept);

  const submit = () => {
    if (val.trim()) setSubmitted(true);
  };

  return (
    <div>
      {header}
      {promptNode}
      {sub}

      <input
        autoFocus
        value={val}
        disabled={submitted}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        placeholder={placeholder || 'Type your answer…'}
        className="mt-4 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-slate-800 disabled:bg-slate-50"
      />

      {!submitted && (
        <div className="mt-4 flex justify-end">
          <Button onClick={submit} disabled={!val.trim()}>
            Check
          </Button>
        </div>
      )}

      {submitted && (
        <Feedback
          correct={correct}
          correctAnswer={item.accept[0]}
          explanation={item.explanation}
          onNext={() => onResult(correct)}
        />
      )}
    </div>
  );
}
