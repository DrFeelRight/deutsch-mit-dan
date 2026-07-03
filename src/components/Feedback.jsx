import Button from './ui/Button.jsx';

// Shared feedback panel shown immediately after every graded answer:
// correct/incorrect banner, the correct answer, and a simple explanation.
export default function Feedback({ correct, correctAnswer, explanation, onNext, nextLabel = 'Next' }) {
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

      <div className="mt-4 flex justify-end">
        <Button onClick={onNext}>{nextLabel} →</Button>
      </div>
    </div>
  );
}
