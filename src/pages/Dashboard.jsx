import { useEffect, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Pill from '../components/ui/Pill.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { CATEGORIES } from '../data/categories.js';
import { dayDiff, todayStr } from '../lib/helpers.js';

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

      <div className="text-center pt-2">
        <button onClick={onReset} className="text-xs text-slate-400 hover:text-rose-500 transition-colors">
          Reset all progress
        </button>
      </div>
    </div>
  );
}
