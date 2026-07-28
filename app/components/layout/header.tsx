import { navItems } from "../../data/site-content";
import { Logo } from "../brand/logo";
import { ThemeToggle } from "../theme/theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { SectionShell } from "./section-shell";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[var(--header)] backdrop-blur-xl">
      <SectionShell className="flex h-[68px] items-center justify-between">
        <a
          aria-label="Scalryx home"
          className="inline-flex min-h-11 items-center"
          href="#home"
        >
          <Logo />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navItems.map((item) => (
            <a
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm text-muted transition hover:text-content"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </SectionShell>
    </header>
  );
}
