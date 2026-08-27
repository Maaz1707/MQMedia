// A static SVG-noise tile repeated across the viewport — pure CSS, no
// per-frame JS cost — to keep the near-black palette from reading flat.
const NOISE_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>`
);

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      // No mix-blend-mode here on purpose: blending a full-viewport fixed
      // layer against everything beneath it (canvas, images, sticky
      // scroll-jacked sections) forces the compositor to re-merge every
      // layer on every frame — a real, measured cause of scroll jank on
      // the heavy scroll-jacked sections. Plain opacity composites for
      // free instead, at a small cost to how "blended" the grain looks.
      className="pointer-events-none fixed inset-0 z-[65] opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    />
  );
}
