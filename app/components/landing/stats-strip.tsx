import { stats } from "../../data/landing";
import { SectionShell } from "../layout/section-shell";

export function StatsStrip() {
  return (
    <SectionShell
      as="section"
      className="panel-surface grid grid-cols-2 rounded-lg px-5 py-6 sm:px-10 md:grid-cols-4 md:py-7"
    >
      {stats.map((stat, index) => (
        <div
          className={`min-w-0 px-2 py-3 text-center md:py-0 ${
            index > 0 ? "md:border-l md:border-line" : ""
          }`}
          key={stat.label}
        >
          <strong className="text-3xl font-semibold text-content sm:text-4xl">
            {stat.value}
          </strong>
          <span className="mt-1.5 block text-sm text-subtle">
            {stat.label}
          </span>
        </div>
      ))}
    </SectionShell>
  );
}
