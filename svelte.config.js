import adapter from "@sveltejs/adapter-vercel"

export default {
  kit: {
    adapter: adapter({
      runtime: "nodejs20.x",
      trailingSlash: false,
      cleanUrls: true,
      maxDuration: 60,
    }),
  },
}
