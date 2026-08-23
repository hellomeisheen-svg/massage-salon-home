import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  vite: {
    base: "./",
  },
  tanstackStart: {
    server: {
      entry: "src/server.ts",
    },
  },
  nitro: false, // Отключаем Nitro от Lovable, так как он принудительно задает cloudflare-module
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
