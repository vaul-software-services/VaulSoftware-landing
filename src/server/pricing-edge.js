import {
  currencyCookieName,
  isCurrency,
  resolveCurrency,
} from "../lib/currency.js";
export function currencyHandlers(currency) {
  return {
    price: {
      element(el) {
        const text = el.getAttribute(
          currency === "USD" ? "data-price-usd" : "data-price-cop",
        );
        if (text !== null) el.setInnerContent(text);
      },
    },
    code: {
      element(el) {
        el.setInnerContent(currency);
      },
    },
    option: {
      element(el) {
        if (el.getAttribute("value") === currency)
          el.setAttribute("selected", "");
        else el.removeAttribute("selected");
      },
    },
    contact: {
      element(el) {
        const href = el.getAttribute("href");
        if (!href) return;
        const url = new URL(href, "https://vaulsoftware.com");
        url.searchParams.set("currency", currency);
        el.setAttribute("href", url.pathname + url.search);
      },
    },
  };
}
export async function onRequest(context) {
  const { request } = context;
  const path = new URL(request.url).pathname;
  if (
    request.method !== "GET" ||
    !/^\/(en|es)\/(?:pricing\/?|contact\/?|)$/.test(path)
  )
    return context.next();
  const headers = new Headers(request.headers);
  headers.delete("If-None-Match");
  headers.delete("If-Modified-Since");
  const response = await context.next(new Request(request, { headers }));
  if (
    response.status !== 200 ||
    !response.headers.get("content-type")?.includes("text/html")
  )
    return response;
  const currency = resolveCurrency(request);
  const handlers = currencyHandlers(currency);
  const outgoing = new Response(response.body, response);
  outgoing.headers.set("Cache-Control", "private, no-store");
  outgoing.headers.delete("ETag");
  outgoing.headers.delete("Content-Length");
  const explicit = new URL(request.url).searchParams.get("currency");
  if (isCurrency(explicit))
    outgoing.headers.append(
      "Set-Cookie",
      `${currencyCookieName}=${explicit}; Path=/; Max-Age=31536000; SameSite=Lax${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`,
    );
  return new HTMLRewriter()
    .on("[data-price-cop]", handlers.price)
    .on("[data-currency-code]", handlers.code)
    .on("#pricing-currency option", handlers.option)
    .on("#currency option", handlers.option)
    .on("[data-pricing-contact]", handlers.contact)
    .transform(outgoing);
}
