import { redirect } from "@sveltejs/kit"
export function load({ locals, url }) {
  if (locals.member_account) redirect(303, "/account")
  return { initial_mode: url.searchParams.get("mode") === "signup" ? "signup" : "signin" }
}
