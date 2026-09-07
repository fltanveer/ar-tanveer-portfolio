import React, { useEffect, useRef } from 'react';
import { Award, Briefcase, ChevronDown, GraduationCap, MapPin, Star, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  about,
  certifications,
  education,
  experience,
  identity,
  skills,
  stats,
} from '../data/profile';

function SectionHead({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <h3 className="t-label mb-3 flex items-center gap-2 text-xs text-ink-soft">
      {icon}
      {children}
    </h3>
  );
}

export function ProfileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Keep Tab inside the drawer while it owns the screen.
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      restoreTo.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-page/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Profile: ${identity.name}`}
            initial={{ transform: reduce ? 'translateX(0%)' : 'translateX(100%)', opacity: reduce ? 0 : 1 }}
            animate={{ transform: 'translateX(0%)', opacity: 1 }}
            exit={{ transform: reduce ? 'translateX(0%)' : 'translateX(100%)', opacity: reduce ? 0 : 1 }}
            // iOS-like drawer curve. Enter is deliberate; exit is snappier.
            transition={reduce ? { duration: 0.2 } : { type: 'spring', bounce: 0.2, duration: 0.3 }}
            className="material-panel fixed inset-y-0 right-0 z-50 flex w-[min(23rem,100vw)] flex-col border-l border-line"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close profile"
              className="press absolute right-4 top-4 z-10 rounded-full p-2 text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              <X className="size-5" />
            </button>

            <div className="custom-scrollbar flex-1 overflow-y-auto [overscroll-behavior:contain]">
              {/* Header */}
              <div className="border-b border-line px-6 pb-6 pt-10">
                <img
                  src={identity.avatar}
                  alt={identity.name}
                  width={72}
                  height={72}
                  className="rounded-full border border-line object-cover"
                  style={{ width: 72, height: 72 }}
                />
                <p className="t-label mt-4 text-xs text-ink-soft">
                  Designer
                </p>
                <h2 className="t-heading mt-1.5 text-2xl text-ink">{identity.shortName}</h2>
                <p className="mt-1 text-sm text-ink-soft">{identity.name}</p>
                <p className="mt-3 text-sm text-ink">{identity.title}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
                  <MapPin className="size-3.5 shrink-0" />
                  {identity.location}
                </p>

                <dl className="mt-5 flex gap-6">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dd className="t-heading text-lg tabular-nums text-ink">{s.figure}</dd>
                      <dt className="mt-0.5 text-[11px] text-ink-soft">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              {/* About */}
              <div className="border-b border-line px-6 py-5">
                <SectionHead>About</SectionHead>
                <p className="text-sm leading-relaxed text-ink-soft">{about}</p>
              </div>

              {/* Experience */}
              <div className="border-b border-line px-6 py-5">
                <SectionHead icon={<Briefcase className="size-3.5" />}>Experience</SectionHead>
                <ol className="flex flex-col gap-5">
                  {experience.map((exp) => (
                    <li key={`${exp.company}-${exp.period}`} className="border-l border-line pl-4">
                      <p className="text-sm text-ink">{exp.role}</p>
                      <p className="mt-0.5 text-xs text-ink-soft">
                        {exp.company}
                        {exp.employment ? ` · ${exp.employment}` : ''}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink-soft">
                        {exp.period} · {exp.location}
                        {exp.arrangement ? ` · ${exp.arrangement}` : ''}
                      </p>

                      {/* Native disclosure: focusable, keyboard-operable and
                          announced without a line of ARIA. Eight roles' worth of
                          description would otherwise be a wall of text in a 23rem
                          drawer, and the descriptions are his words to keep whole
                          rather than mine to trim. */}
                      {exp.description && (
                        <details className="group mt-2">
                          <summary className="press inline-flex cursor-pointer list-none items-center gap-1 rounded-full text-[11px] text-link transition-opacity duration-200 hover:opacity-80 [&::-webkit-details-marker]:hidden">
                            <span className="group-open:hidden">Read more</span>
                            <span className="hidden group-open:inline">Show less</span>
                            <ChevronDown
                              aria-hidden="true"
                              className="size-3 transition-transform duration-200 group-open:rotate-180"
                            />
                          </summary>
                          <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-ink-soft">
                            {exp.description}
                          </p>
                        </details>
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Skills */}
              <div className="border-b border-line px-6 py-5">
                <SectionHead icon={<Star className="size-3.5" />}>Skills</SectionHead>
                <ul className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-raised px-3 py-1 text-xs text-ink-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="border-b border-line px-6 py-5">
                <SectionHead icon={<GraduationCap className="size-3.5" />}>Education</SectionHead>
                <ol className="flex flex-col gap-4">
                  {education.map((ed) => (
                    <li key={ed.school} className="border-l border-line pl-4">
                      <p className="text-sm text-ink">{ed.school}</p>
                      <p className="mt-0.5 text-xs text-ink-soft">{ed.detail}</p>
                      <p className="mt-0.5 text-[11px] text-ink-soft">{ed.period}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Certifications */}
              <div className="px-6 py-5">
                <SectionHead icon={<Award className="size-3.5" />}>Certifications</SectionHead>
                <ul className="flex flex-col gap-4">
                  {certifications.map((cert) => (
                    <li
                      key={cert.name}
                      className="border-l border-line pl-4 text-xs leading-relaxed text-ink-soft"
                    >
                      {cert.name}
                      <span className="mt-0.5 block text-[11px] text-ink-soft">
                        {cert.issuer} · {cert.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* One filled action only. GitHub sits beside it as a neutral
                control rather than a second primary, so the pair still reads as
                one obvious action and one alternative. */}
            <div className="flex gap-2 border-t border-line p-5">
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex flex-1 items-center justify-center gap-2 rounded-[980px] bg-fill py-3 text-sm text-on-fill transition-opacity duration-200 hover:opacity-90"
              >
                LinkedIn
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex flex-1 items-center justify-center gap-2 rounded-[980px] bg-raised py-3 text-sm text-ink transition-colors duration-200 hover:bg-overlay"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
