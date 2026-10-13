import { test } from "node:test";
import assert from "node:assert/strict";
import { onRequestPost } from "../functions/api/contact.js";
const valid = {
  name: "Test",
  email: "test@example.com",
  company: "Example",
  service: "web-development",
  plan: "landing-essential",
  currency: "COP",
  lang: "es",
  message: "Project enquiry",
  website: "",
};
const env = {
  RESEND_API_KEY: "test-only",
  CONTACT_FROM_EMAIL: "Vaul <contact@example.com>",
  CONTACT_TO_EMAIL: "owner@example.com",
};
const context = (data = valid, overrides = {}) => ({
  request: new Request("https://vaulsoftware.com/api/contact", {
    method: "POST",
    headers: {
      origin: "https://vaulsoftware.com",
      "content-type": "application/json",
      ...overrides,
    },
    body: JSON.stringify(data),
  }),
  env,
});
test("rejects cross-origin submissions and malformed fields", async () => {
  assert.equal(
    (await onRequestPost(context(valid, { origin: "https://other.example" })))
      .status,
    403,
  );
  for (const data of [
    { ...valid, email: "bad" },
    { ...valid, message: "" },
    { ...valid, name: "a".repeat(101) },
    { ...valid, website: "spam" },
    { ...valid, plan: "invented" },
    { ...valid, currency: "EUR" },
    { ...valid, email: "test@example.com\nBcc: bad@example.com" },
  ])
    assert.equal((await onRequestPost(context(data))).status, 400);
});
test("unconfigured provider does not report success", async () => {
  const ctx = context();
  ctx.env = {};
  const response = await onRequestPost(ctx);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});
test("provider success, rejection and timeout are handled honestly", async () => {
  const original = globalThis.fetch;
  try {
    let payload;
    globalThis.fetch = async (url, options) => {
      assert.equal(url, "https://api.resend.com/emails");
      payload = JSON.parse(options.body);
      return Response.json({ id: "test-id" });
    };
    assert.equal((await onRequestPost(context())).status, 200);
    assert.deepEqual(payload.to, ["owner@example.com"]);
    assert.equal(payload.reply_to, "test@example.com");
    assert.equal(payload.from, env.CONTACT_FROM_EMAIL);
    assert.ok(payload.text.includes("landing-essential"));
    globalThis.fetch = async () =>
      Response.json({ message: "failure" }, { status: 422 });
    assert.equal((await onRequestPost(context())).status, 502);
    globalThis.fetch = async () => {
      throw new Error("timeout");
    };
    assert.equal((await onRequestPost(context())).status, 502);
  } finally {
    globalThis.fetch = original;
  }
});
test("rate limiting rejects before contacting provider", async () => {
  const ctx = context();
  ctx.env = {
    ...env,
    CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) },
  };
  assert.equal((await onRequestPost(ctx)).status, 429);
});
