import {
  BadgeCheck,
  ClipboardCheck,
  Clock,
  Droplet,
  Factory,
  Layers,
  Package,
  Palette,
  Printer,
  Ruler,
  ShieldCheck,
  Ship,
  Tag,
  Wrench,
} from "lucide-react";
import type { Advantage } from "../types";
import { advantages } from "../data/advantages";
import SectionHeader from "./SectionHeader";

interface ManufacturingAdvantagesProps {
  title?: string;
  /** Optional supporting line under the heading */
  subtitle?: string;
  /** Optional small line above the heading, e.g. "Customisation options" */
  eyebrow?: string;
  items?: Advantage[];
  /**
   * `list` — the stacked icon rows used beside the factory gallery
   * (home, /about-us/).
   * `grid` — a centred heading with the same items as a card grid
   * (customisation options, quality gates, B2B services).
   */
  variant?: "list" | "grid";
  /** `grid` only: card grid width, picked so no row is left with a lone card */
  columns?: 2 | 3 | 4;
  /** `grid` only: bottom CTA under the cards */
  action?: { label: string; href: string };
  /**
   * `grid` only: render the heading block. Turn it off when the page supplies
   * its own centred <SectionHeader /> above a two-column arrangement.
   */
  showHeader?: boolean;
}

/** Items appearing together do so 60ms apart, capped at three steps */
const STAGGER = 60;

/** Industrial numbering: 01, 02 … padded to two digits */
const stepNumber = (index: number): string =>
  String(index + 1).padStart(2, "0");

/** Grid widths: two wide for four items, three for six, four for seven */
const gridColumns = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

const icons = {
  factory: Factory,
  palette: Palette,
  shield: ShieldCheck,
  ship: Ship,
  clock: Clock,
  layers: Layers,
  award: BadgeCheck,
  ruler: Ruler,
  droplet: Droplet,
  tag: Tag,
  wrench: Wrench,
  package: Package,
  clipboard: ClipboardCheck,
  printer: Printer,
};

/**
 * Icon + title + description items, in two shapes.
 * `list` is the left column of the manufacturing section; `grid` is the
 * card-grid section used for customisation options, quality control gates
 * and B2B services. Same data shape, one component.
 */
export default function ManufacturingAdvantages({
  title = "Why Partner With One Plus Display",
  subtitle,
  eyebrow,
  items = advantages,
  variant = "list",
  columns = 3,
  action,
  showHeader = true,
}: ManufacturingAdvantagesProps) {
  if (variant === "grid") {
    return (
      <div>
        {showHeader && (
          <SectionHeader
            title={title}
            subtitle={subtitle}
            eyebrow={eyebrow}
            align="center"
          />
        )}

        <div className={`grid gap-6 ${gridColumns[columns]}`}>
          {items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <div
                key={item.title}
                className="card relative p-6 transition-colors hover:border-primary-200"
                data-animate
                data-delay={(index % columns) * STAGGER}
              >
                {/* Catalogue-style oversized index in the otherwise empty
                    top-right corner of the card */}
                <span
                  className="pointer-events-none absolute right-4 top-2 select-none font-display text-6xl font-bold leading-none text-primary-100"
                  aria-hidden="true"
                >
                  {stepNumber(index)}
                </span>
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
                {item.meta && (
                  <p className="mt-3 text-sm font-medium text-primary-600">
                    {item.meta}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {action && (
          <div className="mt-8 flex justify-center">
            <a href={action.href} className="btn-outline">
              {action.label}
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-gray-600">{subtitle}</p>}

      <div className="mt-6 space-y-6">
        {items.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <div
              key={item.title}
              className="flex gap-4"
              data-animate
              data-delay={Math.min(index, 2) * STAGGER}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-xs font-bold text-primary-600"
                    aria-hidden="true"
                  >
                    {stepNumber(index)}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
                {item.meta && (
                  <p className="mt-2 text-sm font-medium text-primary-600">
                    {item.meta}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
