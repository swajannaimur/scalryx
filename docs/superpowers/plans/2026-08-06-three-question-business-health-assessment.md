# Three-Question Business Health Assessment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Replace every ten-question business assessment with three business-specific health questions that produce an honest Profit, Average, or Loss status plus a 0–100 health score.

**Architecture:** Keep the existing question-bank, reducer, and result pipeline, but make the question model fully scored and remove the obsolete revenue-context branch. Determine operating status from the first profitability answer while normalizing the overall score across all three questions. Pass the selected bank length through the UI so progress and completion never depend on hard-coded ten-step constants.

**Tech Stack:** TypeScript, React 19, Next.js 16.2.12, Tailwind CSS 4, Node built-in test runner.

## Global Constraints

- Each of ecommerce, agency, SaaS, and service contains exactly three scored questions.
- Status is Loss for profitability scores 0–1, Average for score 2, and Profit for scores 3–4.
- Health score is round((sum of all three option scores / 12) × 100).
- The result keeps its 0–100 score, recommendations, disclaimer, newsletter CTA, and restart control.
- Question count, progress, and final-step detection are derived from bank length.
- Preserve navigation, answer persistence, business-change confirmation, focus management, restart, and browser-session privacy.
- Use the exact question and option copy in the approved design specification.
- Do not add dependencies, persistence, accounts, analytics, or unrelated landing-page changes.

---

## File Map

- Modify app/assessment/questions.ts: define the four exact three-question banks.
- Modify app/assessment/types.ts: make every option scored and remove context-only question state.
- Modify app/assessment/scoring.ts: derive status from Question 1 and normalize the three-question score.
- Modify app/assessment/state.ts only if a failing reducer test exposes a hard-coded assumption.
- Modify app/components/assessment/business-assessment.tsx: derive completion from selected bank length.
- Modify app/components/assessment/question-step.tsx: render dynamic totals and progress.
- Modify app/components/assessment/result-step.tsx: render the three new statuses and remove revenue context.
- Modify app/components/assessment/business-type-step.tsx: promise three tailored questions.
- Modify app/data/hero-content.ts: change the time and assessment promise.
- Modify tests/assessment-data.test.mjs: lock exact bank length, order, copy, and scored options.
- Modify tests/assessment-scoring.test.mjs: lock status and 0–100 score behavior.
- Modify tests/assessment-state.test.mjs: lock completion after three questions.
- Modify tests/page-composition.test.mjs: lock dynamic UI and revised copy.

---

### Task 1: Replace the Question and Scoring Contract

**Files:**
- Modify: app/assessment/questions.ts
- Modify: app/assessment/types.ts
- Modify: app/assessment/scoring.ts
- Test: tests/assessment-data.test.mjs
- Test: tests/assessment-scoring.test.mjs

**Interfaces:**
- Produces: questionBanks with exactly three AssessmentQuestion records per BusinessType.
- Produces: AnswerOption.score as 0 | 1 | 2 | 3 | 4.
- Produces: getOperatingStatus(profitabilityScore: number): AssessmentResult["label"].
- Produces: AssessmentResult.label as "Loss" | "Average" | "Profit", with no contextAnswer field.
- Consumed later by: state reducer, BusinessAssessment, QuestionStep, and ResultStep.

- [ ] **Step 1: Write failing question-bank tests**

Replace the ten-question expectations in tests/assessment-data.test.mjs with assertions that each bank:

~~~js
for (const type of businessTypes) {
  const bank = questionBanks[type];
  assert.equal(bank.questions.length, 3);
  assert.deepEqual(bank.questions.map((question) => question.position), [1, 2, 3]);
  assert.ok(bank.questions.every((question) => question.options.length === 5));
  assert.ok(
    bank.questions.every((question) =>
      question.options.every((option, index) => option.score === index),
    ),
  );
}
~~~

Add one exact title matrix so each business type is demonstrably individual:

~~~js
const approvedTitles = {
  ecommerce: [
    "What was your net profit margin last month?",
    "How is revenue trending across the last three months?",
    "How reliably can cash cover inventory and normal operating commitments?",
  ],
  agency: [
    "What is the agency's current net profit margin?",
    "How healthy is paid team utilization without overloading delivery?",
    "How much operating runway does the agency have?",
  ],
  saas: [
    "What is the company's current operating profit or loss position?",
    "How is monthly recurring revenue trending?",
    "How much operating runway does the company have?",
  ],
  service: [
    "What is the business's current net profit margin?",
    "How much of next month's available service capacity is already booked?",
    "How reliably are invoices and customer balances collected?",
  ],
};
~~~

