// Grammar identification (multiple choice) — tense, subject, case, word order.
// errorCat = the grammar category the item exercises (see lib/errors.js).
export const GRAMMAR_MC = [
  // ——— Level 1 (A1–A2) ———
  { id: 'gr1', level: 1, errorCat: 'tense', question: 'Which tense is this sentence?', sentence: 'Ich habe einen Brief geschrieben.', options: ['Präsens', 'Perfekt', 'Präteritum', 'Futur I'], answer: 'Perfekt', explanation: '"haben/sein" + past participle (geschrieben) = Perfekt, used for the spoken past.' },
  { id: 'gr5', level: 1, errorCat: 'tense', question: 'Which tense is this sentence?', sentence: 'Wir spielen heute Fußball.', options: ['Präsens', 'Perfekt', 'Futur I', 'Präteritum'], answer: 'Präsens', explanation: 'One verb in its present form = Präsens. German also uses it for the near future.' },
  { id: 'gr6', level: 1, errorCat: 'case', question: 'What is the SUBJECT of the sentence?', sentence: 'Am Abend liest die Mutter ein Buch.', options: ['Am Abend', 'die Mutter', 'ein Buch', 'liest'], answer: 'die Mutter', explanation: 'The subject can follow the verb when something else takes position 1: who reads? — die Mutter.' },

  // ——— Level 2 (A2–B1) ———
  { id: 'gr2', level: 2, errorCat: 'tense', question: 'Which tense is this sentence?', sentence: 'Ich werde morgen arbeiten.', options: ['Präsens', 'Perfekt', 'Futur I', 'Präteritum'], answer: 'Futur I', explanation: '"werden" + infinitive (arbeiten) = Futur I, used for the future.' },
  { id: 'gr3', level: 2, errorCat: 'case', question: 'What is the SUBJECT of the sentence?', sentence: 'Der kleine Junge isst einen Apfel.', options: ['einen Apfel', 'Der kleine Junge', 'isst', 'Apfel'], answer: 'Der kleine Junge', explanation: 'The subject (nominative) does the action: "Der kleine Junge" (who is eating).' },
  { id: 'gr7', level: 2, errorCat: 'tense', question: 'Which tense is this sentence?', sentence: 'Sie ist nach Hause gefahren.', options: ['Präsens', 'Perfekt', 'Präteritum', 'Futur I'], answer: 'Perfekt', explanation: 'Movement verbs build the Perfekt with "sein": ist + gefahren.' },
  { id: 'gr8', level: 2, errorCat: 'case', question: 'Which case is "den Hund" in?', sentence: 'Ich füttere den Hund jeden Morgen.', options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'], answer: 'Akkusativ', explanation: '"den Hund" is the direct object of "füttern" → accusative (der → den).' },
  { id: 'gr9', level: 2, errorCat: 'word-order', question: 'Which sentence has the correct word order?', sentence: '"Today I am going to the cinema."', options: ['Heute ich gehe ins Kino.', 'Heute gehe ich ins Kino.', 'Heute ins Kino ich gehe.', 'Ich heute gehe ins Kino.'], answer: 'Heute gehe ich ins Kino.', explanation: 'The conjugated verb must be in position 2. With "Heute" first, the subject moves after the verb.' },

  // ——— Level 3 (B1) ———
  { id: 'gr4', level: 3, errorCat: 'case', question: 'Which case is "dem Kind" in?', sentence: 'Ich gebe dem Kind ein Buch.', options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'], answer: 'Dativ', explanation: '"dem Kind" is the indirect object (the receiver) → Dative case.' },
  { id: 'gr10', level: 3, errorCat: 'tense', question: 'Which tense is this sentence?', sentence: 'Als Kind spielte er oft im Park.', options: ['Präsens', 'Perfekt', 'Präteritum', 'Futur I'], answer: 'Präteritum', explanation: 'The -te ending on the verb stem (spielte) marks the Präteritum, common in writing and storytelling.' },
  { id: 'gr11', level: 3, errorCat: 'case', question: 'Which case is "meiner Schwester" in?', sentence: 'Ich schenke meiner Schwester eine Kette.', options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'], answer: 'Dativ', explanation: 'The person receiving the gift is the indirect object → dative: meine Schwester → meiner Schwester.' },
  { id: 'gr12', level: 3, errorCat: 'word-order', question: 'Which sentence is correct?', sentence: '"I bought a car."', options: ['Ich habe gekauft ein Auto.', 'Ich habe ein Auto gekauft.', 'Ich gekauft habe ein Auto.', 'Ich ein Auto habe gekauft.'], answer: 'Ich habe ein Auto gekauft.', explanation: 'In the Perfekt, the past participle (gekauft) goes to the END of the sentence.' },
];

// Error correction — rewrite the sentence correctly.
export const CORRECTIONS = [
  // ——— Level 1 (A1–A2) ———
  { id: 'cor1', level: 1, errorCat: 'conjugation', wrong: 'Er gehen in die Schule.', accept: ['Er geht in die Schule.', 'Er geht in die Schule'], hint: 'check the verb ending', explanation: 'For "er" the verb "gehen" becomes "geht".' },
  { id: 'cor4', level: 1, errorCat: 'gender', wrong: 'Ich habe eine Hund.', accept: ['Ich habe einen Hund.', 'Ich habe einen Hund'], hint: 'gender + case', explanation: '"Hund" is masculine; as the direct object it takes the accusative: einen Hund.' },
  { id: 'cor5', level: 1, errorCat: 'vocab', wrong: 'Er hat zwei Schwester.', accept: ['Er hat zwei Schwestern.', 'Er hat zwei Schwestern'], hint: 'plural form', explanation: 'The plural of "Schwester" is "Schwestern": zwei Schwestern.' },

  // ——— Level 2 (A2–B1) ———
  { id: 'cor2', level: 2, errorCat: 'case', wrong: 'Ich sehe der Mann.', accept: ['Ich sehe den Mann.', 'Ich sehe den Mann'], hint: 'direct object case', explanation: '"sehen" takes the accusative. Masculine "der" becomes "den": "Ich sehe den Mann."' },
  { id: 'cor6', level: 2, errorCat: 'word-order', wrong: 'Heute ich lerne Deutsch.', accept: ['Heute lerne ich Deutsch.', 'Heute lerne ich Deutsch'], hint: 'verb position', explanation: 'The verb must stay in position 2: "Heute lerne ich Deutsch."' },
  { id: 'cor7', level: 2, errorCat: 'case', wrong: 'Ich danke der Mann.', accept: ['Ich danke dem Mann.', 'Ich danke dem Mann'], hint: 'which case does "danken" take?', explanation: '"danken" takes the dative: der Mann → dem Mann.' },
  { id: 'cor8', level: 2, errorCat: 'gender', wrong: 'Das ist ein schöne Stadt.', accept: ['Das ist eine schöne Stadt.', 'Das ist eine schöne Stadt'], hint: 'article', explanation: '"Stadt" is feminine: eine schöne Stadt.' },

  // ——— Level 3 (B1) ———
  { id: 'cor3', level: 3, errorCat: 'tense', wrong: 'Ich habe nach Hause gegangen.', accept: ['Ich bin nach Hause gegangen.', 'Ich bin nach Hause gegangen'], hint: 'auxiliary verb', explanation: '"gehen" is a movement verb, so the Perfekt uses "sein": "Ich bin … gegangen."' },
  { id: 'cor9', level: 3, errorCat: 'tense', wrong: 'Gestern habe ich krank.', accept: ['Gestern war ich krank.', 'Gestern war ich krank'], hint: 'which verb is missing?', explanation: 'For states in the past German prefers the Präteritum of "sein": "Gestern war ich krank."' },
  { id: 'cor10', level: 3, errorCat: 'word-order', wrong: 'Ich weiß, dass du hast recht.', accept: ['Ich weiß, dass du recht hast.', 'Ich weiss, dass du recht hast', 'Ich weiß, dass du Recht hast.', 'Ich weiss, dass du Recht hast'], hint: 'verb position in the "dass" clause', explanation: 'In a "dass" clause the conjugated verb goes to the end: "…, dass du recht hast."' },
];
