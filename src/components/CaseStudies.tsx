import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "../types";
import { featuredCases } from "../data/cases";
import SectionHeader from "./SectionHeader";
import Pagination from "./Pagination";

/** Cards sitting in the same row appear 60ms apart */
const STAGGER = 60;

interface CaseStudiesProps {
  /** Defaults to the featured programmes */
  cases?: CaseStudy[];
  title?: string;
  subtitle?: string;
  /**
   * `true` (home page) renders the centred section heading above the grid;
   * `/case-studies` passes `false` because its PageHeader already carries the title.
   */
  showHeader?: boolean;
  /** Render the headline result metrics on each card (home page) */
  showResults?: boolean;
  /** Optional link beside the section heading */
  action?: { label: string; href: string };
  currentPage?: number;
  totalPages?: number;
  /** Page 1 at /case-studies/, page 2+ at /case-studies/page/2/ */
  basePath?: string;
  pageBasePath?: string;
}

/**
 * Customer programmes as a three-column card grid, shared by the home page
 * and the /case-studies index so the card design cannot drift apart.
 */
export default function CaseStudies({
  cases,
  title = "Success Stories",
  subtitle = "See how brands, retail chains and distributors have taken acrylic and PVC foam board displays into store",
  showHeader = true,
  showResults = false,
  action,
  currentPage = 1,
  totalPages = 1,
  basePath = "/case-studies/",
  pageBasePath = "/case-studies/page",
}: CaseStudiesProps) {
  const grid = cases ?? featuredCases;
  /* Without a section heading the card title sits directly under the page h1 */
  const CardHeading = showHeader ? "h3" : "h2";

  return (
    <section className="section" id="cases">
      <div className="container-page">
        {showHeader && (
          <SectionHeader
            title={title}
            subtitle={subtitle}
            align="center"
            action={action}
          />
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {grid.map((item, index) => (
            <article
              key={item.slug}
              className="card group"
              data-animate
              data-delay={(index % 3) * STAGGER}
            >
              <a
                href={`/case-studies/${item.slug}/`}
                className="flex h-full flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-xs bg-white/90 px-3 py-1 text-sm font-medium text-gray-900">
                      {item.country}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-1 text-sm font-medium text-primary-600">
                    {item.company}
                  </div>
                  <CardHeading className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                    {item.title}
                  </CardHeading>
                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {item.description}
                  </p>
                  {showResults && item.results && item.results.length > 0 && (
                    <dl className="mb-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                      {item.results.slice(0, 4).map((result) => (
                        <div
                          key={result.label}
                          className="flex flex-col-reverse"
                        >
                          <dt className="text-[11px] leading-snug text-gray-500">
                            {result.label}
                          </dt>
                          <dd className="text-base font-bold text-primary-600">
                            {result.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="capitalize">{item.industry}</span>
                    <span>{item.year}</span>
                    <span>{item.volume}</span>
                  </div>
                  <div className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary-600">
                    Read case study
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
          pageBasePath={pageBasePath}
        />
      </div>
    </section>
  );
}
