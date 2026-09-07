import React from 'react';

/**
 * Hero portrait — a greyscale plate whose left edge is dissolved into the page in
 * the file itself, not under a CSS gradient. One less layer, and the fade can't
 * drift out of sync with the section background it's meant to disappear into.
 *
 * The glitch is three copies of the same src: a clean base, and two displaced
 * layers that are invisible for most of the cycle. It fires as a short burst
 * roughly every 7s rather than running continuously — a permanent glitch stops
 * reading as a signature and starts reading as a broken image.
 *
 * Same decode for all three (one src, one cache entry), and the burst only ever
 * touches clip-path, transform and opacity.
 */
export function HeroPhoto() {
  return (
    <div
      className="glitch pointer-events-none absolute inset-y-0 right-0 hidden w-[64%] max-w-[62rem] select-none lg:block"
      aria-hidden="true"
    >
      <img
        src="/hero-photo.webp"
        alt=""
        width={1600}
        height={1200}
        className="size-full object-cover object-center"
        draggable={false}
      />
      <img
        src="/hero-photo.webp"
        alt=""
        aria-hidden="true"
        className="glitch-layer glitch-a size-full object-cover object-center"
        draggable={false}
      />
      <img
        src="/hero-photo.webp"
        alt=""
        aria-hidden="true"
        className="glitch-layer glitch-b size-full object-cover object-center"
        draggable={false}
      />
    </div>
  );
}
