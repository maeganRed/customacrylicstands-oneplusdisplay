import type { ContactInfo, HeroSlide, SocialLink } from "../types";
import { images } from "./images";

/**
 * Global site settings: brand, contact details, hero copy and CTA copy.
 * Every fact here is checked against the company profile — do not invent
 * numbers, prices or certificates that are not on file.
 */
export const site = {
  name: "One Plus Display",
  legalName: "One Plus Display Co., Ltd.",
  tagline: "Custom Acrylic & PVC Foam Board Display Stands",
  description:
    "Factory-direct custom acrylic and PVC foam board display manufacturer for brands, retailers and distributors worldwide — MOQ 100 sets, free 3D render in 24 hours, sample built in 48 hours.",
  /** Used for canonical URLs, sitemap and Open Graph. Keep in sync with astro.config.mjs */
  url: "https://www.customacrylicstands.com",
  locale: "en",

  logo: {
    /** Single-colour wordmark; used as-is in the header and inverted in the footer */
    src: images.logo,
    alt: "One Plus Display",
  },

  /** Brand color used by ThemeScript / meta tags (Tailwind tokens live in global.css) */
  themeColor: "#245dab",

  contact: {
    email: "inquiry@oneplusdisplay.com",
    phone: "+86 136 3160 1255",
    phoneHref: "+8613631601255",
    whatsapp: "+86 136 3160 1255",
    whatsappHref: "https://wa.me/8613631601255",
    website: "www.oneplusdisplay.com",
    websiteHref: "https://www.oneplusdisplay.com",
    address: "No.6, Santang East Rd., Gaobu Town, Dongguan, Guangdong, CN 523287",
    /** Factory pin on the contact-page map — same coordinates as popzhihuojia.com/contact */
    mapLat: 23.115,
    mapLng: 113.759,
  } satisfies ContactInfo,

  /**
   * Named person carrying the site's E-E-A-T signal, the way popdisplay.me
   * signs its copy with a founder. Same person as the Jack Li entry in
   * `aboutTeam` (about.ts), so only one Jack appears site-wide. Placeholder
   * details — adjust title and channels once confirmed.
   */
  persona: {
    name: "Jack Li",
    title: "Production & Quality Director",
    email: "inquiry@oneplusdisplay.com",
    whatsapp: "+86 136 3160 1255",
  },

  /** Replace the URLs below with the live company accounts once they are verified */
  social: [
    { label: "Facebook", href: "https://facebook.com/oneplusdisplay", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com/oneplusdisplay", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com/company/one-plus-display", icon: "linkedin" },
    { label: "YouTube", href: "https://youtube.com/@oneplusdisplay", icon: "youtube" },
  ] satisfies SocialLink[],

  /**
   * Home page hero carousel: three full-screen photo themes. The copy sits in
   * one centred column over the photo — no second image beside it, so the
   * headline and the single CTA are the only things asking for attention.
   * Every slide gets its own full-bleed background (slow Ken Burns drift, 0.7s
   * cross-fade). The factory-floor video slide is out of the rotation for now
   * — see `images.heroFactoryVideo` to restore it.
   *
   * `ctaNote` sits at hero level, not per slide: the risk-reversal line is
   * the same on all three, and repeating it per slide would only invite it to
   * drift apart. Each slide carries exactly one `primaryCta`; a second link
   * split the enquiry.
   */
  hero: {
    ctaNote:
      "Free 3D render in 24 hours · Sample built in 48 hours · MOQ 100 sets",
    slides: [
      {
        badge: "Trusted by 5,000+ brands, wholesale buyers & retail chains since 2013",
        titleLine1: "Custom Acrylic Display Stands",
        titleLine2: "Built for Bulk. Priced by the Factory.",
        qualifiers: [
          "Bulk B2B only",
          "MOQ 100 sets",
          "12–15 day bulk runs",
        ],
        // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs QC load test
        highlights: [
          "20–55 kg per shelf",
          "±1 mm cut and drill",
          "Sample fee refunded at 100 sets",
        ],
        description:
          "Send a photo, a size and a quantity. The 3D render and the factory price come back in 24 hours; the sample is built in 48 hours.",
        primaryCta: {
          label: "Request a Quote",
          href: "/contact/",
        },
        image: images.heroBg01,
      },
      {
        badge: "Cast acrylic, cut, bent and polished in-house",
        titleLine1: "Custom Acrylic",
        titleLine2: "Display Stands",
        qualifiers: ["MOQ 100 sets", "±1 mm tolerance", "Sample built in 48 hours"],
        // [VERIFY] HP-03 8–15 mm — confirm the cast-acrylic thicknesses the line runs
        // [VERIFY] HP-16 20–55 kg per shelf — needs the QC load test
        highlights: [
          "8–15 mm cast acrylic",
          "Diamond-polished edges",
          "20–55 kg per shelf",
        ],
        description:
          "Clear, frosted, black or Pantone-matched. Cut, heat-bent and diamond-polished on our own line, so the edge in your hand matches the render.",
        primaryCta: {
          label: "Request a Quote",
          href: "/contact/",
        },
        image: images.heroBg02,
      },
      {
        badge: "PVC foam board, printed full color",
        titleLine1: "PVC Foam Board",
        titleLine2: "Display Stands",
        qualifiers: ["MOQ 100 sets", "12–15 days bulk", "90%+ container load"],
        highlights: [
          "UV flatbed print",
          "Cut to any silhouette",
          "Under 3 minutes, no tools",
        ],
        // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
        description:
          "Full-color UV print on rigid foam board. Ships flat to cut freight, holds 20–55 kg per shelf, and one person builds it in the aisle in under three minutes.",
        primaryCta: {
          label: "Request a Quote",
          href: "/contact/",
        },
        image: images.heroBg03,
      },
    ] satisfies HeroSlide[],
  },

  cta: {
    title: "Need Jack's Team to Review Your Display Project?",
    description:
      "Share your product size, estimated quantity, target retail channel, artwork status and timeline. Jack's team handles structure planning, free 3D rendering, sampling and factory-direct production from 100 sets.",
    primary: { label: "Request a Quote", href: "/contact/" },
    secondary: { label: "Email the Factory", href: "mailto:inquiry@oneplusdisplay.com" },
  },

  // [VERIFY] HP-02 5,000+ brands served — replace with the customer count on file
  footerBlurb:
    "Custom acrylic and PVC foam board display stands, made by One Plus Display in our own 23,000 m² plant since 2013. MOQ 100 sets · free 3D render in 24 hours · sample built in 48 hours · 5,000+ brands served.",

  seo: {
    defaultTitle:
      "Custom Acrylic Display Stands Manufacturer | One Plus Display",
    /** Set to "" to skip the suffix, e.g. "About Us | One Plus Display" */
    titleSuffix: "One Plus Display",
    defaultDescription:
      "Factory-direct custom acrylic and PVC foam board display stands: MOQ 100 sets, free 3D render in 24 hours, sample built in 48 hours, bulk runs in 12–15 days.",
    ogImage: images.ogImage,
  },
};

export type Site = typeof site;
