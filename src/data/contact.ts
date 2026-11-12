import { site } from "./site";

/**
 * /contact/ page: the information column that sits beside the inquiry form
 * (Let's connect → why this factory → what to include).
 * Each card carries one heading and its list; no eyebrow, no lead paragraph.
 *
 * Channel values are read from `site.contact`, so the email, WhatsApp,
 * website and address never drift from the header, footer and structured
 * data. The phone number stays in the header and footer only; the panel
 * keeps four channels (email, WhatsApp, address, website).
 * Figures (13 years, 23,000 m², MOQ 100 sets) are the ones already on file in
 * `site.ts` and `home2.ts` — nothing new is claimed here.
 */

export interface ContactChannel {
  /** Picks the icon in the page template */
  key: "email" | "whatsapp" | "factory" | "website";
  /** Short label above the value */
  label: string;
  /** Value shown in bold: an address, a number or a link label */
  value: string;
  /** One line on what the visitor gets from this channel */
  note: string;
  /** Link on the value text itself; omit for display-only rows (address) */
  href?: string;
  /** Opens in a new tab (WhatsApp, website) */
  external?: boolean;
}

/**
 * The quote panel itself: heading, the field labels, the MOQ confirmation and
 * the copy around the email-draft submit. Field hints that already exist
 * elsewhere (`inquiryForm.privacy`, upload label and note,
 * `quantitySelect.options`) are imported by the page rather than repeated here.
 */
export const contactForm = {
  title: "Request a Free Quote",
  subtitle:
    "Please send us a message if you have any questions or request a quote. We will be back to you within 24 hours.",

  nameLabel: "Name",
  emailLabel: "Email",
  companyLabel: "Company / Brand Name",
  quantityLabel: "Estimated Quantity",
  quantityPlaceholder: "Select an estimated quantity",

  moqLabel: "I understand the minimum order quantity is 100 sets.",

  messageLabel: "Your Message",
  messagePlaceholder:
    "Product size, shelf count, print, artwork status, destination port…",

  submit: "Get a Quick Quote",
};

export const contactPanel = {
  /** The card's only heading — the channel list needs no sub-heading */
  connectTitle: "Let's Connect",
  channels: [
    {
      key: "email",
      label: "Email Us",
      value: site.contact.email,
      note: "Get a response within 24 hours",
      href: `mailto:${site.contact.email}`,
    },
    {
      key: "whatsapp",
      label: "WhatsApp Chat",
      value: site.contact.whatsapp,
      note: "Instant messaging for quick questions",
      href: site.contact.whatsappHref,
      external: true,
    },
    {
      key: "factory",
      label: "Visit the Plant",
      value: site.contact.address,
      note: "23,000 m² production floor — audits and visits are welcome",
    },
    {
      key: "website",
      label: "Visit Our Website",
      value: site.contact.website,
      note: "Explore our portfolio and services",
      href: site.contact.websiteHref,
      external: true,
    },
  ] satisfies ContactChannel[],

  whyTitle: "Why Choose One Plus Display?",
  whyPoints: [
    "13 years of OEM/ODM display production in our own plant.",
    "23,000 m² factory, 350,000 sets monthly capacity.",
    "FSC, BSCI and Sedex certified. Reports ship with the goods.",
    "Free 3D design and pre-production sample.",
  ],

  guideTitle: "What to Include in Your Quote Request",
  guideIntro:
    "A few project details help us reply faster and give a more accurate display quote.",
  guidePoints: [
    "Product size and weight, plus how many pieces each stand should hold.",
    "The display type you have in mind, or a reference image of one.",
    "Estimated quantity and the retail channel it ships to.",
    "Artwork status and the date you need the goods in store.",
  ],
};
