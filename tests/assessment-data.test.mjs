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
