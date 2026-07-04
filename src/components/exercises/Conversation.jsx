import { useState } from 'react';
import Button from '../ui/Button.jsx';
import AiFeedback from '../AiFeedback.jsx';
import { SparkleIcon } from '../ui/Icon.jsx';

// Open-ended speaking/writing prompt with an optional "suggested answer" and
// honest self-assessment (which feeds the accuracy stat).
export default function Conversation({ item, onResult, header }) {
  const [val, setVal] = useState('');
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      {header}

      <div className="mt-3 rounded-xl bg-accent/10 border border-accent/20 p-4">
        <p className="text-xs uppercase tracking-wide text-accent-strong font-semibold mb-1">Prompt</p>
        <p className="font-serif text-lg font-semibold text-ink">{item.prompt}</p>
      </div>

      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        rows={4}
        placeholder="Antworte auf Deutsch… (type your answer in German)"
        className="mt-4 w-full px-4 py-3 rounded-xl border border-line bg-surface-2 text-ink placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none resize-none transition-colors"
      />

      {!revealed ? (
        <div className="mt-4 flex justify-between">
          <Button variant="secondary" onClick={() => setRevealed(true)}>
            Show suggested answer
          </Button>
        </div>
      ) : (
        <div className="mt-4 rounded-xl bg-accent/10 border border-accent/20 p-4 pop">
          <p className="text-xs uppercase tracking-wide text-accent-strong font-semibold mb-1">
            Suggested answer
          </p>
          <p className="text-ink">{item.suggestion}</p>
        </div>
      )}

      {val.trim().length > 0 && (
        <AiFeedback
          type="conversation"
          payload={{ prompt: item.prompt, answer: val }}
          label={
            <>
              <SparkleIcon size={15} />
              Get AI feedback on my answer
            </>
          }
        />
      )}

      <div className="mt-5">
        <p className="text-center text-sm text-muted mb-3">Compare your answer. How did it go?</p>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="secondary" onClick={() => onResult(false)}>
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
