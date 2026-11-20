# Build and deploy

Everything below maps to real entries in `package.json`; there is no other
build tooling in this repo.

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `astro dev` | Dev server with HMR on http://localhost:4321 |
| `npm start` | `astro dev` | Alias of `dev` |
| `npm run build` | `astro build` | Static production build into `dist/` |
| `npm run preview` | `astro preview` | Serve the built `dist/` locally |
| `npm run check` | `astro check` | TypeScript / template diagnostics |

## Requirements

- **Node.js >= 22.12** — required by Astro 6. Do not jump to Astro 7: it needs
  Node `>= 22.23.4`, which this project's target environment does not provide.
- **npm** (lockfile is `package-lock.json`; the repo has no pnpm/yarn config).
- No database, API server, CMS or environment variables are involved — the site
  is fully static.

Version pins that matter and must not be "fixed":

- `overrides.vite = ^7.1.0` — Astro 6 pairs with Vite 7; a fresh install would
  otherwise pull Vite 8 and React hydration fails silently in dev.
- Tailwind runs through `@tailwindcss/postcss` (see `postcss.config.mjs`), not
  `@tailwindcss/vite`, because the Vite plugin must match the Vite major.
- `devToolbar: { enabled: false }` in `astro.config.mjs` is intentional.

## Install

From a clean checkout:

```bash
npm ci          # reproducible install from package-lock.json
```

Use `npm install` only when you are deliberately changing dependencies; `npm ci`
deletes `node_modules` first and installs exactly what the lockfile records.

## Local development

```bash
npm run dev     # http://localhost:4321
```

The dev server prints the URL; port 4321 is Astro's default and the one used
throughout this repo. Content changes in `src/data/` and component edits hot
reload. TypeScript errors are surfaced by `npm run check` rather than by the
dev server.

## Production build

```bash
npm run check   # optional but recommended: must report 0 errors
npm run build   # writes dist/
```

`astro build` emits a fully static site to `dist/`:

- `index.html`, one directory per route (e.g. `electric-bikes/index.html`),
  because `trailingSlash: "always"` is set — every URL ends with `/`.
- `sitemap-index.xml` + `sitemap-0.xml` from `@astrojs/sitemap`.
- `_astro/` for hashed JS/CSS assets, plus everything copied verbatim from
  `public/` (`images/`, `videos/`, `favicon.svg`, `robots.txt`).

`dist/` is git-ignored; it is an artifact, never committed.

## Local preview

```bash
npm run build
npm run preview # http://localhost:4321 serving dist/
```

Use this — not `npm run dev` — when checking trailing-slash behaviour, the
sitemap, or anything that depends on the final asset hashes.

## Deployment

The output is plain static files, so any static host works (Netlify, Vercel,
Cloudflare Pages, S3 + CDN, nginx). A typical pipeline is:

1. `npm ci`
2. `npm run build`
3. publish the `dist/` directory
4. serve `/` paths with directory index (e.g. nginx `try_files $uri $uri/ =404`)
   so the trailing-slash URLs resolve.

Before going live on a real domain, update the `site` value in
`astro.config.mjs` and the sitemap URL in `public/robots.txt` — both feed
canonical URLs, Open Graph tags and the sitemap.

## Common issues

**`npm run build` fails with Node version / engine errors**
Check `node -v`. Astro 6 needs Node `>= 22.12`. Astro 7 is not usable here.

**React components render but never hydrate in dev**
Vite 8 got installed and the `overrides.vite` pin was ignored. Run `npm ci`
(not `npm install`) to restore Vite 7. Symptom: mobile drawer and the factory
gallery do not respond.

**Tailwind classes produce no styles**
Tailwind must go through `postcss.config.mjs` (`@tailwindcss/postcss`). Check
that the config file exists and that `global.css` is imported by
`BaseLayout.astro`; do not add `@tailwindcss/vite` instead.

**`astro check` reports errors but the build succeeds**
`astro build` does not type-check. Treat `npm run check` output as the gate
before committing; fix types or data rather than casting.

**Routes 404 when deployed**
The host is not serving directory indexes, or is stripping trailing slashes.
Configure the host to serve `/path/` from `path/index.html` and keep
`trailingSlash: "always"`.

**Port 4321 already in use**
`npm run dev -- --port 4322` (flags after `--` are forwarded to Astro).
