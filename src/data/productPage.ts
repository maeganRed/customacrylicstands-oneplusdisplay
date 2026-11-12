import type {
  ArtworkGuideline,
  FaqItem,
  Product,
  ProductTab,
  ProductValue,
  SpecRow,
} from "../types";

/**
 * Copy shared by every product page: the four information tabs, the artwork
 * rules, the reasons-to-buy panel, the closing call to action, and the
 * generator that writes the seven product questions from the product title.
 * The inquiry form wording lives in `inquiry.ts`, because the pop-up quote
 * dialog uses the same fields.
 *
 * Per-product content (photos, title, description, Overview, specification
 * lines) lives in `products.ts`. Nothing here repeats it, and this file
 * imports nothing but types, so the two can never form a circular dependency.
 */

export const productTabs: ProductTab[] = [
  { id: "specifications", label: "Product Details" },
  { id: "artwork-guidelines", label: "Artwork Guidelines" },
  { id: "order-process", label: "Order Process" },
  { id: "why-choose", label: "Why Choose One Plus Display" },
];

/** Small print under the specification table, shared by every product */
export const productSpecNote =
  "Product photos are for reference only. Every stand can be customized in size, material, color, print and branding before the first production run.";

/**
 * The seven questions on every product page are generated from that product's
 * own title, so a new upload gets keyword-relevant copy without anyone writing
 * FAQ text. The title is `Main product name - Custom subtitle`; the part before
 * the dash, with the wholesale prefix dropped, is the product phrase the
 * questions are built around, e.g. "lockable acrylic lighter display case".
 */
const productKeyword = (name: string): string => {
  const main = name.split(" - ")[0].trim();
  /* Lowercased so it reads mid-sentence; industry acronyms keep their case */
  return main
    .replace(/^wholesale\s+/i, "")
    .trim()
    .toLowerCase()
    .replace(/\bpvc\b/g, "PVC");
};

/**
 * Seven questions derived from the product title, its description and the
 * customization service: layout, materials, MOQ, sampling, print, packing and
 * trade terms. Every figure here is already published elsewhere on the site.
 */
export function productFaqsFor(
  product: Pick<Product, "name" | "description">,
): FaqItem[] {
  const keyword = productKeyword(product.name);

  return [
    {
      question: `What does this ${keyword} include?`,
      answer: `${product.description} The specification panel above lists the material, build detail, options and packing for this build, and anything on that list can be re-cut, re-printed or re-specified before production starts.`,
    },
    {
      question: "Can the size, shelf count and layout be customized?",
      answer: `Yes. Every ${keyword} is drawn from your pack sizes, shelf space and planogram: height, width, shelf pitch, lock or lighting, and the printed panels are all adjustable. A free 3D render comes back in 24 hours and is revised until you sign the drawing — the unit is built from sheet, not from a mold, so a change costs drawing time rather than tooling.`,
    },
    {
      question: "Which materials and finishes can you build it in?",
      answer:
        "High-clarity or colored cast acrylic and PVC foam board, cut, diamond-polished, printed and assembled in one plant. LED strips, castors and turntables are sourced and fitted in-house, so a mixed-material build still arrives as one finished stand.",
    },
    {
      question: `What is the minimum order for a custom ${keyword}?`,
      answer:
        "100 sets per design, for both acrylic and PVC builds. Artwork or color variants of the same structure can share one production run — agree the split at quoting stage. We supply wholesale and bulk orders only.",
    },
    {
      question: "How long do the sample and the bulk order take?",
      answer:
        "A standard sample is built in 48 hours once dimensions and artwork are approved, and bulk production runs 12–15 days after sample approval. The sample is around US$100 depending on complexity and is refunded once your order reaches 100 sets.",
    },
    {
      question: "Can our logo, brand colors and campaign artwork be printed?",
      answer:
        "Yes. Send a vector PDF, AI or EPS file, or a bitmap at 300 DPI at final size, set up in CMYK with Pantone references where an exact match matters. A digital proof comes back for written sign-off before the first panel is printed, and the approved file becomes the reference for the batch.",
    },
    {
      question: `How is the ${keyword} packed, and which trade terms do you quote?`,
      answer:
        "Cartons with paper corner protection for flat-packed and knock-down units, wooden crates with foam blocking for assembled acrylic, pallets optional, and a container load rate above 90%. Photos of the packed units are sent before the container is loaded, and we quote FOB, CIF or DDP.",
    },
  ];
}

