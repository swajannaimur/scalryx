import {
  ChartNoAxesCombined,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";
import { Logo } from "../brand/logo";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Audits", icon: ClipboardCheck },
  { label: "Reports", icon: FileText },
  { label: "Recommendations", icon: Sparkles },
  { label: "Settings", icon: Settings },
];

const recommendations = [
  { name: "HubSpot", mark: "H", color: "text-orange-400 bg-orange-500/10" },
  { name: "ClickUp", mark: "C", color: "text-fuchsia-400 bg-fuchsia-500/10" },
  { name: "Brevo", mark: "B", color: "text-emerald-400 bg-emerald-500/10" },
  { name: "Cloudways", mark: "C", color: "text-blue-400 bg-blue-500/10" },
];

interface DashboardMockupProps {
  compact?: boolean;
}

export function DashboardMockup({ compact = false }: DashboardMockupProps) {
  return (
    <div
      className={`panel-surface blue-glow relative overflow-hidden rounded-lg ${
        compact ? "p-2" : "p-2.5 sm:p-3"
      }`}
    >
      <div className="pointer-events-none absolute -left-16 bottom-0 h-20 w-72 bg-blue-600/25 blur-3xl" />
      <div className="mb-2.5 flex items-center justify-between border-b border-white/[.05] px-1.5 pb-2.5">
        <Logo className="scale-75 origin-left" />
        <span className="text-[8px] text-slate-600">Audit Overview</span>
        <span className="text-[8px] text-slate-700">Scalryx AI</span>
      </div>

      <div
        className={`grid ${compact ? "grid-cols-[82px_1fr]" : "grid-cols-1 sm:grid-cols-[112px_1fr]"} gap-2.5`}
      >
        <aside
          aria-label="Dashboard navigation"
          className={`border-r border-white/[.05] pr-2 ${compact ? "" : "hidden sm:block"}`}
        >
          <div className="space-y-1">
            {navigation.map(({ label, icon: Icon }, index) => (
              <div
                className={`flex items-center gap-2 rounded px-2 py-2 text-[8px] ${
                  index === 0
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(22,136,255,.35)]"
                    : "text-slate-500"
                }`}
                key={label}
              >
                <Icon size={10} />
                <span className={compact && label.length > 11 ? "hidden" : ""}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border border-white/[.06] bg-[#071224]/80 p-3">
              <p className="text-[8px] text-slate-300">Overall Score</p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <strong className="text-2xl font-semibold text-white sm:text-[28px]">
                  72
                  <span className="text-[11px] font-normal text-slate-400">
                    /100
                  </span>
                </strong>
                <span
                  aria-label="Score 72 out of 100"
                  className="animate-ring relative size-12 shrink-0 rounded-full sm:size-14"
                  style={{
                    background:
                      "conic-gradient(#1688ff 0 72%, rgba(94,119,155,.2) 72% 100%)",
                  }}
                >
                  <span className="absolute inset-[7px] rounded-full bg-[#071224]" />
                </span>
              </div>
              <span className="mt-1 block text-[8px] text-blue-400">Good</span>
            </div>

            <div className="rounded-md border border-white/[.06] bg-[#071224]/80 p-3">
              <p className="text-[8px] text-slate-300">Potential Savings</p>
              <strong className="mt-3 block text-xl font-semibold text-white sm:text-[25px]">
                $180
                <span className="text-[10px] font-normal text-slate-400">
                  /mo
                </span>
              </strong>
              <span className="mt-2 block text-[8px] text-slate-500">
                That&apos;s 31% of your spend
              </span>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              ["Problems Found", "3"],
              ["Opportunities", "5"],
              ["Tools Analyzed", "8"],
            ].map(([label, value]) => (
              <div
                className="rounded-md border border-white/[.06] bg-[#071224]/80 p-2.5"
                key={label}
              >
                <p className="truncate text-[7px] text-slate-400">{label}</p>
                <strong className="mt-1 block text-base text-white">
                  {value}
                </strong>
              </div>
            ))}
          </div>

          <div className="mt-2 rounded-md border border-white/[.06] bg-[#071224]/80 p-3">
            <div className="flex items-center justify-between">
              <p className="text-[8px] font-medium text-white">
                Top Recommendations
              </p>
              <span className="text-[7px] text-blue-500">View All</span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {recommendations.map((tool) => (
                <div className="min-w-0 text-center" key={tool.name}>
                  <span
                    className={`mx-auto flex size-7 items-center justify-center rounded text-[12px] font-bold ${tool.color}`}
                  >
                    {tool.mark}
                  </span>
                  <span className="mt-1 block truncate text-[7px] text-slate-400">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {!compact && (
        <ChartNoAxesCombined
          aria-hidden="true"
          className="absolute right-3 top-3 text-blue-400/20"
          size={18}
        />
      )}
    </div>
  );
}
