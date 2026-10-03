export default {
  // Analytics 2's framework peer still excludes Kit 3. Keep the reviewed
  // generic API until a compatible published release is available.
  reject: ["@vercel/analytics"],
  target: (name) => (name === "typescript" ? "minor" : "latest"),
}
