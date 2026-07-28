import { BriefcaseBusiness, Mail, Play, Share2 } from "lucide-react";
import { footerGroups } from "../../data/site-content";
import { Logo } from "../brand/logo";
import { NewsletterTrigger } from "../newsletter/newsletter-trigger";
import { SectionShell } from "./section-shell";

const socials = [
  { label: "Social", icon: Share2 },
  { label: "LinkedIn", icon: BriefcaseBusiness },
  { label: "YouTube", icon: Play },
  { label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer
      className="relative border-t border-blue-400/20 bg-[var(--header)] py-10 sm:py-14"
      data-premium-footer
      id="footer"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--electric-blue),transparent)] shadow-[0_0_18px_var(--electric-blue)]" />
      <SectionShell className="premium-panel grid gap-10 rounded-[1.75rem] p-6 md:grid-cols-[1.4fr_3fr] sm:p-8 lg:grid-cols-[1.3fr_3.4fr]" id="about">
        <div className="min-w-0">
          <Logo className="drop-shadow-[0_0_16px_var(--glow-soft)]" />
          <p className="mt-4 max-w-[20rem] text-sm leading-6 text-subtle">
            Independent business-health guidance and practical software
            recommendations for founders and operating leaders.
          </p>
          <NewsletterTrigger className="premium-button mt-5 min-h-11 rounded-xl px-4 text-sm font-bold">
            Join the newsletter →
          </NewsletterTrigger>
          <div className="mt-5 flex gap-2">
            {socials.map(({ label, icon: Icon }) => (
              <a
                aria-label={label}
                className="icon-glow inline-flex size-11 items-center justify-center rounded-xl text-subtle transition hover:text-content"
                href="#footer"
                key={label}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-content">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => {
                  if (link.label === "Newsletter") {
                    return (
                      <li key={link.label}>
                        <NewsletterTrigger className="inline-flex min-h-11 items-center text-left text-sm leading-6 text-subtle transition hover:text-content">
                          {link.label}
                        </NewsletterTrigger>
                      </li>
                    );
                  }

                  if (link.label === "Affiliate Disclosure") {
                    return (
                      <li key={link.label}>
                        <a className="inline-flex min-h-11 items-center text-sm leading-6 text-subtle transition hover:text-content" href="#affiliate-disclosure">
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <a className="inline-flex min-h-11 items-center text-sm leading-6 text-subtle transition hover:text-content" href={link.href}>
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

      <SectionShell className="mt-8 border-t border-line pt-5">
        <div className="flex flex-col gap-4 text-sm leading-6 text-subtle sm:flex-row sm:items-start sm:justify-between">
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
