import type { OrderStep } from "../data/orderProcess";
import { orderSteps } from "../data/orderProcess";
import ScrollRail from "./ScrollRail";
import SectionHeader from "./SectionHeader";

/** Rows appearing together do so 60ms apart, capped at three steps */
const STAGGER = 60;

/**
 * One step in the home rail: three across from `lg`, two from `sm`, 85% of the
 * track on phones so the next card shows as the cue that the row scrolls.
 */
const CARD_WIDTH =
  "w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]";

interface ProcessStepsProps {
  /** Defaults to the six steps shared with /order-process/ */
  steps?: OrderStep[];
  /**
   * `compact` — the home page card rail: step number, title, one line.
   * `full` — /order-process/: numbered rows with the deliverable bullets.
   */
  variant?: "compact" | "full";
  eyebrow?: string;
  /** Omitted on /order-process/, which carries its own page header */
  title?: string;
  subtitle?: string;
  action?: { label: string; href: string };
}

/**
 * The six steps from enquiry to delivery, in two densities.
 * Both read the same `orderSteps` data, so the wording can only ever be
 * edited in one place.
 */
export default function ProcessSteps({
  steps = orderSteps,
  variant = "compact",
  eyebrow,
  title,
  subtitle,
  action,
}: ProcessStepsProps) {
  /* With a section heading above, the step titles step down to h3 */
  const StepTitle = title ? "h3" : "h2";

  if (variant === "full") {
    return (
      <div>
        {title && (
          <SectionHeader
            title={title}
            subtitle={subtitle}
            eyebrow={eyebrow}
            align="left"
            action={action}
          />
        )}

        <ol className="space-y-10">
          {steps.map((step, index) => (
            <li
              key={step.step}
              className="border-t border-gray-200 pt-6"
              data-animate
              data-delay={Math.min(index, 2) * STAGGER}
            >
              <div className="flex items-baseline gap-4">
                <span className="text-sm font-bold tracking-widest text-primary-600">
                  {step.step}
                </span>
                <StepTitle className="text-xl font-semibold text-gray-900">
                  {step.title}
                </StepTitle>
              </div>
              <p className="mt-3 leading-relaxed text-gray-600">{step.text}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-600" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <>
      {title && (
        <div className="container-page">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            eyebrow={eyebrow}
            align="center"
            action={action}
          />
        </div>
      )}

      <ScrollRail as="ol" label="Production process steps">
        {steps.map((step) => (
          <li key={step.step} className={`card flex flex-col ${CARD_WIDTH}`}>
            {step.image && (
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={step.image}
                  alt={step.alt ?? step.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <span className="text-sm font-bold tracking-widest text-primary-600">
                Step {step.step}
              </span>
              <StepTitle className="mt-2 text-lg font-semibold text-gray-900">
                {step.title}
              </StepTitle>
              <p className="mt-2 text-gray-600">{step.text}</p>
            </div>
          </li>
        ))}
      </ScrollRail>
    </>
  );
}
