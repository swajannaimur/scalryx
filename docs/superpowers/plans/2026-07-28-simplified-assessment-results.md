# Simplified Assessment Results Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the four requested detailed analysis blocks from the rendered
assessment result while retaining the score and conversion actions.

**Architecture:** Make a presentation-only reduction in `ResultStep`. Domain
scoring stays unchanged so no assessment, recommendation, or state behavior is
affected. Protect the reduced result contract with a source-level component
test because the component’s newsletter context makes isolated server
rendering unnecessarily heavy for this structural removal.

**Tech Stack:** React 19, Next.js 16.2.12, TypeScript, Node test runner.

## Global Constraints

- Remove Category breakdown, Strongest/Relative areas, Priority risks, and
  Practical next steps from the DOM.
- Retain score, health label, revenue context, disclaimer, tools, newsletter,
  and restart.
- Do not change scoring, result types, reducer behavior, or recommendations.
- Preserve the user’s existing uncommitted design-specification edit.

---

### Task 1: Reduce the Result Component

**Files:**

- Modify: `app/components/assessment/result-step.tsx`
- Modify: `tests/page-composition.test.mjs`

**Interfaces:**

- Consumes: `AssessmentResult` and `NewsletterTrigger`
- Produces: the existing `ResultStep` component with a shorter DOM

- [ ] Add a failing test that reads `result-step.tsx`, asserts the four removed
  headings are absent, and asserts `Business health score`,
  `Tools worth considering`, `Join the newsletter`, and
  `Restart assessment` remain.
- [ ] Run `node --test tests/page-composition.test.mjs` and confirm it fails
  because the removed headings are still present.
- [ ] Delete the four rendered sections and remove now-unused
  `getStrengthsPresentation` and `displayCategory` code from `result-step.tsx`.
- [ ] Run the focused test and confirm it passes.
- [ ] Run `npm test`, `npm run lint`, `npm run build`, and `git diff --check`.
- [ ] Commit with `fix: simplify assessment results`.

