import type { FaqItem, GalleryImage, HeroSlide, NavLink } from "../types";
import { site } from "./site";
import { images } from "./images";

/**
 * /home2/ preview page content — the decluttered home page the user compares
 * against the current one (`index.astro` + `home.ts`, both untouched).
 *
 * Voice: modelled on the group's Chinese site (popzhihuojia.com), rewritten
 * as English rather than translated:
 *   - the subject is the buyer's brand, not our catalog: say what the brand
 *     needs to express, then what we take over, then the chain (requirement →
 *     design → sampling → production), and let sell-through close as a result
 *   - every stand is custom, so never imply a stock product on sale: no
 *     "in stores now", "available now", "on the market", "in stock" or
 *     "shelf-ready" (a packaging term). "Stands in their stores" describes
 *     where a build ends up, not that it is for sale
 *   - headlines come in two lines: the first names the object, the second
 *     carries the promise (rendered in brand blue by <Hero />). Titles follow
 *     docs/copy-style-guide.md: propositional noun phrases or direct
 *     questions — no puns, no paired slogans, no imperatives
 *   - every body sentence has a subject and a verb; 8–28 words; 1–3 sentences
 *     per paragraph; no noun piles and no "A — B — C" dash fragments
 *   - spoken English over written English ("we will tell you", not "we say
 *     so"); only the trade terms a buyer uses: MOQ, FOB/CIF/DDP, dieline,
 *     UV printing, Pantone
 *   - never sell by disparaging traders: positive phrasing only ("the team
 *     that quotes your program is the team that builds it"), because agencies
 *     and trading companies are customers too
 *   - every figure owns exactly one home: factory scale → the one line under
 *     the capability grid; fulfilment times → hero qualifiers, process and
 *     FAQ; MOQ and price tiers → FAQ only
 *   - the quality pillar is one short paragraph + a link to /quality/
 *
 * Strings are self-contained (no import from `home.ts` — data files only
 * reference `images.ts`), so this file merges with `home.ts` once the user
 * picks a home page. Unconfirmed figures keep their `[VERIFY] HP-xx` marks.
 * US spelling throughout.
 */

/* --------------------------------------------------------------------------
   01 — Hero: three slides, one CTA each, no brand line
   Slide 1 is the only one in the static HTML (the carousel renders the active
   slide), so it carries the main keyword and the strongest promise.
   -------------------------------------------------------------------------- */

export const home2Hero = {
  slides: [
    {
      badge: "Custom display manufacturing since 2013",
      titleLine1: "Custom Display Stands",
      titleLine2: "Built Around Your Brand",
      /* Terms sit on slide 1 only — repeating them on every slide would
         drown the narrative */
      qualifiers: [
        "We supply businesses only. The minimum order is 100 sets.",
        "Bulk production takes 12–15 days.",
      ],
      description:
        "Every stand starts from your brand: the logo, the colors and the way the product should be presented. We then engineer it to the shelf, the load and the shopper who walks past it.",
      primaryCta: {
        label: "Request a Quote",
        href: "/contact/",
      },
      image: images.heroBg01,
    },
    {
      badge: "Design, sampling and production in one plant",
      titleLine1: "Your Custom Display Program",
      titleLine2: "From Design to Production",
      description:
        "Tell us what your brand needs to say in the store, where the stand will sit and how many units you need. We carry the program from concept sketch and structural drawing through sample approval and volume production, one team from the first sketch to the loaded pallet.",
      primaryCta: {
        label: "Request a Quote",
        href: "/contact/",
      },
      image: images.heroBg02,
    },
    {
      badge: "Acrylic and PVC foam board, made in our own plant",
      titleLine1: "Acrylic and PVC Display Stands",
      titleLine2: "Built to Your Brand Standard",
      description:
        "A custom stand is the one part of your brand that shoppers can walk up to and touch. We hold that standard from the first sample to the last unit in the run, so every store looks like your store.",
      primaryCta: {
        label: "Request a Quote",
        href: "/contact/",
      },
      image: images.heroBg03,
    },
  ] satisfies HeroSlide[],
  /* Replaces the component default (`site.hero.ctaNote`), which is a
     dot-separated fragment list */
  ctaNote:
    "Free 3D render in 24 hours. Sample built in 48 hours. No obligation to order.",
};

