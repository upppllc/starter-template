# SvelteKit UI starter

Read docs/website-principles.md and README.md before editing.

- Use SvelteKit UI components and paired reactive managers; keep routes and views thin.
- Use Button for actions and navigation, with proper library icons. Use support_icon: "arrow_tailed" and icon_deg for arrows, never text arrow glyphs.
- Create layout and shared state per request/component through Svelte context. Preserve live data getters, cleanup and native keyboard/accessibility behavior.
- Keep brand choices in local copy/assets and adaptive theme tokens.
- This is a provider-free UI starter. Add backend integrations in their dedicated starters; do not add another platform's account/runtime source here.
- Do not copy credentials, real account identities, project links or dependency/build output into generated sites.
- Verify with npm run verify and check wide/narrow layouts and both themes. Template, CLI publication and site deployment are separate releases.
- Spell Classhelm correctly when referring to historical integrations; preserve existing machine identifiers.
