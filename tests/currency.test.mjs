import test from "node:test";
import assert from "node:assert/strict";
import { resolveCurrency, currencyForCountry } from "../src/lib/currency.js";
import { currencyHandlers, onRequest } from "../src/server/pricing-edge.js";
const request = (country, query = "", cookie = "") => ({
  url: `https://vaulsoftware.com/es/pricing/${query}`,
  headers: new Headers({ cookie }),
  cf: { country },
});
test("country defaults and manual preferences have deterministic precedence", () => {
  for (const [country, expected] of [
    ["CO", "COP"],
    ["US", "USD"],
    ["ES", "USD"],
    [null, "COP"],
    ["XX", "COP"],
    ["T1", "COP"],
    ["invalid", "COP"],
  ])
    assert.equal(currencyForCountry(country), expected);
  assert.equal(
    resolveCurrency(request("US", "", "vaul-pricing-currency=COP")),
    "COP",
  );
  assert.equal(
    resolveCurrency(
      request("CO", "?currency=USD", "vaul-pricing-currency=COP"),
    ),
    "USD",
  );
  assert.equal(
    resolveCurrency(
      request("US", "?currency=bad", "vaul-pricing-currency=bad"),
    ),
    "USD",
  );
});
function element(attrs = {}) {
  return {
    attrs,
    text: "",
    getAttribute(key) {
      return this.attrs[key] ?? null;
    },
    setAttribute(key, value) {
      this.attrs[key] = value;
    },
    removeAttribute(key) {
      delete this.attrs[key];
    },
    setInnerContent(value) {
      this.text = value;
    },
  };
}
test("rewrites price text, units, selected option and contact URL consistently", () => {
  const handlers = currencyHandlers("USD");
  const price = element({
    "data-price-cop": "$600.000",
    "data-price-usd": "$169",
  });
  handlers.price.element(price);
  assert.equal(price.text, "$169");
  const code = element();
  handlers.code.element(code);
  assert.equal(code.text, "USD");
  const option = element({ value: "USD" });
  handlers.option.element(option);
  assert.equal(option.attrs.selected, "");
  const other = element({ value: "COP", selected: "" });
  handlers.option.element(other);
  assert.equal(other.attrs.selected, undefined);
  const link = element({ href: "/es/contact/?plan=landing-essential" });
  handlers.contact.element(link);
  assert.equal(
    link.attrs.href,
    "/es/contact/?plan=landing-essential&currency=USD",
  );
});
test("non-pricing routes and non-HTML responses pass through untouched", async () => {
  const response = new Response("unchanged");
  for (const path of ["/api/contact", "/", "/es/work/", "/en/services/"]) {
    const result = await onRequest({
      request: new Request("https://vaulsoftware.com" + path),
      next: async () => response,
    });
    assert.equal(result, response);
  }
  const result = await onRequest({
    request: new Request("https://vaulsoftware.com/es/pricing/"),
    next: async () => response,
  });
  assert.equal(result, response);
});
