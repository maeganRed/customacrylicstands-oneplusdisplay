import type { Certification } from "../types";
import { images } from "./images";

/**
 * The certification marks shown by the home page and the about page band.
 *
 * Names are stated as held; no certificate numbers, audit IDs or expiry dates
 * are published — copies go out with the quote, which is the same line the
 * rest of the site takes (see the FAQ answer on certificates).
 */
export const certifications: Certification[] = [
  {
    name: "amfori BSCI",
    detail: "Social compliance audited at our own plant",
    image: images.certBsci,
    alt: "amfori BSCI social compliance certification mark",
  },
  {
    name: "CE",
    detail: "Conformity marking for the European market",
    image: images.certCe,
    alt: "CE conformity marking",
  },
  {
    name: "FSC",
    detail: "Chain-of-custody certified board and paper",
    image: images.certFsc,
    alt: "FSC chain of custody certification mark",
  },
  {
    name: "RoHS",
    detail: "Hazardous substances kept out of materials",
    image: images.certRohs,
    alt: "RoHS compliance mark",
  },
  {
    name: "Sedex",
    detail: "Ethical supply chain audit on file",
    image: images.certSedex,
    alt: "Sedex ethical trade audit mark",
  },
  {
    name: "UL",
    detail: "Recognised parts for LED and lighted units",
    image: images.certUl,
    alt: "UL certification mark",
  },
];
