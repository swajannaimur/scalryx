import type { AssessmentQuestion, BusinessType } from "../../assessment/types";

interface QuestionStepProps {
  businessType: BusinessType;
  error: string;
  question: AssessmentQuestion;
  questionIndex: number;
  selectedOptionId: string;
  onAnswer: (questionId: string, optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

function displayCategory(category: string) {
  return category.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function QuestionStep({
  businessType,
  error,
  question,
  questionIndex,
  selectedOptionId,
  onAnswer,
  onNext,
  onPrevious,
}: QuestionStepProps) {
  const headingId = `question-${question.id}`;
  const guidanceId = `${headingId}-guidance`;
  const errorId = `${headingId}-error`;
  const questionNumber = questionIndex + 1;
  const isFinalQuestion = questionNumber === 10;

  return (
    <div className="rounded-2xl border border-line bg-surface-raised p-5 shadow-[0_20px_50px_var(--shadow)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-500">{businessType === "saas" ? "SaaS" : businessType[0].toUpperCase() + businessType.slice(1)} assessment</p>
          <p aria-current="step" className="mt-1 text-sm text-muted">
            Question {questionNumber} of 10
          </p>
        </div>
        <span className="rounded-full border border-line bg-input px-3 py-1 text-xs font-medium text-muted">
          {displayCategory(question.category)}
        </span>
      </div>

      <div className="mt-5">
        <div
          aria-label={`Assessment progress: question ${questionNumber} of 10`}
          aria-valuemax={10}
          aria-valuemin={1}
          aria-valuenow={questionNumber}
          className="h-2 overflow-hidden rounded-full bg-[var(--score-track)]"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-blue-500 transition-[width] duration-300"
            style={{ width: `${questionNumber * 10}%` }}
          />
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-xl font-semibold leading-snug text-content sm:text-2xl" id={headingId}>
          {question.title}
        </legend>
        <p className="mt-2 text-sm leading-6 text-muted" id={guidanceId}>
          {question.guidance}
        </p>
        <div className="mt-5 grid gap-2.5">
          {question.options.map((option) => {
            const optionId = `${question.id}-${option.id}`;
            const selected = selectedOptionId === option.id;
            return (
              <label
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                  selected
                    ? "border-blue-500 bg-blue-500/10 text-content"
                    : "border-line bg-input text-muted hover:border-blue-400/70 hover:text-content"
                }`}
                htmlFor={optionId}
                key={option.id}
              >
                <input
                  aria-describedby={error ? `${guidanceId} ${errorId}` : guidanceId}
                  checked={selected}
                  className="size-4 accent-blue-500"
                  id={optionId}
                  name={question.id}
                  onChange={() => onAnswer(question.id, option.id)}
                  type="radio"
                  value={option.id}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error ? (
        <p className="mt-3 text-sm font-medium text-red-500" id={errorId} role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 min-[430px]:flex-row min-[430px]:justify-between">
        <button
          className="min-h-11 rounded-lg border border-line bg-input px-4 text-sm font-semibold text-content transition hover:border-blue-400/70 hover:bg-blue-500/5"
          onClick={onPrevious}
          type="button"
        >
          ← Previous
        </button>
        <button
          className="min-h-11 rounded-lg border border-blue-400/70 bg-blue-600 px-4 text-sm font-semibold text-on-brand shadow-[0_0_22px_rgba(22,136,255,.2)] transition hover:bg-blue-500"
          onClick={onNext}
          type="button"
        >
          {isFinalQuestion ? "See results →" : "Next question →"}
        </button>
      </div>
    </div>
  );
}
