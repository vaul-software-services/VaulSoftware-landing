# Implementation report

## Audit and retained foundation

The existing project provided static Astro locale routes, Tailwind v4, shared SEO, optional Cloudflare analytics, a bilingual error page, and CI. Existing service/product/work pages were minimal; the home page lacked selected work, purpose, and process sections. Service details, case studies, pricing, and an enquiry form were absent. Several existing product status assertions and screenshot placeholders needed replacement.

Retained Astro, TypeScript, Tailwind, static generation, sitemap, deployment configuration, locale route conventions, and the shared layout. No backend, CMS, database, framework runtime, or production dependency was added. This checkout has no Git repository metadata; nothing was committed or pushed.

## Result and design decisions

- Full corporate website in English and Spanish, with services separate from proprietary products.
- Three service detail pages with scope, benefits, process, and translated FAQs.
- CourtRank product detail and a PlayZone VIP case study generated through reusable data-driven routes.
- Strong Inter typography, intentional section spacing, blue interaction accents, and editorial service layouts.
- Restored theme control and saved/system preference handling. Dark surfaces are neutral charcoal following the requested refinement; light surfaces retain the original blue/slate brand palette.
- Additional real imagery in the hero, CourtRank app presentation, PlayZone VIP feature, web-development example, and project gallery. No invented interfaces, fake portraits, clients, metrics, or testimonials.
- Transparent email-draft enquiry flow with a copyable fallback, field validation, and no false delivery state.
- Pricing page, homepage preview, comparison, payment terms, and ten FAQs, all using one typed configuration. Initial development and monthly fees are separate and equally explicit.
- Pricing links preserve the selected plan and matching service, including when changing locale. Query preservation runs in the browser because static pages cannot read enquiry query strings during the build.

## Pricing supplied by the owner

| Plan | Development, COP | Monthly, COP |
| --- | ---: | ---: |
| Web Presence / Presencia Web | 399,000 | 25,000 |
| Web + Bookings / Web + Reservas | 790,000 | 49,000 |
| Business Automation / Automatización | 990,000 | 99,000 |
| Custom Software / Software a Medida | Custom quote | Requirements-based |

These are proposed launch prices, not market-validated prices. “Recommended” is a design recommendation, not a sales/popularity claim. Booking and automation features are proposed project scope and require development/configuration. No business booking backend was introduced into the Vaul website.

The supplied payment terms are 50% upfront and 50% before publication/delivery. Recurring services are paid in advance and start on agreed activation. Additional features, domain registration, and applicable third-party costs are separate. Website hosting remains separate from booking access/operation.

## Evidence and assets

