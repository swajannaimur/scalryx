import { Mail, Sparkles } from "lucide-react";
import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { SectionShell } from "../layout/section-shell";

export function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter-heading" id="newsletter" className="relative py-20 sm:py-28" data-premium-section>
      <SectionShell>
        <div className="premium-panel section-grid relative rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-16">
          <div aria-hidden="true" className="ambient-orb -right-28 -top-36 opacity-50" />
          <span className="icon-glow mx-auto flex size-14 items-center justify-center rounded-2xl">
            <Mail size={24} />
          </span>
          <p className="premium-eyebrow mx-auto mt-6">
            <Sparkles aria-hidden="true" size={13} />
            Founder signal
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-[-0.04em] text-content sm:text-5xl" id="newsletter-heading">
            Stay ahead. Stay{" "}
            <span className="text-gradient">decisive.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted">
            A concise newsletter covering business health, useful software, operating benchmarks, and curated opportunities.
          </p>
          <NewsletterTrigger className="premium-button mt-7 min-h-12 rounded-xl px-6 text-sm font-bold">
            Join the newsletter →
          </NewsletterTrigger>
          <p className="mt-4 text-sm text-subtle">
            No spam. No account. Unsubscribe whenever you want.
          </p>
        </div>
      </SectionShell>
    </section>
  );
}
