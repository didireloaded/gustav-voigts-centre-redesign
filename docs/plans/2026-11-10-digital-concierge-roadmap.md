# Gustav Voigts Centre Digital Concierge Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the existing Gustav Voigts Centre site from a useful directory into a trustworthy, distinctive, accessible digital concierge for visitors.

**Architecture:** Keep the existing TanStack Start React/TypeScript app and its file-based routes. Preserve the verified directory as the initial source of truth, then introduce approved media, structured content and clearly bounded server-backed interactions. Prefer a few content-led editorial sequences over a global animation framework.

**Tech Stack:** TanStack Start, TanStack Router, React, TypeScript, Tailwind CSS, Lucide, Vitest, and Lovable's configured hosting/integrations.

## Global Constraints

- Follow `.agents/skills/website-design-craft/SKILL.md` and the applicable references, especially anti-slop, motion, accessibility, real-assets and QA.
- Retain the approved Gustav Voigts editorial visual thesis. Charcoal, white, warm neutral and selective yellow. Do not replicate City Plaza branding.
- Use authentic approved centre imagery and real tenant information. Do not invent events, shop positions, services, stock, ratings, parking prices or hours.
- Do not remove verification notices by presenting unconfirmed details as true. For launch, use visitor-friendly factual wording and keep operational uncertainty visible when material.
- Existing production domain is out of scope. GitHub `main` is connected to Lovable. No force pushes, schema edits outside Lovable, or changes to generated router files.
- Avoid scroll hijacking, auto-advancing directory results, excessive badges/cards/dividers, gradient decoration, looped marquees and motion that delays tasks.
- Reduced-motion mode, touch, keyboard, 200% zoom and slow-network fallbacks are release criteria.
- This plan is documentation, not evidence that features are implemented or tested.

## Verified project baseline (10 Nov 2026)

- Current repository already has `src/routes/index.tsx`, `src/routes/stores.index.tsx`, `src/routes/stores.$slug.tsx`, `src/routes/visit.tsx`, `src/routes/discover.tsx`, `src/routes/about.tsx`, `src/routes/contact.tsx`, `src/data/stores.ts` and `src/components/site/FloorFinder.tsx`.
- The published directory has 31 seed records. The code exposes name, category, listed category, floor, phone and slug. Current directory filters support text, category and floor.
- Detail routes already exist, but currently have limited editorial information and no share control.
- The app is TanStack Start, *not* merely a static React SPA. Audit actual SSR HTML, metadata, canonical URLs and indexing before claiming either SEO success or failure.
- The current visit page displays unverified trading hours and parking details. Content approval is a separate task.
- The AI Store Finder and store share functionality have been requested but are **not implemented** in the checked baseline.
- No verified interactive architectural floor map, active events CMS or confirmed management update workflow currently exists.
- An earlier Lovable build reported type/route errors. Re-run commands and repair any current failures before new feature work; never assume that earlier errors remain or have disappeared.

## Evidence and positioning

- Source: https://weckevoigts.com/history/ records construction starting in 1971 and centre completion in 1973. The site's heritage positioning can use these dates with proper editorial attribution.
- Original centre: https://gustavvoigtscentre.com.na/page/about/ and https://gustavvoigtscentre.com.na/page/store-directory/.
- Maerua has searchable, category-filtered stores: https://maeruamall.com/store-directory.html. Store discovery is table stakes.
- Wernhil has parking information and promotional content: https://wernhil.com/media-info-centre/ and https://wernhil.com/specials/. Do not copy competitor claims or layouts.
- Differentiation: Windhoek CBD location, historically grounded 1973 story, carefully presented independent and anchor tenants, unusually clear wayfinding and efficient visit planning.

## Phase 0 — Trust and delivery foundation

### Task 1: Establish a verified baseline and working preview

**Files:**
- Inspect: `package.json`, `src/router.tsx`, `src/routes/__root.tsx`, `src/components/site/FloorFinder.tsx`, `src/routes/stores.index.tsx`
- Modify: only the specific failing source files identified by a fresh build or interaction test
- Test: existing `src/test/` and focused regression tests where a failure is found

**Interfaces:**
- Consumes: existing router, directory types and components.
- Produces: passing build/test baseline plus an issue log with reproducible steps.

