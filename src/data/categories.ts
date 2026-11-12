import type { Category } from "../types";
import { images } from "./images";

/**
 * Product categories in two dimensions:
 * `style` — how the stand is built (main category of every product),
 * `industry` — the retail sector it is merchandised for (many-to-many).
 * The `slug` is used by /pop-retail-displays/[slug] for both groups, so it must
 * be unique across the two groups and must not collide with a product slug.
 *
 * Photography: every `style` entry has its own stand photo from
 * `public/images/`. The `industry` entries use flat brand-tint placeholder
 * webp files in `public/images/placeholders/` until real industry photos are
 * shot — replace each file (same name, 800×800), no code change needed.
 */
export const categories: Category[] = [
  /* ------------------------------- Styles ------------------------------- */
  {
    slug: "floor-standing-displays",
    name: "Floor-Standing Displays",
    shortName: "Floor-Standing",
    group: "style",
    description:
      "Freestanding acrylic and PVC floor display stands for in-aisle promotions, product launches and full-range merchandising — built to your shelf load and store spec.",
    image: images.styleFloorStanding,
    alt: "Freestanding floor-standing display in a retail aisle",
  },
  {
    slug: "countertop-displays",
    name: "Countertop Displays",
    shortName: "Countertop",
    group: "style",
    description:
      "Compact acrylic countertop display stands for checkout impulse buys, testers and sample trays — sized to your counter depth and product pack.",
    image: images.styleCountertop,
    alt: "Countertop display on a shop checkout counter",
  },
  {
    slug: "pegboard-hook-displays",
    name: "Pegboard & Hook Displays",
    shortName: "Pegboard & Hook",
    group: "style",
    description:
      "Pegboard and hook display stands for sachets, accessories and blister packs — cut to your hook pitch and product weight.",
    image: images.stylePegboardHook,
    alt: "Pegboard and hook display loaded with hanging products",
  },
  {
    slug: "collectible-toy-display-cases",
    name: "Collectible & Toy Display Cases",
    shortName: "Collectibles",
    group: "style",
    description:
      "Lockable acrylic display cases for figurines, model kits, blind boxes and trading cards — clear fronts, dust-free shelves and rear restocking.",
    image: images.styleCollectibleToy,
    alt: "Collectible and toy display case holding boxed figurines",
  },
  {
    slug: "led-lighted-displays",
    name: "LED & Lighted Displays",
    shortName: "LED & Lighted",
    group: "style",
    description:
      "LED-lit acrylic display stands with edge-lit panels or backlit headers — for premium packaging that has to read from the aisle.",
    image: images.styleLedLighted,
    alt: "LED lighted display with a backlit header",
  },
  {
    slug: "spinner-rotating-displays",
    name: "Spinner & Rotating Displays",
    shortName: "Spinner & Rotating",
    group: "style",
    description:
      "Spinner racks, carousels and motorized turntables that show every side of a product from one spot.",
    image: images.styleSpinnerRotating,
    alt: "Spinner and rotating display turning products on a turntable",
  },
  {
    slug: "custom-acrylic-displays",
    name: "Custom Acrylic Displays",
    shortName: "Custom Acrylic",
    group: "style",
    description:
      "Custom acrylic display stands cut, bent and diamond-polished around your product — clear, frosted, black or color-matched, MOQ 100 sets.",
    image: images.styleCustomAcrylic,
    alt: "Custom clear acrylic display holding products",
  },
  {
    slug: "pvc-foam-board-displays",
    name: "PVC Foam Board Displays",
    shortName: "PVC Foam Board",
    group: "style",
    description:
      "Printed PVC foam board display stands for seasonal promotions and retail rollouts — full-color UV print, flat-packed to cut freight.",
    image: images.stylePvcFoamBoard,
    alt: "Printed PVC foam board display in a promotional end cap",
  },

  /* ----------------------------- Industries ----------------------------- */
  {
    slug: "cosmetics-displays",
    name: "Cosmetics Displays",
    shortName: "Cosmetics",
    group: "industry",
    description:
      "Makeup and color cosmetics display stands: tester units, lipstick and palette racks, and gift-set trays for beauty halls and travel retail.",
    image: images.industryCosmetics,
    alt: "Cosmetics display stand with lipstick and palette testers",
  },
  {
    slug: "skincare-displays",
    name: "Skincare Displays",
    shortName: "Skincare",
    group: "industry",
    description:
      "Serum, cream and mask display stands with tester wells and shelf talkers for beauty retail, pharmacies and dermatology counters.",
    image: images.industrySkincare,
    alt: "Skincare display stand with serum and cream testers",
  },
  {
    slug: "food-beverage-displays",
    name: "Food & Beverage Displays",
    shortName: "Food & Beverage",
    group: "industry",
    description:
      "Shelf-ready display stands for snacks, confectionery and bottled drinks — built for fast restocking and chilled aisles.",
    image: images.industryFoodBeverage,
    alt: "Food and beverage display stand with packaged snacks",
  },
  {
    slug: "electronics-displays",
    name: "Electronics Displays",
    shortName: "Electronics",
    group: "industry",
    description:
      "Secure, powered acrylic displays for accessories, audio and small devices, with cable routing built into the drawing.",
    image: images.industryElectronics,
    alt: "Electronics display stand with accessories",
  },
  {
    slug: "household-goods-displays",
    name: "Household Goods Displays",
    shortName: "Household",
    group: "industry",
    description:
      "Mid-weight display stands for everyday home products that survive weekly restocking and store cleaning.",
    image: images.industryHouseholdGoods,
    alt: "Household goods display stand in a supermarket aisle",
  },
  {
    slug: "pharmacy-displays",
    name: "Pharmacy Displays",
    shortName: "Pharmacy",
    group: "industry",
    description:
      "Lockable OTC and supplement displays with clean information panels for pharmacy and drugstore chains.",
    image: images.industryPharmacy,
    alt: "Pharmacy display stand with boxed medicine",
  },
  {
    slug: "pet-supplies-displays",
    name: "Pet Supplies Displays",
    shortName: "Pet Supplies",
    group: "industry",
    description:
      "Treat, toy and accessory display stands with reinforced hooks for heavier, irregularly shaped packs.",
    image: images.industryPetSupplies,
    alt: "Pet supplies display stand with treats and toys",
  },
  {
    slug: "e-cigarette-displays",
    name: "Vaping & E-cigarette Displays",
    shortName: "Vaping",
    group: "industry",
    description:
      "Lockable e-cigarette and vape display stands with pod and juice racks, built for age-restricted counters and vape shops.",
    image: images.industryECigarette,
    alt: "Lockable e-cigarette display stand with pod racks",
  },
];

export const styleCategories = categories.filter(
  (category) => category.group === "style",
);

export const industryCategories = categories.filter(
  (category) => category.group === "industry",
);

/** Convenience lookup used on category pages */
export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug);
