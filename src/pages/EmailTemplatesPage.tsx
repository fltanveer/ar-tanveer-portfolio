import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, ExternalLink, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { UpworkMark } from '../components/BrandMarks';
import { Reveal } from '../components/Reveal';
import { emailTemplates, type EmailTemplate } from '../data/emailTemplates';
import { identity } from '../data/profile';
import './email-templates.css';

const WIDE = '(min-width: 1280px)';
const MEDIUM = '(min-width: 640px)';

function currentColumnCount() {
  if (typeof window === 'undefined') return 3;
  if (window.matchMedia(WIDE).matches) return 3;
  return window.matchMedia(MEDIUM).matches ? 2 : 1;
}

/** Column count for the gallery, kept in step with the same breakpoints as the CSS. */
function useColumnCount() {
  const [count, setCount] = useState(currentColumnCount);
  useEffect(() => {
    const queries = [WIDE, MEDIUM].map((query) => window.matchMedia(query));
    const update = () => setCount(currentColumnCount());
    queries.forEach((query) => query.addEventListener('change', update));
    return () => queries.forEach((query) => query.removeEventListener('change', update));
  }, []);
  return count;
}

/** Caption and gap under each preview, as a fraction of the column width. */
const CARD_EXTRA = 0.28;

/** Smallest column shortfall, in column widths, worth filling with the end card. */
const END_CARD_MIN_GAP = 0.7;