/* --------------------------------------------------------------------------
   02 — Capabilities: four icon items, modelled on the group's Chinese-language
   site (popzhihuojia.com trust-strip). They now sit inside the intro block on
   /home2/ rather than in a separate band. Replaces the old five-figure trust
   band — the list is a scan, not a spec sheet, so no numbers repeat.
   -------------------------------------------------------------------------- */

export interface CapabilityItem {
  title: string;
  sub: string;
  /** Inline SVG path data, rendered 34×34 at stroke 1.7 in currentColor */
  paths?: string[];
  /** Original icon file from the Chinese site (sample-validation mark) */
  iconSrc?: string;
}

export const home2Capabilities: CapabilityItem[] = [
  {
    title: "Concept Design",
    sub: "We can build to your drawing, or design the stand from your brand guidelines.",
    paths: [
      "M12 20h9",
      "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
    ],
  },
  {
    title: "Structural Design",
    sub: "We check the load, the joints and the tooling before we cut a single panel.",
    paths: ["M3 21L21 3V21H3Z", "M8 14V9l5 5H8Z"],
  },
  {
    title: "Sample Validation",
    sub: "The sample you approve becomes the standard for every unit in the run.",
    iconSrc: images.iconSampleValidation,
  },
  {
    title: "Production & Shipping",
    sub: "Bulk orders are packed to survive ocean freight.",
    paths: ["M21 8l-9-5-9 5v8l9 5 9-5V8z", "M3 8l9 5 9-5", "M12 13v8"],
  },
];

/**
 * Factory scale, printed once under the capability grid. Same figures the
 * live home page already uses in its trust band (`homeTrustBar`), so nothing
 * new is claimed here — and they appear nowhere else on this page.
 */
export const home2Scale =
  "13 years of display manufacturing, a 23,000 m² plant, 150+ staff and 350,000 stands a month, all from our own floor.";

/* --------------------------------------------------------------------------
   02b — Brand footprint: 24 customer logos in a pure-CSS marquee, modelled
   on the group's Chinese site (id=brands). International brands first,
   domestic brands last. NOTE: showing these logos on the English site is a
   public claim of client relationships — see docs/copy-claims-review.md.
   -------------------------------------------------------------------------- */

export const home2Brands = {
  kicker: "Brand Footprint",
  title: "Our Display Stands Sit in **Stores of Global Brands**",
  lead:
    "We manufacture display stands for well-known retail and consumer goods brands, and you will find them standing in those brands' stores and on their shelves. Many of those brands are Fortune 500 companies and other international names.",
};

export interface BrandLogo {
  /** Brand name; also used as the img alt text */
  name: string;
  src: string;
}

export const home2BrandLogos: BrandLogo[] = [
  { name: "Lay's", src: images.brandLays },
  { name: "Sam's Club", src: images.brandSamsClub },
  { name: "M&M's", src: images.brandMnMs },
  { name: "Colgate", src: images.brandColgate },
  { name: "Coca-Cola", src: images.brandCocaCola },
  { name: "POP MART", src: images.brandPopMart },
  { name: "RELX", src: images.brandRelx },
  { name: "Walmart", src: images.brandWalmart },
  { name: "NIVEA", src: images.brandNivea },
  { name: "Costco", src: images.brandCostco },
  { name: "Champion", src: images.brandChampion },
  { name: "Disney", src: images.brandDisney },
  { name: "Fanta", src: images.brandFanta },
  { name: "Oreo", src: images.brandOreo },
  { name: "Pokémon", src: images.brandPokemon },
  { name: "Caterpillar", src: images.brandCaterpillar },
  { name: "Kinder", src: images.brandKinder },
  { name: "L'Oréal", src: images.brandLOreal },
  { name: "Red Bull", src: images.brandRedBull },
  { name: "Monster Energy", src: images.brandMonster },
  { name: "LEGO", src: images.brandLego },
  { name: "Malawangzi", src: images.brandMalawangzi },
  { name: "Chengde Lulu", src: images.brandChengdeLulu },
  { name: "Yunnan Baiyao", src: images.brandYunnanBaiyao },
];

