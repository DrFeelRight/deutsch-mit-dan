/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Body / UI (dense text, buttons, answers).
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        // Editorial display (section titles, question prompts, headers).
        serif: ['"Source Serif 4"', '"Source Serif Pro"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      // Type scale as tokens — used instead of ad-hoc per-component sizes.
      fontSize: {
        display: ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h1: ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h2: ['1.3rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        // body / small use Tailwind's base (1rem) and sm (0.875rem).
      },
      // Semantic colour tokens. Values are CSS variables (RGB channel triples)
      // defined in index.css under :root and .dark, so a single token name
      // resolves to the right value per theme and Tailwind's /opacity still works.
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--color-surface-2) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)', // fills, borders, icons, large text
          strong: 'rgb(var(--color-accent-strong) / <alpha-value>)', // AA-safe for small text + button bg
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
        },
        'on-accent': 'rgb(var(--color-on-accent) / <alpha-value>)', // text/icons on an accent fill
        warning: {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
          strong: 'rgb(var(--color-warning-strong) / <alpha-value>)', // AA-safe for small warning text
        },
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgb(var(--shadow-color) / 0.18)',
      },
    },
  },
  plugins: [],
};
