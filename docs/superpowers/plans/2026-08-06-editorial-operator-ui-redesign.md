# Scalryx Editorial Operator UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Scalryx’s dark neon presentation with an accessible, responsive, white-first editorial business-diagnostic interface while preserving all assessment and newsletter behavior.

**Architecture:** Keep the existing App Router page, landing-section components, assessment reducer/modal, newsletter provider/modal, and content modules. Change the presentation contract test-first, centralize the light editorial tokens and reusable surfaces in `app/globals.css`, and update existing components in place so domain logic and public interfaces remain stable.

**Tech Stack:** Next.js 16.2 App Router, React 19.2, TypeScript, Tailwind CSS 4, Lucide React, Node test runner, ESLint.

## Global Constraints

- White is the primary canvas; warm off-white is used only for section separation.
- The Scalryx logo navy is the only primary brand accent.
- Do not use gradients, neon, glow effects, glassmorphism, decorative grid overlays, colorful card systems, or continuous decorative animation.
- Preserve the existing assessment questions, scoring, reducer behavior, modal focus lifecycle, newsletter state, content counts, and destinations.
- Do not invent reviews, ratings, customer proof, discounts, links, or media.
- Preserve visible focus treatment, reduced-motion support, semantic headings, and 44px minimum touch targets.
- Read relevant guidance in `node_modules/next/dist/docs/` before using Next.js APIs; the CSS and font guidance has been reviewed for this plan.

---

### Task 1: Replace the outgoing visual contract with the approved editorial contract

**Files:**

- Modify: `tests/page-composition.test.mjs`
- Modify: `tests/newsletter.test.mjs`

**Interfaces:**

- Consumes: existing component source files through the `source(file)` helper and server-rendered newsletter markup.
- Produces: source-level contract assertions for `editorial-panel`, `editorial-card`, `primary-button`, `section-label`, `data-editorial-*`, the light root theme, the live assessment composition, and the absence of decorative gradient/glow primitives.

- [ ] **Step 1: Replace dark-theme assertions with failing light editorial assertions**

Replace the outgoing electric-theme tests in `tests/page-composition.test.mjs` with assertions shaped like:

```js
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
  const [hero, businessStep, questionStep, resultStep] = await Promise.all([
    source("app/components/landing/hero-section.tsx"),
    source("app/components/assessment/business-type-step.tsx"),
    source("app/components/assessment/question-step.tsx"),
    source("app/components/assessment/result-step.tsx"),
  ]);

  assert.match(hero, /Business clarity, without the guesswork/);
  assert.match(hero, /data-editorial-hero/);
  assert.match(hero, /data-live-assessment/);
  assert.doesNotMatch(hero, /data-capability-strip|ambient-orb|text-gradient/);
  assert.match(businessStep, /data-business-model-selector/);
  assert.match(businessStep, /editorial-panel/);
  assert.match(questionStep, /editorial-panel/);
  assert.match(resultStep, /editorial-panel/);
});
```

Update the section and footer tests to require `data-editorial-section`, `data-editorial-footer`, `editorial-card` or `editorial-panel`, and the absence of “Proof placeholder” and dead social controls. Keep all behavior, anchor, content, result-simplification, and touch-target tests.

Change the newsletter presentation test to require `editorial-panel`, `primary-button`, and `icon-tile`.

- [ ] **Step 2: Run the tests and verify the visual contract fails for the intended reason**

Run: `npm test`

Expected: the new presentation tests fail because the source still contains dark tokens, `premium-*` classes, and electric effects; assessment state, scoring, data, and newsletter behavior tests remain green.

- [ ] **Step 3: Commit the red visual contract**

```powershell
git add tests/page-composition.test.mjs tests/newsletter.test.mjs
git commit -m "test: define editorial UI contract"
```

### Task 2: Build the light editorial foundation and page chrome

**Files:**

- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `app/components/layout/announcement-bar.tsx`
- Modify: `app/components/layout/header.tsx`
- Modify: `app/components/layout/mobile-menu.tsx`
- Modify: `app/components/layout/footer.tsx`
- Modify: `app/components/brand/logo.tsx` only if its fill handling prevents correct display on white.

**Interfaces:**

- Consumes: existing Tailwind import, `navItems`, `footerGroups`, `NewsletterTrigger`, and `Logo`.
- Produces: CSS tokens `--brand-navy`, `--brand-navy-hover`, `--canvas`, `--canvas-soft`, `--ink`, `--muted`, `--line`, `--line-strong`, `--surface`; reusable classes `editorial-panel`, `editorial-card`, `primary-button`, `secondary-button`, `section-label`, and `icon-tile`.

- [ ] **Step 1: Add the self-hosted font to the root layout**

Use the documented Next.js font API:

```tsx
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

<html className={`${manrope.variable} h-full antialiased`} lang="en">
```

Also normalize visible metadata punctuation to valid UTF-8.

- [ ] **Step 2: Replace `app/globals.css` with the minimal light token and utility system**

The root and shared primitives must include these concrete values and behaviors:

