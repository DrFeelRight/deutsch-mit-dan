import Button from './ui/Button.jsx';
import AiFeedback from './AiFeedback.jsx';
import { CheckIcon, XIcon, ArrowRightIcon, SparkleIcon } from './ui/Icon.jsx';

// Shared feedback panel — the colourblind-safe status treatment (highest
// priority for the red/green-colourblind owner). Correct vs. Incorrect is
// carried by THREE independent channels, none of them a red/green hue pair:
//   • icon:  ✓ (check)  vs  ✗ (cross)      — different shapes
//   • label: "Correct"  vs  "Incorrect"    — different text
//   • hue:   teal        vs  amber          — distinct on the blue↔yellow axis
//                                             that red/green CVD preserves
// The icon sits in a badge whose shape (rounded square vs. circle) differs too.
export default function Feedback({ correct, correctAnswer, explanation, onNext, nextLabel = 'Next', aiContext }) {
  const tone = correct
    ? {
        panel: 'bg-accent/10 border-accent/30',
        badge: 'bg-accent text-on-accent rounded-lg', // rounded square
        text: 'text-accent-strong',
        Icon: CheckIcon,
        label: 'Correct',
      }
    : {
        panel: 'bg-warning/10 border-warning/40',
        badge: 'bg-warning text-on-accent rounded-full', // circle
        text: 'text-warning-strong',
        Icon: XIcon,
        label: 'Incorrect',
      };

  return (
    <div className={`mt-5 rounded-xl p-4 pop border ${tone.panel}`}>
      <div className="flex items-center gap-2.5">
        <span className={`flex h-7 w-7 items-center justify-center ${tone.badge}`}>
          <tone.Icon size={18} strokeWidth={2.25} />
        </span>
        <span className={`text-lg font-bold ${tone.text}`}>{tone.label}</span>
      </div>

      {!correct && correctAnswer != null && (
        <p className="mt-3 text-sm text-ink">
          <span className="font-semibold">Correct answer:</span> {correctAnswer}
        </p>
      )}

      {explanation && (
        <p className="mt-2 text-sm text-muted leading-relaxed">{explanation}</p>
      )}

      {!correct && aiContext && (
        <AiFeedback
          type={aiContext.type}
          payload={aiContext.payload}
          label={
            <>
              <SparkleIcon size={15} />
              Explain my mistake
            </>
          }
        />
      )}

      <div className="mt-4 flex justify-end">
        <Button onClick={onNext}>
          {nextLabel}
          <ArrowRightIcon size={16} />
        </Button>
      </div>
    </div>
  );
}
