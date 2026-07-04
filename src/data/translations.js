// Translation EN → DE (primary focus).
// errorCat = the grammar category the item exercises (see lib/errors.js).
export const TRANSLATIONS = [
  // ——— Level 1 (A1–A2) ———
  { id: 'tr1', level: 1, errorCat: 'conjugation', source: 'My name is Daniel.', accept: ['Ich heiße Daniel.', 'Ich heisse Daniel', 'Mein Name ist Daniel', 'Ich heiße Daniel'], explanation: 'Most natural: "Ich heiße Daniel." "Mein Name ist Daniel" is also correct.' },
  { id: 'tr2', level: 1, errorCat: 'tense', source: 'I am learning German.', accept: ['Ich lerne Deutsch.', 'Ich lerne Deutsch'], explanation: 'German uses the simple present for actions happening now: "Ich lerne Deutsch."' },
  { id: 'tr7', level: 1, errorCat: 'conjugation', source: 'She drinks tea every morning.', accept: ['Sie trinkt jeden Morgen Tee.', 'Sie trinkt jeden Morgen Tee', 'Jeden Morgen trinkt sie Tee'], explanation: 'For "sie" (she): trinkt. Time information usually comes before the object: "jeden Morgen Tee".' },
  { id: 'tr8', level: 1, errorCat: 'gender', source: 'The cat is sleeping.', accept: ['Die Katze schläft.', 'Die Katze schläft', 'Die Katze schlaeft'], explanation: '"Katze" is feminine (die). "schlafen" changes its stem: schläft.' },

  // ——— Level 2 (A2–B1) ———
  { id: 'tr3', level: 2, errorCat: 'case', source: 'I would like a coffee.', accept: ['Ich möchte einen Kaffee.', 'Ich hätte gern einen Kaffee', 'Ich möchte einen Kaffee'], explanation: '"möchte" = would like. "Kaffee" is masculine and the object → "einen Kaffee".' },
  { id: 'tr4', level: 2, errorCat: 'word-order', source: 'Where is the train station?', accept: ['Wo ist der Bahnhof?', 'Wo ist der Bahnhof'], explanation: 'Question word first, then the verb: "Wo ist der Bahnhof?"' },
  { id: 'tr9', level: 2, errorCat: 'case', source: 'I need a new jacket.', accept: ['Ich brauche eine neue Jacke.', 'Ich brauche eine neue Jacke'], explanation: '"brauchen" takes the accusative. "Jacke" is feminine, so "eine" stays: eine neue Jacke.' },
  { id: 'tr10', level: 2, errorCat: 'word-order', source: 'Tomorrow I am playing football.', accept: ['Morgen spiele ich Fußball.', 'Morgen spiele ich Fussball', 'Ich spiele morgen Fußball', 'Ich spiele morgen Fussball'], explanation: 'With "Morgen" first, the verb keeps position 2 and the subject follows: "Morgen spiele ich…".' },
  { id: 'tr11', level: 2, errorCat: 'tense', source: 'We visited our grandma yesterday.', accept: ['Wir haben gestern unsere Oma besucht.', 'Gestern haben wir unsere Oma besucht', 'Wir haben gestern unsere Oma besucht'], explanation: 'Spoken past = Perfekt: haben + besucht (participle at the end).' },
  { id: 'tr12', level: 2, errorCat: 'vocab', source: 'How much does that cost?', accept: ['Wie viel kostet das?', 'Was kostet das?', 'Wie viel kostet das', 'Was kostet das', 'Wieviel kostet das'], explanation: '"Wie viel kostet das?" — or the very common short form "Was kostet das?"' },

  // ——— Level 3 (B1) ———
  { id: 'tr5', level: 3, errorCat: 'case', source: 'Can you help me?', accept: ['Kannst du mir helfen?', 'Können Sie mir helfen?', 'Kannst du mir helfen', 'Koennen Sie mir helfen'], explanation: '"helfen" takes the dative ("mir"). The infinitive goes to the end: "Kannst du mir helfen?"' },
  { id: 'tr6', level: 3, errorCat: 'word-order', source: 'We are going to the cinema tonight.', accept: ['Wir gehen heute Abend ins Kino.', 'Wir gehen heute Abend ins Kino', 'Heute Abend gehen wir ins Kino'], explanation: 'The verb stays in position 2. "ins Kino" = in + das Kino (accusative of direction).' },
  { id: 'tr13', level: 3, errorCat: 'case', source: 'This present is for my brother.', accept: ['Dieses Geschenk ist für meinen Bruder.', 'Das Geschenk ist für meinen Bruder', 'Dieses Geschenk ist für meinen Bruder'], explanation: '"für" always takes the accusative: mein Bruder → für meinen Bruder.' },
  { id: 'tr14', level: 3, errorCat: 'word-order', source: 'I think that German is fun.', accept: ['Ich denke, dass Deutsch Spaß macht.', 'Ich glaube, dass Deutsch Spaß macht', 'Ich denke, dass Deutsch Spass macht', 'Ich glaube, dass Deutsch Spass macht', 'Ich finde, dass Deutsch Spaß macht', 'Ich finde, dass Deutsch Spass macht'], explanation: 'In the "dass" clause the verb goes to the end: "…, dass Deutsch Spaß macht."' },
  { id: 'tr15', level: 3, errorCat: 'tense', source: 'It will rain tomorrow.', accept: ['Morgen wird es regnen.', 'Es wird morgen regnen.', 'Es wird morgen regnen', 'Morgen wird es regnen'], explanation: 'Futur I: werden in position 2, the infinitive "regnen" at the end.' },
];

