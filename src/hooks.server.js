export const handle = async ({ event, resolve }) => {
  // event.locals.supabasesk = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY)
  // let tokens = event.cookies.get("cb_account_access_tokens")
  // let correctly_formatted_tokens = []
  // if (tokens) {
  //   tokens = JSON.parse(tokens)
  //   for (let token of tokens) {
  //     if (token.match(/^[a-z]{40}$/)) {
  //       correctly_formatted_tokens.push(token)
  //     }
  //   }
  // }
  // console.log("correctly_formatted_tokens_00", correctly_formatted_tokens)
  // let accounts = {}
  // if (correctly_formatted_tokens.length > 0) {
  //   const verify_access_tokens_res = await event.locals.supabasesk.rpc("verify_access_tokens", {
  //     _access_tokens: correctly_formatted_tokens,
  //   })
  //   console.log("verify_access_tokens_res_00", verify_access_tokens_res)
  //   if (!verify_access_tokens_res.error) {
  //     accounts = verify_access_tokens_res.data?.accounts
  //   }
  // }
  // let cb_selected_account_id = null
  // if (Object.keys(accounts || {}).length > 0) {
  //   if (accounts.hasOwnProperty(event.cookies.get("cb_selected_account_id"))) {
  //     cb_selected_account_id = event.cookies.get("cb_selected_account_id")
  //   } else {
  //     cb_selected_account_id = Object.keys(accounts)?.[0]
  //   }
  // }
  // event.cookies.set("cb_selected_account_id", cb_selected_account_id, {
  //   path: "/",
  //   maxAge: 60 * 60 * 24 * 90, // 90 days
  // })
  // event.cookies.set("cb_account_access_tokens", JSON.stringify(correctly_formatted_tokens), {
  //   path: "/",
  //   maxAge: 60 * 60 * 24 * 90, // 90 days
  // })
  // event.locals.accounts = accounts
  // event.locals.selected_account_id = cb_selected_account_id
  const theme = event.cookies.get("theme") ?? "dark"
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`),
  })
  return response
}
