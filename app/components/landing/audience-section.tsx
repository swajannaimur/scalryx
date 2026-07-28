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
    <section
      aria-labelledby="who-we-help-heading"
      className="relative py-16 sm:py-24"
      data-premium-section
      id="who-we-help"
    >
      <SectionShell className="premium-panel rounded-[1.75rem] p-5 sm:p-8 lg:p-10">
        <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="max-w-xl">
            <p className="premium-eyebrow">Who we help</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-content sm:text-5xl" id="who-we-help-heading">
              Built for leaders who need{" "}
              <span className="text-gradient">clearer signals.</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              Different business models break in different places. Your assessment adapts before it recommends.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-[var(--assessment-accent-text)]">
              <span className="h-px w-12 bg-[var(--electric-blue)] shadow-[0_0_12px_var(--electric-blue)]" />
              One framework, four operating realities
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
          {audiences.map((audience) => {
            const Icon = audienceIcons[audience.icon];

            return (
              <article className="premium-card rounded-2xl p-5" key={audience.title}>
                <span aria-hidden="true" className="icon-glow flex size-11 items-center justify-center rounded-xl">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-content">{audience.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{audience.description}</p>
              </article>
            );
          })}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
