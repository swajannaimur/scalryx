# Theme, Typography, and Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add persisted system-aware light/dark theming, readable standard-sized typography, theme-safe imagery and mockups, and a 1440px maximum content width to the Scalryx landing page.

**Architecture:** Keep the page and layout server-rendered, add one focused client-side `ThemeToggle`, and use a pre-paint root script to select the saved or system theme without a flash. Define semantic color tokens in global CSS, expose them through Tailwind CSS 4 aliases, and replace dark-only utilities across layout, landing, UI, and mockup components.

**Tech Stack:** Next.js 16.2 App Router, React 19.2, TypeScript 5, Tailwind CSS 4, Lucide React, Node.js built-in test runner.

## Global Constraints

- First visit follows `prefers-color-scheme`; a manual light/dark choice is stored under `scalryx-theme`.
- The root `html` element exposes the active mode through `data-theme` and matching `color-scheme`.
- The shared content maximum is exactly `90rem` (1440px).
- Body and explanatory copy use 16px; primary UI and secondary labels use at least 14px; dense product-preview text never goes below 12px.
- Decorative backgrounds may fill the viewport, but header, main section, and footer content stays inside the shared content boundary.
- All text, controls, avatar edges, dashboard panels, and report artwork remain visibly distinct in both themes.
- Do not add a theme library, network font, new marketing content, backend behavior, or three-state theme selector.

---

## File Structure

- Create `app/components/theme/theme-toggle.tsx`: client-only theme control, media-query synchronization, and persisted manual preference.
- Modify `app/layout.tsx`: hydration-safe root and pre-paint theme initializer.
- Modify `app/globals.css`: semantic theme variables, Tailwind aliases, backgrounds, shared surfaces, and 1440px shell.
- Modify `app/components/layout/header.tsx`: single toggle placement shared by desktop and mobile header layouts.
- Modify `app/components/layout/mobile-menu.tsx`: semantic colors and standard control text.
- Modify `app/components/layout/footer.tsx`: readable footer scale and theme-safe colors.
- Modify `app/components/brand/logo.tsx`: semantic logo foreground.
- Modify `app/components/ui/button-link.tsx`: semantic button variants and 14px minimum text.
- Modify `app/components/ui/icon-tile.tsx`: keep accent identity while using readable theme-safe treatment.
- Modify all files in `app/components/landing/`: standardized heading/body/card typography and semantic surfaces.
- Modify all files in `app/components/mockups/`: minimum 12px preview labels, larger layouts, and theme-aware preview artwork.
- Create `tests/theme-accessibility.test.mjs`: source-contract regression tests for theme behavior, width, semantic colors, and typography floors.

---

### Task 1: System-Aware Persisted Theme Control

**Files:**

- Create: `app/components/theme/theme-toggle.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/components/layout/header.tsx`
- Create: `tests/theme-accessibility.test.mjs`

**Interfaces:**

- Produces: `ThemeToggle(): JSX.Element`
- Persists: `"light" | "dark"` under `localStorage["scalryx-theme"]`
- Mutates: `document.documentElement.dataset.theme` and `document.documentElement.style.colorScheme`
- Consumes: `window.matchMedia("(prefers-color-scheme: dark)")`

- [ ] **Step 1: Write the failing theme contract tests**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("root layout applies a hydration-safe theme before paint", async () => {
  const layout = await read("../app/layout.tsx");

  assert.match(layout, /suppressHydrationWarning/);
  assert.match(layout, /scalryx-theme/);
  assert.match(layout, /prefers-color-scheme:\s*dark/);
  assert.match(layout, /dataset\.theme/);
  assert.match(layout, /colorScheme/);
});

