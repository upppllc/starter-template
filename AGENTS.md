# Website instructions

Read [shared website principles](docs/website-principles.md) before editing this project. This document and `AGENTS.md` are part of the starter so generated sites receive the same conventions.

- Use SvelteKit UI as the primary UI system. Application actions use its `Button`; use its managers and proper icons, never Unicode arrow icons.
- Keep views and routes thin. State, requests, validation, and child controls belong in paired `index.svelte.js` managers; pass live data getters and keep shared state request-scoped.
- Use the existing Layout/theme manager and adaptive tokens; preserve the site's brand and the library's native control behavior.
- Read [README.md](README.md) for setup, verification, optional integrations, and the separate template/CLI release processes. Do not interpret sample newsletter content or placeholders as a product requirement.
- Spell the product **Classhelm** in prose; preserve established machine identifiers.

When adding project-specific instructions, keep the shared reference and record intentional exceptions locally.
