import type { NewsPost } from "../types";
import { images } from "./images";

/**
 * Buying guides and production notes shown in the "Latest News" section.
 * Everything written here is drawn from the company fact sheet: materials,
 * processes, order terms and packing standards. No certificate numbers, test
 * standards or price ranges are claimed.
 */
export const news: NewsPost[] = [
  {
    slug: "acrylic-or-pvc-foam-board-display-stand",
    title: "Acrylic or PVC Foam Board: Choosing the Right Material for a Display Stand",
    excerpt:
      "The two materials we build with behave very differently in a store. A practical comparison of clarity, print, durability, freight and cost drivers — and which briefs each one suits.",
    date: "2026-09-18",
    category: "Material Guide",
    image: images.newsMaterial,
    alt: "UV flatbed printer running acrylic and PVC foam board panels in the factory",
    author: "Mia",
    updated: "2026-09-18",
    readMinutes: 6,
    body: [
      {
        heading: "Start with what the stand has to do",
        paragraphs: [
          "Almost every enquiry we receive can be settled with one question: does the product need to be seen through the stand, or does the stand need to do the talking with print?",
          "Acrylic wins when the product is the visual — beauty, consumer electronics, spirits, collectibles — because clear sheet presents the item without a frame edge crossing it. PVC foam board wins when the message is printed at scale and the unit has to survive a long campaign in a hard environment.",
        ],
        bullets: [
          "Product-first, premium read: acrylic",
          "Print-led, long-life, budget-sensitive: PVC foam board",
          "Mixed briefs: acrylic shelves or headers on a foam board body",
        ],
      },
      {
        heading: "Acrylic: what it gives you, what it costs you",
        paragraphs: [
          "We build in high-clarity cast acrylic and coloured acrylic sheet — 3 mm and up depending on span and load. Sheet is laser-cut and CNC-routed, edges are trimmed, heat-bent and diamond-polished, and parts are bonded with solvent or hidden fixings.",
          "The trade-off is processing time. Cutting and polishing are fast; bonding and curing are not, and a case with a lockable door needs the door hung and aligned after the carcass cures. That is why acrylic units are usually shipped assembled rather than flat-packed.",
        ],
        bullets: [
          "Best optical clarity, edges can be polished back to glass-clear",
          "UV direct printing holds full-colour graphics on clear or coloured sheet",
          "Bonded joints need cure time — assemblies ship built, not flat",
          "Heavier and bulkier per unit than a flat-packed foam board stand",
        ],
      },
      {
        heading: "PVC foam board: the workhorse for printed displays",
        paragraphs: [
          "PVC foam board — also called Andy board or Xuanfu board — is a rigid foamed PVC sheet. It is light, waterproof and holds print well, so it takes direct UV flatbed print or spray printing and then cuts and folds into shelves, headers and end caps.",
          "Because the material is homogeneous, we can vibration-knife cut slots and tabs and design the unit to knock down flat. Flat-packing is where the freight saving comes from, and it is also what makes a printed stand viable at 100 sets.",
        ],
        bullets: [
          "UV flatbed print and spray printing directly onto the board",
          "Surface finishing with lamination or UV coating",
          "Vibration-knife and die cutting, slot-and-tab knock-down joints",
          "Waterproof and wipe-clean — suits chilled and damp environments",
        ],
      },
      {
        heading: "Sheet size is a hard limit",
        paragraphs: [
          "Both materials are processed from sheet with a maximum print and output size of 1.2 × 2.4 m. That ceiling shapes design more than most briefs expect: a 1.8 m floor stand is a designed assembly of parts, not one piece of material, and a wrap-around header usually means a join or a fold.",
          "Tell us the finished dimensions early and we will tell you how many parts the structure needs and where the seams will land. It is much cheaper to move a seam at the drawing stage than after sampling.",
        ],
      },
      {
        heading: "How we decide, in practice",
        paragraphs: [
          "For a first order, we usually build one sample in the material we recommend rather than two half-samples in both. Seeing a real unit under real store lighting settles the argument faster than a comparison table.",
          "Samples are built in 48 hours for standard builds in either material, and the sample fee — normally around US$100 depending on complexity — is refunded once your order reaches 100 sets.",
        ],
      },
    ],
  },
  {
    slug: "moq-samples-and-lead-times",
    title: "100 Sets, 48 Hours, 12–15 Days: How Our Order Terms Actually Work",
    excerpt:
      "What the 100-set minimum covers, what a sample costs and when it is refunded, how long bulk production really takes, and why we quote a seven-day validity.",
    date: "2026-08-05",
    category: "Ordering",
    image: images.newsSampling,
    alt: "Lockable acrylic display cabinet sample prepared for client approval",
    author: "Mia",
    updated: "2026-08-05",
    readMinutes: 5,
    body: [
      {
        heading: "The minimum is 100 sets, and it is a real number",
        paragraphs: [
          "We produce on batch, not on demand, so 100 sets per design is the point at which cutting, printing, bonding and packing can be set up economically. Below that, set-up time is spread across too few units and the unit price stops making sense for either side.",
          "Colour and print variations within one order do not each need 100 sets — they need to fit inside one production run. If you are splitting a range across three artworks, tell us at quoting stage and we will lay the run out accordingly.",
        ],
        bullets: [
          "100 sets per design as the production minimum",
          "Mixed artworks can share a run — agree the split before the deposit",
          "Larger rollouts can be delivered in scheduled drops",
        ],
      },
      {
        heading: "Sampling: 48 hours, about US$100",
        paragraphs: [
          "A standard acrylic or PVC foam board sample is built in 48 hours once the drawing and artwork are approved. Complex structures with lighting, locks or multi-part assembly take longer, and we say so at the quotation stage rather than after the fact.",
          "The sample fee is normally around US$100 for mainstream builds and varies with the complexity of the project. It is refunded when your order reaches 100 sets — so the sample effectively becomes free on a production order.",
        ],
        bullets: [
          "3D render before sampling — free, revised until you approve",
          "Physical sample built in 48 hours for standard structures",
          "Around US$100 depending on complexity, refunded at 100 sets",
        ],
      },
      {
        heading: "Bulk production in 12–15 days",
        paragraphs: [
          "Once the sample is signed off and the deposit is in, bulk production runs 12–15 days. That window covers printing, cutting, edge finishing, bonding, assembly, inspection and packing — the full chain, because all of it happens on our own floor.",
          "The clock starts from approved artwork and a confirmed sample, not from the enquiry. In practice the artwork approval step is where programmes lose the most time, so we ask for print-ready files up front.",
        ],
      },
      {
        heading: "Why quotes are valid for seven days",
        paragraphs: [
          "Acrylic sheet and PVC foam board are commodity materials and prices move. A quotation is held for seven days, which is long enough to take it to your buyer and short enough that the material cost behind it is still real.",
          "If you need longer certainty for a budget cycle, tell us — we can quote with a material price adjustment clause instead, which is often the better fit for a rollout planned a quarter ahead.",
        ],
        bullets: [
          "Quotation valid 7 days from issue",
          "Longer budget cycles can be quoted with a material price clause",
        ],
      },
      {
        heading: "Payment and trade terms",
        paragraphs: [
          "We work with the mainstream payment methods and agree the exact split with you when the order is placed — deposits, balances and documents are set out in the proforma invoice rather than assumed.",
          "On shipping, we quote FOB, CIF or DDP depending on whether you have your own forwarder, want us to handle freight to your port, or need the goods delivered duty paid to your warehouse.",
        ],
      },
    ],
  },
  {
    slug: "export-packing-container-load-rate",
    title: "Packing Acrylic and PVC Displays for Export: Getting Past 90% Container Load Rate",
    excerpt:
      "Cartons, wooden crates, paper corner protection and the decision to flat-pack — how packing is planned for a display programme, and where the volume actually goes.",
    date: "2026-06-24",
    category: "Shipping & Packing",
    image: images.newsPacking,
    alt: "Automatic laminating machine finishing printed display boards before packing",
    author: "Mia",
    updated: "2026-06-24",
    readMinutes: 5,
    body: [
      {
        heading: "Packing is a design decision, not an afterthought",
        paragraphs: [
          "For display programmes, freight is often the second-largest cost line after material. The packing method changes the container count, and the container count changes the landed cost — so packing is decided while the structure is still being drawn.",
          "The first question is whether the unit can knock down. A slot-and-tab PVC foam board stand flat-packs and nests; a bonded acrylic case with a hung, lockable door generally does not.",
        ],
      },
      {
        heading: "The standard we pack to",
        paragraphs: [
          "Displays ship in cartons or wooden crates depending on value and fragility, with paper corner protection on every printed face and board edge. Pallets are optional and depend on how the destination warehouse receives goods.",
          "With that configuration we reach a container load rate above 90%. The remaining percentage is the volume corner protection, foam blocking and crate framing occupy — removing it would save space and lose units in transit.",
        ],
        bullets: [
          "Cartons for flat-packed foam board and knock-down units",
          "Wooden crates with foam blocking for bonded acrylic assemblies",
          "Paper corner protection on printed faces and edges",
          "Pallets optional, per destination warehouse requirements",
          "Container load rate above 90%",
        ],
      },
      {
        heading: "What goes wrong without corner protection",
        paragraphs: [
          "Damage on a display shipment is almost never a crushing failure in the middle of a carton. It is a corner or an edge: a printed face scuffed against a carton wall, or a polished acrylic edge chipped where two units touch.",
          "That is why corner protection is standard rather than an upgrade, and why crated acrylic units are divided rather than stacked against each other.",
        ],
      },
      {
        heading: "Checks before the container closes",
        paragraphs: [
          "Every batch is inspected against the approved sample before packing — dimensions to ±1 mm, print colour against the approved proof, and hardware function where the unit has locks or moving parts. Load, drop and transport checks are filmed and the footage goes out with the shipping documents.",
          "Photographs of the packed cartons or crates are sent before loading, so you can confirm the packing method matches what was quoted rather than discovering it on arrival.",
        ],
      },
      {
        heading: "Splitting a large rollout",
        paragraphs: [
          "For rollouts that exceed one container, we split production into scheduled drops so your warehouse is not buried. Each drop is packed and inspected as a separate batch, which also means a late artwork change affects only the drops that have not yet run.",
          "Tell us your delivery window early — packing and shipping schedules are built backwards from the date the goods need to be on shelf, not forwards from the order date.",
        ],
      },
    ],
  },
];

/** Format an ISO date for display, e.g. "September 18, 2026" */
export const formatNewsDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const newsBySlug = (slug: string): NewsPost | undefined =>
  news.find((post) => post.slug === slug);

/** Other articles for the "Related reading" block */
export const relatedNews = (slug: string, limit = 3): NewsPost[] =>
  news.filter((post) => post.slug !== slug).slice(0, limit);

/** Closing call to action on a news article */
export const newsCta = {
  title: "Need Jack's Team to Review Your Project Spec?",
  description:
    "Share your product size, estimated quantity, retail channel and artwork status. Jack's team replies with a structure plan, a free 3D render and a factory-direct quote from 100 sets.",
};
