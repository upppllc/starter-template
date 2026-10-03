import { goto } from "$app/navigation"
import { create_member_account_access_manager } from "classhelm/member-account-access-manager"
export function create_sign_in_page_manager(config) {
  return { get configured() { return config.data().studio_config.configured },
    access: create_member_account_access_manager({ identity: () => config.data().studio_config.organization_slug,
      studio_name: () => config.data().studio.name, initial_mode: () => config.data().initial_mode,
      endpoint: "/api/member/session", on_signed_in: () => goto("/account", { refreshAll: true, replace: true }),
    }) }
}
