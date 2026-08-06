import assert from "node:assert/strict";
import test from "node:test";
import { questionBanks } from "../app/assessment/questions.ts";
import {
  getOperatingStatus,
  scoreAssessment,
} from "../app/assessment/scoring.ts";
import { getRecommendations } from "../app/assessment/recommendations.ts";
import { getStrengthsPresentation } from "../app/assessment/result-presentation.ts";

function answersAt(type, optionIndex) {
  return Object.fromEntries(
    questionBanks[type].questions.map((question) => [
      question.id,
      question.options[optionIndex].id,
    ]),
  );
}

test("operating status maps profitability scores to the approved labels", () => {
  assert.equal(getOperatingStatus(0), "Loss");
  assert.equal(getOperatingStatus(1), "Loss");
  assert.equal(getOperatingStatus(2), "Average");
  assert.equal(getOperatingStatus(3), "Profit");
  assert.equal(getOperatingStatus(4), "Profit");
});

test("three scored answers normalize exactly to the approved boundaries", () => {
  assert.equal(scoreAssessment("ecommerce", answersAt("ecommerce", 0)).score, 0);
  assert.equal(scoreAssessment("agency", answersAt("agency", 2)).score, 50);
  assert.equal(scoreAssessment("saas", answersAt("saas", 4)).score, 100);
});

test("status comes from the profitability answer rather than the blended score", () => {
  const lossWithStrongSignals = {
    ...answersAt("ecommerce", 4),
    [questionBanks.ecommerce.questions[0].id]:
      questionBanks.ecommerce.questions[0].options[0].id,
  };
  const result = scoreAssessment("ecommerce", lossWithStrongSignals);

  assert.equal(result.label, "Loss");
  assert.equal(result.score, 67);
  assert.equal("contextAnswer" in result, false);
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
    items: [
      { category: "profitability", score: 0, qualifier: "Relative strength" },
      { category: "capacity", score: 0, qualifier: "Relative strength" },
    ],
  });
});

test("mixed top categories qualify only the below-60 item as relative", () => {
  assert.deepEqual(
    getStrengthsPresentation([
      { category: "growth", score: 75 },
      { category: "retention", score: 50 },
    ]),
    {
      heading: "Strength highlights",
      description: "This result includes both established and relative strengths.",
      items: [
        { category: "growth", score: 75, qualifier: "Established strength" },
        { category: "retention", score: 50, qualifier: "Relative strength" },
      ],
    },
  );
});

test("all-healthy top categories retain the strongest-areas presentation", () => {
  assert.deepEqual(
    getStrengthsPresentation([
      { category: "growth", score: 75 },
      { category: "retention", score: 60 },
    ]),
    {
      heading: "Strongest areas",
      description: "These categories are currently supporting your business health.",
      items: [
        { category: "growth", score: 75, qualifier: "Established strength" },
        { category: "retention", score: 60, qualifier: "Established strength" },
      ],
    },
  );
});

test("incomplete answers are rejected instead of producing a partial score", () => {
  assert.throws(
    () => scoreAssessment("service", {}),
    /Missing answer for service-net-margin/,
  );
});

test("category, strength, risk, and next-step ordering remains stable on ties", () => {
  const result = scoreAssessment("ecommerce", answersAt("ecommerce", 2));

  assert.deepEqual(
    result.categories.map((item) => [item.category, item.score]),
    [
      ["profitability", 50],
      ["growth", 50],
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
      "ecommerce-net-margin",
      "ecommerce-revenue-trend",
      "ecommerce-cash-runway",
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
  assert.equal(answers["service-net-margin"], "service-net-margin-3");
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
