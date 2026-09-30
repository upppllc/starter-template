# Classhelm studio website integration

This starter uses published `classhelm` entry points. Read the installed package README for manager inputs, canonical schemas and extension APIs. Do not import paths inside its `dist`, copy the package source, or add aliases for retired routes.

## Identity and configuration

`src/lib/server/member-site.js` reads private environment configuration and creates one stateless adapter bound to the exact studio slug. The hook restores each request's studio cookies into locals. These locals are display context, not a grant of authority: every private upstream operation is authorized again by Classhelm.

Global Classhelm accounts, scoped studio workspace accounts and studio-member accounts are separate boundaries. This starter uses only studio-member cookies. A global account cookie, Authorization header, another studio's cookie or a caller-supplied organization must never substitute for them.

The shared adapter controls namespaced HttpOnly cookies, expiry/refresh rotation, bounded reads, allowed methods, same-origin actions and safe account receipts. Authenticated reads in one request stay sequential to avoid competing refresh rotations.

Only public configuration (configured flag, studio slug and canonical navigation URLs) and projected display identity enter layout data. Never return the private API configuration, access/refresh tokens, email-code capabilities, fingerprints or secrets.

## Fixed routes

| Website route | Existing shared boundary |
| --- | --- |
| POST `/api/member/session/[action]` | Adapter's named login/logout/signup/activate/confirm-code/password actions |
| GET/PATCH `/api/member/experience` | `create_member_experience_site_handlers`, strict canonical goal/role payload and owner/studio checks |
| GET `/api/member/goal-options` | Same factory; authenticated studio choices, revision, and challenge visibility |
| GET `/api/member/class-feedback` | Same factory; validated cursor only |
| PUT `/api/member/class-feedback/[booking_id]` | Same factory; validated booking identity, text/rating and matched receipt |

Writes carry `content-type: application/json`, the same-origin Origin and `x-classhelm-member-action: 1`. Shared managers supply the action header. Routes never read a browser bearer token or let the browser choose an upstream pathname.

The account loader projects profile display fields and obtains goals through the same canonical factory. A 401/403 stops rendering private account data; temporary section failures show an unavailable state. Unexpected upstream properties are discarded or rejected before browser serialization.

Role preferences hide presentation only. They do not grant/revoke permissions or narrow management's all-staff view. Feedback is private and Classhelm determines eligible completed attendance.

Goal options are configured by the studio in Classhelm and loaded through the fixed authenticated route. Pass `options_endpoint: "/api/member/goal-options"` to the shared experience manager. Do not hardcode a brand's goal tags or difficulty choices into the host; a text-only studio configuration is supported.

## Extend the member account

Compose existing package managers in `AccountPage/index.svelte.js`; render their thin views in `index.svelte`. For a full account use `MemberAccountDashboard` with canonical complete activity, current access and appropriate child managers. Never derive lifetime attendance, spendable credits or permissions from a bounded booking list.

Add a fixed host BFF route for each new private operation. Use the adapter's `organization_path` and `authorized_fetch`, an explicit method, canonical request/response validators and current owner checks. Never expose a catch-all proxy. For public schedule data, use the documented public Classhelm API and the studio's actual setup; classes and room-based appointment availability are distinct.

Keep a live identity/source getter in managers, clear private drafts on authoritative auth denial, cancel requests on identity change/unmount and discard stale receipts. Only render mutation success after validating the canonical receipt.

## Brand and launch

Use local studio fonts, imagery and copy with SvelteKit UI theme tokens. Check the library's 10px-root lengths versus 16px-initial media-query units. Keep proper library Button icons and native keyboard/control behavior.

Before production, replace privacy placeholder/copy/assets, choose canonical URLs/crawler rules, verify the studio's auth sender, set private server environment configuration and test authorized account/booking/payment flows. Add only approved public analytics paths to the existing filter.

A website deployment, a shared `classhelm` release and a native app release are independent. Update exact shared package pins from the registry, verify the host, then deploy from that host's source and record the commit/deployment.
