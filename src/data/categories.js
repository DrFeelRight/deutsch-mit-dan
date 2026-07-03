// Dashboard tiles. `skills` lists which item kinds roll up into each tile's
// accuracy stat (see SKILL_LABEL for the per-item labels shown during a session).
export const CATEGORIES = [
  { key: 'flashcards', title: 'Flashcards', emoji: '🃏', blurb: 'German ↔ English with gender, examples & spaced repetition.', skills: ['flashcard'] },
  { key: 'completion', title: 'Sentence Completion', emoji: '✏️', blurb: 'Fill in verbs, articles & word order.', skills: ['completion'] },
  { key: 'grammar', title: 'Grammar & Correction', emoji: '🔎', blurb: 'Identify tense/case and fix mistakes.', skills: ['grammar', 'correction'] },
  { key: 'translation', title: 'Translation', emoji: '🔁', blurb: 'English → German (and back).', skills: ['translation', 'translationDE'] },
  { key: 'reading', title: 'Reading', emoji: '📖', blurb: 'Short texts with comprehension questions.', skills: ['reading'] },
  { key: 'conversation', title: 'Conversation', emoji: '💬', blurb: 'Real-life prompts with suggested answers.', skills: ['conversation'] },
];

// Friendly label for the pill shown at the top of each exercise card.
export const SKILL_LABEL = {
  flashcard: 'Flashcards',
  completion: 'Sentence Completion',
  grammar: 'Grammar ID',
  correction: 'Error Correction',
  translation: 'Translate EN→DE',
  translationDE: 'Translate DE→EN',
  reading: 'Reading',
  conversation: 'Conversation',
};