```css
:root {
  color-scheme: light;
  --canvas: #ffffff;
  --canvas-soft: #f7f8f6;
  --surface: #ffffff;
  --ink: #111827;
  --muted: #5f6b7a;
  --subtle: #7c8795;
  --line: #e4e8ec;
  --line-strong: #cbd3dc;
  --brand-navy: #12335b;
  --brand-navy-hover: #0b2748;
  --brand-soft: #eef3f8;
  --on-brand: #ffffff;
  --danger: #b42318;
  --focus-ring: rgba(18, 51, 91, 0.24);
}

.site-shell {
  width: min(calc(100% - 2rem), 82rem);
  margin-inline: auto;
}

.editorial-panel {
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: 0 18px 55px rgba(17, 24, 39, 0.08);
}

.editorial-card {
  border: 1px solid var(--line);
  background: var(--surface);
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.editorial-card:hover,
.editorial-card:focus-within {
  border-color: var(--line-strong);
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.07);
  transform: translateY(-2px);
}

.primary-button {
  border: 1px solid var(--brand-navy);
  background: var(--brand-navy);
  color: var(--on-brand);
}
```

Retain modal entry animation, score/progress helpers, focus-visible styling, responsive shell spacing, and the reduced-motion media query. Implement score/progress fills with solid navy.

- [ ] **Step 3: Restyle the announcement, header, and mobile menu**

Use solid white and soft-canvas surfaces, remove capsules/glow, keep the existing `navItems.map`, newsletter trigger, menu behavior, and 44px targets. The header remains sticky with a fine border.

- [ ] **Step 4: Simplify the footer**

Keep the logo, company description, newsletter trigger, footer groups, contact placeholder, copyright, and affiliate disclosure. Remove the `socials` array and the four dead `#footer` social controls. Add `data-editorial-footer` and use a flat warm off-white footer with clear column spacing.

- [ ] **Step 5: Run the focused contract tests**

Run: `node --test tests/page-composition.test.mjs tests/newsletter.test.mjs`

Expected: foundation and chrome assertions pass; hero, assessment, and marketing-section assertions remain red until later tasks.

- [ ] **Step 6: Commit the foundation**

```powershell
git add app/globals.css app/layout.tsx app/components/layout app/components/brand/logo.tsx
git commit -m "feat: establish light editorial design system"
```

### Task 3: Redesign the hero and live assessment workspace

**Files:**

- Modify: `app/data/hero-content.ts`
- Modify: `app/components/landing/hero-section.tsx`
- Modify: `app/components/assessment/business-type-step.tsx`
- Modify: `app/components/assessment/question-step.tsx`
- Modify: `app/components/assessment/result-step.tsx`
- Modify: `app/components/assessment/business-assessment.tsx`
- Modify: `tests/page-composition.test.mjs` only if a source assertion needs an accessibility-safe equivalent.

**Interfaces:**

- Consumes: `heroComposition`, `BusinessAssessment`, `BusinessType`, `AssessmentQuestion`, `AssessmentResult`, existing callbacks, reducer state, portal and focus lifecycle.
- Produces: unchanged component signatures; `data-editorial-hero`, `data-live-assessment`, and `data-business-model-selector` presentation hooks.

- [ ] **Step 1: Update hero content to the approved promise and four trust points**

Use:

```ts
export const heroContent = Object.freeze({
  eyebrow: "Business health assessment",
  heading: "Business clarity, without the guesswork",
  body: "Complete a private five-minute business health assessment and get a clear score, practical priorities, and tools worth considering.",
  trustPoints: Object.freeze([
    "Five minutes",
    "No account required",
    "Private assessment",
    "Actionable results",
  ]),
});
```

Update the existing content assertion first and run `node --test tests/page-composition.test.mjs` to confirm it fails before changing the data module.

- [ ] **Step 2: Replace the hero console treatment with the two-column editorial composition**

Remove capability statistics, ambient orbs, console status chrome, gradient text, and glow wrappers. Render the approved headline directly, a navy CTA to `#assessment`, four compact trust items, and the existing `<BusinessAssessment />` in the right column under `data-live-assessment`.

- [ ] **Step 3: Convert business choices to icon-led model cards**

Replace initials with Lucide icons mapped to each `BusinessType`, keep radio inputs and labels, and preserve `onSelect`. Add `data-business-model-selector`. Selected cards use `border-[var(--brand-navy)] bg-[var(--brand-soft)]`; unselected cards use `editorial-card`.

- [ ] **Step 4: Restyle question and result states without changing their props or behavior**

Use solid navy progress, pale selected answer surfaces, readable category labels, calm navigation buttons, a flat bordered score ring, and a solid soft-navy newsletter callout. Preserve every input association, `aria-describedby`, error role, progressbar attribute, external recommendation link, newsletter trigger, and restart button.

- [ ] **Step 5: Restyle the portal frame and confirmation dialog**

In `business-assessment.tsx`, replace dark backdrop and `premium-*` frame classes with a neutral translucent backdrop, white editorial dialog, clear close control, and safe mobile viewport sizing. Do not change reducer actions, portal mounting, focus trapping, Escape handling, or restoration.

- [ ] **Step 6: Run assessment and composition tests**

