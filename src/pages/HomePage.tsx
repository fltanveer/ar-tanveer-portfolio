import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { UpworkMark } from '../components/BrandMarks';
import { HeroPhoto } from '../components/HeroPhoto';
import { RibbonMesh } from '../components/RibbonMesh';
import { Reveal } from '../components/Reveal';
import {
  deliverables,
  industries,
  outcomes,
  principles,
  tools,
} from '../data/offer';
import { careerProjects, yearsDesigning } from '../data/profile';
import { sections, totals } from '../data/sections';

/**
 * arc: hook -> problem(prose) -> solution(numbered index) -> proof(stats) -> close
 *
 * Editorial Index layout, Apple visual system: left-biased composition and hairline
 * index rows, with Apple's achromatic ground, type scale and shape language.
 * Every figure is countable from src/data — nothing here is estimated.
 */

// Critically damped: graceful settle, no overshoot. Bounce is reserved for motion
// the user's own gesture set off, and nothing here is gesture-driven.
const settle = { type: 'spring', bounce: 0, duration: 0.9 } as const;

// Kept whole, share param included — it's Upwork's own attribution on the link
// he supplied, and trimming it silently breaks how he tracks the referral.
const UPWORK_URL =
  'https://www.upwork.com/freelancers/~01e721b548af79f7c9?mp_source=share';

