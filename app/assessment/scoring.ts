import { getQuestionBank } from "./questions.ts";
import {
  getRecommendations,
  type VendorRecommendation,
} from "./recommendations.ts";
import type {
  AssessmentQuestion,
  BusinessType,
  QuestionCategory,
} from "./types";

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

interface ResolvedAnswer {
  question: AssessmentQuestion;
  option: AssessmentQuestion["options"][number];
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
  const resolved: readonly ResolvedAnswer[] = bank.questions.map((question) => {
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
    const items = health.filter((item) => item.question.category === category);
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
    .map((item) => ({ category: item.category, score: item.score }));
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
    .map((item) => ({
      questionId: item.questionId,
      category: item.category,
      title: item.title,
      explanation: item.explanation,
      nextStep: item.nextStep,
      score: item.score,
    }));

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
