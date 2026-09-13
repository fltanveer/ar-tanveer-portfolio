import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { menuNumber, sections } from '../data/sections';
import { vibeSites } from '../data/vibeSites';

export function VibeCodePage() {
  const meta = sections.find((s) => s.section === 'vibecode');
  const index = menuNumber('vibecode');

  return (
    <div className="px-5 py-14 sm:px-8 md:py-20 lg:px-16">
      <PageHeader
        index={index}
        title={meta?.label ?? 'Vibe Code'}
        blurb={meta?.blurb ?? ''}
        count={vibeSites.length}
      />

      {/* The position statement — his own words, kept verbatim. */}
      <Reveal>
        <p className="t-title mb-14 max-w-[34ch] text-[clamp(1.5rem,3vw,2.25rem)] text-ink">
          I don&rsquo;t just generate code. 
          <span className="text-ink-soft">
            I direct it. Vibe coding didn&rsquo;t replace my craft. It amplified it.
          </span>
        </p>
      </Reveal>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {vibeSites.map((site, i) => (
          <Reveal key={site.id} delay={(i % 3) * 0.06}>
            <li className="h-full">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="capture-frame lift group flex h-full flex-col overflow-hidden rounded-[18px] bg-surface"
              >
                <div className="aspect-[16/10] overflow-hidden bg-page">
                  <img
                    src={site.image}
                    alt={`${site.name} homepage`}
                    loading="lazy"
                    className="capture size-full object-cover object-top"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="min-w-0">
                    <p className="t-heading truncate text-[15px] text-ink">{site.name}</p>
                    <p className="t-body mt-0.5 truncate text-xs text-ink-soft">
                      {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-link transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
