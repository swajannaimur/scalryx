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
      className="border-t border-blue-400/[.12] bg-[var(--header)] py-10"
      id="footer"
    >
      <SectionShell className="grid gap-10 md:grid-cols-[1.4fr_3fr] lg:grid-cols-[1.3fr_3.4fr]" id="about">
        <div>
          <Logo />
          <p className="mt-4 max-w-[18rem] text-sm leading-6 text-subtle">
            Independent business-health guidance and practical software
            recommendations for founders and operating leaders.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ label, icon: Icon }) => (
              <a
                aria-label={label}
                className="inline-flex size-11 items-center justify-center rounded border border-line text-subtle transition hover:border-blue-400/40 hover:text-blue-400"
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
              <h2 className="text-base font-medium text-content">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => {
                  if (link.label === "Newsletter") {
                    return (
                      <li key={link.label}>
                        <NewsletterTrigger className="min-h-11 text-left text-sm leading-6 text-subtle transition hover:text-content">
                          {link.label}
                        </NewsletterTrigger>
                      </li>
                    );
                  }

                  if (link.label === "Affiliate Disclosure") {
                    return (
                      <li key={link.label}>
                        <a className="text-sm leading-6 text-subtle transition hover:text-content" href="#affiliate-disclosure">
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <a className="text-sm leading-6 text-subtle transition hover:text-content" href={link.href}>
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

      <SectionShell className="mt-9 border-t border-line pt-5">
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
