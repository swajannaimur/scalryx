import type { BusinessType } from "../../assessment/types";

const businessChoices: readonly {
  readonly type: BusinessType;
  readonly initials: string;
  readonly label: string;
  readonly description: string;
}[] = [
  {
    type: "ecommerce",
    initials: "EC",
    label: "Ecommerce",
    description: "Online stores selling physical or digital products.",
  },
  {
    type: "agency",
    initials: "AG",
    label: "Agency",
    description: "Creative, marketing, development, or consulting agencies.",
  },
  {
    type: "saas",
    initials: "SA",
    label: "SaaS",
    description: "Subscription software companies with recurring revenue.",
  },
  {
    type: "service",
    initials: "SB",
    label: "Service Business",
    description: "Local and professional businesses delivering customer services.",
  },
];

interface BusinessTypeStepProps {
  selectedType: BusinessType | null;
  onSelect: (businessType: BusinessType) => void;
}

export function BusinessTypeStep({
  selectedType,
  onSelect,
}: BusinessTypeStepProps) {
  return (
    <div className="premium-panel section-grid blue-glow rounded-[1.5rem] p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
        <p className="premium-eyebrow">Step 1 of 2</p>
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
          Choose a model
        </span>
      </div>
      <fieldset className="mt-3">
        <legend className="text-2xl font-bold tracking-tight text-content sm:text-[1.7rem]" data-assessment-focus tabIndex={-1}>
          What type of business do you run?
        </legend>
        <p className="mt-2 text-sm leading-6 text-muted">
          Your questions will adapt to your business model.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {businessChoices.map((choice) => {
            const inputId = `business-type-${choice.type}`;
            const selected = selectedType === choice.type;

            return (
              <label
                className={`premium-card group flex min-h-32 cursor-pointer items-center gap-3 rounded-2xl p-4 focus-within:border-[var(--assessment-accent-text)] focus-within:ring-2 focus-within:ring-[var(--assessment-focus-ring)] ${
                  selected
                    ? "border-[var(--assessment-accent-text)] bg-blue-500/15 shadow-[0_0_28px_var(--glow-soft)]"
                    : ""
                }`}
                htmlFor={inputId}
                key={choice.type}
              >
                <input
                  checked={selected}
                  className="sr-only"
                  id={inputId}
                  name="business-type"
                  onChange={() => onSelect(choice.type)}
                  type="radio"
                  value={choice.type}
                />
                <span
                  aria-hidden="true"
                  className="icon-glow flex size-12 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold"
                >
                  {choice.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold text-content">
                    {choice.label}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-muted">
                    {choice.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-lg text-subtle transition group-hover:translate-x-1 group-hover:text-[var(--assessment-accent-text)]"
                >
                  →
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
