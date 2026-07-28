import { ArrowRight } from "lucide-react";
import { steps } from "../../data/landing";
import { SectionShell } from "../layout/section-shell";
import { AuditFormMockup } from "../mockups/audit-form";

export function HowItWorks() {
  return (
    <section className="pt-7" id="how-it-works">
      <SectionShell className="reveal-on-scroll grid overflow-hidden rounded-lg border border-line bg-surface lg:grid-cols-[1.03fr_.97fr]">
        <div className="min-w-0 p-5 sm:p-7">
          <h2 className="text-[28px] font-semibold text-content sm:text-[36px] xl:text-[40px]">How It Works</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {steps.map((step, index) => (
              <div className="relative text-center" key={step.number}>
                <div className="relative mx-auto flex size-10 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-blue-500/20 bg-blue-500/[.06]" />
                  <span className="relative flex size-6 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-on-brand shadow-[0_0_18px_rgba(22,136,255,.7)]">
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-3 top-3 hidden text-subtle sm:block"
                    size={14}
                  />
                )}
                <p className="mx-auto mt-3 max-w-[8rem] text-sm leading-5 text-muted">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 border-t border-line p-5 sm:p-7 lg:border-l lg:border-t-0">
          <h2 className="text-lg font-medium text-content">Try a Free Audit</h2>
          <div className="mt-3" id="audit">
            <AuditFormMockup />
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
