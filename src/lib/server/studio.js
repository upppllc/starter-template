import { create_member_site_adapter } from "classhelm/server/member-site"
import { create_member_experience_site_handlers } from "classhelm/server/member-experience"

const private_headers = { "cache-control": "private, no-store", vary: "Cookie", "referrer-policy": "no-referrer" }
const unavailable = () => Response.json({ ok: false, message: "The studio account is unavailable." }, { status: 503, headers: private_headers })
const read_text = (value, maximum, nullable = false) => nullable && value === null || typeof value === "string" && value.length <= maximum

// Project only documented display fields: upstream extras never reach page data.
export function project_member_profile(body, customer_id) {
  const profile = body?.api_version === 1 ? body.profile : null
  if (!profile || profile.customer_id !== customer_id ||
    !read_text(profile.display_name, 160) || !read_text(profile.email, 320) ||
    !read_text(profile.phone, 50, true) || !read_text(profile.birth_date, 10, true)) return null
  return { customer_id, display_name: profile.display_name, email: profile.email,
    phone: profile.phone, birth_date: profile.birth_date }
}

export function create_studio_server({ organization_slug, api_origin = "https://www.classhelm.com", storefront_shared_secret } = {}) {
  const configured = typeof organization_slug === "string" && organization_slug !== ""
  // The shared adapter validates exact studio slugs, origins, methods and cookies.
  const member_site = configured ? create_member_site_adapter({ organization_slug, api_origin, storefront_shared_secret }) : null
  const public_config = Object.freeze({ configured, organization_slug: configured ? organization_slug : null,
    studio_href: configured ? `https://www.classhelm.com/o/${organization_slug}` : null,
    schedule_href: configured ? `https://www.classhelm.com/o/${organization_slug}/schedule` : null })
  const handlers = member_site ? create_member_experience_site_handlers(member_site) : {
    experience: { GET: unavailable, PATCH: unavailable }, feedback: { GET: unavailable, PUT: unavailable },
  }
  async function restore(event) {
    if (member_site) await member_site.restore(event)
    else { event.locals.member_account = null; event.locals.member_organization_slug = null }
  }
  async function load_account(event, { redirect }) {
    event.setHeaders({ "cache-control": "private, no-store", vary: "Cookie" })
    if (!configured) return { member: null, profile: null, experience: null }
    await restore(event)
    const require_account = () => {
      if (!event.locals.member_account?.id || event.locals.member_organization_slug !== organization_slug) redirect(303, "/sign-in")
    }
    require_account()
    const result = { profile: null, profile_error: null, experience: null, experience_error: null }
    // Refresh rotation is request-scoped; authenticated reads stay sequential.
    try {
      const response = await member_site.authorized_fetch(event, { pathname: member_site.organization_path("/profile") })
      if ([401, 403].includes(response.status)) redirect(303, "/sign-in")
      if (!response.ok) throw new Error("Profile unavailable")
      result.profile = project_member_profile(response.body, event.locals.member_account.id)
      if (!result.profile) throw new Error("Invalid profile")
    } catch (cause) {
      if ([303, 401, 403].includes(cause?.status)) redirect(303, "/sign-in")
      result.profile_error = "Your profile could not be loaded. Please try again."
    }
    const experience = await handlers.experience.GET(event)
    if ([401, 403].includes(experience.status)) redirect(303, "/sign-in")
    if (experience.ok) result.experience = await experience.json()
    else result.experience_error = "Your studio settings could not be loaded. Please try again."
    require_account()
    return { ...result, member: public_member(event.locals) }
  }
  return { public_config, restore, load_account, handlers,
    session_action: event => member_site ? member_site.action(event, event.params.action) : unavailable() }
}

export function public_member(locals) {
  const member = locals.member_account
  return member ? { id: member.id, display_name: member.display_name, email: member.email } : null
}
