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
    <div className="rounded-2xl border border-line bg-surface-raised p-5 shadow-[0_20px_50px_var(--shadow)] sm:p-6">
      <p className="text-sm font-semibold text-[var(--assessment-accent-text)]">Step 1 of 2</p>
      <fieldset className="mt-3">
        <legend className="text-2xl font-semibold tracking-tight text-content">
          What type of business do you run?
        </legend>
        <p className="mt-2 text-sm leading-6 text-muted">
          Your questions will adapt to your business model.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {businessChoices.map((choice) => {
            const inputId = `business-type-${choice.type}`;
            const selected = selectedType === choice.type;

            return (
              <label
                className={`group flex min-h-28 cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition focus-within:border-[var(--assessment-accent-text)] focus-within:ring-2 focus-within:ring-[var(--assessment-focus-ring)] ${
                  selected
                    ? "border-[var(--assessment-accent-text)] bg-blue-500/10"
                    : "border-line bg-input hover:border-blue-400/70 hover:bg-blue-500/5"
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
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-xs font-bold text-[var(--assessment-accent-text)]"
                >
                  {choice.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-content">
                    {choice.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted">
                    {choice.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-lg text-subtle transition group-hover:translate-x-0.5 group-hover:text-[var(--assessment-accent-text)]"
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
