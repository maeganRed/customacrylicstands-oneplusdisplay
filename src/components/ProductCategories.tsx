import type { Category } from "../types";
import { industryCategories, styleCategories } from "../data/categories";
import { categoryHref } from "../data/routes";
import SectionHeader from "./SectionHeader";

/** Tiles sitting in the same row appear 60ms apart */
const STAGGER = 60;

interface ProductCategoriesProps {
  /** Style categories: large illustrated tiles */
  styles?: Category[];
  /** Industry categories: same illustrated tiles as the style grid */
  industries?: Category[];
  /** Small divider label above the industry tiles */
  industriesLabel?: string;
  title?: string;
  subtitle?: string;
  /** Optional "view all" link rendered beside the section heading */
  action?: { label: string; href: string };
}

/**
 * Home page category overview in two dimensions:
 * display style (image tiles, title only) and target industry (image tiles,
 * same build). No descriptions under the tiles: the name is the keyword, and
 * the category page carries the detail.
 */
export default function ProductCategories({
  styles = styleCategories,
  industries = industryCategories,
  industriesLabel = "Or start from your retail sector",
  title = "Start From a Build Like Yours",
  subtitle = "Reference builds, not stock items. Every one is re-drawn to your product, your shelf and your planogram.",
  action,
}: ProductCategoriesProps) {
  return (
    <section className="section bg-gray-50" id="categories">
      <div className="container-page">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          align="center"
          action={action}
        />

        {/* Style dimension — image and title only */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {styles.map((style, index) => (
            <a
              key={style.slug}
              href={categoryHref(style)}
              className="card group flex flex-col transition-shadow duration-200 hover:border-primary-200 hover:shadow-md"
              data-animate
              data-delay={(index % 4) * STAGGER}
            >
              <div className="aspect-square shrink-0 overflow-hidden bg-gray-100">
                <img
                  src={style.image}
                  alt={style.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 items-center justify-center px-4 py-4">
                <h3 className="text-center text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary-600">
                  {style.name}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Industry dimension — image tiles, same build as the style grid */}
        <div className="mt-8">
          <p className="eyebrow mb-4 text-center">
            {industriesLabel}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <a
                key={industry.slug}
                href={categoryHref(industry)}
                className="card group flex flex-col transition-shadow duration-200 hover:border-primary-200 hover:shadow-md"
                data-animate
                data-delay={(index % 4) * STAGGER}
              >
                <div className="aspect-square shrink-0 overflow-hidden bg-gray-100">
                  <img
                    src={industry.image}
                    alt={industry.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 items-center justify-center px-4 py-4">
                  <h3 className="text-center text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary-600">
                    {industry.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
