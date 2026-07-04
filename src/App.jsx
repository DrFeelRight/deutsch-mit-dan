import { lazy, Suspense, useCallback, useState } from 'react';
import Header from './components/Header.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Card from './components/ui/Card.jsx';
import { useStats } from './hooks/useStats.js';

// Code-split at the session-routing boundary: the exercise engine (session
// page + all exercise components) loads only when a session starts. The
// dashboard stays in the main bundle since it's the landing view.
const ExerciseSession = lazy(() => import('./pages/ExerciseSession.jsx'));

const SessionFallback = () => (
  <Card className="p-8 text-center">
    <div className="animate-pulse text-slate-400 text-sm">Loading exercises…</div>
  </Card>
);

export default function App() {
  const { stats, recordAnswer, rateCard, finishSession, reset } = useStats();
  // view: { screen: 'dashboard' } | { screen: 'exercise', key, title }
  const [view, setView] = useState({ screen: 'dashboard' });

  const goExercise = useCallback((key, title) => {
    window.scrollTo(0, 0);
    setView({ screen: 'exercise', key, title });
  }, []);

  const goHome = useCallback(() => {
    window.scrollTo(0, 0);
    setView({ screen: 'dashboard' });
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm('Reset all progress, streak and spaced-repetition data?')) reset();
  }, [reset]);

  return (
    <div className="min-h-screen font-sans text-slate-900">
      <Header streak={stats.streak} onHome={goHome} />

      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        {view.screen === 'dashboard' ? (
          <Dashboard stats={stats} onSelect={goExercise} onReset={handleReset} />
        ) : (
          <Suspense fallback={<SessionFallback />}>
            <ExerciseSession
              key={view.key}
              categoryKey={view.key}
              title={view.title}
              srs={stats.srs}
              errorCats={stats.errorCats}
              onRecord={recordAnswer}
              onRate={rateCard}
              onDone={finishSession}
              onExit={goHome}
            />
          </Suspense>
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-4 pb-8 text-center text-xs text-slate-400">
        Progress is saved locally in your browser · Built for active recall & gradual difficulty
      </footer>
    </div>
  );
}
