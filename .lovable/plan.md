# Plan to Fix Horizontal Overflow on Mobile and Tablet

The site exhibits horizontal scroll issues on mobile and tablet devices, likely caused by elements exceeding the viewport width. I will perform a comprehensive audit and implement a robust fix that addresses the root causes while maintaining the existing design and sidebar behavior.

## Technical Details

- **Global Protection:**
  - Update `src/styles.css` to ensure `html`, `body`, and `#root` have `max-width: 100%` and `overflow-x: hidden`.
- **Component Audit & Fixes:**
  - **`RollingGallery.tsx`:** Fix `width: cylinderWidth` which uses large fixed values (1600px/2600px). I'll wrap it in a container that clips overflow properly or uses relative units.
  - **`Hero.tsx`:** Ensure `tablet-text-block` and `xl:min-w-[640px]` don't force width on small screens.
  - **`Header.tsx`:** Check the mobile menu panel and overlays for overflow.
  - **`Programs.tsx`:** Check the program card `h-[560px] sm:h-[671px]` and the horizontal navigation.
  - **`OtherServices.tsx`:** Audit the carousel's negative margins (`-m-6`) and snap-start behavior.
- **Micro-fixes:**
  - Ensure all `img`, `video`, and `svg` have `max-width: 100%` and `height: auto` globally or in key components.
  - Apply `box-sizing: border-box` globally (standard in Tailwind but worth verifying).
  - Use `min-width: 0` on flex/grid items that contain long text or items that might overflow.

## Proposed Changes

### `src/styles.css`
- Add strict overflow control to `html`, `body`, and `#root`.
- Add global `max-width: 100%` for images/media.

### `src/components/ui/rolling-gallery.tsx`
- Ensure the 3D cylinder doesn't expand the document width.

### `src/components/OtherServices.tsx`
- Adjust the carousel container to handle padding/margins without breaking the layout.

### `src/components/Hero.tsx` & `src/components/ServicePage.tsx`
- Audit `tablet-text-block` usage.

## Verification
- Run Playwright detection script at 320px, 375px, 768px, etc.
- Manually verify mobile menu behavior.
- Ensure sticky elements still work (as `overflow: hidden` on `body` can sometimes break `sticky`).
