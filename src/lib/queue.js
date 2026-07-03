import { FLASHCARDS } from '../data/flashcards.js';
import { COMPLETIONS } from '../data/completions.js';
import { GRAMMAR_MC, CORRECTIONS } from '../data/grammar.js';
import { TRANSLATIONS, TRANSLATIONS_DE } from '../data/translations.js';
import { READINGS } from '../data/readings.js';
import { CONVERSATIONS } from '../data/conversations.js';
import { shuffle, dayDiff, todayStr } from './helpers.js';

// Every queue item is tagged with a `kind` so the session knows how to render it.
const tag = (arr, kind) => arr.map((x) => ({ ...x, kind }));

// Gradual difficulty progression: easiest items first.
const byLevel = (a, b) => a.level - b.level;

// Flatten each reading passage's questions into standalone items that still
// carry the passage text.
const readingItems = () =>
  [...READINGS].sort(byLevel).flatMap((r) =>
    r.questions.map((q) => ({ ...q, kind: 'reading', level: r.level, passage: r.passage, passageId: r.id }))
  );

// Build the ordered list of items for a chosen category (or "mixed").
export const buildQueue = (key, srs = {}) => {
  switch (key) {
    case 'flashcards': {
      // Prefer cards that are due (or new), then fill up to 10.
      const scored = FLASHCARDS.map((c) => {
        const e = srs[c.id];
        const overdue = e ? dayDiff(e.due, todayStr()) : 999; // higher = more due / new
        return { c, overdue, box: e ? e.box : 0 };
      }).sort((a, b) => b.overdue - a.overdue || a.box - b.box);
      return tag(scored.slice(0, 10).map((s) => s.c), 'flashcard');
    }
    case 'completion':
      return tag([...COMPLETIONS].sort(byLevel), 'completion');
    case 'grammar':
      return [
        ...tag([...GRAMMAR_MC].sort(byLevel), 'grammar'),
        ...tag([...CORRECTIONS].sort(byLevel), 'correction'),
      ].sort(byLevel);
    case 'translation':
      return [
        ...tag([...TRANSLATIONS].sort(byLevel), 'translation'),
        ...tag([...TRANSLATIONS_DE].sort(byLevel), 'translationDE'),
      ];
    case 'reading':
      return readingItems();
    case 'conversation':
      return tag([...CONVERSATIONS].sort(byLevel), 'conversation');
    case 'mixed': {
      const pool = [
        ...tag(COMPLETIONS, 'completion'),
        ...tag(GRAMMAR_MC, 'grammar'),
        ...tag(CORRECTIONS, 'correction'),
        ...tag(TRANSLATIONS, 'translation'),
        ...tag(TRANSLATIONS_DE, 'translationDE'),
        ...READINGS.flatMap((r) => r.questions.map((q) => ({ ...q, kind: 'reading', level: r.level, passage: r.passage }))),
        ...tag(FLASHCARDS, 'flashcard'),
      ];
      return shuffle(pool).slice(0, 10);
    }
    default:
      return [];
  }
};
