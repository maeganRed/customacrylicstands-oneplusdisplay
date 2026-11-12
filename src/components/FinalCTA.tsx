import { Check } from "lucide-react";
import { site } from "../data/site";

interface FinalCTAProps {
  title?: string;
  description?: string;
  /** Optional offer checklist, e.g. the free 3D render package */
  bullets?: string[];
  /** Small qualifying line under the buttons */
  footnote?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Brand-blue CTA card above the footer, held inside the content container */
export default function FinalCTA({
  title = site.cta.title,
  description = site.cta.description,
  bullets,
  footnote,
  primary = site.cta.primary,
  secondary = site.cta.secondary,
}: FinalCTAProps) {
  return (
    <section className="section bg-gray-50" data-animate>
      <div className="container-page">
        <div className="relative overflow-hidden bg-linear-to-br from-primary-600 via-primary-800 to-navy-900 px-6 py-11 text-center text-white sm:px-10 sm:py-14">
          {/* Blueprint grid, kept faint so the copy stays the loudest element */}
          <div className="texture-grid" aria-hidden="true" />

          <div className="relative z-10">
            <h2 className="mb-3.5 text-2xl font-bold md:text-[2.2rem]">
              {title}
            </h2>
            <p className="mx-auto mb-7 max-w-[620px] text-base leading-[1.8] text-primary-200">
              {description}
            </p>

            {bullets && bullets.length > 0 && (
              <ul className="mx-auto mb-7 grid max-w-[620px] gap-2 text-left text-sm text-primary-100 sm:grid-cols-2">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary-200"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              {/* Primary opens the quote dialog (global data-inquiry-open
                  listener); the href stays as the no-JS fallback. */}
              <a
                href={primary.href}
                data-inquiry-open
                className="btn-light w-full px-8 py-4 text-lg sm:w-auto"
              >
                {primary.label}
              </a>
              <a
                href={secondary.href}
                className="btn-ghost-light w-full px-8 py-4 text-lg sm:w-auto"
              >
                {secondary.label}
              </a>
            </div>

            {footnote && (
              <p className="mt-6 text-xs leading-relaxed text-primary-200">
                {footnote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
