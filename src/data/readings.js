// Short A1–B1 reading texts with follow-up comprehension questions.
export const READINGS = [
  {
    id: 'rd1',
    level: 1,
    passage:
      'Anna wohnt in München. Sie ist Studentin und studiert Biologie. Jeden Morgen fährt sie mit dem Fahrrad zur Universität. Nach den Vorlesungen trifft sie ihre Freunde in einem Café.',
    questions: [
      { id: 'rd1q1', question: 'Wo wohnt Anna?', options: ['In Berlin', 'In München', 'In Hamburg', 'In Wien'], answer: 'In München', explanation: 'The text says: "Anna wohnt in München."' },
      { id: 'rd1q2', question: 'Wie fährt sie zur Universität?', options: ['Mit dem Auto', 'Mit dem Bus', 'Mit dem Fahrrad', 'Zu Fuß'], answer: 'Mit dem Fahrrad', explanation: '"…fährt sie mit dem Fahrrad zur Universität." → by bicycle.' },
    ],
  },
  {
    id: 'rd3',
    level: 1,
    passage:
      'Tom arbeitet in einem Büro in Hamburg. Er steht jeden Tag um sechs Uhr auf. Zuerst duscht er, dann frühstückt er mit seiner Frau. Um halb acht nimmt er den Bus zur Arbeit. Am Abend kocht er gern für die Familie.',
    questions: [
      { id: 'rd3q1', question: 'Wann steht Tom auf?', options: ['Um fünf Uhr', 'Um sechs Uhr', 'Um sieben Uhr', 'Um halb acht'], answer: 'Um sechs Uhr', explanation: '"Er steht jeden Tag um sechs Uhr auf." — aufstehen = to get up.' },
      { id: 'rd3q2', question: 'Wie kommt er zur Arbeit?', options: ['Mit dem Auto', 'Mit dem Fahrrad', 'Mit dem Bus', 'Mit dem Zug'], answer: 'Mit dem Bus', explanation: '"Um halb acht nimmt er den Bus zur Arbeit."' },
      { id: 'rd3q3', question: 'Was macht er am Abend gern?', options: ['Er liest', 'Er kocht', 'Er schwimmt', 'Er schläft'], answer: 'Er kocht', explanation: '"Am Abend kocht er gern für die Familie."' },
    ],
  },
  {
    id: 'rd2',
    level: 2,
    passage:
      'Im Sommer macht Familie Klein gern Urlaub am Meer. Dieses Jahr fahren sie nach Italien. Die Kinder schwimmen den ganzen Tag, und die Eltern lesen am Strand. Abends essen sie zusammen Pizza.',
    questions: [
      { id: 'rd2q1', question: 'Wohin fährt Familie Klein dieses Jahr?', options: ['Nach Spanien', 'Nach Italien', 'Nach Frankreich', 'Nach Österreich'], answer: 'Nach Italien', explanation: '"Dieses Jahr fahren sie nach Italien."' },
      { id: 'rd2q2', question: 'Was machen die Kinder?', options: ['Sie lesen', 'Sie schlafen', 'Sie schwimmen', 'Sie kochen'], answer: 'Sie schwimmen', explanation: '"Die Kinder schwimmen den ganzen Tag."' },
    ],
  },
  {
    id: 'rd4',
    level: 2,
    passage:
      'Am Samstag geht Frau Weber auf den Markt. Dort kauft sie frisches Obst und Gemüse. Die Tomaten sind heute im Angebot, deshalb kauft sie zwei Kilo. Danach trinkt sie einen Kaffee im Café am Marktplatz und spricht mit ihrer Nachbarin.',
    questions: [
      { id: 'rd4q1', question: 'Wann geht Frau Weber auf den Markt?', options: ['Am Sonntag', 'Am Samstag', 'Am Montag', 'Am Freitag'], answer: 'Am Samstag', explanation: '"Am Samstag geht Frau Weber auf den Markt."' },
      { id: 'rd4q2', question: 'Warum kauft sie zwei Kilo Tomaten?', options: ['Sie hat Gäste', 'Die Tomaten sind im Angebot', 'Sie mag keine Tomaten', 'Der Markt schließt'], answer: 'Die Tomaten sind im Angebot', explanation: '"Die Tomaten sind heute im Angebot, deshalb kauft sie zwei Kilo." — im Angebot = on special offer.' },
      { id: 'rd4q3', question: 'Mit wem spricht sie im Café?', options: ['Mit ihrem Mann', 'Mit ihrer Tochter', 'Mit ihrer Nachbarin', 'Mit dem Verkäufer'], answer: 'Mit ihrer Nachbarin', explanation: '"…und spricht mit ihrer Nachbarin." — die Nachbarin = the (female) neighbour.' },
    ],
  },
  {
    id: 'rd5',
    level: 3,
    passage:
      'Seit zwei Monaten arbeitet Miriam bei einer kleinen Firma in Köln. Die Arbeit gefällt ihr gut, weil die Kollegen freundlich sind und sie viel Neues lernt. Nur der Weg zur Arbeit ist ein Problem: Sie braucht mit der Bahn fast eine Stunde. Deshalb überlegt sie, ob sie umziehen soll.',
    questions: [
      { id: 'rd5q1', question: 'Warum gefällt Miriam die Arbeit?', options: ['Das Gehalt ist hoch', 'Die Kollegen sind freundlich', 'Das Büro ist schön', 'Sie hat viel Urlaub'], answer: 'Die Kollegen sind freundlich', explanation: '"…weil die Kollegen freundlich sind und sie viel Neues lernt."' },
      { id: 'rd5q2', question: 'Was ist das Problem?', options: ['Die Arbeit ist langweilig', 'Der Weg zur Arbeit ist lang', 'Die Kollegen sind unfreundlich', 'Sie verdient wenig'], answer: 'Der Weg zur Arbeit ist lang', explanation: '"Sie braucht mit der Bahn fast eine Stunde." — almost an hour by train.' },
      { id: 'rd5q3', question: 'Was überlegt sie?', options: ['Ob sie kündigen soll', 'Ob sie umziehen soll', 'Ob sie ein Auto kaufen soll', 'Ob sie Urlaub nehmen soll'], answer: 'Ob sie umziehen soll', explanation: '"Deshalb überlegt sie, ob sie umziehen soll." — umziehen = to move house.' },
    ],
  },
];
