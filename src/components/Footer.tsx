import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Behance" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo size={44} showTagline />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Design, web development, social media management and catalogue
              production for brands that want precision at every touchpoint.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                Navigate
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                Connect
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} MQ Media. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Where Vision Meets Precision</p>
        </div>
      </div>
    </footer>
  );
}
