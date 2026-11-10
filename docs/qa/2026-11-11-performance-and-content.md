# Performance and content optimization, 11 November 2026

## Implemented in this commit

1. **Homepage story:** Removed the swipe reveal using animated `clip-path`; the three genuine centre photos now crossfade using opacity only.
2. **Main-thread performance:** Eliminated React `setProgress()` updates on scroll. One passive scroll listener and one `requestAnimationFrame` callback update existing DOM opacity and progress transforms. Progress thresholds avoid unnecessary writes.
3. **Scroll pace:** Reduced the enhanced desktop journey from 245svh to 210svh. The three scene beats remain tied to the user's native scroll and reverse in both directions.
4. **Image loading:** The first centre photograph is fetched eagerly and marked high priority. The others are lazy/low priority; failing official images try another photo from the same centre rather than a mock image.
5. **Mobile:** Preserved the content-first static composition without desktop pinned frames, swipe masking or a large decorative animation. Reduced small-screen movement, ensured 48px hero actions and kept fluid type sizing.
6. **Whole-site reveals:** Replaced a whole-DOM MutationObserver scan with a page-scoped IntersectionObserver, reducing layout reads during directory filter changes.
7. **Tenant photos:** Removed the rotating random centre-photo assignment. Only three specifically attributed business images remain (Avani, Clicks, Torga Optical); the other 28 pages use an editorial text layout and no fabricated banners.
8. **Business data:** Source-limited descriptions for Torga, Avani and Clicks. Other business profiles use only category and floor from the published centre directory. Torga's more recent business phone is used on its page and attributed to the official branch listing.
9. **Content:** Removed unconfirmed Flower Love/Flowerlab and Wellness Centre/Amy's Wellness gallery associations from Discover. The centre's published hours are identified as *general*, not tenant-specific.
10. **Connection reuse:** Added photo-host preconnect and image-host DNS hints.

## Authenticity audit

- Existing shopping-centre photographs are linked from the centre's own published gallery: https://gustavvoigtscentre.com.na/ . Licensing and ownership confirmation remains outstanding before replacing the real site.
- The 31-name directory was transcribed from https://gustavvoigtscentre.com.na/page/store-directory/ . Those are real published records, not synthetic demo shops, but current occupancy, phone numbers and business hours require management verification.
- The centre's published general hours and reception contact come from https://gustavvoigtscentre.com.na/page/contact/ .
- Torga Optical's current official branch contact and Shop 6A location: https://torga.com.na/stores/gustav-voigts-centre .
- No stock imagery, artificial storefronts, unverified historical footage, fake reviews, product prices, or invented events were added.

## Verification completed

- Source assertions confirm the old swipe-mask props and React scroll-state updates were removed.
- Source assertions confirm all new local imports resolve against the current repository tree.
- Regression tests were updated for crossfade phase opacity, real-image-only tenant banners, reduced source content and source-specific Torga details.
- The GitHub-connected branch is expected to synchronize with Lovable after merge; verify the new commit SHA explicitly.

## Verification still required (do not claim passed)

- A real production build with `bun run build`, `bun run test` and `bun run lint`; no running source container is accessible through the GitHub connector.
- Browser check on iPhone Safari, Chrome Android and at 320, 360, 390, 768, 1024 and 1440px.
- Measured LCP, CLS and INP on real 4G/slow 3G networks in Namibia, and memory/scroll FPS on a mid-range Android device.
- Confirm the remote official image URLs all load quickly. Replace them with authorized, locally hosted WebP/AVIF responsive images when rights and originals are supplied.
- Confirm source image rights and tenant ownership details before publishing to the original domain.

## Performance acceptance checks for a final QA pass

- On supported desktop browsers, no white/black blank frame between consecutive real photographs during continuous native scroll.
- No large image `clip-path` animations in the hero.
- No React component re-render triggered by each scroll event.
- No horizontal overflow at 320px and 200% zoom.
- All three centre levels remain legible, and mobile visitors can use the directory without a pinned intro.
- No photos of unrelated storefronts on unverified tenant detail pages.
- With reduced motion, all content appears immediately and native navigation remains usable.
