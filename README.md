# EcoRide — Astro + React + Tailwind e-bike template

A component-driven static site that reproduces the layout of
[ebike-astro.vercel.app](https://ebike-astro.vercel.app/). Every section is an
independent React component, and all copy, products, categories, cases, news
and image paths live in typed data files — so you can re-skin or re-content the
site without touching page code.

> **Before changing anything, read [`AGENTS.md`](./AGENTS.md)** — it holds the
> project's long-term development rules (component reuse, props, Tailwind, data
> separation, scope control, verification). Those rules apply to every change.

## Stack

| Layer | Choice |
| --- | --- |
| Framework / routing / static build | Astro 6 (`output: "static"`) |
| UI components | React 19 via `@astrojs/react` |
| Language | TypeScript 5.9 (strict) |
| Styling | Tailwind CSS 4.3 (PostCSS plugin) + CSS design tokens |
| Dev server / bundler | Vite 7 (pinned with `overrides`) |
| Icons | `lucide-react` |
| SEO | `@astrojs/sitemap` + hand-written `robots.txt` |
| Type checking | `@astrojs/check` (`npm run check`) |
| Forms | Native HTML forms (`<form action="mailto:…">`), no JS framework |

Notes on version choices:

- Astro 7 requires Node `>= 22.23.4`; this machine runs 22.22.2, so Astro 6.4.8
  (Node `>= 22.12`) is used.
- Astro 6 expects **Vite 7**, while a fresh install pulls Vite 8. The
  `"overrides": { "vite": "^7.1.0" }` entry in `package.json` keeps them aligned —
  without it React hydration silently fails in dev.
- Tailwind 4 is wired through **`@tailwindcss/postcss`** instead of
  `@tailwindcss/vite`, because the Vite plugin must match the Vite major version.
  Same CSS output, fewer version traps.
- The Astro dev toolbar is switched off in `astro.config.mjs`
  (`devToolbar: { enabled: false }`). It is Astro's own English-only overlay and
  never ships to production; removing that line brings it back for debugging.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # preview the production build
```

`npm run check` runs the Astro/TypeScript checker.

## Structure

```
AGENTS.md              development rules — read before editing anything
src/
  components/          React components (one responsibility each)
    Header.tsx         top bar, nav, mega menu, mobile drawer  (client:load)
    Hero.tsx           first screen: headline, CTAs, stats
    ProductCategories.tsx  4 category tiles
    ProductCard.tsx    shared product card ("default" | "compact")
    FeaturedProducts.tsx   3-up featured grid
    ManufacturingAdvantages.tsx  advantages column
    FactoryShowcase.tsx     factory image gallery  (client:visible)
    CaseStudies.tsx    3 customer stories
    LatestNews.tsx     3 latest posts (also used by /news)
    FinalCTA.tsx       orange call-to-action band
    Footer.tsx         4-column footer
    SectionHeader.tsx  shared h2 + subtitle + "view all" link
    PageHeader.tsx     inner-page banner with breadcrumbs
    SocialLinks.tsx    social icons / text links
  layouts/
    BaseLayout.astro   <head>, SEO tags, reveal-on-scroll script
  data/
    site.ts            brand, contact, hero copy, CTA copy, SEO defaults
    navigation.ts      header nav, dropdowns, footer columns, legal links
    categories.ts      product categories
    products.ts        product catalog (+ featured filter helpers)
    cases.ts           success stories
    news.ts            news posts + date formatter
    advantages.ts      manufacturing advantages + gallery slides
    images.ts          every image path in one place
  pages/
    index.astro        home page
    electric-bikes.astro    full catalog
    category/[slug].astro   one page per category (getStaticPaths)
    oem-odm.astro, contact.astro, request-quote.astro, news.astro, 404.astro
  styles/
    global.css         design tokens, component classes, reveal animation
  types/
    index.ts           shared content types
public/
  images/              all photos (see docs/image-inventory.md)
  favicon.svg, robots.txt
