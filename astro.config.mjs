import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import vercelStatic from "@astrojs/vercel/static";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), compress(), vercelStatic()],
  output: "static",
  adapter: vercelStatic(),
});
