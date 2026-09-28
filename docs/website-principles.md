# Shared website engineering and design principles

These are the established conventions for websites built with this starter and SvelteKit UI. Read them before changing a site's UI. Project-specific `AGENTS.md` instructions and the user's current request take precedence; preserve each site's brand and backend boundaries.

The canonical copy lives in `upppllc/starter-template`, at `docs/website-principles.md`. The site generator copies this document and `AGENTS.md` into new projects. Existing sites are independent copies: updating or publishing the library does not update their code or instructions automatically. When changing a shared rule, update the canonical document and deliberately refresh any project snapshots.

## Use the shared UI system

- Use Svelte 5, SvelteKit, and `sveltekit-ui` as the primary application UI system. Check the installed library's API before recreating a control that already exists.
- Use SvelteKit UI components and their managers for buttons, inputs, dropdowns, checkboxes, popovers, layout, and icons. Compose branded sections around them while preserving the controls' behavior and accessibility.
- Use `Button` for button-like actions, including navigation, tabs, disclosures, and icon actions. Create its `create_button_manager` in the owning feature manager. Use `html_type: "submit"` for form submission. Ordinary inline links in prose may remain links.
- Keep a Button's base `type` stable. Use `selected_type` for selected or partially selected state; do not replace that API with custom selected-button CSS.
- Put action arrows on the Button using `support_icon: "arrow_tailed"` and `icon_deg`; use proper Icon managers for decorative indicators. Do not use Unicode arrow characters as UI icons. For `arrow_tailed`, `-45` points up and right.
- Keep native focus, keyboard, disabled, busy, validation, and accessible-label behavior. Do not remove those behaviors when creating a site wrapper.

These are application conventions. The SvelteKit UI library itself necessarily implements native controls internally; do not rewrite a primitive to recursively use itself.

## Components render; managers own behavior

Use a named PascalCase component directory:

```text
src/routes/example/+page.svelte       route data and manager composition
src/lib/components/ExamplePage/
  index.svelte                       markup and scoped presentation
  index.svelte.js                    create_example_page_manager(config)
```

- Keep route views and component views thin. Views import components, accept props, render the manager, and connect lifecycle calls.
- Feature managers own reactive state, validation, formatting, requests, event handlers, page content, and child UI managers. Expose meaningful getters and methods to the view.
- Create child managers in the parent manager and pass them through `manager` props. Preserve stable manager identity for interactive repeated records.
- Pass changing route data and URL values through live getter callbacks. A component may remain mounted while navigation changes its input.
- Prefer derived values for computation and explicit handlers for actions. Use lifecycle cleanup for timers, listeners, browser resources, and pending requests. Application feature managers should not use effects to orchestrate requests or mutate derived state. Where a project has a tested source-synchronization helper, use that boundary.
- Create shared layout state per component/request and distribute it through Svelte context. Do not store mutable user or request state in a module-level server singleton. Read context during initialization, then use the captured manager in callbacks.
- Keep component-specific helpers and styles beside their component. Put genuinely shared code in feature or environment directories. A purely presentational component may omit an empty manager only where the project's architecture rules permit it.
- Use explicit routes and focused reusable page sections. Do not replace a site's page structure with an unrelated page-kind dispatcher.

## Theme through tokens and keep brand choices local

- Import `sveltekit-ui/style.css` once through the root layout. Use the library's Layout/theme manager and existing theme persistence rather than a second competing theme state.
- Set brand colors through the shared tokens, including `--primary-c` and `--primary-h`. Use adaptive `-t` tokens for normal surfaces, text, borders, and controls so light and dark themes remain coherent.
- Preserve the library's normal control sizes, padding, radius, type, and contrast. Scope site typography to site content so it does not accidentally restyle Button or theme-control internals. Fixed colors over photography are a deliberate contrast decision, not a replacement for the theme system.
- Keep theme tokens, font declarations, and common layout utilities in the project's global styling boundary; keep section-specific styling with its component.
- Preserve the library's existing root scale. With its 62.5% root size, ordinary `rem` lengths are based on 10 CSS pixels at the default browser setting, while `rem` in media queries uses the initial browser font size, normally 16 pixels. Do not apply the wrong conversion to breakpoints. Follow each site's documented precision and minimum text-size rules.
- Shared engineering does not mean identical brands. Do not copy another studio's fonts, colors, logo, wording, content, or commercial rules unless requested. Preserve each site's explicit default-theme policy and saved user choice.
- Verify changed responsive layouts in the browser, including narrow screens and the light/dark appearances affected by the change.

## Keep public presentation separate from authority

- Keep credentials, authorization, provider integrations, and secure mutations in server code. Browser managers do not establish identity, tenant access, prices, booking entitlement, or payment completion.
- For a Classhelm-connected studio site, Classhelm owns member identity, scheduling, bookings, commerce, staff operations, and transactional messages. Use its reviewed public/member APIs and shared `classhelm` package where applicable; the studio website owns marketing, branding, and its same-origin session adapter.
- Reuse the existing shared component or API boundary instead of copying operational business logic into each studio site. Preserve the independent Classhelm-account and studio-member credential boundaries.
- Keep private access/refresh tokens in the established secure HttpOnly session boundary. Never move provider secrets or service credentials into client-side code, page data, or this documentation.
- Keep files grouped by feature and execution boundary (`client`, `server`, shared/pure code, components), following the site's existing structure.

## Verify and deliver using the project's workflow

- Read the project's `package.json`, README, and `AGENTS.md` for actual commands. Use its existing architecture, server, component, and build checks relevant to the change. Do not invent script names or report tests that were not run.
- Browser-check behavior that depends on navigation, live managers, controls, theme, or layout. A successful build alone does not establish those behaviors.
- Follow the site's documented deployment workflow. Deployment rules differ: Ebb & Float requires its source-build deployment script, while Classhelm requires canonical production integration and verification. Do not replace either with a blanket deployment command from another project.
- Library/template releases and website deployments are separate. Pin/update the site's reviewed dependency and verify that site when adopting a shared package change.

## Where these conventions came from

Consolidated on 2026-09-28 from the SvelteKit UI README, Button/Icon APIs and theme stylesheet; this starter's README and request-scoped context manager; Classhelm's `AGENTS.md`, frontend architecture and manager tests; REWILD's component/library/architecture guides; Ebb & Float's `AGENTS.md`, component guide and architecture check; and the user's shared Button/icon terminology instructions.

Project-only details remain local: Classhelm's minimum text sizes and backend/release requirements, Ebb's CSS precision and source-deployment safeguards, REWILD's storefront boundary, and each library/package's release process. Historical examples may predate these consolidated rules; do not treat old markup as a reason to bypass the current instructions.
