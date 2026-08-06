import { ArrowRight, Mail } from "lucide-react";
import { SectionShell } from "../layout/section-shell";
import { NewsletterTrigger } from "../newsletter/newsletter-trigger";

export function NewsletterSection() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="soft-section border-t border-line py-16 sm:py-24"
      data-editorial-section
      id="newsletter"
    >
      <SectionShell>
        <div className="editorial-panel grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="section-label">Founder newsletter</p>
            <h2
              className="mt-5 max-w-2xl text-3xl font-bold tracking-[-0.045em] text-content sm:text-5xl"
              id="newsletter-heading"
            >
              Stay ahead. Stay decisive.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
              One concise note on business health, operating benchmarks, useful software, and decisions worth making.
            </p>
            <NewsletterTrigger className="primary-button mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold sm:w-auto">
              Enter your email
              <ArrowRight aria-hidden="true" size={16} />
            </NewsletterTrigger>
            <p className="mt-4 text-sm text-subtle">
              No spam. No account. Unsubscribe whenever you want.
            </p>
          </div>

          <div className="flex min-h-64 flex-col justify-between border-t border-line bg-[var(--brand-soft)] p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <span aria-hidden="true" className="icon-tile flex size-14 items-center justify-center rounded-2xl bg-white">
              <Mail size={24} strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-bold text-[var(--brand-navy)]">What arrives</p>
              <p className="mt-3 max-w-sm text-xl font-bold leading-8 tracking-[-0.02em] text-content">
                Useful signals, carefully edited for people running real businesses.
              </p>
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
