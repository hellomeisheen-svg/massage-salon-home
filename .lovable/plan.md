# Plan for Fixing and Optimizing the Preloader

The current preloader disappears too quickly, causing a flickering effect. I will implement a minimum display time of 1500ms and a smooth fade-out animation to improve the user experience and ensure consistency across devices and browsers.

## Technical Details

- **Component:** `src/components/Preloader.tsx`
- **Logic:**
  - Introduce a `MIN_DISPLAY_TIME` constant (1500ms).
  - Use a `startTime` ref to track when the preloader was mounted.
  - Wait for both the `window.load` event (and hero image readiness) and the expiration of the minimum time before starting the fade-out.
  - Implement a `leaving` state that triggers a 350ms CSS fade-out animation.
  - Ensure `pointer-events: none` and `opacity: 0` are applied during/after the fade-out.
  - Use `requestAnimationFrame` or a final `setTimeout` to remove the component from the DOM after the animation completes.
- **Verification:**
  - Visual check for flickering in fast-load scenarios.
  - Ensure the preloader remains until the minimum time even on fast connections.
  - Verify interaction lock during loading.
  - Test responsiveness and Safari compatibility.

## Proposed Changes

### `src/components/Preloader.tsx`
- Refactor the `useEffect` hook to combine a timer and load event listener using a promise-based approach or synchronized state.
- Adjust CSS styles for smoother transition and higher z-index.
- Add a cleanup function to prevent memory leaks and redundant timers.

### `src/styles.css` (Optional if needed)
- Ensure no global styles conflict with the fixed positioning or z-index of the preloader.
