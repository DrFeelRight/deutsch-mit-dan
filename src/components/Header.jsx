import { memo } from 'react';
import Pill from './ui/Pill.jsx';

// Memoised: App's stats change on every answered item, but the header only
// depends on the streak — skip re-rendering it for unrelated stat updates.
function Header({ streak, onHome }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white font-black">
            D
          </span>
          <div className="text-left leading-tight">
            <div className="font-extrabold text-slate-800">Deutsch Trainer</div>
            <div className="text-[11px] text-slate-400">A2–B1 · for Daniel</div>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {/* subtle German flag accent */}
          <div className="hidden sm:flex flex-col h-6 w-4 rounded-sm overflow-hidden border border-slate-200">
            <div className="flex-1 bg-black" />
            <div className="flex-1 bg-red-600" />
            <div className="flex-1 bg-yellow-400" />
          </div>
          <Pill className="bg-orange-50 text-orange-600">🔥 {streak}</Pill>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
