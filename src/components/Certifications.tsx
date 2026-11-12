import type { Certification } from "../types";
import { certifications } from "../data/certifications";
import SectionHeader from "./SectionHeader";

/** Cards sitting in the same row appear 60ms apart, capped at five steps */
const STAGGER = 60;

interface CertificationsProps {
  items?: Certification[];
  eyebrow?: string;
  title?: string;
  /** One line under the heading; the home page also passes a CTA */
  subtitle?: string;
  /** Bottom link, e.g. "Request certificate copies" */
  action?: { label: string; href: string };
  /** `gray` — the home band between two white sections; `white` — about-us */
  tone?: "gray" | "white";
  /**
   * `band` — a standalone section with its own heading (default, /about-us/);
   * `strip` — a compact logo row that closes a section it belongs to
   * (the home page quality block), without repeating section padding.
   */
  variant?: "band" | "strip";
  /**
   * `strip` only: the page already printed the heading, so only the marks and
   * the link are needed here.
   */
  showHeading?: boolean;
  /**
   * `strip` only: `md` is the compact row that closes a section; `lg` is a
   * certificate block in its own right — larger marks on a tinted panel, with
   * the one-line detail under each name.
   */
  size?: "md" | "lg";
}

/**
 * The certification band: the six marks we hold, as a row of white cards.
 * Used by the home page (under the quality gates) and by /about-us/, so both
 * pages always show the same marks and the same wording.
 *
 * The marks are 400×400 with an opaque white background, so they are always
 * shown contained on white — never cropped, never tinted.
 */
export default function Certifications({
  items = certifications,
  eyebrow,
  title = "Certifications & Compliance",
  subtitle,
  action,
  tone = "gray",
  variant = "band",
  showHeading = true,
  size = "md",
}: CertificationsProps) {
  if (variant === "strip") {
    const large = size === "lg";
    return (
      <div
        className={
          large
            ? "rounded-xs border border-gray-200 bg-gray-50 p-5 md:p-8"
            : "border-t border-gray-200 pt-10"
        }
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          {showHeading && (
            <div className={large ? "max-w-3xl" : ""}>
              {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
              <h3
                className={
                  large
                    ? "font-display text-xl font-bold leading-tight text-gray-900 md:text-2xl"
                    : "text-lg font-semibold text-gray-900"
                }
              >
                {title}
              </h3>
              {subtitle && (
                <p
                  className={
                    large
                      ? "mt-2 text-sm leading-relaxed text-gray-600"
                      : "mt-1 text-sm text-gray-600"
                  }
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {action && (
            <a
              href={action.href}
              className={large ? "btn-outline" : "nav-link text-sm"}
            >
              {action.label}
            </a>
          )}
        </div>

        <ul
          className={
            large
              ? "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
              : "mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6"
          }
        >
          {items.map((certification, index) => (
            <li
              key={certification.name}
              className={`flex flex-col items-center gap-2 rounded-xs border border-gray-200 bg-white text-center transition-colors hover:border-primary-200 ${
                large ? "p-4" : "p-3"
              }`}
              data-animate
              data-delay={(index % 6) * STAGGER}
            >
              <img
                src={certification.image}
                alt={certification.alt}
                loading="lazy"
                className={
                  large
                    ? "h-16 w-16 object-contain md:h-20 md:w-20"
                    : "h-10 w-10 object-contain"
                }
              />
              <span
                className={
                  large
                    ? "text-sm font-semibold text-gray-900"
                    : "text-xs font-semibold text-gray-700"
                }
              >
                {certification.name}
              </span>
              {large && (
                <span className="text-xs leading-relaxed text-gray-500">
                  {certification.detail}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section
      className={`section ${tone === "gray" ? "bg-gray-50" : "bg-white"}`}
      id="certifications"
    >
      <div className="container-page">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          eyebrow={eyebrow}
          align="center"
        />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((certification, index) => (
            <li
              key={certification.name}
              className="card p-4 text-center transition duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md"
              data-animate
              data-delay={(index % 6) * STAGGER}
            >
              <div className="flex aspect-square items-center justify-center bg-white p-2">
                <img
                  src={certification.image}
                  alt={certification.alt}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-900">
                {certification.name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                {certification.detail}
              </p>
            </li>
          ))}
        </ul>

        {action && (
          <div className="mt-8 flex justify-center">
            <a href={action.href} className="btn-outline">
              {action.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
