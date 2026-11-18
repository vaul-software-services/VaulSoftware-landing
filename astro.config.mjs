// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Crawl priority by route depth. Google largely ignores `priority`, but Bing
// and other engines still read it, and IndexNow submissions come from Bing.
/** @param {string} path */
const priorityFor = (path) => {
  if (/^\/(en|es)\/$/.test(path)) return 1;
  if (/^\/(en|es)\/privacy\/$/.test(path)) return 0.3;
  if (/^\/(en|es)\/(services|pricing|contact)\/$/.test(path)) return 0.9;
  return 0.8;
};

// https://astro.build/config
export default defineConfig({
  site: "https://vaulsoftware.com",

  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", es: "es" } },
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== "/" && !/\/404\/?$/.test(path);
      },
      serialize: (item) => {
        const path = new URL(item.url).pathname;
        item.priority = priorityFor(path);
        // The i18n option emits `en` and `es` alternates but no x-default.
        const links = item.links;
        const english = links?.find((link) => link.lang === "en");
        if (links && english && !links.some((l) => l.lang === "x-default")) {
          links.push({ lang: "x-default", url: english.url });
        }
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
