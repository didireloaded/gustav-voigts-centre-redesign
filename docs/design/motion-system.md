# Gustav Voigts Centre Motion Contract

This is the project-specific implementation policy for the approved **Apple-style** interaction direction. Read alongside `.agents/skills/website-design-craft/references/02-motion-20.md` and the anti-slop and accessibility references.

## Principle

Use one or two meaningful scroll-driven visual moments to tell the centre's story. Everyday tasks (finding a store, getting directions, checking hours) must remain instantaneous, usable without animation and fully keyboard accessible. Movement must never be used to conceal missing content or block navigation.

## Built-in, safe baseline

| Surface | Motion | Trigger | Fallback |
|---|---|---|---|
| Homepage hero image | Subtle 1.00–1.07 zoom only | Native CSS view-timeline on desktop as hero exits viewport, reverses when scrolling up | Completely static where unsupported, narrow screen, or reduced motion |
| Homepage below-fold section headings | Minimal 12px/0.92-to-1 reveal | CSS view-timeline on desktop | Fully visible immediately |
| Main action links | Brief 0.97 scale press | Active pointer input, 110ms | Instant action with normal focus indication |
| Floor finder | 180ms opacity/5px entry | Changing floor tabs | Instant switch; selected tab and keyboard navigation unchanged |
| Store directory | Max six rows, 30ms capped stagger | Category/level change and first listing; no scripted delay | No stagger during search typing or reduced motion |
| Mobile menu | Simple 240ms slide/210ms opacity, faster exit | User opens/closes | Instant overlay when reduced motion; Escape, focus trap and focus restoration |
| Hamburger/X | 160–170ms crossfade/rotation | Menu state change | Instant icon swap |

Effects are progressive enhancements using CSS. Do not add GSAP just for these simple interactions. The visible hero title and primary actions must render without an introductory animation. No numbered scroll milestones or visible journey-skip buttons are used; global navigation remains accessible, and reduced-motion users receive a fully usable static journey.

## Approved patterns waiting for real content or explicit implementation needs

### Heritage storytelling
A chronological editorial history is required before motion. Source and fact-check dates and imagery; the centre construction began in 1971 and was completed in 1973 per the Wecke & Voigts Group historical account, but obtain permission for archival photographs. Only with multiple verified milestones and approved archival assets should we test a desktop pinned horizontal timeline. Start with a readable vertical timeline; no scroll hijacking. On small screens and reduced-motion preference the same content remains a normal vertical list. Provide an ordinary navigation path and no trapped keyboard focus.

### Frame-by-frame scroll sequence
A true canvas sequence requires a coherent licensed frame set shot for the task, correct loading priorities, poster fallback, 1x/2x delivery strategy, scrubbing in both directions and device memory tests. Do **not** generate fictional images of the real centre or simulate "day to night" with fake footage. The current single-image zoom is the honest interim interaction.

### Parallax / floor map
Only consider a restrained 10–15% depth difference once verified floor-map geometry or authentic media exist. Avoid decorative faux-3D maps and never move interactive store labels away from real hit targets. The 3-level text directory remains the accessible fallback.

### Shared element transition
The store-card-to-detail transition can be prototyped using progressive enhancement once the routing and page navigation tests pass. Keep browser history, focus and deep links correct. Avoid introducing a large animation library solely for the effect. Reduced motion navigates immediately.

### Tab crossfades
Only animate actual alternate tabs. Do not add artificial tabs to the Visit page for animation alone.

### Mega menus
Do not invent a mega menu when the current navigation structure doesn't need one. If real nested navigation is introduced later, anchor dropdown animation to its trigger with 150–250ms duration and full focus/keyboard support.

## Explicit exclusions

No scrolling marquees, infinite autoplay video loops, bounce on routine UI, fake loaders, animated letter-by-letter hero headings, horizontal scrolling that traps users, mandatory intro sequences or forced delay before filters update.

## Accessibility and quality gate

- `prefers-reduced-motion: reduce`: no essential content hidden, no zoom, staggers or entrance movement. Menu and tabs operate instantly.
- No fallback should depend on JavaScript discovering a viewport position to make core text visible.
- Test 320, 360, 390, 768, 1024 and 1440px; 200% zoom, browser back/forward, touch and keyboard.
- Test mobile menu Escape, tab focus containment, closing by navigation, and native scrolling behind the menu.
- Store search remains instantaneous even during rapid keyboard input; do not recreate cards or stagger all 31 results on each keystroke.
- Do not claim the final experience has been browser-tested until an actual device/browser check is recorded.
- Prefer transforms and opacity; no CSS `transition: all` or large blur/mask work.
