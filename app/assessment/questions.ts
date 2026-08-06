import type {
  AnswerOption,
  AssessmentQuestion,
  BusinessType,
  QuestionBank,
  QuestionCategory,
} from "./types";

const scoreValues = [0, 1, 2, 3, 4] as const;

function scoredOptions(
  questionId: string,
  labels: readonly [string, string, string, string, string],
): readonly AnswerOption[] {
  return labels.map((label, index) => ({
    id: `${questionId}-${index}`,
    label,
    score: scoreValues[index],
  }));
}

function healthQuestion(
  id: string,
  position: number,
  category: QuestionCategory,
  title: string,
  guidance: string,
  labels: readonly [string, string, string, string, string],
  risk: string,
  nextStep: string,
): AssessmentQuestion {
  return {
    id,
    position,
    category,
    title,
    guidance,
    options: scoredOptions(id, labels),
    risk,
    nextStep,
  };
}

const ecommerceBank: QuestionBank = {
  businessType: "ecommerce",
  title: "Ecommerce assessment",
  questions: [
    healthQuestion("ecommerce-net-margin", 1, "profitability", "What was your net profit margin last month?", "Use profit after product, fulfillment, marketing, and operating costs.", ["More than 10% loss", "Loss of 1–10%", "Break-even to 4% profit", "5–15% profit", "Above 15% profit"], "Negative margins leave little room for inventory, marketing, or demand shocks.", "Review product contribution margins and remove one avoidable operating cost this month."),
    healthQuestion("ecommerce-revenue-trend", 2, "growth", "How is revenue trending across the last three months?", "Compare the latest three months with the prior period on a consistent basis.", ["Down more than 20%", "Down 1–20%", "Mostly flat", "Up 1–15%", "Up more than 15%"], "A falling revenue trend can quickly strain purchasing and cash planning.", "Identify the biggest source of decline and test one focused recovery action."),
    healthQuestion("ecommerce-cash-runway", 3, "cash", "How reliably can cash cover inventory and normal operating commitments?", "Include expected inventory purchases and normal operating commitments.", ["Current commitments cannot be covered", "Less than one month of coverage", "One to two months of coverage", "Three to five months of coverage", "Six or more months with planned inventory purchasing"], "Limited cash coverage increases the risk of stockouts and disrupted operations.", "Build a 13-week cash forecast that includes planned inventory purchases."),
  ],
};

const agencyBank: QuestionBank = {
  businessType: "agency",
  title: "Agency assessment",
  questions: [
    healthQuestion("agency-net-margin", 1, "profitability", "What is the agency's current net profit margin?", "Use profit after delivery and operating expenses, before owner distributions.", ["More than 10% loss", "Loss of 1–10%", "Break-even to 4% profit", "5–15% profit", "Above 15% profit"], "Weak margins make it difficult to absorb scope changes or invest in delivery.", "Review project profitability and reset one underpriced service or delivery assumption."),
    healthQuestion("agency-utilization", 2, "capacity", "How healthy is paid team utilization without overloading delivery?", "Consider billable utilization alongside sustainable workload and forecasting.", ["Unknown or the team is consistently overloaded", "Under 45% billable", "45–60% billable", "61–80% billable with uneven forecasting", "61–80% billable with reliable capacity forecasting"], "Poor utilization either erodes margins or creates burnout and delivery risk.", "Measure weekly billable capacity and rebalance upcoming delivery work."),
    healthQuestion("agency-cash-runway", 3, "cash", "How much operating runway does the agency have?", "Estimate how long current cash can cover normal agency operating costs.", ["Less than one month", "One to two months", "Three to five months", "Six to eleven months", "Twelve or more months"], "Short runway leaves little time to recover from delayed payments or project gaps.", "Maintain a rolling 13-week cash forecast and accelerate overdue collections."),
  ],
};

const saasBank: QuestionBank = {
  businessType: "saas",
  title: "SaaS assessment",
  questions: [
    healthQuestion("saas-operating-profit-loss", 1, "profitability", "What is the company's current operating profit or loss position?", "Use operating profit or loss after direct and operating expenses.", ["Loss is more than 30% of revenue", "Loss is 1–30% of revenue", "Break-even to 4% profit", "5–15% profit", "Above 15% profit"], "Operating losses can reduce the time available to improve product and growth efficiency.", "Review burn by function and set a target for the largest controllable cost driver."),
    healthQuestion("saas-mrr-trend", 2, "growth", "How is monthly recurring revenue trending?", "Use recent monthly MRR movement, excluding one-off non-recurring revenue.", ["Declining more than 10% per month", "Declining up to 10% per month", "Flat or changing by less than 2%", "Growing 2–10% per month", "Growing more than 10% per month"], "Declining MRR can quickly expose retention or acquisition problems.", "Separate new, expansion, and churn MRR to identify the largest growth constraint."),
    healthQuestion("saas-cash-runway", 3, "cash", "How much operating runway does the company have?", "Estimate how long current cash covers the company’s normal monthly burn.", ["Less than three months", "Three to five months", "Six to eleven months", "Twelve to seventeen months", "Eighteen or more months"], "Short runway can force reactive product, hiring, and fundraising decisions.", "Maintain a monthly cash forecast with actions for the next runway threshold."),
  ],
};

const serviceBank: QuestionBank = {
  businessType: "service",
  title: "Service Business assessment",
  questions: [
    healthQuestion("service-net-margin", 1, "profitability", "What is the business's current net profit margin?", "Use profit after delivery and operating expenses, before owner distributions.", ["More than 10% loss", "Loss of 1–10%", "Break-even to 4% profit", "5–15% profit", "Above 15% profit"], "Weak margins make it difficult to invest in reliable people, systems, and growth.", "Review job-level profitability and adjust one price, scope, or delivery cost."),
    healthQuestion("service-capacity-booked", 2, "capacity", "How much of next month's available service capacity is already booked?", "Use realistic available delivery capacity rather than theoretical maximum hours.", ["Under 20%", "20–40%", "41–60%", "61–80%", "Above 80% with capacity under control"], "Low forward bookings make staffing and cash planning uncertain.", "Set a weekly capacity forecast and a target booking level for next month."),
    healthQuestion("service-invoice-collection", 3, "cash", "How reliably are invoices and customer balances collected?", "Assess the usual collection timing after services are delivered.", ["Frequently more than 60 days overdue", "Frequently 30–60 days overdue", "Usually paid within 30 days", "Usually paid within 14 days", "Mostly paid immediately or automatically"], "Slow collections can create cash shortfalls even when the business is profitable.", "Introduce clear payment terms and automate reminders for outstanding balances."),
  ],
};

export const businessTypes = ["ecommerce", "agency", "saas", "service"] as const satisfies readonly BusinessType[];

export const questionBanks = {
  ecommerce: ecommerceBank,
  agency: agencyBank,
  saas: saasBank,
  service: serviceBank,
} satisfies Record<BusinessType, QuestionBank>;

export function getQuestionBank(type: BusinessType): QuestionBank {
  return questionBanks[type];
}
