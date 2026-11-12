import type { Advantage, FaqItem } from "../types";
import { images } from "./images";
import { site } from "./site";

/**
 * Copy for the /jack-li/ person page. The page template only arranges these
 * blocks — rewording means editing this file.
 *
 * Facts are limited to what is already on file elsewhere in the site: the
 * `aboutTeam` bio, the plant numbers in `aboutStats`, the three gates and six
 * tests in `homeQuality`. Anything Jack still has to confirm (his joining year,
 * earlier roles, the wording of the quote) is marked `[VERIFY] JP-xx` and
 * logged in `docs/copy-claims-review.md`.
 */

export interface JackFact {
  value: string;
  label: string;
}

export interface JackTimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface JackVerifyLink {
  title: string;
  description: string;
  href: string;
  label: string;
}

export const jackLi = {
  seo: {
    title: "Jack Li — Production & Quality Director",
    description:
      "Jack Li runs production and quality at One Plus Display: scheduling, three inspection gates, six pre-shipment tests and the batch record that ships with every order. 15+ years on the factory floor.",
  },

  hero: {
    eyebrow: "Production & Quality Director",
    name: "Jack Li",
    intro:
      "Jack Li runs production and quality at One Plus Display — the schedule, the three inspection gates and the batch record that ships with every order.",
    paragraphs: [
      "Fifteen years on the factory side, from the incoming sheet to the last carton. Jack owns the production schedule, the in-line checks at cutting, bending and assembly, and the pre-shipment tests that decide whether a batch leaves the floor.",
      "He is the person who signs off the approved sample that production is matched against. If a revision changes a joint, a shelf height or a finish, it crosses his desk before the first sheet is cut.",
    ],
    image: images.aboutTeamJack,
    imageAlt:
      "Jack Li, production and quality director at One Plus Display, on the factory floor",
    actions: [
      {
        label: "Request a Quote",
        href: "/contact/",
      },
      {
        label: "Email Jack's team",
        href: `mailto:${site.persona.email}`,
      },
      {
        label: "WhatsApp",
        href: site.contact.whatsappHref,
      },
    ],
    facts: [
      { value: "15+ years", label: "Factory production & quality" },
      { value: "5", label: "Full-time QC inspectors" },
      { value: "23,000 m²", label: "Plant he schedules" },
      { value: "±1 mm", label: "Cut and drill tolerance" },
      { value: "350,000+", label: "Stands per month" },
    ] satisfies JackFact[],
  },

  /* 02 — What he is accountable for, as four cards */
  owns: {
    eyebrow: "02 / What Jack owns",
    title: "Four things he signs his name to",
    subtitle:
      "The scope is deliberately narrow: scheduling, inspection, testing and packing. Nothing on that list is handed to an outside workshop.",
  },
  ownsItems: [
    {
      title: "Production scheduling",
      description:
        "Every order gets a slot on the floor — cutting, bending, polishing, printing and assembly sequenced so the sample date and the bulk date both hold. Bulk runs ship in 12–15 days.",
      meta: "12–15 day bulk runs",
      icon: "clock",
    },
    {
      title: "Incoming and in-line quality",
      description:
        "Sheet thickness is gauged on arrival; cut and drilled dimensions are held to ±1 mm, colour is checked against the approved proof, edges are polished and joints load-checked at assembly.",
      meta: "±1 mm · three gates",
      icon: "ruler",
    },
    {
      title: "Pre-shipment testing",
      description:
        "Load, drop, environmental and packaging tests run on the packed unit, sampled to ISO 2859-1. Results are photographed or filmed and filed under the batch number.",
      meta: "Six tests per batch",
      icon: "shield",
    },
    {
      title: "Packing and export readiness",
      description:
        "Cartons, corner protection and crates are specified per route, with a container load rate above 90%. The inspection sheet and the test footage travel with the shipping documents.",
      meta: "90%+ container load",
      icon: "package",
    },
  ] satisfies Advantage[],

  /* 03 — The protocol, rendered from `homeQuality` so the numbers never drift */
  quality: {
    eyebrow: "03 / The quality protocol",
    title: "**Three gates**, six tests, one record per batch",
    subtitle:
      "The same protocol runs on a 100-set test order and a 5,000-set rollout. Nothing is sampled to a looser standard because the order is small.",
    gatesLabel: "The three gates",
    testsLabel: "The six tests",
  },

  /* 04 — Factory floor proof */
  floor: {
    eyebrow: "04 / From the floor",
    title: "The route every unit takes",
    body: "Design, cutting, heat bending, polishing, UV printing, assembly and inspection sit on one site, which is why a revision can be re-cut the same week instead of waiting on an outside workshop. Jack walks this route daily — the acrylic line, the PVC line and the packing bay.",
    link: {
      label: "See how an order runs",
      href: "/order-process/manufacturing/",
    },
    caption:
      "Acrylic assembly, UV flatbed printing and laminating — the three areas the production schedule is built around.",
  },

  /* 05 — Career timeline */
  timeline: {
    eyebrow: "05 / Experience timeline",
    title: "Fifteen years on the factory side",
    subtitle:
      "15+ years on the factory side. The milestones below track the plant Jack runs; his own joining year and earlier roles are being confirmed, so the draft keeps to what the factory record supports.",
  },
  // [VERIFY] JP-01 Timeline currently uses plant milestones from about.ts; replace with Jack's joining year and prior roles once supplied
  timelineItems: [
    {
      year: "2013",
      title: "Custom display production starts",
      description:
        "The plant opens as a source factory for custom acrylic and PVC foam board stands, with scheduling, assembly and inspection on one site from the first order.",
    },
    {
      year: "2019",
      title: "Acrylic line brought in-house",
      description:
        "Laser cutting, heat bending, polishing and bonding move onto the floor, so acrylic cases are sampled and produced without an outside workshop.",
    },
    {
      year: "2021",
      title: "PVC foam board line added",
      description:
        "UV flatbed printing and vibration-knife cutting are installed, giving printed stands the same one-site control as acrylic.",
    },
    {
      year: "2023",
      title: "Plant consolidated at 23,000 m²",
      description:
        "Sales, design and production come onto one site, lifting monthly output past 350,000 stands and putting the whole chain under one inspection routine.",
    },
    {
      year: "2024 – 2025",
      title: "Export packing standardised",
      description:
        "Cartons, wooden crates and corner protection are rebuilt around the routes we ship, taking the container load rate above 90%.",
    },
    {
      year: "Today",
      title: "Every batch carries a record",
      description:
        "Inspection sheets and test footage are filed under the batch number and sent with the shipping documents, signed off before the container is sealed.",
    },
  ] satisfies JackTimelineEntry[],

  /* 06 — Statement in his voice */
  quote: {
    eyebrow: "06 / In his words",
    title: "What “finished” means on this floor",
    // [VERIFY] JP-02 Quote is a draft in Jack's voice — replace with his own approved wording
    text: "A batch is not finished when the last unit is packed. It is finished when the inspection sheet is signed — dimensions, colour, load and packing, all on one record. That record is what I hand to the buyer.",
    attribution: `${site.persona.name}, ${site.persona.title}`,
  },

  /* 07 — Verifiable links + certification strip */
  verify: {
    eyebrow: "07 / What buyers can verify",
    title: "Check the record, not the promise",
    subtitle:
      "Three places to test what this page claims: what buyers said after delivery, what the builds looked like, and the inspection record that comes with your own order.",
  },
  verifyLinks: [
    {
      title: "Customer testimonials",
      description:
        "Feedback from brands, wholesalers and retail chains on sampling, batch consistency and delivery.",
      href: "/customer-testimonials/",
      label: "Read the feedback",
    },
    {
      title: "Case studies",
      description:
        "Acrylic and PVC foam board programmes, from countertop units to multi-tier floor stands.",
      href: "/case-studies/",
      label: "See the builds",
    },
    {
      title: "Inspection and test record",
      description:
        "Ask for a sample inspection sheet and test footage with your quote — before the order is placed.",
      href: "/contact/",
      label: "Request a sample record",
    },
  ] satisfies JackVerifyLink[],
  certifications: {
    eyebrow: "Certifications on file",
    title: "The marks behind the routine",
    subtitle:
      "Copies go out with your quote; the originals are on the wall when you visit.",
  },

  /* 08 — Customer feedback: three cards, full list on its own page */
  testimonials: {
    eyebrow: "08 / Delivered projects",
    title: "What buyers say about the team Jack runs",
    subtitle:
      "Three of the six published feedback entries. The full set, with the anonymisation note, sits on the testimonials page.",
    link: {
      label: "Read all customer testimonials",
      href: "/customer-testimonials/",
    },
  },

  /* 09 — FAQ, also the source of the FAQPage schema */
  faq: {
    eyebrow: "09 / About Jack",
    title: "Questions buyers ask before a project starts",
  },
  faqItems: [
    {
      question: "Who is Jack Li?",
      answer:
        "Jack Li is the Production & Quality Director at One Plus Display. He runs scheduling, production and inspection, and signs off the batch record before an order ships.",
    },
    {
      question: "What does he sign off personally?",
      answer:
        "Three things: the approved sample that production is matched against, the in-line checks at cutting, bending and assembly, and the pre-shipment test results. A revision that changes a joint, a shelf height or a finish is reviewed before cutting starts.",
    },
    {
      question: "Can I see the inspection record for my order?",
      answer:
        "Yes. The inspection sheet and the test footage are filed under the batch number and sent with the shipping documents. Ask for a sample record with your quote if you want to see the format first.",
    },
    {
      question: "Does he work on new projects or only repeat orders?",
      answer:
        "Both. New projects start with design and a free 3D render, and Jack reviews manufacturability before sampling. Repeat runs reuse the approved files and go straight into the production schedule.",
    },
    {
      question: "How do I reach him?",
      answer: `Email ${site.persona.email}, message the factory on WhatsApp at ${site.contact.whatsapp}, or send the brief through the quote form. A photo, a size and a target quantity are enough to start, and the reply comes within one business day.`,
    },
  ] satisfies FaqItem[],

  /* 10 — Closing CTA */
  cta: {
    title: "Need Jack's Team to Review Your Inspection Plan?",
    description:
      "Share your product size, target quantity, artwork status and ship date. Jack's team returns the structure plan, the 3D render, the sample schedule and the inspection checks your order will run, from 100 sets.",
    footnote: "Bulk B2B orders only · FOB, CIF or DDP",
    primary: { label: "Request a Quote", href: "/contact/" },
    secondary: {
      label: "Email the Factory",
      href: `mailto:${site.persona.email}`,
    },
  },

  /** Person schema fields; nothing here is inferred beyond the page content */
  schema: {
    knowsAbout: [
      "Custom acrylic display manufacturing",
      "PVC foam board display manufacturing",
      "Production scheduling",
      "Pre-shipment inspection",
      "Export packing",
    ],
  },
};

/**
 * Author card rendered at the end of article (news detail) and case detail
 * pages. Bio reuses `hero.intro`; the CTA line follows the site CTA spec:
 * buyer info list → capability list → MOQ from 100 sets.
 */
export const authorCard = {
  name: jackLi.hero.name,
  role: jackLi.hero.eyebrow,
  image: jackLi.hero.image,
  imageAlt: jackLi.hero.imageAlt,
  bio: jackLi.hero.intro,
  ctaCopy:
    "Send your product size, estimated quantity, target retail channel and artwork status — Jack's team replies with structure advice, a free 3D render and a sampling plan from 100 sets.",
  primary: { label: "Request a Quote", href: "/contact/" },
  secondary: { label: "Meet Jack Li", href: "/jack-li/" },
};
