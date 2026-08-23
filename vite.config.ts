import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "./",
  },
  tanstackStart: {
    server: {
      entry: "server",
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
      },
    },
  },
});
