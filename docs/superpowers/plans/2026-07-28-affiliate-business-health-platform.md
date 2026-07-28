# Affiliate Business Health Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current pricing-led Scalryx landing page with an assessment-first SaaS affiliate platform containing four private ten-question business health assessments, deterministic results, newsletter entry points, trust content, resources, videos, and curated vendor recommendations.

**Architecture:** Keep `app/page.tsx` and marketing sections server-rendered. Put assessment data, scoring, recommendations, navigation state, and newsletter validation in pure TypeScript modules; isolate browser interactivity in focused assessment, newsletter, mobile-menu, and theme client boundaries.

**Tech Stack:** Next.js 16.2.12 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4, Lucide React, Node.js 24 built-in test runner.

## Global Constraints

- Public copy is professional English for a global CEO, founder, agency-leader, and operator audience.
- The assessment supports exactly `ecommerce`, `agency`, `saas`, and `service`, with exactly ten questions per business type.
- Question 1 is revenue context only; questions 2–10 score from 0 to 4 and normalize with `Math.round(rawScore / 36 * 100)`.
- Answers live only in React memory; never use localStorage, cookies, server actions, analytics, or network requests for assessment data.
- Newsletter submission validates locally and shows an honest preview success state without transmitting or storing the email.
- No login, pricing plans, fake testimonials, invented Trustpilot rating, fake savings, unavailable discount, AI scoring claim, or paid subscription.
- Keep system-aware persisted light/dark mode and the exact shared content maximum of `90rem` (1440px).
- Body copy is 16px; controls and secondary labels are at least 14px; compact metadata is at least 12px; touch targets are at least 44px.
- Affiliate disclosure appears in footer/legal navigation, not inside recommendation cards.
- Trustpilot, article, and video destinations remain replaceable and do not invent ownership or proof.
- Read relevant guides in `node_modules/next/dist/docs/` before writing Next.js code.

---

## File Structure

- Create `app/assessment/types.ts`: assessment domain types and stable business/category unions.
- Create `app/assessment/questions.ts`: four typed ten-question banks, explicit option scores, risk copy, and next-step copy.
- Create `app/assessment/scoring.ts`: score normalization, category ranking, risk/strength selection, and result assembly.
- Create `app/assessment/recommendations.ts`: vendor catalog and deterministic category-to-vendor mapping.
- Create `app/assessment/state.ts`: pure assessment reducer and guards for selection, navigation, reset confirmation, completion, and restart.
- Create `app/data/site-content.ts`: navigation, audiences, trust pillars, articles, videos, deals, footer, and replaceable destinations.
- Create `app/newsletter/state.ts`: pure email validation and newsletter modal reducer.
- Create `app/components/assessment/business-assessment.tsx`: client coordinator for assessment states.
- Create `app/components/assessment/business-type-step.tsx`: four business-model choices.
- Create `app/components/assessment/question-step.tsx`: accessible radio question UI and navigation.
- Create `app/components/assessment/result-step.tsx`: score, category breakdown, strengths, risks, actions, vendors, newsletter, and restart.
- Create `app/components/newsletter/newsletter-provider.tsx`: shared client context for opening/closing the modal.
- Create `app/components/newsletter/newsletter-trigger.tsx`: reusable modal-opening button.
- Create `app/components/newsletter/newsletter-modal.tsx`: accessible validation and preview-success dialog.
- Create `app/components/layout/announcement-bar.tsx`: top-bar newsletter entry point.
- Modify `app/components/layout/header.tsx`: new navigation without login.
- Modify `app/components/layout/mobile-menu.tsx`: new navigation and semantic theme colors.
- Modify `app/components/layout/footer.tsx`: new company/resources/legal structure and disclosure link.
- Modify `app/components/landing/hero-section.tsx`: executive copy plus real assessment.
- Create `app/components/landing/audience-section.tsx`: four audience cards.
- Create `app/components/landing/trust-section.tsx`: methodology pillars and Trustpilot placeholder.
- Create `app/components/landing/resources-section.tsx`: three article cards.
- Create `app/components/landing/videos-section.tsx`: three non-fabricated video cards.
- Create `app/components/landing/deals-section.tsx`: four replaceable vendor cards with real home-page links.
- Create `app/components/landing/newsletter-section.tsx`: final newsletter CTA.
- Modify `app/page.tsx`: compose the new landing structure.
- Modify `app/layout.tsx`: wrap page content in newsletter provider and update metadata.
- Modify `app/globals.css`: assessment/dialog/card styles and responsive polish while preserving semantic themes and `90rem`.
- Delete obsolete landing/mockup modules after the new page no longer imports them.
- Replace source-contract tests with behavior tests under `tests/assessment-*.test.mjs`, `tests/newsletter.test.mjs`, and `tests/site-content.test.mjs`.

---

### Task 1: Typed Assessment Question Banks

**Files:**

- Create: `app/assessment/types.ts`
- Create: `app/assessment/questions.ts`
- Create: `tests/assessment-data.test.mjs`

**Interfaces:**

