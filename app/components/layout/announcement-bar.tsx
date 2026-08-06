import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { SectionShell } from "./section-shell";

export function AnnouncementBar() {
  return (
    <aside className="border-b border-line bg-[var(--brand-primary-soft)] text-[var(--brand-primary)]">
      <SectionShell className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-0 py-1 text-center text-sm">
        <p className="text-balance font-medium">
          Practical ideas for clearer, sharper business decisions.
        </p>
        <NewsletterTrigger className="inline-flex min-h-11 items-center px-2 text-sm font-bold text-[var(--brand-accent)] underline decoration-[var(--brand-accent)]/35 underline-offset-4 transition hover:text-[var(--brand-secondary)]">
          Join the founder newsletter →
        </NewsletterTrigger>
      </SectionShell>
    </aside>
  );
}
