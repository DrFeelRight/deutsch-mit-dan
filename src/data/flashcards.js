// German ↔ English vocabulary with noun gender + example sentences.
// `level` (1–3) drives gradual difficulty progression.
export const FLASHCARDS = [
  // ——— Level 1 (A1–A2) ———
  { id: 'fc1', level: 1, de: 'der Hund', en: 'the dog', gender: 'der', example: 'Der Hund spielt im Garten.', exampleEn: 'The dog plays in the garden.' },
  { id: 'fc2', level: 1, de: 'die Katze', en: 'the cat', gender: 'die', example: 'Die Katze schläft auf dem Sofa.', exampleEn: 'The cat sleeps on the sofa.' },
  { id: 'fc3', level: 1, de: 'das Haus', en: 'the house', gender: 'das', example: 'Das Haus ist sehr alt.', exampleEn: 'The house is very old.' },
  { id: 'fc4', level: 1, de: 'das Buch', en: 'the book', gender: 'das', example: 'Ich lese ein Buch.', exampleEn: 'I am reading a book.' },
  { id: 'fc5', level: 1, de: 'der Apfel', en: 'the apple', gender: 'der', example: 'Der Apfel ist rot.', exampleEn: 'The apple is red.' },
  { id: 'fc13', level: 1, de: 'der Tisch', en: 'the table', gender: 'der', example: 'Der Tisch steht in der Küche.', exampleEn: 'The table is in the kitchen.' },
  { id: 'fc14', level: 1, de: 'die Tür', en: 'the door', gender: 'die', example: 'Die Tür ist offen.', exampleEn: 'The door is open.' },
  { id: 'fc15', level: 1, de: 'das Wasser', en: 'the water', gender: 'das', example: 'Das Wasser ist kalt.', exampleEn: 'The water is cold.' },
  { id: 'fc16', level: 1, de: 'der Freund', en: 'the friend (male)', gender: 'der', example: 'Mein Freund wohnt in Berlin.', exampleEn: 'My friend lives in Berlin.' },
  { id: 'fc17', level: 1, de: 'die Schule', en: 'the school', gender: 'die', example: 'Die Schule beginnt um acht Uhr.', exampleEn: 'School starts at eight o’clock.' },
  { id: 'fc18', level: 1, de: 'das Auto', en: 'the car', gender: 'das', example: 'Das Auto ist neu.', exampleEn: 'The car is new.' },

  // ——— Level 2 (A2–B1) ———
  { id: 'fc6', level: 2, de: 'die Straße', en: 'the street', gender: 'die', example: 'Die Straße ist sehr lang.', exampleEn: 'The street is very long.' },
  { id: 'fc7', level: 2, de: 'die Arbeit', en: 'the work / job', gender: 'die', example: 'Die Arbeit macht mir Spaß.', exampleEn: 'I enjoy the work.' },
  { id: 'fc8', level: 2, de: 'der Zug', en: 'the train', gender: 'der', example: 'Der Zug ist heute pünktlich.', exampleEn: 'The train is on time today.' },
  { id: 'fc9', level: 2, de: 'die Zeit', en: 'the time', gender: 'die', example: 'Ich habe leider keine Zeit.', exampleEn: 'Unfortunately I have no time.' },
  { id: 'fc10', level: 2, de: 'das Kind', en: 'the child', gender: 'das', example: 'Das Kind lacht laut.', exampleEn: 'The child laughs loudly.' },
  { id: 'fc19', level: 2, de: 'der Bahnhof', en: 'the train station', gender: 'der', example: 'Der Bahnhof liegt im Zentrum.', exampleEn: 'The station is in the centre.' },
  { id: 'fc20', level: 2, de: 'die Wohnung', en: 'the flat / apartment', gender: 'die', example: 'Die Wohnung hat drei Zimmer.', exampleEn: 'The flat has three rooms.' },
  { id: 'fc21', level: 2, de: 'das Frühstück', en: 'the breakfast', gender: 'das', example: 'Das Frühstück ist fertig.', exampleEn: 'Breakfast is ready.' },
  { id: 'fc22', level: 2, de: 'der Urlaub', en: 'the holiday / vacation', gender: 'der', example: 'Wir machen im August Urlaub.', exampleEn: 'We are going on holiday in August.' },
  { id: 'fc23', level: 2, de: 'die Rechnung', en: 'the bill', gender: 'die', example: 'Die Rechnung, bitte!', exampleEn: 'The bill, please!' },
  { id: 'fc24', level: 2, de: 'das Geschenk', en: 'the present / gift', gender: 'das', example: 'Das Geschenk ist für dich.', exampleEn: 'The present is for you.' },
  { id: 'fc25', level: 2, de: 'der Schlüssel', en: 'the key', gender: 'der', example: 'Ich habe meinen Schlüssel verloren.', exampleEn: 'I have lost my key.' },
  { id: 'fc26', level: 2, de: 'die Gesundheit', en: 'the health', gender: 'die', example: 'Rauchen schadet der Gesundheit.', exampleEn: 'Smoking damages your health.' },
  { id: 'fc27', level: 2, de: 'das Gemüse', en: 'the vegetables', gender: 'das', example: 'Ich esse jeden Tag Gemüse.', exampleEn: 'I eat vegetables every day.' },

  // ——— Level 3 (B1) ———
  { id: 'fc11', level: 3, de: 'die Erfahrung', en: 'the experience', gender: 'die', example: 'Sie hat viel Erfahrung im Beruf.', exampleEn: 'She has a lot of experience at work.' },
  { id: 'fc12', level: 3, de: 'die Entscheidung', en: 'the decision', gender: 'die', example: 'Das war eine schwierige Entscheidung.', exampleEn: 'That was a difficult decision.' },
  { id: 'fc28', level: 3, de: 'die Verabredung', en: 'the arrangement / date', gender: 'die', example: 'Ich habe heute eine Verabredung mit Anna.', exampleEn: 'I have a date with Anna today.' },
  { id: 'fc29', level: 3, de: 'der Vorschlag', en: 'the suggestion', gender: 'der', example: 'Das ist ein guter Vorschlag.', exampleEn: 'That is a good suggestion.' },
  { id: 'fc30', level: 3, de: 'die Umgebung', en: 'the surroundings / area', gender: 'die', example: 'Die Umgebung ist sehr ruhig.', exampleEn: 'The area is very quiet.' },
  { id: 'fc31', level: 3, de: 'das Verhalten', en: 'the behaviour', gender: 'das', example: 'Sein Verhalten war seltsam.', exampleEn: 'His behaviour was strange.' },
  { id: 'fc32', level: 3, de: 'der Termin', en: 'the appointment', gender: 'der', example: 'Ich habe morgen einen Termin beim Arzt.', exampleEn: 'I have a doctor’s appointment tomorrow.' },
  { id: 'fc33', level: 3, de: 'die Meinung', en: 'the opinion', gender: 'die', example: 'Meiner Meinung nach ist das richtig.', exampleEn: 'In my opinion, that is right.' },
  { id: 'fc34', level: 3, de: 'das Angebot', en: 'the offer', gender: 'das', example: 'Das Angebot gilt nur heute.', exampleEn: 'The offer is valid today only.' },
  { id: 'fc35', level: 3, de: 'der Unterschied', en: 'the difference', gender: 'der', example: 'Der Unterschied ist klein.', exampleEn: 'The difference is small.' },
  { id: 'fc36', level: 3, de: 'die Erinnerung', en: 'the memory', gender: 'die', example: 'Das ist eine schöne Erinnerung.', exampleEn: 'That is a lovely memory.' },
];
