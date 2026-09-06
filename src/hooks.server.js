export async function handle({ event, resolve }) {
  const theme = event.cookies.get("theme") === "light" ? "light" : "dark"
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`),
  })
}