/* --------------------------------------------------------------------------
   03 — Who we are + what you get free before you order, one block
   -------------------------------------------------------------------------- */

export interface Home2Definition {
  title: string;
  paragraph: string;
  /** Real factory photo beside the intro — the sample room */
  image: GalleryImage;
  links: NavLink[];
  offerEyebrow: string;
  offerTitle: string;
  /** One line above the list: none of this work is charged or binding */
  offerLead: string;
  offerItems: string[];
}

export const home2Definition: Home2Definition = {
  title: "**Custom Display Solutions** Built in Our Own Factory",
  paragraph:
    "One Plus Display serves brands, retail chains, wholesalers and distributors that need custom displays for their stores. We take a program from brand requirements and structural design through sample approval and volume production, and all of it happens in our own plant, so you explain the project once.",
  image: {
    src: images.placeholderFactoryStrength,
    alt: "One Plus Display sample room filled with finished custom acrylic and PVC display stands",
  },
  links: [{ label: "See how we design and build", href: "/order-process/" }],
  offerEyebrow: "Free, with no obligation",
  offerTitle: "Everything You Get Before You Place an Order",
  offerLead:
    "None of the work below is charged, and none of it commits you to an order.",
  offerItems: [
    "You get a photorealistic 3D render within 24 hours, built to your dimensions and your artwork.",
    "We revise that render as many times as you need, until you approve the drawing.",
    "A physical sample is built in 48 hours.",
    "We send load, drop and packing test footage with every batch.",
    "We hand over a dieline template in AI or PDF format for your artwork team.",
  ],
};

/* --------------------------------------------------------------------------
   04 — Categories: the visual focus of the page
   -------------------------------------------------------------------------- */

export const home2Categories = {
  title: "**Custom Display Stand Categories** We Manufacture",
  subtitle:
    "We build floor stands, counter units, pegboard displays, lockable cases, LED-lit stands and foam board units. Tell us your product, your channel and your budget, and we will recommend the type that carries your brand best.",
  cta: { label: "Browse all display stand types", href: "/pop-retail-displays/" },
};

/* --------------------------------------------------------------------------
   05 — Customization: three rows, one per decision — concept, structure,
   surface. The design chain a buyer cannot see anywhere else.
   -------------------------------------------------------------------------- */

export interface CustomizationRow2 {
  title: string;
  body: string;
  points: string[];
  image: GalleryImage;
}

export const home2Customization = {
  title: "How We Engineer Your **Custom Display Stand**",
  subtitle:
    "We handle design, sampling and production in one factory. We settle the concept, the structure and the surface in our own plant before production starts, so the stand you approve is the stand that ships.",
  cta: { label: "Request a Quote", href: "/contact/" },
};

