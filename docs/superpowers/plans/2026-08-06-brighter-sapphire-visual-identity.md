# Scalryx Brighter Sapphire Visual Identity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enrich the current white editorial Scalryx interface with a layered Sapphire–Royal–Azure identity that improves hierarchy, energy, and product feedback without changing functionality.

**Architecture:** Keep the existing Next.js components and behavior intact. Update the visual contract first, then replace the single-navy CSS token system with explicit color roles and apply those roles selectively to the logo, hero, assessment, marketing sections, newsletter, and footer.

**Tech Stack:** Next.js 16.2 App Router, React 19.2, TypeScript, Tailwind CSS 4, Lucide React, Node test runner, ESLint.

## Global Constraints

- Deep Sapphire must be exactly `#123B82`.
- Royal Blue must be exactly `#1E56A0`.
- Bright Azure must be exactly `#2F75C7`.
- Primary text must be exactly `#0B1628`.
- Primary background must be exactly `#FFFFFF`.
- Soft background sections must be exactly `#F5F8FC`.
- Do not use gradients, glow effects, glassmorphism, neon, colorful card fills, decorative grid overlays, or continuous animation.
- Preserve all assessment, scoring, reducer, newsletter, navigation, modal, content, and destination behavior.
- Keep white cards, accessible contrast, visible focus, reduced-motion support, and 44px touch targets.
- Add no dependencies or image assets.

---

### Task 1: Define the layered-blue visual contract

**Files:**

- Modify: `tests/page-composition.test.mjs`
- Modify: `tests/newsletter.test.mjs`

**Interfaces:**

- Consumes: current source-reading helpers and server-rendered newsletter markup.
- Produces: failing contract assertions for exact palette tokens, distinct CTA/accent roles, richer surface classes, layered logo treatment, and continued absence of forbidden decoration.

- [ ] **Step 1: Replace the single-navy token assertions with exact palette assertions**

Add this contract to `tests/page-composition.test.mjs`:

```js
test("brand system separates sapphire, royal, and azure roles", async () => {
  const css = await source("app/globals.css");

  assert.match(css, /--brand-primary:\s*#123B82/i);
  assert.match(css, /--brand-secondary:\s*#1E56A0/i);
  assert.match(css, /--brand-accent:\s*#2F75C7/i);
  assert.match(css, /--ink:\s*#0B1628/i);
  assert.match(css, /--canvas:\s*#FFFFFF/i);
  assert.match(css, /--canvas-soft:\s*#F5F8FC/i);
  assert.match(css, /\.primary-button[\s\S]*background:\s*var\(--brand-secondary\)/);
  assert.match(css, /\.assessment-progress-fill[\s\S]*background:\s*var\(--brand-accent\)/);
  assert.doesNotMatch(css, /gradient|glow|glass/);
});
```

Add component assertions that require `data-brand-emphasis`, `data-selected-indicator`, `brand-top-accent`, `metric-accent`, and separate `--brand-primary`, `--brand-secondary`, and `--brand-accent` usages in the logo, hero, assessment selector, question step, result step, links, and newsletter modal.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `node --test tests/page-composition.test.mjs tests/newsletter.test.mjs`

Expected: FAIL because the current CSS exposes `--brand-navy` only and components do not contain the new emphasis hooks.

- [ ] **Step 3: Commit the failing visual contract**

```powershell
git add tests/page-composition.test.mjs tests/newsletter.test.mjs
git commit -m "test: define layered blue brand contract"
```

### Task 2: Implement the shared brand tokens and high-emphasis primitives

**Files:**

- Modify: `app/globals.css`
- Modify: `app/components/brand/logo.tsx`
- Modify: `app/components/layout/announcement-bar.tsx`
- Modify: `app/components/layout/header.tsx`
- Modify: `app/components/layout/mobile-menu.tsx`
- Modify: `app/components/landing/hero-section.tsx`

**Interfaces:**

- Consumes: existing CSS utility class names and unchanged component props.
- Produces: `--brand-primary`, `--brand-secondary`, `--brand-accent`, `--brand-primary-soft`, `--brand-accent-soft`, `brand-top-accent`, and `metric-accent`; existing `editorial-panel`, `editorial-card`, `primary-button`, `secondary-button`, `section-label`, and `icon-tile` remain public style primitives.

- [ ] **Step 1: Replace the root color hierarchy**

Use these exact core tokens:

```css
:root {
  color-scheme: light;
  --canvas: #FFFFFF;
  --canvas-soft: #F5F8FC;
  --surface: #FFFFFF;
  --ink: #0B1628;
  --brand-primary: #123B82;
  --brand-secondary: #1E56A0;
  --brand-accent: #2F75C7;
  --brand-primary-soft: #EDF3FB;
  --brand-accent-soft: #EAF3FC;
  --line: #DDE5EF;
  --line-strong: #C4D2E3;
  --focus-ring: rgba(47, 117, 199, 0.28);
}
```

Update shared primitives so primary buttons use Royal Blue, links and active feedback use Bright Azure, major brand emphasis uses Deep Sapphire, panels/cards have blue-gray borders and restrained blue-tinted shadows, and soft sections use `#F5F8FC`.

- [ ] **Step 2: Add reusable structural emphasis**

Implement:

```css
.brand-top-accent {
  border-top: 3px solid var(--brand-primary);
}

.metric-accent {
  color: var(--brand-accent);
  font-variant-numeric: tabular-nums;
}
```

