import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
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
  assert.match(header, /ThemeToggle/);
  assert.doesNotMatch(header, /Log In|Start Free Audit|ButtonLink|ChevronDown/);
  assert.match(mobileMenu, /navItems\.map/);
  assert.doesNotMatch(mobileMenu, /Start Free Audit|ButtonLink/);
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
