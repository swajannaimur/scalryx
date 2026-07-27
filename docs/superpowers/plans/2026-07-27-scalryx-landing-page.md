# Scalryx Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-close, responsive, animated static recreation of the supplied Scalryx SaaS landing page.

**Architecture:** Keep `app/page.tsx` as a Server Component that composes focused section components. Store repeated page content in typed arrays, isolate the small mobile-menu interaction in a Client Component, and render all dashboard/report previews as responsive HTML and Tailwind CSS rather than flattened screenshots.

**Tech Stack:** Next.js 16.2.12 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4, CSS keyframes, Lucide React icons.

## Global Constraints

- Use the existing Next.js 16.2.12 App Router and read relevant guidance from `node_modules/next/dist/docs/` before changing framework code.
- Keep Scalryx branding and visible product copy in English.
- The first version is static; it must not add authentication, API calls, form submission, checkout, CMS integration, or analytics.
- Match the supplied section order, dark visual hierarchy, compact density, electric-blue accent system, and thin bordered mockups.
- Support desktop, tablet, and mobile without horizontal overflow, clipped text, or overlapping controls.
- Disable nonessential motion under `prefers-reduced-motion`.
- Keep pages server-rendered and limit client JavaScript to the mobile navigation.

---

## File Structure

```text
app/
  components/
    brand/
      logo.tsx                  # Scalryx symbol and wordmark
    landing/
      features-section.tsx      # Problems and insight feature grids
      hero-section.tsx          # Hero copy, actions, trust row, hero mockup
      how-it-works.tsx          # Process steps and audit form preview
      pricing-section.tsx       # Pricing cards and newsletter panel
      product-showcase.tsx      # Dashboard and sample report panels
      stats-strip.tsx           # Four business metrics
    layout/
      footer.tsx                # Footer navigation and copyright
      header.tsx                # Desktop navigation shell
      mobile-menu.tsx           # Isolated client menu
      section-shell.tsx         # Shared max-width and horizontal padding
    mockups/
      audit-form.tsx            # Static questionnaire card
      dashboard.tsx             # Reusable dashboard preview
      report.tsx                # Report download preview
    ui/
      button-link.tsx           # Primary and secondary anchor styles
      icon-tile.tsx             # Accent icon container
  data/
    landing.ts                  # Typed nav, feature, stats, pricing, footer data
  globals.css                   # Tokens, global background, keyframes, utilities
  layout.tsx                    # Metadata, font variables, root document
  page.tsx                      # Landing-page composition
public/
  avatars/
    avatar-1.svg                # Decorative customer portrait
    avatar-2.svg
    avatar-3.svg
    avatar-4.svg
    avatar-5.svg
tests/
  landing-structure.test.mjs    # Built-in Node structural smoke tests
```

### Task 1: Landing Data, Tokens, and Structural Contract

**Files:**
- Create: `app/data/landing.ts`
- Create: `tests/landing-structure.test.mjs`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `NavItem`, `FeatureItem`, `StatItem`, `StepItem`, `PricingTier`, `FooterGroup`, and their exported data arrays.
- Produces: global classes `site-shell`, `panel-surface`, `blue-glow`, `animate-enter`, and `animate-float`.

- [ ] **Step 1: Add a failing structural smoke test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("landing page exposes the required sections", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const id of ["features", "solutions", "how-it-works", "pricing"]) {
    assert.match(page, new RegExp(`id=["']${id}["']|${id.replaceAll("-", " ")}`, "i"));
  }
});

test("metadata names Scalryx", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /title:\s*["']Scalryx/);
  assert.match(layout, /description:/);
});
```

- [ ] **Step 2: Add the test script and verify the test fails**

Add to `package.json`:

```json
"test": "node --test tests/*.test.mjs"
```

Run: `npm test`

Expected: FAIL because the starter page lacks the required sections and Scalryx metadata.

- [ ] **Step 3: Define typed landing content**

Create exact exported shapes in `app/data/landing.ts`:

```ts
export type Accent = "blue" | "violet" | "orange" | "green";

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: "blocks" | "bolt" | "growth" | "audit" | "target" | "shield" | "route";
  accent: Accent;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StepItem {
  number: number;
  label: string;
}

export interface PricingTier {
  name: string;
  price: string;
  suffix?: string;
  features: string[];
  featured: boolean;
}

export interface FooterGroup {
  title: string;
  links: NavItem[];
}
```

Export `navItems`, `stats`, `problemCards`, `insightCards`, `steps`,
`pricingTiers`, and `footerGroups` with the exact visible copy from the approved
design.

- [ ] **Step 4: Establish global theme and metadata**

Set metadata in `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: "Scalryx — Scale Smarter",
  description:
    "AI-powered SaaS stack audits that find bottlenecks, cut software waste, and reveal smarter tools.",
};
```

In `app/globals.css`, define the page canvas and shared effects:

```css
:root {
  --background: #020711;
  --foreground: #f7f9ff;
  --muted: #8c96aa;
  --line: rgba(125, 153, 207, 0.18);
  --panel: rgba(7, 16, 32, 0.78);
  --blue: #1688ff;
  --blue-bright: #39a2ff;
}

