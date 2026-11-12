import type { FaqItem, Milestone, Stat, TeamMember } from "../types";
import { images } from "./images";

/**
 * About page copy — the single source for everything /about-us/ renders.
 * Rewriting the page means editing this file only, never the template.
 *
 * Style: docs/copy-style-guide.md — plain, proposition-style headings, no
 * wordplay, factual sentences. Every number and commitment here comes from
 * the company fact sheet; nothing is invented.
 */

/** One step of the in-house production chain. Separate from `OrderStep`
 *  (orderProcess.ts), which describes the buyer's journey, not the floor. */
export interface AboutProcessStep {
  /** Two-digit index, e.g. "01" */
  step: string;
  title: string;
  text: string;
}

/** Intro block: heading, body, photo and quick links */
export const aboutIntro = {
  eyebrow: "01 / Company profile",
  title: "13 Years of Custom Display Manufacturing",
  lead: "One Plus Display is a custom display stand manufacturer in Dongguan, China. Since 2013 we have designed and built acrylic cases, PVC foam board floor units and printed board displays for retail brands, wholesalers and distributors.",
  paragraphs: [
    "The company started in 2013 with printed paperboard displays and grew into acrylic and PVC foam board as retail programmes asked for more. Those two materials carry most of the work today. Acrylic is laser-cut, heat-bent, diamond-polished and bonded in our own acrylic shop; PVC foam board is UV printed, laminated and cut on its own line. Board is still part of the offer whenever a market or a budget calls for it.",
    "Production runs from a 23,000 m² plant in Gaobu, Dongguan, with about 150 people, while sales and project management sit in Shenzhen. That split is deliberate: the contact you email is close to the buyer, and the engineer who answers the technical question stands on the floor that builds the stand. Design, 3D rendering, sampling, printing, cutting, polishing, assembly, inspection and export packing all happen on the same site.",
    "Standard samples are built in 48 hours and bulk orders ship in 12–15 days. MOQ is 100 sets per design, terms are quoted FOB, CIF or DDP, and an order can start from a drawing you already have or from a product photo and a rough idea.",
  ],
  signature:
    "Quoted, sampled and built by the same team — one named engineer follows your project from the first drawing to the last carton.",
  image: images.aboutAcrylicLine,
  imageAlt:
    "Acrylic bonding and assembly area with black display cases in production at the One Plus Display plant",
  imageCaption:
    "Acrylic assembly in Gaobu: bonding, edge inspection and hardware fitting under one roof.",
  links: [
    { label: "Browse our reference builds", href: "/pop-retail-displays/" },
    { label: "How an order runs", href: "/order-process/" },
    {
      label: "Read customer testimonials",
      href: "/customer-testimonials/",
    },
  ],
};

/** Numbers strip, rendered inside the facilities section */
export const aboutStats: Stat[] = [
  { value: "2013", label: "Founded in Dongguan" },
  { value: "23,000 m²", label: "Own plant in Gaobu" },
  { value: "150+", label: "Staff, plant and Shenzhen office" },
  { value: "350,000+", label: "Display stands per month" },
];

/** The production chain, in the order a job actually moves through the plant */
export const aboutProcess: AboutProcessStep[] = [
  {
    step: "01",
    title: "Design and 3D render",
    text: "Your photo, drawing or sketch is turned into a structure, with a free 3D render and an itemized quote.",
  },
  {
    step: "02",
    title: "Sample on the line",
    text: "A unit is built on the production line, not in a side workshop, and ready for sign-off in 48 hours.",
  },
  {
    step: "03",
    title: "UV print",
    text: "Flatbed printing on acrylic and PVC foam board, color-matched to your artwork, with a proof signed before the run.",
  },
  {
    step: "04",
    title: "Cut",
    text: "Laser and CNC cutting for acrylic, vibration-knife and die-cutting for foam board, held to ±1 mm.",
  },
  {
    step: "05",
    title: "Bend and polish",
    text: "Heat bending to radius, edge trimming and diamond polishing, so the edge in your hand matches the render.",
  },
  {
    step: "06",
    title: "Bond and assemble",
    text: "Solvent bonding, hidden fixings, hinges, cam locks and sourced LED or turntable hardware fitted by hand.",
  },
  {
    step: "07",
    title: "Inspect",
    text: "Every batch is checked against the approved sample at incoming, in-line and final gates, and the report travels with the order.",
  },
  {
    step: "08",
    title: "Pack and load",
    text: "Cartons and wooden crates with corner protection, flat-packed or palletized, loaded at a 90%+ container rate.",
  },
];

