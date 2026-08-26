type LogoProps = {
  size?: number;
  showTagline?: boolean;
  className?: string;
};

export default function Logo({ size = 44, showTagline = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke="url(#mq-ring)"
          strokeWidth="2.5"
        />
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fontFamily="var(--font-display), sans-serif"
          fontWeight="500"
          fontSize="46"
          fill="url(#mq-letters)"
        >
          MQ
        </text>
        <defs>
          <linearGradient id="mq-ring" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f1d896" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#9c7a24" />
          </linearGradient>
          <linearGradient id="mq-letters" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f1d896" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#9c7a24" />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-gradient-gold text-lg tracking-[0.28em]">
          MQ MEDIA
        </span>
        {showTagline && (
          <span className="mt-1 text-[10px] tracking-[0.2em] text-muted uppercase">
            Where Vision Meets Precision
          </span>
        )}
      </span>
    </span>
  );
}
