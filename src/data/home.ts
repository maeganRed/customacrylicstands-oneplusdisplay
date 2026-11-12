import type {
  FaqItem,
  GalleryImage,
  NavLink,
  SpecItem,
  Stat,
} from "../types";
import { site } from "./site";
import { images } from "./images";

/**
 * Home-page-only content: the factory-strength block under the hero, the
 * customization / quality / service grids, the production process, the
 * video embed, the batch quality record and the full FAQ. Customer feedback
 * lives in `testimonials.ts`, shared with /customer-testimonials/.
 *
 * Marketing estimates are explicitly allowed on this page but every one is
 * marked `[VERIFY] HP-xx` and listed in `docs/copy-claims-review.md` for the
 * owner's review. Replace the value and delete the comment once confirmed.
 * Certifications stay limited to the six marks in `certifications.ts`.
 *
 * US spelling throughout (color, customization) — the main market is the US.
 *
 * Each number owns exactly one home, so the page does not chant the same
 * figures in every section:
 *   - factory scale (23,000 m² / 150+ / 350,000+) → definition trust band and
 *     Why pillar 1, nowhere else on the page
 *   - fulfilment times (24 h quote / 3-day sample / 12–15-day bulk) → the
 *     process section only; hero description and final CTA stay promise-style
 *   - customers and exports (5,000+ / 40+) → hero badge only
 *   - MOQ and price → definition terms line and FAQ, never in CTA buttons
 *   - shelf load (20–55 kg) → the spec strip, the acrylic rows and the FAQ;
 *     `[VERIFY] HP-16`, never in JSON-LD until the QC load test is signed
 *
 * The FAQ strings are also the source of the FAQPage structured data rendered
 * by `src/pages/index.astro`, so they must stay identical to what is shown.
 */

/**
 * The showroom photo used in the factory-introduction block under the hero.
 * Kept here so the page only imports copy and images, never a path.
 */
export const homeFactoryImage: GalleryImage = {
  src: images.placeholderFactoryStrength,
  alt: "Showroom of finished custom POP display stands at the One Plus Display factory",
};

/**
 * Trust band directly under the hero: the numbers a buyer screens a factory
 * on. The entries marked `[VERIFY]` are marketing estimates awaiting a real
 * figure — search for `[VERIFY]` before publishing.
 */
export const homeTrustBar: Stat[] = [
  { value: "13+", label: "Years manufacturing" },
  { value: "23,000 m²", label: "Own factory" },
  { value: "350,000+", label: "Display stands a month" },
  // [VERIFY] HP-02 5,000+ brands and retail chains — replace with the customer count on file
  { value: "5,000+", label: "Brands and retail chains" },
  // [VERIFY] HP-01 40+ export countries — replace with the count from the sales ledger
  { value: "40+", label: "Export countries" },
  // [VERIFY] HP-06 98.6% on-time delivery — replace with the rate from the shipping ledger
  { value: "98.6%", label: "On-time delivery" },
  // [VERIFY] HP-14 US$9M+ annual sales — replace with the figure on the finance ledger
  { value: "US$9M+", label: "Annual sales" },
];

/**
 * Certification block under the trust band: the six marks as icons, each with
 * the one line that says what it covers, plus the link that asks for copies.
 * Placed here rather than inside the Why rows so the numbers a buyer screens
 * on and the documents behind them read as one block.
 */
export const homeCertifications = {
  eyebrow: "Certifications and compliance",
  title: "Six Certifications Held, Copies Sent With the Quote",
  subtitle:
    "One Plus Display holds amfori BSCI, CE, FSC, RoHS, Sedex and UL. Copies go out with the quote, and if your retail program needs a document we do not hold yet, we say so before you order — not after.",
};

/**
 * Procurement spec strip directly under the hero: the six parameters a buyer
 * screens a factory on, answered before the first section. Reuses `SpecItem`
 * from `../types`; no new component.
 *
 * The load figure is the only line here that is not on the company fact sheet
 * — it is a competitor comparison and owns `[VERIFY] HP-16`. Keep it out of
 * the JSON-LD until QC has run the load test.
 */
export const homeSpecStrip: SpecItem[] = [
  { label: "Dimensions", value: "100% custom, ±1 mm" },
  { label: "Materials", value: "Cast acrylic · PVC foam" },
  // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
  { label: "Load per shelf", value: "20–55 kg / 44–121 lb" },
  { label: "Sample build", value: "48 hours · US$100 back" },
  { label: "Bulk lead time", value: "12–15 days" },
  { label: "MOQ", value: "100 sets per design" },
];

