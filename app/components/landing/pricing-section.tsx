import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { pricingTiers } from "../../data/landing";
import { SectionShell } from "../layout/section-shell";
import { ButtonLink } from "../ui/button-link";

export function PricingSection() {
  return (
    <section className="pb-14 pt-10 sm:pb-16" id="pricing">
      <SectionShell className="reveal-on-scroll grid gap-7 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
        <div className="min-w-0">
          <h2 className="mb-4 px-2 text-[28px] font-semibold text-content sm:text-[36px] xl:text-[40px]">
            Simple Pricing
          </h2>
          <div className="grid min-w-0 gap-4 sm:grid-cols-3">
            {pricingTiers.map((tier) => (
              <article
                className={`relative flex min-h-[22rem] min-w-0 flex-col rounded-lg border p-6 transition duration-300 hover:-translate-y-1 ${
                  tier.featured
                    ? "border-blue-500/60 bg-blue-500/[.08] shadow-[0_0_30px_rgba(22,136,255,.12)]"
                    : "border-line bg-surface hover:border-blue-400/30"
                }`}
                key={tier.name}
              >
                {tier.featured && (
                  <span className="absolute right-3 top-3 rounded bg-blue-500/15 px-2 py-1 text-sm text-blue-300">
                    POPULAR
                  </span>
                )}
                <p
                  className={`text-base ${
                    tier.featured ? "text-blue-400" : "text-muted"
                  }`}
                >
                  {tier.name}
                </p>
                <p className="mt-2 text-[32px] font-semibold text-content">
                  {tier.price}
                  {tier.suffix && (
                    <span className="ml-1 text-sm font-normal text-muted">
                      {tier.suffix}
                    </span>
                  )}
                </p>
                <ul className="mt-5 space-y-2">
                  {tier.features.map((feature) => (
                    <li
                      className="flex items-center gap-2 text-sm text-muted"
                      key={feature}
                    >
                      <Check className="text-blue-400" size={10} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  className="mt-auto w-full px-3"
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
          className="min-w-0 rounded-lg border border-line bg-surface p-6 sm:p-8 xl:p-10"
          id="resources"
        >
          <h2 className="text-[28px] font-semibold text-content sm:text-[36px] xl:text-[40px]">
            Stay Ahead. Stay Scaled.
          </h2>
          <p className="mt-3 max-w-[24rem] text-base leading-7 text-muted">
            Get weekly SaaS insights, tool recommendations, and tips to scale
            smarter.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <input
              aria-label="Email address"
              className="h-10 min-w-0 flex-1 rounded-md border border-line bg-input px-4 text-sm text-content placeholder:text-subtle"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-blue-400/60 bg-blue-600 px-5 text-sm text-on-brand shadow-[0_0_22px_rgba(22,136,255,.3)] transition hover:bg-blue-500"
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
                  className="size-7 rounded-full border-2 border-[var(--avatar-ring)]"
                  height={40}
                  key={avatar}
                  src={`/avatars/avatar-${avatar}.svg`}
                  width={40}
                />
              ))}
            </div>
            <p className="text-sm text-subtle">
              Join 5,000+ founders already on the list.
            </p>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
