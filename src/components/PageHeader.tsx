import React from 'react';
import { Reveal } from './Reveal';

/** Section head. Left-biased, capped well below the home hero's display size. */
export function PageHeader({
  index,
  title,
  blurb,
  count,
}: {
  index?: number;
  title: string;
  blurb: string;
  count: number;
}) {
  return (
    <Reveal>
      <header className="mb-10 max-w-[54ch] md:mb-14">
        <p className="t-label text-xs text-ink-soft">
          {index != null ? `${String(index).padStart(2, '0')} / ` : ''}
          {count} {count === 1 ? 'project' : 'projects'}
        </p>
        <h1 className="t-title mt-3 max-w-[18ch] text-[clamp(2rem,4.6vw,3.25rem)] text-ink">{title}</h1>
        <p className="t-body mt-4 max-w-[54ch] text-[17px] text-ink-soft">{blurb}</p>
      </header>
    </Reveal>
  );
}
