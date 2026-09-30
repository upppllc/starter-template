export function transform_theme(html, value) {
  const theme = value === "dark" ? "dark" : "light"
  return html.replace('data-theme=""', `data-theme="${theme}"`)
}

export function secure_site_response(response, event) {
  const private_page = event.url.pathname === "/account" || event.url.pathname === "/sign-in" || event.url.pathname.startsWith("/api/member/") || Boolean(event.locals.member_account)
  response.headers.set("referrer-policy", private_page ? "no-referrer" : "strict-origin")
  response.headers.set("x-content-type-options", "nosniff")
  if (private_page) {
    response.headers.set("cache-control", "private, no-store")
    const varies = new Set((response.headers.get("vary") || "").split(",").map(value => value.trim()).filter(Boolean))
    varies.add("Cookie")
    response.headers.set("vary", [...varies].join(", "))
  }
  return response
}
