import { useState } from 'react';
import { getTheme, setTheme } from '../../lib/theme.js';
import { SunIcon, MoonIcon } from './Icon.jsx';

// Light/dark switch. Shows the icon of the mode you'd switch *to*.
export default function ThemeToggle() {
  const [theme, setThemeState] = useState(getTheme());
  const isDark = theme === 'dark';

  const toggle = () => setThemeState(setTheme(isDark ? 'light' : 'dark'));

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
