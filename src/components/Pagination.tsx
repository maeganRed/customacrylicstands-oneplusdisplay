import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** URL of page 1, e.g. "/pop-retail-displays/" */
  basePath: string;
  /** Prefix for page 2 and later, e.g. "/pop-retail-displays/page" → "/pop-retail-displays/page/2/" */
  pageBasePath?: string;
}

/** Every href ends with a slash, like the rest of the internal links */
const pageHref = (
  basePath: string,
  pageBasePath: string,
  page: number,
): string => (page === 1 ? basePath : `${pageBasePath}/${page}/`);

/** Static pager: plain links, no client-side state, hidden when there is one page */
export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  pageBasePath = basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const cell =
    "inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-xs px-3 text-sm font-semibold transition-colors";
  const idle = "bg-white text-gray-700 hover:bg-gray-50 hover:text-primary-600";
  const active = "bg-primary-600 text-white";
  const disabled = "cursor-not-allowed bg-white/60 text-gray-300";

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <a
          href={pageHref(basePath, pageBasePath, currentPage - 1)}
          rel="prev"
          className={`${cell} ${idle}`}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </a>
      ) : (
        <span aria-disabled="true" className={`${cell} ${disabled}`}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      {pages.map((page) =>
        page === currentPage ? (
          <span key={page} aria-current="page" className={`${cell} ${active}`}>
            {page}
          </span>
        ) : (
          <a
            key={page}
            href={pageHref(basePath, pageBasePath, page)}
            className={`${cell} ${idle}`}
          >
            {page}
          </a>
        ),
      )}

      {currentPage < totalPages ? (
        <a
          href={pageHref(basePath, pageBasePath, currentPage + 1)}
          rel="next"
          className={`${cell} ${idle}`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : (
        <span aria-disabled="true" className={`${cell} ${disabled}`}>
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
