import assert from "node:assert/strict";
import test from "node:test";
import {
  assessmentReducer,
  canAdvance,
  firstMissingQuestionIndex,
  initialAssessmentState,
} from "../app/assessment/state.ts";
import { questionBanks } from "../app/assessment/questions.ts";
import { getBusinessSelectionAction } from "../app/assessment/coordinator.ts";

function answerEveryQuestion(type) {
  let state = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: type,
  });

  for (const question of questionBanks[type].questions) {
    state = assessmentReducer(state, {
      type: "answer",
      questionId: question.id,
      optionId: question.options[0].id,
    });
  }

  return state;
}

test("selecting a business enters its first question", () => {
  const state = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "ecommerce",
  });

  assert.equal(state.businessType, "ecommerce");
  assert.equal(state.questionIndex, 0);
  assert.equal(state.view, "questions");
});

test("next is blocked until the current question has an answer", () => {
  const selected = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "agency",
  });

  assert.equal(canAdvance(selected), false);
  assert.deepEqual(assessmentReducer(selected, { type: "next" }), {
    ...selected,
    error: "Choose an answer to continue.",
  });
});

test("previous answers survive backward and forward navigation", () => {
  let state = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "saas",
  });
  state = assessmentReducer(state, {
    type: "answer",
    questionId: "saas-operating-profit-loss",
    optionId: "saas-operating-profit-loss-0",
  });
  state = assessmentReducer(state, { type: "next" });
  state = assessmentReducer(state, { type: "previous" });

  assert.equal(state.answers["saas-operating-profit-loss"], "saas-operating-profit-loss-0");
});

test("changing business with answers requires explicit reset confirmation", () => {
  const answered = {
    ...initialAssessmentState,
    businessType: "ecommerce",
    view: "questions",
    answers: { "ecommerce-net-margin": "ecommerce-net-margin-0" },
  };
  const pending = assessmentReducer(answered, {
    type: "request-business-change",
    businessType: "agency",
  });

  assert.equal(pending.pendingBusinessType, "agency");
  assert.deepEqual(pending.answers, answered.answers);

  const changed = assessmentReducer(pending, { type: "confirm-business-change" });
  assert.equal(changed.businessType, "agency");
  assert.deepEqual(changed.answers, {});
});

test("direct business selection cannot discard answers without confirmation", () => {
  const answered = {
    ...initialAssessmentState,
    businessType: "ecommerce",
    view: "questions",
    answers: { "ecommerce-net-margin": "ecommerce-net-margin-0" },
  };

  const pending = assessmentReducer(answered, {
    type: "select-business",
    businessType: "agency",
  });

  assert.equal(pending.businessType, "ecommerce");
  assert.equal(pending.pendingBusinessType, "agency");
  assert.deepEqual(pending.answers, answered.answers);
});

test("selecting the active business with answers resumes its questions", () => {
  const answered = {
    ...initialAssessmentState,
    businessType: "ecommerce",
    view: "business-type",
    questionIndex: 2,
    answers: { "ecommerce-net-margin": "ecommerce-net-margin-0" },
  };

  const resumed = assessmentReducer(answered, {
    type: "select-business",
    businessType: "ecommerce",
  });

  assert.equal(resumed.view, "questions");
  assert.equal(resumed.pendingBusinessType, null);
  assert.equal(resumed.questionIndex, 2);
  assert.deepEqual(resumed.answers, answered.answers);
});

test("coordinator resumes the active business instead of requesting a reset", () => {
  const action = getBusinessSelectionAction(
    {
      businessType: "agency",
      answers: { "agency-net-margin": "agency-net-margin-0" },
    },
    "agency",
  );

  assert.deepEqual(action, { type: "select-business", businessType: "agency" });
});

test("coordinator requests confirmation before changing an answered business", () => {
  const action = getBusinessSelectionAction(
    {
      businessType: "agency",
      answers: { "agency-net-margin": "agency-net-margin-0" },
    },
    "saas",
  );

  assert.deepEqual(action, { type: "request-business-change", businessType: "saas" });
});

test("restart removes every answer and returns to business selection", () => {
  const restarted = assessmentReducer(
    {
      ...initialAssessmentState,
      view: "results",
      businessType: "service",
      answers: { "service-net-margin": "service-net-margin-0" },
    },
    { type: "restart" },
  );

  assert.deepEqual(restarted, initialAssessmentState);
});