Run: `node --test tests/assessment-state.test.mjs tests/assessment-scoring.test.mjs tests/assessment-data.test.mjs tests/page-composition.test.mjs`

Expected: all assessment behavior remains green and hero/assessment presentation assertions pass.

- [ ] **Step 7: Commit the hero and assessment**

```powershell
git add app/data/hero-content.ts app/components/landing/hero-section.tsx app/components/assessment tests/page-composition.test.mjs
git commit -m "feat: redesign live assessment experience"
```

### Task 4: Redesign the marketing and conversion sections

**Files:**

- Modify: `app/components/landing/audience-section.tsx`
- Modify: `app/components/landing/trust-section.tsx`
- Modify: `app/components/landing/resources-section.tsx`
- Modify: `app/components/landing/videos-section.tsx`
- Modify: `app/components/landing/deals-section.tsx`
- Modify: `app/components/landing/newsletter-section.tsx`
- Modify: `app/components/newsletter/newsletter-modal.tsx`
- Modify: `app/data/site-content.ts` only to split approved descriptions into explicit challenge/outcome fields if needed; preserve item counts and destinations.

**Interfaces:**

- Consumes: `audiences`, `trustPillars`, `articles`, `videos`, `deals`, `NewsletterTrigger`, and `NewsletterModalContent` props.
- Produces: existing exported section and modal component names, plus `data-editorial-section` on each marketing section.

- [ ] **Step 1: Redesign audience cards with operational context**

Use a calm introduction plus four bordered cards. Keep the four icons and business types. Present operating challenges and the assessment outcome in compact labeled blocks, deriving only from the existing approved descriptions.

- [ ] **Step 2: Build the three-column methodology section and remove fake proof UI**

Render the three existing trust pillars in equal columns with line icons and restrained factual indicators such as “Browser session only”, “4 business models”, and “0–100 practical score”. Remove the Trustpilot conditional and visible “Proof placeholder” block; leave `trustProfileUrl` data unchanged for compatibility.

- [ ] **Step 3: Create varied editorial article cards**

Keep category, title, summary, reading time, and absent-link behavior. Give the first article a wider desktop span and use type/spacing rather than colored decoration for hierarchy.

- [ ] **Step 4: Create honest thumbnail-style video cards**

Use solid neutral/navy thumbnail frames with a small play glyph as visual categorization, but keep destination-less videos as `<article>` elements rather than links or buttons. Preserve category, title, summary, and duration.

- [ ] **Step 5: Create tool recommendation cards**

Keep the secure vendor links, two-letter logo placeholders, audience labels, descriptions, offers, and external-link treatment. Use solid borders and navy CTAs without invented savings.

- [ ] **Step 6: Redesign newsletter section and modal**

Keep “Stay ahead. Stay decisive.”, the current newsletter trigger, trust text, validation, dialog semantics, submission flow, close behavior, focus management, and success messaging. Replace all `premium-*`, glow, and gradient classes with the editorial primitives.

- [ ] **Step 7: Run marketing, newsletter, and content tests**

Run: `node --test tests/page-composition.test.mjs tests/newsletter.test.mjs tests/site-content.test.mjs`

Expected: every presentation, content-count, destination, modal-rendering, and newsletter-behavior test passes.

- [ ] **Step 8: Commit the sections**

```powershell
git add app/components/landing app/components/newsletter/newsletter-modal.tsx app/data/site-content.ts tests
git commit -m "feat: redesign editorial marketing sections"
```

### Task 5: Verify responsive quality and production readiness

**Files:**

- Modify only files implicated by failures or verified visual defects.

**Interfaces:**

- Consumes: the completed application and full automated suite.
- Produces: a lint-clean, test-clean, production-buildable, responsive single-page experience.

- [ ] **Step 1: Run the complete automated suite**

Run: `npm test`

Expected: all tests pass with no skipped or failing tests.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: ESLint exits successfully with no errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: Next.js completes compilation, type checking, and static generation successfully.

- [ ] **Step 4: Inspect for forbidden visual residue and encoding artifacts**

Run:

```powershell
rg -n "premium-|electric-|gradient|ambient-orb|scan-line|blue-glow|text-gradient|Proof placeholder|â†|â€”|â€™" app tests
```

Expected: no outgoing visual primitives, accidental gradients, visible placeholders, or mojibake remain. Legitimate assessment semantic variables must not use the forbidden presentation names.

- [ ] **Step 5: Visually verify desktop and mobile**

Start the application with `npm run dev` and inspect at approximately 1440px and 390px widths. Confirm no horizontal scrolling, the hero stacks cleanly, all cards have intentional hierarchy, the assessment selector and modal are usable, focus is visible, buttons fit, and no gradient/glow/AI-styled decoration appears.

- [ ] **Step 6: Fix each visual defect through a failing source contract when practical**

For any recurring or regression-prone defect, add a focused assertion to `tests/page-composition.test.mjs`, watch it fail, apply the minimal markup/style correction, and rerun the focused test followed by the full suite.

- [ ] **Step 7: Commit final verification fixes**

```powershell
git add app tests
git commit -m "fix: polish responsive editorial interface"
```
