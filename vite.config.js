import { sveltekit } from "@sveltejs/kit/vite"
import adapter from "@sveltejs/adapter-vercel"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [sveltekit({
    adapter: adapter({
      runtime: "nodejs24.x",
      trailingSlash: false,
      cleanUrls: true,
      maxDuration: 300,
    }),
  })],
})
