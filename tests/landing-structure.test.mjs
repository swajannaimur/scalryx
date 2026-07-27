import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("landing page exposes the required sections", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  for (const section of [
    "HeroSection",
    "FeaturesSection",
    "HowItWorks",
    "ProductShowcase",
    "PricingSection",
  ]) {
    assert.match(page, new RegExp(section));
  }
});

test("metadata names Scalryx", async () => {
  const layout = await readFile(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );

  assert.match(layout, /title:\s*["']Scalryx/);
  assert.match(layout, /description:/);
});

test("header provides primary navigation and audit action", async () => {
  const header = await readFile(
    new URL("../app/components/layout/header.tsx", import.meta.url),
    "utf8",
  );

  assert.match(header, /Features/);
  assert.match(header, /Solutions/);
  assert.match(header, /Pricing/);
  assert.match(header, /Start Free Audit/);
});

test("hero contains the approved headline and dashboard metrics", async () => {
  const hero = await readFile(
    new URL("../app/components/landing/hero-section.tsx", import.meta.url),
    "utf8",
  );
  const dashboard = await readFile(
    new URL("../app/components/mockups/dashboard.tsx", import.meta.url),
    "utf8",
  );

  assert.match(hero, /Scale Your Business/);
  assert.match(hero, /Wrong Software/);
  assert.match(dashboard, /Overall Score/);
  assert.match(dashboard, /\$180/);
  assert.match(dashboard, /Top Recommendations/);
});

test("feature and process sections preserve reference content", async () => {
  const features = await readFile(
    new URL("../app/components/landing/features-section.tsx", import.meta.url),
    "utf8",
  );
  const process = await readFile(
    new URL("../app/components/landing/how-it-works.tsx", import.meta.url),
    "utf8",
  );

  assert.match(features, /Most businesses pay/);
  assert.match(features, /Powerful Insights/);
  assert.match(process, /How It Works/);
  assert.match(process, /Try a Free Audit/);
});

test("pricing and footer expose approved conversion content", async () => {
  const pricing = await readFile(
    new URL("../app/components/landing/pricing-section.tsx", import.meta.url),
    "utf8",
  );
  const landingData = await readFile(
    new URL("../app/data/landing.ts", import.meta.url),
    "utf8",
  );
  const footer = await readFile(
    new URL("../app/components/layout/footer.tsx", import.meta.url),
    "utf8",
  );
  const pricingContent = `${pricing}\n${landingData}`;

  assert.match(pricingContent, /Simple Pricing/);
  assert.match(pricingContent, /\$29/);
  assert.match(pricingContent, /\$79/);
  assert.match(pricingContent, /Stay Ahead\. Stay Scaled\./);
  assert.match(footer, /2026 Scalryx/);
});
