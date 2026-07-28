"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { NewsletterSubmissionController } from "../../newsletter/submission-controller";
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
  const [modalSession, setModalSession] = useState(0);
  const openerRef = useRef<HTMLElement | null>(null);
  const submissionControllerRef = useRef(new NewsletterSubmissionController());

  const openNewsletter = useCallback((opener: HTMLElement) => {
    openerRef.current = opener;
    setModalSession(submissionControllerRef.current.open());
    dispatch({ type: "open" });
  }, []);

  const contextValue = useMemo(
    () => ({ openNewsletter }),
    [openNewsletter],
  );

  const closeNewsletter = useCallback(() => {
    submissionControllerRef.current.close();
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

    await submissionControllerRef.current.submit(email.trim(), submissionAdapter, {
      onFailure: () => dispatch({ type: "submission-failed" }),
      onSuccess: () => dispatch({ type: "submission-succeeded" }),
    });
  }

  return (
    <NewsletterContext.Provider value={contextValue}>
      {children}
      <NewsletterModal
        onChangeEmail={(email) => dispatch({ type: "change-email", email })}
        onClose={closeNewsletter}
        onRestoreFocus={restoreFocus}
        onSubmit={submitNewsletter}
        session={modalSession}
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
