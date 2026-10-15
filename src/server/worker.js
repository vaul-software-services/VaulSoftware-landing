import { onRequestPost } from "../../functions/api/contact.js";
import { onRequestGet } from "../../functions/api/country.js";
import { onRequest } from "./pricing-edge.js";

const methodNotAllowed = (allow) => Response.json(
  { ok: false, code: "method_not_allowed" },
  { status: 405, headers: { Allow: allow, "Cache-Control": "no-store" } },
);

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === "/api/contact") {
      return request.method === "POST"
        ? onRequestPost({ request, env })
        : methodNotAllowed("POST");
    }
    if (path === "/api/country") {
      return request.method === "GET"
        ? onRequestGet({ request })
        : methodNotAllowed("GET");
    }
    return onRequest({
      request,
      next: (assetRequest = request) => env.ASSETS.fetch(assetRequest),
    });
  },
};
