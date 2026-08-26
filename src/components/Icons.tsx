type IconProps = {
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DiscoveryIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.3" y1="15.3" x2="20.5" y2="20.5" />
    </svg>
  );
}

export function DesignIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20l0.8-3.6L15.5 5.7l3.8 3.8L8.6 20.2 4 20z" />
      <line x1="14.2" y1="7" x2="18" y2="10.8" />
    </svg>
  );
}

export function BuildIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polygon points="12,3 21,8 12,13 3,8" />
      <polyline points="3,12 12,17 21,12" />
      <polyline points="3,16 12,21 21,16" />
    </svg>
  );
}

export function LaunchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polygon points="3,11.5 21,3.5 13.5,20.5 11.3,12.7 3,11.5" />
      <line x1="11.3" y1="12.7" x2="21" y2="3.5" />
    </svg>
  );
}

export function BrandIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="M8.5 14.3L7 21l5-2.6L17 21l-1.5-6.7" />
    </svg>
  );
}

export function WebDevIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <line x1="3" y1="8.5" x2="21" y2="8.5" />
      <circle cx="5.7" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="7.7" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CatalogueIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 6.5c-1.8-1.4-4.2-2-6.5-1.8v13c2.3-0.2 4.7 0.4 6.5 1.8" />
      <path d="M12 6.5c1.8-1.4 4.2-2 6.5-1.8v13c-2.3-0.2-4.7 0.4-6.5 1.8" />
      <line x1="12" y1="6.5" x2="12" y2="19.5" />
    </svg>
  );
}

export function SeoIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polyline points="3,17 9.5,10.5 13.5,14.5 21,6" />
      <polyline points="15,6 21,6 21,12" />
    </svg>
  );
}

export function SmmaIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="18" cy="5.5" r="2.3" />
      <circle cx="6" cy="12" r="2.3" />
      <circle cx="18" cy="18.5" r="2.3" />
      <line x1="8" y1="10.8" x2="16" y2="6.7" />
      <line x1="8" y1="13.2" x2="16" y2="17.3" />
    </svg>
  );
}

export const SERVICE_ICON_MAP = {
  branding: BrandIcon,
  webdev: WebDevIcon,
  catalogue: CatalogueIcon,
  seo: SeoIcon,
  smma: SmmaIcon,
} as const;

export type ServiceIconKey = keyof typeof SERVICE_ICON_MAP;
