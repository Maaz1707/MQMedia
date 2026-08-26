import Image from "next/image";

type CatalogueMockupProps = {
  src?: string;
  alt: string;
};

/**
 * Presents a catalogue/print piece with a subtle perspective tilt and soft
 * shadow, so it reads as a physical object rather than a flat screenshot.
 * Renders an abstract placeholder fill when no image is provided yet.
 */
export default function CatalogueMockup({ src, alt }: CatalogueMockupProps) {
  return (
    <div
      className="bg-noise relative aspect-[4/3] overflow-hidden border border-border shadow-[0_50px_90px_-35px_rgba(0,0,0,0.65)] [transform:perspective(1000px)_rotateY(-6deg)_rotateX(2deg)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/[0.08] via-transparent to-transparent">
          <span className="font-display text-gold-dark/30 text-4xl">{alt}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/25 to-transparent" />
    </div>
  );
}
