import React, { useEffect, useRef } from 'react';

/**
 * Trigonometric ribbon mesh, as a section background.
 *
 * Adapted from a full-viewport demo. The changes that mattered:
 *
 * - Sized to its container via ResizeObserver, not `window.innerWidth/h-screen`.
 *   A background that measures the viewport is wrong the moment it isn't one.
 * - `setTransform`, not `scale`. The original called `ctx.scale(dpr, dpr)` on
 *   every resize, and scale is cumulative — two resizes and everything is drawn
 *   at 4×.
 * - Pointer is bound to the section and read in canvas space, not bound to
 *   `window` in viewport space. A background shouldn't listen to the whole page.
 * - One hue. The demo ran blue → indigo → violet, or cyan → blue → purple. This
 *   ramp moves in lightness across a single orange, because the palette allows
 *   exactly one chromatic family and depth here comes from luminance.
 * - It stops. rAF is the heaviest thing on this site, so the loop only runs while
 *   the section is on screen and the tab is visible, and reduced motion gets one
 *   static frame rather than nothing — the texture stays, the movement goes.
 *
 * INTENSITY is the single tuning knob. It scales every alpha, and it is set where
 * it is because the statement copy sits on top: measured worst-case ground under
 * the text at this value stays far inside the contrast floor.
 */

const INTENSITY = 0.28;
const ACCENT = { r: 255, g: 159, b: 10 };
const ACCENT_DIM = { r: 122, g: 76, b: 6 };

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.maxLife = 80 + Math.random() * 60;
    this.life = this.maxLife;
    this.size = 1 + Math.random() * 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return;
    ctx.globalAlpha = (this.life / this.maxLife) * 0.7 * INTENSITY;
    ctx.fillStyle = `rgb(${ACCENT.r} ${ACCENT.g} ${ACCENT.b})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export function RibbonMesh() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let raf = 0;
    let width = 0;
    let height = 0;
    let onScreen = false;
    let time = 0;
    let lastTime = performance.now();

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const particles: Particle[] = [];
    const ripple = { x: 0, y: 0, radius: 0, maxRadius: 400, speed: 14 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // Absolute, not cumulative — the source of the original's compounding-scale bug.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      mouse.targetX = p.x - width / 2;
      mouse.targetY = p.y - height / 2;
    };

    const onLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const onDown = (e: PointerEvent) => {
      const p = toLocal(e);
      ripple.x = p.x;
      ripple.y = p.y;
      ripple.radius = 0;
      for (let i = 0; i < 30; i++) particles.push(new Particle(p.x, p.y));
    };

    const noise = (x: number, t: number, o: number) =>
      (Math.sin(x * 0.0012 + t * 0.25 + o) + Math.cos(x * 0.0028 - t * 0.4 + o * 2)) / 2;

    const rgba = (c: { r: number; g: number; b: number }, a: number) =>
      `rgba(${c.r}, ${c.g}, ${c.b}, ${a * INTENSITY})`;

    function draw(dt: number) {
      if (!ctx) return;
      time += dt * 0.85;

      const lerp = 1 - Math.exp(-9 * Math.max(dt, 0.0001));
      mouse.x += (mouse.targetX - mouse.x) * lerp;
      mouse.y += (mouse.targetY - mouse.y) * lerp;

      // The page ground, painted here so the canvas stays opaque and cheap.
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(i, 1);
      }

      if (ripple.radius < ripple.maxRadius) ripple.radius += ripple.speed;

      const layers = [
        { count: 16, step: 4, offsetMod: 0, freqScale: 0.0035, amp: 55, speed: 1.1, primary: true },
        { count: 10, step: 6, offsetMod: 1.2, freqScale: 0.0075, amp: 30, speed: 0.7, primary: false },
      ];

      for (const layer of layers) {
        // `lighter` rather than the demo's `multiply`: on a black ground multiply
        // resolves to black and the second layer would draw nothing at all.
        ctx.globalCompositeOperation = layer.primary ? 'source-over' : 'lighter';

        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        const edge = layer.primary ? 0.16 : 0.05;
        const mid = layer.primary ? 0.9 : 0.34;
        gradient.addColorStop(0, rgba(ACCENT_DIM, edge));
        gradient.addColorStop(0.5, rgba(ACCENT, mid));
        gradient.addColorStop(1, rgba(ACCENT_DIM, edge));

        for (let r = 0; r < layer.count; r++) {
          const progress = r / layer.count;
          const yOffset = height * 0.22 + r * (height * 0.032) + layer.offsetMod * 35;
          const baseAlpha = (1 - progress * 0.75) * 0.8;

          const rippleDistort =
            ripple.radius < ripple.maxRadius
              ? Math.sin((time * 2 + progress * Math.PI) * 2) *
                ((ripple.maxRadius / Math.max(ripple.radius, 1)) * 2.5)
              : 0;

          ctx.beginPath();

          for (let x = 0; x <= width + layer.step; x += layer.step) {
            const envelope = Math.sin((x / Math.max(width, 1)) * Math.PI);

            const nFreq = 1 + noise(x, time, progress) * 0.18;
            const nAmp = 1 + noise(x * 2, -time, progress * 0.5) * 0.15;

            const wave1 =
              Math.sin(x * (layer.freqScale * nFreq) + time * layer.speed + r * 0.18) *
              (layer.amp * envelope * nAmp);
            const wave2 = Math.cos(x * 0.008 - time * 0.7 + r * 0.1) * (20 * envelope);
            const wave3 = Math.sin(x * 0.018 + time * 1.4) * (8 * envelope);

            const cursorX = width / 2 + mouse.x;
            const dx = Math.abs(x - cursorX);
            const radius = layer.primary ? 380 : 220;
            const factor = Math.exp(-Math.pow(dx / radius, 2));
            const deflect =
              Math.sin(x * 0.015 + time * 2.6) * (factor * (layer.primary ? 50 : 25) * envelope);

            const rippleFactor = Math.exp(
              -Math.pow(Math.abs(dx - ripple.radius) / (25 + rippleDistort), 2),
            );
            const rippleShift = rippleFactor * rippleDistort * (1.8 - progress);

            const y =
              yOffset + wave1 + wave2 + wave3 + deflect + rippleShift + mouse.y * (progress * 0.1);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          ctx.globalAlpha = baseAlpha;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = (layer.primary ? 1.4 : 0.8) + (1 - progress) * 0.5;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || reduce.matches) return;
      lastTime = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // rAF is the most expensive thing on this site. It runs only while the
    // section is actually on screen, and never behind a hidden tab.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { rootMargin: '120px' },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };

    // Reduced motion keeps the texture and drops the movement: one static frame.
    const onReduceChange = () => {
      if (reduce.matches) {
        stop();
        draw(0);
      } else if (onScreen && !document.hidden) {
        start();
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    document.addEventListener('visibilitychange', onVisibility);
    reduce.addEventListener('change', onReduceChange);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerdown', onDown);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      reduce.removeEventListener('change', onReduceChange);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
