// Short A1–A2 reading texts with follow-up comprehension questions.
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
    id: 'rd2',
    level: 2,
    passage:
      'Im Sommer macht Familie Klein gern Urlaub am Meer. Dieses Jahr fahren sie nach Italien. Die Kinder schwimmen den ganzen Tag, und die Eltern lesen am Strand. Abends essen sie zusammen Pizza.',
    questions: [
      { id: 'rd2q1', question: 'Wohin fährt Familie Klein dieses Jahr?', options: ['Nach Spanien', 'Nach Italien', 'Nach Frankreich', 'Nach Österreich'], answer: 'Nach Italien', explanation: '"Dieses Jahr fahren sie nach Italien."' },
      { id: 'rd2q2', question: 'Was machen die Kinder?', options: ['Sie lesen', 'Sie schlafen', 'Sie schwimmen', 'Sie kochen'], answer: 'Sie schwimmen', explanation: '"Die Kinder schwimmen den ganzen Tag."' },
    ],
  },
];
