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
import { ArrowLeftIcon } from '../components/ui/Icon.jsx';

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
        <div className="animate-pulse text-muted text-sm">Loading exercises…</div>
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
        <p className="text-muted">No items available right now.</p>
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
        <h2 className="font-serif font-bold text-ink text-h1">Session complete</h2>
        <p className="mt-2 text-muted">{title}</p>
        <div className="mt-6 inline-flex items-center gap-8 rounded-2xl bg-surface-2 border border-line px-8 py-5">
          <div>
            <div className="text-3xl font-serif font-bold text-ink">
              {correctCount}/{queue.length}
            </div>
            <div className="text-xs text-muted mt-1">Correct</div>
          </div>
          <div className="w-px h-10 bg-line" />
          <div>
            <div className="text-3xl font-serif font-bold text-accent-strong">{pct}%</div>
            <div className="text-xs text-muted mt-1">Accuracy</div>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          {pct >= 80
            ? 'Ausgezeichnet! Ready to level up.'
            : pct >= 50
            ? 'Solid progress — keep going!'
            : 'Review the explanations and try again.'}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="secondary" onClick={onExit}>
            Dashboard
          </Button>
          <Button onClick={restart}>Practice again</Button>
        </div>
      </Card>
    );
  }

  const header = (
    <div className="flex items-center justify-between mb-1">
      <Pill className="bg-ink/5 text-muted">{SKILL_LABEL[item.kind]}</Pill>
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
              <p className="mt-4 font-serif text-2xl font-semibold text-ink leading-relaxed">
                {item.prompt.replace('___', '_____')}
              </p>
            }
            sub={
              <p className="mt-1 text-sm text-muted">
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
              <p className="mt-4 text-muted text-sm">
                Find and fix the mistake. Rewrite the sentence correctly:
              </p>
            }
            sub={
              <p className="mt-2 font-serif text-2xl font-semibold text-warning-strong line-through decoration-warning/50">
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
            promptNode={<p className="mt-4 text-xs text-muted uppercase tracking-wide">Translate to German</p>}
            sub={<p className="mt-1 font-serif text-2xl font-semibold text-ink">{item.source}</p>}
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
            promptNode={<p className="mt-4 text-xs text-muted uppercase tracking-wide">Translate to English</p>}
            sub={<p className="mt-1 font-serif text-2xl font-semibold text-ink">{item.source}</p>}
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
              <div className="mt-4 rounded-xl bg-surface-2 border border-line p-4 font-serif text-lg font-semibold text-ink">
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
              <div className="mt-4 rounded-xl bg-surface-2 border border-line p-4 text-ink leading-relaxed">
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
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-muted hover:text-ink font-semibold text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeftIcon size={16} />
          Exit
        </button>
        <div className="flex-1">
          <ProgressBar value={index} total={queue.length} />
        </div>
        <span className="text-sm font-semibold text-muted tabular-nums">
          {index + 1}/{queue.length}
        </span>
      </div>

      <Card className="p-6 sm:p-8">{renderItem()}</Card>
    </div>
  );
}