- [ ] **Step 1: Run and record baseline failures.** Run `bun install --frozen-lockfile`, `bun run build`, `bun run test`, and `bun run lint`. Record exit codes and errors; do not silently suppress failures.
- [ ] **Step 2: Reproduce visitor-critical issues.** Open `/`, `/stores`, a valid `/stores/:slug`, `/visit`, `/discover`, `/about`, `/contact` and an invalid route. Test floor tabs with pointer and keyboard. Record observed failures.
- [ ] **Step 3: Fix only observed failures.** Preserve TanStack file-based routing and auto-generated files. Ensure floor selection uses valid floor IDs and moves focus correctly, search params survive browser back/forward, and deep links resolve directly.
- [ ] **Step 4: Verify the focused fix.** Run tests that fail before the fix and pass afterward. Repeat `bun run build`, `bun run test`, `bun run lint`.
- [ ] **Step 5: Record responsive results.** Check widths 320, 360, 390, 768, 1024 and 1440px, 200% zoom and reduced motion. No horizontal overflow, inaccessible menu or clipped CTA.
- [ ] **Step 6: Commit passing changes only.** Commit the minimum affected files separately from unrelated design work.

### Task 2: Approve truthful visitor content and media

**Files:**
- Inspect/modify: `src/data/stores.ts`, `src/data/centre.ts`, `src/components/site/Photo.tsx`, `src/routes/visit.tsx`, `src/routes/about.tsx`
- Proposed: `docs/content/tenant-verification.csv` and `docs/content/media-register.md`
- Test: proposed `src/test/content-integrity.test.ts`

**Interfaces:**
- Consumes: management-approved tenant master list, opening hours, parking rules and properly licensed centre photos.
- Produces: reviewed store facts and a media inventory with source, licence/permission, capture date, crop and alt text.

- [ ] **Step 1: Capture missing evidence.** Verify each store name, current occupancy, floor, phone and category with management. Record verification date. Confirm centre hours, exceptions, parking access/costs, accessibility facilities and exact entrance details.
- [ ] **Step 2: Curate real images.** Request an approved wide hero, centre exterior, escalator/atrium, portrait details and representative storefront photography. Use existing official-site photos provisionally only with clear permission review; never label unrelated stock or generated pictures as the actual mall.
- [ ] **Step 3: Improve presentation.** Replace visible “photograph pending” as the hero's featured content with a distinctive type-led fallback while awaiting approved media; preserve a truthful status in appropriate visitor-information copy. Do not hardcode false facts to fill whitespace.
- [ ] **Step 4: Test integrity.** Confirm 31 original seeded records remain accounted for until the approved list replaces them; no duplicate slugs, broken telephone links, false tenant hours or missing-image layout shifts.
- [ ] **Step 5: Recheck key routes.** At mobile and desktop sizes, confirm all approved images crop coherently and the visitor always sees the centre's accurate address and ways to contact tenants.
- [ ] **Step 6: Commit only approved content.** Store provenance outside public visitor pages but make visitor-facing uncertainties explicit where relevant.

## Phase 1 — Useful concierge features

### Task 3: Share individual store pages

**Files:**
- Create (proposed): `src/components/site/ShareStore.tsx`
- Modify: `src/routes/stores.$slug.tsx`
- Test (proposed): `src/test/share-store.test.tsx`

**Interfaces:**
- Consumes: `Store` with `{name,slug,floor}`; current browser origin and route location.
- Produces: `ShareStore({ store }: { store: Store })` UI with explicit success/cancellation/failure feedback.

- [ ] **Step 1: Add failing tests.** Native share resolves, rejects with `AbortError`, API absent with clipboard available, clipboard permission rejected, deep-link URL escaping. Assert no false “Link copied” on failure.
- [ ] **Step 2: Confirm failure** with `bun run test -- src/test/share-store.test.tsx`.
- [ ] **Step 3: Implement minimum behavior.** Web Share API with exact current origin and `/stores/${encodeURIComponent(slug)}`. Use copy-link fallback and accessible `aria-live` feedback. Use an ordinary link rather than fake sharing when both share and clipboard are unavailable.
- [ ] **Step 4: Re-run focused test** and require all assertions to pass.
- [ ] **Step 5: Integration check.** Verify phone and desktop behaviour, including preview domain, copied deep links, navigation after share, cancel and permission denial. Run build/lint.
- [ ] **Step 6: Commit passing feature.**

### Task 4: Add a grounded AI Store Finder

**Files:**
- Create (proposed): `src/components/site/AIStoreFinder.tsx`, `src/lib/ai-store-matching.ts`, a TanStack Start server-only gateway handler matching the installed version's supported API, `src/test/ai-store-matching.test.ts`
- Modify: `src/routes/stores.index.tsx` and optionally `src/routes/index.tsx`
- Store source: `src/data/stores.ts` (observed)

**Interfaces:**
- Consumes: `{ query: string }` (server-validated visitor text) and allowlisted verified `Store[]`.
- Produces: `{ summary: string, matches: Array<{slug: string, reason: string}>, noMatch: boolean }`, with the server reconciling each slug against the directory and populating all business facts from source records.

