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
    <section
      aria-labelledby="trust-heading"
      className="relative border-y border-line py-16 sm:py-24"
      data-premium-section
      id="methodology"
    >
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="premium-eyebrow">Trust and methodology</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-content sm:text-5xl" id="trust-heading">
              A useful score starts with an honest method.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-muted">
              Clear inputs. Transparent scoring. Practical outputs you can challenge and act on.
            </p>
          </div>
          <div className="grid gap-3">
            {trustPillars.map((pillar) => {
              const Icon = trustIcons[pillar.icon];

              return (
                <article className="premium-card flex gap-4 rounded-2xl p-5 sm:p-6" key={pillar.title}>
                  <span aria-hidden="true" className="icon-glow flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-content">{pillar.title}</h3>
                    <p className="mt-1 text-base leading-7 text-muted">{pillar.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="premium-panel mt-8 rounded-2xl border-dashed p-6 text-center sm:p-8">
          {trustProfileUrl ? (
            <a className="text-base font-semibold text-[var(--assessment-accent-text)] underline-offset-4 hover:underline" href={trustProfileUrl} rel="noopener noreferrer" target="_blank">
              View Scalryx on Trustpilot
            </a>
          ) : (
            <div>
              <span className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-line-strong bg-input px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-subtle">
                <span className="size-2 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
                Proof placeholder
              </span>
              <h3 className="text-xl font-bold text-content">Trustpilot reviews coming here</h3>
              <p className="mx-auto mt-2 max-w-xl text-base leading-7 text-muted">Our verified profile link will appear here once it is ready to share. No invented ratings, no borrowed trust.</p>
            </div>
          )}
        </div>
      </SectionShell>
    </section>
  );
}
