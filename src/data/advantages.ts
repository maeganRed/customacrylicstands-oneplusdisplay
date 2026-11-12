import type { Advantage } from "../types";
import { images } from "./images";

/**
 * The six reasons a buyer works with us, rendered on the home page.
 * `about-us/` carries its own longer set in `about.ts`, so changing this
 * file does not touch that page.
 *
 * Commitment copy is plain and specific; marketing figures carry `[VERIFY]`.
 */
export const advantages: Advantage[] = [
  {
    title: "Quoted by the Engineers Who Build It",
    description:
      "No account manager between the drawing and the line: the engineer who quotes your display sits in the plant that builds it.",
    meta: "23,000 m² own plant",
    icon: "factory",
  },
  {
    title: "Free 3D Render in 24 Hours",
    description:
      "Send a photo and a target quantity. The render comes back in 24 hours and is revised until you sign the drawing.",
    meta: "Revised until you sign",
    icon: "palette",
  },
  {
    title: "Start With 100 Sets",
    description:
      "Run 100 sets as a test, then scale the same files across the rollout — no new tooling, no second sample.",
    // [VERIFY] HP-02 5,000+ brands served — replace with the customer count on file
    meta: "5,000+ brands served",
    icon: "layers",
  },
  {
    // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
    title: "Rated 20–55 kg per Shelf",
    description:
      "Shelf load, assembly time and carton size are fixed with the drawing, not discovered in store.",
    meta: "±1 mm · 90%+ container load",
    icon: "wrench",
  },
  {
    title: "Checked Three Times, Not Once",
    description:
      "Incoming sheet, in-line unit, packed batch — results photographed, filed under the batch number and shipped with the documents.",
    meta: "5 QC inspectors · ISO 2859-1",
    icon: "shield",
  },
  {
    title: "Packed for the Crossing",
    description:
      "Flat-packed by default, corner protection on every carton, quoted FOB, CIF or DDP to your destination.",
    meta: "90%+ container load",
    icon: "ship",
  },
];

/** Images cycled by the factory gallery */
export const factoryGallery = [
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
  {
    src: images.productLighterCase4,
    alt: "Finished lockable acrylic display cabinet after assembly and inspection",
  },
];
