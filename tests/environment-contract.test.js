import assert from "node:assert/strict"
import test from "node:test"
import { variables } from "../src/env.js"
import { create_studio_server } from "../src/lib/server/studio.js"

test("all studio configuration remains optional and server-only", () => {
  for (const variable of Object.values(variables)) {
    assert.notEqual(variable.public, true)
    assert.deepEqual(variable.schema["~standard"].validate(undefined), { value: undefined })
    assert.deepEqual(variable.schema["~standard"].validate(""), { value: "" })
  }
})

test("absent and empty environment studio settings retain the unconfigured no-upstream boundary", async () => {
  for (const input of [undefined, ""]) {
    const organization_slug = variables.CLASSHELM_ORGANIZATION_SLUG.schema["~standard"].validate(input).value
    const server = create_studio_server({ organization_slug })
    assert.equal(server.public_config.configured, false)
    await server.restore({ locals: {}, fetch: () => assert.fail("An unconfigured studio must not contact an upstream") })
    const response = await server.handlers.experience.GET({ fetch: () => assert.fail("No upstream") })
    assert.equal(response.status, 503)
    assert.equal(response.headers.get("cache-control"), "private, no-store")
  }
})
