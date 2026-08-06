import { Compass, LockKeyhole, SlidersHorizontal } from "lucide-react";
import { trustPillars } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";

const trustIcons = {
  lock: LockKeyhole,
  sliders: SlidersHorizontal,
  compass: Compass,
};

const trustFacts = ["Browser session only", "4 business models", "0–100 practical score"];

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="soft-section border-y border-line py-16 sm:py-24"
      data-editorial-section
      id="methodology"
    >
      <SectionShell>
        <div className="max-w-3xl">
          <p className="section-label">Trust and methodology</p>
          <h2
            className="mt-5 text-3xl font-bold tracking-[-0.04em] text-content sm:text-5xl"
            id="trust-heading"
          >
            Clear inputs. Practical scoring. No mystery layer.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            The assessment is designed to help you notice operating signals, not replace professional advice or promise certainty.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {trustPillars.map((pillar, index) => {
            const Icon = trustIcons[pillar.icon];

            return (
              <article className="editorial-card rounded-2xl p-5 sm:p-6" key={pillar.title}>
                <span aria-hidden="true" className="icon-tile flex size-11 items-center justify-center rounded-xl">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-content">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{pillar.description}</p>
                <p className="mt-6 border-t border-line pt-4 text-sm font-bold text-[var(--brand-secondary)]">
                  {trustFacts[index]}
                </p>
              </article>
            );
          })}
        </div>
      </SectionShell>
    </section>
  );
}
