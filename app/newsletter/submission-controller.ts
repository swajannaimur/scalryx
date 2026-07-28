import type { NewsletterSubmissionAdapter } from "./state";

interface SubmissionCallbacks {
  onFailure?: () => void;
  onSuccess?: () => void;
}

export class NewsletterSubmissionController {
  private inFlightSession: number | null = null;
  private isOpen = false;
  private session = 0;

  open(): number {
    this.isOpen = true;
    this.session += 1;
    return this.session;
  }

  close() {
    this.isOpen = false;
    this.session += 1;
  }

  async submit(
    email: string,
    adapter: NewsletterSubmissionAdapter,
    callbacks: SubmissionCallbacks = {},
  ): Promise<boolean> {
    const requestSession = this.session;

    if (!this.isOpen || this.inFlightSession === requestSession) return false;

    this.inFlightSession = requestSession;

    try {
      await adapter(email);
      if (this.isOpen && this.session === requestSession) callbacks.onSuccess?.();
    } catch {
      if (this.isOpen && this.session === requestSession) callbacks.onFailure?.();
    } finally {
      if (this.inFlightSession === requestSession) {
        this.inFlightSession = null;
      }
    }

    return true;
  }
}
