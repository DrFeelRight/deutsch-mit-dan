import { shuffle, weightedSample, dayDiff, todayStr } from './helpers.js';

// Content banks are loaded with dynamic import() so Vite splits each data
// file into its own chunk. A bank is fetched (once — the module cache keeps
// it) only when a session that needs it starts, keeping it out of the
// initial bundle.
const loadFlashcards = async () => (await import('../data/flashcards.js')).FLASHCARDS;
const loadCompletions = async () => (await import('../data/completions.js')).COMPLETIONS;
const loadGrammar = () => import('../data/grammar.js'); // { GRAMMAR_MC, CORRECTIONS }
const loadTranslations = () => import('../data/translations.js'); // { TRANSLATIONS, TRANSLATIONS_DE }
const loadReadings = async () => (await import('../data/readings.js')).READINGS;
const loadConversations = async () => (await import('../data/conversations.js')).CONVERSATIONS;

// Every queue item is tagged with a `kind` so the session knows how to render it.
const tag = (arr, kind) => arr.map((x) => ({ ...x, kind }));

// Gradual difficulty progression: easiest items first.
const byLevel = (a, b) => a.level - b.level;

// Weak-category bias. Difficulty progression stays primary (level ascending);
// within a level, items exercising the learner's weak categories come first.
const sortWithBias = (items, weakCats) => {
  const weak = new Set(weakCats);
  return [...items].sort(
    (a, b) => a.level - b.level || (weak.has(b.errorCat) ? 1 : 0) - (weak.has(a.errorCat) ? 1 : 0)
  );
};

// Mixed practice: weak-category items are 3x as likely to be drawn, but
// nothing is ever excluded.
const WEAK_WEIGHT = 3;

// Flatten each reading passage's questions into standalone items that still
// carry the passage text.
const toReadingItems = (readings) =>
  [...readings].sort(byLevel).flatMap((r) =>
    r.questions.map((q) => ({ ...q, kind: 'reading', level: r.level, passage: r.passage, passageId: r.id }))
  );

// Build the ordered list of items for a chosen category (or "mixed").
// Async: resolves once the needed content chunk(s) have loaded.
// weakCats: category keys the learner struggles with (see lib/errors.js) —
// session generation is biased toward them.
export const buildQueue = async (key, srs = {}, weakCats = []) => {
  switch (key) {
    case 'flashcards': {
      const cards = await loadFlashcards();
      // Prefer cards that are due (or new), then the least-reviewed.
      const scored = cards
        .map((c) => {
          const e = srs[c.id];
          const overdue = e ? dayDiff(e.due, todayStr()) : 999; // higher = more due / new
          return { c, overdue, reps: e ? e.reps || 0 : 0 };
        })
        .sort((a, b) => b.overdue - a.overdue || a.reps - b.reps);
      return tag(scored.slice(0, 10).map((s) => s.c), 'flashcard');
    }
    case 'completion': {
      const completions = await loadCompletions();
      return tag(sortWithBias(completions, weakCats), 'completion');
    }
    case 'grammar': {
      const { GRAMMAR_MC, CORRECTIONS } = await loadGrammar();
      return sortWithBias(
        [...tag(GRAMMAR_MC, 'grammar'), ...tag(CORRECTIONS, 'correction')],
        weakCats
      );
    }
    case 'translation': {
      const { TRANSLATIONS, TRANSLATIONS_DE } = await loadTranslations();
      return [
        ...tag(sortWithBias(TRANSLATIONS, weakCats), 'translation'),
        ...tag(sortWithBias(TRANSLATIONS_DE, weakCats), 'translationDE'),
      ];
    }
    case 'reading':
      return toReadingItems(await loadReadings());
    case 'conversation':
      return tag([...(await loadConversations())].sort(byLevel), 'conversation');
    case 'mixed': {
      const [flashcards, completions, { GRAMMAR_MC, CORRECTIONS }, { TRANSLATIONS, TRANSLATIONS_DE }, readings] =
        await Promise.all([loadFlashcards(), loadCompletions(), loadGrammar(), loadTranslations(), loadReadings()]);
      const pool = [
        ...tag(completions, 'completion'),
        ...tag(GRAMMAR_MC, 'grammar'),
        ...tag(CORRECTIONS, 'correction'),
        ...tag(TRANSLATIONS, 'translation'),
        ...tag(TRANSLATIONS_DE, 'translationDE'),
        ...readings.flatMap((r) => r.questions.map((q) => ({ ...q, kind: 'reading', level: r.level, passage: r.passage }))),
        ...tag(flashcards, 'flashcard'),
      ];
      const weak = new Set(weakCats);
      const picked = weak.size
        ? weightedSample(pool, (item) => (weak.has(item.errorCat) ? WEAK_WEIGHT : 1), 10)
        : shuffle(pool).slice(0, 10);
      return shuffle(picked); // weighted pick, then re-shuffle so order stays varied
    }
    default:
      return [];
  }
};
