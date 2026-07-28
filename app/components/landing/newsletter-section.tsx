import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { SectionShell } from "../layout/section-shell";

export function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter-heading" id="newsletter" className="py-20 sm:py-24">
      <SectionShell>
        <div className="rounded-2xl border border-blue-400/25 bg-blue-500/10 px-6 py-10 text-center sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-content sm:text-4xl" id="newsletter-heading">
            Get practical growth guidance in your inbox.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
            A concise newsletter covering business health, useful software, operating benchmarks, and curated opportunities.
          </p>
          <NewsletterTrigger className="mt-6 min-h-11 rounded-lg bg-[var(--assessment-accent-bg)] px-5 text-sm font-semibold text-on-brand transition hover:bg-[var(--assessment-accent-hover)]">
            Join the newsletter
          </NewsletterTrigger>
        </div>
      </SectionShell>
    </section>
  );
}