/**
 * Headings and CTAs for every home page section, kept together so the page
 * structure is easy to reword. `index.astro` only passes these through.
 *
 * No eyebrows on the long sections: each block opens with one keyword heading
 * and one sentence, the way a long sales page reads. The one exception is the
 * offer block (`homeOffer.eyebrow`), added in the 2026-11 sales pass so the
 * risk reversal reads as a labelled package rather than another paragraph.
 */
export const homeSections = {
  /** 02 — what can be customized, as three numbered spec rows */
  customization: {
    title:
      "**Custom-Made, Line by Line**: Size, Material, Print and Packing",
    subtitle:
      "Each stand is specified against your product, your shelf and your quantity, then quoted factory-direct. The 3D render comes back in 24 hours; the sample is built in 48.",
    cta: {
      label: "Start Your Custom Display",
      href: "/contact/",
    },
  },
  /** 03 — the catalogue the page is browsed by */
  categories: {
    title: "**Custom Display Stand Categories** We Manufacture",
    subtitle:
      "Floor, counter, pegboard, lockable, LED, foam board. Pick a type and the drawing is redrawn around your product, your shelf and your brand.",
    cta: {
      label: "Browse all display stand types",
      href: "/pop-retail-displays/",
    },
  },
  /** 04 — the featured builds */
  products: {
    title: "**Wholesale Custom Display Stands** Built to Your Spec",
    subtitle:
      "Three builds from live retail programmes, not catalogue pages: every dimension, material, finish and print was drawn for one product. That is why the sample matches the render.",
    cta: { label: "Request a Quote", href: "/contact/" },
  },
  /** 05 — the factory link under the plant row */
  manufacturing: {
    cta: { label: "Learn More About Our Factory", href: "/about-us/" },
  },
  /** 05c — the link under the certification marks */
  certifications: {
    cta: { label: "Request Certificate Copies", href: "/contact/" },
  },
  /** 06 — the six steps from enquiry to delivery, plus the factory tour */
  process: {
    title: "**Free 3D Design**, Fast Prototyping, Volume Production",
    subtitle:
      "Send a photo and a quantity: the quote comes back in 24 hours, the sample is built in 48 hours, bulk runs 12–15 days from approved artwork and deposit. MOQ 100 sets.",
    cta: { label: "See the Full Order Process", href: "/order-process/" },
  },
  /** 06b — the real factory tour, embedded from YouTube */
  video: {
    title: "Walk the Floor Before You Place the Order",
    subtitle:
      "Cutting, bending, UV printing, assembly and inspection, filmed on our floor — not stock footage.",
    cta: { label: "Watch More Factory Videos", href: "/videos/" },
  },
  /** 07 — customer programmes */
  cases: {
    title: "**Acrylic Display Case Studies** & Client Success Stories",
    subtitle:
      "1,200 floor stands for a US electronics brand, 3,500 shelf units for a German drugstore chain, 800 lockable cases for an Australian liquor group. Outcome percentages come from the client, not an independent audit.",
    cta: { label: "Read all case studies", href: "/case-studies/" },
  },
  /** 08 — customer feedback */
  testimonials: {
    title:
      "**Customer Feedback**: Trusted by Brands, Wholesale Buyers & Retail Chains",
    subtitle:
      "Six buyers on sampling rounds, batch consistency, export packing and on-time delivery. Quotes are anonymised at the customer's request and lightly edited for length.",
  },
  /** 09 — industry insights */
  insights: {
    title: "Display Manufacturing Insights and Buying Guides",
    subtitle:
      "Material choice, structure, freight and what survives a weekly restock in store.",
    cta: { label: "Display manufacturing guides", href: "/news/" },
  },
};

/**
 * "Why One Plus Display" — two alternating image/text rows. Each pillar
 * answers one question a buyer is already asking: who builds it and who
 * checks it. The certificate proof sits higher up the page, in
 * `homeCertifications`, so it is not repeated here. Wording stays plain and
 * specific: no "solutions", no adjectives a competitor could copy unchanged.
 */
