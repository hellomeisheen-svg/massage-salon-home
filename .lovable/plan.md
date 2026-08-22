# Desktop scroll behavior for AboutService section

Implement a sticky layout for the "AboutService" section on desktop (min-width: 1024px) where the left column (heading and navigation) stays fixed while the right column (content) scrolls.

## User Review Required

> [!IMPORTANT]
> This change only affects the desktop view (1024px+). The mobile and tablet versions will remain unchanged with standard page scrolling.

- The sticky behavior relies on `overflow-y: auto` for the right column and a fixed height for the section container.
- I will use `calc(100vh - 100px)` for the height to account for the sticky header.

## Proposed Changes

### Styling (CSS)

- Add a utility class `.service-section-desktop-scroll` in `src/styles.css` specifically for the `lg` breakpoint.
- Ensure `min-height: 0` is set on flex/grid containers to allow inner overflow.
- Hide the scrollbar for the right content area using the existing `.scrollbar-none` utility or standard CSS if preferred.

### Components

#### `src/components/ServicePage.tsx`

- Modify the `AboutService` component structure:
    - Apply `lg:h-[calc(100vh-100px)] lg:overflow-hidden` to the section container on desktop.
    - Set the right content column to `lg:h-full lg:overflow-y-auto lg:scrollbar-none`.
    - Ensure the left column remains `lg:sticky lg:top-0 lg:self-start`.
    - Adjust padding and alignment to match the existing design exactly.
- Ensure the anchor scroll logic (`goTo` function) works with the new internal scroll container.

## Technical Details

- **Breakpoint**: `lg` (1024px) as requested.
- **Scroll Hijacking**: No JS scroll hijacking; using native CSS `overflow-y: auto`.
- **Z-Index**: Ensure no overlap issues with the site header.

## Verification Plan

- [ ] Check desktop view (1440px) for sticky behavior.
- [ ] Check laptop view (1024px) for sticky behavior.
- [ ] Check tablet/mobile (<1024px) to ensure normal scrolling persists.
- [ ] Verify tab navigation/anchor clicks scroll the internal container correctly.
- [ ] Ensure no horizontal scroll is introduced.
