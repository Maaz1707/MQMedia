import Image from "next/image";

type SectionBackgroundProps = {
  src: string;
};

/**
 * A subtle, low-opacity full-bleed background image with a dark gradient
 * overlay — supporting texture behind the content, never the focal point.
 * Purely decorative, so it's hidden from assistive tech with an empty alt.
 */
export default function SectionBackground({ src }: SectionBackgroundProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image src={src} alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
    </div>
  );
}
