// Validates the built site in dist/. Run `npm run build` first.
//
// These checks exist because SEO metadata fails silently: a broken canonical,
// a dangling JSON-LD reference, or a page missing from the sitemap produces a
// perfectly working website that search engines read incorrectly.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;
const ORIGIN = "https://vaulsoftware.com";

/** @type {{ route: string, url: string, html: string }[]} */
const pages = [];
let sitemap = "";

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

const attr = (html, pattern) => {
  const match = html.match(pattern);
  return match ? match[1] : null;
};

const all = (html, pattern) => [...html.matchAll(pattern)].map((m) => m[1]);

const jsonLd = (html) =>
  all(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);

/** Collect every `{"@id": "..."}` reference inside a node. */
function references(value) {
  const found = [];
  const visit = (node) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    const keys = Object.keys(node);
    if (keys.length === 1 && keys[0] === "@id") found.push(node["@id"]);
    else Object.values(node).forEach(visit);
  };
  visit(value);
  return found;
}

before(async () => {
  try {
    await stat(DIST);
  } catch {
    throw new Error("dist/ is missing. Run `npm run build` before these tests.");
  }
  for await (const file of walk(DIST)) {
    const route = relative(DIST, file).split(sep).join("/");
    pages.push({
      route,
      url: `${ORIGIN}/${route.replace(/index\.html$/, "")}`,
      html: await readFile(file, "utf8"),
    });
  }
  sitemap = await readFile(join(DIST, "sitemap-0.xml"), "utf8");
});

const indexable = () =>
  pages.filter((p) => p.route !== "index.html" && !p.route.includes("404"));

test("every page was collected", () => {
  assert.ok(pages.length >= 30, `only found ${pages.length} pages`);
  assert.equal(indexable().length, 28);
});

test("indexable pages are self-canonical with full hreflang alternates", () => {
  for (const { route, url, html } of indexable()) {
    const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
    assert.equal(canonical, url, `${route}: canonical does not match its URL`);

    const alternates = Object.fromEntries(
      [...html.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [
        m[1],
        m[2],
      ]),
    );
    assert.deepEqual(
      Object.keys(alternates).sort(),
      ["en", "es", "x-default"],
      `${route}: incomplete hreflang set`,
    );
    assert.equal(
      alternates["x-default"],
      alternates.en,
      `${route}: x-default must point at the English page`,
    );
    assert.ok(
      alternates[route.startsWith("es/") ? "es" : "en"] === url,
      `${route}: its own locale alternate must be self-referential`,
    );
  }
});

test("indexable pages allow indexing and rich previews", () => {
  for (const { route, html } of indexable()) {
    const robots = attr(html, /name="robots" content="([^"]+)"/);
    assert.match(robots, /^index, follow/, `${route}: not indexable`);
    assert.match(
      robots,
      /max-image-preview:large/,
      `${route}: large image previews not enabled`,
    );
  }
});

test("error pages are noindex and carry no canonical or structured data", () => {
  const errors = pages.filter((p) => p.route.includes("404"));
  assert.ok(errors.length > 0);
  for (const { route, html } of errors) {
    assert.match(
      attr(html, /name="robots" content="([^"]+)"/),
      /^noindex/,
      `${route}: should be noindex`,
    );
    assert.ok(!html.includes('rel="canonical"'), `${route}: has a canonical`);
    assert.equal(jsonLd(html).length, 0, `${route}: emits JSON-LD`);
  }
});

test("each page emits exactly one valid JSON-LD graph", () => {
  for (const { route, html } of indexable()) {
    const blocks = jsonLd(html);
    assert.equal(blocks.length, 1, `${route}: expected one JSON-LD block`);
    const data = JSON.parse(blocks[0]);
    assert.equal(data["@context"], "https://schema.org");
    assert.ok(Array.isArray(data["@graph"]), `${route}: missing @graph`);
  }
});

test("shared organization nodes are identical across every page", () => {
  const seen = new Map();
  for (const { route, html } of indexable()) {
    const graph = JSON.parse(jsonLd(html)[0])["@graph"];
    for (const id of [
      `${ORIGIN}/#organization`,
      `${ORIGIN}/#website`,
      `${ORIGIN}/#logo`,
      `${ORIGIN}/#founder`,
    ]) {
      const node = graph.find((n) => n["@id"] === id);
      assert.ok(node, `${route}: missing ${id}`);
      // The organization and website carry localized copy, so compare per locale.
      const key = `${id}|${route.startsWith("es/") ? "es" : "en"}`;
      const serialized = JSON.stringify(node);
      if (seen.has(key)) {
        assert.equal(seen.get(key), serialized, `${route}: ${id} diverges`);
      } else {
        seen.set(key, serialized);
      }
    }
  }
});

test("no JSON-LD reference points at a node outside its own graph", () => {
  for (const { route, html } of indexable()) {
    const graph = JSON.parse(jsonLd(html)[0])["@graph"];
    const ids = new Set(graph.map((n) => n["@id"]).filter(Boolean));
    for (const node of graph) {
      for (const ref of references(node)) {
        assert.ok(
          ids.has(ref),
          `${route}: ${node["@type"]} references unresolved ${ref}`,
        );
      }
    }
  }
});

