import { SectionShell } from "../layout/section-shell";
import { DashboardMockup } from "../mockups/dashboard";
import { ReportMockup } from "../mockups/report";

export function ProductShowcase() {
  return (
    <section className="pt-7" id="solutions">
      <SectionShell className="reveal-on-scroll grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 px-2 text-[15px] font-medium text-white">
            Powerful Dashboard
          </h2>
          <DashboardMockup compact />
        </div>
        <div>
          <h2 className="mb-3 px-2 text-[15px] font-medium text-white">
            Sample Report
          </h2>
          <ReportMockup />
        </div>
      </SectionShell>
    </section>
  );
}
