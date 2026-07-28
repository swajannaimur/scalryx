import {
  Activity,
  ArrowDownRight,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SectionShell } from "../layout/section-shell";
import { BusinessAssessment } from "../assessment/business-assessment";
import { heroComposition } from "../../data/hero-content";

const capabilities = [
  { value: "4", label: "Business models", icon: Layers3 },
  { value: "10", label: "Tailored questions", icon: Activity },
  { value: "100", label: "Point health score", icon: Gauge },
  { value: "Private", label: "Browser-only answers", icon: ShieldCheck },
];

export function HeroSection() {
  const { content, embeddedTool } = heroComposition;

  return (
    <section
      className="relative isolate overflow-hidden pb-14 pt-6 sm:pb-20 sm:pt-10"
      data-premium-hero
      id="home"
    >
      <div aria-hidden="true" className="ambient-orb -right-28 top-[-8rem]" />
      <div
        aria-hidden="true"
        className="ambient-orb -left-48 top-[30rem] opacity-35 [animation-delay:-4s]"
      />
      <SectionShell className="relative">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center xl:gap-16">
          <div className="min-w-0 lg:py-10">
            <div className="premium-eyebrow animate-stagger-1">
              <Sparkles aria-hidden="true" size={13} />
              {content.eyebrow}
            </div>
            <h1 className="animate-stagger-2 mt-6 max-w-[42rem] text-[44px] font-bold leading-[1.02] tracking-[-0.045em] text-content sm:text-[58px] xl:text-[68px]">
              Find the weak points{" "}
              <span className="text-gradient">slowing down</span> your business.
            </h1>
            <p className="animate-stagger-3 mt-6 max-w-[36rem] text-base leading-8 text-muted sm:text-lg">
              {content.body}
            </p>

            <div className="animate-stagger-3 mt-8 flex flex-wrap items-center gap-3">
              <a
                className="premium-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold"
                href="#assessment"
              >
                Check your business health
                <ArrowDownRight aria-hidden="true" size={17} />
              </a>
              <span className="inline-flex min-h-12 items-center rounded-xl border border-line bg-surface px-4 text-sm font-medium text-muted backdrop-blur-xl">
                Five minutes. No account.
              </span>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              {content.trustPoints.map((point) => (
                <li className="flex items-center gap-2.5" key={point}>
                  <span
                    aria-hidden="true"
                    className="icon-glow flex size-7 items-center justify-center rounded-full"
                  >
                    <ShieldCheck size={14} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="animate-enter-delay relative min-w-0"
            data-assessment-console
            data-hero-tool={embeddedTool}
            id="assessment"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-blue-500/15 blur-3xl"
            />
            <div className="mb-3 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                Live assessment
              </span>
              <span>Business health console</span>
            </div>
            <BusinessAssessment />
          </div>
        </div>

        <div
          className="premium-panel mt-12 grid overflow-hidden rounded-2xl sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
          data-capability-strip
        >
          {capabilities.map(({ value, label, icon: Icon }, index) => (
            <div
              className="flex min-h-28 items-center gap-4 border-b border-line px-5 py-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(3)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              key={label}
            >
              <span className="icon-glow flex size-10 shrink-0 items-center justify-center rounded-xl">
                <Icon aria-hidden="true" size={18} />
              </span>
              <span>
                <strong className="number-glow block text-2xl font-bold tracking-tight">
                  {value}
                </strong>
                <span className="text-sm text-muted">{label}</span>
              </span>
              <span className="sr-only">Capability {index + 1}</span>
            </div>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
