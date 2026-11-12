# Image inventory

All images live in `public/images/` and are referenced through a single map:
`src/data/images.ts`. To swap a photo, replace the file (keep the file name) or
update the path in `images.ts` — no component needs to change.

Every path currently referenced is **One Plus Display's own material**: the
eight display-style renders, the AC-720 acrylic cabinet shots, the factory
floor in `about/` and the certification marks in `FSC/`. No stock imagery and
no e-bike photography is used anywhere on the site.

Hero slides (`src/data/site.ts` → `hero.slides`, rendered by `Hero.tsx`):
All four slides fill the first screen (viewport minus the sticky header).
Slides 1 (factory) and 4 (video) carry **copy only**; the two material slides
add a square media window beside it.

- Backgrounds (1500×733, brand navy gradient baked into the lower edge):
  `heroBg01` (factory) → `hero-bg-01.webp`, `heroBg02` (acrylic) →
  `hero-bg-02.webp`, `heroBg03` (retail floor) → `hero-bg-03.webp`,
  `heroBg04` (video poster) → `hero-bg-04.webp`.
- Media window photos (square, `aspect-square`): `heroMediaAcrylic` →
  `Custom Acrylic Displays.webp`, `heroMediaPvc` →
  `PVC Foam Board Displays.webp` — both 800×800 and shared with their style
  category tile; a dedicated hero shoot can replace either key on its own.
- Video: `heroFactoryVideo` → `/videos/hero-factory.mp4` (863 KB, muted loop).
  Lives in `public/videos/`, not `public/images/`.

All eight hero images plus the video were transferred from the group's own
Chinese-language site (popzhihuojia.com) — same company, same factory.

`hero-bg.webp` is **not** usable here: it is an e-bike assembly line from the
original template.

| File | Used by | Displayed ratio | Notes |
| --- | --- | --- | --- |
| `logo.svg` | `Header`, `Footer` | 4.8:1 wordmark, `h-9` / `h-10` | Brand wordmark, single fill `#245dab`; the footer inverts it to white with `brightness-0 invert` |
| `hero/hero-bg-01.webp` | `heroBg01` (hero slide 1 background) | 1500×733 full-bleed | Worker at the printing line, navy gradient baked into the lower edge |
| `hero/hero-bg-02.webp` | `heroBg02` (hero slide 2 background) | 1500×733 full-bleed | Acrylic bonding and assembly area |
| `hero/hero-bg-03.webp` | `heroBg03` (hero slide 3 background) | 1500×733 full-bleed | Retail floor fitted with printed display stands |
| `hero/hero-bg-04.webp` | `heroBg04` (hero video slide background / poster) | 1500×733 full-bleed | Shows until the video has loaded; also the fallback if the video fails |
| `about/factory-printing-workshop.webp` | `aboutAcrylicLine`, Open Graph image | 4:3 background, `object-cover` | Acrylic bonding and assembly area — no longer used as a hero background |
| `Floor-Standing Displays.webp` | Floor-Standing Displays style tile, `caseRetailGermany`, `galleryMountain` | 1:1 tile + mega menu | Real stand photo, one file per style category; names contain spaces and `&` |
| `Countertop Displays.webp` | Countertop Displays style tile, `caseCosmeticsUs`, `galleryCity`, `caseGermany` | 1:1 tile + mega menu | |
| `Pegboard & Hook Displays.webp` | Pegboard & Hook Displays style tile, `caseNetherlands` | 1:1 tile + mega menu | |
| `Collectible & Toy Display Cases.webp` | Collectible & Toy Display Cases style tile, `caseCollectiblesEurope`, `caseUsa` | 1:1 tile + mega menu | |
| `LED & Lighted Displays.webp` | LED & Lighted Displays style tile, Consumer Electronics tile (`productCity2`), `caseElectronicsUs` | 1:1 tile + mega menu | |
| `Spinner & Rotating Displays.webp` | Spinner & Rotating Displays style tile, `galleryCase` | 1:1 tile + mega menu | |
| `Custom Acrylic Displays.webp` | Custom Acrylic Displays style tile, `heroMediaAcrylic` | 1:1 tile + mega menu + hero media window (800×800) | Shared by the style tile and hero slide 2 |
| `PVC Foam Board Displays.webp` | PVC Foam Board Displays style tile, `caseSupermarketMiddleEast`, `heroMediaPvc` | 1:1 tile + mega menu + hero media window (800×800) | Shared by the style tile and hero slide 3 |
| `Wholesale Lockable Acrylic Lighter Display Case - Custom Black & Clear Commercial Cabinet 1-4.webp` | `AC-720` card + detail gallery, `caseLiquorAustralia`, `newsSampling`, `FactoryShowcase` slide 4 | 1:1 card / 4:3 gallery | Real product shots (front, door open, three-quarter, in-store). File names keep the marketplace title, so they contain spaces and `&` |
| `about/factory-equipment-craft.webp` | `aboutUvPrinter` (About intro figure), `FactoryShowcase` slide 1, `newsMaterial` | 1:1 (`aspect-square`) | UV flatbed printer — first step for both acrylic and PVC panels |
| `about/factory-sample-room.webp` | `aboutLaminating` (PVC material card), `FactoryShowcase` slide 3, `newsPacking` | 4:3 | Automatic laminating machine finishing printed boards. The source file name said "sample room"; the photo shows the laminator |

