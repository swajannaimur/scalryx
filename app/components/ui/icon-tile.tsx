import {
  Blocks,
  Bot,
  ChartNoAxesCombined,
  CircleGauge,
  GitBranch,
  Route,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { Accent, FeatureIcon } from "../../data/landing";

const icons = {
  blocks: Blocks,
  bolt: Zap,
  growth: ChartNoAxesCombined,
  audit: Bot,
  target: CircleGauge,
  shield: ShieldCheck,
  route: Route,
} satisfies Record<FeatureIcon, typeof GitBranch>;

const accents: Record<Accent, string> = {
  blue: "bg-blue-500/15 text-blue-400 shadow-[inset_0_0_18px_rgba(22,136,255,.12)]",
  violet:
    "bg-violet-500/15 text-violet-400 shadow-[inset_0_0_18px_rgba(139,92,246,.12)]",
  orange:
    "bg-orange-500/15 text-orange-400 shadow-[inset_0_0_18px_rgba(249,115,22,.12)]",
  green:
    "bg-emerald-500/15 text-emerald-400 shadow-[inset_0_0_18px_rgba(16,185,129,.12)]",
};

interface IconTileProps {
  icon: FeatureIcon;
  accent: Accent;
}

export function IconTile({ icon, accent }: IconTileProps) {
  const Icon = icons[icon];

  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-md ${accents[accent]}`}
    >
      <Icon size={20} strokeWidth={2} />
    </span>
  );
}
