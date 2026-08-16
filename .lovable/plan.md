# Unified Radius Normalization (12px)

Bring selected elements to a unified 12px radius, preserving all other visual and functional attributes.

## User Review Required

> [!IMPORTANT]
> The normalization applies only to the listed elements. Other elements (buttons, inputs, compact badges) will maintain their existing radii (e.g., 8px).

- **PriceExtras**: Currently using 16px (rounded-2xl). Will be brought to 12px (rounded-xl / ds-card).
- **BookingModal Info Block**: Currently using 16px (rounded-2xl). Will be brought to 12px.
- **ImageTiles**: Currently using 24px. Will be brought to 12px.
- **ServicePage Category Badge**: Currently using 6px. Will be brought to 12px.
- **QuizResults Card**: Currently using 8px (rounded-lg). Will be brought to 12px.
- **Tab Containers**: External containers in Services, PriceTable, ServicePage, and girudoterapiya will be brought to 12px.

## Technical Details

### Proposed Changes

1.  **StickyMobileCTA** (`src/components/StickyMobileCTA.tsx`)
    *   Maintain 12px radius.
    *   Standardize the `!rounded-[12px]` class usage to match the project's standard 12px radius (if a utility exists) or keep it clean.

2.  **PriceExtras** (within `src/components/ServicePage.tsx` or `src/routes/banki.tsx`)
    *   Locate and update all PriceExtras cards to `rounded-[12px]`.

3.  **BookingModal Info Block** (`src/components/BookingModal.tsx`)
    *   Update the "What's next" info block (currently `rounded-2xl`) to `rounded-[12px]`.

4.  **QuizResults** (`src/components/quiz/QuizResults.tsx`)
    *   Update result cards and their large containers from `rounded-lg` (8px) to `rounded-[12px]`.
    *   Keep small elements (checkmarks, badges) at their current radii.

5.  **Tab Containers**
    *   Update external tab wrappers (currently mixed 10px or 8px) to `rounded-[12px]`.
    *   Files: `src/components/Services.tsx`, `src/components/PriceTable.tsx`, `src/components/ServicePage.tsx`, `src/routes/girudoterapiya.tsx`.

6.  **ServicePage Category Badge** (`src/components/ServicePage.tsx`)
    *   Update category label from `rounded-[4px]` or `rounded-[6px]` to `rounded-[12px]`.

7.  **ImageTiles** (`src/styles.css` or component)
    *   Update `.image-tile` or the component container from 24px to 12px.

### Implementation Strategy

*   Use `rounded-[12px]` consistently or the `ds-card` utility where appropriate.
*   Ensure no layout shifts or padding changes occur.
*   Verify focus-visible and active states remain intact.