```

## Where to change things

| I want to change… | Edit |
| --- | --- |
| Company name, logo letter, email, phone, WhatsApp, address, socials | `src/data/site.ts` |
| Hero headline, sub-copy, buttons, stats | `src/data/site.ts` → `site.hero` |
| Orange CTA band text and buttons | `src/data/site.ts` → `site.cta` |
| Navigation items, dropdown links, footer columns | `src/data/navigation.ts` |
| Products (name, price, specs, badges, image) | `src/data/products.ts` |
| Product categories | `src/data/categories.ts` |
| Case studies | `src/data/cases.ts` |
| News posts | `src/data/news.ts` |
| Advantages + factory gallery slides | `src/data/advantages.ts` |
| Brand colour, radii, section spacing, fonts, buttons | `src/styles/global.css` (`@theme` block) |
| Image files | `public/images/` + paths in `src/data/images.ts` |
| Page `<title>` / `<meta description>` | page frontmatter props passed to `BaseLayout` |
| Site URL (canonical, sitemap, OG) | `astro.config.mjs` + `public/robots.txt` |

### Per-component edits

- **Header** — top bar content comes from `site.contact` / `site.social`; nav and
  the mega menu from `mainNav`, `categories` and `products.slice(0,4)`. Layout
  breakpoints: full nav at `lg`, hamburger below.
- **Hero** — all props have defaults from `site.hero`; change the copy in data,
  or pass props in `index.astro` for a one-off variant.
- **ProductCategories** — renders `categories`; each tile links to
  `/category/<slug>`.
- **ProductCard** — `variant="default"` (featured grid) or `"compact"` (mega
  menu). Badge colours are a map at the top of the file.
- **FeaturedProducts** — add `featured: true` to any product to include it.
- **ManufacturingAdvantages / FactoryShowcase** — the two halves of the
  manufacturing section; `index.astro` places them side by side in a `lg:grid-cols-2`.
- **CaseStudies / LatestNews** — driven by `cases.ts` / `news.ts`; both accept
  `title`, `subtitle` and `action` overrides.
- **FinalCTA / Footer** — copy from `site.ts`, links from `navigation.ts`.

## Styling system

`src/styles/global.css` defines the tokens used everywhere:

- Brand scale `--color-primary-50 … 900` (brand orange `#ff6800`).
- `.container-page` — 1280px max width with responsive gutters.
- `.section` — 4rem / 5rem vertical rhythm.
- `.btn-primary`, `.btn-outline`, `.btn-light`, `.btn-ghost-light` (all built on
  the `btn-base` utility), `.card`, `.chip`, `.section-title`, `.eyebrow`,
  `.form-input` and friends.
- `[data-animate]` reveal-on-scroll, disabled automatically with
  `prefers-reduced-motion` and harmless when JavaScript is off.

Change the palette once in `@theme` and every component follows.

## JavaScript strategy

- `Header` uses `client:load` — the mobile drawer and accordions need state.
- `FactoryShowcase` uses `client:visible` — the gallery only hydrates when
  scrolled into view.
- Everything else is plain Astro-rendered React output: **no** `client:*`
  directive, so it ships as HTML with zero JS.
- The mega menu and About dropdown are pure CSS (`group-hover`).
- Reveal-on-scroll is a ~20-line inline script in `BaseLayout.astro`.

## SEO

Each page sets its own `title`, `description`, optional `image` and `noindex`:

```astro
<BaseLayout title="All E-bikes" description="Browse the full catalog…">
```

`BaseLayout` renders `<title>`, description, canonical, Open Graph, Twitter
card, theme colour and favicon. `@astrojs/sitemap` writes `sitemap-index.xml`
at build time; `public/robots.txt` points at it. Update the `site` value in
`astro.config.mjs` (and `robots.txt`) before deploying to a real domain.

## Forms

`contact.astro` and `request-quote.astro` use native `<form>` elements with
`action="mailto:…"`. Submitting opens the visitor's mail client — **no data is
stored**, and the UI says so. Replace the `action`/`method` with a real endpoint
(Formspree, own API, etc.) when a backend exists.

## Not implemented (deliberately out of scope)

- Product detail pages — cards link to `/electric-bikes#<product-slug>`.
- Article pages for news and case studies — the `Read More` labels are not links.
- Search, filters, cart/checkout, auth, CMS, i18n.
- Real form submission backend.
- Image optimisation via `astro:assets` (files sit in `public/` on purpose so
  paths stay editable from data files).
- Privacy / Terms pages (removed from the footer rather than shipped as dead links).