/** Timeline */
export const aboutMilestones: Milestone[] = [
  {
    year: "2013",
    title: "Founded on printed board displays",
    description:
      "The company opened as a custom display workshop, building printed paperboard stands for retail promotions. The die-cutting, gluing and print finishing from those years still run today.",
    tag: "Printed board · retail promotion",
  },
  {
    year: "2019",
    title: "Acrylic brought in-house",
    description:
      "Laser cutting, heat bending, polishing and bonding came onto our own floor, so acrylic cases could be sampled and produced without an outside workshop.",
    tag: "Acrylic processing",
  },
  {
    year: "2021",
    title: "PVC foam board line added",
    description:
      "UV flatbed printing and vibration-knife cutting were installed for PVC foam board, giving printed stands the same one-site control as acrylic.",
    tag: "PVC foam board · UV printing",
  },
  {
    year: "2022",
    title: "Design team built out",
    description:
      "Structural designers and 3D visualizers were brought in full time, making a free 3D render with revisions to sign-off a standard part of every enquiry.",
    tag: "Free 3D design",
  },
  {
    year: "2023",
    title: "Tenth anniversary · Dongguan plant consolidated",
    description:
      "Production was consolidated into the 23,000 m² plant in Gaobu, Dongguan, lifting monthly output past 350,000 stands. Sales and project management stayed in Shenzhen, so buyers kept a local contact.",
    tag: "23,000 m² · 350,000 stands / month",
  },
  {
    year: "2024 – 2025",
    title: "Export packing standardized",
    description:
      "Packing was rebuilt around cartons and wooden crates with corner protection and optional pallets, reaching a container load rate above 90%, alongside FOB, CIF and DDP terms.",
    tag: "90%+ load rate · FOB / CIF / DDP",
  },
  {
    year: "2026",
    title: "Complex structures go into production",
    description:
      "Multi-tier and irregular-shaped units, rotating stands with turntable and castor fittings, and illuminated builds with sourced LED components now run as standard projects, assembled in-house.",
    tag: "Rotating · LED · sourced hardware",
  },
];

