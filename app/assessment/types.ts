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