- Produces: `BusinessType`, `QuestionCategory`, `AnswerOption`, `AssessmentQuestion`, `QuestionBank`
- Produces: `businessTypes: readonly BusinessType[]`
- Produces: `questionBanks: Record<BusinessType, QuestionBank>`
- Produces: `getQuestionBank(type: BusinessType): QuestionBank`

- [ ] **Step 1: Write the failing question-bank behavior tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  businessTypes,
  getQuestionBank,
  questionBanks,
} from "../app/assessment/questions.ts";

test("every supported business type has one ordered ten-question bank", () => {
  assert.deepEqual(businessTypes, ["ecommerce", "agency", "saas", "service"]);

  for (const type of businessTypes) {
    const bank = getQuestionBank(type);
    assert.equal(bank.businessType, type);
    assert.equal(bank.questions.length, 10);
    assert.deepEqual(
      bank.questions.map((question) => question.position),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    );
    assert.equal(new Set(bank.questions.map((question) => question.id)).size, 10);
  }
});

test("revenue context never carries a health score", () => {
  for (const bank of Object.values(questionBanks)) {
    const [context, ...healthQuestions] = bank.questions;

    assert.equal(context.contextOnly, true);
    assert.equal(context.category, "finance");
    assert.equal(context.options.length, 5);
    assert.equal(context.options.every((option) => option.score === null), true);

    for (const question of healthQuestions) {
      assert.equal(question.contextOnly, false);
      assert.deepEqual(
        question.options.map((option) => option.score),
        [0, 1, 2, 3, 4],
      );
      assert.ok(question.risk.length >= 20);
      assert.ok(question.nextStep.length >= 20);
    }
  }
});

