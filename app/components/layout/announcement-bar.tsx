import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { SectionShell } from "./section-shell";

export function AnnouncementBar() {
  return (
    <aside className="relative overflow-hidden border-b border-blue-400/20 bg-[#061733] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(22,133,255,.2),transparent)]"
      />
      <SectionShell className="relative flex min-h-11 items-center justify-center gap-3 py-1 text-center text-sm">
        <span className="hidden size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9] sm:block" />
        <p className="font-medium text-blue-50">
          Join us today — practical ideas for sharper business decisions.
        </p>
        <NewsletterTrigger className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-cyan-200 underline decoration-cyan-300/60 underline-offset-4 transition hover:text-white">
          Join now →
        </NewsletterTrigger>
      </SectionShell>
    </aside>
  );
}
