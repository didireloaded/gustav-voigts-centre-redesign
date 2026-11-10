# Geographic Scroll Introduction (Prototype)

## Visitor sequence

1. Begin with Earth as seen from the Apollo 17 mission. Scroll progresses through a close-up of Africa.
2. A typographic geographic transition identifies Namibia.
3. The next camera beat identifies Windhoek and a pin label for Gustav Voigts Centre, Independence Avenue.
4. A short, bounded blur settles into the normal homepage.

The current version uses **native scroll progress** and lightweight CSS transforms, not GSAP or Mapbox. This preserves normal touch, wheel, keyboard and browser scrolling and avoids extra JavaScript dependencies. A full photographic or 3D fly-through is a later media-production task.

## Scope

- Only the homepage receives the intro. Direct visits to `/stores`, `/visit` and store detail pages remain unaffected.
- The ordinary homepage and its primary actions are always part of the document, with no gating behind an intro.
- A visible **Skip intro** link jumps to the normal homepage.
- A session flag bypasses the intro on a subsequent homepage visit within the same session. Browser storage failure does not prevent access.
- At widths below 768px, when reduced motion is enabled, or when the session has already seen the intro, the page starts at the regular homepage immediately.
- Reversing scroll direction reverses the progression. There are no timers, wheel interception, auto-playing clips, loops or artificial wait screens.
- This is a concept transition, not an exact 3D geographical fly-over. **Windhoek and the mall label are not placed on an interactive or surveyed map.** Do not imply a satellite fly-to is currently implemented.

## Sources and media

- Apollo 17 Earth image: https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17_(AS17-148-22727).jpg
- NASA context and credit: https://science.nasa.gov/resource/the-blue-marble/
- Gustav Voigts Centre address: https://gustavvoigtscentre.com.na/page/contact/
- Coordinate context (approximate mall location; not used to render a precise pin): https://de.wikipedia.org/wiki/Gustav_Voigts_Centre

Current image is a linked public NASA/Wikimedia photograph. Before a production launch, optimize and host an approved 960px WebP derivative with source credit and check the image-loading experience on 3G. Rights for existing centre hero imagery remain separate.

## Future cinematic asset requirements

For an actual globe-to-building zoom, acquire or produce a geographically correct flight path using licensed geospatial imagery and/or a rendered 3D planet. Produce low-bandwidth poster frames, desktop frame sequences, breakpoint crops, and transitions to approved real mall photography. Validate location and license of map tiles. Budget for mobile-first loading and test battery/GPU cost before enabling a heavy camera sequence. GSAP ScrollTrigger is an option only if the extra complexity produces a meaningfully smoother result.

## QA contract

- Run `bun run test`, `bun run lint`, and `bun run build`.
- Keyboard navigation must work with and without JavaScript; Skip Intro is a real anchor.
- At 320/360/390px: intro absent; homepage visible without scroll trap.
- At 768/1024/1440px: intro scrolls normally, shows correct visual beats, and exits into the homepage without horizontal overflow.
- At reduced motion: no intro, no zoom and no blur.
- Repeat visit in same session: intro omitted.
- Verify Earth image loads or degrades without blocking access to the normal homepage.
- Direct routes and browser back/forward navigation must continue to work.
- Test against real Windhoek network conditions before release.