html { scroll-behavior: smooth; }
body { background: var(--background); color: var(--foreground); }
.site-shell { width: min(100% - 2rem, 75rem); margin-inline: auto; }
.panel-surface { background: var(--panel); border: 1px solid var(--line); }
.blue-glow { box-shadow: 0 0 50px rgba(18, 119, 255, 0.2); }
```

- [ ] **Step 5: Run static verification**

Run: `npm run lint`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/data/landing.ts app/globals.css app/layout.tsx package.json tests/landing-structure.test.mjs
git commit -m "chore: establish Scalryx landing foundation"
```

### Task 2: Shared UI, Branding, and Navigation

**Files:**
- Create: `app/components/brand/logo.tsx`
- Create: `app/components/layout/section-shell.tsx`
- Create: `app/components/layout/header.tsx`
- Create: `app/components/layout/mobile-menu.tsx`
- Create: `app/components/ui/button-link.tsx`
- Create: `app/components/ui/icon-tile.tsx`
- Create: `public/avatars/avatar-1.svg`
- Create: `public/avatars/avatar-2.svg`
- Create: `public/avatars/avatar-3.svg`
- Create: `public/avatars/avatar-4.svg`
- Create: `public/avatars/avatar-5.svg`
- Modify: `app/page.tsx`
- Modify: `tests/landing-structure.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `NavItem`, `navItems`, `Accent`.
- Produces: `Logo({ compact?: boolean })`, `SectionShell({ as?, className?, children })`, `ButtonLink({ href, variant, children, className? })`, `IconTile({ icon, accent })`, and `Header()`.

- [ ] **Step 1: Extend the smoke test for navigation**

```js
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
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test`

Expected: FAIL with `ENOENT` for `header.tsx`.

- [ ] **Step 3: Install and use Lucide icons**

Run: `npm install lucide-react`

Use `Menu`, `X`, `Play`, `ChevronDown`, and the feature icons from
`lucide-react`. Do not hand-draw button icons.

- [ ] **Step 4: Build shared primitives and brand**

Implement the shared signatures:

```tsx
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-semibold text-white">
      <span aria-hidden="true" className="relative size-5 text-blue-400">
        <span className="absolute left-2 top-0 h-5 w-1 rotate-45 bg-current" />
        <span className="absolute left-2 top-0 h-5 w-1 -rotate-45 bg-current opacity-70" />
      </span>
      {!compact && <span>Scalryx</span>}
    </span>
  );
}

