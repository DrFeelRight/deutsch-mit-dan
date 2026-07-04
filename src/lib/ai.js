// Client side of the AI feedback feature.
//
// Cost guardrails, in order:
//   1. Feature flag — OFF by default. Nothing here runs until Daniel turns it
//      on from the dashboard (and the server also needs an API key configured,
//      so the default deployment can never incur billing).
//   2. Response cache — identical requests (same exercise + same answer) are
//      served from localStorage and never hit the model again. Repeat mistakes
//      cost nothing.
//   3. Daily cap — at most AI_DAILY_CAP live requests per calendar day; after
//      that callers fall back to the static explanations from the data files.

import { todayStr } from './helpers.js';

export const AI_DAILY_CAP = 25;

const FLAG_KEY = 'dt-ai-enabled';
const CACHE_KEY = 'dt-ai-cache-v1';
const USAGE_KEY = 'dt-ai-usage';
const CACHE_MAX_ENTRIES = 200;

const safeGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* best effort */
  }
};

// ---------------------------------------------------------------------------
// Feature flag
// ---------------------------------------------------------------------------

export const isAiEnabled = () => safeGet(FLAG_KEY) === '1';
export const setAiEnabled = (on) => safeSet(FLAG_KEY, on ? '1' : '0');

// ---------------------------------------------------------------------------
// Request hashing + cache (FNV-1a — tiny, stable, good enough for cache keys)
// ---------------------------------------------------------------------------

export const hashRequest = (type, payload) => {
  const s = `${type}|${JSON.stringify(payload)}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
};

const readCache = () => {
  try {
    const raw = safeGet(CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

const writeCache = (cache) => {
  // Prune oldest entries so the cache can't grow unbounded.
  const entries = Object.entries(cache);
  if (entries.length > CACHE_MAX_ENTRIES) {
    entries.sort((a, b) => a[1].ts - b[1].ts);
    cache = Object.fromEntries(entries.slice(entries.length - CACHE_MAX_ENTRIES));
  }
  safeSet(CACHE_KEY, JSON.stringify(cache));
};

// ---------------------------------------------------------------------------
// Daily usage counter
// ---------------------------------------------------------------------------

const readUsage = () => {
  try {
    const raw = safeGet(USAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && parsed.date === todayStr() && typeof parsed.count === 'number') return parsed;
  } catch {
    /* fall through */
  }
  return { date: todayStr(), count: 0 };
};

export const aiRequestsRemaining = () => Math.max(0, AI_DAILY_CAP - readUsage().count);

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

// Returns { text, cached } on success, or { error } on any failure:
//   'disabled'       — feature flag is off
//   'cap'            — daily cap reached (caller shows static feedback)
//   'not_configured' — server has no API key (flag on, but backend dormant)
//   'unavailable'    — network/upstream problem
export const getAiFeedback = async (type, payload) => {
  if (!isAiEnabled()) return { error: 'disabled' };

  const key = hashRequest(type, payload);
  const cache = readCache();
  if (cache[key]) return { text: cache[key].text, cached: true };

  if (aiRequestsRemaining() <= 0) return { error: 'cap' };

  let res;
  try {
    res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload }),
    });
  } catch {
    return { error: 'unavailable' };
  }

  if (res.status === 503) return { error: 'not_configured' };
  if (res.status === 429) return { error: 'cap' };
  if (!res.ok) return { error: 'unavailable' };

  let data;
  try {
    data = await res.json();
  } catch {
    return { error: 'unavailable' };
  }
  if (!data || typeof data.text !== 'string' || !data.text) return { error: 'unavailable' };

  cache[key] = { text: data.text, ts: Date.now() };
  writeCache(cache);
  safeSet(USAGE_KEY, JSON.stringify({ date: todayStr(), count: readUsage().count + 1 }));

  return { text: data.text, cached: false };
};
