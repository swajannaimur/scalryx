import { deals } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";
import { ArrowUpRight } from "lucide-react";

export function DealsSection() {
  return (
    <section aria-labelledby="deals-heading" className="py-16 sm:py-20" id="deals">
      <SectionShell>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[var(--assessment-accent-text)]">Curated SaaS deals</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-content sm:text-4xl" id="deals-heading">Tools and deals worth reviewing.</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {deals.map((deal) => (
            <a className="group flex min-h-60 flex-col rounded-xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-surface-raised" href={deal.href} key={deal.title} rel="noopener noreferrer" target="_blank">
              <span className="text-sm font-medium text-[var(--assessment-accent-text)]">For {deal.audience}</span>
              <h3 className="mt-3 text-xl font-semibold text-content">{deal.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{deal.description}</p>
              <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-semibold text-content">{deal.offer}<ArrowUpRight aria-hidden="true" className="text-[var(--assessment-accent-text)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={17} /></span>
            </a>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
