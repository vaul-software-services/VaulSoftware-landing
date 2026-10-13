import type { PricingCurrency } from "../data/pricing";
import { currencyCookieName, isCurrency } from "./currency.js";
export function initializePricingCurrency() {
  const selector =
    document.querySelector<HTMLSelectElement>("#pricing-currency");
  if (!selector) return;
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
  selector
    .closest("form")
    ?.addEventListener("submit", (event) => event.preventDefault());
  selector.addEventListener("change", () => {
    if (!isCurrency(selector.value)) return;
    document.cookie = `${currencyCookieName}=${selector.value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    apply(selector.value, true);
  });
  // The edge already selected the initial currency in the HTML.
  apply(isCurrency(selector.value) ? selector.value : "COP");
}