test("question banks preserve the approved entry copy", () => {
  assert.equal(
    questionBanks.ecommerce.questions[0].title,
    "What was your total revenue last month?",
  );
  assert.equal(
    questionBanks.agency.questions[2].title,
    "How much of revenue comes from your largest client?",
  );
  assert.equal(
    questionBanks.saas.questions[8].title,
    "What is your net revenue retention?",
  );
  assert.equal(
    questionBanks.service.questions[6].title,
    "How dependent is delivery on the owner personally?",
  );
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/assessment-data.test.mjs
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `app/assessment/questions.ts`.

- [ ] **Step 3: Define the exact assessment domain types**

Create `app/assessment/types.ts`:

```ts
export type BusinessType = "ecommerce" | "agency" | "saas" | "service";

export type QuestionCategory =
  | "finance"
  | "profitability"
  | "cash"
  | "growth"
  | "retention"
  | "conversion"
  | "inventory"
  | "acquisition"
  | "operations"
  | "risk"
  | "revenue-quality"
  | "sales"
  | "capacity"
  | "delivery"
  | "unit-economics"
  | "product"
  | "resilience"
  | "reputation";

export interface AnswerOption {
  id: string;
  label: string;
  score: 0 | 1 | 2 | 3 | 4 | null;
}

export interface AssessmentQuestion {
  id: string;
  position: number;
  category: QuestionCategory;
  title: string;
  guidance: string;
  contextOnly: boolean;
  options: readonly AnswerOption[];
  risk: string;
  nextStep: string;
}

export interface QuestionBank {
  businessType: BusinessType;
  title: string;
  questions: readonly AssessmentQuestion[];
}
```

- [ ] **Step 4: Implement all four approved question banks**

Create `app/assessment/questions.ts`. Use the forty questions and all answer
labels verbatim from:

```text
docs/superpowers/specs/2026-07-28-affiliate-business-health-platform-design.md
Section: Assessment Question Banks
```

Use stable IDs:

```text
ecommerce-revenue ... ecommerce-cash-runway
agency-revenue ... agency-process-maturity
saas-mrr ... saas-operating-maturity
service-revenue ... service-process-integration
```

Use these context-option IDs so state tests and later integrations remain
stable:

```text
ecommerce: revenue-under-5k, revenue-5-20k, revenue-20-50k, revenue-50-100k, revenue-100k-plus
agency: revenue-under-10k, revenue-10-30k, revenue-30-75k, revenue-75-150k, revenue-150k-plus
saas: mrr-under-1k, mrr-1-10k, mrr-10-50k, mrr-50-200k, mrr-200k-plus
service: revenue-under-5k, revenue-5-20k, revenue-20-50k, revenue-50-100k, revenue-100k-plus
```

For question 1 in each bank, every `score` is `null`, `risk` is `""`, and
`nextStep` is `""`. For questions 2–10, option scores are explicit `0,1,2,3,4`
in displayed order. Write a concise risk and directly related next step for
each scored question; for example:

```ts
{
  id: "ecommerce-net-margin",
  position: 3,
  category: "profitability",
  title: "What was your net profit margin last month?",
  guidance: "Use profit after operating expenses, before owner distributions.",
  contextOnly: false,
  options: [
    { id: "loss", label: "Operating at a loss", score: 0 },
    { id: "under-5", label: "Under 5%", score: 1 },
    { id: "5-10", label: "5–10%", score: 2 },
    { id: "11-20", label: "11–20%", score: 3 },
    { id: "above-20", label: "Above 20%", score: 4 },
  ],
  risk: "Thin or negative net margins leave little room for acquisition mistakes or demand changes.",
  nextStep: "Review contribution margin by product and remove one avoidable operating cost this month.",
}
```

Export:

```ts
export const businessTypes = [
  "ecommerce",
  "agency",
  "saas",
  "service",
] as const satisfies readonly BusinessType[];

export const questionBanks = {
  ecommerce: ecommerceBank,
  agency: agencyBank,
  saas: saasBank,
  service: serviceBank,
} satisfies Record<BusinessType, QuestionBank>;

export function getQuestionBank(type: BusinessType) {
  return questionBanks[type];
}
```

- [ ] **Step 5: Run RED-to-GREEN verification**

Run:

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/assessment-data.test.mjs
& 'C:\Program Files\nodejs\npm.cmd' run lint
```

Expected: all question-bank tests PASS; lint exits cleanly.

- [ ] **Step 6: Commit the domain data**

```powershell
git add app/assessment/types.ts app/assessment/questions.ts tests/assessment-data.test.mjs
git commit -m "feat: add business health question banks"
```

---

### Task 2: Deterministic Scoring and Vendor Recommendations

**Files:**

- Create: `app/assessment/recommendations.ts`
- Create: `app/assessment/scoring.ts`
- Create: `tests/assessment-scoring.test.mjs`

**Interfaces:**

- Consumes: `BusinessType`, `QuestionCategory`, `AssessmentQuestion`, `questionBanks`
- Produces: `AssessmentAnswers = Record<string, string>`
- Produces: `CategoryScore`, `PriorityRisk`, `AssessmentResult`, `VendorRecommendation`
- Produces: `scoreAssessment(type: BusinessType, answers: AssessmentAnswers): AssessmentResult`
- Produces: `getRecommendations(type: BusinessType, categories: readonly QuestionCategory[]): readonly VendorRecommendation[]`

- [ ] **Step 1: Write failing score and recommendation tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { questionBanks } from "../app/assessment/questions.ts";
import {
  getHealthLabel,
  scoreAssessment,
} from "../app/assessment/scoring.ts";

function answersAt(type, healthOptionIndex, revenueOptionIndex = 0) {
  return Object.fromEntries(
    questionBanks[type].questions.map((question, index) => [
      question.id,
      question.options[index === 0 ? revenueOptionIndex : healthOptionIndex].id,
    ]),
  );
}

test("business size context does not change an otherwise identical score", () => {
  assert.equal(
    scoreAssessment("ecommerce", answersAt("ecommerce", 2, 0)).score,
    scoreAssessment("ecommerce", answersAt("ecommerce", 2, 4)).score,
  );
});

test("health answers normalize exactly to the approved boundaries", () => {
  assert.equal(scoreAssessment("saas", answersAt("saas", 0)).score, 0);
  assert.equal(scoreAssessment("saas", answersAt("saas", 1)).score, 25);
  assert.equal(scoreAssessment("saas", answersAt("saas", 2)).score, 50);
  assert.equal(scoreAssessment("saas", answersAt("saas", 3)).score, 75);
  assert.equal(scoreAssessment("saas", answersAt("saas", 4)).score, 100);
});

test("score labels use the approved inclusive ranges", () => {
  const cases = [
    [39, "Critical"],
    [40, "Needs attention"],
    [59, "Needs attention"],
    [60, "Healthy"],
    [79, "Healthy"],
    [80, "Strong"],
  ];

  for (const [score, label] of cases) {
    assert.equal(getHealthLabel(score), label);
  }
});

test("weak categories select stable unique vendors", () => {
  const ecommerce = scoreAssessment("ecommerce", answersAt("ecommerce", 0));
  const agency = scoreAssessment("agency", answersAt("agency", 0));

  assert.deepEqual(
    ecommerce.recommendations.map((item) => item.name),
    ["Shopify", "QuickBooks", "Klaviyo"],
  );
  assert.deepEqual(
    agency.recommendations.map((item) => item.name),
    ["Harvest", "HubSpot"],
  );
  assert.equal(new Set(ecommerce.recommendations.map((item) => item.name)).size, 3);
});

test("incomplete answers are rejected instead of producing a partial score", () => {
  assert.throws(
    () => scoreAssessment("service", {}),
    /Missing answer for service-revenue/,
  );
});
```

- [ ] **Step 2: Run the focused test and verify RED**

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/assessment-scoring.test.mjs
```

Expected: FAIL because scoring and recommendation modules do not exist.

- [ ] **Step 3: Implement the exact vendor catalog and category maps**

Create `app/assessment/recommendations.ts` with the vendor URLs and mappings
from the approved spec. Use:

```ts
export interface VendorRecommendation {
  id: string;
  name: string;
  description: string;
  href: string;
  audience: BusinessType;
}

export function getRecommendations(
  type: BusinessType,
  categories: readonly QuestionCategory[],
): readonly VendorRecommendation[] {
  const selected: string[] = [];

  for (const category of categories) {
    for (const vendorId of categoryVendorIds[type][category] ?? []) {
      if (!selected.includes(vendorId)) selected.push(vendorId);
      if (selected.length === 3) break;
    }
    if (selected.length === 3) break;
  }

  const desiredCount = selected.length >= 3 ? 3 : 2;
  for (const vendorId of businessCatalogs[type]) {
    if (!selected.includes(vendorId)) selected.push(vendorId);
    if (selected.length === desiredCount) break;
  }

  return selected.slice(0, desiredCount).map((id) => vendorsById[id]);
}
```

The catalog order is:

```text
ecommerce: Shopify, QuickBooks, Klaviyo, Gorgias
agency: Harvest, HubSpot, ClickUp
saas: Stripe, HubSpot, Customer.io
service: QuickBooks, Calendly, Jobber
```

Use only the normal vendor home-page URLs in the approved spec.

- [ ] **Step 4: Implement score assembly**

Create `app/assessment/scoring.ts`:

```ts
export type AssessmentAnswers = Record<string, string>;

export interface CategoryScore {
  category: QuestionCategory;
  score: number;
}

export interface PriorityRisk {
  questionId: string;
  category: QuestionCategory;
  title: string;
  explanation: string;
  nextStep: string;
  score: number;
}

export interface AssessmentResult {
  businessType: BusinessType;
  score: number;
  label: "Critical" | "Needs attention" | "Healthy" | "Strong";
  contextAnswer: string;
  categories: readonly CategoryScore[];
  strengths: readonly CategoryScore[];
  risks: readonly PriorityRisk[];
  nextSteps: readonly string[];
  recommendations: readonly VendorRecommendation[];
}

export function getHealthLabel(score: number): AssessmentResult["label"] {
  if (score < 40) return "Critical";
  if (score < 60) return "Needs attention";
  if (score < 80) return "Healthy";
  return "Strong";
}

export function scoreAssessment(
  type: BusinessType,
  answers: AssessmentAnswers,
): AssessmentResult {
  const bank = getQuestionBank(type);
  const resolved = bank.questions.map((question) => {
    const answerId = answers[question.id];
    const option = question.options.find((item) => item.id === answerId);
    if (!option) throw new Error(`Missing answer for ${question.id}`);
    return { question, option };
  });
  const health = resolved.slice(1);
  const rawScore = health.reduce(
    (total, item) => total + (item.option.score ?? 0),
    0,
  );
  const score = Math.round((rawScore / 36) * 100);

  const categoryOrder = [
    ...new Set(health.map((item) => item.question.category)),
  ];
  const categories = categoryOrder.map((category) => {
    const items = health.filter(
      (item) => item.question.category === category,
    );
    const points = items.reduce(
      (total, item) => total + (item.option.score ?? 0),
      0,
    );
    return {
      category,
      score: Math.round((points / (items.length * 4)) * 100),
    };
  });
  const strengths = categories
    .map((item, index) => ({ ...item, index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 2)
    .map(({ index: _index, ...item }) => item);
  const risks = health
    .map((item, index) => ({
      questionId: item.question.id,
      category: item.question.category,
      title: item.question.title,
      explanation: item.question.risk,
      nextStep: item.question.nextStep,
      score: item.option.score ?? 0,
      index,
    }))
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .slice(0, 3)
    .map(({ index: _index, ...item }) => item);

  return {
    businessType: type,
    score,
    label: getHealthLabel(score),
    contextAnswer: resolved[0].option.label,
    categories,
    strengths,
    risks,
    nextSteps: risks.map((risk) => risk.nextStep),
    recommendations: getRecommendations(
      type,
      risks.map((risk) => risk.category),
    ),
  };
}
```

Do not expose mutable helper functions on result objects.

- [ ] **Step 5: Run focused and full verification**

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/assessment-scoring.test.mjs
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
```

Expected: focused and full tests PASS; lint exits cleanly.

- [ ] **Step 6: Commit scoring**

```powershell
git add app/assessment/recommendations.ts app/assessment/scoring.ts tests/assessment-scoring.test.mjs
git commit -m "feat: score assessments and select tools"
```

---

### Task 3: Assessment Navigation State Machine

**Files:**

- Create: `app/assessment/state.ts`
- Create: `tests/assessment-state.test.mjs`

**Interfaces:**

- Produces: `AssessmentState`, `AssessmentAction`
- Produces: `initialAssessmentState`
- Produces: `assessmentReducer(state, action): AssessmentState`
- Produces: `canAdvance(state): boolean`
- Produces: `firstMissingQuestionIndex(state): number`

- [ ] **Step 1: Write failing reducer behavior tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  assessmentReducer,
  canAdvance,
  initialAssessmentState,
} from "../app/assessment/state.ts";

test("selecting a business enters its first question", () => {
  const state = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "ecommerce",
  });
  assert.equal(state.businessType, "ecommerce");
  assert.equal(state.questionIndex, 0);
  assert.equal(state.view, "questions");
});

test("next is blocked until the current question has an answer", () => {
  const selected = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "agency",
  });
  assert.equal(canAdvance(selected), false);
  assert.deepEqual(
    assessmentReducer(selected, { type: "next" }),
    { ...selected, error: "Choose an answer to continue." },
  );
});

