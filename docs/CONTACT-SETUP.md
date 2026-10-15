# Contact form activation

The contact form posts JSON to `/api/contact`. The Cloudflare Worker sends an email through Resend to the configured recipient. The approved recipient is `contact@vaulsoftware.com`.

## Production configuration

1. Verify a sending domain in Resend and create a sending API key. Use a sender on that verified domain, for example `Vaul Software <contact@vaulsoftware.com>`.
2. In the `vaulsoftware-landing` Worker settings → Runtime variables and secrets, add **server-side** variables/secrets after deploying the Worker entry point:
   - `RESEND_API_KEY`: private API key (secret).
   - `CONTACT_FROM_EMAIL`: verified sender (configured in `wrangler.jsonc`).
   - `CONTACT_TO_EMAIL`: `contact@vaulsoftware.com` (configured in `wrangler.jsonc`).
3. Add a Cloudflare per-IP rate-limit rule for POST `/api/contact`, or supply the optional `CONTACT_RATE_LIMITER` binding. The honeypot and origin checks alone do not provide a hard rate limit.
4. Deploy using the existing Workers Git integration with `npm run build` and `npx wrangler deploy`. The configuration must include `main: src/server/worker.js`, the `ASSETS` binding and `run_worker_first` routes. Uploading only `dist` skips the API. The Worker imports the existing handlers in `functions`; Workers does not discover Pages Functions automatically. Build variables are not runtime secrets.
5. Submit one authorized test enquiry and verify its arrival in the mailbox and that replying addresses the visitor.

Do not put private keys in `PUBLIC_` variables or source control. `npm run dev` serves Astro without the Worker; test the backend locally with `npx wrangler dev` and a private `.dev.vars` file, or in a configured preview deployment. No real email has been sent or production deployment performed during implementation.

The API validates field types, lengths, plan/service/currency values and email format. It rejects cross-origin submissions, honeypot entries and unsupported content types. Errors return a generic status; provider details and secrets are not exposed. Success means Resend accepted the request, not proof of inbox delivery. On failure the form preserves the enquiry and offers a copyable email draft. No automatic confirmation message is sent to the visitor.

Run mocked backend tests with `node --test tests/*.test.mjs`. They never contact Resend.

Reference: https://resend.com/docs/api-reference/emails/send-email
