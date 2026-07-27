import { Check, Download, FileText } from "lucide-react";
import { Logo } from "../brand/logo";

const recommendations = [
  ["HubSpot", "CRM"],
  ["ClickUp", "Project Management"],
  ["Brevo", "Email Marketing"],
];

export function ReportMockup() {
  return (
    <div className="grid min-h-[18rem] grid-cols-[1.15fr_.85fr] gap-3 overflow-hidden rounded-lg border border-white/[.07] bg-[#071224]/75 p-4">
      <div className="min-w-0 rounded-md border border-white/[.06] bg-[#06101e]/80 p-4">
        <p className="text-[8px] text-slate-500">Overall 3 of 8</p>
        <div className="mt-1 flex items-center justify-between">
          <strong className="text-[29px] font-medium text-[#b9c8ff]">
            71
            <span className="text-[10px] font-normal text-slate-500">/100</span>
          </strong>
          <span
            aria-label="Report score 71 out of 100"
            className="relative size-12 shrink-0 rounded-full"
            style={{
              background:
                "conic-gradient(#1688ff 0 71%, rgba(94,119,155,.2) 71% 100%)",
            }}
          >
            <span className="absolute inset-[6px] rounded-full bg-[#06101e]" />
          </span>
        </div>

        <div className="mt-5">
          <p className="text-[8px] text-slate-400">Savings Opportunity</p>
          <p className="mt-1 text-[8px] text-blue-400">
            $210/month - 33% growth
          </p>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-[8px] text-slate-300">Top Recommendations</p>
            <span className="text-[7px] text-blue-500">View All</span>
          </div>
          <div className="mt-2 space-y-2">
            {recommendations.map(([name, role]) => (
              <div
                className="flex items-center gap-2 text-[7px]"
                key={name}
              >
                <span className="flex size-4 items-center justify-center rounded bg-blue-500/10 text-blue-400">
                  <Check size={9} />
                </span>
                <span className="text-white">{name}</span>
                <span className="truncate text-slate-600">- {role}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="mt-5 inline-flex h-8 items-center gap-2 rounded bg-blue-600 px-3 text-[8px] text-white shadow-[0_0_18px_rgba(22,136,255,.3)]"
          type="button"
        >
          <Download size={10} />
          Download Full Report
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute right-[3%] top-[16%] h-[70%] w-[73%] rotate-6 rounded border border-white/35 bg-slate-200" />
        <div className="relative flex h-[76%] w-[82%] -rotate-6 flex-col overflow-hidden rounded border border-blue-400/50 bg-[linear-gradient(145deg,#09254b,#071225_65%)] p-4 shadow-2xl">
          <Logo className="scale-75 origin-left" />
          <div className="mt-auto">
            <FileText className="mb-3 text-blue-400/50" size={24} />
            <p className="text-[17px] font-medium text-white">Audit Report</p>
            <p className="mt-2 text-[8px] leading-3 text-slate-400">
              Your smarter software strategy starts here.
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 size-28 rotate-45 border-[16px] border-blue-500/10" />
        </div>
      </div>
    </div>
  );
}
