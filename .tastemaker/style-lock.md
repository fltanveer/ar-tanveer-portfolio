# Style lock — AR Tanveer portfolio

Established: 2026-09-06. **Superseded the warm brass/serif editorial direction the same day**
(user: "i dont like this gold dust look. i want apple like design"). The layout that direction
produced was kept ("i liked the previus layout style better but with apply design style");
only the visual system was replaced.

Source: Apple's own shipped dark values + `apple-design` skill (WWDC *Designing Fluid Interfaces*,
*The Details of UI Typography*, *Principles of Great Design*).

## Palette — two tiers

Primitives name a value and are never referenced by a component; semantic tokens name a job and
are the only tier components use.

### Primitives

| Token | Hex | Source |
|---|---|---|
| `--gray-1000` | `#000000` | apple.com dark section ground |
| `--gray-950` | `#1d1d1f` | Apple near-black panel |
| `--gray-900` | `#2c2c2e` | iOS elevated dark surface |
| `--gray-850` | `#3a3a3c` | iOS tertiary dark surface |
| `--gray-400` | `#aeaeb2` | secondary text |
| `--gray-50` | `#f5f5f7` | Apple off-white — never pure `#fff` for body text |
| `--orange-500` | `#ff9f0a` | iOS dark systemOrange — links **and** fills |

**The ground is achromatic.** Hierarchy comes from luminance and material, never hue. Exactly one
chromatic family exists, and it means "interactive".

### The accent is orange, and its label is black

Replaced the blue accent on user request. Orange needs only **one** value, where blue needed two —
but the label colour flips:

- `#ff9f0a` as **text**: 10.22 / 8.19 / 6.78 / 5.52 across the four surfaces. Passes everywhere.
- `#ff9f0a` as a **fill**: takes a **black** label (10.22). White on it measures **2.06**.
- White fails on *every* orange worth using (2.06–3.56 across six candidates tested), so the fix is
  the label colour, not a darker orange — darkening far enough to carry white text stops reading as
  orange at all.

`--color-on-fill` is therefore `#000000`, and `::selection` uses black on orange too.

Checked against the work: the Dashboards project is itself heavily orange (`#e8722c`). The chrome
orange is brighter and used sparingly, so on that page the two read as distinct rather than
competing — verified in the browser, not assumed.

### Semantic tokens — the only tier components reference

```
--color-page     -> gray-1000    --color-ink       -> gray-50
--color-surface  -> gray-950     --color-ink-soft  -> gray-400
--color-raised   -> gray-900     --color-link      -> blue-link  (text)
--color-overlay  -> gray-850     --color-fill      -> blue-fill  (fills)
--color-line          -> rgb(255 255 255 / 0.11)
--color-line-strong   -> rgb(255 255 255 / 0.20)
--color-on-fill       -> #ffffff
```

Deliberately no `--color-primary`: it collides with `--color-text-primary`.

## Color contract — measured, not assumed

| Pair | Ratio | Floor | |
|---|---:|---:|---|
| ink on page / surface / raised / overlay | 19.29 / 15.46 / 12.80 / 10.42 | 4.5 | PASS |
| ink-soft on page / surface / raised / overlay | 9.50 / 7.61 / 6.30 / 5.13 | 4.5 | PASS |
| link on page / surface / raised / overlay | 10.22 / 8.19 / 6.78 / 5.52 | 4.5 | PASS |
| black label on fill | 10.22 | 4.5 | PASS |
| fill vs page (is the button visible) | 10.22 | 3.0 | PASS |

**Zero failures across all six routes**, verified in-browser on rendered pairs (canvas-resolved
colour, composited backgrounds walked up the tree). Tightest margin on the whole site is 6.30.

### Correction made during the build

