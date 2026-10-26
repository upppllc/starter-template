# SvelteKit UI starter

A provider-free Svelte 5 / SvelteKit 3 website using the published sveltekit-ui package. It includes a request-scoped layout, light/dark theme, navigation, responsive public sections and an error/privacy page. It includes no account service, analytics, database or provider credentials.

Requires Node 24.22.1 or later within Node 24. TypeScript stays on version 6 because the installed Svelte tooling supports that peer range.

```sh
npm ci
npm run dev
npm run verify
```

Edit src/lib/site/content.js and local brand assets. Keep views thin and behavior in their paired managers. Replace the privacy placeholder and review noindex metadata/robots.txt before launch. Read AGENTS.md and docs/website-principles.md.

## Ownership

The local checkout is sveltekit-ui-all/sveltekit-ui-starter. Its existing Git history and remote upppllc/starter-template are preserved. The sibling create-sveltekit-ui-site CLI generates this UI-only project. Vuoma studio integration lives separately in vuoma-all/vuoma-starter; the Contibase server API example lives in contibase-all/contibase-starter.

Template and CLI releases are coordinated but separate: verify this checkout, verify a generated site with the CLI's --template option, push the reviewed template, verify the remote template, then publish the reviewed CLI. No remote change, npm publication or deployment happens automatically. Existing published CLI versions fetch remote main, so the template update must be reviewed for those callers too.

The starter package is private and is not published to npm. The existing remote name may be renamed separately after updating its callers; folder organization does not rename it.