test("header exposes a persisted light and dark mode control", async () => {
  const [header, toggle] = await Promise.all([
    read("../app/components/layout/header.tsx"),
    read("../app/components/theme/theme-toggle.tsx"),
  ]);

  assert.match(header, /ThemeToggle/);
  assert.match(toggle, /"use client"/);
  assert.match(toggle, /storageKey\s*=\s*["']scalryx-theme["']/);
  assert.match(toggle, /localStorage\.setItem\(storageKey/);
  assert.match(
    toggle,
    /systemThemeQuery\s*=\s*["']\(prefers-color-scheme: dark\)["']/,
  );
  assert.match(toggle, /matchMedia\(systemThemeQuery\)/);
  assert.match(toggle, /Switch to light mode/);
  assert.match(toggle, /Switch to dark mode/);
});
```

- [ ] **Step 2: Run the tests and confirm the missing feature fails**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
```

Expected: FAIL because `theme-toggle.tsx` does not exist and the root layout has no theme initializer.

- [ ] **Step 3: Add the pre-paint initializer to the server root layout**

Add this constant above `RootLayout` in `app/layout.tsx`:

```tsx
const themeInitializer = `
  (() => {
    const key = "scalryx-theme";
    let saved = null;
    try {
      saved = localStorage.getItem(key);
    } catch {}
    const theme =
      saved === "light" || saved === "dark"
        ? saved
        : matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
`;
```

Change the layout root to:

```tsx
<html
  className="h-full antialiased"
  lang="en"
  suppressHydrationWarning
>
  <head>
    <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
  </head>
  <body className="min-h-full">{children}</body>
</html>
```

- [ ] **Step 4: Implement the focused client toggle**

Create `app/components/theme/theme-toggle.tsx` with:

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "scalryx-theme";
const systemThemeQuery = "(prefers-color-scheme: dark)";

function getAppliedTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getAppliedTheme());

    const media = window.matchMedia(systemThemeQuery);
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(storageKey) !== null) return;
      const nextTheme: Theme = event.matches ? "dark" : "light";
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  const currentTheme = theme ?? "dark";
  const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
  const label =
    nextTheme === "light" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      aria-label={label}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface text-content shadow-sm transition hover:border-blue-500 hover:text-blue-500"
      onClick={() => {
        applyTheme(nextTheme);
        localStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);
      }}
      title={label}
      type="button"
    >
      {currentTheme === "dark" ? (
        <Sun aria-hidden="true" size={19} />
      ) : (
        <Moon aria-hidden="true" size={19} />
      )}
    </button>
  );
}
```

- [ ] **Step 5: Place one toggle in the header action group**

Import `ThemeToggle` in `app/components/layout/header.tsx`. Replace the separate
desktop action and mobile-menu siblings with:

```tsx
<div className="flex items-center gap-2 sm:gap-3">
  <ThemeToggle />
  <div className="hidden items-center gap-3 lg:flex">
    <ButtonLink href="#about" variant="secondary">
      Log In
    </ButtonLink>
    <ButtonLink href="#audit">Start Free Audit</ButtonLink>
  </div>
  <MobileMenu />
</div>
```

- [ ] **Step 6: Run the theme contract tests**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
```

Expected: PASS for the new root-layout and toggle tests, plus all existing landing tests.

- [ ] **Step 7: Commit the theme behavior**

```powershell
git add app/layout.tsx app/components/layout/header.tsx app/components/theme/theme-toggle.tsx tests/theme-accessibility.test.mjs
git commit -m "feat: add persisted color theme control"
```

---

### Task 2: Semantic Theme Tokens and 1440px Content Boundary

**Files:**

- Modify: `app/globals.css`
- Modify: `tests/theme-accessibility.test.mjs`

**Interfaces:**

- Produces Tailwind aliases: `page`, `content`, `muted`, `subtle`, `surface`, `surface-raised`, `input`, `line`, `line-strong`, `on-brand`
- Produces CSS helpers: `.panel-surface`, `.blue-glow`, `.text-gradient`, `.report-cover`
- Sets: `.site-shell` maximum to `90rem`

- [ ] **Step 1: Add failing token and width tests**

Append to `tests/theme-accessibility.test.mjs`:

```js
test("global styles define complete light and dark semantic themes", async () => {
  const css = await read("../app/globals.css");

  assert.match(css, /:root\s*{[\s\S]*--background:/);
  assert.match(css, /\[data-theme=["']dark["']\]\s*{[\s\S]*--background:/);

  for (const token of [
    "--foreground",
    "--muted",
    "--subtle",
    "--surface",
    "--surface-raised",
    "--input",
    "--line",
    "--line-strong",
    "--on-brand",
    "--score-track",
  ]) {
    assert.match(css, new RegExp(token));
  }
});

test("shared site content is capped at exactly 1440px", async () => {
  const css = await read("../app/globals.css");

  assert.match(css, /\.site-shell\s*{[\s\S]*?90rem/);
  assert.doesNotMatch(css, /\.site-shell\s*{[\s\S]*?75rem/);
});
```

- [ ] **Step 2: Run the new tests and confirm they fail**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
```

Expected: FAIL because the stylesheet has no light theme, no semantic token set, and still uses `75rem`.

- [ ] **Step 3: Replace the root palette with semantic light and dark variables**

Use this variable set in `app/globals.css`:

```css
:root {
  color-scheme: light;
  --background: #f5f7fb;
  --background-start: #f8faff;
  --background-end: #eef3fb;
  --foreground: #0c1526;
  --muted: #4b5c74;
  --subtle: #65748a;
  --surface: rgba(255, 255, 255, 0.82);
  --surface-raised: #ffffff;
  --input: rgba(255, 255, 255, 0.94);
  --header: rgba(248, 250, 255, 0.88);
  --line: rgba(35, 58, 92, 0.14);
  --line-strong: rgba(35, 58, 92, 0.24);
  --grid-line: rgba(53, 86, 130, 0.055);
  --panel-glow: rgba(22, 136, 255, 0.08);
  --page-glow: rgba(22, 136, 255, 0.1);
  --shadow: rgba(38, 55, 82, 0.12);
  --on-brand: #ffffff;
  --score-track: rgba(74, 96, 130, 0.18);
  --report-cover-start: #1566bb;
  --report-cover-end: #0d2e57;
  --avatar-ring: #f5f7fb;
  --blue: #086fdb;
  --blue-bright: #087bea;
}

[data-theme="dark"] {
  color-scheme: dark;
  --background: #020711;
  --background-start: #020711;
  --background-end: #030a16;
  --foreground: #f7f9ff;
  --muted: #aab4c6;
  --subtle: #8491a7;
  --surface: rgba(7, 16, 32, 0.78);
  --surface-raised: rgba(8, 18, 36, 0.96);
  --input: rgba(3, 10, 22, 0.72);
  --header: rgba(2, 7, 17, 0.86);
  --line: rgba(125, 153, 207, 0.18);
  --line-strong: rgba(143, 169, 214, 0.28);
  --grid-line: rgba(110, 145, 190, 0.025);
  --panel-glow: rgba(18, 119, 255, 0.2);
  --page-glow: rgba(0, 92, 255, 0.12);
  --shadow: rgba(0, 0, 0, 0.32);
  --on-brand: #ffffff;
  --score-track: rgba(94, 119, 155, 0.2);
  --report-cover-start: #09254b;
  --report-cover-end: #071225;
  --avatar-ring: #030a15;
  --blue: #1688ff;
  --blue-bright: #39a2ff;
}
```

- [ ] **Step 4: Expose the semantic Tailwind CSS 4 color aliases**

Extend the existing `@theme inline` block with:

```css
--color-page: var(--background);
--color-content: var(--foreground);
--color-muted: var(--muted);
--color-subtle: var(--subtle);
--color-surface: var(--surface);
--color-surface-raised: var(--surface-raised);
--color-input: var(--input);
--color-line: var(--line);
--color-line-strong: var(--line-strong);
--color-on-brand: var(--on-brand);
```

- [ ] **Step 5: Make global effects and shared helpers theme-aware**

Use:

```css
body {
  margin: 0;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 72% 15%, var(--page-glow), transparent 27rem),
    linear-gradient(180deg, var(--background-start) 0%, var(--background-end) 48%, var(--background-start) 100%);
  color: var(--foreground);
  font-family: "Segoe UI", Arial, Helvetica, sans-serif;
}

