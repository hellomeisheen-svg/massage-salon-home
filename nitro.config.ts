import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
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
  output: {
    dir: ".output",
    publicDir: ".output/public",
  },
});
