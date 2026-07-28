import { getQuestionBank } from "./questions.ts";
import type { AssessmentAnswers } from "./scoring.ts";
import type { BusinessType } from "./types.ts";

export type AssessmentView = "business-type" | "questions" | "results";

export interface AssessmentState {
  view: AssessmentView;
  businessType: BusinessType | null;
  pendingBusinessType: BusinessType | null;
  questionIndex: number;
  answers: AssessmentAnswers;
  error: string;
}

export type AssessmentAction =
  | { type: "select-business"; businessType: BusinessType }
  | { type: "answer"; questionId: string; optionId: string }
  | { type: "next" }
  | { type: "previous" }
  | { type: "request-business-change"; businessType: BusinessType }
  | { type: "cancel-business-change" }
  | { type: "confirm-business-change" }
  | { type: "complete" }
  | { type: "restart" };

export const initialAssessmentState: AssessmentState = {
  view: "business-type",
  businessType: null,
  pendingBusinessType: null,
  questionIndex: 0,
  answers: {},
  error: "",
};

function startBusiness(businessType: BusinessType): AssessmentState {
  return {
    ...initialAssessmentState,
    businessType,
    view: "questions",
    answers: {},
  };
}

function normalizedQuestionIndex(state: AssessmentState): number {
  if (!state.businessType) return 0;

  const lastIndex = getQuestionBank(state.businessType).questions.length - 1;
  if (!Number.isInteger(state.questionIndex)) return 0;

  return Math.min(Math.max(state.questionIndex, 0), lastIndex);
}

function withNormalizedQuestionIndex(state: AssessmentState): AssessmentState {
  const questionIndex = normalizedQuestionIndex(state);
  return questionIndex === state.questionIndex ? state : { ...state, questionIndex };
}

function hasValidAnswer(state: AssessmentState, questionIndex: number): boolean {
  if (!state.businessType) return false;

  const question = getQuestionBank(state.businessType).questions[questionIndex];
  const answerId = state.answers[question?.id];
  return Boolean(question?.options.some((option) => option.id === answerId));
}

export function canAdvance(state: AssessmentState): boolean {
  if (state.view !== "questions" || !state.businessType) return false;

  return hasValidAnswer(state, normalizedQuestionIndex(state));
}

export function firstMissingQuestionIndex(state: AssessmentState): number {
  if (!state.businessType) return -1;

  return getQuestionBank(state.businessType).questions.findIndex((question) =>
    !question.options.some((option) => option.id === state.answers[question.id]),
  );
}

function completeAssessment(state: AssessmentState): AssessmentState {
  if (!state.businessType) return state;

  const firstMissing = firstMissingQuestionIndex(state);
  if (firstMissing === -1) {
    return {
      ...withNormalizedQuestionIndex(state),
      view: "results",
      error: "",
    };
  }

  return {
    ...state,
    view: "questions",
    questionIndex: firstMissing,
    error: "Answer this question to see your result.",
  };
}

export function assessmentReducer(
  state: AssessmentState,
  action: AssessmentAction,
): AssessmentState {
  switch (action.type) {
    case "select-business":
      if (Object.keys(state.answers).length > 0 && state.businessType) {
        if (state.businessType === action.businessType) {
          return {
            ...withNormalizedQuestionIndex(state),
            view: "questions",
            pendingBusinessType: null,
            error: "",
          };
        }

        return {
          ...state,
          pendingBusinessType: action.businessType,
          error: "",
        };
      }
      return startBusiness(action.businessType);

    case "answer": {
      if (!state.businessType || state.view !== "questions") return state;

      const question = getQuestionBank(state.businessType).questions.find(
        (item) => item.id === action.questionId,
      );
      const isValidOption = question?.options.some(
        (option) => option.id === action.optionId,
      );
      if (!question || !isValidOption) return state;

      return {
        ...withNormalizedQuestionIndex(state),
        answers: { ...state.answers, [action.questionId]: action.optionId },
        error: "",
      };
    }

    case "next": {
      if (!state.businessType || state.view !== "questions") return state;

      const currentState = withNormalizedQuestionIndex(state);
      if (!canAdvance(currentState)) {
        return { ...currentState, error: "Choose an answer to continue." };
      }

      const lastIndex = getQuestionBank(state.businessType).questions.length - 1;
      if (currentState.questionIndex === lastIndex) {
        return completeAssessment(currentState);
      }

      return {
        ...currentState,
        questionIndex: currentState.questionIndex + 1,
        error: "",
      };
    }

    case "previous": {
      if (!state.businessType || state.view !== "questions") return state;

      const currentState = withNormalizedQuestionIndex(state);
      if (currentState.questionIndex === 0) {
        return { ...currentState, view: "business-type", error: "" };
      }

      return {
        ...currentState,
        questionIndex: currentState.questionIndex - 1,
        error: "",
      };
    }

    case "request-business-change":
      if (state.businessType === action.businessType) {
        return { ...state, pendingBusinessType: null, error: "" };
      }
      if (Object.keys(state.answers).length === 0) {
        return startBusiness(action.businessType);
      }
      return { ...state, pendingBusinessType: action.businessType, error: "" };

    case "cancel-business-change":
      return { ...state, pendingBusinessType: null, error: "" };

    case "confirm-business-change":
      return state.pendingBusinessType
        ? startBusiness(state.pendingBusinessType)
        : state;

    case "complete":
      return completeAssessment(state);

    case "restart":
      return initialAssessmentState;
  }
}
