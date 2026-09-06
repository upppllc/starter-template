# SvelteKit website starter

A Svelte 5 / SvelteKit starter using [sveltekit-ui](https://www.sveltekit-ui.com), with a Vercel adapter, theme toggle, example components, and an optional Contibase newsletter integration.

## Start a website

Use Node.js 24 (the version in `.nvmrc` and the Vercel runtime). The dependencies require at least Node.js 22.12.

```bash
npx create-sveltekit-ui-site@latest my-project
cd my-project
npm install
npm run dev
```

Open the local URL printed by Vite. `code .` opens the folder in VS Code if you use it.

The public `create-sveltekit-ui-site` npm package downloads `upppllc/starter-template` from GitHub and replaces the app-name placeholders. It creates local files; it does not publish or deploy your website. When copying this template manually, update the package name and replace `__APP_NAME__` in the source files and `static/site.webmanifest`.

For an existing SvelteKit project that only needs the component library, run `npm install sveltekit-ui` instead.

## Commands

```bash
npm run dev          # Local development
npm run check        # Svelte diagnostics (fails on warnings)
npm run check:watch  # Continuous Svelte diagnostics
npm test             # Regression tests, with mocked external requests
npm run build        # Production build and Vercel output
npm run preview      # Preview the production build locally
npm run verify       # Check, test, and build
```

`npm install` generates SvelteKit's local configuration through the `prepare` script. Commit `package-lock.json`; use `npm ci` for reproducible installs. This is a JavaScript starter: `check` checks Svelte diagnostics, while full JavaScript type checking remains opt-in through `checkJs` in `jsconfig.json`.

## Optional newsletter setup

The website can run and build without a `.env` file. To use the newsletter, copy `.env.example` to `.env` and set:

```dotenv
CONTIBASE_ACCESS_TOKEN=
CONTIBASE_USERS_TABLE_ID=
```

Keep the token private. Configure the same variables in your deployment environment. The sample uses a Contibase table with `first_name`, `email_address`, `epoch_subscribed`, `tags`, and `epoch_email_address_confirmed` fields. Without configuration, newsletter and confirmation requests return a readable unavailable message.

The confirmation route is an example that uses a row ID in the link. Before using email confirmation for authentication or other sensitive actions, replace it with an expiring, single-use token flow. Sending welcome/confirmation emails must be configured separately.

If a website does not need a newsletter, remove the `NewsletterSubscribe` import and section in `src/routes/+layout.svelte`, along with its routes and manager.

## Customize the starter

- Edit the home page in `src/routes/+page.svelte` and `src/lib/components/HomePage/`.
- Set navigation in `src/lib/components/MainNav/index.svelte`; `/test` is a removable example route.
- Replace the logo, favicons, social thumbnails, and manifest in `static/`. Update the page titles and metadata for the new website.
- Review the example Contibase attribution and social link in `src/routes/+layout.svelte`.
- Add your own description and social preview metadata in the page's `<svelte:head>` block.

The layout creates its own UI manager and shares it with descendants using Svelte context. In a child component or manager created during component initialization, call `get_global_manager()` from `$lib/client/index.svelte.js` once, then use the returned manager in event callbacks. This keeps state separate between server requests.

For favicon assets, [SVGOMG](https://jakearchibald.github.io/svgomg/) can optimize SVGs and [RealFaviconGenerator](https://realfavicongenerator.net/) can generate the icon set. Replace `favicon.svg` and `favicon-inactive.svg` to customize active and inactive browser tabs.

## Update dependencies

```bash
npx npm-check-updates -u
npm install
npm audit
npm run verify
```

Review major upgrades before committing. The scoped `cookie` override in `package.json` keeps SvelteKit's transitive dependency on a patched release; remove it when SvelteKit's own dependency range includes that fix.

## Template maintenance and releases

Changes to this template reach new projects after they are pushed to the `upppllc/starter-template` GitHub repository. Changes to the separate `create-sveltekit-ui-site` CLI require a new npm release; see that project's README. This website starter is marked `private` to prevent accidental npm publication.

Existing websites are independent copies. Updating the template or CLI does not automatically change them.
