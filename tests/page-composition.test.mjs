import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { heroComposition, heroContent as heroContentData } from "../app/data/hero-content.ts";
import { navItems } from "../app/data/site-content.ts";

const source = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");
const binary = (file) => readFile(new URL(`../${file}`, import.meta.url));

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

test("brand logo uses the exact supplied PNG with a stable Next Image contract", async () => {
  const [logo, logoBytes] = await Promise.all([
    source("app/components/brand/logo.tsx"),
    binary("public/logo.png"),
  ]);

  assert.equal(
    createHash("sha256").update(logoBytes).digest("hex"),
    "a3968653c620c09d89a6d9af45db7cd8d9a16ab392a37d08a9efce310d3543ef",
  );
  assert.equal(logoBytes.readUInt32BE(16), 436);
  assert.equal(logoBytes.readUInt32BE(20), 164);
  assert.match(logo, /import logoImage from "\.\.\/\.\.\/\.\.\/public\/logo\.png"/);
  assert.match(logo, /src=\{logoImage\}/);
  assert.match(logo, /alt="Scalryx"/);
  assert.match(logo, /preload\?: boolean/);
  assert.match(logo, /preload=\{preload\}/);
  assert.match(logo, /sizes="\(max-width: 639px\) 112px, 140px"/);
  assert.doesNotMatch(
    logo,
    /compact|src="logo\.png"|--brand-primary|--brand-accent|\/\//,
  );
});

test("header and mobile navigation offer only the approved anchor navigation", async () => {
  const [header, mobileMenu] = await Promise.all([
    source("app/components/layout/header.tsx"),
    source("app/components/layout/mobile-menu.tsx"),
  ]);

  assert.match(header, /navItems\.map/);
  assert.match(
    header,
    /grid h-\[72px\] grid-cols-\[auto_minmax\(0,1fr\)_auto\] items-center/,
  );
  assert.match(
    header,
    /className="inline-flex min-h-11 shrink-0 items-center"/,
  );
  assert.match(header, /<Logo className="w-28 sm:w-32" preload \/>/);
  assert.match(
    header,
    /className="hidden items-center justify-self-center gap-1 lg:flex"/,
  );
  assert.match(
    header,
    /className="flex shrink-0 items-center gap-2 sm:gap-3"/,
  );
  assert.match(
    header,
    /className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm/,
  );
  assert.doesNotMatch(header, /Log In|Start Free Audit|ButtonLink|ChevronDown/);
  assert.match(mobileMenu, /navItems\.map/);
  assert.doesNotMatch(mobileMenu, /Start Free Audit|ButtonLink/);
});

