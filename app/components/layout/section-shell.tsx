import type { ReactNode } from "react";

interface SectionShellProps {
  as?: "div" | "section";
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionShell({
  as: Tag = "div",
  children,
  className = "",
  id,
}: SectionShellProps) {
  return (
    <Tag className={`site-shell ${className}`} id={id}>
      {children}
    </Tag>
  );
}
