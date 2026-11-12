import type { Product } from "../types";
import { images } from "./images";

/**
 * The catalogue. One object per product, and one object is all a product page
 * needs: photos, title, paragraph under the title, the Overview paragraph and
 * the specification lines. Adding a product means adding one entry here.
 *
 * Two fields are not written by hand:
 * - `slug` is derived from the title (`defineProduct`), so the URL always
 *   matches the title and the card, menu, sitemap and canonical tag follow it.
 * - `faqs` is optional; without it the page uses the three default questions
 *   in `productPage.ts`.
 *
 * Specifications are one line each, written as "Label: Value". No markup, no
 * nested objects — the page splits on the first colon and renders a two-column
 * table. Keep additional colons out of the value, e.g.
 * "Trade terms: FOB / CIF / DDP", not "FOB: CIF / DDP".
 *
 * No price is listed: stands are quoted against structure, material, quantity
 * and packing, so a single range would be misleading. Quote validity is 7 days.
 */

/** Title to URL segment: lowercase, runs of anything else collapse to "-" */
const slugify = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Adds the derived slug and refuses an entry without a photo to show */
const defineProduct = (input: Omit<Product, "slug">): Product => {
  if (input.images.length === 0) {
    throw new Error(`Product "${input.name}" needs at least one image`);
  }
  return { ...input, slug: slugify(input.name) };
};

export const products: Product[] = [
  defineProduct({
    name: "Wholesale Lockable Acrylic Lighter Display Case - Custom Black & Clear Commercial Cabinet",
    categorySlug: "custom-acrylic-displays",
    categoryName: "Custom Acrylic Displays",
    industrySlugs: ["e-cigarette-displays", "household-goods-displays"],
    description:
      "Lockable acrylic cabinet with black side panels and a clear front door, built to merchandise lighter ranges and other small high-value impulse lines at the counter — four adjustable shelves, cam lock, polished edges.",
    overview:
      "A lockable counter cabinet for lighter ranges and other small, high-value impulse lines: black side panels, a clear front door on a piano hinge and four adjustable shelves on a 50 mm pitch. Lighters sell where the queue forms, but they are easy to lose, so the range has to stay readable from the aisle and locked when nobody is watching. Sides and back are 5 mm black cast acrylic, the door and shelves 4 mm clear, with diamond-polished edges and non-marking feet. Specified for tobacco and convenience counters, kiosks, gift shops and hobby stores; height, shelf count, lock type and print follow your pack dimensions and the counter space you have.",
    specs: [
      "Size: Custom — sample shown 380 W × 300 D × 620 H mm",
      "Design: Free 3D render, revised until the drawing is signed",
      "Material: 5 mm black cast acrylic body, 4 mm clear acrylic door and shelves",
      "Print & finishing: UV or screen print on the door and base panel; diamond-polished edges, tinted or clear door",
      "Build detail: Cam lock with two keys, piano hinge, four shelves on a 50 mm pitch, silicone door seals",
      "Options: LED strip lighting, printed header plate, tinted door, barrel lock, custom feet",
      // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
      "Load per shelf: 20–55 kg, set by shelf span and material",
      "MOQ: 100 sets per design",
      "Sample build: 48 hours, bulk production 12–15 days after approval",
      "Packaging & shipping: Carton with paper corner protection, flat-pack option, pallet optional; quoted FOB, CIF or DDP",
    ],
    images: [
      {
        src: images.productLighterCase1,
        alt: "Lockable acrylic lighter display cabinet, front view",
      },
      {
        src: images.productLighterCase2,
        alt: "Lighter display cabinet with the clear acrylic door open",
      },
      {
        src: images.productLighterCase3,
        alt: "Three-quarter view of the black acrylic side panels and clear door",
      },
      {
        src: images.productLighterCase4,
        alt: "Lighter display cabinet standing on a retail counter",
      },
    ],
    featured: true,
  }),
  defineProduct({
    name: "Wholesale 4-Tier Acrylic Floor Display Stand with Backlit Header - Custom Retail Merchandiser",
    categorySlug: "floor-standing-displays",
    categoryName: "Floor-Standing Displays",
    industrySlugs: [
      "electronics-displays",
      "cosmetics-displays",
      "skincare-displays",
    ],
    description:
      "A 1.8 m freestanding acrylic floor display with four adjustable shelves, black side panels and a backlit header, built to present a mixed retail range in the aisle — concealed cable routing, ±1 mm shelf fit and knock-down export packing.",
    overview:
      "A four-tier acrylic floor stand for retail aisles: clear shelves, black side panels and a backlit header that carries the brand from several meters away. Mixed ranges need one stand that holds boxed, bottle and accessory formats without looking improvised, so shelf pitch, header height and base footprint are set from your planogram rather than from a catalogue size. The carcass is 8 mm high-clarity cast acrylic, shelves are 5 mm clear on laser-cut brackets, and power for the header runs through a rear channel into the base, out of the product sightline. Specified for electronics, cosmetics and personal-care ranges in big-box, pharmacy and department-store formats.",
    specs: [
      "Size: Custom — sample shown 1,800 H × 600 W × 400 D mm",
      "Design: Free 3D render built from your planogram, revised until signed",
      "Material: 8 mm clear cast acrylic carcass with black side panels",
      "Print & finishing: UV print or applied graphics on the header and side panels; polished edges",
      "Build detail: Four shelves on laser-cut brackets at a 50 mm pitch, rear cable channel, knock-down fittings",
      "Options: Printed side panels, castors, locking castors, header toggles, spare print panels",
      // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
      "Load per shelf: 20–55 kg, set by shelf span and material",
      "MOQ: 100 sets per design",
      "Sample build: 48 hours, bulk production 12–15 days after approval",
      "Packaging & shipping: Knock-down carton with corner protection, assembles in under 3 minutes without tools; pallet optional, FOB / CIF / DDP",
    ],
    images: [
      {
        src: images.styleFloorStanding,
        alt: "Four-tier acrylic floor display stand with a backlit header, front view",
      },
      {
        src: images.styleLedLighted,
        alt: "Backlit header detail on an acrylic floor display",
      },
      {
        src: images.stylePegboardHook,
        alt: "Shelf and accessory arrangement on a retail floor stand",
      },
      {
        src: images.heroMediaAcrylic,
        alt: "Clear acrylic shelves and polished edges",
      },
    ],
    featured: true,
  }),
  defineProduct({
    name: "Wholesale Printed PVC Foam Board Floor Display - Custom Seasonal Promotion Stand",
    categorySlug: "pvc-foam-board-displays",
    categoryName: "PVC Foam Board Displays",
    industrySlugs: [
      "food-beverage-displays",
      "household-goods-displays",
      "cosmetics-displays",
    ],
    description:
      "A printed PVC foam board floor display for seasonal promotions and retail rollouts — full-color UV print, a double-wall reinforced base, through-cut shelf slots and flat-packed cartons that cut freight cost.",
    overview:
      "A printed PVC foam board floor display for seasonal promotions, launches and retail rollouts where the graphic changes with the campaign. The structure is built around a folded double-wall base and slot-and-tab joints: it assembles without tools, stays rigid through weekly restocking, and nests flat so freight does not eat the promotion budget. Body and shelves are 15 mm PVC foam board with a UV top coat and sealed edges, printed direct to board with a matte laminate where hands and cleaning cloths land. Specified for food and beverage, household and beauty promotions in supermarkets, drugstores and club formats.",
    specs: [
      "Size: Custom — sample shown 1,200 H × 600 W × 350 D mm",
      "Design: Free 3D render and print layout, revised until signed",
      "Material: 15 mm PVC foam board with UV top coat and sealed edges",
      "Print & finishing: Full-color UV flatbed direct to board, matte laminate on shelf fronts and header",
      "Build detail: Folded double-wall base, slot-and-tab joints, three shelves on through-cut slots",
      "Options: Castors, printed header, shelf dividers, pallet display kit, spare print panels",
      // [VERIFY] HP-16 20–55 kg per shelf — competitor comparison figure, needs the QC load test
      "Load per shelf: 20–55 kg, set by shelf span and material",
      "MOQ: 100 sets per design",
      "Sample build: 48 hours, bulk production 12–15 days after approval",
      "Packaging & shipping: Flat-packed carton, 10 units per carton with shelves nested in the base; pallet optional, FOB / CIF / DDP",
    ],
    images: [
      {
        src: images.stylePvcFoamBoard,
        alt: "Printed PVC foam board floor display, front view",
      },
      {
        src: images.heroMediaPvc,
        alt: "Full-color UV print on PVC foam board",
      },
      {
        src: images.caseRetailGermany,
        alt: "Printed shelf unit installed in a retail aisle",
      },
      {
        src: images.styleCountertop,
        alt: "Shelf and header detail on a printed display",
      },
    ],
    featured: true,
  }),
];

