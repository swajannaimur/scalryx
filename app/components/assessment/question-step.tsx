import type { AssessmentQuestion } from "../../assessment/types";

interface QuestionStepProps {
  assessmentTitle: string;
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
  assessmentTitle,
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
    <div className="editorial-panel rounded-[1.5rem] p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
        <div>
          <p className="text-sm font-bold text-[var(--brand-navy)]">{assessmentTitle}</p>
          <p aria-current="step" className="mt-1 text-sm text-muted">
            Question {questionNumber} of 10
          </p>
        </div>
        <span className="rounded-full border border-line bg-[var(--canvas-soft)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-muted">
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
            className="assessment-progress-fill h-full rounded-full transition-[width] duration-300"
            style={
              {
                "--assessment-progress": `${questionNumber * 10}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      <fieldset className="mt-7">
        <legend
          className="text-xl font-bold leading-snug tracking-[-0.025em] text-content sm:text-[1.7rem]"
          data-assessment-focus
          id={headingId}
          tabIndex={-1}
        >
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
                className={`editorial-card flex min-h-12 cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                  selected
                    ? "border-[var(--brand-navy)] bg-[var(--brand-soft)] text-content"
                    : "text-muted hover:text-content"
                }`}
                htmlFor={optionId}
                key={option.id}
              >
                <input
                  aria-describedby={error ? `${guidanceId} ${errorId}` : guidanceId}
                  checked={selected}
                  className="size-4 accent-[var(--brand-navy)]"
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
        <p className="mt-3 text-sm font-semibold text-[var(--danger)]" id={errorId} role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-7 flex flex-col-reverse gap-3 min-[430px]:flex-row min-[430px]:justify-between">
        <button
          className="secondary-button min-h-11 rounded-xl px-4 text-sm font-semibold"
          onClick={onPrevious}
          type="button"
        >
          ← Previous
        </button>
        <button
          className="primary-button min-h-11 rounded-xl px-5 text-sm font-bold"
          onClick={onNext}
          type="button"
        >
          {isFinalQuestion ? "See results →" : "Next question →"}
        </button>
      </div>
    </div>
  );
}
