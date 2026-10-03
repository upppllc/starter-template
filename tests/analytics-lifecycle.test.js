import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import { public_page_analytics } from "../src/lib/site/analytics.js"

function fixture() {
  const source = readFileSync(new URL("../src/lib/site/analytics-lifecycle.svelte.js", import.meta.url), "utf8")
    .replace(/^import[^\n]+\n/gmu, "").replace("export function", "function")
  let navigate
  const page = { url: new URL("https://studio.example.test/account") }
  const injections = [], views = []
  const register = new Function("afterNavigate", "page", "dev", "inject", "pageview", "public_page_analytics", `${source};return register_site_analytics`)(
    callback => { navigate = callback }, page, false,
    config => injections.push(config), view => views.push(view), public_page_analytics,
  )
  register()
  return { injections, views, navigate(path) { page.url = new URL(path, "https://studio.example.test"); navigate() } }
}

test("template analytics initialize once for home and never queue private paths or URL parameters", () => {
  const context = fixture()
  for (const path of ["/account?token=private", "/sign-in?email=private", "/privacy", "/api/member/experience"]) context.navigate(path)
  assert.deepEqual(context.injections, [])
  assert.deepEqual(context.views, [])
  context.navigate("/?token=private#secret")
  assert.equal(context.injections.length, 1)
  assert.equal(context.injections[0].disableAutoTrack, true)
  assert.equal(context.injections[0].beforeSend, public_page_analytics)
  assert.deepEqual(context.views, [{ route: "/", path: "/" }])
  context.navigate("/account")
  context.navigate("/")
  assert.equal(context.injections.length, 1)
  assert.deepEqual(context.views, [{ route: "/", path: "/" }, { route: "/", path: "/" }])
})
