import { ArrowRight } from "lucide-react";
import type { Product } from "../types";
import { productHref } from "../data/routes";
import { site } from "../data/site";

interface ProductCardProps {
  product: Product;
  /**
   * "default" — bordered square tile on a white background
   * "compact" — small tile used inside the header mega menu
   * "catalog" — borderless white tile on the grey catalogue page
   *
   * Titles are centred in every variant and every list, so the same product
   * looks the same on the home page, the catalogue and the product page.
   */
  variant?: "default" | "compact" | "catalog";
  /** Scroll-reveal delay in ms; the mega menu tiles omit it */
  revealDelay?: number;
  /**
   * Quote prompt under the tile. It is a link to /contact/ carrying
   * `data-inquiry-open`, so the quote dialog takes the click while the href
   * still works when JavaScript is off. It lives beside the product link, not
   * inside it: an action nested in a link would just follow the link.
   */
  ctaLabel?: string;
}

export default function ProductCard({
  product,
  variant = "default",
  revealDelay,
  ctaLabel,
}: ProductCardProps) {
  const href = productHref(product.slug);
  /* The first photo is the card image; a photo without its own alt falls back
     to the title, so an upload only needs files */
  const cover = product.images[0];
  const coverAlt = cover.alt ?? product.name;
  /* Cards in the same row appear 60ms apart; without a delay the card stays
     a plain static HTML element with no reveal */
  const animate =
    revealDelay === undefined
      ? {}
      : { "data-animate": "", "data-delay": revealDelay };

  if (variant === "compact") {
    return (
      <a
        href={href}
        className="group/card block overflow-hidden rounded-xs border border-gray-100 transition-all duration-200 hover:border-primary-200 hover:shadow-md"
      >
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img
            src={cover.src}
            alt={coverAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
          />
        </div>
        <div className="p-3">
          <h4 className="line-clamp-3 text-center text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover/card:text-primary-600">
            {product.name}
          </h4>
        </div>
      </a>
    );
  }

  if (variant === "catalog") {
    return (
      <a
        {...animate}
        href={href}
        className="group block overflow-hidden rounded-xs bg-white text-primary-600 transition-shadow duration-200 hover:shadow-md"
      >
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={cover.src}
            alt={coverAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="px-4 pb-4 pt-1">
          <h3 className="line-clamp-3 text-center text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary-600">
            {product.name}
          </h3>
        </div>
      </a>
    );
  }

  return (
    /* The tile is a container, not a link: the photo and the title keep one
       link to the product page, while the quote action below is a sibling, so
       pressing it opens the dialog instead of following the card. */
    <article
      {...animate}
      className="group flex flex-col overflow-hidden rounded-xs border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-lg"
    >
      <a href={href} className="flex flex-1 flex-col">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={cover.src}
            alt={coverAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="line-clamp-3 text-center text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary-600">
            {product.name}
          </h3>
        </div>
      </a>

      {ctaLabel && (
        <div className="space-y-2 px-4 pb-4">
          <a
            href={site.cta.primary.href}
            data-inquiry-open
            data-inquiry-product={product.name}
            className="flex items-center justify-center gap-1.5 bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={href}
            className="flex items-center justify-center gap-1.5 border border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
          >
            View Details
          </a>
        </div>
      )}
    </article>
  );
}
