/**
 * Single source of truth for image paths.
 * All files live in `public/images/` and are served from the site root.
 * Swap a file there (or change a path here) to update every usage at once.
 *
 * Every path below points at real One Plus Display photography: the acrylic
 * lighter cabinet shots, the in-house factory floor, and the display style
 * renders. No stock or unrelated product photography is used.
 *
 * The only exception is the `placeholders/` group at the end of the map:
 * flat brand-tint blocks standing in for photography that is not shot yet.
 * They are replaced by overwriting the file, never by editing this map.
 */
export const images = {
  // Brand
  logo: "/images/logo.svg",

  /* Hero — one full-bleed background per slide (1500×733, each with the brand
     navy gradient baked into the lower edge). */
  heroBg01: "/images/hero/hero-bg-01.webp",
  heroBg02: "/images/hero/hero-bg-02.webp",
  heroBg03: "/images/hero/hero-bg-03.webp",
  /* Poster of the factory video slide — kept while that slide is out of the
     rotation, so it can be switched back on by re-adding the slide. */
  heroBg04: "/images/hero/hero-bg-04.webp",

  // Hero — photo inside the media window beside the copy. Only the two
  // material slides carry one (square, 800×800); the factory slide runs as
  // full-width copy with no media window.
  heroMediaAcrylic: "/images/Custom Acrylic Displays.webp",
  heroMediaPvc: "/images/PVC Foam Board Displays.webp",

  // Factory floor video — the matching hero slide is currently not in the
  // rotation; re-add it to `site.hero.slides` to bring the video back.
  heroFactoryVideo: "/videos/hero-factory.mp4",

  // Display style photography — one per style category, used as a square tile
  // in `ProductCategories` (home) and in the header mega menu
  styleFloorStanding: "/images/Floor-Standing Displays.webp",
  styleCountertop: "/images/Countertop Displays.webp",
  stylePegboardHook: "/images/Pegboard & Hook Displays.webp",
  styleCollectibleToy: "/images/Collectible & Toy Display Cases.webp",
  styleLedLighted: "/images/LED & Lighted Displays.webp",
  styleSpinnerRotating: "/images/Spinner & Rotating Displays.webp",
  styleCustomAcrylic: "/images/Custom Acrylic Displays.webp",
  stylePvcFoamBoard: "/images/PVC Foam Board Displays.webp",

  // Industry category tiles — flat brand-tint placeholders, one per sector.
  // Replace by overwriting the file in `public/images/placeholders/`
  // (same name, 800×800), never by editing this map.
  industryCosmetics: "/images/placeholders/industry-cosmetics.webp",
  industrySkincare: "/images/placeholders/industry-skincare.webp",
  industryFoodBeverage: "/images/placeholders/industry-food-beverage.webp",
  industryElectronics: "/images/placeholders/industry-electronics.webp",
  industryHouseholdGoods:
    "/images/placeholders/industry-household-goods.webp",
  industryPharmacy: "/images/placeholders/industry-pharmacy.webp",
  industryPetSupplies: "/images/placeholders/industry-pet-supplies.webp",
  industryECigarette: "/images/placeholders/industry-e-cigarette.webp",

  // Lockable acrylic lighter cabinet, 4 real product shots (4:3)
  productLighterCase1:
    "/images/Wholesale Lockable Acrylic Lighter Display Case - Custom Black & Clear Commercial Cabinet 1.webp",
  productLighterCase2:
    "/images/Wholesale Lockable Acrylic Lighter Display Case - Custom Black & Clear Commercial Cabinet 2.webp",
  productLighterCase3:
    "/images/Wholesale Lockable Acrylic Lighter Display Case - Custom Black & Clear Commercial Cabinet 3.webp",
  productLighterCase4:
    "/images/Wholesale Lockable Acrylic Lighter Display Case - Custom Black & Clear Commercial Cabinet 4.webp",

  // Factory / manufacturing gallery (square)
  factory: "/images/about/factory-equipment-craft.webp",

  // About page — workshop (4:3)
  aboutUvPrinter: "/images/about/factory-equipment-craft.webp",
  aboutAcrylicLine: "/images/about/factory-printing-workshop.webp",
  aboutLaminating: "/images/about/factory-sample-room.webp",

  // Contact page — banner background (office, factory-direct team at work)
  contactBanner: "/images/about/contact-office-banner.jpg",

  // About page — team portraits (1:1)
  aboutTeamBarry: "/images/about/team-barry.png",
  aboutTeamJane: "/images/about/team-jane.png",
  aboutTeamLucky: "/images/about/team-lucky.jpg",
  aboutTeamDiana: "/images/about/team-diana.jpg",
  aboutTeamCoco: "/images/about/team-coco.webp",
  aboutTeamJack: "/images/about/team-jack.webp",
  aboutTeamChen: "/images/about/team-chen.webp",
  aboutTeamTony: "/images/about/team-tony.webp",
  aboutTeamEric: "/images/about/team-eric.webp",
  aboutTeamRichard: "/images/about/team-richard.webp",

  // Certification marks — shown by the home and about-us certification band.
  // All six are 400×400 with an opaque white background, so they sit on white
  // and are never cropped or tinted.
  certBsci: "/images/FSC/BSCI.webp",
  certCe: "/images/FSC/CE.webp",
  certFsc: "/images/FSC/FSC.webp",
  certRohs: "/images/FSC/RoHS.webp",
  certSedex: "/images/FSC/Sedex.webp",
  certUl: "/images/FSC/ul.webp",

  // Case studies (16:10 on the grid, 4:3 on the list)
  // Programmes reuse the closest available display photography until each
  // project has its own shoot.
  caseElectronicsUs: "/images/LED & Lighted Displays.webp",
  caseRetailGermany: "/images/Floor-Standing Displays.webp",
  caseLiquorAustralia: "/images/Wholesale Lockable Acrylic Lighter Display Case - Custom Black & Clear Commercial Cabinet 1.webp",
  caseCosmeticsUs: "/images/Countertop Displays.webp",
  caseSupermarketMiddleEast: "/images/PVC Foam Board Displays.webp",
  caseCollectiblesEurope: "/images/Collectible & Toy Display Cases.webp",

  // News (16:9)
  newsMaterial: "/images/about/factory-equipment-craft.webp",
  newsSampling: "/images/Wholesale Lockable Acrylic Lighter Display Case - Custom Black & Clear Commercial Cabinet 2.webp",
  newsPacking: "/images/about/factory-sample-room.webp",

  /* Factory photography (1200×900, 4:3) — one showroom shot beside the
     factory section; the gallery itself runs off `factoryGallery`.
     `process-01…06.webp` (800×600) are still flat #dbe8f7 placeholders:
     overwrite the file in `public/images/placeholders/` (same name) to drop
     in real photography. */
  placeholderFactoryStrength:
    "/images/placeholders/factory-strength.webp",
  placeholderProcess01: "/images/placeholders/process-01.webp",
  placeholderProcess02: "/images/placeholders/process-02.webp",
  placeholderProcess03: "/images/placeholders/process-03.webp",
  placeholderProcess04: "/images/placeholders/process-04.webp",
  placeholderProcess05: "/images/placeholders/process-05.webp",
  placeholderProcess06: "/images/placeholders/process-06.webp",

  // Brand footprint logos — downloaded from the group's Chinese-language site
  // (popzhihuojia.com, same company). International brands first, domestic
  // brands last. Replace by overwriting the file, never by editing this map.
  brandLays: "/images/brands/brand-01.webp",
  brandSamsClub: "/images/brands/brand-02.webp",
  brandMnMs: "/images/brands/brand-03.webp",
  brandColgate: "/images/brands/brand-04.webp",
  brandCocaCola: "/images/brands/brand-05.webp",
  brandPopMart: "/images/brands/brand-07.webp",
  brandRelx: "/images/brands/brand-08.webp",
  brandWalmart: "/images/brands/brand-09.webp",
  brandNivea: "/images/brands/brand-10.webp",
  brandCostco: "/images/brands/brand-11.webp",
  brandChampion: "/images/brands/brand-12.webp",
  brandDisney: "/images/brands/brand-13.webp",
  brandFanta: "/images/brands/brand-14.webp",
  brandOreo: "/images/brands/brand-15.webp",
  brandPokemon: "/images/brands/brand-16.webp",
  brandCaterpillar: "/images/brands/brand-17.webp",
  brandKinder: "/images/brands/brand-18.webp",
  brandLOreal: "/images/brands/brand-19.webp",
  brandRedBull: "/images/brands/brand-22.webp",
  brandMonster: "/images/brands/brand-23.webp",
  brandLego: "/images/brands/brand-24.webp",
  brandMalawangzi: "/images/brands/brand-06.webp",
  brandChengdeLulu: "/images/brands/brand-20.webp",
  brandYunnanBaiyao: "/images/brands/brand-21.webp",

  // Capability-strip icons (the home2 preview). The sample-validation icon
  // is the original file from the group's Chinese site; the other three are
  // inline SVG paths stored in `home2.ts`.
  iconSampleValidation: "/images/icons/cardboard-display-stand.svg",

  // Social preview
  ogImage: "/images/about/factory-printing-workshop.webp",
} as const;

export type ImageKey = keyof typeof images;
