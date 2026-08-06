import { ArrowUpRight } from "lucide-react";
import type { AssessmentResult } from "../../assessment/scoring";
import { NewsletterTrigger } from "../newsletter/newsletter-trigger";

interface ResultStepProps {
  result: AssessmentResult;
  onRestart: () => void;
}

function scoreSummary(label: AssessmentResult["label"]) {
  switch (label) {
    case "Critical":
      return "Focus on the highest-impact risks before investing in more growth.";
    case "Needs attention":
      return "Your business has a workable base, with a few priorities to strengthen.";
    case "Healthy":
      return "Your fundamentals are in good shape; keep improving the weaker areas.";
    case "Strong":
      return "Your business shows strong operating fundamentals and room to compound them.";
  }
}

export function ResultStep({ result, onRestart }: ResultStepProps) {
  return (
    <div className="editorial-panel brand-top-accent rounded-[1.5rem] p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-5">
        <p className="section-label">Your result</p>
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-subtle">
          Analysis complete
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-5">
          <div
            aria-label={`Business health score: ${result.score} out of 100`}
            className="score-ring"
            role="img"
          >
            <p className="metric-accent text-center text-3xl font-bold tracking-[-0.04em] text-[var(--brand-accent)]">
              {result.score}
              <span className="block text-xs font-semibold tracking-normal text-muted">out of 100</span>
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <h2
              className="text-3xl font-bold tracking-[-0.035em] text-[var(--brand-primary)]"
              data-assessment-focus
              tabIndex={-1}
            >
              {result.label}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              {scoreSummary(result.label)}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-line bg-[var(--canvas-soft)] px-3 py-2 text-xs font-semibold text-muted">
          Revenue context: {result.contextAnswer}
        </span>
      </div>

      <p className="mt-5 rounded-xl border border-line bg-[var(--canvas-soft)] px-3 py-3 text-xs leading-5 text-muted">
        This assessment offers directional business guidance, not accounting, legal, investment, or tax advice.
      </p>

      <section aria-labelledby="tools-title" className="mt-7">
        <h3 className="text-base font-bold text-content" id="tools-title">Tools worth considering</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {result.recommendations.map((recommendation) => (
            <a
              className="editorial-card group min-h-28 rounded-xl p-3.5"
              href={recommendation.href}
              key={recommendation.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="flex items-center justify-between gap-2 text-sm font-bold text-content">
                {recommendation.name}
                <ArrowUpRight aria-hidden="true" className="text-[var(--brand-accent)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={15} />
              </span>
              <span className="mt-1 block text-sm leading-5 text-muted">{recommendation.description}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-[var(--line-strong)] bg-[var(--brand-primary-soft)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-[var(--brand-primary)]">Get practical growth notes in your inbox.</h3>
          <p className="mt-1 text-sm leading-5 text-muted">One useful issue at a time. No account required.</p>
        </div>
        <NewsletterTrigger className="primary-button inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl px-4 text-sm font-bold">
          Join the newsletter
        </NewsletterTrigger>
      </div>

      <button
        className="secondary-button mt-5 min-h-11 rounded-xl px-4 text-sm font-semibold"
        onClick={onRestart}
        type="button"
      >
        Restart assessment
      </button>
    </div>
  );
}