body::before {
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
}

.site-shell {
  width: min(calc(100% - 2rem), 90rem);
  margin-inline: auto;
}

.panel-surface {
  border: 1px solid var(--line);
  background:
    linear-gradient(135deg, var(--panel-glow), transparent 45%),
    var(--surface);
}

.blue-glow {
  box-shadow:
    0 0 0 1px rgba(34, 124, 255, 0.08),
    0 20px 60px var(--shadow),
    0 0 50px var(--panel-glow);
}

.report-cover {
  background: linear-gradient(
    145deg,
    var(--report-cover-start),
    var(--report-cover-end) 65%
  );
}
```

Keep the tablet gutter rule but change its maximum to `90rem`.

- [ ] **Step 6: Run the token and width tests**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
```

Expected: PASS for semantic-token and 1440px tests.

- [ ] **Step 7: Commit the theme foundation**

```powershell
git add app/globals.css tests/theme-accessibility.test.mjs
git commit -m "feat: add semantic themes and 1440px layout"
```

---

### Task 3: Readable Layout, UI, and Marketing Typography

**Files:**

- Modify: `app/components/brand/logo.tsx`
- Modify: `app/components/ui/button-link.tsx`
- Modify: `app/components/ui/icon-tile.tsx`
- Modify: `app/components/layout/header.tsx`
- Modify: `app/components/layout/mobile-menu.tsx`
- Modify: `app/components/layout/footer.tsx`
- Modify: `app/components/landing/hero-section.tsx`
- Modify: `app/components/landing/stats-strip.tsx`
- Modify: `app/components/landing/features-section.tsx`
- Modify: `app/components/landing/how-it-works.tsx`
- Modify: `app/components/landing/product-showcase.tsx`
- Modify: `app/components/landing/pricing-section.tsx`
- Modify: `tests/theme-accessibility.test.mjs`

