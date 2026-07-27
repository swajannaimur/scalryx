import { insightCards, problemCards } from "../../data/landing";
import { SectionShell } from "../layout/section-shell";
import { IconTile } from "../ui/icon-tile";

export function FeaturesSection() {
  return (
    <section className="pt-14 sm:pt-16" id="features">
      <SectionShell className="reveal-on-scroll">
        <div className="grid gap-7 lg:grid-cols-[1.08fr_2.22fr] lg:items-stretch">
          <div className="flex flex-col justify-center py-2 lg:pr-10">
            <h2 className="max-w-[20rem] text-[24px] font-semibold leading-[1.12] text-white">
              Most businesses pay for software they{" "}
              <span className="text-gradient">don&apos;t actually need.</span>
            </h2>
            <p className="mt-4 max-w-[22rem] text-[12px] leading-5 text-slate-400">
              We help you cut the clutter and build the right tech stack for
              your business goals.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {problemCards.map((feature) => (
              <article
                className="group rounded-lg border border-white/[.09] bg-[#071020]/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-[#0a172b]"
                key={feature.title}
              >
                <IconTile accent={feature.accent} icon={feature.icon} />
                <h3 className="mt-5 text-[14px] font-medium text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[12px] leading-[1.45] text-slate-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 border-y border-white/[.08] py-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_3.2fr] lg:items-stretch">
            <div className="flex flex-col justify-center px-1 lg:pr-8">
              <h2 className="text-[21px] font-semibold leading-[1.15] text-[#adb8ff]">
                Powerful Insights.
                <br />
                Smarter Decisions.
              </h2>
              <p className="mt-4 max-w-[18rem] text-[11px] leading-5 text-slate-400">
                Everything you need to build a better software stack.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {insightCards.map((feature) => (
                <article
                  className="group border-l border-white/[.08] px-4 py-3 transition duration-300 hover:border-blue-400/50"
                  key={feature.title}
                >
                  <IconTile accent={feature.accent} icon={feature.icon} />
                  <h3 className="mt-4 min-h-9 text-[12px] font-medium leading-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[10px] leading-[1.45] text-slate-500">
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
