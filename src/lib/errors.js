// Error-pattern taxonomy. Exercise items carry an `errorCat` naming the
// grammar point they exercise; a wrong answer counts against that category.
// (This is item-level classification — honest and reliable. Linguistically
// classifying the learner's typed answer itself would need NLP and would
// guess wrong often enough to mistrain the bias.)

export const ERROR_CATEGORIES = {
  gender: { label: 'Noun gender', hint: 'der / die / das' },
  case: { label: 'Cases', hint: 'Akkusativ & Dativ endings' },
  conjugation: { label: 'Verb conjugation', hint: 'endings like -e, -st, -t' },
  'word-order': { label: 'Word order', hint: 'verb position & clause structure' },
  tense: { label: 'Tenses', hint: 'Perfekt, Präteritum, Futur & auxiliaries' },
  vocab: { label: 'Vocabulary', hint: 'word choice & meaning' },
};

// The learner's weakest categories: needs at least `minAttempts` attempts and
// one real mistake to qualify (avoids flagging a category off a single slip
// with no volume). Ranked by mistake count, then by lowest accuracy.
export const weakCategories = (errorCats, { top = 3, minAttempts = 2 } = {}) =>
  Object.entries(errorCats || {})
    .filter(([cat, c]) => ERROR_CATEGORIES[cat] && c && c.wrong >= 1 && c.total >= minAttempts)
    .sort(([, a], [, b]) => b.wrong - a.wrong || a.total / Math.max(a.wrong, 1) - b.total / Math.max(b.wrong, 1))
    .slice(0, top)
    .map(([cat, c]) => ({
      cat,
      label: ERROR_CATEGORIES[cat].label,
      hint: ERROR_CATEGORIES[cat].hint,
      wrong: c.wrong,
      total: c.total,
      accuracy: Math.round(((c.total - c.wrong) / c.total) * 100),
    }));
