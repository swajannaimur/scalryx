import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { heroContent } from "../app/data/hero-content.ts";

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

test("hero content contract preserves the assessment-first promise", () => {
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
