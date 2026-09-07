import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { PageHeader } from '../components/PageHeader';
import { ProjectCard } from '../components/ProjectCard';
import { landingPagesData } from '../data/projects';
import { sections } from '../data/sections';
import { shareUrlFor, toSlug } from '../lib/slug';

export function LandingPage() {
  const { slug } = useParams<{ slug?: string }>();
  const meta = sections.find((s) => s.section === 'landing');
  const index = sections.findIndex((s) => s.section === 'landing') + 1;

  // Derived from the URL, not mirrored into state: the route is already the single
  // source of truth, and duplicating it into useState is how the two drift apart.
  const active =
    (slug && landingPagesData.find((p) => toSlug(p.title) === slug)) || landingPagesData[0];

  return (
    <div className="px-5 py-14 sm:px-8 md:py-20 lg:px-16">
      <PageHeader
        index={index}
        title={meta?.label ?? 'Landing Pages'}
        blurb={meta?.blurb ?? ''}
        count={landingPagesData.length}
      />

      <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
        {/* Navigation, not tabs: each entry changes the URL. Real links give
            Cmd/middle-click and correct announcement, where a tablist with no
            tabpanel or roving tabindex would be worse than no ARIA at all.
            Sticky on lg+ — these captures run to ~9000px tall, so without it you'd
            scroll a whole design just to reach the next project. */}
        <nav
          aria-label="Landing pages"
          className="custom-scrollbar flex w-full shrink-0 flex-wrap gap-1 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:w-52 lg:flex-col lg:flex-nowrap lg:self-start lg:overflow-y-auto"
        >
          {landingPagesData.map((page) => {
            const selected = active.id === page.id;
            return (
              <Link
                key={page.id}
                to={`/landing/${toSlug(page.title)}`}
                aria-current={selected ? 'page' : undefined}
                className={`press shrink-0 whitespace-nowrap rounded-[980px] px-4 py-2 text-[14px] transition-colors duration-200 lg:w-full lg:whitespace-normal ${
                  selected ? 'bg-raised text-ink' : 'text-ink-soft hover:bg-surface hover:text-ink'
                }`}
              >
                {page.title}
              </Link>
            );
          })}
        </nav>

        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'linear' }}
            >
              <ProjectCard
                project={active}
                shareUrl={shareUrlFor('landing', active.title)}
                isLandingStyle
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
