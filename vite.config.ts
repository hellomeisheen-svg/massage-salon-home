import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
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
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"]
        }
      },
      server: {
        entry: "src/server.ts",
      },
    }),
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
