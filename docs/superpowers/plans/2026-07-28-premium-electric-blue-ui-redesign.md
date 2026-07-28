# Premium Electric-Blue UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the complete Scalryx presentation layer into the premium dark
navy/electric-blue console aesthetic approved from the supplied reference.

**Architecture:** Preserve every domain, reducer, newsletter, content, and
navigation contract. Replace the visual system through semantic CSS tokens,
small reusable presentation primitives, and component class/composition changes.
Keep server components server-side and the assessment/newsletter client
boundaries unchanged.

**Tech Stack:** Next.js 16.2.12, React 19, TypeScript, Tailwind CSS 4,
Lucide React, Node test runner.

## Global Constraints

- Whole-site maximum width is exactly `90rem` / `1440px`.
- Body text is at least 16px; controls/secondary labels at least 14px;
  metadata at least 12px.
- Interactive targets are at least 44×44px.
- Both light and dark themes meet WCAG AA contrast.
- No login, pricing, or Deals navigation item.
- Assessment, scoring, newsletter, and legal behavior remains unchanged.
- Motion is disabled under `prefers-reduced-motion: reduce`.
- Preserve the user’s uncommitted navigation edit in the existing platform
  design specification.

---

### Task 1: Premium Theme Tokens and Reusable Surfaces

**Files:**

- Modify: `app/globals.css`
- Modify: `tests/page-composition.test.mjs`

**Interfaces:**

- Produces semantic tokens for page, surface, border, glow, accent, text,
  success, warning, and shadow in both themes.
- Produces `.premium-panel`, `.premium-card`, `.premium-button`,
  `.premium-eyebrow`, `.ambient-orb`, and motion utility behavior.

- [ ] Add a failing style-contract test that checks for the two theme token
  sets, `90rem`, reduced motion, and the reusable surface/motion class names.
- [ ] Run the focused test and confirm it fails.
- [ ] Replace the flat page background and restrained panel tokens with a
  navy/electric-blue dark palette and cool-white light counterpart.
- [ ] Add reusable panel, card, button, eyebrow, ambient glow, hover/focus,
  entrance, shimmer, and reduced-motion CSS.
- [ ] Run focused tests, full tests, lint, build, and `git diff --check`.
- [ ] Commit `feat: add premium electric blue design system`.

### Task 2: Header, Hero, and Assessment Console

**Files:**

- Modify: `app/components/layout/announcement-bar.tsx`
- Modify: `app/components/layout/header.tsx`
- Modify: `app/components/layout/mobile-menu.tsx`
- Modify: `app/components/theme/theme-toggle.tsx`
- Modify: `app/components/landing/hero-section.tsx`
- Modify: `app/components/assessment/business-assessment.tsx`
- Modify: `app/components/assessment/business-type-step.tsx`
- Modify: `app/components/assessment/question-step.tsx`
- Modify: `app/components/assessment/result-step.tsx`
- Modify: `tests/page-composition.test.mjs`

**Interfaces:**

- Consumes existing navigation, assessment reducer, score result, and theme
  behavior unchanged.
- Produces the premium reference-inspired first viewport and interactive
  console.

- [ ] Extend composition tests for the new hero support row, console wrapper,
  and unchanged assessment embedding/navigation.
- [ ] Confirm the new assertions fail.
- [ ] Redesign announcement/header as a translucent floating command bar with
  luminous brand treatment, compact navigation, and gradient newsletter CTA.
- [ ] Recompose hero copy into a high-impact headline with gradient emphasis,
  trust bullets, and a compact honest capability strip.
- [ ] Restyle every assessment view as a layered console with blue edge glow,
  dense but readable choice cards, animated progress, dashboard results, and
  mobile-safe controls.
- [ ] Preserve fieldsets, radios, focus targets, dialog behavior, and all
  existing accessible names.
- [ ] Run tests, lint, build, and diff checks.
- [ ] Commit `feat: redesign hero and assessment console`.

### Task 3: Premium Marketing Sections

**Files:**

- Modify: `app/components/landing/audience-section.tsx`
- Modify: `app/components/landing/trust-section.tsx`
- Modify: `app/components/landing/resources-section.tsx`
- Modify: `app/components/landing/videos-section.tsx`
- Modify: `app/components/landing/deals-section.tsx`
- Modify: `app/components/landing/newsletter-section.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/page-composition.test.mjs`
- Modify: `tests/site-content.test.mjs`

**Interfaces:**

- Consumes all existing typed content and destinations unchanged.
- Produces denser alternating console/card section compositions.

- [ ] Add failing composition assertions for section-level visual hooks and
  honest capability metrics derived only from existing product behavior.
- [ ] Confirm the focused tests fail.
- [ ] Give each section a distinct composition using premium panels, icon
  tiles, numbered cards, gradient dividers, and blue/green/orange accents
  without inventing social proof.
- [ ] Add ambient background accents and scroll-reveal hooks that do not affect
  semantic order.
- [ ] Redesign the newsletter section as the strongest closing CTA while
  retaining the shared modal trigger.
- [ ] Run tests, lint, build, and diff checks.
- [ ] Commit `feat: redesign affiliate landing sections`.

### Task 4: Footer, Newsletter Modal, and Responsive Polish

**Files:**

- Modify: `app/components/layout/footer.tsx`
- Modify: `app/components/newsletter/newsletter-modal.tsx`
- Modify: `app/components/newsletter/newsletter-trigger.tsx` only if required
- Modify: `app/globals.css`
- Modify: affected tests

**Interfaces:**

- Preserves newsletter state/session behavior and exact legal copy.
- Produces a coherent premium footer/modal and viewport-safe final theme.

- [ ] Add or update focused markup/style contracts for the premium modal and
  footer while retaining `required`, live status, and disclosure semantics.
- [ ] Confirm new assertions fail before presentation edits.
- [ ] Restyle the modal as a viewport-safe luminous console with visible close
  affordance, clear validation, and readable success state.
- [ ] Redesign footer into a structured dark console footer with high-contrast
  link groups and unchanged internal placeholders/disclosure.
- [ ] Audit all new classes at 390px, 768px, 1440px, and 1600px through static
  constraints; use Browser rendered checks only if a backend is available.
- [ ] Run full tests, lint, production build, `git diff --check`, and stale
  reference scans.
- [ ] Commit `fix: polish premium responsive experience`.

### Task 5: Final Review

**Files:**

- Review all files changed since the redesign specification commit.

- [ ] Verify every original functional requirement remains intact.
- [ ] Verify no fabricated proof, pricing, login, or Deals navigation appears.
- [ ] Verify 1440px containment, type floors, 44px targets, both-theme tokens,
  reduced motion, keyboard focus, dialogs, and mobile wrapping.
- [ ] Run fresh `npm test`, `npm run lint`, `npm run build`,
  `git diff --check`, and `git status --short`.
- [ ] Fix any Critical or Important findings and repeat verification.

