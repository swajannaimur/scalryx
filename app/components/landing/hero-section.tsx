import Image from "next/image";
import { Play, Star } from "lucide-react";
import { ButtonLink } from "../ui/button-link";
import { SectionShell } from "../layout/section-shell";
import { DashboardMockup } from "../mockups/dashboard";

const avatars = [1, 2, 3, 4, 5];

export function HeroSection() {
  return (
    <section className="relative pb-9 pt-12 sm:pt-16 lg:pb-12 lg:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-8 h-72 w-[46rem] -translate-x-1/2 bg-blue-600/[.07] blur-[90px]" />
      <SectionShell className="relative grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="animate-enter max-w-[34rem]">
          <h1 className="text-[38px] font-semibold leading-[1.08] text-white sm:text-[48px] lg:text-[49px]">
            Scale Your Business Without Wasting Money on the{" "}
            <span className="text-gradient">Wrong Software</span>
          </h1>
          <p className="mt-6 max-w-[31rem] text-[14px] leading-6 text-slate-400">
            AI-powered SaaS Stack Audits that analyze your software, find
            bottlenecks, and recommend smarter tools - so you can save money and
            grow faster.
          </p>

          <div className="mt-7 flex flex-col gap-3 min-[430px]:flex-row">
            <ButtonLink className="min-w-40" href="#audit">
              Start Free Audit
            </ButtonLink>
            <ButtonLink className="min-w-36" href="#solutions" variant="secondary">
              <Play aria-hidden="true" size={13} />
              Watch Demo
            </ButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((avatar) => (
                <Image
                  alt=""
                  className="size-8 rounded-full border-2 border-[#030a15]"
                  height={40}
                  key={avatar}
                  src={`/avatars/avatar-${avatar}.svg`}
                  width={40}
                />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-amber-400">
                {avatars.map((star) => (
                  <Star
                    aria-hidden="true"
                    fill="currentColor"
                    key={star}
                    size={11}
                    strokeWidth={1}
                  />
                ))}
              </div>
              <p className="mt-1 text-[10px] text-slate-500">
                Trusted by 1,000+ businesses worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="animate-enter-delay relative">
          <div className="absolute -inset-x-8 bottom-0 h-16 bg-blue-600/30 blur-3xl" />
          <div className="animate-float relative">
            <DashboardMockup />
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
