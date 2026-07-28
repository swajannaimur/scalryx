import { audiences } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";
import { BriefcaseBusiness, ChartNoAxesCombined, Store, Wrench } from "lucide-react";

const audienceIcons = {
  store: Store,
  briefcase: BriefcaseBusiness,
  chart: ChartNoAxesCombined,
  wrench: Wrench,
};

export function AudienceSection() {
  return (
    <section aria-labelledby="who-we-help-heading" className="py-16 sm:py-20" id="who-we-help">
      <SectionShell>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[var(--assessment-accent-text)]">Who we help</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-content sm:text-4xl" id="who-we-help-heading">
            Built for the people responsible for growth.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {audiences.map((audience) => {
            const Icon = audienceIcons[audience.icon];

            return (
              <article className="rounded-xl border border-line bg-surface p-5" key={audience.title}>
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-lg bg-blue-500/15 text-[var(--assessment-accent-text)]">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-content">{audience.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{audience.description}</p>
              </article>
            );
          })}
        </div>
      </SectionShell>
    </section>
  );
}