- [PlayZone VIP](https://www.playzonevip.com/): live commercial website, activity pages, contact/reservation paths. Scope came from existing project content. Astro/TypeScript attribution was corrected following the owner’s confirmation.
- [CourtRank](https://getcourtrank.com/en/): official product site and its iOS download link.
- [CourtRank App Store listing](https://apps.apple.com/us/app/courtrank-book-play-rank/id6761787842): actual application screenshots and publicly listed iOS availability. No ratings/customer counts were reused.
- Founder portfolio link: supplied in the brief. No founder portrait was added.

App screenshots show the published interface in Spanish; accompanying alternative text and captions are translated in each Vaul locale. Website captures are explicitly labeled as website captures.

## Files created

- `src/data/content.ts`, `src/data/projects.ts`, `src/data/pricing.ts`.
- `src/lib/site.ts`.
- `src/components/Arrow.astro`, `CTA.astro`, `Process.astro`, `ServicesGrid.astro`, `ProjectMedia.astro`, `WorkFeature.astro`, `ProductFeature.astro`, `ContactForm.astro`, `HeroShowcase.astro`, `ProductScreens.astro`, `PricingCards.astro`, `PricingPreview.astro`, `PricingComparison.astro`.
- `src/pages/[lang]/services/[service].astro`, `src/pages/[lang]/work/[project].astro`, `src/pages/[lang]/products/[product].astro`, `src/pages/[lang]/privacy.astro`, `src/pages/[lang]/pricing.astro`.
- `public/apple-touch-icon.png`, `public/og-image-es.png`; real optimized assets `public/images/playzone-vip.webp`, `playzone-activities.webp`, `courtrank-site.webp`, `courtrank-app-home.webp`, `courtrank-app-bookings.webp`.
- `docs/IMPLEMENTATION.md`, source-image captures, and visual verification screenshots.

## Files modified

- `src/components/Header.astro`, `Footer.astro`, `Logo.astro`, `NotFound.astro`.
- `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/lib/i18n.ts`, `src/env.d.ts`.
- Existing localized home, services, products, work, about, and contact page files.
- `astro.config.mjs`, `.env.example`, `README.md`, `public/favicon.svg`, `public/og-image.png`.

## Remaining release and business decisions

1. Approve final horizontal, monogram, monochrome, and light/dark vector logos, favicon, touch icon, and sharing artwork. Current marks are provisional.
2. Confirm the configured mailbox is owned and receives enquiries. Sending/delivery must be checked in a real email application; the test browser blocked the external mail-app launch. Draft generation, fallback, and honest status text were verified.
3. Approve the formal business privacy policy, identity, enquiry retention, and any applicable rights. The present page is factual site privacy information, not a fabricated final policy.
4. Confirm exact support/content-change limits, booking capacity, automation usage/monitoring limits, supported providers, and integration scope for each proposal.
5. Define the website-only hosting fee/transition conditions if booking is discontinued. No cancellation penalties or contract durations were invented.
6. Confirm tax treatment and any third-party costs in the final commercial proposal. No tax assumption is presented as approved.
7. Provide an approved business WhatsApp number and official company social URLs if they should be published.
8. Deploy through the existing Cloudflare configuration when ready. Analytics remains off unless configured. Lighthouse scores and a formal WCAG audit have not been claimed.

## Local commands

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## Validation

Validation of the final source and production output:

- Final `npm run check`: 43 files, zero errors, warnings, or hints.
- Final `npm run build`: success, 30 generated pages (26 indexable locale pages plus the redirect/error pages).
- Generated-HTML audit: 896 local link/asset targets checked; no missing targets. All 26 indexable pages have unique titles/descriptions, expected canonicals, three hreflang links, translated language attributes, social metadata, one h1, and no duplicate IDs.
- Sitemap: 26 URLs, including both pricing pages, with locale alternates.
- Browser checks verified desktop/mobile layouts, menu Escape behavior, theme switching/persistence, translated form errors, pricing numbers, ten pricing FAQs, and all four plan-to-service mappings. The locale-switch contact flow was explicitly verified with `?plan=web-bookings` retained.
- A route-wide responsive sweep ran 104 checks at actual widths 320, 768, 1024, and 1440. It identified a 4px tablet overflow on six home/product views caused by the new phone images. Flexible phone sizing and grid minimum-width rules were corrected. The pricing comparison's screen-reader text overflow was separately corrected and the 375px page width was reverified.
- The final targeted light-theme/tablet recheck was interrupted when the browser session timed out and disconnected; that final visual pass could not be completed. No final all-clear Lighthouse/WCAG score is asserted. Earlier dark-mode and pre-pricing responsive sweeps passed at their tested widths.
- The email app launch was blocked by browser security policy. The page generated its copyable draft and explicitly reported that no message had been sent. No email was transmitted.
- No configured lint command or existing test suite is present. No production dependency was added; temporary formatting tools were installed outside the project.

## Portfolio navigation behavior

Adapted the scroll behavior from `../portfolio/src/components/NavBar.tsx` while retaining Vaul's Astro implementation and brand styling. The header hides while scrolling down, returns while scrolling up, and adds a translucent blurred background after leaving the top. Keyboard focus keeps navigation visible. The mobile menu is a native fullscreen dialog with focus containment, scroll locking, Escape/close-button handling, and focus restoration.

Browser checks verified hide/show scroll direction, 20px blur, a fullscreen menu at 375px with no horizontal overflow, body scroll lock, and Escape restoring focus to the menu toggle. Reduced motion remains respected. Only the shared Header implementation changed for this request.

The fullscreen menu now animates its entry and exit over 500ms with an ease-in-out slide. The native dialog remains open throughout exit so focus containment and scroll locking are preserved until the animation finishes. Menu strokes morph into an X, theme icons rotate/fade between sun and moon, and desktop links have animated underlines. Reduced-motion uses an immediate menu transition. Browser verification observed the dialog's intermediate exit transform and confirmed closure, scroll restoration, and focus restoration after the animation. Type checking and production build pass.

## Illustrative stock photography

At the owner's request, two Unsplash stock photographs now complement the real project images: a development workspace on the home approach section and a planning desk on About. Credits, sources, and the checked license are recorded in `docs/STOCK-PHOTOS.md`; each figure is labeled illustrative. Local responsive WebP assets avoid runtime third-party image requests. Both affected routes were checked in English and Spanish at 375px with no horizontal overflow. Type checking and production build pass.

### Regional pricing

Fixed rates are centralized in `src/data/pricing.ts`: COP values unchanged; USD initial/monthly rates are 109/7, 219/14, and 279/29. Both the homepage preview and pricing comparison use a shared currency selector. Manual selection persists in localStorage and overrides geolocation. Plan links retain the currency in the contact form and language switch; email drafts include the proposal currency.

Cloudflare Pages Function `functions/api/country.js` exposes only `request.cf.country` through `/api/country`, with `private, no-store`. CO selects COP; other valid countries select USD; unavailable data, timeouts, and errors retain COP. Local Astro development defaults to COP because it has no Cloudflare metadata. No third-party geolocation calls or exchange-rate conversions. Privacy copy describes country detection and browser storage.

Deploy the repository through Cloudflare Pages Git integration or Wrangler so the root `functions` directory is included. Uploading only `dist` through the dashboard does not include Pages Functions. No deployment was performed. Reference: https://developers.cloudflare.com/pages/functions/get-started/

### Shared dropdown styling

All four selects (pricing currency, contact service, proposal currency, and plan) now use the shared `src/lib/dropdowns.ts` enhancement and theme-aware styles. Native selects remain the form value source, with a native fallback when JavaScript is unavailable. The enhanced combobox supports arrows, Home/End, Enter/Space, Escape, Tab, typeahead, selected markers, outside dismissal, and opening above the trigger when space is limited. Contact validation focuses the enhanced trigger. Verified currency changes, plan/service synchronization, and no horizontal overflow at 375px.

### Site motion

Shared `src/lib/motion.ts` adds one-time viewport entrances with staggered hero text, cards, process steps, and media. Uses IntersectionObserver and Web Animations (opacity/transform); content is visible without JavaScript. Nested reveal containers are excluded. Active entrances cancel when reduced-motion is enabled. The hero phone has a slow 9px float, paused offscreen and disabled by reduced-motion CSS. Cards lift on devices with hover; button/link arrows move on hover. Check/build pass. Browser confirmed hero opacity settles at 1 with no transform, float runs when visible, and homepage has no horizontal overflow at 375px.

Motion refinement: replaced individual staggered slide/scale reveals with grouped opacity-only fades. Reveal observers start before sections enter the viewport; no entrance delays or translation. Card/button hover no longer lifts content. Phone drift reduced to 3px over 10 seconds. Browser verified no transform on headline, hero text, or showcase.

Text motion follow-up: added explicit targets for titles, introductory paragraphs, eyebrows, action buttons and links. Text/group reveals now fade from transparent with a 3px-to-zero blur over one second, without translation. Only the outer selected group animates to avoid duplicate effects. Trigger changed to viewport intersection (8%), making text entrances perceptible rather than completing before arrival. Browser confirmed active blur/opacity on the Services heading group and cards.

Reveal flash fix: an inline head script enables the initial hidden state before first paint. The module marks only outer reveal groups, then switches to the initialized state atomically. Each group stays at opacity 0 until its observer starts the entrance, so it no longer appears, disappears, and reappears. No-JS/reduced-motion users retain visible content; a five-second fallback restores visibility if the module fails to load. Browser confirmed pending Services text and card groups have opacity 0 before intersection.

### Approved logo assets

Integrated the three user-supplied SVG symbols: color in the light header, black in the light footer, and white for dark mode and the mobile menu. `Logo.astro` pairs the symbol with the Vaul Software name. Normalized copies in `public/images/brand` adjust only the viewBox to remove export whitespace; original SVGs remain intact. The supplied color symbol replaces the provisional favicon. Verified theme switching and no horizontal overflow at 375px.

### Updated commercial plans

Owner-approved COP launch proposal: Landing Esencial from 600,000 + 29,000/month; Landing Profesional 1,190,000 + 39,000/month; Web + Reservas from 1,990,000 + 89,000/month. Approved USD rates: 169/9, 329/11, 549/25. Automation and custom software are separately quoted for development and recurring service. Essential scope is one page, at most five sections, responsive business/services information, WhatsApp, conditional contact delivery service, basic SEO, publication and two revision rounds. Explicit exclusions and basic-support restrictions are shown. Essential base COP payment is 300,000 upfront and 300,000 before publication; monthly billing begins at activation. Professional content/design scope remains defined per proposal. Old web-presence enquiry URLs map to Landing Esencial. Verified five plan options, USD prices, contact mapping, and 375px layout; check/build passed.

PlayZone VIP framework corrected to Astro in shared project data and both legacy locale work messages following owner confirmation. No Next.js attribution remains in site sources.

### Contact sending and landing differentiation

Added `LandingGuide.astro` with practical Essential/Professional use cases, differences in design/content work, client-supplied materials and scope boundaries. Professional section counts remain proposal-defined. Both languages explain exclusions from monthly support and separately quoted copywriting/photography/branding.

Replaced mailto-only submission with POST `/api/contact` and a server-side Resend integration. Confirmed recipient: hello@vaulsoftware.com. Added server validation, honeypot, origin restrictions, timeout/error handling, optional rate-limit binding, and updated privacy text. Failed sends retain entries and expose a copyable draft/email fallback. Four mocked backend tests pass; browser verified local failure preserves data and reports no success. Real delivery remains pending private provider configuration, deployment and inbox verification; see CONTACT-SETUP.md. This supersedes the earlier mailto-only implementation notes.