test("previous answers survive backward and forward navigation", () => {
  let state = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "saas",
  });
  state = assessmentReducer(state, {
    type: "answer",
    questionId: "saas-mrr",
    optionId: "mrr-under-1k",
  });
  state = assessmentReducer(state, { type: "next" });
  state = assessmentReducer(state, { type: "previous" });
  assert.equal(state.answers["saas-mrr"], "mrr-under-1k");
});

test("changing business with answers requires explicit reset confirmation", () => {
  const answered = {
    ...initialAssessmentState,
    businessType: "ecommerce",
    view: "questions",
    answers: { "ecommerce-revenue": "revenue-under-5k" },
  };
  const pending = assessmentReducer(answered, {
    type: "request-business-change",
    businessType: "agency",
  });
  assert.equal(pending.pendingBusinessType, "agency");
  assert.deepEqual(pending.answers, answered.answers);

  const changed = assessmentReducer(pending, { type: "confirm-business-change" });
  assert.equal(changed.businessType, "agency");
  assert.deepEqual(changed.answers, {});
});

test("restart removes every answer and returns to business selection", () => {
  const restarted = assessmentReducer(
    {
      ...initialAssessmentState,
      view: "results",
      businessType: "service",
      answers: { "service-revenue": "revenue-under-5k" },
    },
    { type: "restart" },
  );
  assert.deepEqual(restarted, initialAssessmentState);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/assessment-state.test.mjs
```

Expected: FAIL because `state.ts` does not exist.

- [ ] **Step 3: Implement the reducer and completion guard**

Use:

```ts
export type AssessmentView = "business-type" | "questions" | "results";

export interface AssessmentState {
  view: AssessmentView;
  businessType: BusinessType | null;
  pendingBusinessType: BusinessType | null;
  questionIndex: number;
  answers: AssessmentAnswers;
  error: string;
}

export const initialAssessmentState: AssessmentState = {
  view: "business-type",
  businessType: null,
  pendingBusinessType: null,
  questionIndex: 0,
  answers: {},
  error: "",
};
```

Actions:

```text
select-business
answer
next
previous
request-business-change
cancel-business-change
confirm-business-change
complete
restart
```

`previous` at question index 0 returns to `business-type`. `complete` finds the
first missing answer; if one exists it selects that question and sets the
inline error. Only a complete bank enters `results`.

- [ ] **Step 4: Run focused and full verification**

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/assessment-state.test.mjs
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
```

Expected: all tests PASS and lint exits cleanly.

- [ ] **Step 5: Commit assessment state**

```powershell
git add app/assessment/state.ts tests/assessment-state.test.mjs
git commit -m "feat: add assessment navigation state"
```

---

### Task 4: Interactive Assessment UI and Hero

**Files:**

- Create: `app/components/assessment/business-assessment.tsx`
- Create: `app/components/assessment/business-type-step.tsx`
- Create: `app/components/assessment/question-step.tsx`
- Create: `app/components/assessment/result-step.tsx`
- Modify: `app/components/landing/hero-section.tsx`

**Interfaces:**

- Consumes: `questionBanks`, `assessmentReducer`, `scoreAssessment`
- Produces: `BusinessAssessment(): JSX.Element`
- Produces: `BusinessTypeStep`, `QuestionStep`, `ResultStep`

- [ ] **Step 1: Extend reducer tests for the exact UI transitions**

Add tests proving:

```js
import { questionBanks } from "../app/assessment/questions.ts";

function answerEveryQuestion(type) {
  let state = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: type,
  });

  for (const question of questionBanks[type].questions) {
    state = assessmentReducer(state, {
      type: "answer",
      questionId: question.id,
      optionId: question.options[0].id,
    });
  }

  return state;
}

test("the tenth answered question completes into results", () => {
  const complete = assessmentReducer(answerEveryQuestion("ecommerce"), {
    type: "complete",
  });

  assert.equal(complete.view, "results");
  assert.equal(complete.error, "");
});

test("completion returns to the first missing question", () => {
  let state = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "service",
  });
  const questions = questionBanks.service.questions;

  for (const [index, question] of questions.entries()) {
    if (index === 3) continue;
    state = assessmentReducer(state, {
      type: "answer",
      questionId: question.id,
      optionId: question.options[0].id,
    });
  }

  const incomplete = assessmentReducer(state, { type: "complete" });
  assert.equal(incomplete.view, "questions");
  assert.equal(incomplete.questionIndex, 3);
  assert.equal(incomplete.error, "Answer this question to see your result.");
});
```

Run the focused test and confirm the first new assertion fails if `complete`
does not yet enforce the expected transition.

- [ ] **Step 2: Implement the client coordinator**

`business-assessment.tsx`:

```tsx
"use client";

export function BusinessAssessment() {
  const [state, dispatch] = useReducer(
    assessmentReducer,
    initialAssessmentState,
  );
  const result =
    state.view === "results" && state.businessType
      ? scoreAssessment(state.businessType, state.answers)
      : null;

  function selectBusiness(businessType: BusinessType) {
    dispatch({
      type:
        Object.keys(state.answers).length > 0
          ? "request-business-change"
          : "select-business",
      businessType,
    });
  }

  return (
    <section aria-label="Business health assessment">
      {state.view === "business-type" && (
        <BusinessTypeStep
          selectedType={state.businessType}
          onSelect={selectBusiness}
        />
      )}
      {state.view === "questions" && state.businessType && (
        <QuestionStep
          businessType={state.businessType}
          error={state.error}
          question={questionBanks[state.businessType].questions[state.questionIndex]}
          questionIndex={state.questionIndex}
          selectedOptionId={
            state.answers[
              questionBanks[state.businessType].questions[state.questionIndex].id
            ] ?? ""
          }
          onAnswer={(questionId, optionId) =>
            dispatch({ type: "answer", questionId, optionId })
          }
          onNext={() =>
            dispatch({
              type: state.questionIndex === 9 ? "complete" : "next",
            })
          }
          onPrevious={() => dispatch({ type: "previous" })}
        />
      )}
      {result && (
        <ResultStep
          result={result}
          onRestart={() => dispatch({ type: "restart" })}
        />
      )}
      {state.pendingBusinessType && (
        <div aria-labelledby="change-business-title" role="alertdialog">
          <h3 id="change-business-title">Start a different assessment?</h3>
          <p>Your current answers will be cleared.</p>
          <button
            onClick={() => dispatch({ type: "cancel-business-change" })}
            type="button"
          >
            Keep my answers
          </button>
          <button
            onClick={() => dispatch({ type: "confirm-business-change" })}
            type="button"
          >
            Clear and continue
          </button>
        </div>
      )}
    </section>
  );
}
```

Keep all answers in reducer memory. Do not add persistence effects.

- [ ] **Step 3: Implement accessible business and question steps**

Required semantics:

```text
fieldset + legend for business choices and answer choices
real radio inputs for five answers
aria-current/aria-valuenow progress
aria-describedby for guidance and inline error
44px minimum choice/button targets
Previous and Next question buttons
Step 1 of 2 on business selection
Question N of 10 and category on question state
```

Use the four exact choice labels/descriptions from the spec and stable initials
`EC`, `AG`, `SA`, `SB`.

- [ ] **Step 4: Implement the result UI**

Render:

```text
overall score /100
health label
directional-guidance disclaimer
category progress rows with numeric equivalents
two strengths
three priority risks
three one-to-one next steps
two or three vendor recommendations
Join the newsletter trigger slot
Restart assessment
```

External vendor links use `target="_blank"` and
`rel="noopener noreferrer"`.

Until Task 5 connects the shared modal, render the result newsletter action as
`<a href="#newsletter">Join the newsletter</a>`.

- [ ] **Step 5: Replace the hero with approved assessment-first copy**

Use exact copy from the spec and this structure:

```tsx
<section id="home">
  <SectionShell className="grid min-w-0 gap-10 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start xl:gap-16">
    <div>{/* eyebrow, heading, body, three trust points */}</div>
    <BusinessAssessment />
  </SectionShell>
</section>
```

- [ ] **Step 6: Verify assessment UI**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

Expected: tests, lint, and Next.js production build PASS.

- [ ] **Step 7: Commit assessment UI**

```powershell
git add app/components/assessment app/components/landing/hero-section.tsx tests/assessment-state.test.mjs
git commit -m "feat: add interactive business health assessment"
```

---

### Task 5: Shared Newsletter Modal

**Files:**

- Create: `app/newsletter/state.ts`
- Create: `app/components/newsletter/newsletter-provider.tsx`
- Create: `app/components/newsletter/newsletter-trigger.tsx`
- Create: `app/components/newsletter/newsletter-modal.tsx`
- Create: `app/components/layout/announcement-bar.tsx`
- Create: `app/components/landing/newsletter-section.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/components/assessment/result-step.tsx`
- Test: `tests/newsletter.test.mjs`

**Interfaces:**

- Produces: `validateEmail(email): string`
- Produces: `newsletterReducer`, `initialNewsletterState`
- Produces: `NewsletterProvider`, `useNewsletter`, `NewsletterTrigger`

- [ ] **Step 1: Write failing validation and state tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  initialNewsletterState,
  newsletterReducer,
  validateEmail,
} from "../app/newsletter/state.ts";

test("newsletter email validation rejects missing and malformed values", () => {
  assert.equal(validateEmail(""), "Enter your email address.");
  assert.equal(validateEmail("founder@"), "Enter a valid email address.");
  assert.equal(validateEmail(" founder@example.com "), "");
});

test("valid submission shows an honest non-transmitted success state", () => {
  const open = newsletterReducer(initialNewsletterState, { type: "open" });
  const typed = newsletterReducer(open, {
    type: "change-email",
    email: "founder@example.com",
  });
  const submitted = newsletterReducer(typed, { type: "submit" });

  assert.equal(submitted.status, "success");
  assert.equal(submitted.email, "");
  assert.equal(submitted.message, "Thanks — this preview form is ready, but no address has been sent.");
});

test("closing resets private email state", () => {
  const state = newsletterReducer(
    { ...initialNewsletterState, open: true, email: "ceo@example.com" },
    { type: "close" },
  );
  assert.deepEqual(state, initialNewsletterState);
});
```

- [ ] **Step 2: Run focused test and verify RED**

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/newsletter.test.mjs
```

Expected: FAIL because `app/newsletter/state.ts` does not exist.

- [ ] **Step 3: Implement pure newsletter state**

State:

```ts
interface NewsletterState {
  open: boolean;
  email: string;
  error: string;
  status: "idle" | "success";
  message: string;
}
```

Actions: `open`, `close`, `change-email`, `submit`, `reset-success`.
Validation trims input, uses one `@`, and requires non-empty text on both sides
plus a dot in the domain. Do not transmit or persist.

- [ ] **Step 4: Implement provider, trigger, and modal**

`NewsletterProvider` wraps `children`, owns the reducer, and renders one modal.
`NewsletterTrigger` renders a button with configurable class/name. The modal:

```text
role="dialog"
aria-modal="true"
heading and description ids
initial focus on email or close control
Tab/Shift+Tab focus trap
Escape close
backdrop close only when target === currentTarget
focus restoration to the opening trigger
error linked with aria-describedby
success copy that states no address was sent
body overflow locked while open and restored on close
```

- [ ] **Step 5: Add both newsletter entry points**

Announcement:

```text
Join us today!
Join now
```

Final CTA uses the exact heading, body, and `Join the newsletter` action from
the spec.

Replace the result step’s temporary `#newsletter` link with
`<NewsletterTrigger>Join the newsletter</NewsletterTrigger>`.

Wrap layout body content:

```tsx
<NewsletterProvider>{children}</NewsletterProvider>
```

Update metadata:

```text
title: Scalryx — Business Health Assessment
description: Private business health assessments, practical growth guidance, and curated SaaS recommendations for founders and operators.
```

- [ ] **Step 6: Verify and commit**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
git add app/newsletter app/components/newsletter app/components/layout/announcement-bar.tsx app/components/landing/newsletter-section.tsx app/layout.tsx tests/newsletter.test.mjs
git commit -m "feat: add shared newsletter experience"
```

---

### Task 6: Marketing Content Data and Landing Sections

**Files:**

- Create: `app/data/site-content.ts`
- Create: `tests/site-content.test.mjs`
- Create: `app/components/landing/audience-section.tsx`
- Create: `app/components/landing/trust-section.tsx`
- Create: `app/components/landing/resources-section.tsx`
- Create: `app/components/landing/videos-section.tsx`
- Create: `app/components/landing/deals-section.tsx`

**Interfaces:**

- Produces: `navItems`, `audiences`, `trustPillars`, `articles`, `videos`, `deals`, `footerGroups`
- Each destination is `string | null`; null content renders non-clickable.

- [ ] **Step 1: Write failing content-integrity tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  articles,
  audiences,
  deals,
  navItems,
  trustProfileUrl,
  videos,
} from "../app/data/site-content.ts";

test("landing content has the approved audience and resource counts", () => {
  assert.equal(audiences.length, 4);
  assert.deepEqual(
    audiences.map((item) => item.title),
    ["Ecommerce Leaders", "Agency Owners", "SaaS Founders", "Service Business Owners"],
  );
  assert.equal(articles.length, 3);
  assert.equal(videos.length, 3);
  assert.equal(deals.length, 4);
});

test("unprovided proof and media destinations stay explicitly absent", () => {
  assert.equal(trustProfileUrl, null);
  assert.equal(articles.every((item) => item.href === null), true);
  assert.equal(videos.every((item) => item.href === null), true);
});

test("deal cards use normal secure vendor destinations without fake savings", () => {
  for (const deal of deals) {
    assert.match(deal.href, /^https:\/\//);
    assert.doesNotMatch(`${deal.title} ${deal.offer}`, /\$\d+|%\s*off/i);
  }
});

test("header navigation omits login, pricing, and deals navigation", () => {
  assert.deepEqual(
    navItems.map((item) => item.label),
    ["Home", "Assessment", "Who We Help", "Resources", "About"],
  );
});
```

- [ ] **Step 2: Run focused test and verify RED**

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/site-content.test.mjs
```

Expected: FAIL because `site-content.ts` does not exist.

- [ ] **Step 3: Implement typed content data**

Use exact copy from the spec for:

```text
4 audience cards
3 trust pillars
3 article cards
3 video cards
4 deals
final footer groups
Trustpilot placeholder
```

Article and video `href` values are `null`. Deal destinations:

```text
Ecommerce / Shopify / https://www.shopify.com/
Agency / ClickUp / https://clickup.com/
SaaS / Stripe / https://stripe.com/
Service / Jobber / https://getjobber.com/
```

Use offer label `Explore current plans` and do not invent a discount.

- [ ] **Step 4: Implement server-rendered sections**

Each section:

```text
uses SectionShell
has a semantic section id matching navigation
uses h2 followed by h3 card headings
renders null article/video URLs as cards without anchors
renders deals as external anchors with noopener noreferrer
uses Lucide icons or CSS thumbnail treatment instead of fabricated imagery
```

Trustpilot area renders `Trustpilot reviews coming here` until
`trustProfileUrl` is non-null.

- [ ] **Step 5: Run focused/full checks and commit**

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/site-content.test.mjs
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
git add app/data/site-content.ts app/components/landing tests/site-content.test.mjs
git commit -m "feat: add affiliate platform content sections"
```

---

### Task 7: Header, Footer, Page Composition, and Obsolete-Code Removal

**Files:**

- Modify: `app/components/layout/header.tsx`
- Modify: `app/components/layout/mobile-menu.tsx`
- Modify: `app/components/layout/footer.tsx`
- Modify: `app/page.tsx`
- Delete: `app/data/landing.ts`
- Delete: `app/components/landing/stats-strip.tsx`
- Delete: `app/components/landing/features-section.tsx`
- Delete: `app/components/landing/how-it-works.tsx`
- Delete: `app/components/landing/product-showcase.tsx`
- Delete: `app/components/landing/pricing-section.tsx`
- Delete: `app/components/mockups/audit-form.tsx`
- Delete: `app/components/mockups/dashboard.tsx`
- Delete: `app/components/mockups/report.tsx`
- Delete: `app/components/ui/button-link.tsx`
- Delete: `app/components/ui/icon-tile.tsx`
- Delete: `tests/landing-structure.test.mjs`

**Interfaces:**

- Consumes: `AnnouncementBar`, `navItems`, all new landing sections, newsletter trigger, theme toggle.
- Produces the final page section order from the approved spec.

- [ ] **Step 1: Update the layout shell**

Render:

```tsx
<>
  <AnnouncementBar />
  <Header />
  <main>
    <HeroSection />
    <AudienceSection />
    <TrustSection />
    <ResourcesSection />
    <VideosSection />
    <DealsSection />
    <NewsletterSection />
  </main>
  <Footer />
</>
```

- [ ] **Step 2: Replace header actions**

Desktop header contains logo, `navItems`, theme toggle, and no login/audit CTA.
Mobile header contains theme toggle plus mobile menu. Preserve one theme toggle
instance and 44px controls.

- [ ] **Step 3: Replace footer**

Render the spec’s positioning copy, social placeholders, Resources/Company/
Legal groups, contact placeholder, newsletter trigger, and
`Affiliate Disclosure`. Footer placeholder links stay internal and do not open
broken external destinations. The disclosure link targets a footer paragraph
with `id="affiliate-disclosure"` and this copy:

```text
Scalryx may earn a commission from qualifying purchases made through some links, at no extra cost to you.
```

- [ ] **Step 4: Remove obsolete page modules**

Delete only the listed old landing, mockup, data, and source-contract test
files after `rg` confirms they have no remaining imports.

Run:

```powershell
rg -n "StatsStrip|FeaturesSection|HowItWorks|ProductShowcase|PricingSection|DashboardMockup|ReportMockup|AuditFormMockup|data/landing" app
```

Expected before deletion: no live imports from `app/page.tsx` or new sections.

- [ ] **Step 5: Verify and commit composition**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
git diff --check
git add -A app tests
git commit -m "feat: compose affiliate assessment landing page"
```

---

### Task 8: Responsive Theme Polish and Rendered Verification

**Files:**

- Modify: `app/globals.css`
- Modify only failing components identified during rendered verification.

**Interfaces:**

- Preserves semantic light/dark token names and `.site-shell` at `90rem`.
- Requires no horizontal overflow at 390px, 768px, 1440px, or 1600px.

- [ ] **Step 1: Add focused global presentation rules**

Add only reusable behavior not expressible cleanly as utilities:

```text
modal backdrop/dialog transition
assessment progress fill
score ring using --blue and --score-track
result category bars
reduced-motion overrides
```

Do not replace semantic tokens with dark-only hex values.

- [ ] **Step 2: Run automated verification**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
git diff --check
```

Expected: all commands exit 0 with no warnings attributable to application code.

- [ ] **Step 3: Start the production server**

```powershell
Start-Process -FilePath 'C:\Program Files\nodejs\npm.cmd' -ArgumentList @('run','start','--','-p','3000') -WorkingDirectory (Get-Location) -WindowStyle Hidden
```

- [ ] **Step 4: Verify the rendered matrix in the Browser workflow**

Inspect light and dark at:

```text
390x844
768x1024
1440x1000
1600x1000
```

At each viewport confirm:

```text
document.documentElement.scrollWidth <= clientWidth
.site-shell max-width computes to 1440px
body copy >=16px
controls/secondary labels >=14px
compact metadata >=12px
announcement/header controls do not overlap
assessment radio options and navigation are fully visible
modal stays within viewport and traps focus
all cards and placeholders are readable in both themes
```

- [ ] **Step 5: Exercise complete product behavior**

Complete one path for each business type and verify:

```text
10 questions only
no next without answer
previous preserves answers
business change confirms reset
score/result appears only after complete answers
results show 2 strengths, 3 risks, 3 steps, 2–3 unique vendors
restart clears answers
refresh clears answers
announcement and final CTA open same modal
invalid email errors
valid email says no address was sent
Escape/backdrop/close work and focus returns to trigger
```

- [ ] **Step 6: Correct observed defects test-first**

For a logic defect, add a failing behavior test to the matching assessment or
newsletter test file. For a visual-only defect, record the exact viewport,
theme, selector, and computed failure, make the smallest CSS/component change,
then re-run the affected viewport plus automated checks.

- [ ] **Step 7: Commit final polish**

If files changed:

```powershell
git add app tests
git commit -m "fix: polish assessment landing experience"
```

Do not create an empty commit.
