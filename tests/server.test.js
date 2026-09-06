import assert from "node:assert/strict"
import test from "node:test"
import { handle } from "../src/hooks.server.js"
import { createContibaseClient, parseNewsletterSubscriber } from "../src/lib/server/contibase.js"

const configured_env = {
  CONTIBASE_ACCESS_TOKEN: "test-token",
  CONTIBASE_USERS_TABLE_ID: "table-id",
}

const httpError = (status, message) => (error) => {
  assert.equal(error.status, status)
  if (message) assert.match(error.body.message, message)
  return true
}

test("theme cookies cannot inject HTML attributes", async () => {
  for (const [cookie, expected] of [
    [undefined, "dark"],
    ["light", "light"],
    ["dark", "dark"],
    ['dark\" onload=\"alert(1)', "dark"],
  ]) {
    const html = await handle({
      event: { cookies: { get: () => cookie } },
      resolve: async (_event, { transformPageChunk }) => transformPageChunk({ html: '<html data-theme="">' }),
    })
    assert.equal(html, `<html data-theme="${expected}">`)
  }
})

test("newsletter input trims values and supports an omitted first name", () => {
  assert.deepEqual(parseNewsletterSubscriber({ email_address: "  user@example.com  ", first_name: "  Ada  " }), {
    email_address: "user@example.com",
    first_name: "Ada",
  })
  assert.deepEqual(parseNewsletterSubscriber({ email_address: "user@example.com" }), {
    email_address: "user@example.com",
    first_name: null,
  })
})

test("newsletter input rejects invalid shapes, coercible emails, and oversized fields", () => {
  for (const body of [
    null,
    [],
    "user@example.com",
    { email_address: ["user@example.com"] },
    { email_address: "invalid" },
    { email_address: `${"a".repeat(255)}@example.com` },
    { email_address: "user@example.com", first_name: {} },
    { email_address: "user@example.com", first_name: "a".repeat(101) },
  ]) {
    assert.throws(() => parseNewsletterSubscriber(body), httpError(400))
  }
})

test("an unconfigured newsletter returns 503 before making a network request", () => {
  for (const env of [{}, { ...configured_env, CONTIBASE_ACCESS_TOKEN: " " }, { CONTIBASE_ACCESS_TOKEN: "token" }]) {
    assert.throws(
      () => createContibaseClient(env, () => assert.fail("Unexpected network request")),
      httpError(503, /not configured/)
    )
  }
})

test("Contibase requests preserve the row payload and encode the table ID", async () => {
  const row_data = { email_address: "user@example.com" }
  const contibase = createContibaseClient({ ...configured_env, CONTIBASE_USERS_TABLE_ID: "table/id" }, async (url, init) => {
    assert.equal(url, "https://www.contibase.com/api/v1/tables/table%2Fid/rows")
    assert.equal(init.method, "POST")
    assert.equal(init.headers.authorization, "Bearer test-token")
    assert.equal(init.headers["content-type"], "application/json")
    assert.deepEqual(JSON.parse(init.body), { row_data })
    return Response.json({ row: row_data })
  })
  assert.deepEqual(await contibase("/rows", { method: "POST", body: { row_data } }), { row: row_data })
})

test("upstream JSON error messages are read from the response body", async () => {
  const contibase = createContibaseClient(configured_env, async () => Response.json({ message: "Table unavailable" }, { status: 503 }))
  await assert.rejects(contibase(), httpError(502, /Table unavailable/))
})

test("confirmation updates accept a successful empty upstream response", async () => {
  const contibase = createContibaseClient(configured_env, async () => new Response(null, { status: 204 }))
  assert.equal(await contibase("/rows/user-id", { method: "PUT", expectJson: false }), null)
})

test("invalid upstream JSON and network failures produce controlled errors", async () => {
  for (const fetch of [
    async () => new Response("<html>Bad gateway</html>", { status: 502 }),
    async () => new Response("not JSON"),
    async () => Response.json(null),
    async () => { throw new Error("Private connection detail") },
  ]) {
    const contibase = createContibaseClient(configured_env, fetch)
    await assert.rejects(contibase(), (error) => {
      assert.equal(error.status, 502)
      assert.doesNotMatch(error.body.message, /Private connection detail/)
      return true
    })
  }
})