export function HomePage() {
  return (
    <div className="w-full">
      {/* ── Hook ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-24 pt-20 sm:px-8 md:pb-32 md:pt-32 lg:px-16">
        <HeroPhoto />

        {/* Above the plate, and capped short of it on lg where the column is
            narrow — the photo's fade is long, but copy shouldn't rely on it. */}
        <div className="relative max-w-3xl lg:max-w-[30rem] xl:max-w-[34rem] 2xl:max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="t-label text-[15px] text-ink-soft"
          >
            Md Ashrafur Rahman Tanveer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ ...settle, delay: 0.06 }}
            className="t-display mt-4 max-w-[18ch] text-[clamp(2.5rem,6.4vw,4.75rem)] text-ink"
          >
            I hand you a product that converts.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ ...settle, delay: 0.14 }}
            className="t-body mt-6 max-w-[52ch] text-[19px] text-ink-soft md:text-[21px]"
          >
            Most designers hand you beautiful screens. Before I open Figma I ask one question:
            what does success actually look like for your business? Then I design everything
            backward from that answer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ ...settle, delay: 0.22 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Link
              to="/saas"
              className="press rounded-[980px] bg-fill px-6 py-3 text-[17px] text-on-fill transition-opacity duration-200 hover:opacity-90"
            >
              See the work
            </Link>
            <a
              href={UPWORK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[24px] items-center gap-2 text-[17px] text-link transition-opacity duration-200 hover:opacity-80"
            >
              <UpworkMark className="size-5" />
              Hire me on Upwork
              <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="relative overflow-hidden border-t border-line px-5 py-24 sm:px-8 md:min-h-[32rem] md:py-32 lg:px-16">
          <RibbonMesh />
          <p className="relative t-title max-w-[26ch] text-[clamp(1.75rem,3.6vw,2.75rem)] text-ink">
            Great UX isn&rsquo;t decoration.
            <span className="text-ink-soft">
              {' '}
              It&rsquo;s the difference between a product people use once and one they keep coming
              back to.
            </span>
          </p>
        </section>
      </Reveal>

      {/* ── How · his three, as a sequence ───────────────────────────────── */}
      <section className="border-t border-line px-5 py-20 sm:px-8 md:py-28 lg:px-16">
        <Reveal>
          <h2 className="t-label text-xs text-ink-soft">Products succeed when three things hold</h2>
        </Reveal>

        {/* Numbered, because these are not three parallel features — you need
            clarity before anyone trusts you, and trust before anyone builds
            momentum. Presenting them as equal columns threw that order away.
            The reveal runs left to right for the same reason. */}
        {/* Later trigger than the default: this sequence runs for 1.1s, and the
            default fires with a quarter of the block showing at the bottom edge,
            so it finished off screen. */}
        <Reveal className="principles mt-10" rootMargin="0px 0px -30% 0px" threshold={0.12}>
          {/* The rules are static hairlines. What moves is a glowing segment that
              sweeps along them and hands off: top left-to-right, then bottom
              right-to-left, forever. Erasing and redrawing the line each cycle
              would pop at the reset; sweeping a highlight along a line that is
              always there does not. */}
          <span className="p-lead">
            <span className="p-sweep p-sweep-top" />
          </span>

          <dl className="grid md:grid-cols-3">
            {principles.map((p, i) => (
              <div
                key={p.word}
                style={{ '--i': i } as React.CSSProperties}
                className={`py-9 md:py-11 ${i > 0 ? 'md:border-l md:border-line md:pl-8' : ''} ${
                  i < principles.length - 1 ? 'md:pr-8' : ''
                }`}
              >
                <span className="p-num t-label block text-[11px] tabular-nums text-link">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <dt className="p-word t-title mt-3 text-[clamp(2rem,4vw,3rem)] text-ink">
                  {p.word}
                </dt>
                <dd className="p-gloss t-body mt-4 max-w-[30ch] text-[15px] text-ink-soft">
                  {p.gloss}
                </dd>
              </div>
            ))}
          </dl>

          <span className="p-lead">
            <span className="p-sweep p-sweep-bottom" />
          </span>

          <p className="p-close t-body mt-8 max-w-[52ch] text-[17px] text-ink">
            My job is to design all three deliberately.
          </p>
        </Reveal>
      </section>

      {/* ── Solution · numbered index ────────────────────────────────────── */}
      <section className="border-t border-line px-5 py-20 sm:px-8 md:py-28 lg:px-16">
        <Reveal>
          <h2 className="t-label text-xs text-ink-soft">Five practice areas</h2>
        </Reveal>

        <ul className="mt-10 border-t border-line">
          {sections.map((s, i) => (
            <Reveal key={s.section} delay={i * 0.05}>
              <li className="border-b border-line">
                <Link
                  to={s.path}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 py-7 md:gap-x-8 md:py-9"
                >
                  <span className="t-label self-start text-[11px] tabular-nums text-ink-soft md:self-center">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="min-w-0">
                    <span className="t-title block text-[clamp(1.5rem,3.2vw,2.25rem)] text-ink transition-colors duration-200 group-hover:text-link">
                      {s.label}
                    </span>
                    <span className="t-body mt-2 block max-w-[48ch] text-[15px] text-ink-soft">
                      {s.blurb}
                    </span>
                  </span>

                  <span className="flex items-center gap-5 md:gap-8">
                    {/* Preview strip — real captures from this section. lg+ only:
                        an enhancement, never the only way to know what's inside. */}
                    <span
                      aria-hidden="true"
                      className="hidden items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:flex"
                    >
                      {s.preview.map((src) => (
                        <span
                          key={src}
                          className="block h-14 w-24 overflow-hidden rounded-[8px] bg-surface"
                        >
                          <img
                            src={src}
                            alt=""
                            loading="lazy"
                            className="size-full object-cover object-top brightness-90"
                          />
                        </span>
                      ))}
                    </span>

                    <ChevronRight className="size-4 shrink-0 text-ink-soft transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-link" />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Outcomes · his reported figures, generic by design ───────────── */}
      <section className="border-t border-line px-5 py-20 sm:px-8 md:py-28 lg:px-16">
        <Reveal>
          <h2 className="t-label text-xs text-ink-soft">What the work changed</h2>
          <p className="t-body mt-4 max-w-[56ch] text-[17px] text-ink-soft">
            Across {industries.slice(0, -1).join(', ')} and {industries.at(-1)?.toLowerCase()}.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {outcomes.map((o, i) => (
            <Reveal key={o.kind} delay={i * 0.06}>
              <div className="border-t border-line pt-6">
                <h3 className="t-heading text-[17px] text-ink">{o.kind}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {o.results.map((r) => (
                    <li key={r} className="t-body text-[15px] text-ink-soft">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── What you receive ─────────────────────────────────────────────── */}
      <section className="border-t border-line px-5 py-20 sm:px-8 md:py-28 lg:px-16">
        <Reveal>
          <h2 className="t-label text-xs text-ink-soft">What you receive</h2>
          <p className="t-title mt-3 max-w-[24ch] text-[clamp(1.5rem,3vw,2.25rem)] text-ink">
            Files a developer can build from on day one.
          </p>
        </Reveal>

        <ul className="mt-10 border-t border-line">
          {deliverables.map((d, i) => (
            <Reveal key={d.item} delay={i * 0.04}>
              <li className="grid grid-cols-1 gap-1 border-b border-line py-5 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-8 md:py-6">
                <span className="t-heading text-[17px] text-ink">{d.item}</span>
                <span className="t-body text-[15px] text-ink-soft">{d.note}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="t-body max-w-[46ch] text-[15px] text-ink-soft">
              Built in {tools.slice(0, -1).join(', ')} and {tools.at(-1)}. This is the part that
              saves engineering time and prevents redesign cycles.
            </p>
            <Link
              to="/handoff"
              className="group inline-flex min-h-[24px] items-center text-[15px] text-link transition-opacity duration-200 hover:opacity-80"
            >
              See exactly how the handoff works
              <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Proof · real, countable figures only ─────────────────────────── */}
      <Reveal>
        <section className="border-t border-line px-5 py-20 sm:px-8 md:py-28 lg:px-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {[
              // Derived from the earliest role in the profile data.
              { figure: String(yearsDesigning), label: 'Years designing' },
              // His own career figure. It sits beside the portfolio count rather
              // than replacing it: one is the claim, the next is the evidence,
              // and showing both is what makes either of them credible.
              { figure: careerProjects, label: 'Projects shipped' },
              { figure: String(totals.projects), label: 'Shown in this portfolio' },
              // Bangladesh, United States, Singapore.
              { figure: '3', label: 'Countries worked' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="t-display block text-[clamp(2.75rem,6vw,4rem)] tabular-nums text-ink">
                    {stat.figure}
                  </span>
                  <span className="t-label mt-2 block text-[13px] text-ink-soft">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      {/* ── Close ────────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-t border-line px-5 py-24 sm:px-8 md:py-32 lg:px-16">
          <p className="t-title max-w-[22ch] text-[clamp(1.75rem,4vw,3rem)] text-ink">
            If something you own is harder to use than it should be, I&rsquo;d like to see it.
          </p>
          <a
            href={UPWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-[24px] items-center gap-2 text-[19px] text-link transition-opacity duration-200 hover:opacity-80"
          >
            <UpworkMark className="size-[22px]" />
            Start a conversation
            <ChevronRight className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </section>
      </Reveal>
    </div>
  );
}