**Interfaces:**

- Consumes semantic color utilities from Task 2.
- Preserves every exported component name and existing page composition.
- Produces marketing/layout text no smaller than 14px and semantic neutral colors only.

- [ ] **Step 1: Add failing marketing typography and color tests**

Append:

```js
const marketingFiles = [
  "../app/components/brand/logo.tsx",
  "../app/components/ui/button-link.tsx",
  "../app/components/ui/icon-tile.tsx",
  "../app/components/layout/header.tsx",
  "../app/components/layout/mobile-menu.tsx",
  "../app/components/layout/footer.tsx",
  "../app/components/landing/hero-section.tsx",
  "../app/components/landing/stats-strip.tsx",
  "../app/components/landing/features-section.tsx",
  "../app/components/landing/how-it-works.tsx",
  "../app/components/landing/product-showcase.tsx",
  "../app/components/landing/pricing-section.tsx",
];

test("marketing and layout text never falls below 14px", async () => {
  for (const path of marketingFiles) {
    const source = await read(path);
    const sizes = [...source.matchAll(/text-\[(\d+)px\]/g)].map((match) =>
      Number(match[1]),
    );
    assert.equal(
      sizes.every((size) => size >= 14),
      true,
      `${path} contains undersized text: ${sizes.filter((size) => size < 14)}`,
    );
  }
});

test("marketing and layout components avoid dark-only neutral utilities", async () => {
  const forbidden = /(text-white|text-slate-\d+|border-white|bg-\[#0|bg-black)/;

  for (const path of marketingFiles) {
    const source = await read(path);
    assert.doesNotMatch(source, forbidden, path);
  }
});
```

