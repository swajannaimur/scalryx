import assert from "node:assert/strict";
import test from "node:test";
import {
  initialNewsletterState,
  newsletterReducer,
  validateEmail,
} from "../app/newsletter/state.ts";
import { NewsletterSubmissionController } from "../app/newsletter/submission-controller.ts";

function deferred() {
  let reject;
  let resolve;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return { promise, reject, resolve };
}

test("newsletter email validation rejects missing and malformed values", () => {
  assert.equal(validateEmail(""), "Enter your email address.");
  assert.equal(validateEmail("founder@"), "Enter a valid email address.");
  assert.equal(validateEmail(" founder@example.com "), "");
});

test("valid submission shows an honest non-transmitted success state", () => {
  const open = newsletterReducer(initialNewsletterState, { type: "open" });
  const typed = newsletterReducer(open, {
    type: "change-email",
    email: "founder@example.com",
  });
  const submitted = newsletterReducer(typed, { type: "submit" });

  assert.equal(submitted.status, "success");
  assert.equal(submitted.email, "");
  assert.equal(
    submitted.message,
    "Thanks — this preview form is ready, but no address has been sent.",
  );
});

test("closing resets private email state", () => {
  const state = newsletterReducer(
    { ...initialNewsletterState, open: true, email: "ceo@example.com" },
    { type: "close" },
  );
  assert.deepEqual(state, initialNewsletterState);
});

test("a late submission cannot reopen a closed dialog", () => {
  const closed = newsletterReducer(
    { ...initialNewsletterState, open: true, email: "founder@example.com" },
    { type: "close" },
  );

  assert.equal(newsletterReducer(closed, { type: "submit" }), closed);
});

test("submission completion does not revalidate a later input value", () => {
  const completed = newsletterReducer(
    { ...initialNewsletterState, open: true, email: "not an email" },
    { type: "submission-succeeded" },
  );

  assert.equal(completed.status, "success");
  assert.equal(completed.email, "");
});

test("a completion from a previous dialog session is ignored after close and reopen", async () => {
  const controller = new NewsletterSubmissionController();
  const firstRequest = deferred();
  const secondRequest = deferred();
  const completions = [];

  controller.open();
  const firstSubmission = controller.submit("founder@example.com", () => firstRequest.promise, {
    onFailure: () => completions.push("first-failure"),
    onSuccess: () => completions.push("first-success"),
  });
  controller.close();
  controller.open();
  const secondSubmission = controller.submit("operator@example.com", () => secondRequest.promise, {
    onFailure: () => completions.push("second-failure"),
    onSuccess: () => completions.push("second-success"),
  });

  firstRequest.resolve();
  await firstSubmission;
  assert.deepEqual(completions, []);

  secondRequest.resolve();
  await secondSubmission;
  assert.deepEqual(completions, ["second-success"]);
});

test("the active dialog session submits to an adapter only once while in flight", async () => {
  const controller = new NewsletterSubmissionController();
  const request = deferred();
  let adapterCalls = 0;

  controller.open();
  const firstSubmission = controller.submit("founder@example.com", () => {
    adapterCalls += 1;
    return request.promise;
  });
  const secondSubmission = await controller.submit("founder@example.com", () => {
    adapterCalls += 1;
    return request.promise;
  });

  assert.equal(secondSubmission, false);
  assert.equal(adapterCalls, 1);

  request.resolve();
  await firstSubmission;
});
