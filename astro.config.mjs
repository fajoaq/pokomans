import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
import compress from "astro-compress";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    solidJs(),
    compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
      },
      Image: false,
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
  output: "server",
  adapter: vercel({
    cleanUrls: true,
  }),
  functionPerRoute: false,
});
