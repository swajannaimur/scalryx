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
        compact ? "p-2" : "p-4 sm:p-5"
      }`}
    >
      <div className="pointer-events-none absolute -left-16 bottom-0 h-20 w-72 bg-blue-600/25 blur-3xl" />
      <div className="mb-3 flex items-center justify-between border-b border-line px-1.5 pb-3">
        <Logo className="scale-75 origin-left" />
        <span className="text-xs text-muted">Audit Overview</span>
        <span className="text-xs text-subtle">Scalryx AI</span>
      </div>

      <div
        className={`grid ${compact ? "grid-cols-[120px_1fr]" : "grid-cols-1 sm:grid-cols-[140px_1fr]"} gap-3`}
      >
        <aside
          aria-label="Dashboard navigation"
          className={`border-r border-line pr-2 ${compact ? "" : "hidden sm:block"}`}
        >
          <div className="space-y-1">
            {navigation.map(({ label, icon: Icon }, index) => (
              <div
                className={`flex items-start gap-2 rounded px-2 py-2 text-xs leading-4 ${
                  index === 0
                    ? "bg-blue-600 text-on-brand shadow-[0_0_20px_rgba(22,136,255,.35)]"
                    : "text-muted"
                }`}
                key={label}
              >
                <Icon className="mt-0.5 shrink-0" size={12} />
                <span className="whitespace-normal">{label}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
            <div className="rounded-md border border-line bg-surface-raised p-4">
              <p className="text-sm text-muted">Overall Score</p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
                <strong className="text-[32px] font-semibold text-content">
                  72
                  <span className="text-sm font-normal text-muted">
                    /100
                  </span>
                </strong>
                <span
                  aria-label="Score 72 out of 100"
                  className="animate-ring relative size-12 shrink-0 rounded-full sm:size-14"
                  style={{
                    background:
                      "conic-gradient(var(--blue) 0 72%, var(--score-track) 72% 100%)",
                  }}
                >
                  <span className="absolute inset-[7px] rounded-full bg-surface-raised" />
                </span>
              </div>
              <span className="mt-1 block text-xs leading-4 text-blue-500">Good</span>
            </div>

            <div className="rounded-md border border-line bg-surface-raised p-4">
              <p className="text-sm text-muted">Potential Savings</p>
              <strong className="mt-3 block text-xl font-semibold text-content">
                $180
                <span className="text-sm font-normal text-muted">
                  /mo
                </span>
              </strong>
              <span className="mt-2 block text-xs leading-4 text-subtle">
                That&apos;s 31% of your spend
              </span>
            </div>
          </div>

          <div className={`mt-3 grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"}`}>
            {[
              ["Problems Found", "3"],
              ["Opportunities", "5"],
              ["Tools Analyzed", "8"],
            ].map(([label, value]) => (
              <div
                className="rounded-md border border-line bg-surface-raised p-4"
                key={label}
              >
                <p className="whitespace-normal text-xs text-muted">{label}</p>
                <strong className="mt-1 block text-xl text-content">
                  {value}
                </strong>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-md border border-line bg-surface-raised p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-content">
                Top Recommendations
              </p>
              <span className="text-xs text-blue-500">View All</span>
            </div>
            <div className={`mt-3 grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-4"}`}>
              {recommendations.map((tool) => (
                <div className="min-w-0 text-center" key={tool.name}>
                  <span
                    className={`mx-auto flex size-7 items-center justify-center rounded text-[12px] font-bold ${tool.color}`}
                  >
                    {tool.mark}
                  </span>
                  <span className="mt-1 block break-words whitespace-normal text-xs text-muted">
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
