import { navItems } from "../../data/site-content";
import { Logo } from "../brand/logo";
import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { ThemeToggle } from "../theme/theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { SectionShell } from "./section-shell";

export function Header() {
  return (
    <header className="premium-header sticky top-0 z-40 border-b border-line bg-[var(--header)] backdrop-blur-2xl">
      <SectionShell className="flex h-[76px] items-center justify-between">
        <a
          aria-label="Scalryx home"
          className="inline-flex min-h-11 items-center"
          href="#home"
        >
          <Logo className="drop-shadow-[0_0_18px_var(--glow-soft)]" />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 rounded-xl border border-line bg-surface/60 p-1 backdrop-blur-xl lg:flex"
        >
          {navItems.map((item) => (
            <a
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm rounded-lg px-3 font-medium text-muted transition hover:bg-blue-500/10 hover:text-content"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <NewsletterTrigger className="premium-button hidden min-h-11 items-center justify-center rounded-xl px-4 text-sm font-bold sm:inline-flex">
            Join newsletter
          </NewsletterTrigger>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </SectionShell>
    </header>
  );
}
