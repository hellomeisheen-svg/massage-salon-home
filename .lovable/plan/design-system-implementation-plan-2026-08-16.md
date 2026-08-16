# Design System Implementation Plan

This plan focuses on standardizing the visual system of the existing massage cabinet website to make it cohesive, predictable, and scalable without changing content, business logic, or page structure.

## 1. Core Styles Foundation (`src/styles.css`)

- **Color Tokens**: Define CSS variables for primary, text, background, border, and semantic colors (success, error, etc.) using the specified hex values.
- **Radii Tokens**: Standardize border-radius for small elements (6px), buttons (8px), cards (12px), and modals (16px).
- **Shadows & Borders**: Implement uniform `box-shadow` and `border` tokens with smooth transitions.
- **Typography Scale**: Establish a clear hierarchy for headers (Noto Serif Display) and body text (Inter) with adaptive sizes for mobile (320px/375px), tablet (768px), and desktop (1440px).
- **Spacing Scale**: Implement a consistent 1-10 spacing scale and standard section paddings (140px desktop, 100px tablet, 60px mobile).
- **Global States**: Apply a unified `focus-visible` ring and `prefers-reduced-motion` support.

## 2. Component Standardization

- **Buttons**: Unify `.btn-primary`, `.btn-secondary`, and navigation buttons into a single system with hover, active, and disabled states.
- **Cards**: Apply the `ds-card` pattern (border, radius, shadow) to all service, program, review, and FAQ cards. Add hover lifts only to interactive cards.
- **Chips/Badges**: Standardize all tags (categories, duration labels, session counts) using a pill shape and `var(--color-bg-chip)`.
- **Form Inputs**: Update `BookingModal` and `QuizContactForm` to use the standardized `ds-input` styles with proper focus and error states.

## 3. Interactive Elements & Accessibility

- **FAQ**: Ensure the entire question row is clickable, add `aria-expanded`/`aria-controls`, and use a smooth height transition.
- **Modals/Quiz**: standardise the `shadow-modal` and `radius-modal`. Ensure focus management (trap focus while open, return on close) and Esc-key support.
- **Sticky CTA**: Ensure the `StickyMobileCTA` doesn't overlap important form elements and respects the z-index hierarchy.

## 4. Layout Verification

- **Breakpoints**: Verify the content width limits (900px tablet, 640px hero desktop) and ensure spacing scales correctly across all devices.
- **Typography Check**: Ensure Noto Serif Display is used for headers and Inter for interface elements as per the brand concept.

## Technical Details

- Use standard Tailwind v4 @theme variables for tokens where possible, but use CSS variables for absolute control over the design system.
- Implement transitions using a standard timing (200ms) for color, shadow, and transform changes.
- Ensure all text-to-background contrast ratios meet WCAG AA standards (4.5:1 for body text).

---
*Note: This update will not modify any texts, prices, services, or images. It purely targets the presentation layer and interaction feedback.*