test("complete opens results only after every question has a valid answer", () => {
  const complete = assessmentReducer(answerEveryQuestion("ecommerce"), {
    type: "complete",
  });

  assert.equal(complete.view, "results");
  assert.equal(complete.error, "");
  assert.equal(firstMissingQuestionIndex(complete), -1);
  assert.equal(questionBanks.ecommerce.questions.length, 3);
});

test("the third answered question completes into results", () => {
  const complete = assessmentReducer(answerEveryQuestion("ecommerce"), {
    type: "complete",
  });

  assert.equal(complete.view, "results");
  assert.equal(complete.error, "");
});

test("completion returns to the first missing question", () => {
  let state = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "service",
  });
  const questions = questionBanks.service.questions;

  for (const [index, question] of questions.entries()) {
    if (index === 1) continue;
    state = assessmentReducer(state, {
      type: "answer",
      questionId: question.id,
      optionId: question.options[0].id,
    });
  }

  const incomplete = assessmentReducer(state, { type: "complete" });
  assert.equal(incomplete.view, "questions");
  assert.equal(incomplete.questionIndex, 1);
  assert.equal(incomplete.error, "Answer this question to see your result.");
});

test("complete focuses the first missing question without escaping bank bounds", () => {
  let state = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "service",
  });
  for (const question of questionBanks.service.questions.slice(0, 2)) {
    state = assessmentReducer(state, {
      type: "answer",
      questionId: question.id,
      optionId: question.options[0].id,
    });
  }

  const incomplete = assessmentReducer(state, { type: "complete" });
  assert.equal(firstMissingQuestionIndex(incomplete), 2);
  assert.equal(incomplete.questionIndex, 2);
  assert.equal(incomplete.view, "questions");
  assert.equal(incomplete.error, "Answer this question to see your result.");
});

test("previous at the first question returns to business selection", () => {
  const selected = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "agency",
  });
  const previous = assessmentReducer(selected, { type: "previous" });

  assert.equal(previous.view, "business-type");
  assert.equal(previous.questionIndex, 0);
});

test("invalid question and option identifiers are ignored", () => {
  const selected = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "saas",
  });

  assert.equal(
    assessmentReducer(selected, {
      type: "answer",
      questionId: "not-a-question",
      optionId: "not-an-option",
    }),
    selected,
  );
  assert.equal(
    assessmentReducer(selected, {
      type: "answer",
      questionId: "saas-operating-profit-loss",
      optionId: "not-an-option",
    }),
    selected,
  );
});

test("corrupted question indices normalize without escaping their bank", () => {
  const selected = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "agency",
  });
  const corrupted = { ...selected, questionIndex: 99 };
  const next = assessmentReducer(corrupted, { type: "next" });

  assert.equal(next.questionIndex, 2);
  assert.equal(next.error, "Choose an answer to continue.");

  const negative = assessmentReducer(
    { ...selected, questionIndex: -4 },
    { type: "previous" },
  );
  assert.equal(negative.questionIndex, 0);
  assert.equal(negative.view, "business-type");
});

test("cancellation clears a pending business change and empty confirmation is a no-op", () => {
  const selected = assessmentReducer(initialAssessmentState, {
    type: "select-business",
    businessType: "service",
  });
  const unchanged = assessmentReducer(selected, { type: "confirm-business-change" });
  const cancelled = assessmentReducer(
    { ...selected, pendingBusinessType: "agency" },
    { type: "cancel-business-change" },
  );

  assert.equal(unchanged, selected);
  assert.equal(cancelled.pendingBusinessType, null);
  assert.equal(cancelled.businessType, "service");
});

test("reducer leaves frozen state and answer records unchanged", () => {
  const selected = Object.freeze({
    ...initialAssessmentState,
    businessType: "ecommerce",
    view: "questions",
    answers: Object.freeze({}),
  });

  const answered = assessmentReducer(selected, {
    type: "answer",
    questionId: "ecommerce-net-margin",
    optionId: "ecommerce-net-margin-0",
  });

  assert.deepEqual(selected.answers, {});
  assert.notEqual(answered.answers, selected.answers);
  assert.equal(answered.answers["ecommerce-net-margin"], "ecommerce-net-margin-0");
});
