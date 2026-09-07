import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CopyLinkButton } from './CopyLinkButton';
import { Reveal } from './Reveal';
import { Project } from '../data/projects';

export function ProjectCard({
  project,
  shareUrl,
  highlighted = false,
  isLandingStyle = false,
  isVerticalScroll = false,
}: {
  project: Project;
  shareUrl: string;
  highlighted?: boolean;
  isLandingStyle?: boolean;
  isVerticalScroll?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [contextOpen, setContextOpen] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const contextBtnRef = useRef<HTMLButtonElement>(null);

  const total = project.images.length;

  // A different project in the same slot must not inherit the previous index —
  // otherwise the Landing nav can land on an image that doesn't exist.
  useEffect(() => {
    setIndex(0);
  }, [project.id]);

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // Deep-linked card scrolls itself into view. window.scrollTo rather than
  // scrollIntoView, which hijacks the outer frame inside embedded previews.
  useEffect(() => {
    if (!highlighted || !cardRef.current) return;
    const id = window.setTimeout(() => {
      const el = cardRef.current;
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 72,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      });
    }, 150);
    return () => window.clearTimeout(id);
  }, [highlighted]);

  // Escape closes the context panel and returns focus to its trigger.
  useEffect(() => {
    if (!contextOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContextOpen(false);
        contextBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [contextOpen]);

  const onCarouselKey = (e: React.KeyboardEvent) => {
    if (total < 2) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  const control =
    'press flex size-9 items-center justify-center rounded-full border border-line bg-page/70 text-ink backdrop-blur-md transition-colors duration-200 hover:bg-page';

  return (
    <Reveal>
      <article
        ref={cardRef}
        className={`overflow-hidden rounded-[18px] bg-surface transition-shadow duration-300 ${
          isLandingStyle ? 'p-3 md:p-4' : 'p-6 md:p-8'
        } ${highlighted ? 'ring-1 ring-link' : ''}`}
      >
        {/* ── Spec row ──────────────────────────────────────────────────── */}
        <header
          className={`mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${
            isLandingStyle ? 'px-3 pt-2 md:px-4' : ''
          }`}
        >
          <div className="min-w-0">
            <h2 className="t-heading text-[22px] text-ink md:text-[28px]">{project.title}</h2>
            <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              {[
                ['Timeline', project.timeline],
                ['Design system', project.designSystem],
                ['Category', project.category],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-2">
                  <dt className="t-label text-xs text-ink-soft">{k}</dt>
                  <dd className="t-body text-[13px] text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <CopyLinkButton url={shareUrl} />
            {project.figmaLink && (
              <a
                href={project.figmaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center rounded-[980px] bg-raised px-4 py-2 text-[13px] text-ink transition-colors duration-200 hover:bg-overlay"
              >
                View in Figma
              </a>
            )}
          </div>
        </header>

        {/* ── Captures ──────────────────────────────────────────────────── */}
        {isVerticalScroll ? (
          <div className="flex flex-col gap-4">
            {project.images.map((img, i) => (
              <figure
                key={img}
                className="capture-frame overflow-hidden rounded-[12px] bg-page"
              >
                <img
                  src={img}
                  alt={`${project.title}, screen ${i + 1} of ${total}`}
                  loading="lazy"
                  className="capture h-auto w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </figure>
            ))}
          </div>
        ) : (
          <div
            className="capture-frame relative overflow-hidden rounded-[12px] bg-page"
            // No tabIndex here: it would add a tab stop with no visible affordance.
            // The prev/next buttons are the affordance, and keydown still catches
            // arrow presses bubbling up from them.
            onKeyDown={onCarouselKey}
            role={total > 1 ? 'group' : undefined}
            aria-roledescription={total > 1 ? 'carousel' : undefined}
            aria-label={total > 1 ? `${project.title} screens` : undefined}
          >
            {/* object-contain, never cover: these captures are the work itself,
                and cropping them is editing someone's composition. */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.28, 0.11, 0.32, 1] }}
                  src={project.images[index]}
                  alt={`${project.title}, screen ${index + 1} of ${total}`}
                  loading="lazy"
                  // Landing pages are full-page designs — cap them and you show a
                  // letterboxed sliver of the actual work.
                  className={`capture h-auto w-full object-contain ${
                    isLandingStyle ? '' : 'max-h-[86vh]'
                  }`}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous screen"
                  className={`${control} absolute left-3 top-1/2 -translate-y-1/2`}
                >
                  <ChevronLeft className="size-[18px]" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next screen"
                  className={`${control} absolute right-3 top-1/2 -translate-y-1/2`}
                >
                  <ChevronRight className="size-[18px]" />
                </button>
                <p
                  className="t-label absolute left-3 top-3 rounded-full bg-page/70 px-2.5 py-1 text-[11px] text-ink backdrop-blur-md"
                  aria-live="polite"
                >
                  {index + 1} of {total}
                </p>
              </>
            )}

            <AnimatePresence>
              {contextOpen && (
                <motion.div
                  // Materialize: blur and scale together, so it reads as a surface
                  // arriving rather than an image fading in.
                  initial={{ opacity: 0, transform: 'scale(0.97)' }}
                  animate={{ opacity: 1, transform: 'scale(1)' }}
                  exit={{ opacity: 0, transform: 'scale(0.97)' }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                  style={{ transformOrigin: 'bottom right' }}
                  role="dialog"
                  aria-label={`About ${project.title}`}
                  className="material-panel custom-scrollbar absolute bottom-16 right-3 z-20 max-h-[78%] w-[min(30rem,calc(100%-1.5rem))] overflow-y-auto rounded-[18px] border border-line p-6"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="t-label text-xs text-ink-soft">About this project</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setContextOpen(false);
                        contextBtnRef.current?.focus();
                      }}
                      aria-label="Close"
                      className="press -mr-1 -mt-1 rounded-full p-1 text-ink-soft transition-colors duration-200 hover:text-ink"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="t-body whitespace-pre-wrap text-[14px] text-ink-soft">
                    {project.context}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              ref={contextBtnRef}
              type="button"
              onClick={() => setContextOpen((o) => !o)}
              aria-expanded={contextOpen}
              className="press absolute bottom-3 right-3 z-20 rounded-[980px] bg-page/70 px-4 py-2 text-[13px] text-ink backdrop-blur-md transition-colors duration-200 hover:bg-page"
            >
              Project context
            </button>
          </div>
        )}
      </article>
    </Reveal>
  );
}
