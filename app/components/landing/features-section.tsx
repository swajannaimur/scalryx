import { insightCards, problemCards } from "../../data/landing";
import { SectionShell } from "../layout/section-shell";
import { IconTile } from "../ui/icon-tile";

export function FeaturesSection() {
  return (
    <section className="pt-14 sm:pt-16" id="features">
      <SectionShell className="reveal-on-scroll">
        <div className="grid gap-7 lg:grid-cols-[1.08fr_2.22fr] lg:items-stretch">
          <div className="flex min-w-0 flex-col justify-center py-2 lg:pr-10">
            <h2 className="max-w-[20rem] text-[28px] font-semibold leading-[1.12] text-content sm:text-[36px] xl:text-[40px]">
              Most businesses pay for software they{" "}
              <span className="text-gradient">don&apos;t actually need.</span>
            </h2>
            <p className="mt-4 max-w-[22rem] text-base leading-7 text-muted">
              We help you cut the clutter and build the right tech stack for
              your business goals.
            </p>
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-3">
            {problemCards.map((feature) => (
              <article
                className="group min-w-0 rounded-lg border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-surface-raised"
                key={feature.title}
              >
                <IconTile accent={feature.accent} icon={feature.icon} />
                <h3 className="mt-5 text-lg font-medium text-content">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 border-y border-line py-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_3.2fr] lg:items-stretch">
            <div className="flex min-w-0 flex-col justify-center px-1 lg:pr-8">
              <h2 className="text-[28px] font-semibold leading-[1.15] text-content sm:text-[36px] xl:text-[40px]">
                Powerful Insights.
                <br />
                Smarter Decisions.
              </h2>
              <p className="mt-4 max-w-[18rem] text-base leading-7 text-muted">
                Everything you need to build a better software stack.
              </p>
            </div>

            <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {insightCards.map((feature) => (
                <article
                  className="group min-w-0 border-l border-line px-4 py-3 transition duration-300 hover:border-blue-400/50"
                  key={feature.title}
                >
                  <IconTile accent={feature.accent} icon={feature.icon} />
                  <h3 className="mt-4 text-base font-medium text-content">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-subtle">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
