import { footerGroups } from "../../data/site-content";
import { Logo } from "../brand/logo";
import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { SectionShell } from "./section-shell";

export function Footer() {
  return (
    <footer
      className="border-t border-line bg-[var(--canvas-soft)] py-12 sm:py-16"
      data-editorial-footer
      id="footer"
    >
      <SectionShell className="grid gap-12 md:grid-cols-[1.1fr_2fr]" id="about">
        <div className="min-w-0">
          <Logo className="w-[140px]" />
          <p className="mt-5 max-w-[22rem] text-sm leading-7 text-muted">
            Independent business-health guidance and practical software
            recommendations for founders and operating leaders.
          </p>
          <NewsletterTrigger className="primary-button mt-6 min-h-11 rounded-xl px-4 text-sm font-bold">
            Join the newsletter →
          </NewsletterTrigger>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="section-label">{group.title}</h2>
              <ul className="mt-5 space-y-2">
                {group.links.map((link) => {
                  if (link.label === "Newsletter") {
                    return (
                      <li key={link.label}>
                        <NewsletterTrigger className="inline-flex min-h-11 items-center text-left text-sm leading-6 text-muted transition hover:text-[var(--brand-accent)]">
                          {link.label}
                        </NewsletterTrigger>
                      </li>
                    );
                  }

                  if (link.label === "Affiliate Disclosure") {
                    return (
                      <li key={link.label}>
                        <a className="inline-flex min-h-11 items-center text-sm leading-6 text-muted transition hover:text-[var(--brand-accent)]" href="#affiliate-disclosure">
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <a className="inline-flex min-h-11 items-center text-sm leading-6 text-muted transition hover:text-[var(--brand-accent)]" href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="mt-12 border-t border-line pt-6">
        <div className="flex flex-col gap-3 text-sm leading-6 text-subtle sm:flex-row sm:items-start sm:justify-between">
          <p id="contact">Contact details will be added here soon.</p>
          <p>&copy; 2026 Scalryx. All rights reserved.</p>
        </div>
        <p className="mt-4 max-w-3xl text-xs leading-5 text-subtle" id="affiliate-disclosure">
          Scalryx may earn a commission from qualifying purchases made through some links, at no extra cost to you.
        </p>
      </SectionShell>
    </footer>
  );
}
