import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  vite: {
    base: "./",
  },
  tanstackStart: {
    server: {
      entry: "src/entry-server.tsx",
    },
  },
  nitro: false,
  plugins: [
    nitro({
      preset: "static",
      output: {
        dir: ".output",
        publicDir: ".output/public",
      },
      prerender: {
        routes: [
          "/",
          "/girudoterapiya",
          "/ketgut",
          "/klassicheskii-massazh",
          "/limfaticheskii-massazh",
          "/vakuumnyi-massazh",
          "/vektornyi-massazh",
          "/privacy-policy",
        ],
        crawlLinks: true,
      },
    }),
  ],
});