`#6e6e73` (Apple's tertiary gray) was defined as a `--color-ink-faint` token and then used for
rail numerals, project counts, spec labels and the footer line. It measures **4.14** on black and
**2.75** on the active rail row — below the text floor, and on `raised` below the graphical floor
too. Every use moved to `ink-soft` (`#aeaeb2`, clears 4.5 on all four surfaces) and **the token was
deleted**, since nothing referenced it any more.

This is the second time this exact mistake was caught by measurement in this project — a ramp's
darkest "muted" step reads as a text colour on paper and is not one. Measure before shipping it.

## Typography

- **Family:** the platform stack — `-apple-system, BlinkMacSystemFont, 'SF Pro Display',
  'SF Pro Text', 'Helvetica Neue', 'Inter', system-ui`. On Apple hardware this resolves to the real
  SF Pro, which already ships optical sizing, tracking tables and legibility tuning. Inter is the
  cross-platform stand-in, not the first choice. No serif, no monospace anywhere.
- **Tracking is size-specific — a single letter-spacing value is wrong somewhere.** Large text
  reads too loose as it grows; small text too tight. Five roles, each pairing weight + leading +
  tracking as a set:

| Class | Weight | Line-height | Tracking | Use |
|---|---|---|---|---|
| `.t-display` | 600 | 1.05 | -0.025em | Hero, stat figures |
| `.t-title` | 600 | 1.1 | -0.02em | Section headlines |
| `.t-heading` | 600 | 1.2 | -0.01em | Card titles |
| `.t-body` | 400 | 1.5 | 0 | Body copy |
| `.t-label` | 500 | 1.3 | **+0.01em** | Small labels — positive, the inverse of display |

## Shape language

- Radii: **8 / 12 / 18 / 28px**, plus `980px` for pill controls. Cards are 18px, image frames 12px,
  every button and nav pill is fully round.
- **No shadows.** On a black ground they're invisible; separation is hairlines and surface lift.
- Elevation ladder: page `#000` -> surface `#1d1d1f` -> raised `#2c2c2e` -> overlay `#3a3a3c`.

## Materials

Translucent chrome that content scrolls *under*, not opaque bars consuming a fixed strip.
`.material-chrome` (mobile bar) and `.material-panel` (drawer, sheets, popover) use
`backdrop-filter: saturate(180%) blur(20–30px)`.

Both degrade properly: `prefers-reduced-transparency: reduce` and `prefers-contrast: more` drop the
blur and go solid. Translucency is a preference, not a given.

## Structure — kept from the previous direction

- Macrostructure: **Editorial Index**, left-biased. Rail is a fixed 240px left column on lg+,
  translucent bar + sheet below that.
- Arc: hook -> problem(prose) -> solution(numbered index rows) -> proof(stat strip) -> close.
- Active nav row is a **filled rounded rect** (macOS sidebar behaviour) — marked by fill and
  luminance, never by hue.
- Landing section keeps a **vertical sticky** project nav (explicit user instruction) with the
  capture taking every remaining pixel.

## Motion

- **Springs, not durations, for anything the user can touch.** Default `bounce: 0` (critically
  damped, graceful settle). Bounce ~0.2 only where the user's own gesture carried momentum — in
  practice just the drawer.
- Curves for chrome: `--ease-apple: cubic-bezier(0.28, 0.11, 0.32, 1)`.
- Press feedback is **100ms on pointer-down**, not on release.
- Scroll reveals: 700ms, 24px rise, CSS + IntersectionObserver so they run off the main thread
  while the page decodes screenshots.
- `MotionConfig reducedMotion="user"` at the root covers every JS-driven animation; the global CSS
  override cannot reach those. Verified in-browser under emulated `prefers-reduced-motion`.

## Image treatment

Captures are light-UI dashboards; a white plane on this ground measures ~21:1, harsher than body
text, ~15 stacked per page. They rest at `brightness(0.9)` and return to full fidelity on
hover/focus. `object-contain` always — **never `object-cover`**: cropping these is editing
someone's composition.

## Assets

The real project captures are the entire asset system. No stock photography — it would dilute a
page whose argument is "these are real things I made". Icons: lucide-react, one family, chevrons only.

**One exception: the hero portrait** (`public/portrait-2.webp`, with `-1`/`-3` as alternates).
An illustrated caricature of the site owner, generated from his own photo as a likeness reference,
background removed, cropped to subject, WebP ~78KB. Deliberately *not* a hand-drawn SVG face —
AI-drawn SVG humans read as cheap and this is a real person's likeness.

## Do not

- No `#0f172a`, no slate, no purple/indigo/violet, no warm brass. No hue outside the one orange.
- No serif and no monospace.
- No shadows for separation; no `transition: all`; no `scale(0)` entrances; no `ease-in` on UI.
- No raw hex in a component — semantic tokens only.
- No white text on the orange fill — it measures 2.06. The label is black.
- No invented numbers. Only what's countable from `src/data`: **33 projects · 5 areas ·
  3 countries · 4 certifications**.
