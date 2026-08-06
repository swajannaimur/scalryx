import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { heroComposition, heroContent } from "../app/data/hero-content.ts";
import { navItems } from "../app/data/site-content.ts";

const source = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");

test("home composes the affiliate landing sections in the approved order", async () => {
  const page = await source("app/page.tsx");
  const sections = [
    "AnnouncementBar",
    "Header",
    "HeroSection",
    "AudienceSection",
    "TrustSection",
    "ResourcesSection",
    "VideosSection",
    "DealsSection",
    "NewsletterSection",
    "Footer",
  ];

  const positions = sections.map((section) => page.indexOf(`<${section}`));
  assert.equal(positions.every((position) => position >= 0), true);
  assert.equal(positions.every((position, index) => index === 0 || position > positions[index - 1]), true);
});

test("header and mobile navigation offer only the approved anchor navigation", async () => {
  const [header, mobileMenu] = await Promise.all([
    source("app/components/layout/header.tsx"),
    source("app/components/layout/mobile-menu.tsx"),
  ]);

  assert.match(header, /navItems\.map/);
  assert.match(
    header,
    /className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm/,
  );
  assert.doesNotMatch(header, /Log In|Start Free Audit|ButtonLink|ChevronDown/);
  assert.match(mobileMenu, /navItems\.map/);
  assert.doesNotMatch(mobileMenu, /Start Free Audit|ButtonLink/);
});

test("hero content preserves the approved assessment-first promise", () => {
  assert.deepEqual(heroContent, {
    eyebrow: "Business health assessment",
    heading: "Business clarity, without the guesswork",
    body: "Complete a private five-minute business health assessment and get a clear score, practical priorities, and tools worth considering.",
    trustPoints: [
      "Five minutes",
      "No account required",
      "Private assessment",
      "Actionable results",
    ],
  });
  assert.equal(heroComposition.content, heroContent);
  assert.equal(heroComposition.embeddedTool, "business-health-assessment");
});

test("footer includes internal legal links and the affiliate disclosure copy", async () => {
  const footer = await source("app/components/layout/footer.tsx");

  assert.match(footer, /href="#affiliate-disclosure"/);
  assert.match(footer, /id="affiliate-disclosure"/);
  assert.match(
    footer,
    /Scalryx may earn a commission from qualifying purchases made through some links, at no extra cost to you\./,
  );
});

test("every primary navigation anchor has a destination in the composed page", async () => {
  const pageSources = await Promise.all([
    source("app/components/landing/hero-section.tsx"),
    source("app/components/landing/audience-section.tsx"),
    source("app/components/landing/resources-section.tsx"),
    source("app/components/layout/footer.tsx"),
  ]);
  const markup = pageSources.join("\n");

  for (const item of navItems) {
    assert.match(markup, new RegExp(`id="${item.href.slice(1)}"`));
  }
});

