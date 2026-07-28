import { trustPillars, trustProfileUrl } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";
import { Compass, LockKeyhole, SlidersHorizontal } from "lucide-react";

const trustIcons = {
  lock: LockKeyhole,
  sliders: SlidersHorizontal,
  compass: Compass,
};

export function TrustSection() {
  return (
    <section aria-labelledby="trust-heading" className="border-y border-line py-16 sm:py-20" id="methodology">
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-[var(--assessment-accent-text)]">Trust and methodology</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-content sm:text-4xl" id="trust-heading">
              A useful score starts with an honest method.
            </h2>
          </div>
          <div className="grid gap-3">
            {trustPillars.map((pillar) => {
              const Icon = trustIcons[pillar.icon];

              return (
                <article className="flex gap-4 rounded-xl border border-line bg-surface p-5" key={pillar.title}>
                  <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-[var(--assessment-accent-text)]">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-content">{pillar.title}</h3>
                    <p className="mt-1 text-base leading-7 text-muted">{pillar.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="mt-8 rounded-xl border border-dashed border-line-strong bg-surface-raised p-6 text-center">
          {trustProfileUrl ? (
            <a className="text-base font-semibold text-[var(--assessment-accent-text)] underline-offset-4 hover:underline" href={trustProfileUrl} rel="noopener noreferrer" target="_blank">
              View Scalryx on Trustpilot
            </a>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-content">Trustpilot reviews coming here</h3>
              <p className="mt-2 text-base leading-7 text-muted">Our profile link will appear here once it is ready to share.</p>
            </div>
          )}
        </div>
      </SectionShell>
    </section>
  );
}
