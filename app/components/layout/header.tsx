import { ChevronDown } from "lucide-react";
import { navItems } from "../../data/landing";
import { Logo } from "../brand/logo";
import { ThemeToggle } from "../theme/theme-toggle";
import { ButtonLink } from "../ui/button-link";
import { MobileMenu } from "./mobile-menu";
import { SectionShell } from "./section-shell";

const primaryNavLabels = [
  "Features",
  "Solutions",
  "Resources",
  "Pricing",
  "Blog",
  "About",
];
const dropdownLabels = new Set(["Solutions", "Resources"]);

export function Header() {
  const primaryNavItems = navItems.filter((item) =>
    primaryNavLabels.includes(item.label),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/[.05] bg-[#020711]/80 backdrop-blur-xl">
      <SectionShell className="flex h-[68px] items-center justify-between">
        <a aria-label="Scalryx home" href="#">
          <Logo />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {primaryNavItems.map((item) => (
            <a
              className="inline-flex items-center gap-1 text-[12px] text-slate-400 transition hover:text-white"
              href={item.href}
              key={item.label}
            >
              {item.label}
              {dropdownLabels.has(item.label) && (
                <ChevronDown aria-hidden="true" size={12} />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href="#about" variant="secondary">
              Log In
            </ButtonLink>
            <ButtonLink href="#audit">Start Free Audit</ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </SectionShell>
    </header>
  );
}
