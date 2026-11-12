import type { CaseStudy } from "../types";
import { images } from "./images";

/**
 * Documented programmes.
 * Entries marked `featured` also appear in the home page grid; /case-studies
 * shows six programmes per page in the same three-column grid and paginates
 * any remainder.
 *
 * Client names are withheld: each `company` field is a customer profile
 * (market + channel + category), never a brand name.
 *
 * Client-reported outcome percentages are allowed on the home-page cards but
 * carry `[VERIFY] HP-xx` and render under a "client-reported" note; confirm
 * each one against a signed case study before publishing.
 *
 * The `quote` fields are our own project notes on what the brief required and
 * how it was resolved, attributed to the engineering team. Replace them with a
 * signed client quote once you have one on file.
 */

const engineeringNote = "One Plus Display engineering team";

export const caseStudies: CaseStudy[] = [
  {
    slug: "us-consumer-electronics-4-tier-acrylic",
    country: "United States",
    company: "North American consumer electronics brand",
    title: "4-Tier Acrylic Floor Stand with Backlit Header",
    description:
      "A 1.8 m acrylic floor stand that presents headphones, chargers and small accessories without a frame in the way, with a backlit header and concealed cable routing.",
    industry: "Consumer Electronics",
    year: "2025",
    volume: "1,200 sets",
    quote:
      "The brief called for a stand the brand could photograph product on directly, so the acrylic had to stay optically clear at 8 mm thick while carrying a powered header. We prototyped the shelf bracket in 48 hours and moved the cable channel into the rear extrusion.",
    quoteBy: engineeringNote,
    image: images.caseElectronicsUs,
    alt: "Four-tier clear acrylic floor display stand with a black backlit header",
    featured: true,
    results: [
      { label: "Sets produced", value: "1,200" },
      // [VERIFY] HP-09 +340% product visibility — client-reported figure; replace with a signed result
      { label: "Product visibility", value: "+340%" },
      { label: "Sample build", value: "48 hours" },
      { label: "Bulk lead time", value: "15 days" },
    ],
    body: [
      {
        heading: "The brief",
        paragraphs: [
          "The brand was moving a mixed accessory range from shelf-ready packaging to a branded floor position in big-box retail. Its existing unit was printed board on a metal frame: the frame edge cut across the product, and the powered header had a visible cable running down the outside.",
          "The requirement was specific. Clear sightlines from 1.5 m, four shelf levels with adjustable pitch, a backlit header the brand could reuse across seasons, and every unit arriving assembled because store labour was not available for build-outs.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "We built the carcass in 8 mm high-clarity cast acrylic with black acrylic side panels, so the structure reads as a frame while the shelves stay transparent. Shelves are 5 mm acrylic with a laser-cut bracket that sets the pitch at four positions without tools.",
          "The header is a separate acrylic box with an LED module behind a diffused print panel, and the cable is routed through an internal channel into the base. Units ship assembled in a wooden crate with foam blocking on the header.",
        ],
        bullets: [
          "8 mm clear acrylic carcass, black side panels, 5 mm shelves",
          "Heat-bent edges, diamond-polished to remove laser frosting",
          "Internal cable channel and interchangeable backlit header",
          "Assembled packing in wooden crates with foam blocking",
        ],
      },
      {
        heading: "Tolerance and inspection",
        paragraphs: [
          "Shelf slots are held to ±1 mm so a shelf from one unit drops into any other in the run — important when a retailer replaces a single damaged shelf rather than the whole stand.",
          "Each batch is checked against the approved sample at three points: incoming acrylic sheet, in-line after bonding, and final inspection before crating. Load and drop checks on the packed unit are filmed and sent with the shipping documents.",
        ],
      },
      {
        heading: "Where it stands now",
        paragraphs: [
          "The programme runs as a repeat order with the header artwork swapped each season, which keeps the acrylic carcass in production and only the print panel in revision. The same structure is now quoted in a 1.2 m height for convenience-store formats.",
        ],
      },
    ],
  },
  {
    slug: "germany-drugstore-pvc-shelf-unit",
    country: "Germany",
    company: "European drugstore chain",
    title: "PVC Foam Board Shelf Unit for Year-Round Aisle Use",
    description:
      "A printed PVC foam board unit replacing a previous supplier's short-life stand in a drugstore aisle, specified to stay rigid through a full year of weekly restocking.",
    industry: "Personal Care",
    year: "2025",
    volume: "3,500 sets",
    quote:
      "The chain had been replacing its previous printed units every quarter because they softened at the base. The fix was material and structure together: 10 mm foam board for the shelves, a folded double-wall base, and a knock-down joint that still assembles in under three minutes.",
    quoteBy: engineeringNote,
    image: images.caseRetailGermany,
    alt: "Printed PVC foam board shelf display unit standing in a retail aisle",
    featured: true,
    results: [
      { label: "Sets produced", value: "3,500" },
      // [VERIFY] HP-10 +28% sell-through — client-reported figure; replace with a signed result
      { label: "Sell-through", value: "+28%" },
      { label: "Container load rate", value: "90%+" },
      { label: "Bulk lead time", value: "15 days" },
    ],
    body: [
      {
        heading: "The brief",
        paragraphs: [
          "A drugstore chain with stores across Germany and Austria was running printed floor units from another supplier for a personal-care range. Units were being written off after roughly a quarter: the base crushed under restocking, shelf fronts delaminated in damp cleaning, and print scuffed at the hand-carry points.",
          "They wanted the same footprint and the same print quality, but a unit that would last a year — and still flat-pack, because container space was the biggest cost line in the programme.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "We moved the unit to 10 mm PVC foam board on the shelves and 15 mm on the base, with a folded double-wall base section that carries the load down the sides rather than through the shelf faces. Shelves locate on vibration-knife cut slots, so the knock-down joint is self-aligning.",
          "Printing is UV flatbed direct to board in six colours, with a matte laminate on the header and shelf fronts to take cleaning without scuffing. Everything ships flat in cartons with paper corner protection.",
        ],
        bullets: [
          "10 mm shelves, 15 mm folded base, slot-and-tab assembly",
          "Direct UV print plus matte laminate on high-touch faces",
          "Flat-packed cartons with paper corner protection, pallet optional",
          "Under three minutes to assemble, no tools",
        ],
      },
      {
        heading: "Freight and packing",
        paragraphs: [
          "Flat-packing is where the saving came from. By nesting shelves inside the base and stacking ten units per carton, the programme reached a container load rate above 90% — the practical ceiling once corner protection is in place.",
          "Cartons are palletised or floor-loaded according to the destination warehouse, and we quote FOB, CIF or DDP depending on whether the chain's own forwarder takes over at the port.",
        ],
      },
      {
        heading: "Where it stands now",
        paragraphs: [
          "The structure has since been adapted for two further categories in the same chain, with the shelf count changed and the print panel re-issued. Because the tooling lives with the cut file, a new version can sample in 48 hours rather than weeks.",
        ],
      },
    ],
  },
  {
    slug: "australia-liquor-lockable-acrylic-case",
    country: "Australia",
    company: "Australian liquor retail group",
    title: "Lockable Acrylic Cabinet for High-Value Spirits",
    description:
      "A lockable acrylic cabinet with black side panels and a clear front door, built to keep premium spirits visible but secured behind the counter.",
    industry: "Liquor & Tobacco",
    year: "2024",
    volume: "800 sets",
    quote:
      "Security and visibility pull against each other — a heavier lock usually means a heavier frame. Black acrylic side panels let us hide the lock body and hinges so the front stays fully clear, while four adjustable shelves keep the range flexible.",
    quoteBy: engineeringNote,
    image: images.caseLiquorAustralia,
    alt: "Lockable acrylic display cabinet with black side panels and a clear front door",
    featured: true,
    results: [
      { label: "Sets produced", value: "800" },
      // [VERIFY] HP-11 +45% impulse sales — client-reported figure; replace with a signed result
      { label: "Impulse sales", value: "+45%" },
      { label: "Shelves per unit", value: "4 adjustable" },
      { label: "Bulk lead time", value: "14 days" },
    ],
    body: [
      {
        heading: "The brief",
        paragraphs: [
          "The group needed a counter-adjacent case for premium spirits in stores where high-value bottles cannot sit on open shelving. Anything with a visible metal frame read as security furniture rather than retail display, and staff wanted to restock without a key ceremony.",
          "The case also had to survive being moved between stores during refits, which ruled out thin acrylic bonded with a light solvent joint.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "The cabinet is built from 8 mm black acrylic for the carcass and 5 mm high-clarity acrylic for the door, with the lock body and hinge hardware cut into the black side panels so nothing metal shows through the front. Door edges are diamond-polished rather than flame-polished to keep the geometry crisp.",
          "Four shelves adjust on laser-cut ladder slots, and the base carries a recessed plinth so the unit can be lifted without stressing the bonded corners.",
        ],
        bullets: [
          "8 mm black acrylic carcass, 5 mm clear door",
          "Concealed lock and hinge pockets cut into the side panels",
          "Four adjustable shelves on laser-cut ladder slots",
          "Recessed plinth for lifting and refit handling",
        ],
      },
      {
        heading: "Assembly and checks",
        paragraphs: [
          "Bonding is solvent-based with a hidden fixing at each corner, then left to cure before the door is hung — corners are the first thing to fail on a case that gets moved, so they get an individual pull check.",
          "Each unit is inspected against the sample for door alignment, lock engagement and shelf fit at ±1 mm, then wrapped and crated in groups for the refit schedule.",
        ],
      },
      {
        heading: "Where it stands now",
        paragraphs: [
          "The group has since ordered the same cabinet in a two-door width for a second banner, and asked for a version with an LED strip under each shelf for a flagship store.",
        ],
      },
    ],
  },
  {
    slug: "us-cosmetics-countertop-testers",
    country: "United States",
    company: "US skincare brand",
    title: "Countertop Tester Units with Colour-Matched Acrylic",
    description:
      "Counter units for a skincare launch, with clear tester trays, a colour-matched acrylic back panel and a print insert that can be swapped per SKU.",
    industry: "Cosmetics & Skincare",
    year: "2025",
    volume: "2,400 sets",
    quote:
      "Cosmetics launches move fast and change late, so we designed the unit around a swappable print insert instead of printing the acrylic itself. The brand can change campaign artwork without re-cutting the structure.",
    quoteBy: engineeringNote,
    image: images.caseCosmeticsUs,
    alt: "Countertop acrylic tester display with clear trays and a printed back panel",
    featured: false,
    results: [
      { label: "Sets produced", value: "2,400" },
      { label: "Sample revisions", value: "3 rounds" },
      { label: "Bulk lead time", value: "12 days" },
    ],
    body: [
      {
        heading: "The brief",
        paragraphs: [
          "The brand was launching a skincare line into pharmacy counters and needed a unit small enough for a 400 mm counter depth, with room for three tester bottles, a stack of samples and a price card.",
          "Their previous unit used printed board behind clear acrylic, which yellowed under store lighting within a season and could not be updated when the campaign artwork changed.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "The unit is a clear acrylic tray on a colour-matched back panel, with a printed PET insert that slides behind a clear front panel. Changing campaign artwork means reprinting the insert, not re-cutting acrylic.",
          "Tester bottles sit in machined recesses sized to the brand's bottle diameter, and the sample compartment is a separate lift-out tray so staff can refill it without dismantling the display.",
        ],
        bullets: [
          "Machined tester recesses sized to the bottle diameter",
          "Colour-matched back panel in the brand's launch colour",
          "Swappable printed PET insert behind clear acrylic",
          "Lift-out sample tray for counter refills",
        ],
      },
      {
        heading: "Sampling and print control",
        paragraphs: [
          "Colour matching is the risk on a launch like this. We printed the back panel and the insert on the same UV flatbed, checked both against the brand's Pantone reference under a colour-calibrated light, and sent physical proofs rather than screen renders.",
          "Three revision rounds followed before sign-off — the recess positions moved twice as the bottle range changed — and the final sample became the reference for every unit in the run.",
        ],
      },
      {
        heading: "Where it stands now",
        paragraphs: [
          "The brand has re-ordered the insert twice for new campaigns while keeping the acrylic structure, and added a floor-standing version of the same design for department-store counters.",
        ],
      },
    ],
  },
  {
    slug: "middle-east-supermarket-end-cap",
    country: "United Arab Emirates",
    company: "Gulf supermarket group",
    title: "PVC End Cap Built for a Chilled, High-Humidity Aisle",
    description:
      "A printed PVC foam board end cap for a chilled convenience range, specified against humidity and daily wipe-down in a Gulf supermarket.",
    industry: "Food & Beverage",
    year: "2024",
    volume: "600 sets",
    quote:
      "Chilled aisles are the hardest environment for a printed stand. PVC foam board was the obvious material — the work was in the base, which had to carry a full shelf of bottles without the board bowing under humidity.",
    quoteBy: engineeringNote,
    image: images.caseSupermarketMiddleEast,
    alt: "Printed PVC foam board end cap display in a supermarket aisle",
    featured: false,
    results: [
      { label: "Sets produced", value: "600" },
      { label: "Base load tested", value: "Adult weight" },
      { label: "Bulk lead time", value: "13 days" },
    ],
    body: [
      {
        heading: "The brief",
        paragraphs: [
          "A Gulf supermarket group wanted a branded end cap for a chilled drinks and snacks range, sitting at the head of an aisle that is cleaned down daily and runs at high humidity year-round.",
          "The units supplied before ours had failed there within weeks. The group needed the same graphic impact in a material that would not soften, and a base that would hold a full shelf of bottles without bowing.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "The unit is 15 mm PVC foam board throughout, with a double-wall folded base and a centre spine carrying the shelf loads to the floor rather than into the side panels. Shelves sit on through-cut slots so the load transfers directly into the spine.",
          "Printing is UV flatbed direct to board with a UV top coat, and all edges are trimmed and sealed — exposed foam core is where moisture gets in first.",
        ],
        bullets: [
          "15 mm foam board with UV top coat and sealed edges",
          "Double-wall base and centre spine for shelf loads",
          "Through-cut shelf slots, no adhesive under load",
          "Wipe-clean surface suitable for daily cleaning",
        ],
      },
      {
        heading: "Load and transport checks",
        paragraphs: [
          "The stated load target was deliberately over-specified: a mainstream floor-standing unit of this structure is built to carry an adult's weight, so a shelf of bottles is well inside the margin. We test by loading the base and shelves and photographing deflection, then repeat after a flat-packed unit has been dropped.",
          "Flat-packed units ship in cartons with corner protection, and the first delivery was split into three drops to match the group's regional warehouse schedule.",
        ],
      },
      {
        heading: "Where it stands now",
        paragraphs: [
          "The end cap has been re-ordered for two further seasonal ranges with new artwork, and a smaller counter version is in sampling for the group's convenience format.",
        ],
      },
    ],
  },
  {
    slug: "europe-collectibles-display-case",
    country: "France",
    company: "European collectibles distributor",
    title: "Dust-Free Acrylic Case for Blind Box and Trading Card Retail",
    description:
      "A closed acrylic case with tiered acrylic trays for a collectibles distributor, designed so staff can restock without opening the case to customers.",
    industry: "Toys & Collectibles",
    year: "2025",
    volume: "1,000 sets",
    quote:
      "Collectibles retail is visual: the case is the product presentation. The design work was in the tray geometry — every blind box size in the range had to sit at a consistent angle without a visible support.",
    quoteBy: engineeringNote,
    image: images.caseCollectiblesEurope,
    alt: "Closed acrylic display case holding boxed collectibles on tiered trays",
    featured: false,
    results: [
      { label: "Sets produced", value: "1,000" },
      { label: "Tray configurations", value: "3 sizes" },
      { label: "Bulk lead time", value: "15 days" },
    ],
    body: [
      {
        heading: "The brief",
        paragraphs: [
          "The distributor supplies independent hobby shops across France and Belgium, and needed a unit that would show sealed blind boxes and graded cards without customers handling them.",
          "Shops also wanted to restock from the back, because a case that opens to the sales floor turns into a handling problem on a Saturday.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "The case is a clear acrylic box with a hinged front panel that locks, and tiered trays that load from a rear access door. Trays are heat-bent rather than bonded so the front lip is one continuous piece — no joint line across the sightline.",
          "Three tray sizes cover the range: blind boxes, single graded cards and small figure boxes. Trays lift out individually, so a shop can change the mix without replacing the case.",
        ],
        bullets: [
          "Heat-bent tray lips, no visible bond line",
          "Rear-loading trays with a lockable front panel",
          "Three tray sizes across one case body",
          "Polished edges throughout, safe for counter handling",
        ],
      },
      {
        heading: "Production and packing",
        paragraphs: [
          "Bonding and polishing are the slow steps on a case like this, so trays are produced in parallel with the case bodies and matched at final assembly. Every case is checked for door swing, lock alignment and tray fit before packing.",
          "Units ship assembled in wooden crates, six per crate with dividers, because the trade-off between flat-packing and damage risk does not favour flat-packing for a bonded box.",
        ],
      },
      {
        heading: "Where it stands now",
        paragraphs: [
          "The distributor has since added an LED-lit version for flagship hobby shops, with a strip under each tray — the same body, so the tooling carried over directly.",
        ],
      },
    ],
  },
];

/** Programmes shown in the home page grid */
export const featuredCases: CaseStudy[] = caseStudies.filter(
  (item) => item.featured,
);

/** Programmes listed per page on /case-studies: two rows of three cards */
export const CASE_PAGE_SIZE = 6;

export const caseBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((item) => item.slug === slug);

/** Other programmes for the "More case studies" block on a detail page */
export const relatedCases = (slug: string, limit = 3): CaseStudy[] =>
  caseStudies.filter((item) => item.slug !== slug).slice(0, limit);

/** Closing call to action on the case study index */
export const casesIndexCta = {
  title: "Need Jack's Team to Review Your Rollout Plan?",
  description:
    "Share your market, target volume, artwork status and rollout timeline. Jack's team plans the structure, renders it free, samples it and runs factory-direct production from 100 sets.",
};

/** Closing call to action on a single case study */
export const caseDetailCta = {
  title: "Need Jack's Team to Review Your Next Program?",
  description:
    "Share your product size, estimated quantity, retail channel and timeline. Jack's team maps the structure, renders it free, samples it and produces factory-direct from 100 sets.",
};
