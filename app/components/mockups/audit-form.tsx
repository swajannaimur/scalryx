import { ArrowRight } from "lucide-react";

const crmOptions = ["HubSpot", "Zoho", "Salesforce", "None"];

export function AuditFormMockup() {
  return (
    <div className="rounded-lg border border-white/[.07] bg-[#071224]/70 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-[10px] text-slate-300">
          Question 3 of 8
        </span>
        <div className="scan-line relative h-1 flex-1 overflow-hidden rounded-full bg-white/[.08]">
          <div className="h-full w-[62%] rounded-full bg-blue-500" />
        </div>
        <span className="text-[9px] text-slate-400">62%</span>
      </div>

      <p className="mt-5 text-[12px] text-slate-300">
        Which CRM do you currently use?
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {crmOptions.map((option) => (
          <button
            className="inline-flex h-9 items-center gap-2 rounded-md border border-white/[.1] bg-black/10 px-3 text-[10px] text-slate-400 transition hover:border-blue-400/50 hover:text-white"
            key={option}
            type="button"
          >
            <span className="size-2.5 rounded-full border border-slate-500" />
            {option}
          </button>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          className="inline-flex h-9 items-center gap-2 rounded-md border border-blue-400/60 bg-blue-600 px-4 text-[10px] font-medium text-white shadow-[0_0_22px_rgba(22,136,255,.32)] transition hover:bg-blue-500"
          type="button"
        >
          Next
          <ArrowRight aria-hidden="true" size={12} />
        </button>
      </div>
    </div>
  );
}
