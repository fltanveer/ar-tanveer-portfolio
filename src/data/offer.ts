/**
 * What a client gets, in his words where he supplied them.
 *
 * PROVENANCE, because it decides how each block is allowed to be presented:
 *
 * - `principles` — the three words are his. The one-line glosses are MINE, and
 *   they define the term rather than claiming anything about him. Still worth his
 *   sign-off before this ships.
 * - `deliverables`, `tools`, `industries` — his, verbatim.
 * - `outcomes` — HIS FIGURES, and nothing in this repo can verify them. They are
 *   deliberately kept generic ("SaaS platform", not a named client) because that
 *   is how he stated them; attaching them to a project in projects.ts would be me
 *   inventing an association he never made. No logos, no client names, no
 *   "verified" styling. A client who asks "which project was the 40%?" should get
 *   that answer from him, not from a badge on a page.
 */

export const principles = [
  {
    word: 'Clarity',
    gloss: 'You always know what this is, where you are, and what to do next.',
  },
  {
    word: 'Trust',
    gloss: 'Nothing surprises you. The product behaves the way it looks like it will.',
  },
  {
    word: 'Momentum',
    gloss: 'Each step makes the next one easier, so people finish what they started.',
  },
];

export const deliverables = [
  { item: 'Wireframes', note: 'Structure agreed before a single pixel is styled.' },
  { item: 'User flows', note: 'Every path mapped, including the ones that go wrong.' },
  { item: 'Interactive prototypes', note: 'Clickable, so decisions get made on behaviour.' },
  { item: 'Design systems', note: 'Tokens and components, not a folder of screens.' },
  { item: 'Developer-ready handoff', note: 'Named, organised, and built to be consumed.' },
];

export const tools = ['Figma', 'FigJam', 'Maze', 'Zeplin'];

export const industries = [
  'FinTech',
  'HealthTech',
  'EdTech',
  'Retail',
  'B2B SaaS',
  'On-demand platforms',
];

export const outcomes = [
  {
    kind: 'SaaS platform',
    results: [
      'Engagement up 40% after redesigning core workflows',
      'Support tickets down 35% because users stopped getting lost',
      'Onboarding time to value cut in half',
    ],
  },
  {
    kind: 'E-commerce platform',
    results: [
      'Conversions up 25% after a checkout redesign',
      'Top three cart abandonment points removed',
      'Mobile purchase journey rebuilt',
    ],
  },
  {
    kind: 'Mobile app, iOS and Android',
    results: [
      'User retention doubled after rebuilding onboarding',
      'Task completion three times faster',
      'Accessibility scores improved significantly',
    ],
  },
];
