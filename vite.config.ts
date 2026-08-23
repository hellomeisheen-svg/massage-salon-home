import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // We use the environment variable NITRO_PRESET to control the build target
  // when running in the user's VPS environment.
  // In Lovable Cloud, the config automatically targets Cloudflare.
});