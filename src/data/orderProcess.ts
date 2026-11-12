import { images } from "./images";

/**
 * Order process copy for /order-process/: the steps from enquiry to container,
 * plus the terms a buyer needs before starting. All figures come from the
 * company fact sheet.
 */
export interface OrderStep {
  step: string;
  title: string;
  text: string;
  bullets: string[];
  /** 4:3 photo for the home-page card; the /order-process/ list ignores it */
  image?: string;
  alt?: string;
}

export const orderProcessIntro =
  "Six steps from brief to container. The first three cost you nothing: the 3D render, the quotation and any revision to the drawing. The sample is about US$100 and is refunded once the order reaches 100 sets. Here is what happens at each step, what you receive and how long it takes.";

export const orderSteps: OrderStep[] = [
  {
    step: "01",
    title: "Send the Brief",
    text: "Send the product photo, its size and weight, the shelf it stands on and the target quantity. Reference images or a sketch help; a full drawing is not required.",
    bullets: [
      "No account or deposit to start",
      "Material advice included — acrylic or PVC foam board",
      "One contact from brief to delivery",
    ],
    image: images.placeholderProcess01,
    alt: "Placeholder for a photo of product dimensions, drawings and reference images at the brief",
  },
  {
    step: "02",
    title: "Get the 3D Render and Quote",
    text: "The structure, material and shelf load are worked out against your product, and a 3D render comes back with an itemised quotation for your quantity.",
    bullets: [
      "Free 3D render in 24 hours",
      "MOQ 100 sets per design, quotation valid 7 days",
      "FOB, CIF or DDP quoted to your destination",
    ],
    image: images.placeholderProcess02,
    alt: "Placeholder for a photo of a 3D display render beside its quotation",
  },
  {
    step: "03",
    title: "Sign the Drawing",
    text: "Dimensions, artwork and finishing are confirmed on paper. The signed drawing becomes the reference every unit in the run is checked against.",
    bullets: [
      "Render revised until you approve the structure",
      "Pantone references confirmed before printing",
      "Approved drawing becomes the production reference",
    ],
    image: images.placeholderProcess03,
    alt: "Placeholder for a photo of an approved display drawing and artwork proof",
  },
  {
    step: "04",
    title: "Approve the Sample",
    text: "A pre-production sample is built on the line, not in a separate workshop, and shipped for sign-off. The approved unit becomes the inspection reference.",
    bullets: [
      "Sample built in 48 hours for standard structures",
      "Sample fee about US$100, refunded at 100 sets",
      "Sample becomes the inspection reference for the batch",
    ],
    image: images.placeholderProcess04,
    alt: "Placeholder for a photo of a pre-production display sample on the bench",
  },
  {
    step: "05",
    title: "Run the Batch",
    text: "Printing, cutting, bending, polishing, bonding and assembly run against the signed sample, with dimensional checks at each stage.",
    bullets: [
      "12–15 days on our own factory floor",
      "Dimensional checks held to ±1 mm",
      "Scheduled drops for rollouts larger than one container",
    ],
    image: images.placeholderProcess05,
    alt: "Placeholder for a photo of acrylic cutting and assembly on the production line",
  },
  {
    step: "06",
    title: "Ship and Roll Out",
    text: "The packed batch is tested, photographed and loaded, with splits scheduled to match your store or warehouse rollout.",
    bullets: [
      "Cartons or wooden crates with corner protection",
      "Load, drop and transport checks filmed and shared",
      "Packed-unit photos sent before loading",
    ],
    image: images.placeholderProcess06,
    alt: "Placeholder for a photo of packed cartons and container loading",
  },
];

/* --------------------------------------------------------------------------
   Stage pages, one per step: /order-process/<slug>/
   -------------------------------------------------------------------------- */

/**
 * One stage of the order process. `slug` and `label` are mirrored in
 * `navigation.ts` (data files only import `images.ts`), so changing a slug
 * means editing both.
 */
export interface OrderStage {
  /** URL segment, e.g. "concept-design" — must match the nav href */
  slug: string;
  /** Name used in the navigation, breadcrumbs and the page heading */
  label: string;
  /** Banner heading and the page-specific part of the <title> */
  title: string;
  /** Banner subheading: what this stage covers */
  subtitle: string;
  /** Body copy. Real content is written per stage; no figures until then */
  description: string;
  /** <meta name="description"> */
  seoDescription: string;
}

