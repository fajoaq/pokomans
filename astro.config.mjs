import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
import Compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    solidJs(),
    Compress({
      SVG: false,
    }),
  ],
  output: "server",
  adapter: vercel(),
  functionPerRoute: false,
});
