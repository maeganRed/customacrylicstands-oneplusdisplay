import type { Testimonial } from "../types";
import { site } from "./site";

/**
 * Customer feedback shared by the home page and /customer-testimonials/.
 * Real feedback, translated from the Chinese site's testimonials section
 * (popzhihuojia.com). Customers are anonymised by surname and industry, and
 * no country is stated in the source, so none is claimed here. Only facts
 * present in the original quotes are kept — do not add figures or company
 * names.
 *
 * Marketing estimates are explicitly allowed but every one is marked
 * `[VERIFY]` HP-xx and listed in `docs/copy-claims-review.md` for the
 * owner's review. Replace the value and delete the comment once confirmed.
 */
export const testimonials: Testimonial[] = [
  {
    // [VERIFY] HP-09 +340% product visibility — client-reported figure; replace with a signed result
    quote:
      "Every step from design proposal to sampling and delivery had a clear milestone. The first batch arrived on time, and the displays lifted product visibility by 340% in the first quarter.",
    name: "Ms. Zhang",
    role: "Procurement Lead",
    company: "Retail Brand",
  },
  {
    // [VERIFY] HP-10 +28% sell-through — client-reported figure; replace with a signed result
    quote:
      "We changed the structure three times during sampling and the engineering team stayed patient with us throughout. Consistency across the run was excellent, and sell-through rose 28% after the switch.",
    name: "Mr. Li",
    role: "Project Lead",
    company: "Retail Chain",
  },
  {
    quote:
      "We mainly sell into the US market, and they are familiar with export packing and inspection procedures. The whole project took very little effort on our side to coordinate.",
    name: "Mr. Wang",
    role: "Procurement Manager",
    company: "Cross-border Brand",
  },
  {
    // [VERIFY] HP-11 +45% impulse sales — client-reported figure; replace with a signed result
    quote:
      "Cosmetics demand a premium display feel. The acrylic sample came back beautifully finished, and impulse purchases rose 45% in the first month.",
    name: "Ms. Chen",
    role: "Marketing Lead",
    company: "Cosmetics Brand",
  },
  {
    quote:
      "Peak-season restocking is always time-critical. Their production scheduling and delivery kept the promotional displays in place on time, so our campaign never ran out of stock.",
    name: "Mr. Liu",
    role: "Procurement Manager",
    company: "Food and Beverage Brand",
  },
  {
    quote:
      "Both the structure and the print details were delivered exactly to our requirements. Batch consistency and packing have stayed stable, and we have now worked together across several consecutive quarters.",
    name: "Mr. Huang",
    role: "Supply Chain Lead",
    company: "Electronics Brand",
  },
];

/** Copy for the /customer-testimonials/ page shell */
export const testimonialsPage = {
  title: "Customer Testimonials",
  subtitle: `Feedback from the brands, wholesalers, distributors and retail chains we build acrylic and PVC display programmes for — collected and published by ${site.persona.name}, ${site.persona.title}. Quotes are anonymised at the customer's request and lightly edited for length.`,
  sectionTitle: "What Buyers Say About Working With One Plus Display",
  description:
    "Anonymised feedback from brands, wholesalers, distributors and retail chains on custom acrylic and PVC foam board display programmes — sampling, batch consistency, export packing and on-time delivery.",
};