/**
 * The six stages, in the order they appear in the navigation and in the
 * previous / next links on each stage page.
 */
export const orderStages: OrderStage[] = [
  {
    slug: "concept-design",
    label: "Concept Design",
    title: "Concept Design",
    subtitle:
      "The first stage: your product, your brief and your target market turned into a display concept worth quoting.",
    description:
      "We start from what you already have — product dimensions and weight, reference images, a rough sketch or just a description of how the display has to work on shelf. From there we agree the direction of the concept before any drawing work starts.",
    seoDescription:
      "Concept design stage of the One Plus Display order process: from product brief and reference images to a display concept worth quoting. Details to follow.",
  },
  {
    slug: "structural-design",
    label: "Structural Design",
    title: "Structural Design",
    subtitle:
      "The second stage: the structure of the stand, the material it is built from and how it carries the load.",
    description:
      "Once the concept is agreed, the structure is worked out: panel layout, material and thickness, joints, the way the stand carries the product, and how it breaks down for packing and assembly in store.",
    seoDescription:
      "Structural design stage of the One Plus Display order process: panel layout, material, joints and load path for custom acrylic and PVC foam board displays. Details to follow.",
  },
  {
    slug: "graphic-design",
    label: "Graphic Design",
    title: "Graphic Design",
    subtitle:
      "The third stage: artwork, print layout and branding prepared for UV printing.",
    description:
      "Artwork is laid out on the approved structure and prepared for print — panel by panel, with the colour references and finishing options confirmed before anything goes to the printer.",
    seoDescription:
      "Graphic design stage of the One Plus Display order process: artwork layout and colour preparation for UV-printed display panels. Details to follow.",
  },
  {
    slug: "prototyping",
    label: "Prototyping",
    title: "Prototyping",
    subtitle:
      "The fourth stage: a physical sample built and checked before bulk production is released.",
    description:
      "A prototype is built on the production line so the structure, print and finish can be judged in the hand rather than on screen. The approved sample becomes the reference the batch is inspected against.",
    seoDescription:
      "Prototyping stage of the One Plus Display order process: a pre-production sample built and approved before bulk manufacturing starts. Details to follow.",
  },
  {
    slug: "manufacturing",
    label: "Manufacturing",
    title: "Manufacturing",
    subtitle:
      "The fifth stage: bulk production on our own factory floor.",
    description:
      "Printing, cutting, bending, polishing, bonding and assembly run in one plant, so the batch is built against the approved sample from the first unit to the last.",
    seoDescription:
      "Manufacturing stage of the One Plus Display order process: UV printing, cutting, polishing and assembly of custom display runs in our own plant. Details to follow.",
  },
  {
    slug: "packout-logistics",
    label: "Packout & Logistics",
    title: "Packout & Logistics",
    subtitle:
      "The sixth stage: inspection, packing and shipment to your destination.",
    description:
      "Finished stands are inspected, packed for the journey and loaded for shipment, with the packing list and loading record shared before the container leaves.",
    seoDescription:
      "Packout and logistics stage of the One Plus Display order process: inspection, export packing and container loading for custom display orders. Details to follow.",
  },
];

/** Terms at a glance, shown beside the steps */
export const orderTerms: { label: string; value: string }[] = [
  { label: "Minimum order", value: "100 sets per design" },
  { label: "3D design", value: "Free, revised until approved" },
  { label: "Sample build time", value: "48 hours" },
  { label: "Sample fee", value: "About US$100, refunded at 100 sets" },
  { label: "Bulk lead time", value: "12–15 days" },
  { label: "Quotation validity", value: "7 days" },
  { label: "Tolerance", value: "±1 mm" },
  { label: "Max sheet size", value: "1.2 × 2.4 m" },
  { label: "Container load rate", value: "Above 90%" },
  { label: "Trade terms", value: "FOB / CIF / DDP" },
];

/** Closing call to action on the process overview */
export const orderProcessCta = {
  title: "Need Jack's Team to Review Your Timeline?",
  description:
    "Share your product size, estimated quantity, artwork status and the date you need the units in store. Jack's team plans the structure, renders it free, builds the sample in 48 hours and runs factory-direct production from 100 sets.",
};

/** Closing call to action shared by the per-stage pages */
export const orderStageCta = {
  title: "Need Jack's Team to Review Your Order at This Stage?",
  description:
    "Share your product size, quantity, artwork status and destination market. Jack's team shows where your order sits in the process, what happens next, and quotes factory-direct from 100 sets.",
};
