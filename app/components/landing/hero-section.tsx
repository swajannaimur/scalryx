import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { heroComposition } from "../../data/hero-content";
import { BusinessAssessment } from "../assessment/business-assessment";
import { SectionShell } from "../layout/section-shell";

export function HeroSection() {
  const { content, embeddedTool } = heroComposition;

  return (
    <section
      className="overflow-hidden border-b border-line pb-16 pt-12 sm:pb-24 sm:pt-16"
      data-editorial-hero
      id="home"
    >
      <SectionShell>
        <div className="grid min-w-0 gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center xl:gap-16">
          <div className="min-w-0 lg:py-8">
            <p className="section-label animate-stagger-1">{content.eyebrow}</p>
            <h1 className="animate-stagger-2 mt-6 max-w-[42rem] text-[42px] font-bold leading-[1.04] tracking-[-0.05em] text-content sm:text-[56px] xl:text-[64px]">
              Business clarity, without the guesswork
            </h1>
            <p className="animate-stagger-3 mt-6 max-w-[35rem] text-base leading-8 text-muted sm:text-lg">
              {content.body}
            </p>

            <a
              className="primary-button mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold sm:w-auto"
              href="#assessment"
            >
              Check your business health
              <ArrowRight aria-hidden="true" size={17} />
            </a>

            <ul className="mt-8 grid max-w-[34rem] grid-cols-2 gap-x-5 gap-y-3 text-sm text-muted">
              {content.trustPoints.map((point, index) => (
                <li className="flex items-center gap-2.5" key={point}>
                  <span
                    aria-hidden="true"
                    className="icon-tile flex size-7 shrink-0 items-center justify-center rounded-full"
                  >
                    {index === 2 ? <LockKeyhole size={13} /> : <Check size={13} />}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="animate-enter-delay min-w-0 scroll-mt-32"
            data-hero-tool={embeddedTool}
            data-live-assessment
            id="assessment"
          >
            <div className="mb-3 flex items-center justify-between gap-4 px-1 text-xs font-bold uppercase tracking-[0.12em] text-subtle">
              <span>Live assessment</span>
              <span className="normal-case tracking-normal text-muted">Private in this browser</span>
            </div>
            <BusinessAssessment />
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
