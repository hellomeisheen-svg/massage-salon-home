# Plan: Desktop Table View for Service Prices

Redesign the "Formats and Cost" section to use a table layout on desktop/large screens while keeping the card/tab layout for mobile and tablets.

## User Review Required

> [!IMPORTANT]
> The table layout for desktop will show multiple columns for different session counts (1, 3, 6) similar to the previously implemented `PriceTable` component, ensuring a clear comparison of prices and discounts.

## Proposed Changes

### Components & Routes

#### `src/components/ServicePage.tsx`
- Update the `Prices` component to conditionally render either the current card layout or a new table layout based on screen size.
- Add a new `PriceTable` internal component (or update the logic) that renders a `<table>` on `lg:` and above.
- Ensure the table follows the brand style: #EFF6FF background headers, #1C3C8C for primary text, and #566A93 for secondary text.

#### `src/routes/girudoterapiya.tsx`
- Refactor the local `Prices` component to use the same desktop-table/mobile-cards logic.
- Ensure the specific hirudotherapy logic (leech counts, price per leech) is correctly handled in the table view.

### Style & Layout
- Mobile/Tablet: Keep current compact card layout with session tabs.
- Desktop (>=1024px): Display a full-width table with columns: "Service/Zone", "Duration", "1 Session", "3 Sessions (-10%)", "6 Sessions (-15%)".

## Technical Details
- Use Tailwind's `hidden lg:block` and `lg:hidden` to toggle between views.
- Maintain existing price formatting and pluralization logic.
- Ensure all "Book" actions are accessible.