## About page assets (`public/images/about/`)

| File | Used by | Notes |
| --- | --- | --- |
| `team-barry.png` … `team-richard.webp` (10 files) | `aboutTeam` avatars | Square portraits, 300–640 px |
| `cert-iso9001.webp`, `cert-bsci.webp`, `cert-fsc.webp`, `cert-sgs.webp`, `cert-alibaba-verified.webp`, `cert-business-license.webp` | — | **No longer referenced.** The certification band now uses the marks in `FSC/`; the files are kept as the original scans |

## Certification marks (`public/images/FSC/`)

| File | Used by | Notes |
| --- | --- | --- |
| `BSCI.webp`, `CE.webp`, `FSC.webp`, `RoHS.webp`, `Sedex.webp`, `ul.webp` | `certifications` (→ `Certifications.tsx` on the home page and `/about-us/`) | 400×400 logo marks with an **opaque white background** — always shown `object-contain` on a white card, never cropped or tinted. `ul.webp` is the only lowercase file name |

The eight `industry` tiles use their own flat `#dbe8f7` placeholder files in
`placeholders/` (see the table below) until each sector has its own shoot.

## Placeholder blocks (`public/images/placeholders/`)

The `factory-strength` pair is real photography already. The rest are still
flat `#dbe8f7` (brand `primary-100`) WebP blocks with **no artwork**, generated
with the project's own `sharp`. They hold the layout until real photography is
shot: **overwrite the file with the same name** and the new image appears —
no component or data change.

| File | Key in `images.ts` | Used by | Size / ratio |
| --- | --- | --- | --- |
| `factory-strength.webp` | `placeholderFactoryStrength` | Home — Factory strength, left column photo above the company definition; `/home2/` — section 03, sample-room photo beside the company definition (`home2Definition.image`) | 1200×900 (4:3) |
| `factory-strength-2.webp` | `placeholderFactoryStrength2` | Home — Factory strength, right column photo above the four key figures | 1200×900 (4:3) |
| `factory-manufacturing.webp` | `placeholderFactoryManufacturing` | Home — Factory manufacturing, right card beside the capability chips | 1200×900 (4:3) |
| `process-01.webp` … `process-06.webp` | `placeholderProcess01` … `placeholderProcess06` | Home — Production process cards, image on top of each step (`orderSteps[].image`) | 800×600 (4:3) |
| `industry-cosmetics.webp` … `industry-e-cigarette.webp` (8 files) | `industryCosmetics` … `industryE-cigarette` → `images.ts` | Industry category tiles — home (`ProductCategories`), mega menu, each `/pop-retail-displays/[slug]/` industry listing (OG image) | 800×800 (1:1) |

The eight industry placeholder files, one per sector (`cosmetics`,
`skincare`, `food-beverage`, `electronics`, `household-goods`, `pharmacy`,
`pet-supplies`, `e-cigarette`), follow the same rule as above: **overwrite the
file with the same name** to drop in real photography — same size as the
display-style tiles, so no component or data change is needed.

