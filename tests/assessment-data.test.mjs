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

test("question banks preserve every approved question and option label", () => {
  const approvedCopy = {
    ecommerce: [
      ["What was your total revenue last month?", "Less than $5,000|$5,000–$20,000|$20,000–$50,000|$50,000–$100,000|$100,000+"],
      ["What is your average gross margin?", "Under 15%|15–30%|31–45%|46–60%|Above 60%"],
      ["What was your net profit margin last month?", "Operating at a loss|Under 5%|5–10%|11–20%|Above 20%"],
      ["How is revenue trending compared with the previous three months?", "Down more than 20%|Down up to 20%|Mostly flat|Up 1–15%|Up more than 15%"],
      ["What percentage of orders come from returning customers?", "Under 10%|10–20%|21–30%|31–40%|Above 40%"],
      ["What is your online-store conversion rate?", "Under 1%|1–2%|2.1–3%|3.1–5%|Above 5%"],
      ["How often do stock issues cause lost sales or excess inventory?", "Constantly|Frequently|Sometimes|Rarely|Inventory is forecast and controlled"],
      ["How quickly do you recover customer acquisition cost?", "We do not know|More than 12 months|6–12 months|2–5 months|Within one month"],
      ["How automated are order, support, and reporting workflows?", "Almost entirely manual|Mostly manual|Mixed manual and automated|Mostly automated|Automated with clear monitoring"],
      ["How much operating runway does the business have?", "Under one month|1–2 months|3–5 months|6–11 months|12+ months"],
    ],
    agency: [
      ["What was your total revenue last month?", "Less than $10,000|$10,000–$30,000|$30,000–$75,000|$75,000–$150,000|$150,000+"],
      ["What is your current net profit margin?", "Operating at a loss|Under 5%|5–10%|11–20%|Above 20%"],
      ["How much of revenue comes from your largest client?", "More than 60%|41–60%|26–40%|15–25%|Under 15%"],
      ["How much revenue is recurring or under retainer?", "Under 10%|10–25%|26–50%|51–75%|Above 75%"],
      ["How many months of qualified pipeline do you currently have?", "Less than one month|1 month|2–3 months|4–5 months|6+ months"],
      ["How healthy is team utilization?", "Unknown or constantly overloaded|Under 45% billable|45–60% billable|61–80% billable|61–80% with capacity forecasting"],
      ["How consistently are projects delivered on time and on budget?", "Rarely|Less than half|About two thirds|Most projects|Nearly every project"],
      ["What percentage of clients stay or buy again after one year?", "Under 20%|20–40%|41–60%|61–80%|Above 80%"],
      ["How much operating runway does the agency have?", "Under one month|1–2 months|3–5 months|6–11 months|12+ months"],
      ["How documented and repeatable are sales and delivery processes?", "Entirely dependent on individuals|Mostly undocumented|Partially documented|Documented and usually followed|Measured, documented, and continuously improved"],
    ],
    saas: [
      ["What is your current monthly recurring revenue?", "Pre-revenue or under $1,000|$1,000–$10,000|$10,000–$50,000|$50,000–$200,000|$200,000+"],
      ["What is your average monthly recurring-revenue growth?", "Negative|0–2%|2.1–5%|5.1–10%|Above 10%"],
      ["What is your gross margin?", "Under 40%|40–55%|56–70%|71–80%|Above 80%"],
      ["What is your monthly customer churn rate?", "Above 10%|7–10%|4–6.9%|2–3.9%|Under 2%"],
      ["How long is your customer-acquisition payback period?", "Unknown or above 24 months|18–24 months|12–17 months|6–11 months|Under 6 months"],
      ["What is your lifetime-value to acquisition-cost ratio?", "Unknown or below 1:1|1–2:1|2.1–3:1|3.1–5:1|Above 5:1"],
      ["How much operating runway does the company have?", "Under 3 months|3–5 months|6–11 months|12–17 months|18+ months"],
      ["What percentage of new users reach the key activation event?", "Under 20%|20–35%|36–50%|51–70%|Above 70%"],
      ["What is your net revenue retention?", "Under 80%|80–90%|91–100%|101–115%|Above 115%"],
      ["How consistently do teams use shared metrics and documented processes?", "Decisions are mostly reactive|Metrics are inconsistent|Core metrics exist|Metrics guide regular operating reviews|Metrics, ownership, and processes are mature"],
    ],
    service: [
      ["What was your total revenue last month?", "Less than $5,000|$5,000–$20,000|$20,000–$50,000|$50,000–$100,000|$100,000+"],
      ["What is your current net profit margin?", "Operating at a loss|Under 5%|5–10%|11–20%|Above 20%"],
      ["How much of next month’s available capacity is already booked?", "Under 20%|20–40%|41–60%|61–80%|Above 80% with capacity control"],
      ["What percentage of qualified enquiries become paying customers?", "Under 10%|10–20%|21–35%|36–50%|Above 50%"],
      ["How much business comes from repeat customers or referrals?", "Under 10%|10–25%|26–50%|51–75%|Above 75%"],
      ["How quickly are invoices and customer balances collected?", "Frequently overdue by 60+ days|Frequently overdue by 30–60 days|Usually within 30 days|Usually within 14 days|Mostly paid immediately or automatically"],
      ["How dependent is delivery on the owner personally?", "The business stops without the owner|Most work requires the owner|The team handles routine delivery|The team handles most delivery|The business operates through clear roles and systems"],
      ["How consistently do customers leave positive feedback?", "Feedback is unknown|Reviews are rare or inconsistent|Mostly positive|Consistently positive|Consistently positive with an active referral process"],
      ["How much operating runway does the business have?", "Under one month|1–2 months|3–5 months|6–11 months|12+ months"],
      ["How well do scheduling, customer records, billing, and follow-up work together?", "Mostly manual and disconnected|Several disconnected tools|A workable but inconsistent process|Mostly integrated and documented|Integrated, measured, and routinely improved"],
    ],
  };

  for (const type of businessTypes) {
    assert.deepEqual(
      questionBanks[type].questions.map((question) => [
        question.title,
        question.options.map((option) => option.label).join("|"),
      ]),
      approvedCopy[type],
    );
  }
});
