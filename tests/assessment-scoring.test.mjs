import assert from "node:assert/strict";
import test from "node:test";
import { questionBanks } from "../app/assessment/questions.ts";
import {
  getHealthLabel,
  scoreAssessment,
} from "../app/assessment/scoring.ts";
import { getRecommendations } from "../app/assessment/recommendations.ts";
import { getStrengthsPresentation } from "../app/assessment/result-presentation.ts";

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

test("all-zero results describe their top categories as relative strengths", () => {
  const result = scoreAssessment("service", answersAt("service", 0));

  assert.equal(result.score, 0);
  assert.deepEqual(getStrengthsPresentation(result.strengths), {
    heading: "Relative strengths",
    description:
      "These are your highest-scoring categories, but they still need attention.",
  });
});

test("healthy top categories retain the strongest-areas presentation", () => {
  assert.deepEqual(
    getStrengthsPresentation([
      { category: "growth", score: 75 },
      { category: "retention", score: 50 },
    ]),
    {
      heading: "Strongest areas",
      description: "These categories are currently supporting your business health.",
    },
  );
});

test("incomplete answers are rejected instead of producing a partial score", () => {
  assert.throws(
    () => scoreAssessment("service", {}),
    /Missing answer for service-revenue/,
  );
});

test("category, strength, risk, and next-step ordering remains stable on ties", () => {
  const result = scoreAssessment("ecommerce", answersAt("ecommerce", 2));

  assert.deepEqual(
    result.categories.map((item) => [item.category, item.score]),
    [
      ["profitability", 50],
      ["growth", 50],
      ["retention", 50],
      ["conversion", 50],
      ["inventory", 50],
      ["acquisition", 50],
      ["operations", 50],
      ["cash", 50],
    ],
  );
  assert.deepEqual(
    result.strengths.map((item) => item.category),
    ["profitability", "growth"],
  );
  assert.deepEqual(
    result.risks.map((item) => item.questionId),
    [
      "ecommerce-gross-margin",
      "ecommerce-net-margin",
      "ecommerce-revenue-trend",
    ],
  );
  assert.deepEqual(
    result.nextSteps,
    result.risks.map((risk) => risk.nextStep),
  );
});

test("scoring leaves a frozen caller-owned answer record untouched", () => {
  const answers = Object.freeze(answersAt("service", 3));

  assert.equal(scoreAssessment("service", answers).score, 75);
  assert.equal(answers["service-revenue"], "revenue-under-5k");
});

test("recommendation mappings cover every business type in stable order", () => {
  assert.deepEqual(
    getRecommendations("saas", ["growth", "profitability", "retention"]).map(
      (item) => item.name,
    ),
    ["HubSpot", "Stripe", "Customer.io"],
  );
  assert.deepEqual(
    getRecommendations("service", ["profitability", "capacity"]).map(
      (item) => item.name,
    ),
    ["QuickBooks", "Calendly", "Jobber"],
  );
});

test("returned recommendations cannot corrupt the internal vendor catalog", () => {
  const first = getRecommendations("ecommerce", ["profitability"]);

  try {
    first[0].name = "Corrupted vendor";
  } catch {
    // Frozen recommendation records reject mutation in strict-mode modules.
  }

  assert.equal(
    getRecommendations("ecommerce", ["profitability"])[0].name,
    "Shopify",
  );
});
