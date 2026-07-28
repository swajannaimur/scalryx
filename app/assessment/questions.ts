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

function contextOptions(
  choices: readonly [string, string, string, string, string],
): readonly AnswerOption[] {
  return choices.map(([id, label]) => ({ id, label, score: null }));
}

function contextQuestion(
  id: string,
  title: string,
  options: readonly [string, string, string, string, string],
): AssessmentQuestion {
  return {
    id,
    position: 1,
    category: "finance",
    title,
    guidance: "This establishes business context and does not affect your health score.",
    contextOnly: true,
    options: contextOptions(options),
    risk: "",
    nextStep: "",
  };
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
    contextOnly: false,
    options: scoredOptions(id, labels),
    risk,
    nextStep,
  };
}

const ecommerceBank: QuestionBank = {
  businessType: "ecommerce",
  title: "Ecommerce assessment",
  questions: [
    contextQuestion("ecommerce-revenue", "What was your total revenue last month?", [
      ["revenue-under-5k", "Less than $5,000"],
      ["revenue-5-20k", "$5,000–$20,000"],
      ["revenue-20-50k", "$20,000–$50,000"],
      ["revenue-50-100k", "$50,000–$100,000"],
      ["revenue-100k-plus", "$100,000+"],
    ]),
    healthQuestion("ecommerce-gross-margin", 2, "profitability", "What is your average gross margin?", "Use revenue remaining after product, fulfillment, and shipping costs.", ["Under 15%", "15–30%", "31–45%", "46–60%", "Above 60%"], "Low gross margin makes pricing, advertising, and fulfillment changes unusually risky.", "Calculate contribution margin by product and improve the weakest margin driver this month."),
    healthQuestion("ecommerce-net-margin", 3, "profitability", "What was your net profit margin last month?", "Use profit after operating expenses, before owner distributions.", ["Operating at a loss", "Under 5%", "5–10%", "11–20%", "Above 20%"], "Thin or negative net margins leave little room for acquisition mistakes or demand changes.", "Review contribution margin by product and remove one avoidable operating cost this month."),
    healthQuestion("ecommerce-revenue-trend", 4, "growth", "How is revenue trending compared with the previous three months?", "Compare a consistent recent period with the preceding three months.", ["Down more than 20%", "Down up to 20%", "Mostly flat", "Up 1–15%", "Up more than 15%"], "Declining revenue can quickly strain inventory commitments and marketing efficiency.", "Identify the largest source of decline and test one focused recovery campaign this month."),
    healthQuestion("ecommerce-returning-customers", 5, "retention", "What percentage of orders come from returning customers?", "Use the share of orders from customers who have bought before.", ["Under 10%", "10–20%", "21–30%", "31–40%", "Above 40%"], "Low repeat purchasing increases dependence on increasingly costly new customer acquisition.", "Create a post-purchase retention sequence for your highest-potential customer segment."),
    healthQuestion("ecommerce-conversion-rate", 6, "conversion", "What is your online-store conversion rate?", "Divide orders by qualified storefront sessions for the same period.", ["Under 1%", "1–2%", "2.1–3%", "3.1–5%", "Above 5%"], "Weak conversion wastes paid traffic and makes profitable growth harder to sustain.", "Review your highest-traffic product page and run one checkout or offer improvement test."),
    healthQuestion("ecommerce-inventory-control", 7, "inventory", "How often do stock issues cause lost sales or excess inventory?", "Consider stockouts, overstocking, and avoidable fulfillment delays.", ["Constantly", "Frequently", "Sometimes", "Rarely", "Inventory is forecast and controlled"], "Frequent stock problems tie up cash and damage customer confidence in availability.", "Set reorder points for your top products using recent demand and supplier lead times."),
    healthQuestion("ecommerce-cac-payback", 8, "acquisition", "How quickly do you recover customer acquisition cost?", "Estimate when gross profit from a new customer covers the cost to acquire them.", ["We do not know", "More than 12 months", "6–12 months", "2–5 months", "Within one month"], "Slow or unknown acquisition payback can create hidden cash pressure as advertising scales.", "Track acquisition cost and first-order contribution margin for each major channel."),
    healthQuestion("ecommerce-workflow-automation", 9, "operations", "How automated are order, support, and reporting workflows?", "Assess the reliability of repeatable work across the customer lifecycle.", ["Almost entirely manual", "Mostly manual", "Mixed manual and automated", "Mostly automated", "Automated with clear monitoring"], "Manual workflows create avoidable errors and prevent the team from scaling efficiently.", "Document one repetitive workflow and automate its highest-volume handoff this quarter."),
    healthQuestion("ecommerce-cash-runway", 10, "cash", "How much operating runway does the business have?", "Estimate how long current cash can cover normal operating costs.", ["Under one month", "1–2 months", "3–5 months", "6–11 months", "12+ months"], "Limited runway reduces your ability to respond calmly to demand or supplier disruptions.", "Build a 13-week cash forecast and protect a minimum operating cash reserve."),
  ],
};

