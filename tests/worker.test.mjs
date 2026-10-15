import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/server/worker.js";

test("Worker routes contact POST to validation instead of static assets", async () => {
  const request = new Request("https://vaulsoftware.com/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json", Origin: "https://vaulsoftware.com" }, body: "{}",
  });
  const response = await worker.fetch(request, {});
  assert.equal(response.status, 400);
  assert.equal((await response.json()).ok, false);
});

test("Worker routes country API, rejects wrong methods and preserves assets", async () => {
  const country = await worker.fetch(new Request("https://vaulsoftware.com/api/country"), {});
  assert.deepEqual(await country.json(), { country: null });
  const wrongMethod = await worker.fetch(new Request("https://vaulsoftware.com/api/contact"), {});
  assert.equal(wrongMethod.status, 405);
  assert.equal(wrongMethod.headers.get("Allow"), "POST");
  const asset = await worker.fetch(new Request("https://vaulsoftware.com/og.png"), {
    ASSETS: { fetch: async (request) => new Response(new URL(request.url).pathname) },
  });
  assert.equal(await asset.text(), "/og.png");
});
