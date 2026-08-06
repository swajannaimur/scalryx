"use client";

import { CheckCircle2, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEventHandler, Ref } from "react";
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

interface NewsletterModalContentProps {
  closeButtonRef?: Ref<HTMLButtonElement>;
  dialogRef?: Ref<HTMLDivElement>;
  emailInputRef?: Ref<HTMLInputElement>;
  isSubmitting: boolean;
  onChangeEmail: (email: string) => void;
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  state: NewsletterState;
}

export function NewsletterModalContent({
  closeButtonRef,
  dialogRef,
  emailInputRef,
  isSubmitting,
  onChangeEmail,
  onClose,
  onSubmit,
  state,
}: NewsletterModalContentProps) {
  return (
    <div
      aria-describedby="newsletter-description"
      aria-labelledby="newsletter-title"
      aria-modal="true"
      className="editorial-panel modal-dialog max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-[1.75rem] p-5 sm:p-7"
      ref={dialogRef}
      role="dialog"
    >
      <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
        <div className="flex gap-4">
          <span className="icon-tile flex size-11 shrink-0 items-center justify-center rounded-xl">
            <Mail aria-hidden="true" size={20} />
          </span>
          <div>
          <h2 className="text-xl font-bold tracking-tight text-content" id="newsletter-title">
            Join the Scalryx newsletter
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted" id="newsletter-description">
            Get practical business insights, useful software recommendations, and curated opportunities—without the noise.
          </p>
          </div>
        </div>
        <button
          aria-label="Close newsletter dialog"
          className="secondary-button grid size-11 shrink-0 place-items-center rounded-xl text-content"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      {state.status === "success" ? (
        <div
          aria-atomic="true"
          aria-live="polite"
          className="editorial-card mt-6 rounded-2xl bg-[var(--brand-soft)] p-5"
          role="status"
        >
          <span className="icon-tile mb-4 flex size-11 items-center justify-center rounded-xl text-[var(--success)]">
            <CheckCircle2 aria-hidden="true" size={21} />
          </span>
          <p className="text-base font-bold text-content">You are all set for the preview.</p>
          <p className="mt-2 text-sm leading-6 text-muted">{state.message}</p>
          <p className="mt-2 text-xs leading-5 text-muted">
            Live newsletter delivery will begin after a provider is connected.
          </p>
        </div>
      ) : (
        <form className="mt-6" onSubmit={onSubmit} noValidate>
          <label className="text-sm font-medium text-content" htmlFor="newsletter-email">
            Work email
          </label>
          <input
            aria-describedby={
              state.error
                ? "newsletter-email-support newsletter-email-error"
                : "newsletter-email-support"
            }
            aria-invalid={Boolean(state.error)}
            autoComplete="email"
            className="mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-3 text-sm text-content outline-none transition placeholder:text-subtle focus:border-[var(--brand-navy)] focus:ring-4 focus:ring-[var(--focus-ring)]"
            disabled={isSubmitting}
            id="newsletter-email"
            name="email"
            onChange={(event) => onChangeEmail(event.target.value)}
            placeholder="you@company.com"
            ref={emailInputRef}
            required
            type="email"
            value={state.email}
          />
          <p className="mt-2 text-xs leading-5 text-muted" id="newsletter-email-support">
            No spam. Unsubscribe whenever you want.
          </p>
          {state.error ? (
            <p className="mt-2 text-sm text-[var(--danger)]" id="newsletter-email-error" role="alert">
              {state.error}
            </p>
          ) : null}
          <button
            className="primary-button mt-5 min-h-12 w-full rounded-xl px-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Preparing your preview…" : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}

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
      className="modal-backdrop fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-slate-950/35 p-4"
      data-newsletter-dialog-root="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <NewsletterModalContent
        closeButtonRef={closeButtonRef}
        dialogRef={dialogRef}
        emailInputRef={emailInputRef}
        isSubmitting={isSubmitting}
        onChangeEmail={onChangeEmail}
        onClose={onClose}
        onSubmit={handleSubmit}
        state={state}
      />
    </div>,
    document.body,
  );
}
