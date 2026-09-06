import { error, json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
import { createContibaseClient, parseNewsletterSubscriber } from "$lib/server/contibase.js"

export async function POST({ request, fetch }) {
  const body = await request.json().catch(() => error(400, "Request body must be valid JSON"))
  const { email_address, first_name } = parseNewsletterSubscriber(body)
  const contibase = createContibaseClient(env, fetch)
  const params = new URLSearchParams({
    filters: JSON.stringify({
      and: [{ field: "email_address", operator: "eq", value: email_address }],
    }),
    limit: "1",
  })
  const existing_users = await contibase(`?${params.toString()}`)
  if (!Array.isArray(existing_users.rows)) {
    error(502, "Newsletter service returned an invalid response")
  }
  if (existing_users.rows.length > 0) {
    error(409, "Email address already exists")
  }

  const created_user = await contibase("/rows", {
    method: "POST",
    body: {
      row_data: {
        first_name,
        email_address,
        epoch_subscribed: Math.floor(Date.now() / 1000),
        tags: ["all"],
      },
    },
  })
  return json(created_user, { status: 201 })
}
