# Plan: Fix SSR Stability and Safari Infinite Loading

Analysis suggests that the "SSR stream transform exceeded maximum lifetime" error and Safari instability are likely caused by a combination of hydration mismatches (specifically from `TypographyProvider`) and the blocking injection of Yandex.Metrika in the head during SSR. Safari is particularly sensitive to DOM mutations occurring immediately after hydration.

## Proposed Changes

### 1. Optimize `src/routes/__root.tsx`
- Remove Yandex.Metrika script from `head.scripts` (SSR blocking).
- Move Metrika initialization to a dedicated client-side component using `useEffect`.
- Wrap `Preloader` and `TypographyProvider` in `<ClientOnly />` to prevent hydration interference.
- Add a client-side "Watchdog" to detect hydration hangs and show a "Reload" button after a timeout.

### 2. Selective SSR for Heavy Components
- Wrap `RollingGallery` and other animation-heavy components in `<ClientOnly />`.
- Ensure `Header` and `Hero` use consistent initial state during SSR.

### 3. Harden Browser API Access
- Double-check all components for unguarded `window`, `document`, or `localStorage` access.
- Ensure the Supabase client initialization remains safe during SSR.

### 4. Implementation of `src/components/Analytics.tsx`
- Create a client-side component for Yandex.Metrika to handle its lifecycle safely outside the main SSR stream.

## Technical Details
- **Watchdog**: A small script in `__root.tsx` that starts a timer on load and clears it once React hydration is complete. If the timer hits 10s, it shows a minimal fallback UI.
- **ClientOnly**: Using the newly created utility to gate components that don't need to be part of the initial HTML or might cause mismatches.
- **Cache-Control**: Ensure headers are set to prevent aggressive caching of the HTML while allowing long-term caching of hashed assets.

## Checks
- `npm run build` to verify no breaking changes.
- Manual verification of the site loading without infinite spinner in simulated environments.
- Verify `ym` (Yandex Metrika) is correctly initialized only on the client.
