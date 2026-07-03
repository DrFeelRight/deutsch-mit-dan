import { useState, useEffect, useCallback } from 'react';
import { nextSrs, todayStr, dayDiff } from '../lib/helpers.js';
import { loadStats, saveStats } from '../lib/storage.js';

export const DEFAULT_STATS = {
  answered: 0,
  correct: 0,
  sessions: 0,
  streak: 0,
  lastActive: null,
  bySkill: {}, // skill -> { answered, correct }
  srs: {}, // cardId -> { box, due }
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
  const recordAnswer = useCallback((skill, correct) => {
    setStats((s) => {
      const prev = s.bySkill[skill] || { answered: 0, correct: 0 };
      return {
        ...s,
        answered: s.answered + 1,
        correct: s.correct + (correct ? 1 : 0),
        bySkill: {
          ...s.bySkill,
          [skill]: { answered: prev.answered + 1, correct: prev.correct + (correct ? 1 : 0) },
        },
      };
    });
  }, []);

  const rateCard = useCallback((cardId, rating) => {
    setStats((s) => ({ ...s, srs: { ...s.srs, [cardId]: nextSrs(s.srs[cardId], rating) } }));
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
