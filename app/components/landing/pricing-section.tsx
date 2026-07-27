import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { pricingTiers } from "../../data/landing";
import { SectionShell } from "../layout/section-shell";
import { ButtonLink } from "../ui/button-link";

export function PricingSection() {
  return (
    <section className="pb-14 pt-10 sm:pb-16" id="pricing">
      <SectionShell className="reveal-on-scroll grid gap-7 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
        <div>
          <h2 className="mb-4 px-2 text-[15px] font-medium text-white">
            Simple Pricing
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {pricingTiers.map((tier) => (
              <article
                className={`relative flex min-h-[15rem] flex-col rounded-lg border p-5 transition duration-300 hover:-translate-y-1 ${
                  tier.featured
                    ? "border-blue-500/60 bg-blue-500/[.08] shadow-[0_0_30px_rgba(22,136,255,.12)]"
                    : "border-white/[.1] bg-[#071020]/70 hover:border-blue-400/30"
                }`}
                key={tier.name}
              >
                {tier.featured && (
                  <span className="absolute right-3 top-3 rounded bg-blue-500/15 px-2 py-1 text-[7px] text-blue-300">
                    POPULAR
                  </span>
                )}
                <p
                  className={`text-[12px] ${
                    tier.featured ? "text-blue-400" : "text-slate-300"
                  }`}
                >
                  {tier.name}
                </p>
                <p className="mt-2 text-[27px] font-semibold text-white">
                  {tier.price}
                  {tier.suffix && (
                    <span className="ml-1 text-[9px] font-normal text-slate-400">
                      {tier.suffix}
                    </span>
                  )}
                </p>
                <ul className="mt-5 space-y-2">
                  {tier.features.map((feature) => (
                    <li
                      className="flex items-center gap-2 text-[9px] text-slate-400"
                      key={feature}
                    >
                      <Check className="text-blue-400" size={10} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  className="mt-auto h-9 w-full px-3 text-[9px]"
                  href="#audit"
                  variant={tier.featured ? "primary" : "secondary"}
                >
                  Get Started
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>

        <div
          className="rounded-lg border border-white/[.08] bg-[#071020]/70 p-6 sm:p-8"
          id="resources"
        >
          <h2 className="text-[22px] font-semibold text-white">
            Stay Ahead. Stay Scaled.
          </h2>
          <p className="mt-3 max-w-[24rem] text-[11px] leading-5 text-slate-400">
            Get weekly SaaS insights, tool recommendations, and tips to scale
            smarter.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <input
              aria-label="Email address"
              className="h-10 min-w-0 flex-1 rounded-md border border-white/[.08] bg-black/20 px-4 text-[10px] text-white placeholder:text-slate-600"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-blue-400/60 bg-blue-600 px-5 text-[10px] text-white shadow-[0_0_22px_rgba(22,136,255,.3)] transition hover:bg-blue-500"
              type="button"
            >
              Subscribe
              <ArrowRight size={11} />
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((avatar) => (
                <Image
                  alt=""
                  className="size-7 rounded-full border-2 border-[#071020]"
                  height={40}
                  key={avatar}
                  src={`/avatars/avatar-${avatar}.svg`}
                  width={40}
                />
              ))}
            </div>
            <p className="text-[8px] text-slate-500">
              Join 5,000+ founders already on the list.
            </p>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
