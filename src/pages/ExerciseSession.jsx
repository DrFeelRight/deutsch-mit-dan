import { useEffect, useRef, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Pill from '../components/ui/Pill.jsx';
import LevelPill from '../components/ui/LevelPill.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import Button from '../components/ui/Button.jsx';
import Flashcard from '../components/exercises/Flashcard.jsx';
import TextChallenge from '../components/exercises/TextChallenge.jsx';
import MultipleChoice from '../components/exercises/MultipleChoice.jsx';
import Conversation from '../components/exercises/Conversation.jsx';
import { buildQueue } from '../lib/queue.js';
import { weakCategories } from '../lib/errors.js';
import { SKILL_LABEL } from '../data/categories.js';

// Presents one task at a time from a queue, records each result, and shows a
// summary screen at the end.
export default function ExerciseSession({ categoryKey, title, srs, errorCats, onRecord, onRate, onExit, onDone }) {
  // Snapshot SRS + error stats at mount so mid-session updates don't rebuild
  // the queue.
  const srsSnapshot = useRef(srs).current;
  const errorCatsSnapshot = useRef(errorCats).current;
  // Queue resolves asynchronously: the content chunk for this category is
  // fetched on demand (see lib/queue.js).
  const [queue, setQueue] = useState(null);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let active = true;
    const weak = weakCategories(errorCatsSnapshot).map((w) => w.cat);
    buildQueue(categoryKey, srsSnapshot, weak).then((q) => {
      if (active) setQueue(q);
    });
    return () => {
      active = false;
    };
  }, [categoryKey, srsSnapshot, errorCatsSnapshot]);

  if (queue === null) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-pulse text-slate-400 text-sm">Loading exercises…</div>
      </Card>
    );
  }

  const item = queue[index];

  const handleResult = (correct) => {
    onRecord(item.kind, correct, item.errorCat);
    if (correct) setCorrectCount((c) => c + 1);
    if (index + 1 >= queue.length) {
      onDone();
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const restart = () => {
    setIndex(0);
    setCorrectCount(0);
    setFinished(false);
  };

  if (!queue.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">No items available right now.</p>
        <div className="mt-4">
          <Button onClick={onExit}>Back to dashboard</Button>
        </div>
      </Card>
    );
  }

  if (finished) {
    const pct = Math.round((correctCount / queue.length) * 100);
    return (
      <Card className="p-8 text-center pop">
        <div className="text-5xl mb-3">{pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚'}</div>
        <h2 className="text-2xl font-bold text-slate-800">Session complete!</h2>
        <p className="mt-2 text-slate-500">{title}</p>
        <div className="mt-6 inline-flex items-center gap-6 rounded-2xl bg-slate-50 px-8 py-5">
          <div>
            <div className="text-3xl font-extrabold text-brand-600">
              {correctCount}/{queue.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">Correct</div>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div>
            <div className="text-3xl font-extrabold text-emerald-600">{pct}%</div>
            <div className="text-xs text-slate-500 mt-1">Accuracy</div>
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          {pct >= 80
            ? 'Ausgezeichnet! Ready to level up.'
            : pct >= 50
            ? 'Solid progress — keep going!'
            : 'Review the explanations and try again.'}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="ghost" onClick={onExit}>
            Dashboard
          </Button>
          <Button onClick={restart}>Practice again</Button>
        </div>
      </Card>
    );
  }

  const header = (
    <div className="flex items-center justify-between mb-1">
      <Pill className="bg-slate-100 text-slate-600">{SKILL_LABEL[item.kind]}</Pill>
      <LevelPill level={item.level} />
    </div>
  );

  const renderItem = () => {
    switch (item.kind) {
      case 'flashcard':
        return <Flashcard key={item.id} item={item} onResult={handleResult} onRate={onRate} header={header} />;
      case 'completion':
        return (
          <TextChallenge
            key={item.id}
            item={item}
            onResult={handleResult}
            header={header}
            promptNode={
              <p className="mt-4 text-xl font-semibold text-slate-800 leading-relaxed">
                {item.prompt.replace('___', '_____')}
              </p>
            }
            sub={
              <p className="mt-1 text-sm text-slate-400">
                {item.translation} · <span className="italic">hint: {item.hint}</span>
              </p>
            }
            placeholder="Type the missing word…"
          />
        );
      case 'correction':
        return (
          <TextChallenge
            key={item.id}
            item={item}
            onResult={handleResult}
            header={header}
            promptNode={
              <p className="mt-4 text-slate-500 text-sm">
                Find and fix the mistake. Rewrite the sentence correctly:
              </p>
            }
            sub={
              <p className="mt-2 text-xl font-semibold text-rose-600 line-through decoration-rose-300">
                {item.wrong}
              </p>
            }
            placeholder="Type the corrected sentence…"
          />
        );
      case 'translation':
        return (
          <TextChallenge
            key={item.id}
            item={item}
            onResult={handleResult}
            header={header}
            promptNode={<p className="mt-4 text-sm text-slate-400 uppercase tracking-wide">Translate to German</p>}
            sub={<p className="mt-1 text-xl font-semibold text-slate-800">{item.source}</p>}
            placeholder="Auf Deutsch schreiben…"
          />
        );
      case 'translationDE':
        return (
          <TextChallenge
            key={item.id}
            item={item}
            onResult={handleResult}
            header={header}
            promptNode={<p className="mt-4 text-sm text-slate-400 uppercase tracking-wide">Translate to English</p>}
            sub={<p className="mt-1 text-xl font-semibold text-slate-800">{item.source}</p>}
            placeholder="Write in English…"
          />
        );
      case 'grammar':
        return (
          <MultipleChoice
            key={item.id}
            item={item}
            onResult={handleResult}
            header={header}
            sub={
              <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-4 text-lg font-semibold text-slate-800">
                {item.sentence}
              </div>
            }
          />
        );
      case 'reading':
        return (
          <MultipleChoice
            key={item.id}
            item={item}
            onResult={handleResult}
            header={header}
            sub={
              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-4 text-slate-700 leading-relaxed">
                {item.passage}
              </div>
            }
          />
        );
      case 'conversation':
        return <Conversation key={item.id} item={item} onResult={handleResult} header={header} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Top bar: exit + progress */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={onExit} className="text-slate-400 hover:text-slate-700 font-semibold text-sm">
          ← Exit
        </button>
        <div className="flex-1">
          <ProgressBar value={index} total={queue.length} />
        </div>
        <span className="text-sm font-semibold text-slate-500 tabular-nums">
          {index + 1}/{queue.length}
        </span>
      </div>

      <Card className="p-6 sm:p-8">{renderItem()}</Card>
    </div>
  );
}
