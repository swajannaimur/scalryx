import {
  ArrowRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Check,
  Store,
  Wrench,
} from "lucide-react";
import type { BusinessType } from "../../assessment/types";

const businessChoices: readonly {
  readonly type: BusinessType;
  readonly label: string;
  readonly description: string;
  readonly icon: typeof Store;
}[] = [
  {
    type: "ecommerce",
    label: "Ecommerce",
    description: "Net profit, revenue trend, and cash coverage for inventory and operations.",
    icon: Store,
  },
  {
    type: "agency",
    label: "Agency",
    description: "Net profit, healthy team utilization, and operating runway.",
    icon: BriefcaseBusiness,
  },
  {
    type: "saas",
    label: "SaaS",
    description: "Operating profit, recurring revenue trend, and cash runway.",
    icon: ChartNoAxesCombined,
  },
  {
    type: "service",
    label: "Service Business",
    description: "Net profit, booked service capacity, and invoice collection.",
    icon: Wrench,
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
    <div
      className="editorial-panel brand-top-accent rounded-[1.5rem] p-5 sm:p-7"
      data-business-model-selector
    >
      <div className="border-b border-line pb-5">
        <p className="section-label">Choose your model</p>
        <h2
          className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[var(--brand-primary)] sm:text-[1.85rem]"
          data-assessment-focus
          tabIndex={-1}
        >
          What type of business do you run?
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Three focused questions adapt to how your business operates.
        </p>
      </div>

      <fieldset className="mt-5">
        <legend className="sr-only">Select your business model</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {businessChoices.map((choice) => {
            const inputId = `business-type-${choice.type}`;
            const selected = selectedType === choice.type;
            const Icon = choice.icon;

            return (
              <label
                className={`editorial-card group flex min-h-36 cursor-pointer flex-col rounded-2xl p-4 focus-within:ring-4 focus-within:ring-[var(--focus-ring)] ${
                  selected
                    ? "border-[var(--brand-accent)] bg-[var(--brand-accent-soft)]"
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
                <span className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="icon-tile flex size-10 shrink-0 items-center justify-center rounded-xl"
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  {selected ? (
                    <span
                      aria-hidden="true"
                      className="grid size-7 place-items-center rounded-full bg-[var(--brand-accent)] text-white"
                      data-selected-indicator
                    >
                      <Check size={15} strokeWidth={2.5} />
                    </span>
                  ) : (
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-[var(--brand-accent)]"
                      size={17}
                    />
                  )}
                </span>
                <span className="mt-4 block text-base font-bold text-content">
                  {choice.label}
                </span>
                <span className="mt-1 block text-sm leading-5 text-muted">
                  {choice.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
