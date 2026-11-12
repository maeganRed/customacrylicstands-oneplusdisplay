import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  /** Crumb trail from the home page to the current page; the last item is never linked */
  items: Crumb[];
  className?: string;
  /** `dark` switches to colors readable on the image banner background */
  tone?: "light" | "dark";
}

/** Breadcrumb trail shared by the inner-page banner and the detail pages */
export default function Breadcrumbs({
  items,
  className = "",
  tone = "light",
}: BreadcrumbsProps) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={`flex flex-wrap items-center gap-1 text-sm ${
          dark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1"
            >
              {index > 0 && (
                <ChevronRight
                  className={`h-3.5 w-3.5 ${dark ? "text-gray-500" : "text-gray-400"}`}
                  aria-hidden="true"
                />
              )}
              {isLast || !item.href ? (
                <span className={dark ? "text-gray-200" : "text-gray-700"}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={`transition-colors ${
                    dark
                      ? "hover:text-white"
                      : "hover:text-primary-600"
                  }`}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
