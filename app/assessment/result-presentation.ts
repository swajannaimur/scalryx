import type { CategoryScore } from "./scoring";

export interface StrengthsPresentation {
  heading: "Relative strengths" | "Strongest areas";
  description: string;
}

export function getStrengthsPresentation(
  strengths: readonly CategoryScore[],
): StrengthsPresentation {
  if (!strengths.some((strength) => strength.score >= 60)) {
    return {
      heading: "Relative strengths",
      description:
        "These are your highest-scoring categories, but they still need attention.",
    };
  }

  return {
    heading: "Strongest areas",
    description: "These categories are currently supporting your business health.",
  };
}
