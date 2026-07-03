import { useState } from 'react';
import Header from './components/Header.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ExerciseSession from './pages/ExerciseSession.jsx';
import { useStats } from './hooks/useStats.js';

export default function App() {
  const { stats, recordAnswer, rateCard, finishSession, reset } = useStats();
  // view: { screen: 'dashboard' } | { screen: 'exercise', key, title }
  const [view, setView] = useState({ screen: 'dashboard' });

  const goExercise = (key, title) => {
    window.scrollTo(0, 0);
    setView({ screen: 'exercise', key, title });
  };
  const goHome = () => {
    window.scrollTo(0, 0);
    setView({ screen: 'dashboard' });
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress, streak and spaced-repetition data?')) reset();
  };

  return (
    <div className="min-h-screen font-sans text-slate-900">
      <Header streak={stats.streak} onHome={goHome} />

      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        {view.screen === 'dashboard' ? (
          <Dashboard stats={stats} onSelect={goExercise} onReset={handleReset} />
        ) : (
          <ExerciseSession
            key={view.key}
            categoryKey={view.key}
            title={view.title}
            srs={stats.srs}
            onRecord={recordAnswer}
            onRate={rateCard}
            onDone={finishSession}
            onExit={goHome}
          />
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-4 pb-8 text-center text-xs text-slate-400">
        Progress is saved locally in your browser · Built for active recall & gradual difficulty
      </footer>
    </div>
  );
}
