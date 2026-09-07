import React from 'react';
import { Reveal } from '../components/Reveal';
import { TokenFlow } from '../components/TokenFlow';
import { systemFacts } from '../data/handoff';

/**
 * The subject of this page is the page. Every number is countable from this
 * repo, and a client can open devtools and check any claim on the spot — which
 * is the only reason to make the argument here rather than with a mock system.
 */
export function HandoffPage() {
  return (
    <div className="px-5 py-14 sm:px-8 md:py-20 lg:px-16">
      <Reveal>
        <header className="mb-14 md:mb-20">
          <p className="t-label text-xs text-ink-soft">Design → development</p>
          <h1 className="t-title mt-3 max-w-[20ch] text-[clamp(2rem,4.6vw,3.25rem)] text-ink">
            The handoff is this site.
          </h1>
          <p className="t-body mt-4 max-w-[58ch] text-[17px] text-ink-soft">
            Not a mock system on a slide. The tokens described below are the ones
            rendering this page right now. Open devtools and check any figure here
            against what&rsquo;s actually running.
          </p>
        </header>
      </Reveal>

      {/* ── The system, in four numbers ──────────────────────────────────── */}
      <Reveal>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line py-10 md:grid-cols-4">
          {[
            { figure: String(systemFacts.primitives), label: 'Primitives' },
            { figure: String(systemFacts.semantics), label: 'Semantic tokens' },
            { figure: String(systemFacts.usages), label: 'Usages across src/' },
            { figure: String(systemFacts.violations), label: 'Contract violations' },
          ].map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="t-display block text-[clamp(2.25rem,5vw,3.25rem)] tabular-nums text-ink">
                  {s.figure}
                </span>
                <span className="t-label mt-2 block text-[13px] text-ink-soft">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* ── 01 · The contract ────────────────────────────────────────────── */}
      <section className="border-b border-line py-16 md:py-20">
        <Reveal>
          <p className="t-label text-xs text-ink-soft">01 / The contract</p>
          <h2 className="t-title mt-3 max-w-[24ch] text-[clamp(1.5rem,3vw,2.25rem)] text-ink">
            Primitives are never touched by a component.
          </h2>
          <p className="t-body mt-4 max-w-[58ch] text-[17px] text-ink-soft">
            One rule, and it is the rule that decides whether a theme swap is a
            one-file change or a codebase audit. Primitives name a value.
            Semantics name a job, and semantics are the only tier a component may
            reference.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-8 flex flex-col gap-3">
            {[
              {
                mark: '✗',
                code: 'className="text-[#aeaeb2]"',
                why: 'Hard-coded. Invisible to the system, so nothing can find it and nothing can change it.',
              },
              {
                mark: '✗',
                code: 'className="text-gray-400"',
                why: 'A primitive, used directly. It works today and breaks the moment a second theme exists.',
              },
              {
                mark: '✓',
                code: 'className="text-ink-soft"',
                why: 'Names the job. The value can move underneath it without a single component changing.',
              },
            ].map((row) => (
              <li
                key={row.code}
                className="flex flex-col gap-2 rounded-[12px] border border-line bg-surface p-4 sm:flex-row sm:items-baseline sm:gap-5"
              >
                <span
                  aria-hidden="true"
                  className={`t-label shrink-0 text-[13px] ${
                    row.mark === '✓' ? 'text-link' : 'text-ink-soft'
                  }`}
                >
                  {row.mark}
                </span>
                <code className="shrink-0 break-all text-[13px] text-ink sm:w-[19rem]">
                  {row.code}
                </code>
                <span className="t-body text-[14px] text-ink-soft">{row.why}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── 02 · The flow ────────────────────────────────────────────────── */}
      <section className="border-b border-line py-16 md:py-20">
        <Reveal>
          <p className="t-label text-xs text-ink-soft">02 / One name, four surfaces</p>
          <h2 className="t-title mt-3 max-w-[26ch] text-[clamp(1.5rem,3vw,2.25rem)] text-ink">
            The name survives the crossing.
          </h2>
          <p className="t-body mt-4 max-w-[58ch] text-[17px] text-ink-soft">
            Variables are exported from Figma as JSON by a plugin and committed;
            the CSS layer is authored against that export. There is a manual seam
            in that, and it&rsquo;s named rather than dressed up. The value is that
            the name doesn&rsquo;t mutate as it crosses, not that a robot moved it.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10">
            <TokenFlow />
          </div>
        </Reveal>
      </section>

      {/* ── 03 · Blast radius ────────────────────────────────────────────── */}
      <section className="border-b border-line py-16 md:py-20">
        <Reveal>
          <p className="t-label text-xs text-ink-soft">03 / Blast radius</p>
          <h2 className="t-title mt-3 max-w-[26ch] text-[clamp(1.5rem,3vw,2.25rem)] text-ink">
            Change the accent, touch no components.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
            <div className="rounded-[12px] border border-line bg-surface p-5">
              <p className="t-label text-[11px] text-ink-soft">Edit one line</p>
              <code className="mt-3 block break-all text-[13px] text-ink">
                --orange-500: #ff9f0a;
              </code>
            </div>
            <ul className="rounded-[12px] border border-line bg-surface p-5">
              <li className="t-label text-[11px] text-ink-soft">What moves with it</li>
              {[
                ['9', 'link surfaces'],
                ['2', 'filled buttons'],
                ['1', 'focus ring, every control on the site'],
                ['1', 'text selection colour'],
                ['0', 'component files edited'],
              ].map(([n, what]) => (
                <li key={what} className="mt-3 flex items-baseline gap-3">
                  <span className="t-heading w-6 shrink-0 tabular-nums text-[15px] text-ink">
                    {n}
                  </span>
                  <span className="t-body text-[14px] text-ink-soft">{what}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ── 04 · Governance ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <Reveal>
          <p className="t-label text-xs text-ink-soft">04 / One we caught</p>
          <h2 className="t-title mt-3 max-w-[26ch] text-[clamp(1.5rem,3vw,2.25rem)] text-ink">
            The token was deleted, not the usage patched.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 max-w-[62ch]">
            <p className="t-body text-[17px] text-ink-soft">
              A tertiary text token, <code className="text-ink">--color-ink-faint</code>, was
              documented as non-text and then used as text anyway. It measured{' '}
              <span className="tabular-nums text-ink">2.42:1</span> against the page,
              well under the 4.5 floor. The same mistake was made twice, in two
              different palettes.
            </p>
            <p className="t-body mt-4 text-[17px] text-ink-soft">
              The fix wasn&rsquo;t to repaint the two components. It was to move them onto
              the secondary token and{' '}
              <span className="text-ink">delete the faint one from the system</span>, so
              the mistake has nothing left to reach for. A token that can only be
              used wrongly is a defect in the system, not in the person using it.
            </p>
            <p className="t-body mt-6 text-[15px] text-ink-soft">
              This is the part clients with existing design debt ask about, and it is
              the reason the contrast figure lives in a comment beside the token
              rather than in a spec document nobody opens.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
