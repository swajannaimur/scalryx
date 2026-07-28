# Dark-Only Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove light mode and ship the existing premium dark palette as the
only site theme.

**Architecture:** Collapse the dark CSS override into `:root`, remove the
theme client/runtime boundary, and simplify the root layout and header. Delete
theme-specific files and replace their tests with a dark-only structural
contract.

**Tech Stack:** Next.js 16.2.12, React 19, TypeScript, Tailwind CSS 4, Node test runner.

## Global Constraints

- No theme toggle or light-mode activation path remains.
- Dark tokens are defined directly in `:root`.
- Assessment, newsletter, content, navigation, and responsive behavior remain unchanged.
- Header controls retain 44×44px minimum targets.
- Preserve the existing uncommitted design-specification edit.

---

### Task 1: Collapse to Dark-Only Mode

**Files:**

- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `app/components/layout/header.tsx`
- Delete: `app/components/theme/theme-state.ts`
- Delete: `app/components/theme/theme-toggle.tsx`
- Delete: `tests/theme-accessibility.test.mjs`
- Modify: `tests/page-composition.test.mjs`

**Interfaces:**

- Produces: a static dark-only root layout and header.
- Removes: all theme state, toggle, preference, and system-sync interfaces.

- [ ] Update `tests/page-composition.test.mjs` with a failing dark-only contract
  that rejects `ThemeToggle`, theme initializer imports, `[data-theme]`,
  `prefers-color-scheme`, and light-mode labels while requiring the dark root
  background token.
- [ ] Run the focused test and confirm it fails against the current dual-theme implementation.
- [ ] Move the dark token values into `:root` and delete the theme override.
- [ ] Remove the initializer script from `app/layout.tsx` and the toggle from the header.
- [ ] Delete the two theme modules and their dedicated test file after `rg`
  confirms no remaining imports.
- [ ] Run the focused test, full suite, lint, production build, stale-reference
  scan, and `git diff --check`.
- [ ] Commit with `fix: ship dark only theme`.

