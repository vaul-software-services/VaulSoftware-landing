import type { PricingCurrency } from "../data/pricing";
const storageKey = "vaul-pricing-currency";
export const isCurrency = (value: unknown): value is PricingCurrency =>
  value === "COP" || value === "USD";
export function currencyForCountry(country: unknown): PricingCurrency {
  return typeof country === "string" &&
    /^[A-Z]{2}$/.test(country) &&
    !["CO", "XX", "T1"].includes(country)
    ? "USD"
    : "COP";
}
export function initializePricingCurrency() {
  const selector =
    document.querySelector<HTMLSelectElement>("#pricing-currency");
  if (!selector) return;
  let manuallySelected = false;
  const apply = (currency: PricingCurrency, announce = false) => {
    selector.value = currency;
    selector.dispatchEvent(new Event("select:sync"));
    document
      .querySelectorAll<HTMLElement>("[data-price-cop]")
      .forEach((element) => {
        element.textContent =
          currency === "COP"
            ? element.dataset.priceCop!
            : element.dataset.priceUsd!;
      });
    document.querySelectorAll("[data-currency-code]").forEach((element) => {
      element.textContent = currency;
    });
    document
      .querySelectorAll<HTMLAnchorElement>("[data-pricing-contact]")
      .forEach((link) => {
        const url = new URL(link.href);
        url.searchParams.set("currency", currency);
        link.href = url.pathname + url.search;
      });
    const announcement = document.querySelector("[data-currency-announcement]");
    if (announce && announcement)
      announcement.textContent =
        document.documentElement.lang === "es"
          ? `Precios actualizados a ${currency}`
          : `Prices updated to ${currency}`;
  };
  selector.addEventListener("change", () => {
    if (!isCurrency(selector.value)) return;
    manuallySelected = true;
    try {
      localStorage.setItem(storageKey, selector.value);
    } catch {
      /* Selection still works when storage is unavailable. */
    }
    apply(selector.value, true);
  });
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch {
    /* Use detection or the COP fallback. */
  }
  if (isCurrency(saved)) {
    apply(saved);
    return;
  }
  apply("COP");
  // Astro's local/static preview has no Cloudflare request metadata.
  if (["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)) return;
  fetch("/api/country", {
    cache: "no-store",
    signal: AbortSignal.timeout(3000),
  })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!manuallySelected) apply(currencyForCountry(data?.country));
    })
    .catch(() => {
      /* Keep the usable COP prices on failure. */
    });
}
