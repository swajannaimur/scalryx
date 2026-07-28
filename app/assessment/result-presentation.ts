import type { CategoryScore } from "./scoring";

export interface StrengthsPresentation {
  heading: "Relative strengths" | "Strength highlights" | "Strongest areas";
  description: string;
  items: readonly (CategoryScore & {
    qualifier: "Relative strength" | "Established strength";
  })[];
}

export function getStrengthsPresentation(
  strengths: readonly CategoryScore[],
): StrengthsPresentation {
  const items = strengths.map((strength) => ({
    ...strength,
    qualifier:
      strength.score >= 60
        ? ("Established strength" as const)
        : ("Relative strength" as const),
  }));
  const establishedCount = items.filter(
    (strength) => strength.qualifier === "Established strength",
  ).length;

  if (establishedCount === 0) {
    return {
      heading: "Relative strengths",
      description:
        "These are your highest-scoring categories, but they still need attention.",
      items,
    };
  }

  if (establishedCount < items.length) {
    return {
      heading: "Strength highlights",
      description: "This result includes both established and relative strengths.",
      items,
    };
  }

  return {
    heading: "Strongest areas",
    description: "These categories are currently supporting your business health.",
    items,
  };
}
