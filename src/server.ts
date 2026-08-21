import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const finalResponse = await normalizeCatastrophicSsrResponse(response);
      
      // Force response headers for stability
      finalResponse.headers.set("X-Content-Type-Options", "nosniff");
      
      const url = new URL(request.url);
      
      // Static assets
      if (url.pathname.startsWith("/assets/")) {
        finalResponse.headers.set("Cache-Control", "public, max-age=31536000, immutable");
      } 
      // Media and fonts
      else if (url.pathname.match(/\.(webp|jpg|jpeg|png|gif|svg|ico|woff2|woff|ttf|otf)$/i)) {
        finalResponse.headers.set("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
      } 
      // SEO and manifest
      else if (url.pathname === "/sitemap.xml" || url.pathname === "/robots.txt" || url.pathname === "/manifest.json") {
        finalResponse.headers.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=600");
      } 
      // HTML and data requests
      else {
        finalResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        finalResponse.headers.set("Pragma", "no-cache");
        finalResponse.headers.set("Expires", "0");
        finalResponse.headers.set("Surrogate-Control", "no-store");
      }
      
      return finalResponse;

    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
