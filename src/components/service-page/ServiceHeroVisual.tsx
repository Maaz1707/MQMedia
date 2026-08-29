import type { HeroVariant } from "@/lib/service-pages-data";

function OrbitVisual() {
  return (
    <div className="relative h-72 w-72 md:h-96 md:w-96">
      <div className="absolute inset-0 rounded-full border border-gold/25" />
      <div className="absolute inset-8 rounded-full border border-gold/15" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-gold shadow-[0_0_20px_rgba(212,175,55,0.7)]" />
      </div>
      {[
        { radius: 140, duration: "14s", size: "h-4 w-4", opacity: "opacity-90" },
        { radius: 108, duration: "10s", size: "h-3 w-3", opacity: "opacity-70" },
        { radius: 70, duration: "7s", size: "h-2.5 w-2.5", opacity: "opacity-50" },
      ].map((orbit, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ animation: `orbit-spin ${orbit.duration} linear infinite`, ["--orbit-radius" as string]: `${orbit.radius}px` }}
        >
          <div className={`rounded-full bg-gradient-to-br from-gold-light to-gold ${orbit.size} ${orbit.opacity}`} />
        </div>
      ))}
    </div>
  );
}

function FlipVisual() {
  return (
    <div className="relative h-72 w-72 md:h-96 md:w-96" style={{ perspective: "1000px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-8 overflow-hidden rounded-sm border border-gold/30 bg-surface/80 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]"
          style={{
            animation: `slow-flip ${9 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
            transformStyle: "preserve-3d",
            zIndex: 3 - i,
            transform: `translate(${i * 14}px, ${i * 14}px)`,
          }}
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-background-alt px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-border" />
            <span className="h-1.5 w-1.5 rounded-full bg-border" />
            <span className="h-1.5 w-1.5 rounded-full bg-border" />
          </div>
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="h-2 w-2/3 rounded-full bg-gold/30" />
            <div className="h-2 w-1/2 rounded-full bg-border" />
            <div className="mt-2 h-full rounded-sm bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
          </div>
        </div>
      ))}
    </div>
  );
}

function FanVisual() {
  const angles = [-18, -9, 0, 9, 18];
  return (
    <div className="relative h-72 w-72 md:h-96 md:w-96">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {angles.map((angle, i) => (
          <div
            key={angle}
            className="absolute h-56 w-40 origin-bottom overflow-hidden rounded-sm border border-gold/25 bg-surface/80 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.6)] md:h-64 md:w-48"
            style={{
              left: "-80px",
              top: "-224px",
              transform: `rotate(${angle}deg)`,
              animation: "gentle-float 6s ease-in-out infinite",
              animationDelay: `${i * 0.25}s`,
              ["--tile-rotate" as string]: `${angle}deg`,
            }}
          >
            <div className="flex h-full flex-col gap-2 p-4">
              <div className="h-1.5 w-2/3 rounded-full bg-gold/40" />
              <div className="mt-2 flex-1 rounded-sm bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
              <div className="h-1.5 w-1/2 rounded-full bg-border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadarVisual() {
  return (
    <div className="relative flex h-72 w-72 items-center justify-center md:h-96 md:w-96">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute h-16 w-16 animate-ping rounded-full border border-gold/60"
          style={{ animationDelay: `${i * 0.9}s`, animationDuration: "3.6s" }}
        />
      ))}
      <span className="absolute h-40 w-40 rounded-full border border-gold/15 md:h-56 md:w-56" />
      <span className="absolute h-56 w-56 rounded-full border border-gold/10 md:h-72 md:w-72" />
      <div className="relative h-3 w-3 rounded-full bg-gold shadow-[0_0_24px_rgba(212,175,55,0.8)]" />
    </div>
  );
}

function MosaicVisual() {
  const tiles = [
    { x: -110, y: -80, rotate: -6, delay: 0 },
    { x: -30, y: -110, rotate: 4, delay: 0.3 },
    { x: 60, y: -70, rotate: -3, delay: 0.6 },
    { x: -90, y: 10, rotate: 5, delay: 0.15 },
    { x: 10, y: 20, rotate: -4, delay: 0.45 },
    { x: 100, y: 30, rotate: 6, delay: 0.75 },
    { x: -50, y: 100, rotate: -5, delay: 0.9 },
    { x: 50, y: 110, rotate: 3, delay: 1.1 },
  ];
  return (
    <div className="relative h-72 w-72 md:h-96 md:w-96">
      {tiles.map((tile, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 h-14 w-14 rounded-sm border border-gold/25 bg-surface/80 shadow-[0_20px_35px_-18px_rgba(0,0,0,0.6)] md:h-16 md:w-16"
          style={{
            transform: `translate(${tile.x}px, ${tile.y}px) rotate(${tile.rotate}deg)`,
            animation: `gentle-float ${5 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${tile.delay}s`,
            ["--tile-rotate" as string]: `${tile.rotate}deg`,
          }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-gold/70" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServiceHeroVisual({ variant }: { variant: HeroVariant }) {
  switch (variant) {
    case "orbit":
      return <OrbitVisual />;
    case "flip":
      return <FlipVisual />;
    case "fan":
      return <FanVisual />;
    case "radar":
      return <RadarVisual />;
    case "mosaic":
      return <MosaicVisual />;
    default:
      return null;
  }
}