test("the WebPage node agrees with the canonical URL and page language", () => {
  for (const { route, url, html } of indexable()) {
    const graph = JSON.parse(jsonLd(html)[0])["@graph"];
    const page = graph.find((n) => /Page$/.test(n["@type"]));
    assert.ok(page, `${route}: no WebPage node`);
    assert.equal(page.url, url, `${route}: WebPage url mismatch`);
    assert.equal(page.inLanguage, route.startsWith("es/") ? "es" : "en");
    assert.ok(page.name?.length, `${route}: WebPage has no name`);
    assert.ok(page.description?.length, `${route}: WebPage has no description`);
  }
});

test("breadcrumbs are absolute, ordered and end on the current page", () => {
  const withCrumbs = indexable().filter((p) =>
    JSON.parse(jsonLd(p.html)[0])["@graph"].some(
      (n) => n["@type"] === "BreadcrumbList",
    ),
  );
  // Every page except the two home pages has a breadcrumb trail.
  assert.equal(withCrumbs.length, 26);

  for (const { route, url, html } of withCrumbs) {
    const graph = JSON.parse(jsonLd(html)[0])["@graph"];
    const crumbs = graph.find((n) => n["@type"] === "BreadcrumbList");
    const items = crumbs.itemListElement;
    assert.ok(items.length >= 2, `${route}: trail too short`);
    items.forEach((item, index) => {
      assert.equal(item.position, index + 1, `${route}: positions out of order`);
      assert.ok(item.name?.length, `${route}: unnamed breadcrumb`);
      assert.ok(item.item.startsWith(ORIGIN), `${route}: relative breadcrumb`);
      assert.ok(item.item.endsWith("/"), `${route}: breadcrumb missing slash`);
    });
    assert.equal(
      items.at(-1).item,
      url,
      `${route}: trail does not end on this page`,
    );
    const page = graph.find((n) => /Page$/.test(n["@type"]));
    assert.equal(page.breadcrumb?.["@id"], crumbs["@id"]);
  }
});

test("FAQ entries all have a question and a non-empty answer", () => {
  const faqPages = indexable().filter((p) =>
    JSON.parse(jsonLd(p.html)[0])["@graph"].some(
      (n) => n["@type"] === "FAQPage",
    ),
  );
  // Three services and the pricing page, in both locales.
  assert.equal(faqPages.length, 8);

  for (const { route, html } of faqPages) {
    const faq = JSON.parse(jsonLd(html)[0])["@graph"].find(
      (n) => n["@type"] === "FAQPage",
    );
    assert.ok(faq.mainEntity.length > 0, `${route}: empty FAQPage`);
    for (const entry of faq.mainEntity) {
      assert.equal(entry["@type"], "Question");
      assert.ok(entry.name?.trim(), `${route}: question without text`);
      assert.ok(
        entry.acceptedAnswer?.text?.trim(),
        `${route}: "${entry.name}" has no answer`,
      );
    }
  }
});

test("declared Open Graph image dimensions match the shipped file", async () => {
  const { html } = indexable()[0];
  const src = attr(html, /property="og:image" content="([^"]+)"/);
  assert.ok(src.startsWith(ORIGIN), "og:image must be absolute");

  const file = await readFile(join(DIST, new URL(src).pathname), null);
  // PNG IHDR: width and height are big-endian uint32 at offsets 16 and 20.
  assert.equal(file.toString("ascii", 1, 4), "PNG", "og:image is not a PNG");
  const width = file.readUInt32BE(16);
  const height = file.readUInt32BE(20);

  for (const { route, html: page } of indexable()) {
    assert.equal(
      attr(page, /property="og:image:width" content="([^"]+)"/),
      String(width),
      `${route}: declared og:image width does not match the file`,
    );
    assert.equal(
      attr(page, /property="og:image:height" content="([^"]+)"/),
      String(height),
      `${route}: declared og:image height does not match the file`,
    );
  }
});

test("the sitemap lists every indexable page and nothing else", () => {
  const locs = all(sitemap, /<loc>([^<]+)<\/loc>/g);
  const expected = indexable()
    .map((p) => p.url)
    .sort();
  assert.deepEqual([...locs].sort(), expected);
  assert.ok(!locs.includes(`${ORIGIN}/`), "the redirecting root must be excluded");
});

test("every sitemap entry declares an x-default alternate", () => {
  const entries = all(sitemap, /<url>([\s\S]*?)<\/url>/g);
  assert.equal(entries.length, 28);
  for (const entry of entries) {
    const loc = attr(entry, /<loc>([^<]+)<\/loc>/);
    const langs = all(entry, /hreflang="([^"]+)"/g).sort();
    assert.deepEqual(langs, ["en", "es", "x-default"], `${loc}: bad alternates`);
    assert.match(entry, /<priority>/, `${loc}: no priority`);
  }
});

test("robots.txt allows crawling and points at the sitemap index", async () => {
  const robots = await readFile(join(DIST, "robots.txt"), "utf8");
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /^Allow: \/$/m);
  assert.doesNotMatch(robots, /^Disallow: \/$/m, "the whole site is blocked");
  assert.match(robots, new RegExp(`Sitemap: ${ORIGIN}/sitemap-index.xml`));
});
