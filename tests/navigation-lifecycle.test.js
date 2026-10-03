import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import { compileModule } from "svelte/compiler"
import * as runtime from "svelte/internal/server"

function factory(component, name, dependencies) {
  const source = readFileSync(new URL(`../src/lib/components/${component}/index.svelte.js`, import.meta.url), "utf8")
  const code = compileModule(source, { generate: "server" }).js.code.replace(/^import[\s\S]*?;\n/gmu, "").replace(/^export /gmu, "")
  const environment = { $: runtime, ...dependencies }
  return new Function(...Object.keys(environment), `${code};return ${name}`)(...Object.values(environment))
}

test("sign-in preserves its fixed endpoint and account route using the current navigation options", async () => {
  const navigations = []
  const create = factory("SignInPage", "create_sign_in_page_manager", {
    create_member_account_access_manager: config => config,
    goto: async (...args) => navigations.push(args),
  })
  let data = { studio_config: { configured: true, organization_slug: "teststud" }, studio: { name: "Test studio" }, initial_mode: "signin" }
  const manager = create({ data: () => data })
  assert.equal(manager.access.endpoint, "/api/member/session")
  assert.equal(manager.access.identity(), "teststud")
  data = { ...data, initial_mode: "signup" }
  assert.equal(manager.access.initial_mode(), "signup")
  await manager.access.on_signed_in()
  assert.deepEqual(navigations, [["/account", { refreshAll: true, replace: true }]])
})

test("sign-out waits for member saves, handles an empty success response, then clears the same owner", async () => {
  const requests = [], navigations = []
  let saving = true, refreshes = 0
  const child = config => config
  const create = factory("AccountPage", "create_account_page_manager", {
    create_button_manager: child,
    create_member_account_header_manager: child,
    create_member_profile_summary_manager: child,
    create_member_experience_manager: config => ({ ...config, get saving() { return saving } }),
    create_member_class_feedback_manager: config => ({ ...config, saving: false }),
    refreshAll: async () => { refreshes++ },
    goto: async (...args) => navigations.push(args),
    fetch: async (...args) => { requests.push(args); return new Response(null, { status: 204 }) },
  })
  const data = { member: { id: "00000000-0000-4000-8000-000000000001" }, experience: { goals: { status: "skipped" } }, studio_config: { configured: true, organization_slug: "teststud", studio_href: "https://studio.example.test/" } }
  const manager = create({ data: () => data })
  await manager.experience.on_saved()
  assert.equal(refreshes, 1)
  const sign_out = manager.header.actions.find(action => action.key === "sign-out").manager
  await sign_out.on_click()
  assert.equal(requests.length, 0)
  saving = false
  await sign_out.on_click()
  assert.equal(requests.length, 1)
  assert.equal(requests[0][0], "/api/member/session/logout")
  assert.equal(requests[0][1].headers["x-classhelm-member-action"], "1")
  assert.equal(manager.experience.identity(), null)
  assert.deepEqual(manager.header.profile(), {})
  assert.deepEqual(navigations, [["/", { refreshAll: true, replace: true }]])
})
