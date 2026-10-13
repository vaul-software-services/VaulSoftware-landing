// Cloudflare supplies the country; never return the visitor's IP or precise location.
export function onRequestGet({ request }) {
  const detected = request.cf?.country;
  const country =
    typeof detected === "string" &&
    /^[A-Z]{2}$/.test(detected) &&
    !["XX", "T1"].includes(detected)
      ? detected
      : null;
  return Response.json(
    { country },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
