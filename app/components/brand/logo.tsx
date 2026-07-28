interface LogoProps {
  compact?: boolean;
  className?: string;
}

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-semibold text-content ${className}`}
    >
      <span aria-hidden="true" className="relative block size-5 text-blue-400">
        <span className="absolute left-[9px] top-0 h-5 w-[3px] rotate-45 rounded-full bg-current shadow-[0_0_14px_currentColor]" />
        <span className="absolute left-[9px] top-0 h-5 w-[3px] -rotate-45 rounded-full bg-current opacity-70" />
      </span>
      {!compact && <span className="text-lg font-semibold">Scalryx</span>}
    </span>
  );
}
