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
  assert.equal((header.match(/<ThemeToggle\s*\/>/g) ?? []).length, 1);
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
    eyebrow: "Business clarity, without the guesswork",
    heading: "Find the weak points slowing down your business.",
    body: "Take a private, five-minute health assessment built for your business model. Get a clear score, practical next steps, and tools worth considering.",
    trustPoints: [
      "Private by default",
      "No account required",
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

test("premium visual system exposes reusable electric-blue surfaces and motion", async () => {
  const css = await source("app/globals.css");

  assert.match(css, /--electric-blue:/);
  assert.match(css, /--electric-cyan:/);
  assert.match(css, /--panel-highlight:/);
  assert.match(css, /\[data-theme="dark"\][\s\S]*--electric-blue:/);
  assert.match(css, /\.premium-panel\s*\{/);
  assert.match(css, /\.premium-card\s*\{/);
  assert.match(css, /\.premium-button\s*\{/);
  assert.match(css, /\.premium-eyebrow\s*\{/);
  assert.match(css, /\.ambient-orb\s*\{/);
  assert.match(css, /width:\s*min\(calc\(100% - 2rem\), 90rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("hero and assessment use the premium console composition", async () => {
  const [hero, businessStep, questionStep, resultStep, header] = await Promise.all([
    source("app/components/landing/hero-section.tsx"),
    source("app/components/assessment/business-type-step.tsx"),
    source("app/components/assessment/question-step.tsx"),
    source("app/components/assessment/result-step.tsx"),
    source("app/components/layout/header.tsx"),
  ]);

  assert.match(hero, /data-premium-hero/);
  assert.match(hero, /data-capability-strip/);
  assert.match(hero, /data-assessment-console/);
  assert.match(businessStep, /premium-panel/);
  assert.match(questionStep, /premium-panel/);
  assert.match(resultStep, /premium-panel/);
  assert.match(header, /premium-header/);
});
