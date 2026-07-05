import { useEffect, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Pill from '../components/ui/Pill.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { CATEGORY_ICONS, FlameIcon, TargetIcon, ShuffleIcon, ArrowRightIcon, SparkleIcon, CheckIcon } from '../components/ui/Icon.jsx';
import { CATEGORIES } from '../data/categories.js';
import { dayDiff, todayStr } from '../lib/helpers.js';
import { weakCategories } from '../lib/errors.js';
import { isAiEnabled, setAiEnabled, aiRequestsRemaining, AI_DAILY_CAP } from '../lib/ai.js';

// Quiet inset tile shared by the passive stats. Lighter than the exercise
// cards (surface-2 fill, no shadow) so the stats stay glanceable context.
const TILE = 'rounded-xl border px-3 py-4 flex flex-col items-center justify-center text-center';

function StatTile({ label, value }) {
  return (
    <div className={`${TILE} border-line bg-surface-2`}>
      <div className="text-h1 font-serif font-bold text-ink">{value}</div>
      <div className="text-xs text-muted mt-1">{label}</div>
    </div>
  );
}

// "Cards due" — the one actionable stat. When there are due cards it's a real
// button (accent tint + border + "Review →" cue) that opens the flashcards
// session (which already surfaces due cards first — no new scheduling). At 0
// it's a calm, non-interactive "All caught up" tile. Signalled by border +
// directional cue as well as hue, so it reads without relying on colour.
function CardsDueTile({ dueCount, onReview }) {
  if (dueCount === null) {
    return (
      <div className={`${TILE} border-line bg-surface-2`}>
        <div className="text-h1 font-serif font-bold text-muted">…</div>
        <div className="text-xs text-muted mt-1">Cards due</div>
      </div>
    );
  }

  if (dueCount === 0) {
    return (
      <div className={`${TILE} border-line bg-surface-2`}>
        <CheckIcon size={22} className="text-muted" />
        <div className="text-xs text-muted mt-1.5">All caught up</div>
      </div>
    );
  }

  return (
    <button
      onClick={onReview}
      aria-label={`Review ${dueCount} cards due`}
      className={`${TILE} border-accent/40 bg-accent/10 hover:bg-accent/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface`}
    >
      <div className="text-h1 font-serif font-bold text-accent-strong">{dueCount}</div>
      <div className="mt-1 flex items-center gap-0.5 text-xs font-semibold text-accent-strong">
        Review
        <ArrowRightIcon size={13} strokeWidth={2.25} />
      </div>
    </button>
  );
}

export default function Dashboard({ stats, onSelect, onReset }) {
  const accuracy = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
  const weakSpots = weakCategories(stats.errorCats);
  const [aiOn, setAiOn] = useState(isAiEnabled());

  const toggleAi = () => {
    setAiEnabled(!aiOn);
    setAiOn(!aiOn);
  };

  // The flashcard bank is a lazy chunk (see lib/queue.js), so the due count
  // is computed after mount instead of shipping the data in the main bundle.
  const [dueCount, setDueCount] = useState(null);
  useEffect(() => {
    let active = true;
    import('../data/flashcards.js').then(({ FLASHCARDS }) => {
      if (!active) return;
      setDueCount(
        FLASHCARDS.filter((c) => {
          const e = stats.srs[c.id];
          return !e || dayDiff(e.due, todayStr()) >= 0;
        }).length
      );
    });
    return () => {
      active = false;
    };
  }, [stats.srs]);

  return (
    <div className="space-y-6">
      {/* Progress overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif font-bold text-ink text-h2">Your progress</h2>
          <Pill className="bg-accent/10 text-accent-strong">
            <FlameIcon size={14} strokeWidth={2} />
            {stats.streak} day streak
          </Pill>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatTile label="Answered" value={stats.answered} />
          <StatTile label="Accuracy" value={`${accuracy}%`} />
          <StatTile label="Sessions" value={stats.sessions} />
          <CardsDueTile dueCount={dueCount} onReview={() => onSelect('flashcards', 'Due cards')} />
        </div>
        {stats.answered > 0 && (
          <div className="mt-5">
            <div className="flex justify-between text-xs text-muted mb-1">
              <span>Overall accuracy</span>
              <span>
                {stats.correct}/{stats.answered}
              </span>
            </div>
            <ProgressBar value={stats.correct} total={stats.answered} />
          </div>
        )}
      </Card>

      {/* Focus areas: the learner's weakest grammar categories. Sessions are
          automatically biased toward these (see lib/queue.js). */}
      {weakSpots.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-ink text-h2">Focus areas</h2>
            <Pill className="bg-warning/10 text-warning-strong">
              <TargetIcon size={14} strokeWidth={2} />
              auto-practised more often
            </Pill>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {weakSpots.map((w) => (
              <div key={w.cat} className="rounded-xl border border-line bg-surface-2 p-4">
                <div className="font-semibold text-ink text-sm">{w.label}</div>
                <div className="text-xs text-muted mt-0.5">{w.hint}</div>
                <div className="mt-3">
                  <ProgressBar value={w.total - w.wrong} total={w.total} />
                  <div className="mt-1 flex justify-between text-xs text-muted">
                    <span>{w.accuracy}% right</span>
                    <span>
                      {w.wrong} {w.wrong === 1 ? 'mistake' : 'mistakes'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Mixed practice highlight — the primary CTA, accent-filled. */}
      <button
        onClick={() => onSelect('mixed', 'Mixed Practice')}
        className="w-full text-left rounded-2xl p-6 bg-accent-strong text-on-accent shadow-soft hover:bg-accent-hover transition-colors active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-serif font-bold text-h2">
              <ShuffleIcon size={20} strokeWidth={2} />
              Mixed Practice Mode
            </div>
            <p className="text-on-accent/80 text-sm mt-1">
              A random mix of all exercise types — the best test of active recall.
            </p>
          </div>
          <ArrowRightIcon size={24} />
        </div>
      </button>

      {/* Exercise types */}
      <div>
        <h2 className="font-serif font-bold text-ink text-h2 mb-4">Choose an exercise</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const CatIcon = CATEGORY_ICONS[cat.key];
            const agg = cat.skills.reduce(
              (acc, sk) => {
                const s = stats.bySkill[sk];
                if (s) {
                  acc.a += s.answered;
                  acc.c += s.correct;
                }
                return acc;
              },
              { a: 0, c: 0 }
            );
            const acc = agg.a ? Math.round((agg.c / agg.a) * 100) : null;
            return (
              <button
                key={cat.key}
                onClick={() => onSelect(cat.key, cat.title)}
                className="text-left rounded-2xl bg-surface border border-line shadow-soft p-5 hover:-translate-y-0.5 hover:border-accent/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent-strong">
                  {CatIcon && <CatIcon size={22} />}
                </span>
                <h3 className="mt-3 font-semibold text-ink">{cat.title}</h3>
                <p className="text-sm text-muted mt-1 leading-snug">{cat.blurb}</p>
                <div className="mt-4 flex items-center justify-between">
                  {acc !== null ? (
                    <Pill className="bg-accent/10 text-accent-strong">
                      {acc}% · {agg.a} done
                    </Pill>
                  ) : (
                    <Pill className="bg-ink/5 text-muted">Not started</Pill>
                  )}
                  <span className="flex items-center gap-1 text-accent-strong font-semibold text-sm">
                    Start
                    <ArrowRightIcon size={15} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings row */}
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-ink text-sm">
              <SparkleIcon size={15} className="text-accent-strong" />
              AI tutor feedback
            </div>
            <p className="text-xs text-muted mt-0.5">
              {aiOn
                ? `On · up to ${aiRequestsRemaining()}/${AI_DAILY_CAP} live requests left today · needs a server API key to work`
                : 'Off (default) · live feedback on conversation practice & wrong answers · never costs anything while off'}
            </p>
          </div>
          <button
            onClick={toggleAi}
            role="switch"
            aria-checked={aiOn}
            aria-label="Toggle AI tutor feedback"
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
              aiOn ? 'bg-accent-strong' : 'bg-ink/15'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow transition-all ${aiOn ? 'left-[22px]' : 'left-0.5'}`}
            />
          </button>
        </div>
      </Card>

      <div className="text-center">
        <button
          onClick={onReset}
          className="text-xs text-muted hover:text-warning-strong transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Reset all progress
        </button>
      </div>
    </div>
  );
}
