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
    <div className="premium-panel section-grid blue-glow rounded-[1.5rem] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <p className="premium-eyebrow">Your business health result</p>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-subtle">
          Analysis complete
        </span>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
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
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-content" data-assessment-focus tabIndex={-1}>{result.label}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              {scoreSummary(result.label)}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-line-strong bg-blue-500/10 px-3 py-2 text-xs font-semibold text-muted">
          Revenue context: {result.contextAnswer}
        </span>
      </div>

      <p className="premium-card mt-5 rounded-xl px-3 py-3 text-xs leading-5 text-muted">
        This assessment offers directional business guidance, not accounting, legal, investment, or tax advice.
      </p>

      <section aria-labelledby="category-breakdown-title" className="mt-7">
        <h3 className="text-base font-semibold text-content" id="category-breakdown-title">
          Category breakdown
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {result.categories.map((category) => (
            <div className="premium-card rounded-xl p-3.5" key={category.category}>
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
            {strengthsPresentation.items.map((strength) => (
              <li className="premium-card flex flex-wrap items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm text-muted" key={strength.category}>
                <span>
                  <span className="font-medium text-content">{displayCategory(strength.category)}</span> — {strength.score}/100
                </span>
                <span className="rounded-full border border-line-strong bg-blue-500/10 px-2 py-1 text-xs font-semibold text-[var(--assessment-accent-text)]">
                  {strength.qualifier}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="risks-title">
          <h3 className="text-base font-semibold text-content" id="risks-title">Priority risks</h3>
          <ol className="mt-3 grid gap-2">
            {result.risks.map((risk) => (
              <li className="premium-card rounded-xl px-3 py-2.5 text-sm leading-5 text-muted" key={risk.questionId}>
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
            <li className="premium-card flex gap-3 rounded-xl px-3 py-3 text-sm leading-5 text-muted" key={step}>
              <span aria-hidden="true" className="number-glow font-bold">{index + 1}.</span>
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
              className="premium-card min-h-28 rounded-xl p-3.5"
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

      <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-blue-400/30 bg-[linear-gradient(120deg,rgba(22,133,255,.18),rgba(35,199,255,.06))] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-content">Get practical growth notes in your inbox.</h3>
          <p className="mt-1 text-sm leading-5 text-muted">One useful issue at a time. No account required.</p>
        </div>
        <NewsletterTrigger className="premium-button inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl px-4 text-sm font-bold">
          Join the newsletter
        </NewsletterTrigger>
      </div>

      <button
        className="premium-card mt-5 min-h-11 rounded-xl px-4 text-sm font-semibold text-content"
        onClick={onRestart}
        type="button"
      >
        Restart assessment
      </button>
    </div>
  );
}
