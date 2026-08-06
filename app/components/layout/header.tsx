import { navItems } from "../../data/site-content";
import { Logo } from "../brand/logo";
import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { MobileMenu } from "./mobile-menu";
import { SectionShell } from "./section-shell";

export function Header() {
  return (
    <header className="editorial-header sticky top-0 z-40 border-b border-line bg-[var(--header)] backdrop-blur-xl">
      <SectionShell className="grid h-[72px] grid-cols-[auto_minmax(0,1fr)_auto] items-center">
        <a
          aria-label="Scalryx home"
          className="inline-flex min-h-11 shrink-0 items-center"
          href="#home"
        >
          <Logo className="w-28 sm:w-32" preload />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center justify-self-center gap-1 lg:flex"
        >
          {navItems.map((item) => (
            <a
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm rounded-lg px-3 font-semibold text-muted transition hover:bg-[var(--brand-accent-soft)] hover:text-[var(--brand-accent)]"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <NewsletterTrigger className="primary-button hidden min-h-11 items-center justify-center rounded-xl px-4 text-sm font-bold sm:inline-flex">
            Join newsletter
          </NewsletterTrigger>
          <MobileMenu />
        </div>
      </SectionShell>
    </header>
  );
}
