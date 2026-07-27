"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "../../data/landing";
import { ButtonLink } from "../ui/button-link";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 bg-[#071020] text-white"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="panel-surface absolute left-4 right-4 top-[4.5rem] rounded-md p-4 shadow-2xl"
          id="mobile-navigation"
        >
          <div className="flex flex-col">
            {navItems.map((item) => (
              <a
                className="border-b border-white/[.06] px-2 py-3 text-sm text-slate-300 transition hover:text-white"
                href={item.href}
                key={item.label}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <ButtonLink className="mt-4 w-full" href="#audit">
            Start Free Audit
          </ButtonLink>
        </nav>
      )}
    </div>
  );
}
