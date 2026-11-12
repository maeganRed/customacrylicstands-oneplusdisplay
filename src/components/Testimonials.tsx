import { Quote } from "lucide-react";
import type { Testimonial } from "../types";
import { testimonials } from "../data/testimonials";
import ScrollRail from "./ScrollRail";
import SectionHeader from "./SectionHeader";

/**
 * One card in a rail whose gutters match `.container-page`: three across from
 * `lg`, two from `sm`, and 85% of the track on phones so the next card peeks
 * in as the cue that the row scrolls.
 */
const CARD_WIDTH =
  "w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]";

interface TestimonialsProps {
  items?: Testimonial[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Customer feedback as a single draggable row instead of a two-row grid, so
 * the section gives back a full row of height on desktop and five stacked
 * cards on a phone. Scrolling is native; only the drag and the arrows are
 * hydrated.
 *
 * Entries carrying `sample: true` are example copy rather than signed
 * feedback, so they render a "Sample" tag. Replacing the data entry (real
 * name, role, company, country) and dropping the flag publishes it as
 * customer feedback.
 */
export default function Testimonials({
  items = testimonials,
  eyebrow,
  title = "Feedback from Our Customers",
  subtitle,
}: TestimonialsProps) {
  return (
    <section className="section bg-gray-50" id="testimonials">
      <div className="container-page">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          eyebrow={eyebrow}
          align="center"
        />
      </div>

      <ScrollRail as="ul" label="Customer testimonials">
        {items.map((item, index) => (
          <li
            key={`testimonial-${index}`}
            className={`card flex flex-col p-6 ${CARD_WIDTH}`}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <Quote
                className="h-6 w-6 text-primary-600"
                aria-hidden="true"
              />
              {item.sample && <span className="chip">Sample</span>}
            </div>

            <blockquote className="flex flex-1 flex-col">
              <p className="flex-1 leading-relaxed text-gray-700">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-5 border-t border-gray-100 pt-4 text-sm">
                <span className="font-semibold text-gray-900">
                  {item.name}
                </span>
                {(item.role || item.company) && (
                  <span className="block text-gray-500">
                    {[item.role, item.company].filter(Boolean).join(", ")}
                  </span>
                )}
                {item.country && (
                  <span className="mt-1 block text-gray-400">
                    {item.country}
                  </span>
                )}
              </footer>
            </blockquote>
          </li>
        ))}
      </ScrollRail>
    </section>
  );
}
