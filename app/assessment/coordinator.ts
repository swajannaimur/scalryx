import type { AssessmentState } from "./state";
import type { BusinessType } from "./types";

type BusinessSelectionState = Pick<AssessmentState, "answers" | "businessType">;

export type BusinessSelectionAction = {
  type: "select-business" | "request-business-change";
  businessType: BusinessType;
};

export function getBusinessSelectionAction(
  state: BusinessSelectionState,
  businessType: BusinessType,
): BusinessSelectionAction {
  const hasAnswers = Object.keys(state.answers).length > 0;
  const isChangingBusiness = state.businessType !== businessType;

  return {
    type: hasAnswers && isChangingBusiness ? "request-business-change" : "select-business",
    businessType,
  };
}
