import { SectionShell } from "../layout/section-shell";
import { BusinessAssessment } from "../assessment/business-assessment";

export function HeroSection() {
  return (
    <section id="home">
      <SectionShell className="grid min-w-0 gap-10 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start xl:gap-16">
        <div className="min-w-0 pt-2 lg:pt-8">
          <p className="text-sm font-semibold text-blue-500">Business clarity, without the guesswork</p>
          <h1 className="mt-4 max-w-xl text-[40px] font-semibold leading-[1.08] tracking-tight text-content sm:text-[52px] xl:text-[60px]">
            Find the weak points slowing down your business.
          </h1>
          <p className="mt-6 max-w-[33rem] text-base leading-7 text-muted">
            Take a private, five-minute health assessment built for your business model. Get a clear score, practical next steps, and tools worth considering.
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-muted">
            {[
              "Private by default",
              "No account required",
              "Actionable results",
            ].map((point) => (
              <li className="flex items-center gap-3" key={point}>
                <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-500">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <BusinessAssessment />
      </SectionShell>
    </section>
  );
}