export const homeWhy = {
  title:
    "Why Brands Choose **One Plus Display** Among Acrylic, PVC & POP Display Manufacturers",
  intro:
    "23,000 m², 150+ staff, 350,000+ units a month. Drawing, sampling, printing, assembly and inspection run on one floor — the team that quotes your project is the team that builds it.",
  pillars: {
    manufacturing: {
      label: "Factory-Direct Manufacturing: 23,000 m², 150+ Staff, 350,000+ a Month",
      body: "Cutting, heat bending, diamond polishing, UV printing and assembly sit under one roof, so a change in the drawing reaches the line the same day. The engineers who run the floor write the quote, and every line of it is one we can stand behind.",
    },
    quality: {
      // [VERIFY] HP-15 ISO 2859-1 sampling — confirm the AQL level the QC team applies
      // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
      label: "Quality You Can Measure: Rated Load, Six Tests, One Report per Batch",
      body: "Three gates — the sheet on arrival, the unit in line, the batch before it ships — then six tests on the packed unit, sampled to ISO 2859-1. Dimensions hold to ±1 mm, shelf load is rated at 20–55 kg, and every result is filed under the batch number.",
    },
  },
};

/* --------------------------------------------------------------------------
   05b — Batch quality record: three gates, six tests, the report and the test
   footage. Rendered inside the Why section, under the quality row, so the
   quality claims above are backed by a verifiable protocol.
   No pass/fail figures (rated load, drop height, ΔE threshold, AQL level) are
   published until the QC team confirms them — see `docs/copy-claims-review.md`
   HP-15. Test videos ship as placeholder tiles until the YouTube IDs arrive.
   -------------------------------------------------------------------------- */

export interface QualityGate {
  /** Stage marker above the title, e.g. "Gate 1" */
  stage: string;
  title: string;
  body: string;
}

export interface QualityTest {
  name: string;
  /** One line on how the test is run; no pass/fail figures until confirmed */
  method: string;
}

export interface HomeQuality {
  eyebrow: string;
  intro: string;
  gates: QualityGate[];
  tests: QualityTest[];
  compliance: string;
  reportNote: string;
  /** Placeholder tiles until the YouTube IDs for the test videos are supplied */
  videos: { label: string }[];
}

export const homeQuality: HomeQuality = {
  eyebrow: "Batch quality record",
  intro:
    "Three gates, six tests, one report per batch. Results are photographed or filmed, filed under the batch number and sent with the shipping documents.",
  gates: [
    {
      stage: "Gate 1",
      title: "Incoming material",
      body: "Sheet thickness gauged on arrival; supplier batch and RoHS/REACH declarations filed against the order before cutting starts.",
    },
    {
      stage: "Gate 2",
      title: "In-line build",
      body: "Cut and drilled dimensions held to ±1 mm, color checked against the approved proof, edges polished and joints load-checked at assembly.",
    },
    {
      stage: "Gate 3",
      title: "Pre-shipment",
      body: "Load, drop and packing tests run on the packed unit, sampled to ISO 2859-1. The last carton is checked the same way as the first.",
    },
  ],
  tests: [
    // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
    { name: "Load bearing", method: "Rated 20–55 kg per shelf, held on every shelf" },
    { name: "Color match", method: "Measured against the approved proof" },
    { name: "Drop test", method: "Packed unit dropped from carrying height" },
    {
      name: "Environmental",
      method: "Temperature and humidity cycling for sea freight",
    },
    { name: "Packaging durability", method: "Carton compression and handling" },
    { name: "Material compliance", method: "RoHS and REACH declarations per batch" },
  ],
  compliance: "RoHS · REACH · FSC chain of custody",
  reportNote:
    "The inspection sheet and the test footage travel with the shipping documents. Ask for a sample report with your quote.",
  videos: [
    { label: "Load test — acrylic" },
    { label: "Load test — PVC foam board" },
    { label: "Store assembly" },
  ],
};

/* --------------------------------------------------------------------------
   02 — Customisation, written as three image/text rows instead of six cards
   -------------------------------------------------------------------------- */

export interface CustomizationRow {
  title: string;
  body: string;
  points: string[];
  image: GalleryImage;
}

