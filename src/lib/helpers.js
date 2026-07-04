// -----------------------------------------------------------------------------
// Answer grading
// -----------------------------------------------------------------------------

// Lenient normaliser so learners without a German keyboard can type "moechte"
// for "möchte", and so casing/punctuation/extra spaces don't cause false fails.
export const normalize = (s) =>
  (s || '')
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:„“”"'’()\-]/g, '')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ');

export const isMatch = (input, accepted) =>
  accepted.some((a) => normalize(a) === normalize(input));

// -----------------------------------------------------------------------------
// Dates
// -----------------------------------------------------------------------------

export const todayStr = () => new Date().toISOString().slice(0, 10);

export const addDays = (dateStr, n) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

// Whole days from a -> b (b later than a gives a positive number).
export const dayDiff = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);

// -----------------------------------------------------------------------------
// Misc
// -----------------------------------------------------------------------------

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Weighted sampling without replacement (Efraimidis–Spirakis): each item's
// chance of an early position scales with weightFn(item). Used to bias mixed
// practice toward weak categories without ever excluding anything.
export const weightedSample = (arr, weightFn, count) =>
  [...arr]
    .map((item) => ({ item, key: Math.pow(Math.random(), 1 / Math.max(weightFn(item), 0.0001)) }))
    .sort((a, b) => b.key - a.key)
    .slice(0, count)
    .map((x) => x.item);

// Spaced repetition now lives in lib/fsrs.js (FSRS-4.5). The legacy Leitner
// scheduler was removed in the same change; lib/storage.js migrates old data.
