import { Check, Download, FileText } from "lucide-react";
import { Logo } from "../brand/logo";

const recommendations = [
  ["HubSpot", "CRM"],
  ["ClickUp", "Project Management"],
  ["Brevo", "Email Marketing"],
];

export function ReportMockup() {
  return (
    <div className="grid min-h-[24rem] grid-cols-1 gap-3 overflow-hidden rounded-lg border border-line bg-surface p-5 sm:grid-cols-[1.15fr_.85fr]">
      <div className="min-w-0 rounded-md border border-line bg-surface-raised p-5">
        <p className="text-xs text-subtle">Overall 3 of 8</p>
        <div className="mt-1 flex items-center justify-between">
          <strong className="text-[32px] font-medium text-content">
            71
            <span className="text-xs font-normal text-subtle">/100</span>
          </strong>
          <span
            aria-label="Report score 71 out of 100"
            className="relative size-12 shrink-0 rounded-full"
            style={{
              background:
                "conic-gradient(var(--blue) 0 71%, var(--score-track) 71% 100%)",
            }}
          >
            <span className="absolute inset-[6px] rounded-full bg-surface-raised" />
          </span>
        </div>

        <div className="mt-5">
          <p className="text-xs text-muted">Savings Opportunity</p>
          <p className="mt-1 text-xs text-blue-500">
            $210/month - 33% growth
          </p>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted">Top Recommendations</p>
            <span className="text-xs text-blue-500">View All</span>
          </div>
          <div className="mt-2 space-y-2">
            {recommendations.map(([name, role]) => (
              <div
                className="flex flex-wrap items-center gap-2 text-xs"
                key={name}
              >
                <span className="flex size-4 items-center justify-center rounded bg-blue-500/10 text-blue-400">
                  <Check size={9} />
                </span>
                <span className="text-content">{name}</span>
                <span className="text-subtle">- {role}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="mt-5 inline-flex h-8 items-center gap-2 rounded bg-blue-600 px-3 text-xs text-on-brand shadow-[0_0_18px_rgba(22,136,255,.3)]"
          type="button"
        >
          <Download size={10} />
          Download Full Report
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute right-[3%] top-[16%] h-[70%] w-[73%] rotate-6 rounded border border-line-strong bg-surface-raised" />
        <div className="report-cover relative flex h-[76%] w-[82%] -rotate-6 flex-col overflow-hidden rounded border border-blue-400/50 p-4 shadow-2xl">
          <Logo className="scale-75 origin-left" />
          <div className="mt-auto">
            <FileText className="mb-3 text-blue-400/50" size={24} />
            <p className="text-lg font-medium text-on-brand">Audit Report</p>
            <p className="mt-2 text-xs leading-5 text-on-brand/80">
              Your smarter software strategy starts here.
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 size-28 rotate-45 border-[16px] border-blue-500/10" />
        </div>
      </div>
    </div>
  );
}
