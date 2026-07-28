"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NewsletterState } from "../../newsletter/state";

interface NewsletterModalProps {
  onChangeEmail: (email: string) => void;
  onClose: () => void;
  onRestoreFocus: () => void;
  onSubmit: (email: string) => Promise<void>;
  session: number;
  state: NewsletterState;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function NewsletterModal({
  onChangeEmail,
  onClose,
  onRestoreFocus,
  onSubmit,
  session,
  state,
}: NewsletterModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const inFlightSessionRef = useRef<number | null>(null);
  const [submittingSession, setSubmittingSession] = useState<number | null>(null);
  const isSubmitting = submittingSession === session;

  useEffect(() => {
    if (!state.open) return;

    const previousOverflow = document.body.style.overflow;
    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element.dataset.newsletterDialogRoot !== "true",
    );
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    }));

    document.body.style.overflow = "hidden";
    for (const { element } of backgroundState) {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    }

    emailInputRef.current?.focus();

    function getFocusableElements() {
      return Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

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
      document.body.style.overflow = previousOverflow;
      for (const previous of backgroundState) {
        previous.element.inert = previous.inert;
        if (previous.ariaHidden === null) {
          previous.element.removeAttribute("aria-hidden");
        } else {
          previous.element.setAttribute("aria-hidden", previous.ariaHidden);
        }
      }
      onRestoreFocus();
    };
  }, [onClose, onRestoreFocus, state.open]);

  useEffect(() => {
    if (state.status !== "success") return;

    closeButtonRef.current?.focus();
  }, [state.status]);

  if (!state.open || typeof document === "undefined") return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightSessionRef.current === session) return;

    const requestSession = session;
    const email = state.email;
    inFlightSessionRef.current = requestSession;
    setSubmittingSession(requestSession);
    try {
      await onSubmit(email);
    } finally {
      if (inFlightSessionRef.current !== requestSession) return;

      inFlightSessionRef.current = null;
      setSubmittingSession((currentSession) =>
        currentSession === requestSession ? null : currentSession,
      );
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-4"
      data-newsletter-dialog-root="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        aria-describedby="newsletter-description"
        aria-labelledby="newsletter-title"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-line bg-surface-raised p-6 shadow-[0_20px_50px_var(--shadow)]"
        ref={dialogRef}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-content" id="newsletter-title">
              Join the Scalryx newsletter
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted" id="newsletter-description">
              Get practical business insights, useful software recommendations, and curated opportunities—without the noise.
            </p>
          </div>
          <button
            aria-label="Close newsletter dialog"
            className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-input text-xl text-content transition hover:border-blue-400/70 hover:bg-blue-500/5"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {state.status === "success" ? (
          <div className="mt-6 rounded-xl border border-blue-400/30 bg-blue-500/10 p-4">
            <p className="text-sm font-semibold text-content">You are all set for the preview.</p>
            <p className="mt-2 text-sm leading-6 text-muted">{state.message}</p>
            <p className="mt-2 text-xs leading-5 text-muted">
              Live newsletter delivery will begin after a provider is connected.
            </p>
          </div>
        ) : (
          <form className="mt-6" onSubmit={handleSubmit} noValidate>
            <label className="text-sm font-medium text-content" htmlFor="newsletter-email">
              Work email
            </label>
            <input
              aria-describedby={state.error ? "newsletter-email-error" : undefined}
              aria-invalid={Boolean(state.error)}
              autoComplete="email"
              className="mt-2 min-h-11 w-full rounded-lg border border-line bg-input px-3 text-sm text-content placeholder:text-subtle"
              disabled={isSubmitting}
              id="newsletter-email"
              name="email"
              onChange={(event) => onChangeEmail(event.target.value)}
              placeholder="you@company.com"
              ref={emailInputRef}
              type="email"
              value={state.email}
            />
            {state.error ? (
              <p className="mt-2 text-sm text-[var(--assessment-danger)]" id="newsletter-email-error" role="alert">
                {state.error}
              </p>
            ) : null}
            <button
              className="mt-4 min-h-11 w-full rounded-lg bg-[var(--assessment-accent-bg)] px-4 text-sm font-semibold text-on-brand transition hover:bg-[var(--assessment-accent-hover)] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Preparing your preview…" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