Keep all motion short and preserve the reduced-motion media query.

- [ ] **Step 3: Layer the logo and navigation colors**

Use Deep Sapphire on one logo stroke and Bright Azure on the second. Use Royal Blue for header/newsletter CTAs, Bright Azure for hover links, and pale blue surfaces for announcement and mobile navigation feedback.

- [ ] **Step 4: Strengthen hero hierarchy**

Wrap “without the guesswork” in a solid Deep Sapphire span marked `data-brand-emphasis`. Keep the remaining headline in `#0B1628`, make the CTA Royal Blue, use Azure trust icons, and add a small Azure status cue beside the live-assessment label.

- [ ] **Step 5: Run the shared-style contract**

Run: `node --test tests/page-composition.test.mjs`

Expected: shared palette, logo, hero, CTA, and forbidden-decoration assertions pass; assessment/section assertions may remain red until Task 3.

- [ ] **Step 6: Commit shared identity changes**

```powershell
git add app/globals.css app/components/brand app/components/layout app/components/landing/hero-section.tsx
git commit -m "feat: establish layered blue brand system"
```

### Task 3: Enrich assessment and marketing interaction states

**Files:**

- Modify: `app/components/assessment/business-type-step.tsx`
- Modify: `app/components/assessment/question-step.tsx`
- Modify: `app/components/assessment/result-step.tsx`
- Modify: `app/components/assessment/business-assessment.tsx`
- Modify: `app/components/landing/audience-section.tsx`
- Modify: `app/components/landing/trust-section.tsx`
- Modify: `app/components/landing/resources-section.tsx`
- Modify: `app/components/landing/videos-section.tsx`
- Modify: `app/components/landing/deals-section.tsx`
- Modify: `app/components/landing/newsletter-section.tsx`
- Modify: `app/components/newsletter/newsletter-modal.tsx`
- Modify: `app/components/layout/footer.tsx`

**Interfaces:**

- Consumes: shared brand tokens and style primitives from Task 2.
- Produces: unchanged React component signatures and behavior, with `data-selected-indicator` on model selection, Bright Azure progress and active states, Sapphire/Azure metrics, and differentiated card accents.

- [ ] **Step 1: Enrich the business-model selector**

Add `brand-top-accent` to the assessment panel. Give hover/focus cards Azure borders, selected cards an Azure-soft fill and Bright Azure border, icons Bright Azure, titles Deep Sapphire, and a visible selected indicator marked `data-selected-indicator` without changing radio behavior.

- [ ] **Step 2: Enrich question states**

Use Deep Sapphire for the assessment title, Azure-soft for category badges, Bright Azure for the progress fill and radio accent, and an Azure border/fill combination for selected answers. Keep all ARIA attributes, error IDs, and callbacks unchanged.

- [ ] **Step 3: Enrich results and confirmation surfaces**

Use Deep Sapphire for the score number, Bright Azure for metric emphasis and recommendation arrows, Royal Blue for the newsletter CTA, and pale Sapphire/Azure callouts. Preserve simplified results, links, disclaimer, restart, and confirmation behavior.

- [ ] **Step 4: Differentiate marketing sections**

Apply Bright Azure icons and links, Deep Sapphire labels, blue-gray borders, Azure hover states, and selected structural accents. Keep cards white. Use the three brand blues deliberately across audience, methodology, resources, videos, deals, newsletter, and footer rather than filling every surface.

- [ ] **Step 5: Update newsletter modal emphasis**

Use Bright Azure icons and focus treatment, Royal Blue submit CTA, stronger white-panel separation, and Azure-soft success feedback. Preserve validation, status messaging, focus trap, Escape behavior, and submission state.

- [ ] **Step 6: Run assessment, newsletter, content, and composition tests**

Run: `npm test`

Expected: all tests pass, including assessment state/scoring/data, newsletter behavior, content counts/destinations, and the complete layered-blue visual contract.

- [ ] **Step 7: Commit component enrichment**

```powershell
git add app/components tests
git commit -m "feat: enrich sapphire assessment and content UI"
```

### Task 4: Verify production readiness

**Files:**

- Modify only files implicated by verification failures.

**Interfaces:**

- Consumes: complete layered-blue implementation.
- Produces: a test-clean, lint-clean, buildable, responsive visual-identity revision.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: 61 tests pass with zero failures, unless the visual contract increases the total count.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: ESLint exits with zero errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: compilation, TypeScript checking, page-data collection, and static generation succeed.

- [ ] **Step 4: Scan exact palette and forbidden residue**

Run:

```powershell
rg -n '#123B82|#1E56A0|#2F75C7|#0B1628|#FFFFFF|#F5F8FC' app/globals.css
rg -n 'gradient|glow|glass|electric-|ambient-orb|scan-line' app
```

Expected: all six supplied values exist in `app/globals.css`; the forbidden scan returns no application matches.

- [ ] **Step 5: Attempt desktop and mobile visual inspection**

Inspect approximately 1440px and 390px widths when the browser runtime is available. Confirm CTA prominence, card separation, assessment engagement, long-session readability, no horizontal overflow, and intentional use of all three blues. If the runtime is blocked, report the environmental limitation without representing visual QA as completed.

- [ ] **Step 6: Commit verification fixes if any were required**

```powershell
git add app tests
git commit -m "fix: polish layered blue visual hierarchy"
```
