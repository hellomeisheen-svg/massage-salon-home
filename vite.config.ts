import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "./",
  },
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
  nitro: {
    preset: "static",
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
      failOnError: false,
    },
  },
});
