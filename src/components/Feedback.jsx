import Button from './ui/Button.jsx';
import AiFeedback from './AiFeedback.jsx';

// Shared feedback panel shown immediately after every graded answer:
// correct/incorrect banner, the correct answer, and a simple explanation.
// aiContext (optional): {type, payload} — offers on-demand AI tutoring on
// wrong answers when the AI feature flag is enabled.
export default function Feedback({ correct, correctAnswer, explanation, onNext, nextLabel = 'Next', aiContext }) {
  return (
    <div
      className={`mt-5 rounded-xl p-4 pop border ${
        correct ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
      }`}
    >
      <div className="flex items-center gap-2 font-bold">
        <span className="text-xl">{correct ? '✅' : '❌'}</span>
        <span className={correct ? 'text-emerald-700' : 'text-rose-700'}>
          {correct ? 'Richtig! Well done.' : 'Not quite.'}
        </span>
      </div>

      {!correct && correctAnswer != null && (
        <p className="mt-2 text-sm text-slate-700">
          <span className="font-semibold">Correct answer:</span> {correctAnswer}
        </p>
      )}

      {explanation && (
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-700">💡 </span>
          {explanation}
        </p>
      )}

      {!correct && aiContext && <AiFeedback type={aiContext.type} payload={aiContext.payload} label="✨ Explain my mistake" />}

      <div className="mt-4 flex justify-end">
        <Button onClick={onNext}>{nextLabel} →</Button>
      </div>
    </div>
  );
}
