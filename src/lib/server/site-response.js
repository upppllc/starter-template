export function transform_theme(html, value) {
  return html.replace('data-theme=""', `data-theme="${value === "dark" ? "dark" : "light"}"`)
}
export function secure_site_response(response) {
  if (!response.headers.has("referrer-policy")) response.headers.set("referrer-policy", "strict-origin")
  response.headers.set("x-content-type-options", "nosniff")
  return response
}
