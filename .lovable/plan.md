# Plan: Convert to Static Vite SPA

Convert the TanStack Start project into a standard Vite SPA to support shared hosting (static files). This involves disabling Nitro SSR, removing server-side only logic, and establishing a standard SPA entry point.

## Proposed Changes

### Configuration & Build
- Update `vite.config.ts` to disable Nitro and SSR.
- Create a standard `index.html` at the root as the entry point for the SPA.
- Create `src/main.tsx` to handle client-side rendering/hydration without TanStack Start's server runtime.
- Update `package.json` build scripts to target a static build.

### Routing
- Modify `src/router.tsx` to ensure it works in a pure client-side environment.
- Remove `src/routes/robots.txt.ts` and `src/routes/sitemap[.]xml.ts` (which are server routes) and replace them with static files in `public/`.

### Server Functions & Backend
- Replace `createServerFn` usage in `src/lib/notifications.functions.ts` with a client-side stub or a direct call to a Supabase Edge Function (or other configurable API).
- Note: Since the user asked to keep the booking form UI but not expose secrets, I will keep the Supabase client logic (which uses the public key) but remove the `supabaseAdmin` dependency.

### Components
- Update `src/routes/__root.tsx` to remove Start-specific components like `HeadContent` and `Scripts` if they interfere with a standard Vite build, or ensure they degrade gracefully.
- Move meta tags from `__root.tsx` (TanStack Router `head` option) to the static `index.html` where appropriate for SEO on shared hosting (though SPAs have limited SEO without pre-rendering).

## Technical Details

- **Nitro**: Will be set to `false` in `defineConfig` to stop it from generating a server build.
- **TanStack Router**: We'll switch from `@tanstack/react-start` wrappers back to standard `@tanstack/react-router` patterns for hydration.
- **Entry point**: `index.html` will point to `src/main.tsx`.
- **Form submission**: `sendLeadNotification` will be updated to be a no-op or a simple `console.log` with a `toast.success` to preserve the UI flow, as server functions won't exist in a static build.

## Approval Required
- The site will become a Single Page Application (SPA). This means initial SEO might be affected unless the hosting provider supports pre-rendering or you use a static site generator (SSG). Shared hosting usually just serves static files.
- You will need to configure your own backend for email notifications (like a Zapier webhook or a direct Resend call if you're okay with the API key being in the frontend, though the latter is not recommended). I will provide a placeholder for this.
