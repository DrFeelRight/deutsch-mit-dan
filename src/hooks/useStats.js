import { useState, useEffect, useCallback } from 'react';
import { todayStr, dayDiff } from '../lib/helpers.js';
import { fsrsNext } from '../lib/fsrs.js';
import { loadStats, saveStats } from '../lib/storage.js';

export const DEFAULT_STATS = {
  answered: 0,
  correct: 0,
  sessions: 0,
  streak: 0,
  lastActive: null,
  bySkill: {}, // skill -> { answered, correct }
  srs: {}, // cardId -> FSRS entry { s, d, due, last, reps, lapses }
  errorCats: {}, // category -> { wrong, total }
};

// Persistent progress: overall + per-skill accuracy, streak and spaced-repetition
// state, all mirrored to localStorage through the versioned storage layer
// (schema migrations, corrupt-data quarantine — see lib/storage.js).
export function useStats() {
  const [stats, setStats] = useState(() => loadStats(DEFAULT_STATS));

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  // All updaters are useCallback([]) — they only touch setStats (stable), so
  // consumers can hold them in deps/memo without churn.
  // errorCat (optional) is the grammar category the item exercises; attempts
  // are tallied per category so weak areas can be surfaced and practised.
  const recordAnswer = useCallback((skill, correct, errorCat) => {
    setStats((s) => {
      const prev = s.bySkill[skill] || { answered: 0, correct: 0 };
      const next = {
        ...s,
        answered: s.answered + 1,
        correct: s.correct + (correct ? 1 : 0),
        bySkill: {
          ...s.bySkill,
          [skill]: { answered: prev.answered + 1, correct: prev.correct + (correct ? 1 : 0) },
        },
      };
      if (errorCat) {
        const cat = s.errorCats[errorCat] || { wrong: 0, total: 0 };
        next.errorCats = {
          ...s.errorCats,
          [errorCat]: { wrong: cat.wrong + (correct ? 0 : 1), total: cat.total + 1 },
        };
      }
      return next;
    });
  }, []);

  const rateCard = useCallback((cardId, rating) => {
    setStats((s) => ({ ...s, srs: { ...s.srs, [cardId]: fsrsNext(s.srs[cardId], rating) } }));
  }, []);

  const finishSession = useCallback(() => {
    setStats((s) => {
      const today = todayStr();
      let streak = s.streak;
      if (s.lastActive === today) {
        // already counted today — leave streak as-is
      } else if (s.lastActive && dayDiff(s.lastActive, today) === 1) {
        streak = s.streak + 1;
      } else {
        streak = 1;
      }
      return { ...s, sessions: s.sessions + 1, streak, lastActive: today };
    });
  }, []);

  const reset = useCallback(() => setStats(DEFAULT_STATS), []);

  return { stats, recordAnswer, rateCard, finishSession, reset };
}
