import { shuffle, dayDiff, todayStr } from './helpers.js';

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

// Flatten each reading passage's questions into standalone items that still
// carry the passage text.
const toReadingItems = (readings) =>
  [...readings].sort(byLevel).flatMap((r) =>
    r.questions.map((q) => ({ ...q, kind: 'reading', level: r.level, passage: r.passage, passageId: r.id }))
  );

// Build the ordered list of items for a chosen category (or "mixed").
// Async: resolves once the needed content chunk(s) have loaded.
export const buildQueue = async (key, srs = {}) => {
  switch (key) {
    case 'flashcards': {
      const cards = await loadFlashcards();
      // Prefer cards that are due (or new), then fill up to 10.
      const scored = cards
        .map((c) => {
          const e = srs[c.id];
          const overdue = e ? dayDiff(e.due, todayStr()) : 999; // higher = more due / new
          return { c, overdue, box: e ? e.box : 0 };
        })
        .sort((a, b) => b.overdue - a.overdue || a.box - b.box);
      return tag(scored.slice(0, 10).map((s) => s.c), 'flashcard');
    }
    case 'completion': {
      const completions = await loadCompletions();
      return tag([...completions].sort(byLevel), 'completion');
    }
    case 'grammar': {
      const { GRAMMAR_MC, CORRECTIONS } = await loadGrammar();
      return [
        ...tag([...GRAMMAR_MC].sort(byLevel), 'grammar'),
        ...tag([...CORRECTIONS].sort(byLevel), 'correction'),
      ].sort(byLevel);
    }
    case 'translation': {
      const { TRANSLATIONS, TRANSLATIONS_DE } = await loadTranslations();
      return [
        ...tag([...TRANSLATIONS].sort(byLevel), 'translation'),
        ...tag([...TRANSLATIONS_DE].sort(byLevel), 'translationDE'),
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
      return shuffle(pool).slice(0, 10);
    }
    default:
      return [];
  }
};