/** Core team, two rows of five on desktop */
export const aboutTeam: TeamMember[] = [
  {
    name: "Barry",
    role: "Project Manager",
    bio: "10 years in display manufacturing, running accounts from enquiry to delivery and keeping structural revisions moving.",
    image: images.aboutTeamBarry,
    alt: "Barry, project manager at One Plus Display",
  },
  {
    name: "Jane",
    role: "Export Project Lead",
    bio: "8 years leading overseas acrylic and PVC programmes, focused on getting online-first brands onto physical retail shelves.",
    image: images.aboutTeamJane,
    alt: "Jane, export project lead at One Plus Display",
  },
  {
    name: "Lucky",
    role: "Project Manager",
    bio: "10 years of hands-on project work across acrylic and PVC foam board stands for supermarket and chain-store rollouts.",
    image: images.aboutTeamLucky,
    alt: "Lucky, project manager at One Plus Display",
  },
  {
    name: "Diana",
    role: "Regional Manager, Export",
    bio: "Close to a decade working the US and European markets, specialising in acrylic programmes for consumer electronics brands.",
    image: images.aboutTeamDiana,
    alt: "Diana, regional manager at One Plus Display",
  },
  {
    name: "Coco",
    role: "Creative Design Director",
    bio: "15+ years designing retail displays for international brands, signing off structure and finish before anything reaches sampling.",
    image: images.aboutTeamCoco,
    alt: "Coco, creative design director at One Plus Display",
  },
  {
    name: "Jack Li",
    role: "Production & Quality Director",
    bio: "15+ years running factory production, quality and delivery — responsible for scheduling and everything that happens on the floor.",
    image: images.aboutTeamJack,
    alt: "Jack Li, production and quality director at One Plus Display",
    href: "/jack-li/",
  },
  {
    name: "Chen",
    role: "Technical Solutions Engineer",
    bio: "13 years in structural design and sampling, assessing load, joints and manufacturability, and breaking each quote down by material and process.",
    image: images.aboutTeamChen,
    alt: "Chen, technical solutions engineer at One Plus Display",
  },
  {
    name: "Tony",
    role: "Customer Success Manager",
    bio: "13 years in export sales, following overseas accounts from first enquiry through sampling to the shipping document.",
    image: images.aboutTeamTony,
    alt: "Tony, customer success manager at One Plus Display",
  },
  {
    name: "Eric",
    role: "Quality Control Manager",
    bio: "12 years in factory quality management, controlling incoming material, in-line checks and the final inspection against the approved sample.",
    image: images.aboutTeamEric,
    alt: "Eric, quality control manager at One Plus Display",
  },
  {
    name: "Richard",
    role: "Senior Designer",
    bio: "12 years designing display structures, turning a brand's intent into drawings that can actually be cut, bent and assembled at volume.",
    image: images.aboutTeamRichard,
    alt: "Richard, senior designer at One Plus Display",
  },
];

/** Global markets: export reach and the client wall */
export const aboutGlobal = {
  paragraphs: [
    "From initial concept to mass production, we provide custom acrylic and PVC foam board display manufacturing tailored to your products, retail channel and rollout schedule. Quotes are offered in FOB, CIF or DDP terms, and export packing reaches a container load rate above 90%.",
    "We support retail brands, wholesalers, distributors and retail chains — and the agencies and trading companies that run their client programs — all on the same factory terms. A Shenzhen-based project team handles communication in your time zone and follows every order to the shipping document.",
  ],
  brandsLabel: "Selected clients",
  brands: ["NIVEA", "Walmart", "Costco", "Red Bull", "Coca-Cola", "Disney"],
};

/** Factory gallery cycled by <FactoryShowcase /> — also used by /jack-li/ */
export const aboutFactorySlides = [
  {
    src: images.aboutUvPrinter,
    alt: "UV flatbed printer running acrylic and PVC foam board panels at the One Plus Display plant",
  },
  {
    src: images.aboutAcrylicLine,
    alt: "Acrylic bonding and assembly area with black display cases in production",
  },
  {
    src: images.aboutLaminating,
    alt: "Fully automatic laminating machine finishing printed boards",
  },
];

