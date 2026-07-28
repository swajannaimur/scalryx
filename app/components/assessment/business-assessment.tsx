"use client";

import { useEffect, useReducer, useRef } from "react";
import { createPortal } from "react-dom";
import { questionBanks } from "../../assessment/questions";
import { getBusinessSelectionAction } from "../../assessment/coordinator";
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
  const assessmentRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogOpenerRef = useRef<HTMLElement | null>(null);
  const previousFocusTargetRef = useRef<string>(state.view);
  const result =
    state.view === "results" && state.businessType
      ? scoreAssessment(state.businessType, state.answers)
      : null;

  function selectBusiness(businessType: BusinessType) {
    const selectionAction = getBusinessSelectionAction(state, businessType);
    const hasAnswers = Object.keys(state.answers).length > 0;
    const isChangingBusiness = state.businessType !== businessType;

    if (hasAnswers && isChangingBusiness && document.activeElement instanceof HTMLElement) {
      dialogOpenerRef.current = document.activeElement;
    }

    dispatch(selectionAction);
  }

  const currentQuestion = state.businessType
    ? questionBanks[state.businessType].questions[state.questionIndex]
    : null;

  useEffect(() => {
    if (!state.pendingBusinessType) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element.dataset.assessmentDialogRoot !== "true",
    );
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    }));

    for (const { element } of backgroundState) {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    }

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");
    const getFocusableElements = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled"),
      );
    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        dispatch({ type: "cancel-business-change" });
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusableElements();
      const firstElement = elements[0];
      const lastElement = elements.at(-1);
      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      for (const previous of backgroundState) {
        previous.element.inert = previous.inert;
        if (previous.ariaHidden === null) {
          previous.element.removeAttribute("aria-hidden");
        } else {
          previous.element.setAttribute("aria-hidden", previous.ariaHidden);
        }
      }
      dialogOpenerRef.current?.focus();
      dialogOpenerRef.current = null;
    };
  }, [state.pendingBusinessType]);

  useEffect(() => {
    const focusTarget =
      state.view === "questions"
        ? `question-${state.questionIndex}`
        : state.view;

    if (state.pendingBusinessType || previousFocusTargetRef.current === focusTarget) return;

    assessmentRef.current?.querySelector<HTMLElement>("[data-assessment-focus]")?.focus();
    previousFocusTargetRef.current = focusTarget;
  }, [state.pendingBusinessType, state.questionIndex, state.view]);

  return (
    <section aria-label="Business health assessment" className="min-w-0" ref={assessmentRef}>
      {state.view === "business-type" ? (
        <BusinessTypeStep onSelect={selectBusiness} selectedType={state.businessType} />
      ) : null}
      {state.view === "questions" && state.businessType && currentQuestion ? (
        <QuestionStep
          assessmentTitle={questionBanks[state.businessType].title}
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
      {state.pendingBusinessType && typeof document !== "undefined"
        ? createPortal(
            <div
              className="modal-backdrop fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/55 p-4"
              data-assessment-dialog-root="true"
            >
              <div
                aria-describedby="change-business-description"
                aria-labelledby="change-business-title"
                aria-modal="true"
                className="premium-panel modal-dialog max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl p-6"
                ref={dialogRef}
                role="alertdialog"
              >
                <h3 className="text-xl font-semibold text-content" id="change-business-title">Start a different assessment?</h3>
                <p className="mt-2 text-sm leading-6 text-muted" id="change-business-description">Your current answers will be cleared.</p>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button className="premium-card min-h-11 rounded-xl px-4 text-sm font-semibold text-content" onClick={() => dispatch({ type: "cancel-business-change" })} type="button">
                    Keep my answers
                  </button>
                  <button className="premium-button min-h-11 rounded-xl px-4 text-sm font-bold" onClick={() => dispatch({ type: "confirm-business-change" })} type="button">
                    Clear and continue
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
