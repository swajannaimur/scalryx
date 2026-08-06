import { ArrowUpRight } from "lucide-react";
import { deals } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";

export function DealsSection() {
  return (
    <section
      aria-labelledby="deals-heading"
      className="py-16 sm:py-24"
      data-editorial-section
      id="deals"
    >
      <SectionShell>
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="section-label">Curated SaaS tools</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-content sm:text-5xl" id="deals-heading">
              A short list, chosen with a reason.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted lg:justify-self-end">
            Practical software matched to the four operating models in the assessment. No invented savings or inflated claims.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {deals.map((deal) => (
            <a
              className="editorial-card group flex min-h-72 flex-col rounded-2xl p-5"
              href={deal.href}
              key={deal.title}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="icon-tile flex size-11 items-center justify-center rounded-xl text-sm font-black">
                  {deal.title.slice(0, 2).toUpperCase()}
                </span>
                <span className="rounded-full bg-[var(--brand-primary-soft)] px-3 py-1.5 text-xs font-bold text-[var(--brand-primary)]">
                  {deal.audience}
                </span>
              </div>
              <h3 className="mt-7 text-2xl font-bold tracking-[-0.03em] text-content">{deal.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{deal.description}</p>
              <span className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5 text-sm font-bold text-[var(--brand-accent)]">
                {deal.offer}
                <ArrowUpRight aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={17} />
              </span>
            </a>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
