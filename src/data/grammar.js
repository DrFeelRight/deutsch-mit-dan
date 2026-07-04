// Grammar identification (multiple choice) — tense, subject, case.
// errorCat = the grammar category the item exercises (see lib/errors.js).
export const GRAMMAR_MC = [
  { id: 'gr1', level: 1, errorCat: 'tense', question: 'Which tense is this sentence?', sentence: 'Ich habe einen Brief geschrieben.', options: ['Präsens', 'Perfekt', 'Präteritum', 'Futur I'], answer: 'Perfekt', explanation: '"haben/sein" + past participle (geschrieben) = Perfekt, used for the spoken past.' },
  { id: 'gr2', level: 2, errorCat: 'tense', question: 'Which tense is this sentence?', sentence: 'Ich werde morgen arbeiten.', options: ['Präsens', 'Perfekt', 'Futur I', 'Präteritum'], answer: 'Futur I', explanation: '"werden" + infinitive (arbeiten) = Futur I, used for the future.' },
  { id: 'gr3', level: 2, errorCat: 'case', question: 'What is the SUBJECT of the sentence?', sentence: 'Der kleine Junge isst einen Apfel.', options: ['einen Apfel', 'Der kleine Junge', 'isst', 'Apfel'], answer: 'Der kleine Junge', explanation: 'The subject (nominative) does the action: "Der kleine Junge" (who is eating).' },
  { id: 'gr4', level: 3, errorCat: 'case', question: 'Which case is "dem Kind" in?', sentence: 'Ich gebe dem Kind ein Buch.', options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'], answer: 'Dativ', explanation: '"dem Kind" is the indirect object (the receiver) → Dative case.' },
];

// Error correction — rewrite the sentence correctly.
export const CORRECTIONS = [
  { id: 'cor1', level: 1, errorCat: 'conjugation', wrong: 'Er gehen in die Schule.', accept: ['Er geht in die Schule.', 'Er geht in die Schule'], hint: 'check the verb ending', explanation: 'For "er" the verb "gehen" becomes "geht".' },
  { id: 'cor2', level: 2, errorCat: 'case', wrong: 'Ich sehe der Mann.', accept: ['Ich sehe den Mann.', 'Ich sehe den Mann'], hint: 'direct object case', explanation: '"sehen" takes the accusative. Masculine "der" becomes "den": "Ich sehe den Mann."' },
  { id: 'cor3', level: 3, errorCat: 'tense', wrong: 'Ich habe nach Hause gegangen.', accept: ['Ich bin nach Hause gegangen.', 'Ich bin nach Hause gegangen'], hint: 'auxiliary verb', explanation: '"gehen" is a movement verb, so the Perfekt uses "sein": "Ich bin … gegangen."' },
];