export function SectionShell({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: "div" | "section";
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={`site-shell ${className}`}>{children}</Tag>;
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  className?: string;
}) {
  const styles = {
    primary:
      "border border-blue-400/70 bg-blue-600 text-white shadow-[0_0_28px_rgba(22,136,255,.32)] hover:bg-blue-500",
    secondary:
      "border border-white/20 bg-white/[.02] text-white hover:border-blue-400/60 hover:bg-blue-500/10",
    ghost: "text-slate-300 hover:text-white",
  };

  return (
    <a
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition duration-200 ${styles[variant]} ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}
```

Create five distinct geometric portrait SVGs using blue, peach, cream, burgundy,
and teal fills. Each SVG must be `40x40`, use a circular background, and contain
a head-and-shoulders silhouette.

- [ ] **Step 5: Build responsive navigation**

`Header` renders server-side desktop navigation. `MobileMenu` is the only Client
Component and owns:

```ts
const [open, setOpen] = useState(false);
```

The mobile trigger uses `aria-expanded`, `aria-controls="mobile-navigation"`,
and toggles between Lucide `Menu` and `X`. Menu links close the menu after
selection.

- [ ] **Step 6: Compose the header in the page**

Replace the starter page with:

```tsx
export default function Home() {
  return (
    <main className="overflow-clip">
      <Header />
    </main>
  );
}
```

- [ ] **Step 7: Run verification**

Run: `npm test`

Expected: The navigation test passes; the section test still fails until the
page composition is completed.

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add app/components app/data/landing.ts app/page.tsx package.json package-lock.json public/avatars tests/landing-structure.test.mjs
git commit -m "feat: add Scalryx navigation and UI primitives"
```

### Task 3: Hero, Dashboard Mockup, and Metrics

**Files:**
- Create: `app/components/mockups/dashboard.tsx`
- Create: `app/components/landing/hero-section.tsx`
- Create: `app/components/landing/stats-strip.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/landing-structure.test.mjs`

**Interfaces:**
- Consumes: `ButtonLink`, `Logo`, `SectionShell`, `stats`.
- Produces: `DashboardMockup({ compact?: boolean })`, `HeroSection()`, and `StatsStrip()`.

- [ ] **Step 1: Add failing hero and dashboard tests**

```js
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
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test`

Expected: FAIL because hero and dashboard files do not exist.

- [ ] **Step 3: Build the dashboard mockup**

Render a responsive interface containing:

```tsx
<aside aria-label="Dashboard navigation">
  {["Dashboard", "Audits", "Reports", "Recommendations", "Settings"].map(
    (label, index) => (
      <div
        className={
          index === 0
            ? "rounded bg-blue-600 px-3 py-2 text-white"
            : "px-3 py-2 text-slate-500"
        }
        key={label}
      >
        {label}
      </div>
    ),
  )}
</aside>
<section>
  <div>Overall Score <strong>72<span>/100</span></strong></div>
  <div>Potential Savings <strong>$180<span>/mo</span></strong></div>
  <div>Problems Found <strong>3</strong></div>
  <div>Opportunities <strong>5</strong></div>
  <div>Tools Analyzed <strong>8</strong></div>
  <div>Top Recommendations</div>
</section>
```

Use CSS borders for the ring chart and letter/icon tiles for HubSpot, ClickUp,
Brevo, and Cloudways. The `compact` prop reduces padding and sidebar width for
the product showcase.

- [ ] **Step 4: Build hero and trust row**

Use the approved headline, supporting text, `Start Free Audit`, `Watch Demo`,
five avatar images via `next/image`, five star symbols, and the copy
`Trusted by 1,000+ businesses worldwide`. Keep the dashboard as the dominant
first-viewport visual.

- [ ] **Step 5: Build metrics strip and compose page**

Render `stats` as a four-column desktop grid that becomes two columns on mobile.
Add `HeroSection` and `StatsStrip` beneath `Header` in `app/page.tsx`.

- [ ] **Step 6: Add hero animation classes**

```css
@keyframes enter {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}
.animate-enter { animation: enter 700ms ease-out both; }
.animate-float { animation: float 7s ease-in-out infinite; }
```

- [ ] **Step 7: Run verification**

Run: `npm test && npm run lint && npm run build`

Expected: Hero/dashboard tests pass; build and lint pass.

- [ ] **Step 8: Commit**

```bash
git add app/components/landing app/components/mockups/dashboard.tsx app/globals.css app/page.tsx tests/landing-structure.test.mjs
git commit -m "feat: build hero dashboard and metrics"
```

### Task 4: Problems, Insights, and Audit Process

**Files:**
- Create: `app/components/landing/features-section.tsx`
- Create: `app/components/landing/how-it-works.tsx`
- Create: `app/components/mockups/audit-form.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/landing-structure.test.mjs`

**Interfaces:**
- Consumes: `problemCards`, `insightCards`, `steps`, `IconTile`, `SectionShell`.
- Produces: `FeaturesSection()`, `AuditFormMockup()`, and `HowItWorks()`.

- [ ] **Step 1: Add failing section tests**

```js
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
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test`

Expected: FAIL because the section files do not exist.

- [ ] **Step 3: Build problem and insight grids**

`FeaturesSection` owns `id="features"` and renders:

```tsx
<h2>
  Most businesses pay for software they
  <span className="text-blue-400"> don&apos;t actually need.</span>
</h2>
```

Map all three `problemCards` and four `insightCards` through the shared
`IconTile`. Use unframed section bands with individual cards only; do not nest
cards.

- [ ] **Step 4: Build static audit preview**

`AuditFormMockup` renders `Question 3 of 8`, `62%`, a 62%-width progress bar,
the question `Which CRM do you currently use?`, radio-style options for HubSpot,
Zoho, Salesforce, and None, and a static `Next` button.

- [ ] **Step 5: Build process steps**

Render five numbered process nodes with connecting lines and these labels:
`Answer Questions`, `AI Analysis`, `Receive Report`, `Upgrade`, and
`Get Better Results`. Connectors hide below the tablet breakpoint.

- [ ] **Step 6: Compose page and run verification**

Add `FeaturesSection` and `HowItWorks` to `app/page.tsx`.

Run: `npm test && npm run lint && npm run build`

Expected: All tests, lint, and build pass.

- [ ] **Step 7: Commit**

```bash
git add app/components/landing app/components/mockups/audit-form.tsx app/page.tsx tests/landing-structure.test.mjs
git commit -m "feat: add feature and audit process sections"
```

### Task 5: Product Showcase, Pricing, Newsletter, and Footer

**Files:**
- Create: `app/components/mockups/report.tsx`
- Create: `app/components/landing/product-showcase.tsx`
- Create: `app/components/landing/pricing-section.tsx`
- Create: `app/components/layout/footer.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/landing-structure.test.mjs`

**Interfaces:**
- Consumes: `DashboardMockup`, `ButtonLink`, `SectionShell`, `pricingTiers`, `footerGroups`, `Logo`.
- Produces: `ReportMockup()`, `ProductShowcase()`, `PricingSection()`, and `Footer()`.

- [ ] **Step 1: Add failing closing-section tests**

```js
test("pricing and footer expose approved conversion content", async () => {
  const pricing = await readFile(
    new URL("../app/components/landing/pricing-section.tsx", import.meta.url),
    "utf8",
  );
  const footer = await readFile(
    new URL("../app/components/layout/footer.tsx", import.meta.url),
    "utf8",
  );
  assert.match(pricing, /Simple Pricing/);
  assert.match(pricing, /\$29/);
  assert.match(pricing, /\$79/);
  assert.match(pricing, /Stay Ahead\. Stay Scaled\./);
  assert.match(footer, /© 2026 Scalryx/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test`

Expected: FAIL because pricing/footer files do not exist.

- [ ] **Step 3: Build showcase mockups**

`ProductShowcase` owns `id="solutions"` and places a compact `DashboardMockup`
beside `ReportMockup`. The report includes `Overall 3 of 8`, score `71/100`,
three recommendations, `Download Full Report`, and a tilted cover titled
`Audit Report`.

- [ ] **Step 4: Build pricing and newsletter**

`PricingSection` owns `id="pricing"`, maps the three typed tiers, visually
emphasizes Pro, and renders a static email input plus `Subscribe` button. Use
`type="email"` and an explicit `aria-label="Email address"`.

- [ ] **Step 5: Build footer**

Render the logo and description, social icon links, all `footerGroups`, and:

```tsx
<p>© 2026 Scalryx. All rights reserved.</p>
```

Use real anchor targets for section links and `href="#"` only for unavailable
future routes.

- [ ] **Step 6: Complete page composition**

The final order in `app/page.tsx` is:

```tsx
<Header />
<HeroSection />
<StatsStrip />
<FeaturesSection />
<HowItWorks />
<ProductShowcase />
<PricingSection />
<Footer />
```

- [ ] **Step 7: Run verification**

Run: `npm test && npm run lint && npm run build`

Expected: All structural tests, lint, and production build pass.

- [ ] **Step 8: Commit**

```bash
git add app/components app/page.tsx tests/landing-structure.test.mjs
git commit -m "feat: complete Scalryx landing content"
```

### Task 6: Motion, Responsive Polish, and Visual QA

**Files:**
- Modify: `app/globals.css`
- Modify: landing and mockup components as visual inspection requires

**Interfaces:**
- Consumes: the complete landing page.
- Produces: verified desktop, tablet, and mobile layouts with reduced-motion support.

- [ ] **Step 1: Add reduced-motion and stable interactive states**

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

:focus-visible {
  outline: 2px solid var(--blue-bright);
  outline-offset: 3px;
}
```

Use fixed dimensions for icon buttons, mockup charts, process nodes, and CTAs so
hover states never shift layout.

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`

Expected: Next.js reports a local URL and serves the page without runtime errors.

- [ ] **Step 3: Inspect desktop**

Open the page at `1440x1000`. Verify the hero uses two columns, the dashboard is
fully visible, the next stats section is hinted below the fold, and there is no
horizontal overflow. Compare section order, density, blue glow, and content
hierarchy with the reference.

- [ ] **Step 4: Inspect tablet**

Open the page at `768x1024`. Verify cards use one or two columns as appropriate,
the dashboard remains readable, navigation switches to the mobile trigger, and
all mockups stay inside the viewport.

- [ ] **Step 5: Inspect mobile**

Open the page at `390x844`. Verify headline wrapping, 44px minimum control
targets, stacked pricing cards, readable footer columns, working menu open/close,
and no clipped text or overlap.

- [ ] **Step 6: Inspect motion and keyboard behavior**

Confirm hero entrance, dashboard float, progress animation, hover glow, and
button transitions are subtle. Emulate reduced motion and confirm the layout
remains complete without continuous animation. Tab through the header, CTAs,
audit options, pricing links, newsletter field, and footer links.

- [ ] **Step 7: Apply visual corrections and rerun verification**

Run: `npm test && npm run lint && npm run build`

Expected: All tests and static checks pass after responsive corrections.

- [ ] **Step 8: Check the final diff**

Run: `git diff --check`

Expected: No whitespace errors.

Run: `git status --short`

Expected: Only intentional landing-page files are modified.

- [ ] **Step 9: Commit**

```bash
git add app public package.json package-lock.json tests
git commit -m "fix: polish responsive landing interactions"
```
