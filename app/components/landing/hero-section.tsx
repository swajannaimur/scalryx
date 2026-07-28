import { SectionShell } from "../layout/section-shell";
import { BusinessAssessment } from "../assessment/business-assessment";
import { heroComposition } from "../../data/hero-content";

export function HeroSection() {
  const { content, embeddedTool } = heroComposition;

  return (
    <section id="home">
      <SectionShell className="grid min-w-0 gap-10 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start xl:gap-16">
        <div className="min-w-0 pt-2 lg:pt-8">
          <p className="text-sm font-semibold text-[var(--assessment-accent-text)]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-xl text-[40px] font-semibold leading-[1.08] tracking-tight text-content sm:text-[52px] xl:text-[60px]">
            {content.heading}
          </h1>
          <p className="mt-6 max-w-[33rem] text-base leading-7 text-muted">
            {content.body}
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-muted">
            {content.trustPoints.map((point) => (
              <li className="flex items-center gap-3" key={point}>
                <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-[var(--assessment-accent-text)]">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div data-hero-tool={embeddedTool} id="assessment">
          <BusinessAssessment />
        </div>
      </SectionShell>
    </section>
  );
}
