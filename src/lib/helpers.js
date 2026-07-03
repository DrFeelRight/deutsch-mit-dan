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

// -----------------------------------------------------------------------------
// Spaced repetition (Leitner boxes). Box 0 = new / relearning.
// -----------------------------------------------------------------------------

export const SRS_INTERVALS = [0, 1, 2, 4, 7, 14]; // days until next review, by box

export const nextSrs = (entry, rating) => {
  let box = entry ? entry.box : 0;
  if (rating === 'again') box = 0;
  else if (rating === 'good') box = Math.min(box + 1, 5);
  else if (rating === 'easy') box = Math.min(box + 2, 5);
  return { box, due: addDays(todayStr(), SRS_INTERVALS[box]) };
};
