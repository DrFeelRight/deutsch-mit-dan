# Deutsch Trainer 🇩🇪

A minimal, modern German learning app for **Daniel (A2–B1)** — focused on active recall, real usage, and gradual difficulty. Built with **React + Vite + Tailwind CSS**. Live at [deutsch-mit-dan.vercel.app](https://deutsch-mit-dan.vercel.app/).

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
node scripts/make-icons.mjs   # regenerate PWA icons (dependency-free PNG encoder)
```

> Progress, streak, spaced repetition and error stats are saved in the browser via a **versioned localStorage layer** (schema migrations, corrupt-data quarantine — progress survives app updates). No backend required for any core feature.

## Features

1. **Flashcards** — DE↔EN with noun gender + example sentences, flip interaction, **FSRS-4.5 spaced repetition** (Again / Good / Easy; dependency-free port of the published algorithm).
2. **Sentence Completion** — fill in verbs, articles and word order.
3. **Grammar & Correction** — identify tense/subject/case (multiple choice) + rewrite incorrect sentences.
4. **Translation** — EN→DE (primary) and DE→EN (secondary).
5. **Reading Comprehension** — short A1–B1 texts with follow-up questions.
6. **Conversation** — real-life prompts with an optional suggested answer.

Plus:

- 🎲 **Mixed Practice Mode** and a 🔥 **daily streak**
- 🎯 **Error-pattern tracking** — every wrong answer counts against a grammar category (gender, case, conjugation, word order, tense, vocabulary); your top 3 weak areas show on the dashboard and sessions are automatically biased toward them
- 📱 **PWA / offline support** — installable on your phone; works without a connection after the first visit (hand-rolled service worker, no dependencies)
- ✨ **Optional AI tutor** (off by default) — live feedback on conversation practice and wrong answers via a serverless Claude proxy; see below

## AI tutor setup (optional — off by default)

The AI feature is **fully dormant until two switches are flipped**, so the default deployment can never incur costs:

1. **Server key** — in Vercel: *Project → Settings → Environment Variables* → add `ANTHROPIC_API_KEY` (from [console.anthropic.com](https://console.anthropic.com)) → redeploy. The key lives only on the server; the client never sees it.
2. **Client flag** — on the app's dashboard, toggle *"✨ AI tutor feedback"* on.

Cost guardrails (in `api/feedback.js` + `src/lib/ai.js`):

- Model is **Claude Haiku** (cheapest capable tier), responses capped at 300 tokens
- Identical requests are **cached in the browser** — repeat mistakes cost nothing
- Hard **25 requests/day cap**; after that the app falls back to its built-in static explanations
- No key configured → the server answers 503 and the app quietly uses static feedback

## Project structure

```
api/
└── feedback.js             # Vercel serverless Claude proxy (key stays server-side)
scripts/
└── make-icons.mjs          # PNG icon generator (zero deps)
public/
├── sw.js                   # service worker: offline shell + asset caching
├── manifest.webmanifest    # PWA manifest
└── icons/                  # generated app icons
src/
├── main.jsx                # React entry + SW registration
├── App.jsx                 # shell: header + lazy session routing
├── index.css               # Tailwind + flip/pop animations
├── data/                   # 130 exercise items (one file per type, lazy-loaded chunks)
│   ├── flashcards.js  completions.js  grammar.js
│   ├── translations.js  readings.js  conversations.js
│   └── categories.js       # dashboard tiles + skill labels
├── hooks/
│   └── useStats.js         # progress/streak/SRS/error-stats state
├── lib/
│   ├── storage.js          # versioned localStorage: migrations, backup, quarantine
│   ├── fsrs.js             # FSRS-4.5 scheduler (dependency-free port)
│   ├── errors.js           # error taxonomy + weak-category ranking
│   ├── ai.js               # AI feature flag, response cache, daily cap
│   ├── helpers.js          # lenient answer grading, dates, weighted sampling
│   └── queue.js            # session builder: lazy data, level order, weak-cat bias
├── components/
│   ├── Header.jsx  Feedback.jsx  AiFeedback.jsx
│   ├── ui/                 # Card, Button, Pill, LevelPill, ProgressBar
│   └── exercises/          # Flashcard, TextChallenge, MultipleChoice, Conversation
└── pages/
    ├── Dashboard.jsx       # progress, focus areas, exercise picker, settings
    └── ExerciseSession.jsx # one task at a time + summary
```

## Notes for learners

- Answer grading is forgiving about capitals, punctuation, and umlauts (`ss`↔`ß`, `ae`↔`ä`, etc.), so you can type on any keyboard.
- Difficulty is tagged per item (`level 1–3`, A1→B1) and sessions run easiest-first, with your weak grammar areas surfaced earlier within each level.
- Add or edit content by editing the files in `src/data/` — no component changes needed. New grammar/translation/completion items should carry an `errorCat` tag (see `src/lib/errors.js`) so weak-area tracking keeps working.
