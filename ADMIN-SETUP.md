# Appistry website manager

Open `/admin` (redirects to the existing `/admin-secret123` URL). The reference Elite Qubit project was read only and remains unchanged.

## Editing

The dashboard replaces raw JSON with forms for pages/text, company/contact, services, apps, case studies, team, menus, counters, FAQs, testimonials, technology/process, blog, social links, WhatsApp, announcements, images, SEO and AI. Inbox and analytics have dedicated screens. Save persists to Firestore before reporting success. Discard restores the last loaded content. Navigation and browser-close warnings protect unsaved work.

Blog content is plain text. Published articles appear at `/blog` and `/blog/{slug}`. Add `/blog` to Menus when ready. Draft posts remain in the admin-only `siteContent/extras` document; only published posts are copied to `siteContent/extrasPublic`. Publish the supplied Firestore rules before using drafts.

## Required access setup

Keep existing NEXT_PUBLIC_FIREBASE_* values. In Firebase Authentication, enable email/password sign-in. Grant the owner account the Firebase custom claim `admin: true` using a trusted Firebase Admin SDK environment. This is the recommended option; it matches the included `firestore.rules` and server authorization.

Alternatively configure `NEXT_PUBLIC_ADMIN_EMAILS` and `ADMIN_EMAILS` with the same comma-separated list of verified owner emails, and update the rules' admin() predicate to check `request.auth.token.email_verified` and exactly those same emails. Client configuration alone never grants database permission. Do not use a rule that allows every authenticated user to write.

Deploy `firestore.rules` in the Firebase console after reviewing them against any other applications sharing this project. These rules do not deploy automatically. They restrict content writes to admins and deny direct browser access to the private inbox and analytics; those use authenticated server endpoints.

## Server connections

Set these on the Next.js host or in .env.local, then restart. Never commit secrets.

- `FIREBASE_SERVICE_ACCOUNT_JSON`: complete service-account JSON for this Firebase project, stored as a server secret. Required for contact inbox storage and analytics. The service account needs Firestore access.
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob token for image uploads. Uploads require an authorized Firebase admin token, accept JPEG/PNG/WebP/GIF, and are capped at 5 MB. Public image URLs also work without uploads.
- `GEMINI_API_KEY` and `GEMINI_MODEL`: server-only Gemini API credentials and an available model ID. The assistant is disabled by default and must also be enabled in the admin panel.

The server routes use the Node.js runtime and Node crypto. Deploy with `npm run build:next` / `npm run start:next` on a Node-compatible Next.js host. The existing Vinext/Cloudflare publishing path has not been verified for these new server integrations.

No keys were copied from Elite Qubit. No database writes, rule deployments, paid API requests or live publication were performed during implementation.

## Feature behavior

- Inbox: contact form validates and stores enquiries on the server. Success is returned only after Firestore accepts the write. Read/unread and archive/restore are supported. Email notifications are not configured.
- Analytics: disabled by default. Counts page views by UTC date and path, excludes signed-in admins, and stores no visitor profiles. Reports load up to 300 daily page records. These are page views, not unique visitors. The per-process rate limits are best effort; use an edge rate limiter for multi-instance hosting.
- AI: uses Google's generateContent REST API, with public site context and configurable instructions. Public requests are length/rate limited. This assistant does not perform actions, search private data or store chat history. Instructions are not a secret.
- SEO: saved per-page titles/descriptions are read by server metadata functions; published blog and case-study URLs appear in the sitemap. Site origin remains the deployment NEXT_PUBLIC_SITE_URL value.
- Images: the admin supports upload or public HTTPS URL. Photos render on the about page, team cards, blog and nature mockup.

## Checks and limits

Use `npm run typecheck`, targeted ESLint, and a Next production build. Browser/mobile and authenticated save/load checks require a connected browser and an authorized admin account. Test a content edit, reload, navigation, image upload, post draft/publication and contact inbox before launch. Connection badges report configured environment variables; they do not certify a successful external request.

Gemini REST reference: https://ai.google.dev/api/generate-content

## Configured owner

The local app allowlists `appistrytech@gmail.com` in both client and server environment settings. This account must have a verified email address in Firebase Authentication. The matching owner rule is prepared in `firestore.rules`; publish it in Firebase Console > Firestore Database > Rules before saving content. Local file changes do not deploy cloud rules. Restart the app after changing environment settings, then sign out and sign in again.
