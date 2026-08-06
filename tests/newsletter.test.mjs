import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { transformSync } from "next/dist/build/swc/index.js";
import {
  initialNewsletterState,
  newsletterReducer,
  validateEmail,
} from "../app/newsletter/state.ts";
import { NewsletterSubmissionController } from "../app/newsletter/submission-controller.ts";

const require = createRequire(import.meta.url);

async function renderNewsletterContent(state) {
  const source = await readFile(
    new URL("../app/components/newsletter/newsletter-modal.tsx", import.meta.url),
    "utf8",
  );
  const { code } = transformSync(source, {
    filename: "newsletter-modal.tsx",
    jsc: {
      parser: { syntax: "typescript", tsx: true },
      transform: { react: { runtime: "automatic" } },
    },
    module: { type: "commonjs" },
  });
  const componentModule = { exports: {} };

  new Function("exports", "module", "require", code)(
    componentModule.exports,
    componentModule,
    require,
  );

  return renderToStaticMarkup(
    createElement(componentModule.exports.NewsletterModalContent, {
      isSubmitting: false,
      onChangeEmail() {},
      onClose() {},
      onSubmit() {},
      state,
    }),
  );
}

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

test("rendered newsletter signup requires email and provides the approved reassurance", async () => {
  const markup = await renderNewsletterContent({
    ...initialNewsletterState,
    error: "Enter a valid email address.",
    open: true,
  });

  assert.match(
    markup,
    /<input[^>]*aria-describedby="newsletter-email-support newsletter-email-error"/,
  );
  assert.match(markup, /<input[^>]*aria-invalid="true"/);
  assert.match(markup, /<input[^>]*required=""/);
  assert.match(markup, /No spam\. Unsubscribe whenever you want\./);
});

test("rendered newsletter success announces the no-address-sent result", async () => {
  const markup = await renderNewsletterContent({
    ...initialNewsletterState,
    message: "Thanks — this preview form is ready, but no address has been sent.",
    open: true,
    status: "success",
  });

  assert.match(markup, /role="status"/);
  assert.match(markup, /aria-live="polite"/);
  assert.match(markup, /aria-atomic="true"/);
  assert.match(markup, /no address has been sent/);
});

test("rendered newsletter dialog uses the light editorial treatment", async () => {
  const markup = await renderNewsletterContent({
    ...initialNewsletterState,
    open: true,
  });

  assert.match(markup, /editorial-panel/);
  assert.match(markup, /primary-button/);
  assert.match(markup, /icon-tile/);
  assert.match(markup, /var\(--brand-accent\)/);
});
