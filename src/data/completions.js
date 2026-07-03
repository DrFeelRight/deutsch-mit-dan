// Fill-in-the-blank sentences focused on verbs, articles and word order.
export const COMPLETIONS = [
  { id: 'sc1', level: 1, prompt: 'Ich ___ Daniel.', accept: ['heiße', 'heisse', 'bin'], hint: 'verb: heißen / sein', translation: 'My name is Daniel.', explanation: 'With "ich" the verb "heißen" becomes "heiße". "Ich bin Daniel" also works.' },
  { id: 'sc2', level: 1, prompt: '___ Katze ist süß.', accept: ['Die'], hint: 'article', translation: 'The cat is cute.', explanation: '"Katze" is feminine, so the nominative article is "die".' },
  { id: 'sc3', level: 1, prompt: 'Er ___ einen Kaffee.', accept: ['trinkt'], hint: 'verb: trinken', translation: 'He is drinking a coffee.', explanation: 'For "er/sie/es" the verb ending is -t: trinken → trinkt.' },
  { id: 'sc4', level: 2, prompt: 'Wir ___ am Samstag nach Berlin.', accept: ['fahren'], hint: 'verb: fahren', translation: 'We are travelling to Berlin on Saturday.', explanation: 'For "wir" the verb ending is -en: fahren → fahren.' },
  { id: 'sc5', level: 2, prompt: 'Ich möchte ___ Apfel kaufen.', accept: ['einen'], hint: 'article (accusative)', translation: 'I would like to buy an apple.', explanation: '"Apfel" is masculine and it is the direct object, so "ein" becomes "einen" (accusative).' },
  { id: 'sc6', level: 2, prompt: 'Am Wochenende ___ ich lange.', accept: ['schlafe'], hint: 'verb: schlafen', translation: 'At the weekend I sleep late.', explanation: 'The conjugated verb stays in position 2. After the time phrase the subject follows: "…schlafe ich…".' },
  { id: 'sc7', level: 3, prompt: 'Kannst du mir bitte ___?', accept: ['helfen'], hint: 'infinitive', translation: 'Can you please help me?', explanation: 'With a modal verb (kannst), the second verb goes to the end as an infinitive: "helfen".' },
  { id: 'sc8', level: 3, prompt: 'Gestern ___ ich ins Kino gegangen.', accept: ['bin'], hint: 'auxiliary: sein/haben', translation: 'Yesterday I went to the cinema.', explanation: 'Verbs of movement like "gehen" form the Perfekt with "sein": "ich bin gegangen".' },
];
