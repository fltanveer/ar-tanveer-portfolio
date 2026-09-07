import React from 'react';
import { useLocation } from 'react-router-dom';
import { sections, utilityNav } from '../data/sections';

/**
 * Orange wash in the top-right of a section page, carrying that page's own menu
 * icon repeated as a faint motif.
 *
 * One glyph per page, not the whole menu: the side rail is the navigation, and a
 * second copy of it floating in the corner would compete with it for the same
 * job. Repeating a single mark at different sizes makes it a texture instead —
 * it says which page you're on without asking to be read.
 *
 * No chips, borders or fills, and no fade on the glyphs. They are solid page
 * black, punched straight through the wash, so they subtract light rather than
 * adding a second source of it and depth comes from size alone. Being solid
 * black they can only lower the brightness under the copy, never raise it.
 *
 * `aria-hidden`: it carries no information the rail doesn't already announce.
 */

const lookup = [
  ...sections.map((s) => ({ section: s.section, Icon: s.icon })),
  ...utilityNav.map((u) => ({ section: u.section, Icon: u.icon })),
];

// Scattered and unevenly sized. Big and faint reads as distance; small and
// slightly stronger reads as near. A grid of equal marks would read as a pattern
// swatch, which is a different and much louder thing.
const marks = [
  { size: 128, right: '4%', top: '2%', rotate: -8, dur: 15, delay: 0 },
  { size: 44, right: '25%', top: '6%', rotate: 12, dur: 11, delay: 2.2 },
  { size: 76, right: '15%', top: '46%', rotate: 5, dur: 13, delay: 1.1 },
  { size: 28, right: '37%', top: '20%', rotate: -14, dur: 12, delay: 3.6 },
  { size: 96, right: '34%', top: '58%', rotate: 9, dur: 17, delay: 0.7 },
  { size: 34, right: '47%', top: '34%', rotate: -5, dur: 14, delay: 4.4 },
];

export function PageAura() {
  const { pathname } = useLocation();
  const current = pathname.split('/')[1] || 'home';
  const match = lookup.find((l) => l.section === current);
  if (!match) return null;
  const { Icon } = match;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] overflow-hidden"
    >
      <span className="page-aura absolute inset-0" />

      {marks.map((m, i) => (
        <span
          key={`${m.right}-${m.top}`}
          className={`aura-mark absolute hidden text-page md:block ${
            i % 2 === 0 ? 'aura-mark-a' : 'aura-mark-b'
          }`}
          style={
            {
              right: m.right,
              top: m.top,
              // The resting angle lives in a variable so the keyframes can wobble
              // around it. Animating `rotate` outright would throw the tilt away.
              '--rot': `${m.rotate}deg`,
              animationDuration: `${m.dur}s`,
              animationDelay: `${m.delay}s`,
            } as React.CSSProperties
          }
        >
          <Icon size={m.size} strokeWidth={1.25} />
        </span>
      ))}
    </div>
  );
}