Assert the exact option labels from the approved specification, not only the titles.

- [ ] **Step 2: Write failing status and score tests**

In tests/assessment-scoring.test.mjs, import getOperatingStatus and assert:

~~~js
assert.equal(getOperatingStatus(0), "Loss");
assert.equal(getOperatingStatus(1), "Loss");
assert.equal(getOperatingStatus(2), "Average");
assert.equal(getOperatingStatus(3), "Profit");
assert.equal(getOperatingStatus(4), "Profit");
~~~

Use a helper that selects the same option index for all three questions:

~~~js
function answersAt(type, optionIndex) {
  return Object.fromEntries(
    questionBanks[type].questions.map((question) => [
      question.id,
      question.options[optionIndex].id,
    ]),
  );
}

assert.equal(scoreAssessment("ecommerce", answersAt("ecommerce", 0)).score, 0);
assert.equal(scoreAssessment("agency", answersAt("agency", 2)).score, 50);
assert.equal(scoreAssessment("saas", answersAt("saas", 4)).score, 100);
~~~

Add a mixed-answer test proving status comes from Question 1 rather than the blended score:

~~~js
const lossWithStrongSignals = {
  ...answersAt("ecommerce", 4),
  [questionBanks.ecommerce.questions[0].id]:
    questionBanks.ecommerce.questions[0].options[0].id,
};
const result = scoreAssessment("ecommerce", lossWithStrongSignals);
assert.equal(result.label, "Loss");
assert.equal(result.score, 67);
assert.equal("contextAnswer" in result, false);
~~~

Keep the existing incomplete-answer rejection, stable ranking, immutability, and deterministic recommendation tests, adapting only their three-question fixtures.

- [ ] **Step 3: Run the focused tests and verify RED**

Run:

~~~powershell
node --test tests/assessment-data.test.mjs tests/assessment-scoring.test.mjs
~~~

Expected: failures show banks still contain ten questions, getOperatingStatus is missing, old labels remain, and score normalization still assumes 36 points.

- [ ] **Step 4: Implement the exact three-question banks**

In app/assessment/types.ts:

~~~ts
export interface AnswerOption {
  id: string;
  label: string;
  score: 0 | 1 | 2 | 3 | 4;
}

export interface AssessmentQuestion {
  id: string;
  position: number;
  category: QuestionCategory;
  title: string;
  guidance: string;
  options: readonly AnswerOption[];
  risk: string;
  nextStep: string;
}
~~~

In app/assessment/questions.ts, remove contextOptions and contextQuestion. Keep one healthQuestion factory that creates five scored options. Replace every bank with the exact three questions, categories, option labels, guidance, risks, and next steps from the specification. Use positions 1, 2, and 3.

- [ ] **Step 5: Implement direct status and dynamic score normalization**

In app/assessment/scoring.ts:

~~~ts
export interface AssessmentResult {
  businessType: BusinessType;
  score: number;
  label: "Loss" | "Average" | "Profit";
  categories: readonly CategoryScore[];
  strengths: readonly CategoryScore[];
  risks: readonly PriorityRisk[];
  nextSteps: readonly string[];
  recommendations: readonly VendorRecommendation[];
}

export function getOperatingStatus(
  profitabilityScore: number,
): AssessmentResult["label"] {
  if (profitabilityScore <= 1) return "Loss";
  if (profitabilityScore === 2) return "Average";
  return "Profit";
}
~~~

Resolve every question as a health item. Calculate:

~~~ts
const maximumScore = resolved.length * 4;
const rawScore = resolved.reduce((total, item) => total + item.option.score, 0);
const score = Math.round((rawScore / maximumScore) * 100);
const label = getOperatingStatus(resolved[0].option.score);
~~~

Build categories, strengths, risks, next steps, and recommendations from resolved rather than resolved.slice(1). Remove contextAnswer from the returned object.

- [ ] **Step 6: Run the focused tests and verify GREEN**

Run:

~~~powershell
node --test tests/assessment-data.test.mjs tests/assessment-scoring.test.mjs
~~~

Expected: all question-data and scoring tests pass.

- [ ] **Step 7: Commit Task 1**

