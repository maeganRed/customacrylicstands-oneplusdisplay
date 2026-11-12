import type { NavItem } from "../types";

/**
 * Header navigation. `megaMenu: true` opens the product mega menu,
 * `children` renders a small hover dropdown.
 * There is no Home entry on purpose: the logo is the home link.
 * Every href ends with a slash, matching the canonical and the sitemap.
 */
export const mainNav: NavItem[] = [
  {
    label: "POP Retail Displays",
    href: "/pop-retail-displays/",
    megaMenu: true,
    /** Style listings, industry listings and product pages all live under this prefix */
    match: ["/pop-retail-displays"],
  },
  {
    /**
     * The parent link opens the process overview; one child per stage.
     * Stage pages live at /order-process/<slug>/, so they light up this entry
     * on their own — no `match` needed. Slugs mirror `orderStages`.
     */
    label: "Order Process",
    href: "/order-process/",
    children: [
      { label: "Concept Design", href: "/order-process/concept-design/" },
      { label: "Structural Design", href: "/order-process/structural-design/" },
      { label: "Graphic Design", href: "/order-process/graphic-design/" },
      { label: "Prototyping", href: "/order-process/prototyping/" },
      { label: "Manufacturing", href: "/order-process/manufacturing/" },
      { label: "Packout & Logistics", href: "/order-process/packout-logistics/" },
    ],
  },
  { label: "Case Studies", href: "/case-studies/" },
  {
    /**
     * The parent link opens the company overview; the two profile-style pages
     * sit under it. Child pages light up this entry through `children`, so no
     * `match` prefix is needed.
     */
    label: "About Us",
    href: "/about-us/",
    children: [
      { label: "About Us", href: "/about-us/" },
      { label: "Customer Testimonials", href: "/customer-testimonials/" },
      { label: "Jack Li, Production & Quality Director", href: "/jack-li/" },
    ],
  },
  {
    label: "Resources",
    href: "/news/",
    children: [
      { label: "News", href: "/news/" },
      { label: "Video", href: "/videos/" },
      { label: "FAQ", href: "/faq/" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];

/**
 * Footer link columns (the contact column is built from `site.contact`,
 * the display-style column from `styleCategories`).
 */
export const footerColumns = [
  {
    title: "Support",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Customer Testimonials", href: "/customer-testimonials/" },
      { label: "Case Studies", href: "/case-studies/" },
      { label: "Order Process", href: "/order-process/" },
      { label: "News", href: "/news/" },
      { label: "Video", href: "/videos/" },
      { label: "FAQ", href: "/faq/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];

/** Bottom bar links */
export const legalLinks = [
  { label: "Sitemap", href: "/sitemap-index.xml" },
  { label: "Contact", href: "/contact/" },
];
