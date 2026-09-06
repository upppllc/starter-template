import { create_button_manager, create_text_input_manager } from "sveltekit-ui"

export function create_newsletter_subscribe_manager() {
  let is_hide_subscribe_to_newsletter = $state(false)
  let first_name_text_input_manager = $state(null)
  let email_address_text_input_manager = $state(null)
  let subscribe_button_manager = $state(null)
  let subscribe_is_loading = $state(false)
  let subscribe_error_message = $state(null)
  let is_subscribe_success_message = $state(false)

  async function subscribe_email() {
    if (subscribe_is_loading) return
    subscribe_error_message = null
    const email_address = email_address_text_input_manager?.val?.trim() ?? ""
    const first_name = first_name_text_input_manager?.val?.trim() ?? ""
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email_regex.test(email_address)) {
      subscribe_error_message = "Email address does not meet format requirements"
      return
    }
    subscribe_is_loading = true
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, email_address }),
      })
      const result = await response.json()
      if (!response.ok) {
        subscribe_error_message =
          typeof result?.message === "string" ? result.message : "Unable to subscribe. Please try again."
        return
      }
      first_name_text_input_manager.set_val(null)
      email_address_text_input_manager.set_val(null)
      subscribe_button_manager.success_trigger()
      is_subscribe_success_message = true
      setTimeout(() => {
        is_subscribe_success_message = false
      }, 5000)
      return result
    } catch {
      subscribe_error_message = "Unable to subscribe. Please try again."
    } finally {
      subscribe_is_loading = false
    }
  }

  function init() {
    first_name_text_input_manager = create_text_input_manager({
      label: "First Name",
      name: "first_name",
      autocomplete: "given-name",
      placeholder: "John",
      is_disabled: () => subscribe_is_loading,
    })
    email_address_text_input_manager = create_text_input_manager({
      label: "Email Address",
      type: "email",
      name: "email",
      placeholder: "me@example.com",
      is_disabled: () => subscribe_is_loading,
      on_blur: (value) => email_address_text_input_manager.set_val(value?.trim() ?? ""),
    })
    subscribe_button_manager = create_button_manager({
      h: 16,
      c: 6,
      l: 4,
      is_compressed: true,
      is_disabled: () => subscribe_is_loading || !email_address_text_input_manager?.is_valid,
      is_loading: () => subscribe_is_loading,
      text: "Join Newsletter",
      on_click: () => subscribe_email(),
    })
  }

  init()

  return {
    get is_hide_subscribe_to_newsletter() {
      return is_hide_subscribe_to_newsletter
    },
    get first_name_text_input_manager() {
      return first_name_text_input_manager
    },
    get email_address_text_input_manager() {
      return email_address_text_input_manager
    },
    get subscribe_button_manager() {
      return subscribe_button_manager
    },
    get subscribe_error_message() {
      return subscribe_error_message
    },
    get is_subscribe_success_message() {
      return is_subscribe_success_message
    },
  }
}
