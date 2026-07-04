// FSRS (Free Spaced Repetition Scheduler) — dependency-free port of the
// published FSRS-4.5 algorithm with its default parameters.
//
// Why a port instead of a library: the whole scheduler is ~80 lines and the
// app has a zero-dependency policy for runtime code (Stream 1). ts-fsrs would
// add ~30 kB plus Date/timezone machinery we don't need — this app schedules
// in whole local days.
//
// Grade mapping keeps the existing UI: 'again' -> 1, 'good' -> 3, 'easy' -> 4.
// (FSRS grade 2 "hard" exists in the algorithm but has no button; the math
// still supports it if one is added later.)
//
// Card entry shape (stored in stats.srs):
//   { s: stability(days), d: difficulty(1..10), due: 'YYYY-MM-DD',
//     last: 'YYYY-MM-DD', reps, lapses }

import { addDays, dayDiff, todayStr } from './helpers.js';

// FSRS-4.5 default weights w0..w16.
const W = [
  0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474,
  0.1367, 1.0461, 2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755,
];

const DECAY = -0.5;
const FACTOR = 19 / 81; // chosen so R(S, S) = 0.9
const REQUEST_RETENTION = 0.9;
const MAX_INTERVAL_DAYS = 180; // cap for a hobby learning app
const GRADE = { again: 1, hard: 2, good: 3, easy: 4 };

const clampD = (d) => Math.min(10, Math.max(1, d));

// Probability of recall after t days at stability s.
export const retrievability = (t, s) => Math.pow(1 + (FACTOR * t) / s, DECAY);

// Days until retrievability decays to the requested retention.
const nextIntervalDays = (s) => {
  const days = Math.round((s / FACTOR) * (Math.pow(REQUEST_RETENTION, 1 / DECAY) - 1));
  return Math.min(MAX_INTERVAL_DAYS, Math.max(1, days));
};

const initStability = (g) => Math.max(W[g - 1], 0.1);
const initDifficulty = (g) => clampD(W[4] - W[5] * (g - 3));

const nextDifficulty = (d, g) => {
  const next = d - W[6] * (g - 3);
  // Mean reversion toward D0(easy) prevents difficulty from saturating.
  return clampD(W[7] * initDifficulty(GRADE.easy) + (1 - W[7]) * next);
};

const stabilityAfterRecall = (s, d, r, g) => {
  const hardPenalty = g === GRADE.hard ? W[15] : 1;
  const easyBonus = g === GRADE.easy ? W[16] : 1;
  return s * (1 + Math.exp(W[8]) * (11 - d) * Math.pow(s, -W[9]) * (Math.expm1(W[10] * (1 - r))) * hardPenalty * easyBonus);
};

const stabilityAfterForget = (s, d, r) => {
  const sf = W[11] * Math.pow(d, -W[12]) * (Math.pow(s + 1, W[13]) - 1) * Math.exp(W[14] * (1 - r));
  return Math.min(sf, s); // forgetting never increases stability
};

// Advance a card. `entry` may be undefined (new card). Returns the new entry.
export const fsrsNext = (entry, rating, today = todayStr()) => {
  const g = GRADE[rating] ?? GRADE.good;

  if (!entry || typeof entry.s !== 'number') {
    // First rating of a new card.
    const s = initStability(g);
    const d = initDifficulty(g);
    return {
      s,
      d,
      // 'again' keeps the card due today so it reappears within the session flow.
      due: g === GRADE.again ? today : addDays(today, nextIntervalDays(s)),
      last: today,
      reps: 1,
      lapses: g === GRADE.again ? 1 : 0,
    };
  }

  const elapsed = Math.max(0, dayDiff(entry.last, today));
  const r = retrievability(elapsed, entry.s);
  const d = nextDifficulty(entry.d, g);

  if (g === GRADE.again) {
    const s = stabilityAfterForget(entry.s, entry.d, r);
    return { s, d, due: today, last: today, reps: entry.reps + 1, lapses: entry.lapses + 1 };
  }

  const s = stabilityAfterRecall(entry.s, entry.d, r, g);
  return { s, d, due: addDays(today, nextIntervalDays(s)), last: today, reps: entry.reps + 1, lapses: entry.lapses };
};

export const isDue = (entry, today = todayStr()) => !entry || dayDiff(entry.due, today) >= 0;

// Convert a legacy Leitner entry ({ box, due }) to an FSRS entry. Stability is
// seeded from the box's review interval — the best available estimate of how
// well the card was known.
const LEITNER_INTERVALS = [0, 1, 2, 4, 7, 14];
export const migrateLeitnerEntry = (entry, today = todayStr()) => {
  if (!entry || typeof entry.s === 'number') return entry; // already FSRS
  const box = typeof entry.box === 'number' ? Math.min(5, Math.max(0, entry.box)) : 0;
  const interval = LEITNER_INTERVALS[box];
  const due = typeof entry.due === 'string' ? entry.due : today;
  return {
    s: Math.max(interval, 0.5),
    d: 5, // neutral difficulty; FSRS refines it from future ratings
    due,
    last: addDays(due, -interval),
    reps: box,
    lapses: 0,
  };
};
