import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll reveal via IntersectionObserver + a CSS transition.
 *
 * Deliberately not `motion`'s whileInView: scroll reveals are *predetermined*
 * animations, and CSS transitions run off the main thread, so they stay smooth
 * while the browser is busy decoding the page's many screenshots. JS-driven
 * motion is reserved here for the dynamic, interruptible cases (drawer, sheet,
 * carousel, active-nav indicator).
 *
 * Reduced motion is handled in CSS — the element still becomes visible, it just
 * doesn't travel.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  // Default fires as soon as the element clears the bottom edge, which is right
  // for a plain fade. A long choreographed sequence needs a later trigger, or it
  // plays out at the very bottom of the screen and is over before the reader has
  // scrolled it into view — which looks exactly like nothing animating at all.
  rootMargin = '0px 0px -8% 0px',
  threshold = 0.05,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IO (or a very old browser): show immediately rather than trap content.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      data-reveal={shown ? 'in' : 'out'}
      // Also published as a custom property so descendants can stagger off the
      // same trigger — transitionDelay on a wrapper doesn't reach its children.
      style={
        delay
          ? ({ transitionDelay: `${delay}s`, '--reveal-delay': `${delay}s` } as React.CSSProperties)
          : undefined
      }
      className={className}
    >
      {children}
    </div>
  );
}
