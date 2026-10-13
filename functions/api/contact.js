const services = new Set([
  "web-development",
  "business-automation",
  "custom-software",
  "unsure",
]);
const plans = new Set([
  "",
  "landing-essential",
  "landing-professional",
  "web-bookings",
  "business-automation",
  "custom-software",
]);
const reply = (status, code) =>
  Response.json(
    { ok: status === 200, code },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function onRequestPost({ request, env }) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return reply(403, "origin");
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply(415, "content_type");
  let data;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 16000)
      return reply(413, "size");
    data = JSON.parse(body);
  } catch {
    return reply(400, "invalid");
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return reply(400, "invalid");
  if (typeof data.website !== "string" || data.website !== "")
    return reply(400, "invalid");
  const limits = { name: 100, email: 254, company: 150, message: 3000 };
  for (const [key, max] of Object.entries(limits)) {
    if (typeof data[key] !== "string" || data[key].trim().length > max)
      return reply(400, "invalid");
    data[key] = data[key].trim();
  }
  if (
    !data.name ||
    !data.message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    /[\r\n]/.test(data.email) ||
    !services.has(data.service) ||
    !plans.has(data.plan) ||
    !["COP", "USD"].includes(data.currency) ||
    !["es", "en"].includes(data.lang)
  )
    return reply(400, "invalid");
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL)
    return reply(503, "unavailable");
  // Optional Cloudflare rate-limit binding; configure a per-IP rule before launch.
  if (env.CONTACT_RATE_LIMITER) {
    const result = await env.CONTACT_RATE_LIMITER.limit({
      key: request.headers.get("CF-Connecting-IP") || "unknown",
    });
    if (!result.success) return reply(429, "rate_limit");
  }
  const text = [
    `Nombre / Name: ${data.name}`,
    `Email: ${data.email}`,
    `Empresa / Company: ${data.company || "—"}`,
    `Servicio / Service: ${data.service}`,
    `Plan: ${data.plan || "—"}`,
    `Moneda / Currency: ${data.currency}`,
    "",
    data.message,
  ].join("\n");
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject:
          data.lang === "es"
            ? "Nueva consulta — Vaul Software"
            : "New enquiry — Vaul Software",
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const payload = await result.json();
    if (!result.ok || typeof payload.id !== "string")
      return reply(502, "send_failed");
    return reply(200, "sent");
  } catch {
    return reply(502, "send_failed");
  }
}
