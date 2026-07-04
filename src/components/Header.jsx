import { memo } from 'react';
import Pill from './ui/Pill.jsx';
import ThemeToggle from './ui/ThemeToggle.jsx';
import { FlameIcon } from './ui/Icon.jsx';

// Memoised: App's stats change on every answered item, but the header only
// depends on the streak — skip re-rendering it for unrelated stat updates.
function Header({ streak, onHome }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-surface/80 border-b border-line">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={onHome}
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-strong text-on-accent font-serif font-bold text-lg">
            D
          </span>
          <div className="text-left leading-tight">
            <div className="font-serif font-bold text-ink text-[17px]">Deutsch Trainer</div>
            <div className="text-[11px] text-muted">A2–B1 · for Daniel</div>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <Pill className="bg-accent/10 text-accent-strong">
            <FlameIcon size={14} strokeWidth={2} />
            {streak}
          </Pill>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
