import type { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const variants = {
  primary:
    "border-blue-400/70 bg-blue-600 text-on-brand shadow-[0_0_28px_rgba(22,136,255,.32)] hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_36px_rgba(22,136,255,.5)]",
  secondary:
    "border-line-strong bg-surface text-content hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-blue-500/10",
  ghost: "border-transparent text-muted hover:text-content",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border px-5 text-sm font-medium transition duration-200 ${variants[variant]} ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}
