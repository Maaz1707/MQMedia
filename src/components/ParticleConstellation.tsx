"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  twinklePhase: number;
  twinkleSpeed: number;
};

const GOLD = "212, 175, 55";
const GOLD_LIGHT = "241, 216, 150";
const LINK_DISTANCE = 150;
const CURSOR_DISTANCE = 220;

export default function ParticleConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const countFor = (w: number, h: number) => {
      const area = w * h;
      // Roughly one particle per 12,000px^2, clamped to a sane range so
      // it stays light on both small and very large viewports.
      return Math.round(Math.min(110, Math.max(38, area / 12000)));
    };

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.6 + 0.6,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.008 + 0.004,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = countFor(width, height);
      if (particles.length < target) {
        const toAdd = target - particles.length;
        for (let i = 0; i < toAdd; i++) particles.push(makeParticle());
      } else if (particles.length > target) {
        particles.length = target;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Only react while the cursor is actually within the canvas's own
      // bounds — otherwise a pointermove anywhere else on the page (after
      // scrolling past Hero) would keep pulling particles toward a stale
      // off-canvas coordinate indefinitely.
      const withinBounds = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      pointer.x = x;
      pointer.y = y;
      pointer.active = withinBounds;
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    let rafId = 0;
    // Starts false; the IntersectionObserver below flips it on once the
    // canvas is actually in view, so nothing runs before then.
    let running = false;
    let inView = false;

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_DISTANCE && dist > 0.01) {
            const force = ((CURSOR_DISTANCE - dist) / CURSOR_DISTANCE) * 0.02;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
        // gentle drag so cursor nudges decay instead of accumulating
        p.vx *= 0.98;
        p.vy *= 0.98;
        const speed = Math.hypot(p.vx, p.vy);
        const minSpeed = 0.05;
        if (speed < minSpeed) {
          p.vx += (Math.random() - 0.5) * 0.01;
          p.vy += (Math.random() - 0.5) * 0.01;
        }

        p.twinklePhase += p.twinkleSpeed;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.35;
            ctx.strokeStyle = `rgba(${GOLD}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_DISTANCE) {
            const alpha = (1 - dist / CURSOR_DISTANCE) * 0.5;
            ctx.strokeStyle = `rgba(${GOLD_LIGHT}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const twinkle = 0.55 + Math.sin(p.twinklePhase) * 0.45;
        ctx.fillStyle = `rgba(${GOLD_LIGHT}, ${twinkle})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    };

    const tryStart = () => {
      if (running || !inView || document.hidden || reduceMotion) return;
      running = true;
      rafId = requestAnimationFrame(step);
    };
    const tryStop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    };

    const handleVisibility = () => {
      if (document.hidden) tryStop();
      else tryStart();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Only animate while the hero is actually on screen — once the user
    // scrolls past it the loop stops entirely instead of paying for a
    // canvas redraw on every frame for the rest of the page.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) tryStart();
        else tryStop();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    if (reduceMotion) {
      // Draw a single static frame instead of a continuous loop. The
      // IntersectionObserver above is still wired up but tryStart() no-ops
      // while reduceMotion is true, so this stays static.
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.fillStyle = `rgba(${GOLD_LIGHT}, 0.6)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