const agencyBank: QuestionBank = {
  businessType: "agency",
  title: "Agency assessment",
  questions: [
    contextQuestion("agency-revenue", "What was your total revenue last month?", [
      ["revenue-under-10k", "Less than $10,000"],
      ["revenue-10-30k", "$10,000–$30,000"],
      ["revenue-30-75k", "$30,000–$75,000"],
      ["revenue-75-150k", "$75,000–$150,000"],
      ["revenue-150k-plus", "$150,000+"],
    ]),
    healthQuestion("agency-net-margin", 2, "profitability", "What is your current net profit margin?", "Use profit after delivery and operating expenses, before owner distributions.", ["Operating at a loss", "Under 5%", "5–10%", "11–20%", "Above 20%"], "Thin margins make it difficult to hire well, absorb scope changes, or invest in growth.", "Review project profitability and reset one underpriced service or delivery assumption."),
    healthQuestion("agency-client-concentration", 3, "risk", "How much of revenue comes from your largest client?", "Use the largest client’s share of current recurring and project revenue.", ["More than 60%", "41–60%", "26–40%", "15–25%", "Under 15%"], "High client concentration can turn a single renewal decision into a business-wide shock.", "Set a client concentration threshold and build pipeline outside your largest account."),
    healthQuestion("agency-recurring-revenue", 4, "revenue-quality", "How much revenue is recurring or under retainer?", "Include active retainers and contractually committed recurring work.", ["Under 10%", "10–25%", "26–50%", "51–75%", "Above 75%"], "Low recurring revenue makes staffing and cash planning unnecessarily unpredictable.", "Package one repeatable outcome into a retainer offer for existing clients."),
    healthQuestion("agency-pipeline", 5, "sales", "How many months of qualified pipeline do you currently have?", "Count only opportunities with a realistic need, budget, and decision path.", ["Less than one month", "1 month", "2–3 months", "4–5 months", "6+ months"], "A shallow qualified pipeline can force discounting and rushed sales decisions.", "Schedule weekly pipeline reviews and add a specific target number of qualified opportunities."),
    healthQuestion("agency-utilization", 6, "capacity", "How healthy is team utilization?", "Consider billable utilization alongside sustainable workload and forecasting.", ["Unknown or constantly overloaded", "Under 45% billable", "45–60% billable", "61–80% billable", "61–80% with capacity forecasting"], "Poorly managed utilization either erodes margins or leads to burnout and delivery risk.", "Measure weekly billable capacity and rebalance work before the next project starts."),
    healthQuestion("agency-delivery-consistency", 7, "delivery", "How consistently are projects delivered on time and on budget?", "Look across completed projects, including scope changes and rework.", ["Rarely", "Less than half", "About two thirds", "Most projects", "Nearly every project"], "Inconsistent delivery reduces referrals, damages margins, and makes forecasting unreliable.", "Run a delivery retrospective on the last delayed project and assign one process owner."),
    healthQuestion("agency-client-retention", 8, "retention", "What percentage of clients stay or buy again after one year?", "Include renewals, repeat projects, and expansion from suitable past clients.", ["Under 20%", "20–40%", "41–60%", "61–80%", "Above 80%"], "Low client retention increases acquisition pressure and limits long-term account value.", "Add a quarterly client success review for accounts with renewal potential."),
    healthQuestion("agency-cash-runway", 9, "cash", "How much operating runway does the agency have?", "Estimate how long current cash can cover normal agency operating costs.", ["Under one month", "1–2 months", "3–5 months", "6–11 months", "12+ months"], "Low runway leaves little time to recover from delayed payments or project gaps.", "Maintain a rolling 13-week cash forecast and accelerate collection on overdue invoices."),
    healthQuestion("agency-process-maturity", 10, "operations", "How documented and repeatable are sales and delivery processes?", "Assess whether the team can follow and improve shared ways of working.", ["Entirely dependent on individuals", "Mostly undocumented", "Partially documented", "Documented and usually followed", "Measured, documented, and continuously improved"], "Undocumented processes make quality depend on individual memory and limit scalable growth.", "Document the next client handoff from sale through delivery, then review it with the team."),
  ],
};

