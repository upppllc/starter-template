import { error } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
import { createContibaseClient } from "$lib/server/contibase.js"

export async function load({ fetch, params }) {
  const user_id = params.user_id
  if (!user_id || user_id === "." || user_id === "..") {
    error(400, "Invalid user ID")
  }
  const contibase = createContibaseClient(env, fetch)
  const now_epoch_seconds = Math.floor(Date.now() / 1000)
  await contibase(`/rows/${encodeURIComponent(user_id)}`, {
    method: "PUT",
    expectJson: false,
    body: {
      row_data: {
        epoch_email_address_confirmed: now_epoch_seconds,
      },
    },
  })
  return {
    message: "Email Address Confirmed",
    epoch_email_address_confirmed: now_epoch_seconds,
  }
}
