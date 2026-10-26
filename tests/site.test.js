import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import { compileModule } from "svelte/compiler"
import { transform_theme, secure_site_response } from "../src/lib/server/site-response.js"

test("theme cookies are constrained before server HTML substitution", () => {
  assert.equal(transform_theme('<html data-theme="">', "dark"), '<html data-theme="dark">')
  assert.equal(transform_theme('<html data-theme="">', 'dark" onload="bad'), '<html data-theme="light">')
})
test("public responses keep safe content and referrer headers", () => {
  const response = secure_site_response(new Response("ok"))
  assert.equal(response.headers.get("x-content-type-options"), "nosniff")
  assert.equal(response.headers.get("referrer-policy"), "strict-origin")
})
test("the generic starter has no provider dependency or credential requirement", () => {
  const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)))
  assert.deepEqual(Object.keys(manifest.dependencies), ["sveltekit-ui"])
  const environment = readFileSync(new URL("../.env.example", import.meta.url), "utf8")
  assert.doesNotMatch(environment, /^[A-Z_]+=./mu)
})
test("the home manager reads current route data after navigation", () => {
  const source = readFileSync(new URL("../src/lib/components/HomePage/index.svelte.js", import.meta.url), "utf8")
  const code = compileModule(source, { generate: "server" }).js.code.replace(/^import[^\n]*\n/gmu, "").replace(/^export /gmu, "")
  const create = new Function("create_button_manager", `${code};return create_home_page_manager`)(config => config)
  let data = { site: { name: "first" } }
  const manager = create({ data: () => data })
  data = { site: { name: "second" } }
  assert.equal(manager.site.name, "second")
  assert.equal(manager.start_button.href, "#features")
})
