import React, { useEffect, useRef, useState } from 'react';
import { Check, Link2 } from 'lucide-react';

type State = 'idle' | 'copied' | 'failed';

export function CopyLinkButton({ url }: { url: string }) {
  const [state, setState] = useState<State>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url);
      setState('copied');
    } catch {
      // Clipboard can reject on insecure origins or when permission is denied.
      // Say so rather than appearing to have worked.
      setState('failed');
    }
    timer.current = window.setTimeout(() => setState('idle'), 2000);
  };

  const label =
    state === 'copied' ? 'Link copied' : state === 'failed' ? 'Press ⌘C' : 'Copy link';

  return (
    <button
      type="button"
      onClick={copy}
      className={`press inline-flex items-center gap-1.5 rounded-[980px] px-4 py-2 text-[13px] transition-colors duration-200 ${
        state === 'copied' ? 'bg-raised text-link' : 'bg-raised text-ink hover:bg-overlay'
      }`}
    >
      {state === 'copied' ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
      <span aria-live="polite">{label}</span>
    </button>
  );
}