~~~powershell
git add app/assessment/questions.ts app/assessment/types.ts app/assessment/scoring.ts tests/assessment-data.test.mjs tests/assessment-scoring.test.mjs
git commit -m "feat: reduce business health scoring to three questions"
~~~

---

### Task 2: Make Navigation and Progress Bank-Length-Aware

**Files:**
- Modify: app/components/assessment/business-assessment.tsx
- Modify: app/components/assessment/question-step.tsx
- Modify if required by a failing test: app/assessment/state.ts
- Test: tests/assessment-state.test.mjs
- Test: tests/page-composition.test.mjs

**Interfaces:**
- Consumes: questionBanks[type].questions.length from Task 1.
- Produces: QuestionStep questionCount: number prop.
- Preserves: assessmentReducer action names and navigation semantics.

- [ ] **Step 1: Write failing reducer tests for three-step completion**

Update tests/assessment-state.test.mjs to answer the selected bank by iterating its actual questions. Assert:

~~~js
const complete = assessmentReducer(answerEveryQuestion("ecommerce"), {
  type: "complete",
});
assert.equal(complete.view, "results");
assert.equal(questionBanks.ecommerce.questions.length, 3);
~~~

Replace the tenth-question test with:

~~~js
test("the third answered question completes into results", () => {
  const complete = assessmentReducer(answerEveryQuestion("ecommerce"), {
    type: "complete",
  });
  assert.equal(complete.view, "results");
  assert.equal(complete.error, "");
});
~~~

Update the corrupted-index assertion so an index of 99 clamps to 2. Keep tests for missing answers, previous navigation, answer persistence, restart, and business-change confirmation.

- [ ] **Step 2: Write failing source-contract tests for dynamic UI**

In tests/page-composition.test.mjs, assert the assessment components include questionCount and bank-length derivation, and reject old constants:

~~~js
assert.match(businessAssessment, /questions\.length/);
assert.match(questionStep, /questionCount/);
assert.match(questionStep, /questionNumber \/ questionCount/);
assert.doesNotMatch(businessAssessment, /questionIndex === 9/);
assert.doesNotMatch(questionStep, /of 10|aria-valuemax=\{10\}|questionNumber \* 10/);
~~~

- [ ] **Step 3: Run the focused tests and verify RED**

Run:

~~~powershell
node --test tests/assessment-state.test.mjs tests/page-composition.test.mjs
~~~

Expected: reducer fixtures still expect ten items, BusinessAssessment still completes at index 9, and QuestionStep still renders a ten-question progress model.

- [ ] **Step 4: Implement dynamic completion**

In app/components/assessment/business-assessment.tsx:

~~~ts
const selectedBank = state.businessType ? questionBanks[state.businessType] : null;
const questionCount = selectedBank?.questions.length ?? 0;
const currentQuestion = selectedBank?.questions[state.questionIndex] ?? null;
~~~

Pass questionCount to QuestionStep and dispatch complete when:

~~~tsx
onNext={() =>
  dispatch({
    type: state.questionIndex === questionCount - 1 ? "complete" : "next",
  })
}
~~~

- [ ] **Step 5: Implement dynamic progress**

Add questionCount to QuestionStepProps and replace every ten-step constant:

~~~tsx
const isFinalQuestion = questionNumber === questionCount;

<p>Question {questionNumber} of {questionCount}</p>

<div
  aria-label={
    "Assessment progress: question " +
    questionNumber +
    " of " +
    questionCount
  }
  aria-valuemax={questionCount}
  aria-valuemin={1}
  aria-valuenow={questionNumber}
>
  <div
    style={{
      "--assessment-progress": (questionNumber / questionCount) * 100 + "%",
    } as React.CSSProperties}
  />
</div>
~~~

Keep the existing button labels and show “See results →” on Question 3.

- [ ] **Step 6: Run the focused tests and verify GREEN**

Run:

~~~powershell
node --test tests/assessment-state.test.mjs tests/page-composition.test.mjs
~~~

Expected: all state and composition tests pass.

- [ ] **Step 7: Commit Task 2**

~~~powershell
git add app/components/assessment/business-assessment.tsx app/components/assessment/question-step.tsx app/assessment/state.ts tests/assessment-state.test.mjs tests/page-composition.test.mjs
git commit -m "feat: make assessment progress question-count aware"
~~~

---

### Task 3: Update Result Language and One-Minute Promise