/** Closes the shortest column. Stretches to its bottom so every column ends level. */
function EndCard() {
  return (
    <a href={identity.upwork} target="_blank" rel="noopener noreferrer" className="email-end-card">
      <span className="t-label text-xs text-ink-soft">Your inbox next</span>
      <span className="email-end-card-body">
        <span className="t-heading block text-[26px] leading-[1.15] text-ink">Need emails people actually open?</span>
        <span className="mt-3 block text-[15px] leading-relaxed text-ink-soft">
          Welcome flows, launches and monthly summaries, designed in Figma and handed off as clean, table-based HTML.
        </span>
        <span className="email-end-card-action">
          <UpworkMark className="size-5" />
          Hire me on Upwork
          <ChevronRight size={16} aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}

/**
 * Which column each template goes in. The first templates keep the top row in
 * data order; the rest are placed so the columns end as close to level as
 * possible. Dealing cards out in turn ignores their heights, which is how one
 * column ended a whole email short of the others.
 *
 * Exhaustive for a gallery this size (3^7 placements), greedy beyond that.
 * Within a column, templates stay in data order.
 */
function placeInColumns(templates: EmailTemplate[], count: number): number[] {
  const cost = (t: EmailTemplate) => t.height / t.width + CARD_EXTRA;
  const placement = templates.map((_, index) => (index < count ? index : -1));
  if (templates.length <= count) return placement;

  const sums = Array.from({ length: count }, (_, column) => cost(templates[column]));
  const rest = templates.map((_, index) => index).slice(count);
  const spread = () => Math.max(...sums) - Math.min(...sums);

  if (count ** rest.length > 200_000) {
    rest.forEach((index) => {
      const column = sums.indexOf(Math.min(...sums));
      placement[index] = column;
      sums[column] += cost(templates[index]);
    });
    return placement;
  }

  let best: number[] = [];
  let bestSpread = Infinity;
  const choice: number[] = [];
  const walk = (k: number) => {
    if (k === rest.length) {
      if (spread() < bestSpread - 1e-9) {
        bestSpread = spread();
        best = [...choice];
      }
      return;
    }
    for (let column = 0; column < count; column++) {
      sums[column] += cost(templates[rest[k]]);
      choice[k] = column;
      walk(k + 1);
      sums[column] -= cost(templates[rest[k]]);
    }
  };
  walk(0);
  rest.forEach((index, k) => { placement[index] = best[k]; });
  return placement;
}

export function EmailTemplatesPage() {
  const columnCount = useColumnCount();
  const { placement, shortColumn } = useMemo(() => {
    const placement = placeInColumns(emailTemplates, columnCount);
    const sums: number[] = Array(columnCount).fill(0);
    emailTemplates.forEach((t, index) => { sums[placement[index]] += t.height / t.width + CARD_EXTRA; });
    // Even the best placement leaves one column short when the emails can't be
    // split evenly. Past about a card's worth of gap, a closing card fills it.
    const shortest = sums.indexOf(Math.min(...sums));
    const gap = Math.max(...sums) - sums[shortest];
    return { placement, shortColumn: columnCount > 1 && gap >= END_CARD_MIN_GAP ? shortest : -1 };
  }, [columnCount]);
  const [params, setParams] = useSearchParams();
  const selected = emailTemplates.find((template) => template.id === params.get('template'));
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => setParams({}, { replace: true, preventScrollReset: true });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <div className="px-5 py-14 sm:px-8 md:py-20 lg:px-16">
      <Reveal>
        <header className="email-gallery-header">
          <div>
            <p className="t-label text-xs text-ink-soft">{emailTemplates.length} campaigns</p>
            <h1 className="t-title mt-3 text-[clamp(2rem,4.6vw,3.25rem)] text-ink">Email Templates</h1>
            <p className="t-body mt-4 max-w-[49ch] text-[17px] text-ink-soft">
              Small canvas. Big personality. Welcome notes, new arrivals, and a few good reasons to open your inbox.
            </p>
          </div>
          <p className="t-label text-xs text-ink-soft">Welcomes, launches, receipts and reminders.</p>
        </header>
      </Reveal>

      {/* Top row in data order, then height-balanced columns. See placeInColumns. */}
      <div className="email-masonry">
        {Array.from({ length: columnCount }, (_, column) => (
          <div key={column} className="email-masonry-column">
        {emailTemplates.map((template, index) => placement[index] !== column ? null : (
          <Reveal key={template.id} className="email-gallery-item" delay={column * 0.05}>
            <article>
              <Link
                to={`?template=${template.id}`}
                preventScrollReset
                className="email-preview-link group"
                aria-label={`Preview ${template.brand}: ${template.title}`}
                aria-haspopup="dialog"
              >
                <img
                  src={`/email-templates/${template.id}-preview.webp`}
                  alt={`${template.brand} email design in ${template.palette.toLowerCase()}: ${template.title}`}
                  width={template.width}
                  height={template.height}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="email-preview-image"
                />
                <span className="email-preview-action"><span>View email</span><ArrowUpRight size={16} aria-hidden="true" /></span>
              </Link>
              <div className="email-card-caption">
                <div>
                  <h2 className="t-heading text-[18px] text-ink">{template.brand}</h2>
                  <p className="mt-1 text-xs text-ink-soft">{template.category}</p>
                </div>
                <span className="t-label text-[11px] tabular-nums text-ink-soft">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </article>
          </Reveal>
        ))}
            {column === shortColumn && <EndCard />}
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="email-dialog"
        aria-labelledby="email-dialog-title"
        onCancel={(event) => { event.preventDefault(); close(); }}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      >
        {selected && (
          <div className="email-dialog-content">
            <header className="email-dialog-toolbar">
              <div className="min-w-0">
                <h2 id="email-dialog-title" className="t-heading truncate text-[17px]">{selected.brand}</h2>
                <p className="mt-1 truncate text-xs text-ink-soft">{selected.category}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a href={`/email-templates/${selected.id}.html`} target="_blank" rel="noopener noreferrer" className="email-dialog-button" aria-label="Open HTML email in a new tab" title="Open HTML email">
                  <ExternalLink size={18} aria-hidden="true" />
                </a>
                <button type="button" onClick={close} className="email-dialog-button" aria-label="Close email preview" autoFocus>
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </header>
            <div className="email-dialog-scroll">
              <img src={`/email-templates/${selected.id}-preview.webp`} width={selected.width} height={selected.height} alt={`${selected.brand}: ${selected.title}. Full email design.`} className="email-dialog-image" />
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
