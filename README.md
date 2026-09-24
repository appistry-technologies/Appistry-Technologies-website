# Appistry Technologies

A mobile-first marketing website with Next.js App Router + TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, next-themes, React Hook Form, and Zod.

## Run

Use the pnpm version declared in package.json. `pnpm install --frozen-lockfile`, then `pnpm dev`. `pnpm build` builds for the included Sites/Cloudflare runtime (Vinext, which implements Next.js App Router APIs). For standard Next.js hosting: `pnpm dev:next`, `pnpm build:next`, and `pnpm start:next`. The standard Next.js production build was also verified (`next build --webpack`); the supplied publication uses Vinext.

## Edit content

- `content/site.ts`: company name, tagline, description, contact channels, navigation, factual process statistics, story, values, team, FAQ, canonical URL.
- `content/services.ts`: service cards, anchors, capabilities, deliverables, technology and timelines.
- `content/apps.ts`: apps, platforms, categories, ratings, downloads and verified store links. Null store links stay unavailable.
- `content/work.ts`: projects, slugs, challenge, approach, outcomes and metrics.
- `content/testimonials.ts`: approved attributable client quotes. Empty by default; the two-row marquee activates when populated.
- `content/technology.ts`: technology filters and process stages.
- `app/globals.css`: shared colours, sizing, spacing and responsive layout. `--primary` is the one brand accent; edit both dark and light values for accessible contrast.
- `app/layout.tsx`: locally hosted Space Grotesk headings and Inter body via next/font/local. Font files are in `app/fonts/`.
- `content/copy.ts`: section headlines, descriptions and interface labels grouped by page/component.
- `public/images/`: local photos and technology marks. `components/site/phone.tsx` contains the three coded concept interfaces.
- `app/opengraph-image.tsx`: social preview artwork. `lib/seo.ts` and route metadata: page titles, descriptions and canonical metadata.

## Before public launch

1. Replace concept apps/case studies with authorised shipped work. Add verified app-store URLs, metrics, ratings, client testimonials, team portraits and office photographs. No fictitious results or endorsements are presented as fact.
2. Set verified email, phone and WhatsApp values in `content/site.ts`. The map intentionally identifies Lahore, not an invented office address.
3. Implement the clearly marked email TODO in `app/api/contact/route.ts`, configure server-only secrets, and test provider success/failure. Until then the route returns 503 and the interface clearly states the enquiry was not sent. Never return success before provider acceptance.
4. The in-memory rate limit is best-effort per Worker isolate (5 attempts/15 minutes); use a shared edge limiter or durable store for distributed enforcement. Trust only IP headers injected by your hosting proxy. Unknown-IP traffic shares a fallback bucket.
5. Set `NEXT_PUBLIC_SITE_URL` to your final origin before building. Review sitemap, robots and metadata. The CSP permits inline framework hydration; tighten with a nonce-based policy if required. Server-backed rendering and theme bootstrapping require a compatible CSP.
6. Run Lighthouse and keyboard/mobile QA on your final origin and real content. 90+ is a target, not a measured guarantee. Check WCAG AA after brand colour changes. TypeScript and both production builds passed, alongside 12 contact API checks. No browser or Lighthouse audit was run in this delivery.

## Form security

Server-side Zod validation, same-origin check, streaming body size cap, honeypot, bounded per-isolate rate limiter, no message logging, no-store responses. All form input remains escaped React text. User text must be escaped again by a future HTML email sender.

## Images

Mountain lake: illustrative Unsplash landscape (https://unsplash.com/s/photos/mountain-snow); photographer unverified. Workspace: illustrative image, not Appistry’s office; Annie Spratt / Unsplash (https://unsplash.com/photos/a-room-with-a-desk-chair-shelves-and-a-potted-plant-jKkjx66m0FQ). Replace with owned or licensed original company photography for launch. Technology marks are Simple Icons; they identify supported tools and do not imply endorsement.
