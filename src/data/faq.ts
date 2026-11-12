import type { FaqItem } from "../types";

/**
 * FAQ copy for /faq/. Answers are limited to terms we can hold to: minimum
 * order, sampling, lead times, tolerance, packing and trade terms. Certificate
 * numbers, price ranges and test standards are deliberately not claimed.
 */
export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: "Ordering & minimums",
    items: [
      {
        question: "What is your minimum order quantity?",
        answer:
          "100 sets per design, for both acrylic and PVC foam board builds. We supply wholesale and bulk orders only, so we do not take single-unit or sample-only retail orders.",
      },
      {
        question: "Can several designs share one order?",
        answer:
          "Yes. Color or artwork variants of the same structure can be produced in one run, as long as the split is agreed at quoting stage. A different structure counts as a separate design and needs its own 100 sets.",
      },
      {
        question: "Do you sell to individuals?",
        answer:
          "No. We work business to business with brands, retail chains, distributors and display companies. Every order starts from a project brief rather than a shopping cart.",
      },
      {
        // [VERIFY] HP-12 US$18–65 per set at 500+ — typical range pending the sales team's price matrix
        question: "How much does a custom acrylic display stand cost?",
        answer:
          "Most custom acrylic and PVC foam board displays fall between US$18 and US$65 per set at 500+ units, depending on size, material thickness, print coverage, fittings and packing. A 100-set test run sits at the upper end per unit. Send your product dimensions and target quantity for a line-item quote within 24 hours; the price is confirmed against artwork and the approved sample.",
      },
      {
        question: "How long is a quotation valid?",
        answer:
          "Seven days from issue. Acrylic sheet and PVC foam board prices move with the market, so a longer price hold needs a material price adjustment clause — tell us if your budget cycle runs longer.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "The mainstream international methods, with the deposit and balance split agreed per project and written into the proforma invoice. We do not publish a fixed split because it depends on order value and trade term.",
      },
    ],
  },
  {
    title: "Design & sampling",
    items: [
      {
        question: "Is the 3D design really free?",
        answer:
          "Yes. Send a drawing, a photo or a rough sketch with your inquiry and our design team returns a 3D render in 24 hours, then revises it until you approve the structure. There is no charge and no obligation to order.",
      },
      {
        question: "How long does a sample take?",
        answer:
          "48 hours for a standard acrylic or PVC foam board build, counted from approved artwork and dimensions. Structures with locks, lighting or multiple bonded parts take longer and we say so before you commit.",
      },
      {
        question: "What does a sample cost?",
        answer:
          "Around US$100 for mainstream acrylic and PVC builds, varying with the complexity of the project. The fee is refunded once your order reaches 100 sets.",
      },
      {
        question: "Can you match our brand color?",
        answer:
          "Yes. We print against Pantone references and check the result under color-calibrated lighting before sending a physical proof, because a screen render will not settle a color match.",
      },
      {
        question: "Can we supply our own artwork?",
        answer:
          "That is the fastest route. Send print-ready files with bleed and we will confirm the layout on the 3D render. If you only have a logo and product photography, our designers can build the artwork for approval before printing.",
      },
    ],
  },
  {
    title: "Materials & structure",
    items: [
      {
        question: "Acrylic or PVC foam board — which should we choose?",
        answer:
          "Acrylic when the product must be seen through the stand: beauty, electronics, spirits, collectibles. PVC foam board when the message is printed at scale and the unit has to survive a long campaign in a damp or chilled aisle. Mixed briefs use acrylic shelves or headers on a foam board body.",
      },
      {
        question: "What is the largest single piece you can make?",
        answer:
          "One sheet of material prints and cuts up to 1.2 × 2.4 m. Anything larger is a designed assembly of parts, so tell us the finished dimensions early and we will show you where the seams land.",
      },
      {
        question: "What tolerance do you hold?",
        answer:
          "±1 mm on cut and drilled dimensions, checked at final inspection. That matters for multi-unit rollouts: a shelf from one unit drops into any other in the run.",
      },
      {
        question: "Can you build irregular shapes, multi-tier or rotating stands?",
        answer:
          "Yes. Irregular and multi-tier structures are routine, usually screw-fixed. Rotating stands are built with turntable or castor fittings, and units can carry LED lighting or an LED screen. Hardware we do not produce ourselves is sourced and assembled in-house.",
      },
      {
        // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
        question: "How much weight can a stand carry?",
        answer:
          "Standard shelves are rated at 20–55 kg (44–121 lb) each, depending on span, material and thickness. The rating is set with the drawing, not after it: heavier product or a longer span gets a thicker sheet, a folded base or a centre spine. Tell us the product weight per shelf and we size the structure to it, then send the load test sheet with the quote.",
      },
    ],
  },
  {
    title: "Production, quality & documents",
    items: [
      {
        question: "How long does bulk production take?",
        answer:
          "12–15 days after the sample is approved and the deposit is received. The window covers printing, cutting, edge finishing, bonding, assembly, inspection and packing, because every step runs on our own floor.",
      },
      {
        // [VERIFY] HP-15 ISO 2859-1 sampling — confirm the AQL level the QC team applies
        question: "How is quality controlled?",
        answer:
          "Five full-time QC staff cover three gates: incoming material inspection, in-line checks at cutting, bending and assembly, and pre-shipment tests on the packed unit — load, drop and packing, sampled to ISO 2859-1. Dimensions, print color and hardware function are checked before packing, and every result is filed under the batch number.",
      },
      {
        question:
          "What is the difference between a display manufacturer and a trading company?",
        answer:
          "A manufacturer runs the production steps in its own plant; a trading company sources them from several. One Plus Display runs every step in our 23,000 m² plant, and we work with both: brands and retail chains buy direct, while trading companies and agencies bring their client programs to the same floor on the same factory terms.",
      },
      {
        question: "Do you provide test reports?",
        answer:
          "We film load, drop and transport checks in-house and send the footage with the shipping documents. We do not claim accreditation against a published test standard, so we will not quote a standard number we cannot evidence.",
      },
      {
        question: "Which certificates can you provide?",
        answer:
          "We hold amfori BSCI and Sedex for social compliance, FSC chain of custody for certified board and paper, RoHS for material safety, CE conformity for the European market and UL-recognised components for lighted units. Copies and audit reports go out with your quote, and you are welcome to verify originals during a factory visit or a live video tour. We publish no certificate numbers on the website.",
      },
    ],
  },
  {
    title: "Packing & shipping",
    items: [
      {
        question: "How are the stands packed?",
        answer:
          "Cartons for flat-packed and knock-down units, wooden crates with foam blocking for assembled acrylic, paper corner protection on printed faces and edges, and pallets where the destination warehouse needs them. Container load rate is above 90%.",
      },
      {
        question: "Do the displays arrive assembled or flat-packed?",
        answer:
          "Both ways, and the choice is made at the drawing. Flat-packed is the default for export because it cuts freight and reaches a container load rate above 90%; a flat-packed unit assembles in under three minutes with no tools. Assembled units ship in wooden crates with foam blocking where store labour is not available.",
      },
      {
        question: "Which trade terms do you quote?",
        answer:
          "FOB, CIF and DDP. FOB when you use your own forwarder, CIF when you want us to handle freight to your port, DDP when the goods need to arrive duty paid at your warehouse.",
      },
      {
        question: "Can a large rollout be shipped in stages?",
        answer:
          "Yes. Production and packing are split into scheduled drops so your warehouse is not buried, and a late artwork change then affects only the drops that have not yet run.",
      },
      {
        question:
          "Do you ship custom displays to the US, Europe and Australia?",
        answer:
          "Yes. Around half of our orders go to the United States, a fifth to Europe, a tenth to Australia and the rest to the Middle East and other markets. All four are routine destinations for us, quoted FOB, CIF or DDP with export documents on every shipment.",
      },
    ],
  },
];

/** Closing call to action on the FAQ page */
export const faqCta = {
  title: "Need Jack's Team to Review Your Situation Directly?",
  description:
    "Share your product size, quantity, retail channel and artwork status, and ask anything this page leaves open. Jack's team answers with a structure plan, a free 3D render and a factory-direct quote from 100 sets.",
};
