import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "./",
  },
  tanstackStart: {
    server: {
      entry: "src/server.ts",
    },
  },
  nitro: {
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
  },
});