test("hero content preserves the approved assessment-first promise", async () => {
  const heroContent = await source("app/data/hero-content.ts");

  assert.match(heroContent, /three focused questions/i);
  assert.match(heroContent, /About one minute/);
  assert.deepEqual(heroContentData, {
    eyebrow: "Business health assessment",
    heading: "Business clarity, without the guesswork",
    body: "Answer three focused questions about your business and get a clear health score, operating status, and practical tools worth considering.",
    trustPoints: [
      "About one minute",
      "No account required",
      "Private assessment",
      "Actionable results",
    ],
  });
  assert.equal(heroComposition.content, heroContentData);
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
  assert.match(footer, /<Logo className="w-\[140px\]" \/>/);
  assert.doesNotMatch(footer, /<Logo[^>]*preload/);
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
  assert.match(
    header,
    /aria-label="Scalryx home"[^>]*className="inline-flex min-h-11 shrink-0 items-center/,
  );
  assert.equal((footer.match(/inline-flex min-h-11 items-center[^\"]*text-sm/g) ?? []).length, 3);
});

test("editorial visual system exposes reusable light surfaces and restrained motion", async () => {
  const css = await source("app/globals.css");

  assert.match(css, /color-scheme:\s*light/);
  assert.match(css, /--brand-primary:\s*#123B82/i);
  assert.match(css, /--brand-secondary:\s*#1E56A0/i);
  assert.match(css, /--brand-accent:\s*#2F75C7/i);
  assert.match(css, /--ink:\s*#0B1628/i);
  assert.match(css, /--canvas:\s*#FFFFFF/i);
  assert.match(css, /--canvas-soft:\s*#F5F8FC/i);
  assert.match(css, /--canvas-soft:/);
  assert.match(css, /\.editorial-panel\s*\{/);
  assert.match(css, /\.editorial-card\s*\{/);
  assert.match(css, /\.primary-button\s*\{/);
  assert.match(css, /\.section-label\s*\{/);
  assert.match(css, /width:\s*min\(calc\(100% - 2rem\), 82rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.brand-top-accent\s*\{/);
  assert.match(css, /\.metric-accent\s*\{/);
  assert.match(css, /\.primary-button[\s\S]*background:\s*var\(--brand-secondary\)/);
  assert.match(css, /\.assessment-progress-fill[\s\S]*background:\s*var\(--brand-accent\)/);
  assert.doesNotMatch(css, /--electric-|ambient-orb|scan-line|text-gradient|blue-glow|gradient|glow|glass/);
});

test("hero keeps the live assessment inside a clean editorial composition", async () => {
  const [hero, businessStep, questionStep, resultStep, header, logo] = await Promise.all([
    source("app/components/landing/hero-section.tsx"),
    source("app/components/assessment/business-type-step.tsx"),
    source("app/components/assessment/question-step.tsx"),
    source("app/components/assessment/result-step.tsx"),
    source("app/components/layout/header.tsx"),
    source("app/components/brand/logo.tsx"),
  ]);

  assert.match(hero, /Business clarity,/);
  assert.match(hero, /without the guesswork/);
  assert.match(hero, /data-editorial-hero/);
  assert.match(hero, /data-live-assessment/);
  assert.match(hero, /data-brand-emphasis/);
  assert.match(hero, /--brand-primary/);
  assert.match(hero, /--brand-accent/);
  assert.doesNotMatch(hero, /data-capability-strip|ambient-orb|text-gradient/);
  assert.match(businessStep, /data-business-model-selector/);
  assert.match(businessStep, /brand-top-accent/);
  assert.match(businessStep, /data-selected-indicator/);
  assert.match(businessStep, /--brand-accent-soft/);
  assert.match(businessStep, /editorial-panel/);
  assert.match(questionStep, /editorial-panel/);
  assert.match(questionStep, /--brand-accent/);
  assert.match(resultStep, /editorial-panel/);
  assert.match(resultStep, /metric-accent/);
  assert.match(header, /editorial-header/);
  assert.match(logo, /src=\{logoImage\}/);
  assert.doesNotMatch(logo, /--brand-primary|--brand-accent/);
});

test("blue roles are distributed across product and content surfaces", async () => {
  const sources = await Promise.all([
    source("app/components/landing/audience-section.tsx"),
    source("app/components/landing/trust-section.tsx"),
    source("app/components/landing/resources-section.tsx"),
    source("app/components/landing/videos-section.tsx"),
    source("app/components/landing/deals-section.tsx"),
    source("app/components/landing/newsletter-section.tsx"),
    source("app/components/layout/footer.tsx"),
  ]);
  const markup = sources.join("\n");

  assert.match(markup, /--brand-primary/);
  assert.match(markup, /--brand-secondary/);
  assert.match(markup, /--brand-accent/);
  assert.match(markup, /--brand-accent-soft/);
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
  const [businessStep, resultStep] = await Promise.all([
    source("app/components/assessment/business-type-step.tsx"),
    source("app/components/assessment/result-step.tsx"),
  ]);

  assert.doesNotMatch(resultStep, /Category breakdown/);
  assert.doesNotMatch(resultStep, /getStrengthsPresentation/);
  assert.doesNotMatch(resultStep, /Priority risks/);
  assert.doesNotMatch(resultStep, /Practical next steps/);
  assert.doesNotMatch(resultStep, /result\.(?:categories|strengths|risks|nextSteps)/);

  assert.match(resultStep, /Business health score:/);
  assert.match(resultStep, /Tools worth considering/);
  assert.match(resultStep, /Join the newsletter/);
  assert.match(resultStep, /Restart assessment/);
  assert.match(businessStep, /Three focused questions adapt to how your business operates\./);
  assert.match(
    businessStep,
    /description: "Net profit, revenue trend, and cash coverage for inventory and operations\."/,
  );
  assert.match(
    businessStep,
    /description: "Net profit, healthy team utilization, and operating runway\."/,
  );
  assert.match(
    businessStep,
    /description: "Operating profit, recurring revenue trend, and cash runway\."/,
  );
  assert.match(
    businessStep,
    /description: "Net profit, booked service capacity, and invoice collection\."/,
  );
  assert.match(resultStep, /case "Loss"/);
  assert.match(resultStep, /case "Average"/);
  assert.match(resultStep, /case "Profit"/);
  assert.match(resultStep, /The business is currently operating at a loss\. Protect cash and address the weakest driver first\./);
  assert.match(resultStep, /The business is around break-even or producing a thin margin, with clear room to strengthen its fundamentals\./);
  assert.match(resultStep, /The business is operating profitably\. Use the health score to identify where that position can become more resilient\./);
  assert.match(resultStep, /\{result\.label\}/);
  assert.doesNotMatch(resultStep, /Critical|Needs attention|Healthy|Strong/);
  assert.doesNotMatch(resultStep, /Revenue context|contextAnswer/);
});

test("site ships one permanent light theme without a theme runtime", async () => {
  const [css, header, layout] = await Promise.all([
    source("app/globals.css"),
    source("app/components/layout/header.tsx"),
    source("app/layout.tsx"),
  ]);
  const rootTokens = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

  assert.match(rootTokens, /color-scheme:\s*light/);
  assert.match(rootTokens, /--canvas:\s*#ffffff/i);
  assert.doesNotMatch(css, /\[data-theme=/);
  assert.doesNotMatch(css, /prefers-color-scheme/);
  assert.doesNotMatch(header, /ThemeToggle|theme-toggle/);
  assert.doesNotMatch(layout, /theme-state|themeInitializer|dangerouslySetInnerHTML/);
});

test("assessment navigation and progress derive their question count from the selected bank", async () => {
  const [businessAssessment, questionStep] = await Promise.all([
    source("app/components/assessment/business-assessment.tsx"),
    source("app/components/assessment/question-step.tsx"),
  ]);

  assert.match(businessAssessment, /questions\.length/);
  assert.match(questionStep, /questionCount/);
  assert.match(questionStep, /questionNumber \/ questionCount/);
  assert.doesNotMatch(businessAssessment, /questionIndex === 9/);
  assert.doesNotMatch(questionStep, /of 10|aria-valuemax=\{10\}|questionNumber \* 10/);
});
