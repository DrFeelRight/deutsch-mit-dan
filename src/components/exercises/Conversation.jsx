import { useState } from 'react';
import Button from '../ui/Button.jsx';

// Open-ended speaking/writing prompt with an optional "suggested answer" and
// honest self-assessment (which feeds the accuracy stat).
export default function Conversation({ item, onResult, header }) {
  const [val, setVal] = useState('');
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      {header}

      <div className="mt-3 rounded-xl bg-brand-50 border border-brand-100 p-4">
        <p className="text-xs uppercase tracking-wide text-brand-600 font-semibold mb-1">Prompt</p>
        <p className="text-lg font-semibold text-slate-800">{item.prompt}</p>
      </div>

      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        rows={4}
        placeholder="Antworte auf Deutsch… (type your answer in German)"
        className="mt-4 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-slate-800 resize-none"
      />

      {!revealed ? (
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={() => setRevealed(true)}>
            💡 Show suggested answer
          </Button>
        </div>
      ) : (
        <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 pop">
          <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold mb-1">
            Suggested answer
          </p>
          <p className="text-slate-700">{item.suggestion}</p>
        </div>
      )}

      <div className="mt-5">
        <p className="text-center text-sm text-slate-500 mb-3">Compare your answer. How did it go?</p>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="ghost" onClick={() => onResult(false)}>
            Need more practice
          </Button>
          <Button variant="success" onClick={() => onResult(true)}>
            I said it well 👍
          </Button>
        </div>
      </div>
    </div>
  );
}
