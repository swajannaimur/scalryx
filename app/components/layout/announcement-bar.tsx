import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { SectionShell } from "./section-shell";

export function AnnouncementBar() {
  return (
    <aside className="border-b border-blue-400/25 bg-blue-600 text-white">
      <SectionShell className="flex min-h-11 items-center justify-center gap-3 py-2 text-center text-sm">
        <p>Join us today!</p>
        <NewsletterTrigger className="inline-flex min-h-11 items-center rounded-md border border-white/35 bg-white/10 px-3 text-sm font-semibold text-white transition hover:bg-white/20">
          Join now
        </NewsletterTrigger>
      </SectionShell>
    </aside>
  );
}