test("task 7 header and footer controls meet the 44px touch-target standard", async () => {
  const [announcement, header, footer] = await Promise.all([
    source("app/components/layout/announcement-bar.tsx"),
    source("app/components/layout/header.tsx"),
    source("app/components/layout/footer.tsx"),
  ]);

  assert.match(
    announcement,
    /<NewsletterTrigger className="inline-flex min-h-11 items-center[^"`]*text-sm/,
  );
  assert.match(header, /aria-label="Scalryx home"[^>]*className="inline-flex min-h-11 items-center/);
  assert.equal((footer.match(/inline-flex min-h-11 items-center[^\"]*text-sm/g) ?? []).length, 3);
});

test("editorial visual system exposes reusable light surfaces and restrained motion", async () => {
  const css = await source("app/globals.css");

  assert.match(css, /color-scheme:\s*light/);
  assert.match(css, /--brand-navy:/);
  assert.match(css, /--canvas-soft:/);
  assert.match(css, /\.editorial-panel\s*\{/);
  assert.match(css, /\.editorial-card\s*\{/);
  assert.match(css, /\.primary-button\s*\{/);
  assert.match(css, /\.section-label\s*\{/);
  assert.match(css, /width:\s*min\(calc\(100% - 2rem\), 82rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /--electric-|ambient-orb|scan-line|text-gradient|blue-glow/);
});

test("hero keeps the live assessment inside a clean editorial composition", async () => {
  const [hero, businessStep, questionStep, resultStep, header] = await Promise.all([
    source("app/components/landing/hero-section.tsx"),
    source("app/components/assessment/business-type-step.tsx"),
    source("app/components/assessment/question-step.tsx"),
    source("app/components/assessment/result-step.tsx"),
    source("app/components/layout/header.tsx"),
  ]);

  assert.match(hero, /Business clarity, without the guesswork/);
  assert.match(hero, /data-editorial-hero/);
  assert.match(hero, /data-live-assessment/);
  assert.doesNotMatch(hero, /data-capability-strip|ambient-orb|text-gradient/);
  assert.match(businessStep, /data-business-model-selector/);
  assert.match(businessStep, /editorial-panel/);
  assert.match(questionStep, /editorial-panel/);
  assert.match(resultStep, /editorial-panel/);
  assert.match(header, /editorial-header/);
});

test("every marketing section uses the editorial visual language", async () => {
  const sections = await Promise.all([
    source("app/components/landing/audience-section.tsx"),
    source("app/components/landing/trust-section.tsx"),
    source("app/components/landing/resources-section.tsx"),
    source("app/components/landing/videos-section.tsx"),
    source("app/components/landing/deals-section.tsx"),
    source("app/components/landing/newsletter-section.tsx"),
  ]);

  for (const section of sections) {
    assert.match(section, /data-editorial-section/);
    assert.match(section, /editorial-(?:panel|card)|primary-button|section-label/);
  }
});

test("footer completes the editorial experience without dead social controls", async () => {
  const footer = await source("app/components/layout/footer.tsx");

  assert.match(footer, /data-editorial-footer/);
  assert.match(footer, /section-label/);
  assert.doesNotMatch(footer, /const socials|Share2|href="#footer"/);
});

test("editorial announcement can wrap safely on narrow screens", async () => {
  const announcement = await source("app/components/layout/announcement-bar.tsx");

  assert.match(announcement, /flex min-h-11 flex-wrap items-center/);
  assert.match(announcement, /text-balance/);
});

test("assessment results omit the requested detailed analysis blocks", async () => {
  const resultStep = await source("app/components/assessment/result-step.tsx");

  assert.doesNotMatch(resultStep, /Category breakdown/);
  assert.doesNotMatch(resultStep, /getStrengthsPresentation/);
  assert.doesNotMatch(resultStep, /Priority risks/);
  assert.doesNotMatch(resultStep, /Practical next steps/);
  assert.doesNotMatch(resultStep, /result\.(?:categories|strengths|risks|nextSteps)/);

  assert.match(resultStep, /Business health score:/);
  assert.match(resultStep, /Tools worth considering/);
  assert.match(resultStep, /Join the newsletter/);
  assert.match(resultStep, /Restart assessment/);
});

test("site ships one permanent light theme without a theme runtime", async () => {
  const [css, header, layout] = await Promise.all([
    source("app/globals.css"),
    source("app/components/layout/header.tsx"),
    source("app/layout.tsx"),
  ]);
  const rootTokens = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

  assert.match(rootTokens, /color-scheme:\s*light/);
  assert.match(rootTokens, /--canvas:\s*#ffffff/);
  assert.doesNotMatch(css, /\[data-theme=/);
  assert.doesNotMatch(css, /prefers-color-scheme/);
  assert.doesNotMatch(header, /ThemeToggle|theme-toggle/);
  assert.doesNotMatch(layout, /theme-state|themeInitializer|dangerouslySetInnerHTML/);
});