const saasBank: QuestionBank = {
  businessType: "saas",
  title: "SaaS assessment",
  questions: [
    contextQuestion("saas-mrr", "What is your current monthly recurring revenue?", [
      ["mrr-under-1k", "Pre-revenue or under $1,000"],
      ["mrr-1-10k", "$1,000–$10,000"],
      ["mrr-10-50k", "$10,000–$50,000"],
      ["mrr-50-200k", "$50,000–$200,000"],
      ["mrr-200k-plus", "$200,000+"],
    ]),
    healthQuestion("saas-mrr-growth", 2, "growth", "What is your average monthly recurring-revenue growth?", "Use a recent average that smooths unusually large one-off changes.", ["Negative", "0–2%", "2.1–5%", "5.1–10%", "Above 10%"], "Slow or negative recurring growth can mask product, retention, or acquisition problems.", "Separate new, expansion, and churn MRR to identify the largest growth constraint."),
    healthQuestion("saas-gross-margin", 3, "profitability", "What is your gross margin?", "Use revenue after direct hosting, support, and delivery costs.", ["Under 40%", "40–55%", "56–70%", "71–80%", "Above 80%"], "Low gross margins limit the funds available to acquire customers and improve the product.", "Review direct infrastructure and support costs by customer segment before the next pricing review."),
    healthQuestion("saas-customer-churn", 4, "retention", "What is your monthly customer churn rate?", "Use the share of customers who cancel in an average month.", ["Above 10%", "7–10%", "4–6.9%", "2–3.9%", "Under 2%"], "High churn undermines compounding growth and makes paid acquisition much less efficient.", "Interview recent cancellations and prioritize the most repeated reason in your roadmap."),
    healthQuestion("saas-cac-payback", 5, "acquisition", "How long is your customer-acquisition payback period?", "Estimate months to recover acquisition cost from gross profit.", ["Unknown or above 24 months", "18–24 months", "12–17 months", "6–11 months", "Under 6 months"], "Long or unknown payback periods can turn healthy-looking growth into a cash risk.", "Track payback by acquisition channel and pause one channel that cannot meet its target."),
    healthQuestion("saas-ltv-cac", 6, "unit-economics", "What is your lifetime-value to acquisition-cost ratio?", "Use a consistent LTV method and fully loaded acquisition costs.", ["Unknown or below 1:1", "1–2:1", "2.1–3:1", "3.1–5:1", "Above 5:1"], "Weak unit economics make customer growth expensive and difficult to fund sustainably.", "Validate LTV and acquisition cost definitions before changing channel budgets."),
    healthQuestion("saas-cash-runway", 7, "cash", "How much operating runway does the company have?", "Estimate how long current cash covers the company’s normal monthly burn.", ["Under 3 months", "3–5 months", "6–11 months", "12–17 months", "18+ months"], "Short runway can force reactive product, hiring, and fundraising decisions.", "Maintain a monthly cash forecast with clear actions for the next runway threshold."),
    healthQuestion("saas-activation", 8, "product", "What percentage of new users reach the key activation event?", "Use the product action that best predicts retained, valuable customers.", ["Under 20%", "20–35%", "36–50%", "51–70%", "Above 70%"], "Low activation suggests new users are not reaching the product value that supports retention.", "Instrument the activation path and remove one high-friction step for new users."),
    healthQuestion("saas-net-revenue-retention", 9, "revenue-quality", "What is your net revenue retention?", "Include churn, downgrades, and expansion from the same starting customer cohort.", ["Under 80%", "80–90%", "91–100%", "101–115%", "Above 115%"], "Low net revenue retention means the installed base is shrinking faster than it expands.", "Review retention by segment and create an expansion play for the healthiest cohort."),
    healthQuestion("saas-operating-maturity", 10, "operations", "How consistently do teams use shared metrics and documented processes?", "Assess whether decisions and execution rely on agreed operating systems.", ["Decisions are mostly reactive", "Metrics are inconsistent", "Core metrics exist", "Metrics guide regular operating reviews", "Metrics, ownership, and processes are mature"], "Inconsistent operating practices slow learning and make growth dependent on individual effort.", "Choose a weekly operating scorecard with owners for each key metric."),
  ],
};

