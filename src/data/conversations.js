// Conversation prompts with an optional "suggested answer".
export const CONVERSATIONS = [
  // ——— Level 1 (A1–A2) ———
  { id: 'cv1', level: 1, prompt: 'Stell dich vor. (Introduce yourself.)', suggestion: 'Hallo! Ich heiße Daniel. Ich komme aus England und ich lerne Deutsch. Ich wohne in einer kleinen Stadt und arbeite gern.' },
  { id: 'cv2', level: 1, prompt: 'Bestell etwas zu essen in einem Restaurant. (Order some food.)', suggestion: 'Guten Tag! Ich hätte gern eine Suppe und ein Wasser, bitte. — Und als Hauptgericht nehme ich die Pizza.' },
  { id: 'cv6', level: 1, prompt: 'Frag im Supermarkt nach einem Produkt. (Ask where something is in the supermarket.)', suggestion: 'Entschuldigung, wo finde ich die Milch? — Vielen Dank! Und haben Sie auch frisches Brot?' },
  { id: 'cv7', level: 1, prompt: 'Sag, was du gern in deiner Freizeit machst. (Say what you like doing in your free time.)', suggestion: 'In meiner Freizeit lese ich gern und spiele Fußball. Am Wochenende treffe ich oft meine Freunde.' },

  // ——— Level 2 (A2–B1) ———
  { id: 'cv3', level: 2, prompt: 'Frag nach dem Weg zum Bahnhof. (Ask for directions to the station.)', suggestion: 'Entschuldigung, wie komme ich zum Bahnhof? Ist es weit von hier? — Vielen Dank für Ihre Hilfe!' },
  { id: 'cv4', level: 2, prompt: 'Beschreibe deinen typischen Tag. (Describe your typical day.)', suggestion: 'Am Morgen stehe ich um sieben Uhr auf. Ich frühstücke und dann arbeite ich. Am Abend koche ich und sehe fern.' },
  { id: 'cv8', level: 2, prompt: 'Ruf beim Arzt an und mach einen Termin. (Call the doctor to make an appointment.)', suggestion: 'Guten Tag, mein Name ist Cave. Ich hätte gern einen Termin, bitte. Geht es am Donnerstag um zehn Uhr? — Vielen Dank, bis Donnerstag!' },
  { id: 'cv9', level: 2, prompt: 'Beschreibe deine Familie. (Describe your family.)', suggestion: 'Meine Familie ist nicht groß. Ich habe eine Schwester und einen Bruder. Meine Eltern wohnen in England. Wir telefonieren jede Woche.' },
  { id: 'cv10', level: 2, prompt: 'Du bist im Hotel: Es gibt ein Problem mit deinem Zimmer. (Complain about a hotel room problem.)', suggestion: 'Entschuldigung, die Heizung in meinem Zimmer funktioniert nicht. Können Sie das bitte reparieren? Oder kann ich ein anderes Zimmer bekommen?' },

  // ——— Level 3 (B1) ———
  { id: 'cv5', level: 3, prompt: 'Erzähl von deinem letzten Wochenende. (Talk about last weekend.)', suggestion: 'Am Wochenende habe ich meine Freunde getroffen. Wir sind ins Kino gegangen und danach haben wir zusammen gegessen. Es war sehr schön.' },
  { id: 'cv11', level: 3, prompt: 'Erzähl von deinen Plänen für nächstes Jahr. (Talk about your plans for next year.)', suggestion: 'Nächstes Jahr möchte ich mein Deutsch verbessern und vielleicht nach Deutschland reisen. Außerdem will ich mehr Sport machen.' },
  { id: 'cv12', level: 3, prompt: 'Empfiehl einem Freund einen Film oder ein Buch. (Recommend a film or book to a friend.)', suggestion: 'Ich habe letzte Woche einen tollen Film gesehen. Er war spannend und lustig. Du solltest ihn dir unbedingt ansehen!' },
];
