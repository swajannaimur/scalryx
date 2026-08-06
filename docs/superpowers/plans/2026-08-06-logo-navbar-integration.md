# Scalryx Logo and Navbar Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the exact user-supplied Scalryx PNG at controlled responsive sizes and align the desktop and mobile header around a stable three-column navbar.

**Architecture:** `Logo` owns the static image import, intrinsic dimensions, alt text, default width, responsive `sizes`, and optional Next.js 16 `preload` behavior. Header and footer own only their surface-specific width and loading choices; the header uses a three-column grid so the navigation has a dedicated centered column without changing its content or mobile behavior.

**Tech Stack:** Next.js 16.2.12 App Router, React 19.2.4, TypeScript, Tailwind CSS 4, Node.js test runner, ESLint 9

## Global Constraints

- `public/logo.png` is the canonical and sole logo asset; its SHA-256 remains `A3968653C620C09D89A6D9AF45DB7CD8D9A16AB392A37D08A9EFCE310D3543EF` and its intrinsic dimensions remain 436 × 164.
- Do not crop, recolor, recreate, compress, replace, or generate an alternate mobile logo.
- Preserve `app/favicon.ico` unchanged and outside this implementation.
- Use a static import so Next.js emits intrinsic width and height and avoids layout shift.
- Use the Next.js 16 `preload` prop, not the deprecated `priority` prop.
- Header logo width is 112px below `sm` and 128px at `sm` and above; footer logo width is 140px.
- Preserve the 72px sticky header, navigation labels and anchors, newsletter CTA, mobile-menu behavior, 44px touch targets, keyboard semantics, and the existing white-and-blue visual system.
- Keep all unrelated user changes intact; stage only files named by each commit step.

---

### Task 1: Exact Logo Asset Contract

**Files:**
- Modify: `tests/page-composition.test.mjs`
- Modify: `app/components/brand/logo.tsx`
- Use unchanged: `public/logo.png`

**Interfaces:**
- Consumes: Next.js `Image` and the exact static import `../../../public/logo.png`.
- Produces: `Logo({ className?: string, preload?: boolean }): JSX.Element` with complete artwork, intrinsic ratio, accessible text, a 140px safe default, and responsive image sizing metadata.

- [ ] **Step 1: Add a failing logo integration test**

Add `import { createHash } from "node:crypto";`, define `const binary = (file) => readFile(new URL(`../${file}`, import.meta.url));`, and add:

```js
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
  assert.doesNotMatch(logo, /compact|src="logo\.png"|--brand-primary|--brand-accent|\/\//);
});
```

In `hero keeps the live assessment inside a clean editorial composition`, replace the obsolete logo color-token assertions with:

```js
  assert.match(logo, /src=\{logoImage\}/);
  assert.doesNotMatch(logo, /--brand-primary|--brand-accent/);
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `node --test --test-name-pattern="brand logo|hero keeps" tests/page-composition.test.mjs`

Expected: FAIL because the current component uses a relative string source, lacks intrinsic import and preload, retains `compact`, and contains the commented legacy mark.

- [ ] **Step 3: Implement the minimal static-image component**

Replace `app/components/brand/logo.tsx` with:

```tsx
import Image from "next/image";
import logoImage from "../../../public/logo.png";

interface LogoProps {
  className?: string;
  preload?: boolean;
}

export function Logo({
  className = "w-[140px]",
  preload = false,
}: LogoProps) {
  return (
    <Image
      alt="Scalryx"
      className={`h-auto max-w-full ${className}`}
      preload={preload}
      sizes="(max-width: 639px) 112px, 140px"
      src={logoImage}
    />
  );
}
```

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `node --test --test-name-pattern="brand logo|hero keeps" tests/page-composition.test.mjs`

Expected: PASS, including exact hash, dimensions, static import, accessibility label, and removal of the legacy implementation.

- [ ] **Step 5: Commit the exact logo integration**

```powershell
git add app/components/brand/logo.tsx public/logo.png tests/page-composition.test.mjs
git commit -m "fix: integrate supplied Scalryx logo"
```

Expected: `app/favicon.ico` remains unstaged.

---

### Task 2: Balanced Header and Footer Sizing

**Files:**
- Modify: `tests/page-composition.test.mjs`
- Modify: `app/components/layout/header.tsx`
- Modify: `app/components/layout/footer.tsx`
- Preserve unchanged: `app/components/layout/mobile-menu.tsx`

**Interfaces:**
- Consumes: Task 1 `Logo({ className?: string, preload?: boolean })`.
- Produces: a 72px header with `auto / minmax(0, 1fr) / auto` columns, centered desktop navigation, non-shrinking outer groups, a preloaded responsive header logo, and a non-preloaded 140px footer logo.

- [ ] **Step 1: Add failing layout assertions**

Extend the existing header test with:

```js
  assert.match(header, /grid h-\[72px\] grid-cols-\[auto_minmax\(0,1fr\)_auto\] items-center/);
  assert.match(header, /className="inline-flex min-h-11 shrink-0 items-center"/);
  assert.match(header, /<Logo className="w-28 sm:w-32" preload \/>/);
  assert.match(header, /className="hidden items-center justify-self-center gap-1 lg:flex"/);
  assert.match(header, /className="flex shrink-0 items-center gap-2 sm:gap-3"/);