**Files:**
- Modify: app/components/assessment/result-step.tsx
- Modify: app/components/assessment/business-type-step.tsx
- Modify: app/data/hero-content.ts
- Test: tests/page-composition.test.mjs

**Interfaces:**
- Consumes: AssessmentResult.label as Loss | Average | Profit.
- Removes: rendering of result.contextAnswer.
- Preserves: score ring, recommendations, disclaimer, newsletter CTA, and restart.

- [ ] **Step 1: Write failing result and copy tests**

In tests/page-composition.test.mjs, assert:

~~~js
assert.match(heroContent, /three focused questions/i);
assert.match(heroContent, /About one minute/);
assert.match(businessStep, /three questions/i);
assert.match(resultStep, /case "Loss"/);
assert.match(resultStep, /case "Average"/);
assert.match(resultStep, /case "Profit"/);
assert.doesNotMatch(resultStep, /Critical|Needs attention|Healthy|Strong/);
assert.doesNotMatch(resultStep, /Revenue context|contextAnswer/);
~~~

Keep existing assertions for Business health score, Tools worth considering, Join the newsletter, Restart assessment, and the disclaimer.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

~~~powershell
node --test tests/page-composition.test.mjs
~~~

Expected: old five-minute copy, old four health labels, and Revenue context still appear.

- [ ] **Step 3: Implement the three status summaries**

In app/components/assessment/result-step.tsx:

~~~ts
function scoreSummary(label: AssessmentResult["label"]) {
  switch (label) {
    case "Loss":
      return "The business is currently operating at a loss. Protect cash and address the weakest driver first.";
    case "Average":
      return "The business is around break-even or producing a thin margin, with clear room to strengthen its fundamentals.";
    case "Profit":
      return "The business is operating profitably. Use the health score to identify where that position can become more resilient.";
  }
}
~~~

Remove the Revenue context badge. Keep the score ring and label heading visually distinct so users understand status and score are related but not identical.

- [ ] **Step 4: Implement the concise assessment promise**

In app/data/hero-content.ts:

~~~ts
body: "Answer three focused questions about your business and get a clear health score, operating status, and practical tools worth considering.",
trustPoints: Object.freeze([
  "About one minute",
  "No account required",
  "Private assessment",
  "Actionable results",
]),
~~~

In business-type-step.tsx, change the supporting sentence to:

~~~tsx
Three focused questions adapt to how your business operates.
~~~

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

~~~powershell
node --test tests/page-composition.test.mjs
~~~

Expected: all page composition tests pass.

- [ ] **Step 6: Commit Task 3**

~~~powershell
git add app/components/assessment/result-step.tsx app/components/assessment/business-type-step.tsx app/data/hero-content.ts tests/page-composition.test.mjs
git commit -m "feat: present concise business operating status"
~~~

---

### Task 4: Full Regression and Production Verification

**Files:**
- Verify all modified files.
- Modify only files required to fix failures caused by this assessment change.

**Interfaces:**
- Consumes: completed Tasks 1–3.
- Produces: a clean, buildable main candidate with no hard-coded ten-question behavior.

- [ ] **Step 1: Scan for obsolete assessment constants and copy**

Run:

~~~powershell
rg -n "Question .* of 10|aria-valuemax=\{10\}|questionIndex === 9|questionNumber \* 10|Five minutes|five-minute|Critical|Needs attention|Revenue context|contextAnswer|rawScore / 36" app tests
~~~

Expected: no production matches. Test files may contain negative assertions only.

- [ ] **Step 2: Run the complete test suite**

Run:

~~~powershell
npm test
~~~

Expected: all tests pass with zero failures.

- [ ] **Step 3: Run lint**

Run:

~~~powershell
npm run lint
~~~

Expected: exit code 0 with no ESLint errors.

- [ ] **Step 4: Run the production build**

Run:

~~~powershell
npm run build
~~~

Expected: Next.js compiles, TypeScript passes, and the root route is generated successfully.

- [ ] **Step 5: Check the final diff**

Run:

~~~powershell
git diff --check
git status --short
git log --oneline -6
~~~

Expected: no whitespace errors and only intentional assessment commits.

- [ ] **Step 6: Commit any verification-only corrections**

If Step 1–5 required a correction:

~~~powershell
git add app tests
git commit -m "fix: complete three-question assessment verification"
~~~

If no correction was required, do not create an empty commit.