- [ ] **Step 2: Run tests and confirm the typography/color failures**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
```

Expected: FAIL and list existing 7–13px values and dark-only neutral utilities.

- [ ] **Step 3: Apply the standard marketing typography scale**

Use these exact size targets:

| Component area | Required utility |
| --- | --- |
| Header navigation | `text-sm` |
| Shared buttons and controls | `text-sm` |
| Hero heading | `text-[40px] sm:text-[56px] xl:text-[64px]` |
| Hero body | `text-base leading-7` |
| Hero social proof | `text-sm` |
| Stats values | `text-3xl sm:text-4xl` |
| Stats labels | `text-sm` |
| Primary section headings | `text-[28px] sm:text-[36px] xl:text-[40px]` |
| Card titles | `text-lg` |
| Card and section descriptions | `text-base leading-7` |
| Insight titles | `text-base` |
| Insight descriptions | `text-sm leading-6` |
| Process labels | `text-sm leading-5` |
| Pricing tier names | `text-base` |
| Pricing prices | `text-[32px]` |
| Pricing features and suffixes | `text-sm` |
| Newsletter input/button | `text-sm` |
| Footer group headings | `text-base` |
| Footer copy and links | `text-sm leading-6` |

Remove every marketing/layout `text-[Npx]` value below 14px, including size
overrides passed through `ButtonLink`.

- [ ] **Step 4: Replace dark-only neutrals with semantic utilities**

Apply this exact mapping across the listed files:

```text
text-white                -> text-content
text-slate-300/400        -> text-muted
text-slate-500/600/700    -> text-subtle
border-white/[opacity]    -> border-line
border-white/15 or /20    -> border-line-strong
bg-[#020711]/80           -> bg-[var(--header)]
bg-[#071020]/70 or /75    -> bg-surface
bg-[#0a172b]              -> bg-surface-raised
bg-black/10 or /20        -> bg-input
placeholder:text-slate-*  -> placeholder:text-subtle
avatar border dark hex    -> border-[var(--avatar-ring)]
```

Primary blue buttons use `text-on-brand`; secondary and ghost buttons use
`text-content` or `text-muted`. Keep blue, amber, violet, orange, emerald, and
fuchsia accents because they communicate brand or data meaning rather than
theme-neutral surfaces.

- [ ] **Step 5: Expand layouts to prevent larger text from clipping**

Make these structural changes:

```text
Hero grid: lg:grid-cols-[0.9fr_1.1fr], xl:gap-20
Feature cards: p-6 and gap-4
Insight band: xl:grid-cols-4 with min-h removed from titles
Process panel: steps use gap-4 and max-w-[8rem]
Pricing cards: min-h-[22rem], p-6
Newsletter panel: p-6 sm:p-8 xl:p-10
Footer: gap-10 with link rows space-y-3
```

Use `min-w-0` on grid children containing long text and keep existing responsive
column collapse behavior.

- [ ] **Step 6: Run tests and lint**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
```

Expected: all tests PASS and ESLint exits with no errors.

- [ ] **Step 7: Commit the marketing readability pass**

```powershell
git add app/components/brand app/components/ui app/components/layout app/components/landing tests/theme-accessibility.test.mjs
git commit -m "fix: improve landing page theme contrast and type scale"
```

---

### Task 4: Theme-Safe, Readable Product Mockups

**Files:**

- Modify: `app/components/mockups/dashboard.tsx`
- Modify: `app/components/mockups/audit-form.tsx`
- Modify: `app/components/mockups/report.tsx`
- Modify: `tests/theme-accessibility.test.mjs`

**Interfaces:**

- Consumes semantic color utilities and `.report-cover` from Task 2.
- Keeps `DashboardMockup({ compact?: boolean })`, `AuditFormMockup()`, and `ReportMockup()` exports unchanged.
- Produces preview text no smaller than 12px and theme-safe neutral surfaces.

- [ ] **Step 1: Add failing mockup readability tests**

Append:

```js
const mockupFiles = [
  "../app/components/mockups/dashboard.tsx",
  "../app/components/mockups/audit-form.tsx",
  "../app/components/mockups/report.tsx",
];

test("product mockup text never falls below 12px", async () => {
  for (const path of mockupFiles) {
    const source = await read(path);
    const sizes = [...source.matchAll(/text-\[(\d+)px\]/g)].map((match) =>
      Number(match[1]),
    );
    assert.equal(
      sizes.every((size) => size >= 12),
      true,
      `${path} contains undersized text: ${sizes.filter((size) => size < 12)}`,
    );
  }
});

test("product mockups use semantic neutral colors", async () => {
  const forbidden = /(text-white|text-slate-\d+|border-white|bg-\[#0|bg-black)/;

  for (const path of mockupFiles) {
    const source = await read(path);
    assert.doesNotMatch(source, forbidden, path);
  }
});
```

- [ ] **Step 2: Run tests and confirm current mockups fail**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
```

Expected: FAIL with 7–11px mockup sizes and dark-only neutral utility matches.

- [ ] **Step 3: Raise all dashboard preview text to the dense-preview scale**

Apply:

```text
Dashboard top metadata            -> text-xs
Dashboard navigation              -> text-xs leading-4
Score/savings labels              -> text-sm
Score number                      -> text-[32px]
Score suffix                      -> text-sm
Status/supporting savings text    -> text-xs leading-4
Metric labels                     -> text-xs whitespace-normal
Metric values                     -> text-xl
Recommendation heading            -> text-sm
View All and tool names           -> text-xs
```

Increase the non-compact dashboard padding to `p-4 sm:p-5`, sidebar width to
`140px`, card gaps to `gap-3`, and panel padding to `p-4`. For compact mode,
use a `120px` sidebar and allow navigation labels to wrap instead of hiding
long labels.

- [ ] **Step 4: Raise the audit form and report text scale**

Apply:

```text
Audit progress metadata       -> text-xs
Audit question                -> text-base
Audit option buttons          -> text-sm
Audit next button             -> text-sm
Report metadata/labels        -> text-xs
Report score                  -> text-[32px]
Report recommendation rows    -> text-xs
Report download button        -> text-xs
Report cover title            -> text-lg
Report cover description      -> text-xs leading-5
```

Increase `ReportMockup` minimum height from `18rem` to `24rem`, use
`grid-cols-1 sm:grid-cols-[1.15fr_.85fr]`, and make its inner panel padding
`p-5`. Allow recommendation roles to wrap on small screens.

- [ ] **Step 5: Convert mockup neutrals and charts to theme tokens**

Use the same semantic mapping as Task 3. Additionally:

```tsx
style={{
  background:
    "conic-gradient(var(--blue) 0 72%, var(--score-track) 72% 100%)",
}}
```

Use `bg-surface-raised` for the ring center and data cards, `border-line` for
all preview separators, `text-content` for primary values, `text-muted` for
labels, and `text-subtle` for secondary metadata. Replace the report-cover
inline gradient with the `.report-cover` class.

- [ ] **Step 6: Run all automated checks**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

Expected: all tests PASS, ESLint exits cleanly, and the Next.js production build succeeds.

- [ ] **Step 7: Commit the mockup readability pass**

```powershell
git add app/components/mockups tests/theme-accessibility.test.mjs
git commit -m "fix: make product previews readable in both themes"
```

---

### Task 5: Browser Verification and Targeted Corrections

**Files:**

- Modify only a file that fails a verification check from Tasks 1–4.

**Interfaces:**

- Verifies the completed page at 390px, 768px, 1440px, and 1600px viewport widths.
- Verifies both `data-theme="light"` and `data-theme="dark"`.
- Requires `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.

- [ ] **Step 1: Start the production server**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run build
Start-Process -FilePath 'C:\Program Files\nodejs\npm.cmd' -ArgumentList @('run','start','--','-p','3000') -WorkingDirectory (Get-Location) -WindowStyle Hidden
```

Expected: the application becomes available at `http://localhost:3000`.

- [ ] **Step 2: Inspect both themes at the four target widths**

For each width, verify:

```text
390x844   light and dark
768x1024  light and dark
1440x1000 light and dark
1600x1000 light and dark
```

At every viewport:

- Header controls have 44px touch targets and do not overlap.
- Hero text and dashboard remain fully visible.
- Avatars have visible rings.
- Cards, process steps, pricing, newsletter, product previews, and footer text
  have visible contrast.
- No essential text is clipped or overlapped.
- The page has no horizontal overflow.
- At 1600px, content stops expanding at 1440px.

- [ ] **Step 3: Verify toggle persistence and system fallback**

In the rendered page:

1. Clear `localStorage["scalryx-theme"]`.
2. Emulate a light system preference and reload; expect `data-theme="light"`.
3. Emulate a dark system preference and reload; expect `data-theme="dark"`.
4. Toggle to light, reload, and expect light regardless of dark system preference.
5. Toggle to dark, reload, and expect dark regardless of light system preference.

- [ ] **Step 4: Correct only observed failures and rerun checks**

For a failure, first add a narrow assertion to
`tests/theme-accessibility.test.mjs` when the defect is expressible as a source
contract. Run it to confirm failure, make the minimum component or CSS change,
then rerun test, lint, build, and the affected viewport/theme inspection.

- [ ] **Step 5: Run the final verification suite**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
git diff --check
git status --short
```

Expected: tests, lint, build, and diff check succeed; status shows only intentional uncommitted verification fixes, if any.

- [ ] **Step 6: Commit any verification fixes**

If Step 4 changed files:

```powershell
git add app tests/theme-accessibility.test.mjs
git commit -m "fix: resolve responsive theme verification issues"
```

If Step 4 made no changes, do not create an empty commit.