/** Artwork rules shown in the second tab. Generic for the whole catalogue. */
export const artworkGuidelines: ArtworkGuideline[] = [
  {
    heading: "File Format and Resolution",
    body: "Send a vector PDF, AI or EPS file. Bitmap artwork (JPEG, PNG) is accepted at 300 DPI or higher at final print size; anything below that is re-drawn as vector before we print.",
  },
  {
    heading: "Bleed and Safe Zone",
    body: "Add 3 mm (0.125 in) of bleed on all four sides and keep text, logos and barcodes at least 6 mm (0.25 in) inside the trim line, so nothing important is cut or wrapped around an edge.",
  },
  {
    heading: "Color Mode",
    body: "Set files up in CMYK. RGB artwork is converted before printing, and Pantone references are matched on press under a color-calibrated light — send the Pantone numbers with the file when an exact match matters.",
  },
  {
    heading: "Fonts and Line Weights",
    body: "Convert all text to outlines. Keep the smallest type at 6 pt or larger and every rule at 0.25 pt or thicker, or thin strokes break up once they are printed on acrylic or PVC foam board.",
  },
  {
    heading: "Proofing",
    body: "A digital proof comes back for sign-off before the first panel is printed. Nothing goes on the printer until you approve the proof in writing, and the approved file becomes the reference for the batch.",
  },
];

/** Reasons-to-buy panel: factory, design, sample, delivery. */
export const whyChooseUs: ProductValue[] = [
  {
    title: "Built on Our Own Floor",
    description:
      "Sheet cutting, edge polishing, UV printing and assembly run in one 23,000 m² plant, so the team that quotes your stand is the team that builds it.",
  },
  {
    title: "Designed Before It Is Priced",
    description:
      "Send a product photo and the shelf it stands on. A 3D render comes back in 24 hours, revised until you sign the drawing — before any deposit.",
  },
  {
    title: "Your Sample Sets the Standard",
    description:
      "The pre-production sample comes off the production line, not a separate bench. Once you approve it, that unit becomes the inspection reference for the whole run.",
  },
  {
    title: "Packed for the Crossing",
    description:
      "Flat-packed or crated with paper corner protection, quoted FOB, CIF or DDP, with photos of the packed units sent before the container is loaded.",
  },
];

/** Closing call to action, shared by every product page */
export const productCta = {
  title: "Need Jack's Team to Review Your Stand Specification?",
  description:
    "Share your product size, target quantity, artwork status and the retail channel the stand ships to. Jack's team returns a structure plan, a free 3D render, a sample date and a factory-direct price from 100 sets.",
};

/**
 * Quick-contact stack that sits under the photos on every product page:
 * the quote shortcut (anchored to the form in the right column), the
 * references link, the two direct channels, three service points and an
 * escalation line.
 */
export const productQuickContact = {
  /**
   * Opens the site-wide quote dialog through `data-inquiry-open`; the href is
   * the no-JS fallback and must stay a real page.
   */
  quote: { label: "Get A Quick Quote & 3D Design", href: "/contact/" },
  /** Decorative review stars above the references link */
  stars: 6,
  referrals: { label: "See Our Client Referrals", href: "/customer-testimonials/" },
  emailLabel: "Email Us",
  whatsappLabel: "WhatsApp",
  points: ["Free Design", "24h Response", "MOQ 100 Units (test run)"],
  /**
   * [VERIFY] Seven@oneplusdisplay.com is a per-rep mailbox supplied by the
   * client; site.contact.email (inquiry@) stays the address on every form.
   * Confirm the mailbox is live before launch.
   */
  help: {
    before: "Need help? Contact our experts at",
    email: "Seven@oneplusdisplay.com",
    after: "for custom solutions and bulk pricing.",
  },
};

/** Key terms repeated beside the six order steps */
export const productOrderTerms: SpecRow[] = [
  { label: "Minimum order", value: "100 sets per design" },
  { label: "3D render", value: "Free, in 24 hours" },
  { label: "Sample build time", value: "48 hours" },
  { label: "Bulk lead time", value: "12–15 days after approval" },
  { label: "Trade terms", value: "FOB / CIF / DDP" },
];
