# Plan - Unified Compact Hero Cards

Unify all hero cards (Home, Services, Girudoterapiya) to use the same compact layout and fixed heights on mobile and tablet, removing excessive gaps and ensuring visual consistency.

## Technical Details

### 1. Unified Structure (src/components/Hero.tsx)
- Update `Hero.tsx` to use the same structural classes as `ServicePage.tsx`:
  - `.hero-bento-card` on the main card.
  - Add `.hero-breadcrumb-slot` (compact placeholder).
  - Add `.hero-specialist-block` wrapping the specialist info.
  - Wrap content in `.hero-service-content`.
  - Wrap actions in `.hero-card-actions`.

### 2. Layout & Height (src/styles.css)
- Define CSS variables for heights:
  - `--hero-card-height-mobile: 680px` (lowered from 760px).
  - `--hero-card-height-tablet: 640px` (lowered from 720px).
- Update `.hero-bento-card` to use these variables.
- Replace `mt-auto` in `.hero-card-actions` with `margin-top: 32px` (mobile/tablet only) to keep buttons close to text.
- Ensure placeholder slots (`.hero-breadcrumb-slot`, `.service-badge-slot`) are compact.

### 3. Synchronization
- Ensure `ServicePage.tsx` and `girudoterapiya.tsx` use the new variables and layout rules.
- Fix inconsistent specialist block margins.

## Steps

1. **Update styles.css**: Define heights, layout flow, and placeholder sizes for mobile/tablet.
2. **Modify Hero.tsx**: Align structure with service pages.
3. **Modify ServicePage.tsx**: Adjust specialist block margins and spacing.
4. **Modify girudoterapiya.tsx**: Match the new unified structure and spacing.
5. **Verification**: Run Playwright audit to confirm heights are identical and gaps are reduced.