/* Two identical titles would silently share one URL and one page. Fail the
   build instead, so a copy-paste mistake during upload is caught immediately. */
const duplicateSlugs = products.filter(
  (product, index) =>
    products.findIndex((other) => other.slug === product.slug) !== index,
);

if (duplicateSlugs.length > 0) {
  throw new Error(
    `Two products resolve to the same URL: ${duplicateSlugs
      .map((product) => `${product.slug} (${product.name})`)
      .join(", ")}`,
  );
}

export const featuredProducts = products.filter((product) => product.featured);

/** Cards per page on the /pop-retail-displays catalogue listing */
export const CATALOGUE_PAGE_SIZE = 12;

/**
 * Lead line shared by the catalogue listing and its pages. Deliberately free
 * of counts and of shop language: styles and industries are added to
 * `categories.ts` as products are published, and every build is re-drawn for
 * the buyer, so the page is a reference library rather than stock.
 */
export const catalogueSubtitle =
  "These are reference builds, not stock items. Every one is re-drawn to your product, shelf and brand — start from the closest and tell us what to change.";

export const productsByCategory = (slug: string): Product[] =>
  products.filter((product) => product.categorySlug === slug);

export const productsByIndustry = (slug: string): Product[] =>
  products.filter((product) => product.industrySlugs.includes(slug));

export const productBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

/** Models shown as "Related models": same style first, then the rest of the catalogue */
export const relatedProducts = (slug: string, limit = 3): Product[] => {
  const current = productBySlug(slug);
  const others = products.filter((product) => product.slug !== slug);
  if (!current) return others.slice(0, limit);

  return [
    ...others.filter((product) => product.categorySlug === current.categorySlug),
    ...others.filter((product) => product.categorySlug !== current.categorySlug),
  ].slice(0, limit);
};
