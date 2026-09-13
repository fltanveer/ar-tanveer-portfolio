import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { screenshotSets, screenshotSrc } from '../data/appScreenshots';
import { menuNumber } from '../data/sections';
import './app-screenshots.css';

export function AppScreenshotsPage() {
  const index = menuNumber('app-screenshots');
  const total = screenshotSets.reduce((sum, set) => sum + set.panels.length, 0);

  const [params, setParams] = useSearchParams();
  const set = screenshotSets.find((s) => s.id === params.get('app'));
  const shot = Math.min(Math.max(Number(params.get('shot')) || 0, 0), (set?.panels.length ?? 1) - 1);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => setParams({}, { replace: true, preventScrollReset: true });
  const go = (next: number) => {
    if (!set) return;
    const wrapped = (next + set.panels.length) % set.panels.length;
    setParams({ app: set.id, shot: String(wrapped) }, { replace: true, preventScrollReset: true });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!set || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [set]);

  return (
    <div className="px-5 py-14 sm:px-8 md:py-20 lg:px-16">
      <Reveal>
        <header className="shots-header">
          <div>
            <p className="t-label text-xs text-ink-soft">
              {String(index).padStart(2, '0')} · {screenshotSets.length} apps, {total} screens
            </p>
            <h1 className="t-title mt-3 text-[clamp(2rem,4.6vw,3.25rem)] text-ink">App Screenshots</h1>
            <p className="t-body mt-4 max-w-[52ch] text-[17px] text-ink-soft">
              The first five seconds of a store listing. Each set is built from the app&rsquo;s own screens in Figma, with a look that belongs to that app alone.
            </p>
          </div>
          <p className="t-label text-xs text-ink-soft">Headlines, device frames and art direction.</p>
        </header>
      </Reveal>

      {screenshotSets.map((s) => (
        <section key={s.id} className="shots-set" aria-labelledby={`shots-${s.id}`}>
          <Reveal>
            <div className="shots-set-head">
              <div>
                <h2 id={`shots-${s.id}`} className="t-heading text-[22px] text-ink">{s.name}</h2>
                <p className="mt-1 text-xs text-ink-soft">{s.category}</p>
              </div>
              <a href={s.figmaLink} target="_blank" rel="noopener noreferrer" className="shots-figma">
                View in Figma <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="shots-row">
              {s.panels.map((headline, i) => (
                <li key={headline}>
                  <Link
                    to={`?app=${s.id}&shot=${i}`}
                    preventScrollReset
                    className="shots-panel"
                    aria-haspopup="dialog"
                    aria-label={`${s.name}, screen ${i + 1} of ${s.panels.length}: ${headline}`}
                  >
                    <img src={screenshotSrc(s.id, i)} alt="" width={430} height={932} loading="lazy" decoding="async" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ))}

      <dialog
        ref={dialogRef}
        className="shots-dialog"
        aria-labelledby="shots-dialog-title"
        onCancel={(event) => { event.preventDefault(); close(); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') go(shot + 1);
          if (event.key === 'ArrowLeft') go(shot - 1);
        }}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      >
        {set && (
          <div className="shots-dialog-inner">
            <header className="shots-dialog-bar">
              <div className="min-w-0">
                <h2 id="shots-dialog-title" className="t-heading truncate text-[17px]">{set.name}</h2>
                <p className="mt-1 truncate text-xs text-ink-soft" aria-live="polite">
                  {shot + 1} of {set.panels.length} · {set.panels[shot]}
                </p>
              </div>
              <button type="button" onClick={close} className="shots-dialog-button" aria-label="Close screenshots" autoFocus>
                <X size={20} aria-hidden="true" />
              </button>
            </header>
            <div className="shots-dialog-stage">
              <button type="button" onClick={() => go(shot - 1)} className="shots-dialog-button" aria-label="Previous screen">
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <img src={screenshotSrc(set.id, shot)} alt={set.panels[shot]} width={430} height={932} />
              <button type="button" onClick={() => go(shot + 1)} className="shots-dialog-button" aria-label="Next screen">
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="shots-dots" aria-hidden="true">
              {set.panels.map((headline, i) => <span key={headline} data-on={i === shot} />)}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
