import { navItems } from "../../data/site-content";
import { Logo } from "../brand/logo";
import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { MobileMenu } from "./mobile-menu";
import { SectionShell } from "./section-shell";

export function Header() {
  return (
    <header className="editorial-header sticky top-0 z-40 border-b border-line bg-[var(--header)] backdrop-blur-xl">
      <SectionShell className="flex h-[72px] items-center justify-between">
        <a
          aria-label="Scalryx home"
          className="inline-flex min-h-11 items-center"
          href="#home"
        >
          <Logo />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => (
            <a
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm rounded-lg px-3 font-semibold text-muted transition hover:bg-[var(--brand-soft)] hover:text-[var(--brand-navy)]"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <NewsletterTrigger className="primary-button hidden min-h-11 items-center justify-center rounded-xl px-4 text-sm font-bold sm:inline-flex">
            Join newsletter
          </NewsletterTrigger>
          <MobileMenu />
        </div>
      </SectionShell>
    </header>
  );
}