The remaining empty blocks are 2 KB (large) / under 1 KB (step), so they cost
almost nothing over the wire. `loading="lazy"` plus a fixed `aspect-[4/3]`
frame keeps CLS at zero before and after the swap.

## Brand footprint logos (`public/images/brands/`) — /home2/ preview only

24 customer-brand logos (320×96 WebP) downloaded from the group's own
Chinese-language site (popzhihuojia.com — same company). Referenced by
`home2Brands` in `src/data/home2.ts`; paths registered in `images.ts`
(`brandLays` … `brandYunnanBaiyao`). International brands are ordered first,
domestic brands last in the map. **Shown on an English page, these logos are a
public claim of client relationships — the list must match the Chinese site's
customer roster.**

| File | Key in `images.ts` | Brand |
| --- | --- | --- |
| `brand-01.webp` | `brandLays` | Lay's |
| `brand-02.webp` | `brandSamsClub` | Sam's Club |
| `brand-03.webp` | `brandMnMs` | M&M's |
| `brand-04.webp` | `brandColgate` | Colgate |
| `brand-05.webp` | `brandCocaCola` | Coca-Cola |
| `brand-06.webp` | `brandMalawangzi` | Malawangzi |
| `brand-07.webp` | `brandPopMart` | POP MART |
| `brand-08.webp` | `brandRelx` | RELX |
| `brand-09.webp` | `brandWalmart` | Walmart |
| `brand-10.webp` | `brandNivea` | NIVEA |
| `brand-11.webp` | `brandCostco` | Costco |
| `brand-12.webp` | `brandChampion` | Champion |
| `brand-13.webp` | `brandDisney` | Disney |
| `brand-14.webp` | `brandFanta` | Fanta |
| `brand-15.webp` | `brandOreo` | Oreo |
| `brand-16.webp` | `brandPokemon` | Pokémon |
| `brand-17.webp` | `brandCaterpillar` | Caterpillar |
| `brand-18.webp` | `brandKinder` | Kinder |
| `brand-19.webp` | `brandLOreal` | L'Oréal |
| `brand-20.webp` | `brandChengdeLulu` | Chengde Lulu |
| `brand-21.webp` | `brandYunnanBaiyao` | Yunnan Baiyao |
| `brand-22.webp` | `brandRedBull` | Red Bull |
| `brand-23.webp` | `brandMonster` | Monster Energy |
| `brand-24.webp` | `brandLego` | LEGO |

## Capability-strip icon (`public/images/icons/`)

| File | Key in `images.ts` | Used by |
| --- | --- | --- |
| `cardboard-display-stand.svg` | `iconSampleValidation` | /home2/ capability strip — "Sample Validation" item (34×34, original asset from the group's Chinese site) |

## Not referenced — safe to delete

These are leftovers from the e-bike template and are no longer used by any
component or data file. They are kept only as a paper trail; delete them once
you no longer need them for reference:

`hero-bg.webp`, `about-factory.webp`, `case-usa.jpg`, `case-germany.jpg`,
`case-netherlands.jpg`, `gallery-product-city.webp`,
`gallery-product-mountain.webp`, `gallery-case-germany.webp`,
`product-city-1.jpg`, `product-city-2.jpg`, `product-folding-1.jpg`,
`product-folding-2.jpg`, `product-mountain-1.jpg`, `product-mountain-2.jpg`,
`product-cargo-1.jpg`, `category-city.webp`, `category-mountain.webp`,
`category-folding.webp`, `category-cargo.webp`, `news-tradeshow.jpg`,
`news-certification.jpg`.

## Replacing images

1. Export the new asset at roughly the same ratio (4:3, 16:9, 16:10 or 1:1).
2. Keep the file in `public/images/`, use a lowercase, hyphenated name.
3. Update the path in `src/data/images.ts` if the file name changes.
4. Update this table so the inventory stays accurate.

Because `public/` files are copied as-is, images are **not** optimised by
Astro. For production, export at ~1600px wide and WebP/AVIF where possible.