const serviceBank: QuestionBank = {
  businessType: "service",
  title: "Service Business assessment",
  questions: [
    contextQuestion("service-revenue", "What was your total revenue last month?", [
      ["revenue-under-5k", "Less than $5,000"],
      ["revenue-5-20k", "$5,000–$20,000"],
      ["revenue-20-50k", "$20,000–$50,000"],
      ["revenue-50-100k", "$50,000–$100,000"],
      ["revenue-100k-plus", "$100,000+"],
    ]),
    healthQuestion("service-net-margin", 2, "profitability", "What is your current net profit margin?", "Use profit after delivery and operating expenses, before owner distributions.", ["Operating at a loss", "Under 5%", "5–10%", "11–20%", "Above 20%"], "Thin margins make it difficult to invest in reliable people, systems, and growth.", "Review job-level profitability and adjust one price, scope, or delivery cost."),
    healthQuestion("service-capacity-booked", 3, "capacity", "How much of next month’s available capacity is already booked?", "Use realistic available delivery capacity, not theoretical maximum hours.", ["Under 20%", "20–40%", "41–60%", "61–80%", "Above 80% with capacity control"], "Low forward bookings make staffing and cash planning uncertain, while unmanaged demand creates overload.", "Set a weekly capacity forecast and a target booking level for the next month."),
    healthQuestion("service-enquiry-conversion", 4, "sales", "What percentage of qualified enquiries become paying customers?", "Use qualified enquiries that received a complete sales follow-up.", ["Under 10%", "10–20%", "21–35%", "36–50%", "Above 50%"], "Low enquiry conversion can waste marketing spend and leave valuable capacity unfilled.", "Review your last ten lost enquiries and improve one follow-up or offer step."),
    healthQuestion("service-repeat-business", 5, "retention", "How much business comes from repeat customers or referrals?", "Include returning customers and referred customers over a typical period.", ["Under 10%", "10–25%", "26–50%", "51–75%", "Above 75%"], "Low repeat and referral business increases dependence on constant new lead generation.", "Ask satisfied customers for a referral and create a simple rebooking reminder."),
    healthQuestion("service-invoice-collection", 6, "cash", "How quickly are invoices and customer balances collected?", "Assess the usual collection time for invoices after services are delivered.", ["Frequently overdue by 60+ days", "Frequently overdue by 30–60 days", "Usually within 30 days", "Usually within 14 days", "Mostly paid immediately or automatically"], "Slow collections can create cash shortfalls even when the business appears profitable.", "Introduce clear payment terms and automate reminders for every outstanding balance."),
    healthQuestion("service-owner-dependency", 7, "resilience", "How dependent is delivery on the owner personally?", "Consider whether normal service delivery can continue when the owner is unavailable.", ["The business stops without the owner", "Most work requires the owner", "The team handles routine delivery", "The team handles most delivery", "The business operates through clear roles and systems"], "Heavy owner dependence caps capacity and makes the business fragile during absence or growth.", "Document one owner-only responsibility and train a team member to handle it."),
    healthQuestion("service-reputation", 8, "reputation", "How consistently do customers leave positive feedback?", "Use recent reviews, direct feedback, and referral signals across customer segments.", ["Feedback is unknown", "Reviews are rare or inconsistent", "Mostly positive", "Consistently positive", "Consistently positive with an active referral process"], "Unmeasured or inconsistent reputation makes it harder to earn trust and referrals.", "Request feedback after each completed service and respond to patterns every month."),
    healthQuestion("service-cash-runway", 9, "cash", "How much operating runway does the business have?", "Estimate how long current cash can cover normal operating costs.", ["Under one month", "1–2 months", "3–5 months", "6–11 months", "12+ months"], "Limited runway reduces the time available to recover from seasonal or demand changes.", "Build a 13-week cash forecast and protect a minimum operating cash reserve."),
    healthQuestion("service-process-integration", 10, "operations", "How well do scheduling, customer records, billing, and follow-up work together?", "Assess the reliability of information handoffs across the customer journey.", ["Mostly manual and disconnected", "Several disconnected tools", "A workable but inconsistent process", "Mostly integrated and documented", "Integrated, measured, and routinely improved"], "Disconnected systems create missed follow-ups, duplicate work, and an inconsistent customer experience.", "Map the customer journey and connect the highest-volume scheduling or billing handoff."),
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
