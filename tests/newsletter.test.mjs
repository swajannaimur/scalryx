import assert from "node:assert/strict";
import test from "node:test";
import {
  initialNewsletterState,
  newsletterReducer,
  validateEmail,
} from "../app/newsletter/state.ts";

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
