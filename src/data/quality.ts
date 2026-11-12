import type { GalleryImage } from "../types";
import { images } from "./images";

/**
 * /quality/ page content: the full batch quality record moved off the home
 * page (3 inspection gates, 6 tests, test-video placeholders, report note).
 * The home2 preview carries only a one-line summary and links here.
 *
 * Shapes mirror the `QualityGate` / `QualityTest` interfaces in `home.ts`
 * (kept local so the old home page's import chain stays untouched); the two
 * files merge once the user picks one home page. No pass/fail figures are
 * published until QC confirms them — see `docs/copy-claims-review.md` HP-15
 * and HP-16. US spelling throughout.
 */

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

export const qualityHeader = {
  title: "Quality Control: Three Gates, Six Tests, One Report per Batch",
  subtitle:
    "Every batch is checked on our own floor before it ships — and the results travel with the goods, so you never have to take the claim on faith.",
  breadcrumbs: [{ label: "Quality Control" }],
};

export const qualityIntro =
  "Five full-time inspectors run three gates — the sheet on arrival, the unit in line, the batch before it ships — then six tests on the packed unit, sampled to ISO 2859-1. Results are photographed or filmed and filed under the batch number.";

export const qualityGates: QualityGate[] = [
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
];

export const qualityTests: QualityTest[] = [
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
];

export const qualityCompliance = "RoHS · REACH · FSC chain of custody";

/** Section heading for the inspection photography row */
export const qualityInspectionTitle =
  "Checked by Hand, Photographed per Batch";

export const qualityInspectionImages: GalleryImage[] = [
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

export const qualityReportTitle = "What Ships with Your Order";

export const qualityReportNote =
  "The inspection sheet and the test footage travel with the shipping documents, filed under your batch number. Ask for a sample report with your quote and we send one with the 3D render.";

/** Placeholder tiles until the YouTube IDs for the test videos are supplied */
export const qualityVideos = [
  { label: "Load test — acrylic" },
  { label: "Load test — PVC foam board" },
  { label: "Store assembly" },
];

/** Closing call to action for the quality page */
export const qualityCta = {
  title: "Need Jack's Team to Review Your Test Standard?",
  description:
    "Share your product size, target quantity, artwork status and the checks your buyer requires. Jack's team covers structure planning, free 3D rendering, sampling and factory-direct production from 100 sets, with the inspection report travelling with your shipment.",
};
