import { SectionShell } from "../layout/section-shell";
import { DashboardMockup } from "../mockups/dashboard";
import { ReportMockup } from "../mockups/report";

export function ProductShowcase() {
  return (
    <section className="pt-7" id="solutions">
      <SectionShell className="reveal-on-scroll grid gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <h2 className="mb-3 px-2 text-[28px] font-semibold text-content sm:text-[36px] xl:text-[40px]">
            Powerful Dashboard
          </h2>
          <DashboardMockup compact />
        </div>
        <div className="min-w-0">
          <h2 className="mb-3 px-2 text-[28px] font-semibold text-content sm:text-[36px] xl:text-[40px]">
            Sample Report
          </h2>
          <ReportMockup />
        </div>
      </SectionShell>
    </section>
  );
}
