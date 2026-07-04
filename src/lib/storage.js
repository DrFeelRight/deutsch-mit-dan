// Versioned, migration-safe localStorage layer for learner progress.
//
// Guarantees:
//  - A schema change NEVER wipes progress: data is migrated stepwise
//    (v0 -> v1 -> ...), with a backup written before migrating.
//  - Corrupt data NEVER crashes the app or silently vanishes: the raw string
//    is quarantined under a separate key for manual recovery, then defaults
//    are used.
//  - Unknown/missing fields are healed from defaults; wrong-typed fields are
//    coerced back to their default.

import { migrateLeitnerEntry } from './fsrs.js';

const STORAGE_KEY = 'deutsch-trainer-v1'; // historical name — kept so existing data is found
const BACKUP_PREFIX = `${STORAGE_KEY}.bak`;
const QUARANTINE_PREFIX = `${STORAGE_KEY}.corrupt`;

export const SCHEMA_VERSION = 2;

// migrations[n] upgrades a payload from schema n to n+1. Each runs inside
// try/catch in loadStats; a failing migration falls back to the pre-migration
// data (which stays backed up).
const MIGRATIONS = {
  // v0: the launch shape had no schemaVersion field at all.
  0: (data) => ({ ...data, schemaVersion: 1 }),
  // v1 -> v2: Leitner SRS entries ({box, due}) become FSRS entries
  // ({s, d, due, last, reps, lapses}); error-category counters added.
  1: (data) => {
    const srs = {};
    for (const [id, entry] of Object.entries(data.srs || {})) {
      srs[id] = migrateLeitnerEntry(entry);
    }
    return { ...data, srs, errorCats: data.errorCats || {}, schemaVersion: 2 };
  },
};

const detectVersion = (data) =>
  typeof data.schemaVersion === 'number' ? data.schemaVersion : 0;

// Heal shape: every key in defaults must exist with the same primitive type;
// anything missing or mistyped reverts to its default. Extra keys survive
// (forward compatibility with newer schema fields).
const heal = (data, defaults) => {
  const out = { ...data };
  for (const [key, def] of Object.entries(defaults)) {
    const val = out[key];
    const wanted = def === null ? 'null-or-string' : typeof def;
    if (wanted === 'null-or-string') {
      if (val !== null && typeof val !== 'string') out[key] = def;
    } else if (typeof val !== wanted || (wanted === 'object' && (val === null || Array.isArray(val)))) {
      out[key] = def;
    }
  }
  return out;
};

const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* quota/private mode — persistence is best-effort */
  }
};

export const loadStats = (defaults) => {
  let raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return { ...defaults };
  }
  if (raw === null) return { ...defaults };

  let data;
  try {
    data = JSON.parse(raw);
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      throw new Error('stats payload is not an object');
    }
  } catch {
    // Unreadable — preserve the exact bytes for manual recovery, start fresh.
    safeSet(`${QUARANTINE_PREFIX}.${Date.now()}`, raw);
    return { ...defaults };
  }

  let version = detectVersion(data);

  if (version < SCHEMA_VERSION) {
    // One backup per source version; kept until the same migration re-runs.
    safeSet(`${BACKUP_PREFIX}.v${version}`, raw);
    while (version < SCHEMA_VERSION) {
      const step = MIGRATIONS[version];
      if (!step) break; // gap in the chain — use what we have rather than lose it
      try {
        data = step(data);
      } catch {
        break; // failed step: keep pre-step data; backup still on disk
      }
      version = detectVersion(data);
    }
  }
  // version > SCHEMA_VERSION (rollback after an update): keep the data as-is;
  // heal() below guarantees every field this build needs is present and typed.

  return heal({ ...defaults, ...data }, defaults);
};

export const saveStats = (stats) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stats, schemaVersion: SCHEMA_VERSION }));
  } catch {
    /* quota/private mode — in-memory state still works for the session */
  }
};
