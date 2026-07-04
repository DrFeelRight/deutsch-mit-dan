import { useEffect, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Pill from '../components/ui/Pill.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { CATEGORIES } from '../data/categories.js';
import { dayDiff, todayStr } from '../lib/helpers.js';
import { weakCategories } from '../lib/errors.js';
import { isAiEnabled, setAiEnabled, aiRequestsRemaining, AI_DAILY_CAP } from '../lib/ai.js';

function StatBox({ label, value, accent }) {
  return (
    <div className="flex-1 text-center">
      <div className={`text-2xl sm:text-3xl font-extrabold ${accent}`}>{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
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
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-slate-800 text-lg">Your progress</h2>
          <Pill className="bg-orange-50 text-orange-600">🔥 {stats.streak} day streak</Pill>
        </div>
        <div className="flex items-stretch divide-x divide-slate-100">
          <StatBox label="Answered" value={stats.answered} accent="text-slate-800" />
          <StatBox label="Accuracy" value={`${accuracy}%`} accent="text-emerald-600" />
          <StatBox label="Sessions" value={stats.sessions} accent="text-brand-600" />
          <StatBox label="Cards due" value={dueCount === null ? '…' : dueCount} accent="text-orange-500" />
        </div>
        {stats.answered > 0 && (
          <div className="mt-5">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
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
            <h2 className="font-bold text-slate-800 text-lg">Focus areas</h2>
            <Pill className="bg-rose-50 text-rose-600">🎯 auto-practised more often</Pill>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {weakSpots.map((w) => (
              <div key={w.cat} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="font-semibold text-slate-800 text-sm">{w.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{w.hint}</div>
                <div className="mt-3">
                  <ProgressBar value={w.total - w.wrong} total={w.total} />
                  <div className="mt-1 flex justify-between text-xs text-slate-500">
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

      {/* Mixed practice highlight */}
      <button
        onClick={() => onSelect('mixed', 'Mixed Practice')}
        className="w-full text-left rounded-2xl p-6 bg-gradient-to-r from-brand-600 to-indigo-500 text-white shadow-soft hover:shadow-lg transition-shadow active:scale-[.99]"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg">🎲 Mixed Practice Mode</div>
            <p className="text-brand-100 text-sm mt-1">
              A random mix of all exercise types — the best test of active recall.
            </p>
          </div>
          <span className="text-2xl">→</span>
        </div>
      </button>

      {/* Exercise types */}
      <div>
        <h2 className="font-bold text-slate-800 text-lg mb-3">Choose an exercise</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
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
                className="text-left rounded-2xl bg-white border border-slate-100 shadow-soft p-5 hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                <div className="text-3xl">{cat.emoji}</div>
                <h3 className="mt-3 font-bold text-slate-800">{cat.title}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-snug">{cat.blurb}</p>
                <div className="mt-4 flex items-center justify-between">
                  {acc !== null ? (
                    <Pill className="bg-emerald-50 text-emerald-600">
                      {acc}% · {agg.a} done
                    </Pill>
                  ) : (
                    <Pill className="bg-slate-100 text-slate-400">Not started</Pill>
                  )}
                  <span className="text-brand-500 font-semibold text-sm">Start →</span>
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
            <div className="font-semibold text-slate-700 text-sm">✨ AI tutor feedback</div>
            <p className="text-xs text-slate-400 mt-0.5">
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
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${aiOn ? 'bg-brand-500' : 'bg-slate-200'}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${aiOn ? 'left-[22px]' : 'left-0.5'}`}
            />
          </button>
        </div>
      </Card>

      <div className="text-center pt-2">
        <button onClick={onReset} className="text-xs text-slate-400 hover:text-rose-500 transition-colors">
          Reset all progress
        </button>
      </div>
    </div>
  );
}