```

Extend the existing footer contract test with:

```js
  assert.match(footer, /<Logo className="w-\[140px\]" \/>/);
  assert.doesNotMatch(footer, /<Logo[^>]*preload/);
```

- [ ] **Step 2: Run the focused layout tests and confirm RED**

Run: `node --test --test-name-pattern="header and mobile navigation|footer includes" tests/page-composition.test.mjs`

Expected: FAIL because the current header is a free-form `flex justify-between` row and the surface logo calls lack width/loading contracts.

- [ ] **Step 3: Implement the three-column header**

In `app/components/layout/header.tsx`, use:

```tsx
      <SectionShell className="grid h-[72px] grid-cols-[auto_minmax(0,1fr)_auto] items-center">
        <a
          aria-label="Scalryx home"
          className="inline-flex min-h-11 shrink-0 items-center"
          href="#home"
        >
          <Logo className="w-28 sm:w-32" preload />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center justify-self-center gap-1 lg:flex"
        >
```

Keep all navigation anchors unchanged and change only the action wrapper to:

```tsx
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
```

- [ ] **Step 4: Apply the explicit footer width**

Replace the bare footer logo call with:

```tsx
          <Logo className="w-[140px]" />
```

- [ ] **Step 5: Run the focused layout tests and confirm GREEN**

Run: `node --test --test-name-pattern="header and mobile navigation|footer includes|touch-target" tests/page-composition.test.mjs`

Expected: PASS. The contract covers grid alignment, responsive sizing, header preload, footer lazy loading, and existing 44px targets.

- [ ] **Step 6: Commit the layout integration**

```powershell
git add app/components/layout/header.tsx app/components/layout/footer.tsx tests/page-composition.test.mjs
git commit -m "fix: balance branded site navigation"
```

---

### Task 3: Production Verification

**Files:**
- Verify: `app/components/brand/logo.tsx`
- Verify: `app/components/layout/header.tsx`
- Verify: `app/components/layout/footer.tsx`
- Verify: `tests/page-composition.test.mjs`
- Verify unchanged: `public/logo.png`

**Interfaces:**
- Consumes: Tasks 1 and 2.
- Produces: verified tests, lint, production build, intrinsic prerendered image markup, and clean patch formatting.

- [ ] **Step 1: Run the complete automated test suite**

Run: `npm test`

Expected: all Node tests pass with zero failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: exit code 0 with no `compact` warning and no deprecated `priority` usage.

- [ ] **Step 3: Build the production application**

Run: `npm run build`

Expected: Next.js 16.2.12 build completes and the home route prerenders successfully.

- [ ] **Step 4: Inspect the prerendered image contract**

Run: `rg -n 'alt="Scalryx"|width="436"|height="164"' .next/server/app/index.html`

Expected: header and footer markup contains `alt="Scalryx"`, `width="436"`, and `height="164"`; CSS controls rendered width while intrinsic attributes preserve the ratio.

- [ ] **Step 5: Verify the exact asset and patch hygiene**

```powershell
Get-FileHash -LiteralPath public/logo.png -Algorithm SHA256
git diff --check
git status --short
```

Expected: hash is `A3968653C620C09D89A6D9AF45DB7CD8D9A16AB392A37D08A9EFCE310D3543EF`, `git diff --check` has no output, `app/favicon.ico` may remain as the user-owned unstaged change, and no unrelated file is staged.

- [ ] **Step 6: Record any verification-only test correction**

If verification changed the test file, run:

```powershell
git add tests/page-composition.test.mjs
git commit -m "test: verify logo navbar integration"
```

Expected: no empty commit is created when verification required no correction.