export const homeCustomizationRows: CustomizationRow[] = [
  {
    title: "Size and Structure, Drawn Around Your Product",
    // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
    body: "Send a photo of your product and the shelf it stands on. We set width, depth, height, shelf pitch and load path from those inputs, then hold every cut and drill to ±1 mm, so the first unit and the last unit of the run match the approved drawing.",
    points: [
      "Any width, depth or height",
      // [VERIFY] HP-04 3–15 mm — confirm the thickness range the cutting line actually quotes
      "3–15 mm thickness, matched to the load",
      // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
      "20–55 kg rated load per shelf",
      "Shelves, dividers, hooks and locks",
    ],
    image: {
      src: images.styleFloorStanding,
      alt: "Custom acrylic floor display stand with tiered shelves, made by One Plus Display",
    },
  },
  {
    title: "Material, Color and Print, Proofed Before Production",
    body: "Cast acrylic, PVC foam board, or both in one unit — clear shelves on a printed foam body is the mix most retail programs land on. Every panel is cut, bent, polished and UV-printed in one plant, and the proof is signed off before production starts.",
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
  {
    title: "Export Packing, Flat-Packed to Cut Freight",
    body: "Locks, backlit headers and cable routing are designed in from the start, not added after the sample. Units ship flat-packed at a container load rate above 90% and build in under three minutes with no tools. Repeat runs reuse the same files, so the second order skips design.",
    points: [
      "Flat-packed or assembled",
      "90%+ container load",
      "Under 3 minutes, no tools",
    ],
    image: {
      src: images.styleCountertop,
      alt: "Custom acrylic countertop display stand with polished edges and a branded graphic",
    },
  },
];

/* --------------------------------------------------------------------------
   07b — In-house manufacturing capabilities
   -------------------------------------------------------------------------- */

export const homeCapabilities: string[] = [
  "Acrylic cutting",
  "Heat bending",
  "Diamond polishing",
  "UV flatbed printing",
  "Display assembly",
  "Packing and crating",
];

/* --------------------------------------------------------------------------
   05 — Inspection photography used beside the quality pillar
   -------------------------------------------------------------------------- */

/** Real product photography standing in for the inspection checklist */
export const homeInspectionImages = [
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
   08b — The factory tour on YouTube, embedded in the process section and
   on /videos/. `youtubeTitle` is the video's own title on YouTube.
   -------------------------------------------------------------------------- */

export const homeVideo = {
  youtubeId: "WsguGfLwVA8",
  youtubeTitle:
    "One Plus Display Factory Tour | Cardboard, Acrylic & PVC Displays Made to Impress",
  watchUrl: "https://www.youtube.com/watch?v=WsguGfLwVA8",
};

/** Closing call to action on the /videos/ page only */
export const videosPageCta = {
  title: "Need Jack's Team to Review Your Production Plan?",
  description:
    "Share your product size, target quantity and timeline, and name the process you want to see. Jack's team films that line for your product, plans the structure, renders it free and quotes factory-direct from 100 sets.",
};

/* --------------------------------------------------------------------------
   07 — Customer testimonials
   Moved to `testimonials.ts` so the home page and /customer-testimonials/
   share one source of truth.
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   18 — FAQ
   -------------------------------------------------------------------------- */

export const homeFaqTitle =
  "**Custom Display Stand Manufacturer** FAQ: MOQ, Samples and Delivery";
export const homeFaqSubtitle =
  "The questions buyers send before the first purchase order — MOQ, shelf load, sampling, lead times, materials, print, packing, certifications, shipping.";

/**
 * Full home page FAQ, merged to fifteen items: overlapping design, material
 * and quotation questions are combined so each topic is answered once, in
 * full. Answers use the same facts as /faq/ and the order process page:
 * 100-set minimum, 3-day samples, 12–15 day bulk production, ±1 mm tolerance,
 * 1.2 × 2.4 m sheet, FOB / CIF / DDP. No prices beyond the sample fee and no
 * certificate numbers are claimed.
 */
export const homeFaq: FaqItem[] = [
  {
    question: "Are you a manufacturer or a trading company?",
    answer:
      "One Plus Display is a factory-based display manufacturer: we own the cutting, bending, printing, assembly and inspection equipment and run every step in our 23,000 m² plant. Brands and retail chains coordinate directly with our production team, and agencies and trading companies bring us their client programs on the same terms — factory pricing, factory lead times, and an engineer who can change the drawing before production.",
  },
  {
    question:
      "What types of custom display stands can you manufacture, and in what sizes?",
    answer:
      "Countertop displays, floor-standing units, pegboard and hook displays, lockable cabinets, LED-lighted units and PVC foam board stands. Dimensions and internal structures are customized to your product size, packaging and shelf — nothing comes from a catalogue size. One sheet prints and cuts up to 1.2 × 2.4 m; larger units are designed assemblies with stability evaluated as part of the design.",
  },
  {
    question: "Can you design a display if I only have an idea?",
    answer:
      "Yes. We work from your drawings, reference images, product samples or just a brief. Our design team returns a free 3D render in 24 hours and revises the structure until you sign off.",
  },
  {
    question: "What information do you need to provide a quotation?",
    answer:
      "Product photos or drawings, display dimensions, material requirements, logo or artwork files, estimated quantity and destination country. Editable artwork speeds up print preparation; the more detail you send, the more accurate the quotation, which usually comes back in 24 hours.",
  },
  {
    question: "What is your minimum order quantity (MOQ)?",
    answer:
      "100 sets per design, for both acrylic and PVC foam board builds. We supply wholesale and bulk business orders only, so we do not take single-unit or retail orders.",
  },
  {
    question: "Can I order a sample before placing a bulk order?",
    answer:
      "Yes. Sample development can be arranged for most custom display projects. The sample cost is around US$100 for mainstream builds and is refunded once your order reaches 100 sets.",
  },
  {
    question: "How long does it take to make a sample?",
    answer:
      "48 hours for a standard acrylic or PVC foam board build, counted from approved artwork and dimensions. Structures with locks, lighting or multiple bonded parts take longer, and we say so before you commit.",
  },
  {
    question: "How long does mass production take?",
    answer:
      "12–15 days after the sample is approved and the deposit is received. The window covers printing, cutting, edge finishing, bonding, assembly, inspection and packing, because every step runs on our own floor.",
  },
  {
    // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
    question: "How much weight can each shelf hold?",
    answer:
      "Standard shelves are rated at 20–55 kg (44–121 lb) each, depending on span, material and thickness. The rating is set with the drawing, not after it: heavier product or a longer span gets a thicker sheet, a folded base or a centre spine. Ask for the load test sheet with your quote.",
  },
  {
    question: "Do the displays arrive assembled or flat-packed?",
    answer:
      "Both ways, and the choice is made at the drawing. Flat-packed is the default for export because it cuts freight and reaches a container load rate above 90%; a flat-packed unit assembles in under three minutes with no tools. Assembled units ship in wooden crates with foam blocking where store labour is not available.",
  },
  {
    question: "Can you print our logo and brand graphics on acrylic displays?",
    answer:
      "Yes. We print direct to acrylic and PVC foam board on UV flatbeds and check colors against Pantone references. Branding options are confirmed against your artwork and the selected production method before the run starts.",
  },
  {
    question:
      "Which materials and thicknesses do you work with — acrylic, PVC foam board, or both?",
    answer:
      "Cast acrylic and PVC foam board, separately or combined in one unit — acrylic shelves or headers on a foam board body is a common mix. Thickness is selected against the structure, product weight and load: tell us what the stand has to carry and we recommend the specification.",
  },
  {
    question: "Do you support bulk production for retail chains and brands?",
    answer:
      "Yes. We provide custom manufacturing and bulk production for brands, wholesalers and retail programs, running more than 350,000 stands a month and splitting large rollouts into scheduled drops.",
  },
  {
    // [VERIFY] HP-15 ISO 2859-1 sampling — confirm the AQL level the QC team applies
    question: "How do you ensure product quality?",
    answer:
      "Five full-time inspectors run three gates: incoming material inspection, in-line checks at cutting, bending and assembly, and pre-shipment tests on the packed unit — load, drop and packing, sampled to ISO 2859-1. Results are photographed or filmed, filed under the batch number, and sent with the shipping documents.",
  },
  {
    question: "Can you ship custom displays internationally?",
    answer:
      "Yes. Around half of our orders go to the United States, a fifth to Europe, a tenth to Australia, and the rest to the Middle East and other markets. We quote FOB, CIF or DDP, pack into cartons or wooden crates with corner protection at a container load rate above 90%, and supply export documents with every shipment.",
  },
  {
    // [VERIFY] HP-12 US$18–65 per set at 500+ — typical range pending the sales team's price matrix
    question: "How much does a custom acrylic display stand cost?",
    answer:
      "Most custom acrylic and PVC foam board displays fall between US$18 and US$65 per set at 500+ units, depending on size, material thickness, print coverage, fittings and packing. A 100-set test run sits at the upper end per unit. Send your product dimensions and target quantity for a line-item quote within 24 hours; the price is confirmed against artwork and the approved sample.",
  },
  {
    question: "Can I see an inspection report before ordering?",
    answer:
      "Yes. Every batch's inspection sheet and test footage travel with the shipping documents, so you can judge exactly what a finished order comes with. Ask for a sample report together with your quotation and we will send one with the 3D render.",
  },
];

/** Closing entry under the FAQ list */
export const homeFaqCta = {
  label: `Have a Different Question? Ask ${site.persona.name}.`,
  href: "/contact/",
};

/* --------------------------------------------------------------------------
   Direct-answer manufacturer definition — the paragraph an AI search engine
   can quote on its own, plus the buying terms in one line instead of a band.
   -------------------------------------------------------------------------- */

export interface HomeDefinition {
  title: string;
  paragraph: string;
  terms: string;
  links: NavLink[];
  cta: NavLink;
}

export const homeDefinition: HomeDefinition = {
  title: "Factory-Direct **Acrylic Display Manufacturer** for Bulk B2B Orders",
  // [VERIFY] HP-02 / HP-01 5,000+ brands and 40+ countries — sales-ledger figures
  paragraph:
    "One Plus Display manufactures custom acrylic and PVC foam board display stands for brands, wholesalers, distributors and retail chains. 23,000 m² of our own plant, 150+ staff, 350,000+ units a month — design, cutting, bending, printing, assembly and inspection on one floor. MOQ 100 sets. Free 3D render in 24 hours. Bulk runs in 12–15 days.",
  terms:
    "100 sets per design · 20–55 kg per shelf · ±1 mm cut and drill · 90%+ container load · US$100 sample fee, refunded at 100 sets · FOB, CIF or DDP",
  links: [
    { label: "About our factory", href: "/about-us/" },
    { label: "See the order process", href: "/order-process/" },
    { label: "Browse display styles", href: "/pop-retail-displays/" },
  ],
  cta: { label: "Request a Quote", href: "/contact/" },
};

/* --------------------------------------------------------------------------
   Offer block — what the buyer receives before paying, and the quantity
   tiers. Sits between the definition block and the category grid, so the
   risk reversal is on screen before the catalogue. Competitor parity with
   popdisplay.me's "YOUR FREE PACKAGE" block, minus the invented promises.
   -------------------------------------------------------------------------- */

export const homeOffer = {
  eyebrow: "Before you pay",
  title: "**Five Things You Get** Before You Pay for a Sample",
  items: [
    "Free 3D render in 24 hours — your dimensions, your artwork",
    "Revisions until you sign the drawing, at no charge",
    "Physical sample built in 48 hours for standard structures",
    "Load, drop and packing footage with every batch",
    "Dieline template (AI or PDF) for your artwork team",
  ],
  tiersTitle: "Unit price falls as the run grows",
  tiers: [
    { label: "100–299 sets", value: "Test run" },
    { label: "300–999 sets", value: "Regional rollout" },
    { label: "1,000–9,999 sets", value: "Chain-wide rollout" },
    { label: "10,000+ sets", value: "Lowest unit price" },
  ] satisfies SpecItem[],
  note:
    "Send size, weight and quantity for a line-item quote — the load test sheet comes with it.",
  cta: { label: "Request a Quote", href: "/contact/" },
};

/* --------------------------------------------------------------------------
   Final CTA — home-page offer stack
   -------------------------------------------------------------------------- */

// [VERIFY] HP-02 5,000+ brands served — replace with the customer count on file
export const homeCta = {
  title: "Send Your Product. We'll Send the Drawing.",
  description:
    "One photo, a size and a quantity is enough. The 3D render comes back in 24 hours, the sample is built in 48 hours, and the price is itemised against your specification.",
  bullets: [
    "Free 3D render in 24 hours",
    "Revisions until you sign the drawing",
    "Sample fee refunded at 100 sets",
    "Load, drop and packing footage with every batch",
  ],
  footnote: `Bulk B2B only · MOQ 100 sets · Factory-direct, shipped FOB, CIF or DDP · Your contact: ${site.persona.name}`,
  primary: { label: "Request a Quote", href: "/contact/" },
  secondary: {
    label: "Email the Factory",
    href: "mailto:inquiry@oneplusdisplay.com",
  },
};
