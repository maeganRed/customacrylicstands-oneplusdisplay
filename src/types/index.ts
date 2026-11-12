/**
 * Shared content types.
 * Every component receives data through these shapes, so editing a data file
 * is enough to change the site — no component code needs to be touched.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  /** Optional dropdown / mega-menu entries */
  children?: NavLink[];
  /** Renders the large product mega menu instead of a simple dropdown */
  megaMenu?: boolean;
  /**
   * Extra path prefixes that still belong to this entry, so it stays
   * highlighted on pages it does not link to directly
   * (e.g. the catalogue menu owns everything under /pop-retail-displays/*).
   */
  match?: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "linkedin" | "youtube";
}

export interface ContactInfo {
  email: string;
  phone: string;
  /** tel: link value, digits and + only (no spaces) */
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  /** Display form of the site URL, e.g. "www.oneplusdisplay.com" */
  website: string;
  /** Absolute URL behind the website display value */
  websiteHref: string;
  address: string;
  /** Factory coordinates for the contact-page map (same spot as the CN site) */
  mapLat: number;
  mapLng: number;
}

export interface Stat {
  value: string;
  label: string;
}

/** One buying parameter in the home page spec strip, e.g. "MOQ" / "100 sets" */
export interface SpecItem {
  label: string;
  value: string;
}

/** One slide of the home page hero: a material theme with its own copy and photo */
export interface HeroSlide {
  /** Short line above the headline, e.g. "Acrylic specialist since 2013" */
  badge: string;
  /** First headline line */
  titleLine1: string;
  /** Second headline line, rendered in brand blue */
  titleLine2: string;
  /** Optional capability tags rendered as chips above the buttons */
  highlights?: string[];
  /**
   * Qualifying terms shown as one dot-separated line under the headline.
   * Unlike `highlights` these stay visible on phones: they are the filter
   * that tells a visitor whether the factory is the right fit.
   */
  qualifiers?: string[];
  description: string;
  /**
   * The single action of the slide. The hero carries one button only: a
   * second link competes with it and splits the enquiry, so there is none.
   */
  primaryCta: NavLink;
  /** Full-bleed background photo (Ken Burns drift + cross-fade); poster for video slides */
  image: string;
}

/** One headline number of a case study, e.g. "Repeat order rate" / "68%" */
export interface CaseResult {
  label: string;
  value: string;
}

/** Style = how the stand is built; industry = who it is merchandised for */
export type CategoryGroup = "style" | "industry";

export interface Category {
  slug: string;
  name: string;
  shortName: string;
  group: CategoryGroup;
  description: string;
  image: string;
  alt: string;
}

/**
 * One catalogue entry. Everything the product page shows is here: there is no
 * second file to keep in sync, so uploading a product means adding one object.
 */
export interface Product {
  /** Product title: the H1, the card label and the source of the URL slug */
  name: string;
  /**
   * URL segment, derived from `name` by `defineProduct()` in
   * `data/products.ts`. Never written by hand, so the link always follows the
   * title and cannot drift away from it.
   */
  slug: string;
  /** Primary category: always the slug of a `style` category */
  categorySlug: string;
  categoryName: string;
  /** Industries this model is built for: `industry` category slugs, many-to-many */
  industrySlugs: string[];
  /** Paragraph under the H1, also used as the meta description */
  description: string;
  /** Paragraph at the top of the Specifications panel */
  overview: string;
  /**
   * One specification per line, written as "Label: Value" — plain text, no
   * markup. The page splits on the first colon and renders two columns.
   */
  specs: string[];
  /** Product photos: the first one is the card image and the share image */
  images: GalleryImage[];
  featured?: boolean;
}

export interface CaseStudy {
  slug: string;
  country: string;
  company: string;
  title: string;
  description: string;
  industry: string;
  year: string;
  volume: string;
  quote: string;
  /** Name and role of the person quoted, e.g. "Marcus Weber, Purchasing Manager" */
  quoteBy?: string;
  image: string;
  alt: string;
  /** Shows the story in the home page grid as well as the full list */
  featured?: boolean;
  /** Headline numbers rendered as a metric strip on the list and detail page */
  results?: CaseResult[];
  /** Long-form write-up, same shape as news article bodies */
  body?: ContentSection[];
}

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, formatted for display in the component */
  date: string;
  category: string;
  image: string;
  alt: string;
  /** Article detail page (all optional so teasers stay usable without them) */
  author?: string;
  /** ISO date of the last edit */
  updated?: string;
  /** Estimated reading time in minutes */
  readMinutes?: number;
  body?: ContentSection[];
}

/* --------------------------------------------------------------------------
   Detail pages (product + article)
   -------------------------------------------------------------------------- */

export interface GalleryImage {
  src: string;
  /** Screen-reader and lightbox caption; falls back to the product title */
  alt?: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

/** One heading + body block, shared by product details and article bodies */
export interface ContentSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** One tab of the product page information panel */
export interface ProductTab {
  /** DOM id and deep-link hash, e.g. "specifications" */
  id: string;
  label: string;
}

/** One artwork-preparation rule shown in the Artwork Guidelines panel */
export interface ArtworkGuideline {
  heading: string;
  body: string;
}

/** One reason-to-buy card in the Why Choose panel */
export interface ProductValue {
  title: string;
  description: string;
}



export interface Advantage {
  title: string;
  description: string;
  /** Small supporting line under the description, e.g. "Sample built in 48 hours" */
  meta?: string;
  icon:
    | "factory"
    | "palette"
    | "shield"
    | "ship"
    | "clock"
    | "layers"
    | "award"
    /* Customisation, quality gates and B2B services */
    | "ruler"
    | "droplet"
    | "tag"
    | "wrench"
    | "package"
    | "clipboard"
    | "printer";
}

/**
 * One customer feedback card.
 *
 * Home-page entries currently ship as sample copy so the grid can be seen in
 * full; they carry `sample: true`, which renders a "Sample" tag on the card.
 * Replace the entry with a signed quote and drop the flag to publish it.
 */
export interface Testimonial {
  quote: string;
  /** Person quoted, or the generic role while the card is sample copy */
  name: string;
  role?: string;
  company?: string;
  country?: string;
  /** True while the quote is sample copy rather than signed feedback */
  sample?: boolean;
}

/* --------------------------------------------------------------------------
   About page
   -------------------------------------------------------------------------- */

/** One node of the company timeline */
export interface Milestone {
  /** "2013" or a range such as "2024 – 2025" */
  year: string;
  title: string;
  description: string;
  /** Short tag naming the material / capability introduced */
  tag: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  alt: string;
  /** Person page for this member; cards without it render no link */
  href?: string;
}

export interface Certification {
  name: string;
  detail: string;
  image: string;
  alt: string;
}
