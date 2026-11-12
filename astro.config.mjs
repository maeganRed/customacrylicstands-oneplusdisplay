import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// Replace with the production domain before deploying — it is used for
// canonical URLs, Open Graph tags and the generated sitemap.
export default defineConfig({
  site: "https://www.customacrylicstands.com",
  // Static output is `directory` format, so every URL ends with a slash.
  // Pinning it here keeps dev/preview requests, the sitemap and canonical in sync.
  trailingSlash: "always",
  integrations: [react(), sitemap()],
  // The dev toolbar is Astro's own English-only UI. It is hidden for this
  // project so `npm run dev` shows exactly what a visitor sees.
  devToolbar: { enabled: false },
});
