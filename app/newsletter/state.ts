export interface NewsletterState {
  open: boolean;
  email: string;
  error: string;
  status: "idle" | "success";
  message: string;
}

export type NewsletterAction =
  | { type: "open" }
  | { type: "close" }
  | { type: "change-email"; email: string }
  | { type: "submit" }
  | { type: "submission-failed" }
  | { type: "reset-success" };

export type NewsletterSubmissionAdapter = (email: string) => Promise<void>;

export const initialNewsletterState: NewsletterState = {
  open: false,
  email: "",
  error: "",
  status: "idle",
  message: "",
};

const previewSuccessMessage =
  "Thanks — this preview form is ready, but no address has been sent.";

export const previewNewsletterSubmissionAdapter: NewsletterSubmissionAdapter =
  async () => undefined;

export function validateEmail(email: string): string {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) return "Enter your email address.";

  const parts = normalizedEmail.split("@");
  const [localPart, domain] = parts;
  const hasDomainDot = domain?.includes(".");
  const hasValidDomainDot =
    hasDomainDot && !domain.startsWith(".") && !domain.endsWith(".");

  if (parts.length !== 2 || !localPart || !domain || !hasValidDomainDot) {
    return "Enter a valid email address.";
  }

  return "";
}

export function newsletterReducer(
  state: NewsletterState,
  action: NewsletterAction,
): NewsletterState {
  switch (action.type) {
    case "open":
      return { ...initialNewsletterState, open: true };
    case "close":
      return initialNewsletterState;
    case "change-email":
      return {
        ...state,
        email: action.email,
        error: "",
        message: "",
        status: "idle",
      };
    case "submit": {
      if (!state.open) return state;

      const error = validateEmail(state.email);

      if (error) {
        return { ...state, error, status: "idle", message: "" };
      }

      return {
        ...initialNewsletterState,
        open: true,
        status: "success",
        message: previewSuccessMessage,
      };
    }
    case "submission-failed":
      if (!state.open) return state;

      return {
        ...state,
        error: "We could not prepare your newsletter preview. Please try again.",
        status: "idle",
        message: "",
      };
    case "reset-success":
      return { ...initialNewsletterState, open: state.open };
  }
}
