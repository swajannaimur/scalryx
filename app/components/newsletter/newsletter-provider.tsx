"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  initialNewsletterState,
  newsletterReducer,
  validateEmail,
  type NewsletterState,
  type NewsletterSubmissionAdapter,
  previewNewsletterSubmissionAdapter,
} from "../../newsletter/state";
import { NewsletterModal } from "./newsletter-modal";

interface NewsletterContextValue {
  openNewsletter: (opener: HTMLElement) => void;
}

const NewsletterContext = createContext<NewsletterContextValue | null>(null);

interface NewsletterProviderProps {
  children: React.ReactNode;
  submissionAdapter?: NewsletterSubmissionAdapter;
}

export function NewsletterProvider({
  children,
  submissionAdapter = previewNewsletterSubmissionAdapter,
}: NewsletterProviderProps) {
  const [state, dispatch] = useReducer(newsletterReducer, initialNewsletterState);
  const openerRef = useRef<HTMLElement | null>(null);

  const openNewsletter = useCallback((opener: HTMLElement) => {
    openerRef.current = opener;
    dispatch({ type: "open" });
  }, []);

  const contextValue = useMemo(
    () => ({ openNewsletter }),
    [openNewsletter],
  );

  const closeNewsletter = useCallback(() => {
    dispatch({ type: "close" });
  }, []);

  const restoreFocus = useCallback(() => {
    openerRef.current?.focus();
    openerRef.current = null;
  }, []);

  async function submitNewsletter(email: string) {
    if (validateEmail(email)) {
      dispatch({ type: "submit" });
      return;
    }

    try {
      await submissionAdapter(email.trim());
      dispatch({ type: "submit" });
    } catch {
      dispatch({ type: "submission-failed" });
    }
  }

  return (
    <NewsletterContext.Provider value={contextValue}>
      {children}
      <NewsletterModal
        onChangeEmail={(email) => dispatch({ type: "change-email", email })}
        onClose={closeNewsletter}
        onRestoreFocus={restoreFocus}
        onSubmit={submitNewsletter}
        state={state}
      />
    </NewsletterContext.Provider>
  );
}

export function useNewsletter(): NewsletterContextValue {
  const context = useContext(NewsletterContext);

  if (!context) {
    throw new Error("useNewsletter must be used inside NewsletterProvider.");
  }

  return context;
}

export type { NewsletterState };