// Translation DE → EN (secondary focus).
export const TRANSLATIONS_DE = [
  // ——— Level 1 (A1–A2) ———
  { id: 'trd1', level: 1, errorCat: 'vocab', source: 'Das Wetter ist heute schön.', accept: ['The weather is nice today.', 'The weather is beautiful today', 'The weather is nice today', 'the weather is good today'], explanation: '"schön" here means nice/lovely when talking about weather.' },
  { id: 'trd4', level: 1, errorCat: 'vocab', source: 'Meine Mutter kocht sehr gern.', accept: ['My mother loves to cook.', 'My mother loves cooking', 'My mum loves to cook', 'My mum loves cooking', 'My mother really likes to cook', 'My mother really likes cooking', 'My mom loves to cook', 'My mom loves cooking'], explanation: '"gern(e)" + verb = to like/love doing something: kocht sehr gern → loves to cook.' },

  // ——— Level 2 (A2–B1) ———
  { id: 'trd2', level: 2, errorCat: 'vocab', source: 'Ich habe zwei Geschwister.', accept: ['I have two siblings.', 'I have two siblings', 'I have got two siblings'], explanation: '"Geschwister" = siblings (brothers and/or sisters), used in the plural.' },
  { id: 'trd5', level: 2, errorCat: 'vocab', source: 'Der Zug hat zwanzig Minuten Verspätung.', accept: ['The train is twenty minutes late.', 'The train is 20 minutes late', 'The train is twenty minutes late', 'The train is delayed by twenty minutes', 'The train is delayed by 20 minutes', 'The train has a twenty minute delay', 'The train has a 20 minute delay'], explanation: '"Verspätung haben" = to be late / delayed. Very common at stations!' },
  { id: 'trd6', level: 2, errorCat: 'vocab', source: 'Kannst du mir dein Handy leihen?', accept: ['Can you lend me your phone?', 'Can you lend me your phone', 'Can you lend me your mobile', 'Can you lend me your cell phone', 'Can you lend me your mobile phone', 'Could you lend me your phone'], explanation: '"das Handy" = mobile phone (a false friend — not "handy"!). "leihen" = to lend.' },

  // ——— Level 3 (B1) ———
  { id: 'trd3', level: 3, errorCat: 'vocab', source: 'Er arbeitet bei einer großen Firma.', accept: ['He works at a big company.', 'He works for a big company', 'He works at a large company', 'He works for a large company'], explanation: '"bei" + dative is used for the employer: "bei einer großen Firma".' },
  { id: 'trd7', level: 3, errorCat: 'vocab', source: 'Obwohl es regnet, gehen wir spazieren.', accept: ['Although it is raining, we are going for a walk.', "Although it's raining, we're going for a walk", 'Although it is raining, we go for a walk', 'Even though it is raining, we are going for a walk', "Even though it's raining, we're going for a walk", 'Even though it is raining, we go for a walk'], explanation: '"obwohl" = although/even though. "spazieren gehen" = to go for a walk.' },
  { id: 'trd8', level: 3, errorCat: 'vocab', source: 'Ich freue mich auf das Wochenende.', accept: ['I am looking forward to the weekend.', "I'm looking forward to the weekend", 'I look forward to the weekend'], explanation: '"sich freuen auf" + accusative = to look forward to something.' },
];
