import { deals } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";
import { ArrowUpRight } from "lucide-react";

export function DealsSection() {
  return (
    <section aria-labelledby="deals-heading" className="py-16 sm:py-24" data-premium-section id="deals">
      <SectionShell>
        <div className="max-w-3xl">
          <p className="premium-eyebrow">Curated SaaS deals</p>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-content sm:text-5xl" id="deals-heading">Tools worth a closer look.</h2>
          <p className="mt-4 text-base leading-8 text-muted">
            A compact shortlist matched to the business models in the assessment.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {deals.map((deal) => (
            <a className="premium-card group flex min-h-64 flex-col rounded-2xl p-5" href={deal.href} key={deal.title} rel="noopener noreferrer" target="_blank">
              <div className="flex items-center justify-between">
                <span className="icon-glow flex size-11 items-center justify-center rounded-xl text-sm font-black">
                  {deal.title.slice(0, 2).toUpperCase()}
                </span>
                <ArrowUpRight aria-hidden="true" className="text-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--electric-cyan)]" size={19} />
              </div>
              <span className="mt-5 text-sm font-bold uppercase tracking-[0.1em] text-[var(--assessment-accent-text)]">For {deal.audience}</span>
              <h3 className="mt-2 text-2xl font-bold text-content">{deal.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{deal.description}</p>
              <span className="mt-auto border-t border-line pt-5 text-sm font-bold text-content">{deal.offer}</span>
            </a>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
