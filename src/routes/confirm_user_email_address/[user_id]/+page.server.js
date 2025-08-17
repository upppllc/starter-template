import { error } from "@sveltejs/kit"
import { CONTIBASE_ACCESS_TOKEN } from "$env/static/private"

export async function load({ fetch, params }) {
  console.log("update_user_confirm_email_address_epoch")
  const user_id = params?.user_id
  if (!user_id) {
    error(400, "missing user_id")
  }
  const user_table_id = "your user table id from contibase"
  const account_id = "account id from contibase"
  const now_epoch_seconds = Math.floor(Date.now() / 1000)
  const confirm_res = await fetch(`https://www.contibase.com/api/v1/tables/${user_table_id}/rows/${user_id}`, {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${CONTIBASE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      row_data: {
        epoch_email_address_confirmed: now_epoch_seconds,
      },
    }),
  })
  const confirm_res_body = await confirm_res.json().catch(() => null)
  console.log("confirm_res_body", confirm_res_body)
  if (!confirm_res.ok) {
    const message = confirm_res_body?.message || confirm_res_body?.error || "error confirming user email address"
    error(400, message)
  }
  // optionally send an a welcome email after a user confirms email or do some other action
  // if (confirm_res_body?.row?.email_address && confirm_res_body?.row?.epoch_email_address_confirmed) {
  //   const send_welcome_email_res = await fetch(`https://www.contibase.com/api/v1/accounts/${account_id}/mail/single`, {
  //     method: "POST",
  //     headers: {
  //       accept: "application/json",
  //       "content-type": "application/json",
  //       authorization: `Bearer ${CONTIBASE_ACCESS_TOKEN}`,
  //     },
  //     body: JSON.stringify({
  //       message_stream: "outbound",
  //       from_full: { email_address: "newsletter@mail.yourdomain.com" }, // add a domain and create an email in contibase
  //       to_full: [{ email_address: confirm_res_body?.row?.email_address }],
  //       derived_from_page_id: email_template_id,
  //     }),
  //   })
  //   const send_welcome_email_res_body = await send_welcome_email_res.json().catch(() => null)
  //   console.log("send_welcome_email_res_body", send_welcome_email_res_body)
  // }
  return {
    message: "Email Address Confirmed",
    epoch_email_address_confirmed: now_epoch_seconds,
  }
}
