# Geographic Journey and Scroll-Reveal Design

## Current visitor experience

The homepage is a continuous, native-scroll journey. It opens with NASA's full-disk Apollo 17 Earth photograph, visually approaches Southern Africa, introduces Namibia with a public-domain map outline, identifies Windhoek, and blends into real centre imagery at the beginning of the architectural story. The second chapter uses the centre's existing official photography to move from exterior to interior to its three levels.

The interface does **not** use numbered chapters, arbitrary countdowns, autoplay video, artificial load screens, or visible "Skip intro" / "Skip journey" controls. The narrow timeline is a visual progress indicator, not a requirement to scroll in discrete steps. Scrolling backwards reverses the same transition. The navigation links remain available throughout.

The journey is not a 3D satellite fly-through. It is a staged photographic/cartographic animation and should not be described as a geographically exact continuous zoom. The Windhoek / mall location label is editorial context, not a surveyed building pin.

## Responsive and accessibility

- Desktop: enhanced globe/outline reveal and photo-linked arrival.
- Mobile: the same scroll-controlled narrative with lighter dimensions and no WebGL, GSAP, or autoplay footage. Native swipe scrolling is never intercepted.
- Reduced motion: no animated globe intro; the complete content-first architectural mobile/static view appears immediately.
- Native keyboard and screen-reader skip navigation remains in the global header. The normal menu, store links and direct URLs must remain available even though no visible cinematic skip button is present.
- The section stays in the normal document flow and does not lock the page or require a timed intro.
- Text is always available in the underlying document; animations are decorative enhancements.
- Extra scroll reveals on subpages use CSS view timelines with instant, readable fallbacks in browsers that do not support them.

## Asset reliability

- Primary NASA Blue Marble: https://svs.gsfc.nasa.gov/30613
- Fallback Earth photograph: https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17_(AS17-148-22727).jpg
- Public-domain Namibia outline: https://commons.wikimedia.org/wiki/File:Namibia-outline.svg
- Source for centre exterior and interior: https://gustavvoigtscentre.com.na/ (permissions to be confirmed before public launch).

The globe attempts the NASA image, then Wikimedia, then a CSS atmospheric sphere if both image requests fail. A failed Namibia outline does not hide the country or Windhoek content. Real centre photography is currently loaded from the centre's original site; local optimized assets and permission confirmation are necessary for production reliability.

## Motion language across the site

- Section copy rises gently as it enters the viewport.
- Photography uses a short clip-path/crop reveal rather than being given fake 3D depth.
- Heritage milestones reveal sequentially by their natural scroll position; actual dates are the only numerals.
- Divider strokes draw in subtly.
- Search and filters remain responsive without delayed reveal on each keystroke.
- No perpetual marquees, bounce, giant blur layers, or letter-by-letter title animation.

## QA checks before public launch

1. Check scroll through Earth / Namibia / Windhoek / arrival, including reversing direction and direct links.
2. Check globe image success and both failure fallbacks; Namibia SVG failure must leave content readable.
3. Verify no visible skip buttons or "01 / 03" chapter labels.
4. Test 320, 360, 390, 768, 1024, 1440 and 1920px widths, 200% zoom, mobile landscape and touch.
5. Test reduced motion; it must disable cinematic movement without hiding the site.
6. Test keyboard navigation and screen readers, including skip-to-content in the header.
7. Run `bun run test`, `bun run lint`, `bun run build`, then verify at least one real browser preview on mobile and desktop.
8. Verify asset rights and load performance on a slow Namibian mobile network.

Do not claim the browser, build or image loading has been verified until those checks actually run.