- [ ] **Step 1: Write failing tests.** Model returns valid slugs; fabricated slug; duplicate slug; off-topic question; blank or excessive input; no-match answer; gateway unavailable; injected instruction inside visitor query. Results must never display invented stores, hours, products, prices, services or guarantees.
- [ ] **Step 2: Run focused test** and record expected failure.
- [ ] **Step 3: Add server-side AI Gateway integration.** Use Lovable's supported gateway, with model calls and credentials on the server only. Validate input and structured response. Send the model only necessary directory facts. Bound list length and use rate limiting as the configured environment permits.
- [ ] **Step 4: Build a small editorial interface.** Prompt “What are you looking for?” with a few factual example queries. Display 1–5 ranked matches with name, published category, level, phone, concise rationale and actual detail links. Show loading, error/retry and truthful no-match states. When the gateway isn't configured, state that AI recommendations are unavailable and leave ordinary directory search fully usable.
- [ ] **Step 5: Run tests, build and inspect response behavior.** No exposed `LOVABLE_API_KEY`, hallucinated directory facts, broken model fallback, duplicate requests or misleading loading state.
- [ ] **Step 6: Commit only when gateway testing is possible and the core directory remains usable.** Lovable secret/configuration changes must happen through Lovable, not through the GitHub repo.

### Task 5: Make store discovery editorial and accessible

**Files:**
- Modify: `src/components/site/StoreTile.tsx`, `src/routes/stores.index.tsx`, `src/routes/stores.$slug.tsx`
- Test (proposed): `src/test/directory-interactions.test.tsx`

**Interfaces:**
- Consumes: current URL search fields `q`, `floor`, `category` and verified `STORES`.
- Produces: result counts, accurate filters, accessible list view and store details, without losing deep-linkable filter state.

- [ ] **Step 1: Test filter behaviour and long content.** Case-insensitive search, empty results, clear all, back/forward, categories, 31 records, long names, 200% zoom, pointer and keyboard.
- [ ] **Step 2: Confirm a failing design/usability case** before changing layout.
- [ ] **Step 3: Refine visual hierarchy.** Introduce grouped/editorial directory presentation rather than repeating identical bordered cards for all 31 entries. Keep dense scanning possible, avoid decorative tags and excessive stagger on every keystroke.
- [ ] **Step 4: Use verified store copy only.** Expand descriptions, logos and storefront images only after approval. Otherwise prioritize name, category, floor and call action; don't fabricate product catalogues.
- [ ] **Step 5: Pass focused tests and inspect mobile.** Filtering should be immediate, accessible and remain functional with reduced motion.
- [ ] **Step 6: Commit passing improvements.**

## Phase 2 — Living content and visitor wayfinding

### Task 6: Managed “What's On” content hub

**Files:**
- Modify: `src/routes/discover.tsx`, `src/routes/index.tsx`
- Create (proposed): `src/components/site/WhatsOnFeed.tsx`, `src/lib/content/types.ts`, and a CMS adapter after selecting a supported service
- Test (proposed): `src/test/whats-on.test.ts`

**Interfaces:**
- Consumes: confirmed `{id,slug,title,type,startAt,endAt?,status,image?,summary,body}` items from an authorized content source.
- Produces: event/promotion/news listing with current and upcoming content, expiry filtering and detail pages for genuine articles.

- [ ] **Step 1: Add tests.** Future and current events render; expired promotions do not show as active; empty content hides the promotional hero and offers a purposeful directory link; unknown images use a safe fallback.
- [ ] **Step 2: Validate expected failure.**
- [ ] **Step 3: Select content owners and editing workflow.** Management must assign an editor, publishing approval and archival/expiry rules before launch. Database/CMS integrations should use supported tools and genuine credentials.
- [ ] **Step 4: Implement public surfaces.** Date and promotion labels must reflect verified items, not sample/demo records. No carousel unless sufficient real content and meaningful navigation exist.
- [ ] **Step 5: Test editorial operations and visitor experience.** Create/edit/expire flow, mobile layout, keyboard navigation, SEO metadata and image loading. Run build/lint/tests.
- [ ] **Step 6: Commit approved feature.**

### Task 7: True three-level wayfinding

**Files:**
- Modify: `src/components/site/FloorFinder.tsx`, `src/routes/visit.tsx`
- Create only after approved architectural geometry: `src/data/wayfinding.ts`, `src/components/site/InteractiveFloorMap.tsx`
- Test (proposed): `src/test/wayfinding.test.tsx`

**Interfaces:**
- Consumes: approved floor SVG geometry, unit IDs and explicit store-to-unit assignments.
- Produces: accessible floor selector, actual unit highlighting, clickable stores and equivalent text directory.

