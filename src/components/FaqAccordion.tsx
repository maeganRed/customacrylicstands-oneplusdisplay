import { Plus } from "lucide-react";
import type { FaqItem } from "../types";
import SectionHeader from "./SectionHeader";

interface FaqAccordionProps {
  items: FaqItem[];
  title: string;
  subtitle?: string;
  eyebrow?: string;
  /** Closing entry under the list, e.g. "Have a different question?" */
  action?: { label: string; href: string };
}

/**
 * Question and answer list built on native `<details>`: the answers ship in
 * the static HTML and the open/close needs no JavaScript, which keeps every
 * line of copy readable to crawlers and answer engines. Zero client JS —
 * render it without a `client:*` directive.
 */
export default function FaqAccordion({
  items,
  title,
  subtitle,
  eyebrow,
  action,
}: FaqAccordionProps) {
  return (
    <section className="section" id="faq">
      <div className="container-page">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          eyebrow={eyebrow}
          align="center"
        />

        {/* Each row reveals on its own when it scrolls in. No stagger delay
            here: the list is long, so an accumulating `data-delay` made the
            lower rows wait over a second before they even started fading. */}
        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((item) => (
            <details key={item.question} className="card group" data-animate>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  className="h-5 w-5 shrink-0 text-primary-600 transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        {action && (
          <div className="mt-10 flex justify-center">
            <a href={action.href} className="btn-outline">
              {action.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
