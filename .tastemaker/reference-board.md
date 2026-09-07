# Reference board — AR Tanveer portfolio

Created: 2026-09-06
Mode: Experience (the work leads) with a Persuade close
Design read: Portfolio showcase for founders + hiring managers evaluating a Sr. Product Designer, mode Experience, with a dark editorial-gallery lane.
Dials: variance 8, motion 6, density 4, art direction 8
Sources: **partially viewed** — trend/landscape search performed 2026-09-06 (URLs below);
individual reference sites were *not* opened and screenshotted, so per-site traits are inferred
from the aggregated write-ups rather than from pixels. Labelled honestly rather than overclaimed.

## Quality bar
- Linear.app (inferred, per tastemaker's own hero reference note): restraint at scale reads as
  premium. Huge type, one real product capture, one text-link secondary action. No badges, no glow.
- "SaaS Noir" direction reported as 2026's standout (sitesplaced): cinematic dark ground, liquid-glass
  surfaces, *italic editorial headlines*. Sets the bar for dark + editorial coexisting.
- "Irene" dark portfolio template (bryntaylor): deep near-black + vivid accent confined to project
  tags and typographic highlights, grid-driven so detailed case-study work stays legible.

## Borrow
- Palette/material: 2026 dark-portfolio guidance -> reject pure black; use a *tinted* near-black
  (we take warm, hue 87) for a jewel-like ground that flatters full-colour project screenshots.
- Type/hierarchy: portfolio trend reports -> italic serif callout inside an otherwise sans hierarchy,
  used to carry editorial voice in the headline itself, not as decoration.
- Layout/composition: asymmetric, unevenly weighted hero -> signals craft before a word is read.
  Numbered/categorised index (Editorial Index macrostructure) for the body.
- Motion/interaction: scroll-linked reveal between beats; ambient, low-amplitude only. Motion dial 6,
  not 9 — this is a portfolio, the work must stay the subject.
- Asset grammar: the project screenshots ARE the assets. 60+ real .webp/.png captures already in
  `public/`. No stock photography, no illustration — sourcing either would dilute a work portfolio.

## Avoid
- Slate-and-violet dark mode (`#0f172a` + indigo/purple gradient). The single most recognisable
  AI-dark-mode fingerprint, and literally what this repo ships today (`--background-light: #0f172a`).
- Glassmorphism as the whole idea. The current `.glass` utility + blurred aura blobs are 2021 defaults.
- Floating decorative lucide icons drifting behind content (current `iconPositions` / `bottomIconPositions`)
  — decoration that competes with the work and says nothing.
- Generic hero -> 3 feature cards -> testimonial -> CTA -> footer.
- Invented metrics. Every number on this site must be countable from real project data.

## Direction contract
- Thesis: this designer's judgement is visible in the restraint of his own site, before you open a case study.
- First viewport: an editorial masthead statement fold — one promise set large in Gloock with one italic
  accent phrase, a side rail indexing the five disciplines, an ambient warm-black ground. No cards above the fold.
- System: warm near-black editorial dark (seed 11), Gloock/Inter/DM Mono, hairline rules over shadows,
  side-rail nav, Editorial Index body, scroll-linked reveals.
- Risk: warm brass + editorial serif can tip "luxury wedding studio" if the accent runs hot or the serif
  is used for body copy. Mitigation: serif is display-only, brass is confined to rules/labels/active
  states, teal carries interactive state, and the project screenshots stay the loudest colour on screen.

## Sources
- https://elements.envato.com/learn/portfolio-trends
- https://www.bryntaylor.co.uk/writing/best-dark-framer-templates
- https://sitesplaced.com/blog/most-beautiful-website-designs-2026
- https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/
- https://www.adhamdannaway.com/blog/web-design/design-portfolio-inspiration