- [ ] **Step 1: Define approval inputs.** Obtain up-to-date floor plan, accessible entrances, vertical circulation and mappings for occupied/vacant spaces.
- [ ] **Step 2: Test missing/invalid geometry.** Fallback is existing floor-filtered directory and a clear map-unavailable message, not fictional positions.
- [ ] **Step 3: Implement lightweight SVG map.** Select level, find store, highlight verified unit and open detail page. Keep an equivalent keyboard/screen reader list and avoid heavyweight 3D by default.
- [ ] **Step 4: Test integration.** Every map selection matches the directory; long names, keyboard, touch zoom, small screens and 200% zoom work.
- [ ] **Step 5: Check load/performance.** No needless map library for a simple 2D plan; no large blocking JavaScript bundle.
- [ ] **Step 6: Commit with approved floor data.**

## Phase 3 — Signature heritage storytelling and motion

### Task 8: Heritage-led editorial sequence

**Files:**
- Modify: `src/routes/about.tsx`, `src/routes/index.tsx`, `src/styles.css`
- Create (proposed): `src/components/site/HeritageTimeline.tsx`, `src/data/heritage.ts`
- Test (proposed): `src/test/heritage.test.tsx`

**Interfaces:**
- Consumes: dated, attributed historical milestones and approved archival/current images.
- Produces: readable editorial history at every viewport and, only where valuable, one enhanced scroll-bound desktop sequence.

- [ ] **Step 1: Verify historical milestones.** The Wecke & Voigts Group history documents construction beginning in 1971 and completion in 1973. Attribute them and request permission for archival photos. Do not invent milestones or imply a historic store is currently trading.
- [ ] **Step 2: Write tests for content and fallback.** Chronology, external attribution, no missing images, reduced motion and keyboard access; text remains visible without JS-driven scroll animation.
- [ ] **Step 3: Implement content-first base view.** An elegant vertical timeline with real media and human-written copy, designed mobile-first.
- [ ] **Step 4: Consider one signature desktop motion treatment.** Optional horizontal/pinned heritage gallery only when it improves chronology and does not trap scroll or create blank regions; disable pinning for reduced motion and smaller screens.
- [ ] **Step 5: Validate actual performance.** Measure interaction responsiveness, image loading, memory use and back/forward behaviour. Prefer opacity/transform and native browser primitives; GSAP only if it clearly earns its cost.
- [ ] **Step 6: Commit only if the nonanimated experience is already complete and verified.**

## Content approval and release gates

Before any public launch:
1. Management approves each current tenant's name, level and contact details, and confirms or removes outdated businesses.
2. Management confirms general opening hours, parking rates, entrances and relevant accessibility details.
3. Image rights are documented for hero, interior, tenant and archival assets; approved media has good mobile crops.
4. Content owners exist for events, news and promotions, with expiry rules.
5. Share links are accurate; AI results are grounded in actual directory records, server-protected and tested against hallucinated slugs.
6. Inspect server-rendered output for `/stores` and one store detail page, including metadata and crawlability. Do not assume the existing TanStack Start app is CSR-only.
7. Run `bun run build`, `bun run test`, `bun run lint`. Browser-test critical journeys at 320/360/390/768/1024/1440 and 200% zoom, plus reduced motion and slow network.
8. Confirm production redirects, preview-only labels, no exposed secrets, and contact enquiry delivery semantics. Publishing remains a separate approved action.

## Product decisions requiring approval or external inputs

- Confirm whether the site will permanently use the charcoal/white/yellow visual system or evolve it with a supplied official centre identity.
- Confirm authorized people for tenant, parking and trading-hour validation.
- Confirm image rights and availability of 1970s archive material.
- Select a managed content publishing workflow (CMS and editorial owner) for live events and promotions.
- Decide whether the existing mailto contact flow should be replaced with server-side enquiry delivery, including spam protection and retention policy.
- Confirm the Lovable AI Gateway configuration and quota before enabling model-backed recommendations.
- Obtain accurate architectural plans and tenant unit assignments before attempting a visual floor map.
- Approve the level of Apple-style scroll treatment after a real content prototype, with performance and reduced-motion checks.

## Next recommended delivery order

**First:** Task 1 baseline + Task 2 content/media approval.  
**Next:** Task 3 share pages + Task 5 directory refinement.  
**Then:** Task 4 grounded AI Store Finder, dependent on working Lovable AI Gateway.  
**After management content workflow exists:** Task 6 What's On and Task 7 real wayfinding.  
**Last:** Task 8 one restrained heritage-driven scroll sequence.

This order is a delivery recommendation, not a claim that later features are currently implemented.
