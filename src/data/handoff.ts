/**
 * The handoff page describes THIS site's own token system, so every figure here
 * is countable from the repo rather than asserted.
 *
 * `usages` came from grepping src/ for each utility class. If tokens move, re-run:
 *   grep -roh "text-ink-soft\|border-line\|text-link\|bg-surface\|bg-raised\|bg-fill" src/ | sort | uniq -c
 *
 * Nothing here claims a pipeline that isn't run. Variables are exported from Figma
 * as JSON by a plugin and committed; the CSS layer is authored against that export.
 * That is a real workflow with a manual seam in it, and saying so is the point —
 * a fabricated CI badge is the first thing an engineering lead would test.
 */

export interface TokenTrace {
  id: string;
  /** Figma variable, collection + path exactly as it reads in the panel. */
  figma: string;
  collection: string;
  /** Dot path in the exported JSON. */
  json: string;
  /** Tier 1. Null where the semantic holds a literal — see `note`. */
  primitive: string | null;
  /** Tier 2 — the only tier a component may reference. */
  semantic: string;
  /** What a developer actually types. */
  className: string;
  /** Rendered value, for the swatch. */
  value: string;
  /** Usages of `className` across src/. */
  usages: number;
  /** The decision that ships with the token, not in a separate spec. */
  note: string;
}

export const tokenTraces: TokenTrace[] = [
  {
    id: 'text-secondary',
    figma: 'color/text/secondary',
    collection: 'Semantic',
    json: 'color.text.secondary',
    primitive: '--gray-400',
    semantic: '--color-ink-soft',
    className: 'text-ink-soft',
    value: '#aeaeb2',
    usages: 40,
    note: 'Clears 4.5:1 on all four surfaces: page, surface, raised and overlay. The floor was measured against each, not against the page background alone.',
  },
  {
    id: 'border-default',
    figma: 'color/border/default',
    collection: 'Semantic',
    json: 'color.border.default',
    primitive: null,
    semantic: '--color-line',
    className: 'border-line',
    value: 'rgb(255 255 255 / 0.11)',
    usages: 25,
    note: 'Holds a literal rather than pointing at a primitive: it is an alpha over whatever sits beneath, so it has no fixed value to name in tier 1.',
  },
  {
    id: 'accent',
    figma: 'color/accent/default',
    collection: 'Semantic',
    json: 'color.accent.default',
    primitive: '--orange-500',
    semantic: '--color-link',
    className: 'text-link',
    value: '#ff9f0a',
    usages: 9,
    note: 'As text it clears 4.5 on every surface. As a fill it takes a BLACK label, because white on this orange measures 2.06 and fails. So the label colour changes, never the accent.',
  },
  {
    id: 'bg-surface',
    figma: 'color/bg/surface',
    collection: 'Semantic',
    json: 'color.bg.surface',
    primitive: '--gray-950',
    semantic: '--color-surface',
    className: 'bg-surface',
    value: '#1d1d1f',
    usages: 7,
    note: 'Card ground. Separation from the page comes from luminance and a hairline, not a shadow. Shadows read as smudges on a near-black ground.',
  },
  {
    id: 'bg-raised',
    figma: 'color/bg/raised',
    collection: 'Semantic',
    json: 'color.bg.raised',
    primitive: '--gray-900',
    semantic: '--color-raised',
    className: 'bg-raised',
    value: '#2c2c2e',
    usages: 6,
    note: 'One step above surface. Carries the selected state in the sidebar, marked by fill and luminance, never by hue.',
  },
];

/** The four surfaces one name has to survive. */
export const stages = [
  { key: 'figma', label: 'Figma', caption: 'Variable' },
  { key: 'json', label: 'JSON', caption: 'Plugin export' },
  { key: 'css', label: 'CSS', caption: 'Custom property' },
  { key: 'code', label: 'Code', caption: 'What a dev types' },
] as const;

/** Counted from src/index.css. Restraint is the claim, so the numbers are small. */
export const systemFacts = {
  primitives: 7,
  semantics: 19,
  usages: 89,
  violations: 0,
};
