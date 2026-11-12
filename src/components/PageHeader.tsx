import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

/** Content width: default 1280px; narrow 1152px for pages whose body is narrower */
type PageHeaderWidth = "default" | "narrow";

type PageHeaderProps =
  | {
      variant?: "banner";
      width?: PageHeaderWidth;
      title: string;
      subtitle?: string;
      breadcrumbs?: Crumb[];
      /** When set, the banner becomes a dark photo band with this background */
      image?: string;
    }
  | {
      /** Only the full-width breadcrumb strip; the page renders its own heading */
      variant: "breadcrumb";
      width?: PageHeaderWidth;
      breadcrumbs: Crumb[];
    };

/**
 * Shared inner-page banner.
 * `banner` (default) renders breadcrumbs + h1 + subtitle in a grey band;
 * `breadcrumb` renders the strip alone for pages that place the heading
 * inside their content grid.
 */
export default function PageHeader(props: PageHeaderProps) {
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    ...(props.breadcrumbs ?? []),
  ];
  /* Utilities win over the .container-page max-width, so this only narrows
     the pages that ask for it; every other page keeps the 1280px shell. */
  const shell = props.width === "narrow" ? "container-page max-w-6xl" : "container-page";

  if (props.variant === "breadcrumb") {
    /* Transparent on purpose: the catalogue pages paint the full area grey */
    return (
      <section>
        <div className={`${shell} pt-5 pb-1`}>
          <Breadcrumbs items={crumbs} />
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        props.image
          ? "relative overflow-hidden bg-gray-900"
          : "border-b border-gray-100 bg-gray-50"
      }
    >
      {props.image && (
        <>
          {/* Mobile: full width, natural ratio, centered; desktop: cover */}
          <img
            src={props.image}
            alt=""
            aria-hidden="true"
            className="absolute left-0 top-1/2 w-full -translate-y-1/2 md:top-0 md:h-full md:translate-y-0 md:object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" aria-hidden="true" />
        </>
      )}
      <div className={`${shell} py-12 md:py-16 ${props.image ? "relative" : ""}`}>
        {props.breadcrumbs && props.breadcrumbs.length > 0 && (
          <Breadcrumbs
            className="mb-4"
            items={crumbs}
            tone={props.image ? "dark" : "light"}
          />
        )}

        <h1
          className={`text-3xl font-bold md:text-4xl ${
            props.image ? "text-white" : "text-gray-900"
          }`}
        >
          {props.title}
        </h1>
        {/* Industrial accent: brand-blue tick echoing the home page rhythm */}
        <span className="mt-4 block h-1 w-12 bg-primary-600" aria-hidden="true" />
        {props.subtitle && (
          <p
            className={`mt-4 max-w-3xl text-lg ${
              props.image ? "text-gray-200" : "text-gray-600"
            }`}
          >
            {props.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
