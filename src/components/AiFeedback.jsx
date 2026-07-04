import { useState } from 'react';
import Button from './ui/Button.jsx';
import { SparkleIcon } from './ui/Icon.jsx';
import { getAiFeedback, isAiEnabled } from '../lib/ai.js';

const ERROR_MESSAGES = {
  cap: 'Daily AI limit reached — the built-in explanations cover the rest of today.',
  not_configured: 'AI feedback isn’t set up on the server yet (no API key). The built-in explanation still applies.',
  unavailable: 'AI feedback is unreachable right now. The built-in explanation still applies.',
};

// On-demand AI feedback. Renders nothing unless the feature flag is on, and
// always degrades to the static explanations when the request can't be served.
export default function AiFeedback({ type, payload, label = 'Ask the AI tutor' }) {
  const [state, setState] = useState({ status: 'idle' });

  if (!isAiEnabled()) return null;

  const ask = async () => {
    setState({ status: 'loading' });
    const result = await getAiFeedback(type, payload);
    if (result.text) setState({ status: 'done', text: result.text, cached: result.cached });
    else setState({ status: 'error', error: result.error });
  };

  if (state.status === 'idle') {
    return (
      <div className="mt-3">
        <Button variant="secondary" onClick={ask}>
          {label}
        </Button>
      </div>
    );
  }

  if (state.status === 'loading') {
    return <p className="mt-3 text-sm text-muted animate-pulse">Asking the tutor…</p>;
  }

  if (state.status === 'error') {
    return <p className="mt-3 text-sm text-muted">{ERROR_MESSAGES[state.error] || ERROR_MESSAGES.unavailable}</p>;
  }

  return (
    <div className="mt-3 rounded-xl bg-accent/10 border border-accent/20 p-4 pop">
      <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-accent-strong font-semibold mb-1">
        <SparkleIcon size={14} />
        AI tutor{state.cached ? ' · from cache' : ''}
      </p>
      <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">{state.text}</p>
    </div>
  );
}
