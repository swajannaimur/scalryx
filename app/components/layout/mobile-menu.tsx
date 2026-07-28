"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "../../data/site-content";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="premium-card inline-flex size-11 items-center justify-center rounded-xl text-content"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="premium-panel absolute left-4 right-4 top-[5rem] rounded-2xl p-3 shadow-2xl"
          id="mobile-navigation"
        >
          <div className="flex flex-col">
            {navItems.map((item) => (
              <a
                className="flex min-h-11 items-center rounded-xl px-3 py-3 text-sm font-medium text-muted transition hover:bg-blue-500/10 hover:text-content"
                href={item.href}
                key={item.label}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
