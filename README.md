# Classhelm studio starter

A neutral Svelte 5 / SvelteKit 3 website using SvelteKit UI and the published `classhelm` package. The website owns its brand and public content; Classhelm owns studio identity, services, scheduling, bookings, payments and staff access.

Requires Node.js 24; the app's engine and `.nvmrc` use Node 24, matching its Vercel runtime.

## Create and run

```sh
npx create-sveltekit-ui-site@latest my-studio
cd my-studio
npm install
cp .env.example .env
npm run dev
```

Set `CLASSHELM_ORGANIZATION_SLUG` in `.env` to your studio's exact eight-character Classhelm slug. The empty default makes no upstream requests: marketing renders, studio buttons are disabled, and account endpoints return a controlled 503.

The default API origin is `https://www.classhelm.com`. `CLASSHELM_API_ORIGIN` is private server configuration; use another origin only for a trusted Classhelm development backend. An optional `CLASSHELM_STOREFRONT_SHARED_SECRET` must be issued for that studio and stay server-only. Account email setup and sender verification happen in Classhelm.

No Supabase service key, npm token or real organization/member identity belongs in this repository.

## Included example

- Public home page, request-scoped Layout manager, light/dark theme and proper SvelteKit UI action controls.
- Shared `MemberAccountAccess`: password sign-in, account creation, email-code activation and password reset.
- Shared account header/profile, optional goals and work-tool visibility, and private completed-class feedback.
- A fixed studio server adapter with scoped HttpOnly cookies, same-origin mutation checks, canonical response validation, owner checks and bounded upstream reads.
- Schedule and Studio on Classhelm actions open that studio's existing Classhelm pages. The starter does not fabricate available services or reservation receipts.
- Public-only analytics: only the approved home page is collected, with queries, fragments and extra properties stripped.

The account example is deliberately small. Add subscriptions, credit transfers, bookings, profile editing and the full `MemberAccountDashboard` from the published package when needed; keep authoritative data and mutation policy in Classhelm. [Integration guide](docs/classhelm-integration.md) explains these boundaries.

## Customize

Edit `src/lib/site/content.js` for public studio copy. Replace the generic favicon/wordmark and add studio-owned imagery or licensed fonts locally. Brand choices must not affect Classhelm or another studio.

The privacy page is an explicit placeholder. Replace it with the studio's actual notice before enabling public account creation. All pages and `robots.txt` default to no indexing; review privacy, public metadata, canonical domain and crawler rules before launching. Never enable analytics on sign-in, account or member API routes.

The navigation and page components have paired managers. Components receive live data getters; server session tokens never enter page data, client managers, localStorage or browser responses.

## Verify

```sh
npm ci
npm run verify
npm audit
```

`verify` runs Svelte checks (warnings fail), Node tests and the production build. Tests exercise the installed shared server adapter and host account loader with controlled fictitious identities, including cookie flags, CSRF/action headers, wrong studio/owner receipts, private cache headers and feedback pagination. No real account or database writes are needed.

Also verify the generated website in a browser at wide/narrow widths, both themes, sign-in/account navigation and unavailable/error states. A configured integration should be tested against an authorized development studio. Do not infer successful booking or payment from a selected time or an opened checkout link.

Dependency updates start with `npx npm-check-updates -u`, then ordinary `npm install`, audit and verification. The update configuration selects the latest versions compatible with installed/upgraded peer requirements and the Node engine. TypeScript 7 is published, but the current SvelteKit/checker peer ranges support TypeScript 6, so the compatible version remains 6.0.3. Do not bypass peer requirements with `--force` or `--legacy-peer-deps`. The brace-expansion override addresses a compatible upstream dependency fix. Analytics is pinned to the reviewed generic 1.3.2 API while the latest framework adapter still excludes SvelteKit 3; the update configuration preserves that pin.

## Project structure

```text
src/lib/site/content.js              Studio-owned public content
src/lib/client/index.svelte.js       Request-scoped layout/navigation managers
src/lib/components/*                Thin views with paired managers
src/env.js                          Explicit optional private environment declarations
src/lib/server/member-site.js        Private studio adapter configuration
src/lib/server/studio.js             Shared adapter composition and account reads
src/routes/api/member/*              Fixed thin session/settings/feedback handlers
docs/website-principles.md           Shared agent conventions
docs/classhelm-integration.md        Host boundaries and extension instructions
```

Read [AGENTS.md](AGENTS.md) and [website principles](docs/website-principles.md) before implementation.

## Releases

The template and generator are separate repositories and releases:

1. Verify, commit and push this template to `main` in `upppllc/starter-template`. Future generator runs download that branch.
2. Verify and pack `create-sveltekit-ui-site`, commit its changes, then prepare a reviewed npm version and publish with the package owner's authentication.
3. Generate a fresh project with the released command; install, verify and browser-check it.

This template package is private and is not published to npm. Publishing the generator does not publish or deploy a studio. For a new website, create its own Git repository, Vercel project, domains and private environment configuration. Do not carry over another studio's project link or credentials.

SvelteKit 3 options live in `vite.config.js`; `#lib` imports are explicit package aliases. Analytics are registered through the public-only navigation lifecycle and never queue private paths or URL parameters. The reviewed SvelteKit UI version is 1.1.87.