export const home2CustomizationRows: CustomizationRow2[] = [
  {
    title: "Design that starts from your brand, not from a catalog",
    body: "Send us your brand guidelines, the product and the shelf it will sit on. We come back with a photorealistic 3D render in 24 hours and revise it until you approve, so the design is settled before anything is cut.",
    points: [
      "Free 3D render in 24 hours",
      "Revisions until you approve",
      "Logo, color and type respected",
    ],
    image: {
      src: images.placeholderProcess02,
      alt: "3D render of a custom acrylic display stand beside its itemized factory quotation",
    },
  },
  {
    title: "Structural design that carries the load",
    body: "We work out the panel layout, the material thickness, the joints and the load path before we cut anything. That is why the first unit and the four-hundredth unit line up the same way, with every cut held to ±1 mm.",
    points: [
      "Load rating shown on the drawing",
      // [VERIFY] HP-04 3–15 mm — confirm the thickness range the cutting line actually quotes
      "3–15 mm, matched to the load",
      "Shelves, dividers, hooks and locks",
    ],
    image: {
      src: images.styleFloorStanding,
      alt: "Custom acrylic floor display stand with tiered shelves, made by One Plus Display",
    },
  },
  {
    title: "Material, color and print that hold your brand standard",
    body: "Choose cast acrylic, PVC foam board, or both in one unit. We match Pantone colors on request and proof the artwork before production, so the color on the tenth unit matches the first. The stand also flat-packs to use more than 90% of the container.",
    points: [
      "Cast acrylic and PVC foam board",
      "Pantone-matched on request",
      "UV print, proofed before production",
    ],
    image: {
      src: images.stylePvcFoamBoard,
      alt: "Printed PVC foam board display stand with full-color branding",
    },
  },
];

/* --------------------------------------------------------------------------
   06 — Why: three pillars; quality stays one short paragraph + link to
   /quality/
   -------------------------------------------------------------------------- */

export const home2Why = {
  title: "Why Brands Choose **One Plus Display**",
  subtitle:
    "Every order runs through the same five stages: requirement, design, sampling, production and delivery.",
  pillars: {
    manufacturing: {
      label: "Design and Production in Our Own Plant",
      body: "Cutting, heat bending, diamond polishing, UV printing and assembly all happen in our own plant. The engineers who design your stand also run the line that builds it, so a change on the drawing reaches production the same day.",
    },
    quality: {
      label: "Quality Control You Can Verify",
      body: "Every batch passes three inspection points and six tests, and we file the results under your batch number. They travel with your shipping documents, so the stand in the tenth store matches the sample you approved.",
    },
    certifications: {
      label: "A Certified Factory",
      body: "We hold amfori BSCI, CE, FSC, RoHS, Sedex and UL certificates, and we send copies with every quote. If your project needs a certificate we do not have yet, we will tell you before you order.",
    },
  },
};

/** Four process chips under the factory pillar — a scan, not a spec sheet */
export const home2FactoryChips: string[] = [
  "Acrylic cutting and bending",
  "Diamond polishing",
  "UV flatbed printing",
  "Assembly and packing",
];

/** Factory pillar CTA */
export const home2FactoryCta: NavLink = {
  label: "Learn More About Our Factory",
  href: "/about-us/",
};

/** Quality pillar CTA — the only way the home page talks about QC in depth */
export const home2QualityCta: NavLink = {
  label: "See the Full Quality Protocol",
  href: "/quality/",
};

/** Inspection photography beside the quality pillar */
export const home2InspectionImages: GalleryImage[] = [
  {
    src: images.productLighterCase1,
    alt: "Finished acrylic display cabinet checked for surface finish and edge quality",
  },
  {
    src: images.productLighterCase2,
    alt: "Acrylic cabinet inspected for door alignment and lock engagement",
  },
  {
    src: images.productLighterCase3,
    alt: "Assembled display unit measured and checked before packing",
  },
];

/* --------------------------------------------------------------------------
   07 — Process + factory tour
   -------------------------------------------------------------------------- */

export const home2Process = {
  title: "**Free 3D Design**, Fast Prototyping and Volume Production",
  subtitle:
    "Here is how an order runs, from the first requirement review to the container leaving our dock. The sample is built in 48 hours, and bulk production takes 12–15 days.",
  cta: { label: "See the Full Order Process", href: "/order-process/" },
};

