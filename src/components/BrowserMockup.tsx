import Image from "next/image";

type BrowserMockupProps = {
  src?: string;
  alt: string;
  label?: string;
};

/**
 * Presents a website screenshot inside a realistic browser chrome frame.
 * Renders an abstract placeholder fill when no image is provided yet.
 */
export default function BrowserMockup({ src, alt, label }: BrowserMockupProps) {
  return (
    <div className="overflow-hidden border border-border bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-border bg-background-alt px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        {label && (
          <span className="ml-3 truncate text-[10px] uppercase tracking-[0.15em] text-muted">
            {label}
          </span>
        )}
      </div>
      <div className="bg-noise relative aspect-[16/10]">
        {src ? (
          <Image src={src} alt={alt} fill className="object-cover object-top" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/[0.06] via-transparent to-transparent">
            <span className="font-display text-gold-dark/30 text-4xl">{alt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
