// Translation EN → DE (primary focus).
export const TRANSLATIONS = [
  { id: 'tr1', level: 1, source: 'My name is Daniel.', accept: ['Ich heiße Daniel.', 'Ich heisse Daniel', 'Mein Name ist Daniel', 'Ich heiße Daniel'], explanation: 'Most natural: "Ich heiße Daniel." "Mein Name ist Daniel" is also correct.' },
  { id: 'tr2', level: 1, source: 'I am learning German.', accept: ['Ich lerne Deutsch.', 'Ich lerne Deutsch'], explanation: 'German uses the simple present for actions happening now: "Ich lerne Deutsch."' },
  { id: 'tr3', level: 2, source: 'I would like a coffee.', accept: ['Ich möchte einen Kaffee.', 'Ich hätte gern einen Kaffee', 'Ich möchte einen Kaffee'], explanation: '"möchte" = would like. "Kaffee" is masculine and the object → "einen Kaffee".' },
  { id: 'tr4', level: 2, source: 'Where is the train station?', accept: ['Wo ist der Bahnhof?', 'Wo ist der Bahnhof'], explanation: 'Question word first, then the verb: "Wo ist der Bahnhof?"' },
  { id: 'tr5', level: 3, source: 'Can you help me?', accept: ['Kannst du mir helfen?', 'Können Sie mir helfen?', 'Kannst du mir helfen', 'Koennen Sie mir helfen'], explanation: '"helfen" takes the dative ("mir"). The infinitive goes to the end: "Kannst du mir helfen?"' },
  { id: 'tr6', level: 3, source: 'We are going to the cinema tonight.', accept: ['Wir gehen heute Abend ins Kino.', 'Wir gehen heute Abend ins Kino', 'Heute Abend gehen wir ins Kino'], explanation: 'The verb stays in position 2. "ins Kino" = in + das Kino (accusative of direction).' },
];

// Translation DE → EN (secondary focus).
export const TRANSLATIONS_DE = [
  { id: 'trd1', level: 1, source: 'Das Wetter ist heute schön.', accept: ['The weather is nice today.', 'The weather is beautiful today', 'The weather is nice today', 'the weather is good today'], explanation: '"schön" here means nice/lovely when talking about weather.' },
  { id: 'trd2', level: 2, source: 'Ich habe zwei Geschwister.', accept: ['I have two siblings.', 'I have two siblings', 'I have got two siblings'], explanation: '"Geschwister" = siblings (brothers and/or sisters), used in the plural.' },
  { id: 'trd3', level: 3, source: 'Er arbeitet bei einer großen Firma.', accept: ['He works at a big company.', 'He works for a big company', 'He works at a large company'], explanation: '"bei" + dative is used for the employer: "bei einer großen Firma".' },
];
