import { ChevronDown } from "lucide-react";
import { industryCategories, styleCategories } from "../data/categories";
import { productsByCategory, productsByIndustry } from "../data/products";
import { categoryHref } from "../data/routes";

interface CategorySidebarProps {
  /** Slug of the category being browsed. Omit on the full catalogue. */
  activeSlug?: string;
}

/**
 * Category navigation shown to the left of every catalogue grid.
 * Only the two dimensions are listed; each is a collapsible `<details>`
 * block, so the accordion works without hydrating React on a static page.
 */
export default function CategorySidebar({ activeSlug }: CategorySidebarProps) {
  const baseRow =
    "flex items-center justify-between gap-3 border-l-[3px] px-4 py-3 text-sm transition-colors duration-150";
  const idleRow = "border-transparent text-gray-700 hover:bg-gray-50 hover:text-primary-600";
  /* Selected row: brand-blue border + tinted background, no font-weight
     change (bolding shifts text width and jolts the list layout) */
  const activeRow = "border-primary-600 bg-primary-50 text-primary-700";

  const groups = [
    {
      key: "style",
      label: "By Style",
      items: styleCategories.map((category) => ({
        ...category,
        count: productsByCategory(category.slug).length,
      })),
    },
    {
      key: "industry",
      label: "By Industry",
      items: industryCategories.map((category) => ({
        ...category,
        count: productsByIndustry(category.slug).length,
      })),
    },
  ];

  /* Sticky 7rem below the viewport top: the header measures top bar (2.25rem)
     + main bar (4rem) = 6.25rem on lg, leaving a 0.75rem gap. Update both
     together when the header height changes. */
  return (
    <nav
      aria-label="Product categories"
      className="lg:sticky lg:top-28 lg:self-start"
    >
      {groups.map((group, index) => {
        /* Only one group open at a time keeps the sticky panel inside the viewport */
        const holdsActive = group.items.some((item) => item.slug === activeSlug);
        const isOpen = holdsActive || (!activeSlug && group.key === "style");

        return (
          <details
            key={group.key}
            name="category-groups"
            open={isOpen}
            className={`group/acc ${index > 0 ? "mt-3" : ""}`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xs bg-primary-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 [&::-webkit-details-marker]:hidden">
              <span>{group.label}</span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-white/80 transition-transform duration-200 group-open/acc:rotate-180"
                aria-hidden="true"
              />
            </summary>

            <ul className="divide-y divide-gray-100 bg-white">
              {group.items.map((category) => {
                const isActive = category.slug === activeSlug;

                return (
                  <li key={category.slug}>
                    <a
                      href={categoryHref(category)}
                      aria-current={isActive ? "page" : undefined}
                      className={`${baseRow} ${isActive ? activeRow : idleRow}`}
                    >
                      <span className="leading-snug">{category.name}</span>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </nav>
  );
}
