import type { ReactNode } from "react";

type PlaceholderNoteProps = {
  children: ReactNode;
};

/**
 * Visibly flags copy/content that is not yet real (case studies, founder
 * story, testimonials) so it can never be mistaken for a genuine client
 * claim before it's replaced with the real thing.
 */
export default function PlaceholderNote({ children }: PlaceholderNoteProps) {
  return (
    <div className="border-l border-gold/50 py-1 pl-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold-dark">
        Placeholder &mdash; Content Pending
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}
