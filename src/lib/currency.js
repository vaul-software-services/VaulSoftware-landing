export const currencyCookieName = "vaul-pricing-currency";
/** @param {unknown} value @returns {value is "COP" | "USD"} */
export const isCurrency = (value) => value === "COP" || value === "USD";
export function currencyForCountry(country) {
  return typeof country === "string" &&
    /^[A-Z]{2}$/.test(country) &&
    !["CO", "XX", "T1"].includes(country)
    ? "USD"
    : "COP";
}
export function readCurrencyCookie(cookie = "") {
  const match = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(currencyCookieName + "="));
  const value = match?.slice(currencyCookieName.length + 1);
  return isCurrency(value) ? value : null;
}
export function resolveCurrency(request) {
  const query = new URL(request.url).searchParams.get("currency");
  return isCurrency(query)
    ? query
    : readCurrencyCookie(request.headers.get("cookie") || "") ||
        currencyForCountry(request.cf?.country);
}
