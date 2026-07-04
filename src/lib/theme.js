// Light/dark theme persistence. Mirrors the storage pattern in hooks/useStats
// (try/catch on every read/write, schema-safe: any value that isn't exactly
// 'light' or 'dark' falls back to the light default). The initial class is set
// by an inline script in index.html to avoid a flash; this module keeps it in
// sync at runtime.

const KEY = 'dt-theme';

export const getTheme = () => {
  try {
    const t = localStorage.getItem(KEY);
    return t === 'dark' || t === 'light' ? t : 'light';
  } catch {
    return 'light';
  }
};

export const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
};

export const setTheme = (theme) => {
  const value = theme === 'dark' ? 'dark' : 'light';
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* best effort — theme still applies for this session */
  }
  applyTheme(value);
  return value;
};
