import React, { useState } from 'react';
import { stages, tokenTraces } from '../data/handoff';

/**
 * One token, four surfaces — the seam where names usually break, made walkable.
 *
 * Not a tablist. A tablist promises a set of panels you move between with arrow
 * keys; this is one panel that re-renders, which is a filter. `aria-pressed`
 * buttons say exactly that, and cost no fake ARIA to get right. The panel is a
 * polite live region so the change is announced to someone who can't see the
 * cards update beneath their finger.
 *
 * The connecting line is real information, not decoration: it's the claim that
 * the same name survives export, authoring and use. The pulse that runs along it
 * on selection encodes direction — Figma is upstream, code is downstream.
 */
export function TokenFlow() {
  const [activeId, setActiveId] = useState(tokenTraces[0].id);
  const t = tokenTraces.find((x) => x.id === activeId) ?? tokenTraces[0];

  const cell: Record<string, React.ReactNode> = {
    figma: (
      <>
        <code className="block break-all text-[13px] text-ink">{t.figma}</code>
        <span className="t-label mt-2 block text-[11px] text-ink-soft">
          {t.collection} collection
        </span>
      </>
    ),
    json: (
      <>
        <code className="block break-all text-[13px] text-ink">{t.json}</code>
        <span className="t-label mt-2 block text-[11px] text-ink-soft">
          exported, not retyped
        </span>
      </>
    ),
    css: (
      <>
        <code className="block break-all text-[13px] text-ink">{t.semantic}</code>
        <span className="t-label mt-2 block text-[11px] text-ink-soft">
          {t.primitive ? `→ ${t.primitive}` : 'holds a literal'}
        </span>
      </>
    ),
    code: (
      <>
        <code className="block break-all text-[13px] text-ink">{t.className}</code>
        <span className="t-label mt-2 block text-[11px] text-ink-soft">
          {t.usages} usages in src/
        </span>
      </>
    ),
  };

  return (
    <div>
      {/* ── Picker ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a token to trace">
        {tokenTraces.map((token) => {
          const on = token.id === activeId;
          return (
            <button
              key={token.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActiveId(token.id)}
              className={`press inline-flex items-center gap-2 rounded-[980px] border px-3.5 py-2 text-[13px] transition-colors duration-200 ${
                on
                  ? 'border-line-strong bg-raised text-ink'
                  : 'border-line text-ink-soft hover:bg-surface hover:text-ink'
              }`}
            >
              <span
                aria-hidden="true"
                className="size-3 shrink-0 rounded-full border border-line-strong"
                style={{ background: token.value }}
              />
              {token.className}
            </button>
          );
        })}
      </div>

      {/* ── Flow ────────────────────────────────────────────────────────── */}
      <div aria-live="polite" className="mt-10">
        <ol className="relative grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-4">
          {/* The rail. Horizontal between the outer node centres on md+, vertical
              down the node column below that — same line, same meaning. */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-8 w-px bg-line md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:top-[7px] md:h-px md:w-auto"
          />
          {/* Direction, drawn once per selection. Keyed so it re-runs on change. */}
          <span
            key={activeId}
            aria-hidden="true"
            className="flow-pulse absolute left-[7px] top-2 bottom-8 w-px md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:top-[7px] md:h-px md:w-auto"
          />

          {stages.map((s) => (
            <li key={s.key} className="relative pl-7 md:pl-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 size-[15px] rounded-full border border-line-strong bg-page md:left-1/2 md:top-0 md:-translate-x-1/2"
              />
              <div className="md:pt-8">
                <p className="t-label text-[11px] text-ink-soft md:text-center">
                  {s.label} · {s.caption}
                </p>
                <div className="mt-3 rounded-[12px] border border-line bg-surface p-4">
                  {cell[s.key]}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* ── The decision that travels with it ─────────────────────────── */}
        <div className="mt-8 flex items-start gap-4 rounded-[12px] bg-surface p-5">
          <span
            aria-hidden="true"
            className="mt-0.5 size-10 shrink-0 rounded-[8px] border border-line-strong"
            style={{ background: t.value }}
          />
          <div className="min-w-0">
            <p className="t-label text-[11px] text-ink-soft">
              Ships with the token · {t.value}
            </p>
            <p className="t-body mt-1.5 text-[14px] text-ink">{t.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
