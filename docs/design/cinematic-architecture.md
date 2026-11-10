# Cinematic Architectural Journey

Built for the Gustav Voigts Centre homepage as a native-scroll, photo-led experience using real centre photographs already referenced by the project.

## Implemented scenes
1. **Arrival:** Gustav Voigts Centre exterior on Independence Avenue. Scroll-linked image push.
2. **Step inside:** Crossfade into a photograph of the centre's actual atrium.
3. **Three levels:** Transition to a second interior image and reveal Lower Ground, Street Level and Upper Level, with counts read from the existing directory rather than invented floor-map coordinates.
4. **Heritage:** A factual editorial timeline of construction beginning in 1971 and completion in 1973, followed by the present day. Source: https://weckevoigts.com/history/. The modern interior photo is explicitly labelled as contemporary.

## Honest media policy
- The existing published centre photograph URLs are provisional. Obtain the centre management's approval, then replace the legacy URLs with licensed, optimized, self-hosted AVIF/WebP derivatives.
- Do not pretend that present-day photos are 1970s archive material.
- Do not create false architectural walk-through or day/night imagery.
- A canvas frame sequence is **not** implemented because no authentic frame sequence has been supplied. This build uses reversible image transformations and crossfades instead.
- If a photo fails, the dark editorial section still renders with working visitor links.

## Behaviour
- Desktop: 295svh native scroll section with a sticky 100svh stage, no wheel or touch interception. Three beat progress calculated from section position.
- Mobile and `prefers-reduced-motion: reduce`: a complete, static two-photo story, working visit/store links and a real three-level directory.
- All visitors can use **Skip journey** to reach the normal homepage content, or **Find a store** directly.
- The existing globe-to-Windhoek introduction remains intact and is still skippable. It is separate from this architectural chapter.
- The full store directory, visit page and existing site routes remain present.

## QA before publication
- Run `bun install --frozen-lockfile`, `bun run test`, `bun run lint`, `bun run build`.
- Test desktop scroll both directions and skip navigation. Verify images do not appear as an archive or a fake architectural reconstruction.
- Test at 320px, 360px, 390px, 768px, 1024px and 1440px, and at 200% zoom.
- Test reduced motion, no-JS/server-rendered first paint, slow connections, unavailable images and touch/keyboard navigation.
- Replace the old centre's time-dependent tenant and image information with management-confirmed records before publishing.
