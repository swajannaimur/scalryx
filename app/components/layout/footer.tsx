import { BriefcaseBusiness, Mail, Play, Share2 } from "lucide-react";
import { footerGroups } from "../../data/landing";
import { Logo } from "../brand/logo";
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
      className="border-t border-blue-400/[.12] bg-[#020711]/80 py-10"
      id="footer"
    >
      <SectionShell
        className="grid gap-10 md:grid-cols-[1.4fr_3fr] lg:grid-cols-[1.3fr_3.4fr]"
        id="about"
      >
        <div>
          <Logo />
          <p className="mt-4 max-w-[15rem] text-[9px] leading-4 text-slate-500">
            AI-powered SaaS Stack Audits to help businesses scale smarter and
            spend better.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ label, icon: Icon }) => (
              <a
                aria-label={label}
                className="inline-flex size-8 items-center justify-center rounded border border-white/[.08] text-slate-500 transition hover:border-blue-400/40 hover:text-blue-400"
                href="#footer"
                key={label}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[9px] font-medium text-white">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="text-[8px] text-slate-500 transition hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="mt-9 border-t border-white/[.06] pt-5 text-right">
        <p className="text-[8px] text-slate-600">
          &copy; 2026 Scalryx. All rights reserved.
        </p>
      </SectionShell>
    </footer>
  );
}
