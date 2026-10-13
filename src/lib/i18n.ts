export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export const routes = [
  "",
  "services",
  "products",
  "pricing",
  "work",
  "about",
  "contact",
] as const;

export type Route = (typeof routes)[number];

export function localizedPath(lang: Locale, route: Route = ""): string {
  return route ? `/${lang}/${route}/` : `/${lang}/`;
}
