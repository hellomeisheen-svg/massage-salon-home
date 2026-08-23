import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tanstackRouter(),
    tanstackStart({
      server: {
        entry: "src/server.ts",
      },
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
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
  resolve: {
    alias: {
      "@": "/dev-server/src",
    },
  },
  css: {
    transformer: "lightningcss",
  },
});
