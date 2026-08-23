import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  base: "./",
  plugins: [
    TanStackRouterVite(),
    react(),
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: {
        entry: "src/server.ts",
      },
    }),
    nitro({
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