/** About-page FAQ — reuses facts already stated on this page, no new claims */
export const aboutFaq: FaqItem[] = [
  {
    question: "What materials do you work with?",
    answer:
      "We work mainly in acrylic — laser-cut, heat-bent, diamond-polished and bonded in our own acrylic shop — plus UV-printed PVC foam board cut on its own line, and printed paperboard for budget programs.",
  },
  {
    question: "Is the 3D design really free?",
    answer:
      "Yes. Send a drawing, a photo or a rough sketch and our design team returns a free 3D render in 24 hours, then revises it until the structure is signed off. Nothing reaches sampling before you approve it.",
  },
  {
    question: "What is your MOQ and lead time?",
    answer:
      "MOQ is 100 sets per design. Standard samples are built in 48 hours and bulk orders ship in 12–15 days, quoted FOB, CIF or DDP.",
  },
  {
    question: "Do you work with trading companies and agencies?",
    answer:
      "Yes. Trading companies, agencies and distributors are welcome customers. They order on the same factory terms, with the same quoting, sampling and quality process.",
  },
  {
    question: "What certifications do you hold?",
    answer:
      "Six certification marks are on file: BSCI, CE, FSC, RoHS, Sedex and UL, covering social compliance, material safety, conformity marking and certified electrical components. Copies go out with the quote.",
  },
  {
    question: "How do you control quality?",
    answer:
      "Five full-time inspectors check every batch at three gates — incoming material, in-line checks at cutting, bending and assembly, and a final check against the approved sample. Dimensions are held to ±1 mm and the inspection report travels with the order.",
  },
  {
    question: "How are the displays packed and shipped?",
    answer:
      "Cartons and wooden crates with corner protection, flat-packed or palletized, loaded at a container rate above 90%. Bulk orders ship in 12–15 days.",
  },
];

/** Section headings, kept together so the page structure is easy to reword */
export const aboutSections = {
  builds: {
    eyebrow: "02 / What we manufacture",
    title: "What We Manufacture",
    subtitle:
      "Factory-direct custom display programs for brands, wholesalers and retail chains. Every build below is manufactured in our own plant to your exact product size, artwork and store requirements — start from a display style or from your retail sector.",
    stylesLabel: "By display style",
    industriesLabel: "By retail sector",
    viewAll: { label: "Browse the full product center", href: "/pop-retail-displays/" },
  },
  process: {
    eyebrow: "03 / Manufacturing process",
    title: "Our **End-to-End Manufacturing Process**",
    subtitle:
      "From initial concept to mass production, we control structural design, sampling, printing, cutting, assembly, inspection and delivery at every step. Our end-to-end capabilities cover free 3D rendering, 3-working-day sampling, precision UV printing, ±1 mm cutting and export packing for bulk B2B orders.",
    caption:
      "UV flatbed printing, acrylic assembly and automatic laminating all run on the Gaobu site, in the same building as the sample room.",
  },
  team: {
    eyebrow: "04 / Our team",
    title: "Meet Our Expert Team",
    subtitle:
      "Our project managers, structural engineers, designers and quality inspectors bring 8 to 15 years of display manufacturing experience, and one named contact follows your project from enquiry to delivery.",
  },
  facilities: {
    eyebrow: "05 / Manufacturing facilities",
    title: "State-of-the-Art **Manufacturing Facilities**",
    subtitle:
      "Our 23,000 m² plant in Gaobu, Dongguan houses our own acrylic shop, UV printing lines and assembly floor, where about 150 staff produce more than 350,000 display stands every month.",
  },
  global: {
    eyebrow: "06 / Global markets",
    title: "Serving **Global Markets** with Local Expertise",
    subtitle:
      "We support custom display programs for brands, wholesalers, distributors and retail chains in North America, Europe, the Middle East and Asia-Pacific that need acrylic and PVC foam board displays manufactured to exact product size, load capacity, artwork and store requirements.",
  },
  certifications: {
    eyebrow: "07 / Certifications",
    title: "Certifications and Compliance Documents",
    subtitle:
      "Six certification marks on file — BSCI, CE, FSC, RoHS, Sedex and UL — cover social compliance, material safety, conformity marking and certified electrical components, so compliance documents never hold up your order. Copies go out with every quote, and the originals are on the wall when you visit.",
  },
  faq: {
    eyebrow: "08 / FAQ",
    title: "Frequently Asked Questions",
    subtitle:
      "Straight answers to the questions buyers ask most before starting a custom display project — and if yours is not covered, our team replies within one business day.",
  },
  cta: {
    title: "Need Jack's Team to Review Your Display Program?",
    description:
      "Share your product, the retail channel it sells in, your artwork status and the units you need per run. Jack's team covers structure planning, free 3D rendering, sampling and factory-direct production from 100 sets.",
  },
};
