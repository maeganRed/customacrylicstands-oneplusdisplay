import type { Category } from "../types";

/**
 * Single source of truth for internal URLs.
 * The whole catalogue sits under one hub: style listings, industry listings
 * and product detail pages are all /pop-retail-displays/<slug>/, with no
 * category segment in front of a product.
 * Every href ends with a slash: internal links, the sitemap and the canonical
 * tag must publish one and the same URL.
 */

export const productHref = (slug: string): string => `/pop-retail-displays/${slug}/`;

export const categoryHref = (category: Category): string =>
  `/pop-retail-displays/${category.slug}/`;