export const home2Video = {
  youtubeId: "WsguGfLwVA8",
  youtubeTitle:
    "One Plus Display Factory Tour | Cardboard, Acrylic & PVC Displays Made to Impress",
  watchUrl: "https://www.youtube.com/watch?v=WsguGfLwVA8",
  title: "How Your Display Stand Is Made",
  subtitle:
    "This is our own production floor, filmed while the lines were running: cutting, bending, UV printing, assembly and inspection. Nothing here is stock footage.",
};

/* --------------------------------------------------------------------------
   08 — Proof: case studies and buyer feedback, back to back
   -------------------------------------------------------------------------- */

export const home2Cases = {
  title: "**Custom Display Programs** We Manufacture",
  subtitle:
    "Every program starts with one brand's requirement and a photo of the product. The floor stands, shelf units and lockable cases below were built for brands that sell in the United States, Germany and Australia.",
  cta: { label: "Read all case studies", href: "/case-studies/" },
};

export const home2Testimonials = {
  title: "What Our Customers Say",
};

/* --------------------------------------------------------------------------
   09 — FAQ: six questions, answers mirrored in the FAQPage schema
   -------------------------------------------------------------------------- */

export const home2FaqTitle =
  "Frequently Asked Questions About **Custom Display Stands**";

export const home2Faq: FaqItem[] = [
  {
    question: "Are you a manufacturer or a trading company?",
    answer:
      "One Plus Display is a manufacturer with its own factory. We cut, bend, print, assemble and inspect in our own plant, and the team that quotes your program is the team that builds it. Brands work with us directly, and agencies and trading companies bring us their client programs on the same factory terms.",
  },
  {
    question: "Can you design the display if I only have the product?",
    answer:
      "Yes. Send us a photo of the product, its size and weight, the shelf it stands on and any brand guidelines you have, including logo, colors and fonts. We come back with a free 3D render in 24 hours, and we revise the structural drawing until you approve it.",
  },
  {
    question: "What is your MOQ, and how does pricing work at scale?",
    answer:
      "Our MOQ is 100 sets per design. The unit price drops across four tiers: 100–299 sets for a test run, 300–999 for a regional rollout, 1,000–9,999 for a chain-wide program, and 10,000 or more at the lowest unit price. Send us the size and the quantity you need, and we will send you a line-by-line quote.",
  },
  {
    question: "Can I order a sample before placing a bulk order?",
    answer:
      "Yes. Samples of standard structures are built in 48 hours after you approve the artwork. The sample fee is around US$100, and we refund it once your order reaches 100 sets.",
  },
  {
    question: "How long does mass production take?",
    answer:
      "Mass production takes 12–15 days from sample approval and deposit. That covers printing, cutting, finishing, assembly, inspection and packing, all in our own plant. We quote FOB, CIF or DDP.",
  },
  {
    // [VERIFY] HP-15 ISO 2859-1 sampling — confirm the AQL level the QC team applies
    question: "How do you ensure product quality?",
    answer:
      "Every order passes three inspection points (incoming material, in-line build and pre-shipment) and six tests on the packed unit, sampled to ISO 2859-1. The inspection sheet and test footage travel with your shipping documents, and you can read the full protocol on our quality page.",
  },
];

export const home2FaqCta: NavLink = {
  label: `Ask ${site.persona.name} Another Question`,
  href: "/contact/",
};

/* --------------------------------------------------------------------------
   10 — Final CTA: the page's one strong close, no footnote
   -------------------------------------------------------------------------- */

export const home2Cta = {
  title: "Tell Us About Your Brand. We'll Build the Stand.",
  description:
    "Share your product size, estimated quantity, target retail channel, artwork status and timeline. We can help with structure planning, free 3D rendering, sampling and factory-direct production from 100 sets.",
  bullets: [
    "A free 3D render within 24 hours",
    "As many revisions as you need until you approve",
    "Structural drawing and dieline template included",
    "Sample fee refunded when your order reaches 100 sets",
  ],
  primary: { label: "Request a Quote", href: "/contact/" },
  secondary: {
    label: "Email the Factory",
    href: "mailto:inquiry@oneplusdisplay.com",
  },
};
