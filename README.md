# Vaul Software

Static corporate website for Vaul Software, built with Astro, TypeScript, Tailwind CSS v4, and Inter. Production domain: https://vaulsoftware.com.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Astro, normally http://localhost:4321/en/. English is the default; `/` redirects to `/en/`. Spanish is available under `/es/`.

```sh
npm run check
npm run build
npm run preview
```

The static build goes to `dist/`. The Cloudflare Worker chooses COP/USD prices before serving the homepage, pricing page and contact form. Manual currency choices are saved in a preference cookie; the selector also submits a GET request when JavaScript is disabled. Local Astro development serves the static COP fallback; use `npx wrangler dev` to exercise server selection. The Cloudflare Workers configuration and GitHub Actions check/build workflow are retained. No deployment, commit, or push is performed automatically. There is no configured lint command.

## Routes

Both locales include home, services, products, work, about, contact, pricing, and privacy information. Detail pages cover web development, business automation, custom software, CourtRank, and PlayZone VIP. The language switcher preserves equivalent pages and contact plan/service parameters.

## Editing content

- `src/data/content.ts`: English and Spanish page copy, service descriptions, process, and FAQs.
- `src/data/projects.ts`: verified projects and products, localized descriptions, media, and case-study gallery. Detail routes are generated from these entries.
- `src/data/pricing.ts`: the single source for plan prices in COP, features, exclusions, recommendations, contact routing, payment conditions, comparison, and pricing FAQs. Update numbers here, not in components. Monthly fees are always shown separately from development costs.
- `src/messages/*/404.json`: localized error-page copy. Other pre-existing message JSON files are retained as legacy material and are no longer rendered by the redesigned pages.
- `src/styles/global.css`: shared design tokens, layout, typography, and light/dark colors.

The header and footer share reusable components. Blue is reserved for branding and interactions. The default light palette uses white and slate surfaces; dark mode uses neutral charcoal and gray surfaces. A saved `theme` preference wins over the system preference and is applied before first paint.

## Contact

The form posts enquiries to a Cloudflare Worker that sends through Resend. Real delivery requires private server configuration and a verified sending domain; see [contact activation](docs/CONTACT-SETUP.md). Errors preserve the entries and provide a copyable email fallback. Required fields have translated validation, and pricing links preselect plan, service and currency. Run mocked server tests with `node --test tests/contact.test.mjs`.

`PUBLIC_CONTACT_EMAIL` defaults to the address already configured in the initial project, `contact@vaulsoftware.com`. Confirm mailbox ownership and delivery before release. No business WhatsApp number or official social profile has been invented.

## Configuration and privacy

Copy `.env.example` to `.env` if configuration is needed:

| Variable | Purpose |
| --- | --- |
| `PUBLIC_CONTACT_EMAIL` | Public enquiry mailbox; no secret value. |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 ID (`G-...`), enabled only on the live domain in production builds. |
| `PUBLIC_CF_BEACON_TOKEN` | Optional Cloudflare Web Analytics. Unset means no analytics beacon. |

The form does not store enquiry fields in local storage. Google Fonts supplies Inter; external links and optional Cloudflare analytics have separate privacy practices. The privacy page documents actual site behavior and clearly identifies the formal business policy as pending approval.

## SEO, assets, and accessibility

Every indexable page has translated titles/descriptions, canonical URLs, hreflang, Open Graph/Twitter metadata, and language attributes. The sitemap includes English/Spanish alternates. Organization and service structured data contain only supported fields. Error pages are noindex.

The site provides a skip link, semantic landmarks, visible focus, native FAQ disclosures, translated labels, and an Escape-enabled mobile menu. Reduced-motion preferences are respected. The comparison table scrolls within its own keyboard-focusable region on phones.

Images are real live-site captures or public CourtRank App Store screenshots. They are served as WebP with dimensions; below-fold images load lazily. Originals of captured website images live under `docs/source-images/`.

The typographic wordmark and V favicon/touch icon are provisional. Approved vector brand artwork is still required.

See [implementation report](docs/IMPLEMENTATION.md) for the file inventory, validation, evidence, and remaining business decisions.
