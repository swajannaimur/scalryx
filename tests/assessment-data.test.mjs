import assert from "node:assert/strict";
import test from "node:test";
import {
  businessTypes,
  getQuestionBank,
  questionBanks,
} from "../app/assessment/questions.ts";

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

const approvedOptionLabels = {
  ecommerce: [
    ["More than 10% loss", "Loss of 1–10%", "Break-even to 4% profit", "5–15% profit", "Above 15% profit"],
    ["Down more than 20%", "Down 1–20%", "Mostly flat", "Up 1–15%", "Up more than 15%"],
    ["Current commitments cannot be covered", "Less than one month of coverage", "One to two months of coverage", "Three to five months of coverage", "Six or more months with planned inventory purchasing"],
  ],
  agency: [
    ["More than 10% loss", "Loss of 1–10%", "Break-even to 4% profit", "5–15% profit", "Above 15% profit"],
    ["Unknown or the team is consistently overloaded", "Under 45% billable", "45–60% billable", "61–80% billable with uneven forecasting", "61–80% billable with reliable capacity forecasting"],
    ["Less than one month", "One to two months", "Three to five months", "Six to eleven months", "Twelve or more months"],
  ],
  saas: [
    ["Loss is more than 30% of revenue", "Loss is 1–30% of revenue", "Break-even to 4% profit", "5–15% profit", "Above 15% profit"],
    ["Declining more than 10% per month", "Declining up to 10% per month", "Flat or changing by less than 2%", "Growing 2–10% per month", "Growing more than 10% per month"],
    ["Less than three months", "Three to five months", "Six to eleven months", "Twelve to seventeen months", "Eighteen or more months"],
  ],
  service: [
    ["More than 10% loss", "Loss of 1–10%", "Break-even to 4% profit", "5–15% profit", "Above 15% profit"],
    ["Under 20%", "20–40%", "41–60%", "61–80%", "Above 80% with capacity under control"],
    ["Frequently more than 60 days overdue", "Frequently 30–60 days overdue", "Usually paid within 30 days", "Usually paid within 14 days", "Mostly paid immediately or automatically"],
  ],
};

test("every supported business type has one ordered three-question bank", () => {
  assert.deepEqual(businessTypes, ["ecommerce", "agency", "saas", "service"]);

  for (const type of businessTypes) {
    const bank = getQuestionBank(type);
    assert.equal(bank.businessType, type);
    assert.equal(bank.questions.length, 3);
    assert.deepEqual(bank.questions.map((question) => question.position), [1, 2, 3]);
    assert.ok(bank.questions.every((question) => question.options.length === 5));
    assert.ok(
      bank.questions.every((question) =>
        question.options.every((option, index) => option.score === index),
      ),
    );
  }
});

test("question banks preserve the approved business-specific copy", () => {
  for (const type of businessTypes) {
    assert.deepEqual(
      questionBanks[type].questions.map((question) => question.title),
      approvedTitles[type],
    );
    assert.deepEqual(
      questionBanks[type].questions.map((question) =>
        question.options.map((option) => option.label),
      ),
      approvedOptionLabels[type],
    );
  }
});
