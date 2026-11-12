import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  /** "center" for full-width sections, "left" when a "view all" link sits on the right */
  align?: "center" | "left";
  action?: { label: string; href: string };
  /**
   * `h2` for a page section (default). `h3` for a pillar inside a section that
   * already carries an h2 — the home page "Why One Plus Display" block.
   */
  headingLevel?: "h2" | "h3";
}

/**
 * Shared section heading. Keeps h2 typography, subtitle and the
 * "View all →" link identical across every home page section.
 */

/**
 * Splits a title on `**...**` markers and renders the marked phrase in brand
 * blue. Titles without markers render as plain text, so existing copy is
 * unaffected. Keep the highlight to one key phrase per heading; never use the
 * markers in body copy, alt text or FAQ strings, where they would show
 * literally.
 */
function renderTitle(title: string): ReactNode {
  const parts = title.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) return title;
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span key={`highlight-${index}`} className="text-primary-600">
        {part}
      </span>
    ) : (
      part
    )
  );
}

/** Industrial accent: the brand-blue tick under every section title.
 *  It is a block, so it needs `mx-auto` to follow a centred heading. */
const accentBar = (align: "center" | "left") => (
  <span
    className={`mt-4 block h-1 w-10 bg-primary-600 ${
      align === "center" ? "mx-auto" : ""
    }`}
    aria-hidden="true"
  />
);

/** "View all →" link: sliding underline on the label, arrow nudges right */
function actionLink(action: { label: string; href: string }) {
  return (
    <a
      href={action.href}
      className="group/action inline-flex items-center gap-1 font-medium text-primary-600"
    >
      <span className="nav-link">{action.label}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover/action:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none"
        aria-hidden="true"
      />
    </a>
  );
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "center",
  action,
  headingLevel = "h2",
}: SectionHeaderProps) {
  const Heading = headingLevel;
  /** Pillar headings step down a size, so three h3s do not shout like h2s */
  const titleClass =
    headingLevel === "h3"
      ? "mb-4 text-2xl font-bold text-gray-900"
      : "section-title mb-4";

  if (align === "center") {
    return (
      <div className="mb-12 text-center">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <Heading className={titleClass}>{renderTitle(title)}</Heading>
        {accentBar("center")}
        {subtitle && (
          <p className="section-subtitle mx-auto mt-4 max-w-2xl">{subtitle}</p>
        )}
        {action && <div className="mt-6">{actionLink(action)}</div>}
      </div>
    );
  }

  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <Heading className={titleClass}>{renderTitle(title)}</Heading>
        {accentBar("left")}
        {subtitle && <p className="section-subtitle mt-4">{subtitle}</p>}
      </div>
      {action && actionLink(action)}
    </div>
  );
}
