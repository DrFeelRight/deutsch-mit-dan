// Vercel serverless function: thin proxy to the Claude API for learner feedback.
//
// The API key lives ONLY in the server environment (Vercel → Settings →
// Environment Variables → ANTHROPIC_API_KEY). The client never sees it.
// With no key configured this returns 503 and the app falls back to its
// static feedback — zero cost, zero breakage.
//
// Model: claude-haiku-4-5 — the cheapest capable tier; short conversational
// corrections don't need a frontier model, and the owner is cost-sensitive.
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-haiku-4-5';
const MAX_OUTPUT_TOKENS = 300; // feedback is deliberately brief
const MAX_INPUT_CHARS = 600; // bound per-request cost from the client

// Best-effort server-side backstop (resets on cold start — the authoritative
// 25/day cap lives client-side in src/lib/ai.js; this only blunts abuse if
// someone calls the endpoint directly).
const WINDOW_MS = 24 * 60 * 60 * 1000;
const SERVER_CAP = 100;
let windowStart = Date.now();
let windowCount = 0;

const PROMPTS = {
  conversation: (p) => ({
    system:
      'You are a friendly German tutor for an A2-B1 English-speaking learner named Daniel. ' +
      'He answered a speaking prompt in German. Give feedback in English: point out mistakes ' +
      '(grammar, gender, word order) with the corrected German, then one short encouragement. ' +
      'If the answer is already correct, say so and offer one more natural alternative phrasing. ' +
      'Be concise — under 120 words. No preamble.',
    user: `Prompt: ${p.prompt}\n\nDaniel's answer: ${p.answer}`,
  }),
  correction: (p) => ({
    system:
      'You are a friendly German tutor for an A2-B1 English-speaking learner. ' +
      'He gave a wrong answer to an exercise. Explain in English, simply and concretely, ' +
      'why his answer is wrong and why the expected answer is right. Reference the specific ' +
      'grammar rule (case, gender, conjugation, word order or tense) in plain terms. ' +
      'Be concise — under 100 words. No preamble.',
    user: `Exercise: ${p.question}\nExpected answer: ${p.expected}\nDaniel's answer: ${p.answer}`,
  }),
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'not_configured' });
  }

  const { type, payload } = req.body || {};
  const buildPrompt = PROMPTS[type];
  if (!buildPrompt || typeof payload !== 'object' || payload === null) {
    return res.status(400).json({ error: 'bad_request' });
  }
  const totalChars = Object.values(payload).reduce(
    (n, v) => n + (typeof v === 'string' ? v.length : 0),
    0
  );
  if (totalChars === 0 || totalChars > MAX_INPUT_CHARS) {
    return res.status(400).json({ error: 'bad_request' });
  }

  if (Date.now() - windowStart > WINDOW_MS) {
    windowStart = Date.now();
    windowCount = 0;
  }
  if (windowCount >= SERVER_CAP) {
    return res.status(429).json({ error: 'daily_cap' });
  }

  const { system, user } = buildPrompt(payload);
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      system,
      messages: [{ role: 'user', content: user }],
    });
    windowCount += 1;
    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('');
    return res.status(200).json({ text });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return res.status(503).json({ error: 'not_configured' });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'rate_limited' });
    }
    if (error instanceof Anthropic.APIError) {
      return res.status(502).json({ error: 'upstream_error' });
    }
    return res.status(500).json({ error: 'server_error' });
  }
}
