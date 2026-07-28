"use client";

import { useReducer } from "react";
import { questionBanks } from "../../assessment/questions";
import { scoreAssessment } from "../../assessment/scoring";
import {
  assessmentReducer,
  initialAssessmentState,
} from "../../assessment/state";
import type { BusinessType } from "../../assessment/types";
import { BusinessTypeStep } from "./business-type-step";
import { QuestionStep } from "./question-step";
import { ResultStep } from "./result-step";

export function BusinessAssessment() {
  const [state, dispatch] = useReducer(assessmentReducer, initialAssessmentState);
  const result =
    state.view === "results" && state.businessType
      ? scoreAssessment(state.businessType, state.answers)
      : null;

  function selectBusiness(businessType: BusinessType) {
    dispatch({
      type:
        Object.keys(state.answers).length > 0
          ? "request-business-change"
          : "select-business",
      businessType,
    });
  }

  const currentQuestion = state.businessType
    ? questionBanks[state.businessType].questions[state.questionIndex]
    : null;

  return (
    <section aria-label="Business health assessment" className="min-w-0">
      {state.view === "business-type" ? (
        <BusinessTypeStep onSelect={selectBusiness} selectedType={state.businessType} />
      ) : null}
      {state.view === "questions" && state.businessType && currentQuestion ? (
        <QuestionStep
          businessType={state.businessType}
          error={state.error}
          onAnswer={(questionId, optionId) => dispatch({ type: "answer", questionId, optionId })}
          onNext={() => dispatch({ type: state.questionIndex === 9 ? "complete" : "next" })}
          onPrevious={() => dispatch({ type: "previous" })}
          question={currentQuestion}
          questionIndex={state.questionIndex}
          selectedOptionId={state.answers[currentQuestion.id] ?? ""}
        />
      ) : null}
      {result ? <ResultStep onRestart={() => dispatch({ type: "restart" })} result={result} /> : null}
      {state.pendingBusinessType ? (
        <div
          aria-labelledby="change-business-title"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4"
          role="alertdialog"
        >
          <div className="w-full max-w-md rounded-2xl border border-line bg-surface-raised p-6 shadow-[0_20px_50px_var(--shadow)]">
            <h3 className="text-xl font-semibold text-content" id="change-business-title">Start a different assessment?</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Your current answers will be cleared.</p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button className="min-h-11 rounded-lg border border-line bg-input px-4 text-sm font-semibold text-content" onClick={() => dispatch({ type: "cancel-business-change" })} type="button">
                Keep my answers
              </button>
              <button className="min-h-11 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-on-brand hover:bg-blue-500" onClick={() => dispatch({ type: "confirm-business-change" })} type="button">
                Clear and continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
