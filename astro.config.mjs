// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

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
