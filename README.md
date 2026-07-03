# Deutsch Trainer 🇩🇪

A minimal, modern German learning app for **Daniel (A2–B1)** — focused on active recall, real usage, and gradual difficulty. Built with **React + Vite + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

Other scripts:

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build
```

> Progress, streak, and spaced-repetition data are saved in the browser via `localStorage`. No backend required.

## Exercise types

1. **Flashcards** — DE↔EN with noun gender + example sentences, flip interaction, Leitner spaced repetition (Again / Good / Easy).
2. **Sentence Completion** — fill in verbs, articles and word order.
3. **Grammar & Correction** — identify tense/subject/case (multiple choice) + rewrite incorrect sentences.
4. **Translation** — EN→DE (primary) and DE→EN (secondary).
5. **Reading Comprehension** — short A1–A2 texts with follow-up questions.
6. **Conversation** — real-life prompts with an optional suggested answer.

Plus a 🎲 **Mixed Practice Mode**, a 🔥 **daily streak**, and per-skill **accuracy tracking** on the dashboard.

## Project structure

```
src/
├── main.jsx                # React entry
├── App.jsx                 # Shell: header + dashboard/session routing
├── index.css               # Tailwind directives + flip/pop animations
├── data/                   # Mock content (one file per exercise type)
│   ├── flashcards.js
│   ├── completions.js
│   ├── grammar.js          # identification + error correction
│   ├── translations.js     # EN→DE and DE→EN
│   ├── readings.js
│   ├── conversations.js
│   └── categories.js       # dashboard tiles + skill labels
├── hooks/
│   └── useStats.js         # localStorage-backed progress/streak/SRS
├── lib/
│   ├── helpers.js          # answer grading, dates, spaced-repetition boxes
│   └── queue.js            # builds each session's ordered item list
├── components/
│   ├── Header.jsx
│   ├── Feedback.jsx        # shared correct/incorrect + explanation panel
│   ├── ui/                 # Card, Button, Pill, LevelPill, ProgressBar
│   └── exercises/          # Flashcard, TextChallenge, MultipleChoice, Conversation
└── pages/
    ├── Dashboard.jsx       # progress + exercise picker
    └── ExerciseSession.jsx # one task at a time + summary
```

## Notes for learners

- Answer grading is forgiving about capitals, punctuation, and umlauts (`ss`↔`ß`, `ae`↔`ä`, etc.), so you can type on any keyboard.
- Difficulty is tagged per item (`level 1–3`, A1→B1) and sessions run easiest-first.
- Add or edit content by editing the files in `src/data/` — no component changes needed.
