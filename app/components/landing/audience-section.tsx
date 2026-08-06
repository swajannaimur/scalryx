import {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Store,
  Wrench,
} from "lucide-react";
import { audiences } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";

const audienceDetails: Record<string, { challenge: string; outcome: string }> = {
  "Ecommerce Leaders": {
    challenge: "Protecting margin while acquisition, stock, and retention pull in different directions.",
    outcome: "A clearer view of conversion, inventory, repeat orders, and cash resilience.",
  },
  "Agency Owners": {
    challenge: "Balancing pipeline, utilization, delivery quality, and client concentration.",
    outcome: "Practical priorities across recurring revenue, capacity, retention, and cash flow.",
  },
  "SaaS Founders": {
    challenge: "Separating healthy recurring growth from churn, weak activation, and costly acquisition.",
    outcome: "A focused read on unit economics, runway, retention, and operating maturity.",
  },
  "Service Business Owners": {
    challenge: "Growing demand without overloading capacity or increasing owner dependence.",
    outcome: "Clearer priorities for lead conversion, collections, repeat work, and systems.",
  },
};

const audienceIcons = {
  store: Store,
  briefcase: BriefcaseBusiness,
  chart: ChartNoAxesCombined,
  wrench: Wrench,
};

export function AudienceSection() {
  return (
    <section
      aria-labelledby="who-we-help-heading"
      className="py-16 sm:py-24"
      data-editorial-section
      id="who-we-help"
    >
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div className="max-w-xl lg:sticky lg:top-28 lg:self-start">
            <p className="section-label">Who we help</p>
            <h2
              className="mt-5 text-3xl font-bold tracking-[-0.04em] text-content sm:text-5xl"
              id="who-we-help-heading"
            >
              Built around how your business actually operates.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              Generic benchmarks miss the context. Scalryx adapts the questions before it offers a score.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {audiences.map((audience, index) => {
              const Icon = audienceIcons[audience.icon];
              const detail = audienceDetails[audience.title];

              return (
                <article className="editorial-card rounded-2xl p-5 sm:p-6" key={audience.title}>
                  <div className="flex items-start justify-between gap-4">
                    <span aria-hidden="true" className="icon-tile flex size-11 items-center justify-center rounded-xl">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className="metric-accent text-sm font-bold tabular-nums text-[var(--brand-accent)]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-[-0.02em] text-content">{audience.title}</h3>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">Operating challenge</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{detail.challenge}</p>
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-sm font-bold text-content">What the assessment clarifies</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{detail.outcome}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
