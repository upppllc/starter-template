import { goto, invalidateAll } from "$app/navigation"
import { create_button_manager } from "sveltekit-ui"
import { create_member_account_header_manager } from "classhelm/member-account-header-manager"
import { create_member_profile_summary_manager } from "classhelm/member-profile-summary-manager"
import { create_member_experience_manager } from "classhelm/member-experience-manager"
import { create_member_class_feedback_manager } from "classhelm/member-class-feedback-manager"

export function create_account_page_manager(config) {
  const data = () => config.data()
  let busy = $state(false), message = $state(null), signed_out = $state(false)
  const identity = () => signed_out ? null : data().member?.id
  const experience = create_member_experience_manager({ identity, customer_id: identity,
    organization_slug: () => data().studio_config.organization_slug, source: () => signed_out ? null : data().experience,
    onboarding: () => data().experience?.goals.status === "unanswered", endpoint: "/api/member/experience", options_endpoint: "/api/member/goal-options",
    action_headers: { "x-classhelm-member-action": "1" }, is_disabled: () => busy, on_saved: invalidateAll,
  })
  const feedback = create_member_class_feedback_manager({ identity, endpoint: "/api/member/class-feedback", action_headers: { "x-classhelm-member-action": "1" }, is_disabled: () => busy })
  async function sign_out() {
    if (busy || experience.saving || feedback.saving) return
    busy = true; message = null
    try {
      const response = await fetch("/api/member/session/logout", { method: "POST", credentials: "same-origin", cache: "no-store",
        headers: { "content-type": "application/json", "x-classhelm-member-action": "1" }, body: "{}" })
      const result = await response.json().catch(() => null)
      if (!response.ok && !result?.local_session_cleared) throw new Error("Sign-out unavailable")
      signed_out = true
      await goto("/", { invalidateAll: true, replaceState: true })
    } catch { message = "You could not be signed out. Please try again." }
    finally { busy = false }
  }
  const sign_out_button = create_button_manager({ text: "Sign out", type: "outlined", is_compressed: true, is_loading: () => busy, is_disabled: () => busy || experience.saving || feedback.saving, on_click: sign_out })
  const classhelm_button = create_button_manager({ text: "Studio on Classhelm", type: "outlined", is_compressed: true, support_icon: "arrow_tailed", icon_deg: -45, href: () => data().studio_config.studio_href })
  return { experience, feedback, get configured() { return data().studio_config.configured }, get message() { return message },
    header: create_member_account_header_manager({ profile: () => signed_out ? {} : data().profile ?? data().member ?? {}, actions: [{ key: "classhelm", manager: classhelm_button }, { key: "sign-out", manager: sign_out_button }] }),
    profile: create_member_profile_summary_manager({ profile: () => signed_out ? {} : data().profile ?? data().member ?? {}, error: () => data().profile_error }),
  }
}
