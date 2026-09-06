import { error } from "@sveltejs/kit"

export function parseNewsletterSubscriber(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    error(400, "Request body must be a JSON object")
  }

  const email_address = typeof body.email_address === "string" ? body.email_address.trim() : ""
  const email_address_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (email_address.length > 254 || !email_address_regex.test(email_address)) {
    error(400, "Email address does not meet format requirements")
  }
  if (body.first_name != null && (typeof body.first_name !== "string" || body.first_name.trim().length > 100)) {
    error(400, "First name must be a string of at most 100 characters")
  }

  return {
    email_address,
    first_name: body.first_name?.trim() || null,
  }
}

export function createContibaseClient(env, fetch) {
  const access_token = env.CONTIBASE_ACCESS_TOKEN?.trim()
  const table_id = env.CONTIBASE_USERS_TABLE_ID?.trim()
  if (!access_token || !table_id) {
    error(503, "Newsletter is not configured yet")
  }

  const table_url = `https://www.contibase.com/api/v1/tables/${encodeURIComponent(table_id)}`

  return async function request(path = "", { method = "GET", body = undefined, expectJson = true } = {}) {
    let response
    try {
      response = await fetch(`${table_url}${path}`, {
        method,
        headers: {
          accept: "application/json",
          authorization: `Bearer ${access_token}`,
          ...(body === undefined ? {} : { "content-type": "application/json" }),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      })
    } catch {
      error(502, "Unable to reach the newsletter service")
    }

    const data = await response.json().catch(() => null)
    if (!response.ok) {
      const message = typeof data?.message === "string" ? data.message : data?.error
      error(502, typeof message === "string" && message ? message : "Newsletter service request failed")
    }
    if (expectJson && (!data || typeof data !== "object" || Array.isArray(data))) {
      error(502, "Newsletter service returned an invalid response")
    }
    return data
  }
}
