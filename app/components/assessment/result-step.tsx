import type { AssessmentResult } from "../../assessment/scoring";
import { getStrengthsPresentation } from "../../assessment/result-presentation";
import { NewsletterTrigger } from "../newsletter/newsletter-trigger";

interface ResultStepProps {
  result: AssessmentResult;
  onRestart: () => void;
}

function displayCategory(category: string) {
  return category.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
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
  const strengthsPresentation = getStrengthsPresentation(result.strengths);

  return (
    <div className="rounded-2xl border border-line bg-surface-raised p-5 shadow-[0_20px_50px_var(--shadow)] sm:p-6">
      <p className="text-sm font-semibold text-[var(--assessment-accent-text)]">Your business health result</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-5">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-5">
          <div
            aria-label={`Business health score: ${result.score} out of 100`}
            className="score-ring"
            role="img"
            style={
              {
                "--score": `${result.score * 3.6}deg`,
              } as React.CSSProperties
            }
          >
            <p className="text-center text-3xl font-semibold tracking-tight text-content">
              {result.score}
              <span className="block text-xs font-medium tracking-normal text-muted">out of 100</span>
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="mt-1 text-2xl font-semibold text-content" data-assessment-focus tabIndex={-1}>{result.label}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              {scoreSummary(result.label)}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-line bg-input px-3 py-2 text-xs text-muted">
          Revenue context: {result.contextAnswer}
        </span>
      </div>

      <p className="mt-5 rounded-lg border border-line bg-input px-3 py-3 text-xs leading-5 text-muted">
        This assessment offers directional business guidance, not accounting, legal, investment, or tax advice.
      </p>

      <section aria-labelledby="category-breakdown-title" className="mt-7">
        <h3 className="text-base font-semibold text-content" id="category-breakdown-title">
          Category breakdown
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {result.categories.map((category) => (
            <div className="rounded-lg border border-line bg-input p-3" key={category.category}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-content">{displayCategory(category.category)}</span>
                <span className="text-muted">{category.score}/100</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--score-track)]">
                <div
                  className="result-category-fill h-full rounded-full"
                  style={
                    {
                      "--category-score": `${category.score}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <section aria-describedby="strengths-description" aria-labelledby="strengths-title">
          <h3 className="text-base font-semibold text-content" id="strengths-title">
            {strengthsPresentation.heading}
          </h3>
          <p className="mt-1 text-sm leading-5 text-muted" id="strengths-description">
            {strengthsPresentation.description}
          </p>
          <ul className="mt-3 grid gap-2">
            {result.strengths.map((strength) => (
              <li className="rounded-lg border border-line bg-input px-3 py-2 text-sm text-muted" key={strength.category}>
                <span className="font-medium text-content">{displayCategory(strength.category)}</span> — {strength.score}/100
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="risks-title">
          <h3 className="text-base font-semibold text-content" id="risks-title">Priority risks</h3>
          <ol className="mt-3 grid gap-2">
            {result.risks.map((risk) => (
              <li className="rounded-lg border border-line bg-input px-3 py-2 text-sm leading-5 text-muted" key={risk.questionId}>
                <span className="font-medium text-content">{risk.title}:</span> {risk.explanation}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section aria-labelledby="next-steps-title" className="mt-7">
        <h3 className="text-base font-semibold text-content" id="next-steps-title">Practical next steps</h3>
        <ol className="mt-3 grid gap-2">
          {result.nextSteps.map((step, index) => (
            <li className="flex gap-3 rounded-lg border border-line bg-input px-3 py-3 text-sm leading-5 text-muted" key={step}>
              <span aria-hidden="true" className="font-semibold text-[var(--assessment-accent-text)]">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tools-title" className="mt-7">
        <h3 className="text-base font-semibold text-content" id="tools-title">Tools worth considering</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {result.recommendations.map((recommendation) => (
            <a
              className="min-h-28 rounded-lg border border-line bg-input p-3 transition hover:border-blue-400/70 hover:bg-blue-500/5"
              href={recommendation.href}
              key={recommendation.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="block text-sm font-semibold text-content">{recommendation.name} ↗</span>
              <span className="mt-1 block text-sm leading-5 text-muted">{recommendation.description}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-7 flex flex-col gap-3 rounded-xl border border-blue-400/25 bg-blue-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-content">Get practical growth notes in your inbox.</h3>
          <p className="mt-1 text-sm leading-5 text-muted">One useful issue at a time. No account required.</p>
        </div>
        <NewsletterTrigger className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[var(--assessment-accent-bg)] px-4 text-sm font-semibold text-on-brand transition hover:bg-[var(--assessment-accent-hover)]">
          Join the newsletter
        </NewsletterTrigger>
      </div>

      <button
        className="mt-5 min-h-11 rounded-lg border border-line bg-input px-4 text-sm font-semibold text-content transition hover:border-blue-400/70 hover:bg-blue-500/5"
        onClick={onRestart}
        type="button"
      >
        Restart assessment
      </button>
    </div>
  );
}
