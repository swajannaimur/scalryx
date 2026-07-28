"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useNewsletter } from "./newsletter-provider";

interface NewsletterTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> {
  children: ReactNode;
}

export function NewsletterTrigger({
  children,
  ...buttonProps
}: NewsletterTriggerProps) {
  const { openNewsletter } = useNewsletter();

  return (
    <button
      {...buttonProps}
      onClick={(event) => openNewsletter(event.currentTarget)}
      type="button"
    >
      {children}
    </button>
  );
}
