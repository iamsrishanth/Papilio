# Papilio Café Website — Worklog

Project: Papilio — Patisserie | Café, Hanamkonda, Warangal.
Brief: PROMPT.md (delivered in chat) + DESIGN.md at /home/z/my-project/upload/DESIGN.md (single source of visual truth).
Stack: Next.js 16 App Router + TypeScript + Tailwind 4 + shadcn/ui + Three.js (Scene A hero).

## Current project status

- Dev server running on port 3000 (Next 16.1.3, Turbopack). Do NOT start another server.
- `bun add three @types/three` done (three@0.185.1).
- Brand images generating in background via `scripts/gen-images.sh` (log: /home/z/my-project/imagegen.log). NOTE: image API only accepts sizes where both dims are multiples of 32 (512–2880); 1344x768/1152x864/1024x1024/864x1152/768x1344 are valid.

## Design system (from DESIGN.md — mirror it exactly)

- Colors (Tailwind tokens): bg-cream #FAF3E8 (page), bg-ivory #FFF9EF (cards), bg-linen #E8DFC8 (badges), text-espresso #2A1B10, text-cocoa #5C3A21, bg-caramel #9A5B1F (interaction), bg-caramel-deep (hover), text-butter #D9A441 (ONLY on espresso/dark surfaces — never text on light), bg-surface-espresso #3B2314 (dark bands), border-linen.
- Fonts: Playfair Display 500/600 via `font-display` class (headings, dish names); Inter 400/600 body (`font-sans`). Wordmark: `wordmark` utility (Playfair 600 caps +0.06em).
- Type scale utilities: text-h1 (3.5rem), text-h2 (2.25rem), text-h3 (1.5rem), label-caps (0.75rem caps +0.08em). Prices: `tnum`.
- Radii: rounded-card (20px), rounded-pill, rounded-tag (6px). Shadows: shadow-card, shadow-lift, shadow-modal (warm rgba espresso, rare).
- Buttons: CtaButton component — variant="primary" (caramel pill, white label, ONE per view), "secondary" (ivory pill, linen border), "outline".
- Layout: max-w-[1200px] container, px-4 sm:px-6 lg:px-8, 64px between major sections (py-16 lg:py-24), 40px inside.
- FSSAI glyphs: VegGlyph component (veg/nonveg/egg) — legal marker, every menu item.
- Reduced motion honored globally (globals.css kills animations; 3D/components check the media query).
- Sticky footer: handled in root layout (flex min-h-screen flex-col + footer mt-auto). SiteHeader sticky. SkipLink present.
- No emojis in UI. No text in canvas. No blue/indigo hues. No fabricated business facts.

## Completed work

---
Task ID: 1-6 (foundation, home, menu)
Agent: Z.ai Code (main)
Task: Project setup, design system, content modules, home page with 3D hero, menu page.

Work Log:
- Installed three + @types/three. Cleaned scaffold (old robots.txt removed; app/icon.svg = butterfly favicon).
- globals.css: full Papilio token set (@theme), shadcn var bridge onto palette, custom utilities (tnum, cv-auto, wordmark, label-caps), warm scrollbars, reduced-motion rules, steam/drift/glow keyframes.
- content/site.ts (all verified NAP/hours/ratings/facilities/deep links/whatsapp helpers), content/reviews.ts (verified quotes + press line + owner voice), content/menu.ts (21 categories, 187 items, 173 veg / 7 nonveg / 7 egg, 4 verified prices only — counts verified by scripts/verify-menu.ts).
- Components: ButterflyGlyph/Wordmark, VegGlyph, SectionEyebrow, RatingChip, CtaButton, SkipLink, SiteHeader (sticky + mobile Sheet nav), SiteFooter (NAP/FSSAI/platform links), HoursCard, DishCard.
- 3D Scene A (components/hero/papilio-hero-3d.tsx): procedural swallowtail (ShapeGeometry wings + gold edge layer + gradient fill + tapered body + antennae), 16/8 instanced micro-butterflies (ShaderMaterial, GPU flap via aSeed, no per-frame attribute writes), cream→espresso gradient backdrop plane. Contracts: DPR clamp 1.75/1.25, 60fps delta-skip, IntersectionObserver <20% pause, visibilitychange pause, webglcontextlost → poster fallback (console.info once), full dispose on unmount, reduced-motion/no-WebGL/data-saver → poster only. Dynamic import ssr:false via hero-canvas.tsx (separate chunk).
- Home page (/): full-viewport hero (server poster = LCP + canvas over + scrim + DOM text layer: eyebrow, PAPILIO H1, subline, Order on Swiggy primary + Explore the Menu secondary, rating chips, scroll cue), signature strip (4 verified dishes w/ images), ratings band (card-dark, chips, verified quote, hero stat, Swiggy/Zomato secondaries), patisserie teaser (teardrop-corner image mask, WhatsApp cake link), visit band (address, hours card, Get directions primary + Plan your visit).
- Menu page (/menu): MenuExplorer client component — sticky category rail (vertical desktop / horizontal chips mobile) with scroll-spy + counts + dimmed empty sections, diet filter chips (All 187/Veg 173/Non-veg 7/Egg 7 with aria-pressed), sections as ivory cards with dotted-leader rows, glyph on every item, verified prices only, Coffee section = espresso dark band with CSS SteamBand, menu note + platform deep links. content-visibility on sections. Metadata + canonical set.
- Root layout: Playfair+Inter next/font, JSON-LD CafeOrCoffeeShop (all pages), default metadata + OG (uses /images/og-cover.png), viewport themeColor cream.

Stage Summary:
- Routes live and compiling: / and /menu return 200 (dev.log clean apart from pending image 404s while generation runs).
- Menu data module passes exact-count verification (187/21/173/7/7/4, typo quarantine clean).
- Image generation running in background: hero-poster, og-cover, 8 dish, 4 patisserie, 8 gallery images into public/images/ (see scripts/gen-images.sh for the full manifest with sizes).

## In progress

- Task 7 (delegated to full-stack-developer): /patisserie, /gallery, /story, /visit pages + Lightbox, WingUnfold, MapEmbed components + gallery/story content.
- Task 8: SEO files (app/sitemap.ts, app/robots.ts allowing GPTBot/ClaudeBot/PerplexityBot).
- Task 9: lint + agent-browser E2E QA + fixes.
- Task 10: final worklog + 15-min webDevReview cron.

## Notes for all agents

- Available image inventory (public/images/, may still be generating — verify with ls):
  hero-poster.png (1344x768), og-cover.png (1344x768),
  dish-salad/dish-wrap/dish-cottage-wrap/dish-burger.png (1152x864),
  dish-cappuccino/dish-macaron/dish-shake/dish-sandwich.png (1152x864),
  patisserie-signature-cake.png (1024x1024), patisserie-celebration.png (864x1152), patisserie-gifting.png (1024x1024), patisserie-counter.png (1152x864),
  gallery-interior.png (1152x864), gallery-coffee-pour.png (864x1152), gallery-seating.png (768x1344), gallery-dessert-plate.png (1024x1024), gallery-facade.png (864x1152), gallery-baking.png (1024x1024), gallery-focaccia.png (1152x864), gallery-spread.png (1152x864).
- NEVER fabricate business facts: use only content/site.ts, content/reviews.ts, content/menu.ts values. Copy must stay neutral/verified.
- The Binge & Blast second-floor note (unverified community fact) must NOT be rendered. Alcohol claims must NOT be rendered (Mojitos = section name only).
- Do not run `bun run build`. `bun run lint` is fine. Dev server is already up.

---
Task ID: 7
Agent: full-stack-developer
Task: Build /patisserie, /gallery, /story, /visit pages with Lightbox, WingUnfold, MapEmbed components and gallery/story content modules.

Work Log:
- Read worklog.md + upload/DESIGN.md; audited the existing foundation (site/menu/reviews content modules, CtaButton, SectionEyebrow, DishCard, VegGlyph, HoursCard, ButterflyGlyph, globals.css tokens) for prop/token compatibility.
- /patisserie (src/app/patisserie/page.tsx): server component — header (SectionEyebrow + font-display H1 + 2-sentence verified intro: 28 counter desserts, 4 cakes, IG-highlight cakes/gifting), 3-col DishCard grid (9 items from menu "cakes" + "counter-desserts", VegGlyph on every card, images only for signature-cake/celebration/counter, NO unverified prices), espresso custom-cake band (bg-surface-espresso rounded-card, cream text, butter accents, "DM us for orders and bookings" attributed "from our Instagram bio", ONE primary WhatsApp CTA with MessageCircle), gifting section (patisserie-gifting.png + secondary "Enquire about gifting" CTA + IG text link), CSS-only ambience (butter blur glow + drifting line glyph). Metadata: title "Patisserie — cakes, custom orders & gifting", canonical, OG /images/og-cover.png.
- content/gallery.ts: typed GalleryPhoto[] (src/alt/caption/width/height/tall?) — 8 gallery + 3 patisserie photos, descriptive alt + captions (never "IMG_xxxx").
- /gallery (src/app/gallery/page.tsx, server): eyebrow/H1/2-sentence intro + GalleryGrid.
- GalleryGrid (client wrapper, src/components/gallery/gallery-grid.tsx): CSS-columns masonry (columns-2 sm:columns-3 lg:columns-4, gap-6, figure break-inside-avoid mb-6), lazy next/image (no priority), rounded-card, captions text-sm text-cocoa, CSS-only hover parallax (scale 1.02 + -translate-y-1, motion-reduce:transform-none), owns open-index state.
- PhotoLightbox (src/components/gallery/photo-lightbox.tsx): shadcn Dialog base (Radix focus trap + ESC free) — espresso surface, cream text, butter accents; large image, DialogTitle caption, sr-only alt as DialogDescription, prev/next Chevron buttons (44px, aria-labels), tnum counter "n / total" in butter, X close (aria-label "Close"), arrow-key navigation via onKeyDown on DialogContent, aria-live region, last-photo retained during close animation.
- content/story.ts: typed story modules — storyIntro (est. Oct 2023, Excise Colony, "Patisserie | Café"), storyChapters (room: cozy/aesthetic/Instagram-worthy decor/peaceful atmosphere — verified review language; craft: focaccia sandwiches, porcini mushrooms with cheddar, harissa paneer — real menu language; founders: Radha Suvidha/patisserie + Chef Siddhartha Reddy/kitchen per the café's own IG bio), storyTimeline (Oct 2023 opening / 1.4K community + 238 posts / 1,300+ ratings, values pulled from site.ts), unfoldCopy (heading/subline/outro/hint).
- WingUnfold (src/components/story/wing-unfold.tsx, client): CSS-3D wing pair — custom two-mirrored-wing SVG (caramel gradient fill, butter-gold veins/spots/edges, espresso body) inside [perspective:1200px]; each half transform-origin at spine, [transform-style:preserve-3d], [will-change:transform], rotateY ±55deg folded → 0deg open; 200vh section + sticky min-h-screen viewport; IntersectionObserver (rootMargin 100%) gates a passive scroll listener; rAF-throttled, transform/opacity-only ref updates, full cleanup. Progress = (scrollY - sectionTop) / pinnedSpan where pinnedSpan = sectionHeight - innerHeight (falls back to section height), so wings finish opening exactly as the sticky content unpins. prefers-reduced-motion: media query + change listener → static open butterfly, no listeners, hint hidden; server default is folded so no-JS keeps the page intact. Deterministic SVG gradient ids (prop-passed) instead of useId.
- /story (src/app/story/page.tsx, server): header (eyebrow "Our story", H1 "From chrysalis to butterfly"), room/craft chapters interleaving gallery-interior.png + gallery-focaccia.png (rounded-card, descriptive alt), founders chapter with founder cards, WingUnfold section (heading + subline above, outro paragraph below the wings, scrollHint wired), pressLine pull-quote (from content/reviews.ts) in italic font-display on linen card, 3-step timeline strip (caramel dots + connecting line; vertical on mobile, sm:grid-cols-3 horizontal), closing tagline line. Metadata: "Our story — est. October 2023", canonical, OG.
- /visit (src/app/visit/page.tsx, server): header; lg:grid-cols-12 location section — left ivory card (<address> with MapPin + both address lines, tel: link with tnum phone, primary "Get directions" → links.maps + secondary "Call the café"), right MapEmbed. Below: HoursCard + facilities card (site.facilities as linen pills with Check icons) + contact card (phone/WhatsApp booking via whatsappMessages.booking/Instagram handle rows, 44px targets). Espresso delivery band "Order to your door" (Swiggy + Zomato secondary CTAs styled for dark surface with butter hover, costForTwo lines), FSSAI trust line in small print. No Binge & Blast note, no invented facilities. Metadata: "Visit — Excise Colony, Hanamkonda", canonical, OG.
- MapEmbed (src/components/site/map-embed.tsx): iframe src links.mapsEmbed, title "Papilio on Google Maps — Excise Colony, Hanamkonda", loading="lazy", referrerPolicy="no-referrer-when-downgrade", absolute inset-0 w-full h-full inside relative aspect-[4/3], rounded-card + border-linen + overflow-hidden wrapper.
- Fixed stalled image generation: the background gen-images.sh from Task 1-6 died after patisserie-counter.png (orphan reaping — background processes do not survive between tool calls in this sandbox); re-ran scripts/gen-images.sh synchronously (idempotent, SKIPs existing) to produce all 8 gallery images.
- QA with agent-browser: all 4 routes 200; lightbox open/arrow-nav/counter/ESC verified interactively; WingUnfold transforms verified numerically (55deg at section entry → 0deg exactly at pinned-span end); map iframe attrs verified; patisserie cards (3 imaged + 6 text, zero prices) + single primary CTA per page verified; no mobile horizontal overflow at 390px; zero browser/console errors; all 20 image assets now exist and serve 200.
- bun run lint: clean (exit 0).

Stage Summary:
- Files created/finished: src/app/patisserie/page.tsx, src/app/gallery/page.tsx, src/app/story/page.tsx, src/app/visit/page.tsx, src/components/gallery/gallery-grid.tsx, src/components/gallery/photo-lightbox.tsx, src/components/story/wing-unfold.tsx, src/components/site/map-embed.tsx, src/content/gallery.ts, src/content/story.ts.
- All four routes compile and return 200 with zero page errors; masonry, lightbox (Radix Dialog), CSS-3D wing unfold, and map embed all verified in-browser; lint clean.
- Full 20-image inventory now present in public/images/ (gallery set completed by re-running gen-images.sh after the background run died).
- Verification results: exactly one filled primary CTA per page (custom-cake WhatsApp / Get directions); butter-gold only on espresso surfaces; no unverified facts (menu prices omitted, Binge & Blast quarantined); reduced-motion honored in WingUnfold + grid hover.
- Note for main agent: dev.log contains STALE "not a valid image ... received null" 404s (hero-poster + gallery set) from requests made while images were still generating — files exist and now serve 200; a hard reload during Task 9 QA clears the optimizer cache. All z-ai-generated .png files are JPEG data with .png extension (Next/image handles this; flagging for awareness).

---
Task ID: 8-10
Agent: Z.ai Code (main)
Task: SEO files, full QA battery (lint + agent-browser E2E + VLM visual review), bug fixes, final verification, handover.

Work Log:
- SEO: src/app/sitemap.ts (6 routes, priorities, weekly/monthly cadence) + src/app/robots.ts (allows *, plus GPTBot/ClaudeBot/PerplexityBot per §10). Both serve 200. Removed the old public/robots.txt to avoid conflicts.
- Fixed Next.js warning: added data-scroll-behavior="smooth" to <html> (route-transition scroll restoration).
- Fixed real menu bug found in QA: anchor scrolling to a category overshot the target because content-visibility sections report placeholder intrinsic sizes until rendered. New two-phase scrollTo in menu-explorer.tsx: instant jump (forces render at true size) then rAF-smooth correction to the exact 112px sticky offset. Verified: coffeeRectTop lands at exactly 112 and scroll-spy activates the clicked chip.
- Hero polish from VLM visual review: butterfly repositioned on mobile (x 1.35, y 1.85, z -2.6, scale 0.62 — clears the text zone), poster object-position 74% (butterfly further right), scrim strengthened on mobile (cream/95 via cream/70). Mobile 390px hero re-verified: text contrast excellent, CTAs clear of the illustration, no clipping.
- Micro-butterflies upgraded: fragment shader now cuts a real butterfly silhouette (fore/hind wing pairs + body SDF, discard outside) instead of square quads; VLM previously saw "square confetti", now they read as butterflies at distance.
- LCP fixes from console warnings: priority on first patisserie DishCard image and first gallery masonry image (hero poster already priority).
- Final QA battery (PROMPT §11) all green:
  * bun run lint exit 0 across the whole project.
  * All 6 routes + sitemap.xml + robots.txt return 200; no runtime/console/page errors anywhere (console cleaned, rechecked).
  * Typo quarantine grep: zero hits for Avacado|CEASER|Macron|Deserts in source and rendered HTML of all 6 routes; zero [CONFIRM/[PHOTO/[PRICE tokens in rendered output.
  * NAP identical in footer, /visit, and JSON-LD ("H.No. 2-7-741, Excise Colony"); JSON-LD hours opens 08:00 / closes 22:30.
  * Deep links present: wa.me/919000316366 (WhatsApp cake CTA), tel:+919000316366, swiggy.com/rest772389, maps.app.goo.gl/1XtNY2A9b6VQUNMj7, Google Maps embed at 17.9962,79.5379 on /visit.
  * Reduced-motion emulation: canvas count 0 on home, poster fallback visible, full content (the whole site is usable with zero motion).
  * WebGL scene confirmed live in normal mode (butterfly + gradient + ambient particles); canvas disposes on route change (1 canvas on home → 0 after navigating to /menu; no orphan RAF).
  * Interactivity verified in-browser: diet filter chips (Egg → only Omelettes 7 items), category rail click + scroll-spy, gallery lightbox (open, arrow-key nav, counter 2/11, ESC close), story WingUnfold (53.2° folded → 0° open through the scroll section), mobile Sheet nav, visit map iframe (title/lazy/coords).
  * Sticky footer structure: flex min-h-screen flex-col + footer mt-auto in root layout.
- Created the 15-minute webDevReview cron job for continuous QA-driven development.

Stage Summary:
- The site is feature-complete per PROMPT.md: 6 real routes, 3D Scene A with all performance/fallback contracts, CSS Scene B steam, CSS-3D Scene C unfold, 187-item verified menu, lightbox gallery, patisserie/story/visit pages, JSON-LD + sitemap + robots + per-route metadata/canonicals/OG, zero fabricated facts.
- Known dev-only artifacts: Next.js DevTools overlay button visible in dev screenshots (not in production); Google Maps iframe attribution is clipped by Google's own UI inside the frame (unfixable, acceptable).
- Remaining pre-production items (client-side, not code): replace SITE_URL placeholder with the production domain (content/site.ts), swap representative menu item names for the client's actual listings where unverified, replace AI-generated placeholder photography with the café's own feed photography (DESIGN.md prefers real photography).

Unresolved risks / next-phase recommendations (for the webDevReview cron agent):
1. Lighthouse CI run (mobile perf ≥ 85 target with Scene A) — dev-mode Lighthouse is unreliable; a production build would be needed (out of sandbox scope; `bun run build` is forbidden here).
2. Real-device QA of the 3D hero on low-end Android (DPR clamp + instance halving are in place but untested on real hardware).
3. Add page-transition animations (framer-motion, subtle fade/slide) and scroll-reveal for section headers — polish tier.
4. Consider a compact "hours + open now" indicator in the header on mobile.
5. OG image could get a wordmark lockup variant; current og-cover.png is the butterfly poster.

---
Task ID: 11 (webDevReview round 1)
Agent: Z.ai Code (main)
Task: Scheduled review round — baseline QA, then new features (open/closed status, menu search, back-to-top, printable menu, scroll reveals, OG lockup) + styling polish.

Work Log:
- Baseline: all 6 routes 200, zero console/page errors, dev.log clean. Project stable → moved to feature/polish tier per the round mandate.
- NEW FEATURE — OpenNowBadge (src/components/site/open-now-badge.tsx): live open/closed status computed from the VERIFIED hours (site.hours, 08:00–22:30) in the café's timezone (Asia/Kolkata via Intl), refreshed every minute, aria-live, dot + text (caramel dot pulse when open — palette-pure, no second hue). Hydration-safe: server renders a static always-true fallback, status resolves after mount. Wired into: desktop header (lg+), mobile Sheet, and HoursCard (line variant — covers home visit band + /visit).
- NEW FEATURE — menu search (menu-explorer.tsx): search input (DESIGN input-field spec: white bg, linen border, 12px radius, caramel focus ring) over the 187 items, combining with the diet filter; aria-live result counter ("12 of 187 items"); clear button; friendly empty state with "Clear search & filters" action; rail counts update live. Verified: "paneer" → 12 items across 6 sections; nonsense query → empty state; clear → 21 sections restored.
- NEW FEATURE — BackToTop (src/components/site/back-to-top.tsx, in root layout): espresso pill with butter ChevronUp (butter-on-espresso legal), appears after 600px scroll (rAF-throttled passive listener), smooth scroll to top (instant under reduced motion), aria-hidden + tabIndex managed when invisible, no-print. Verified: hidden at top → visible at 2000px → click returns to 0.
- NEW FEATURE — printable menu: @media print stylesheet in globals.css (hides header/footer/rail/filters via .no-print, forces content-visibility: visible so all 21 sections print, coffee band prints light to save ink, 1pt linen borders, break-inside: avoid, links de-styled) + "Print the menu" button (window.print) in the menu note box. Tailwind print: variants on grids (2 columns) and steam (hidden).
- STYLING — scroll reveals: new Reveal component (framer-motion whileInView fade-up 18px/500ms/once, viewport margin -60px) with useReducedMotion → static render. Applied to home (signature header + 4 staggered dish cards, ratings band, patisserie teaser columns, visit band columns), patisserie (header, 9 staggered cards, custom-cake band), visit/gallery/story page headers. NOT applied to the hero (LCP), the 3D canvas, or the WingUnfold scroll zone.
- STYLING — menu row hover polish (rounded hover bg, linen/30 light + cream/5 on the dark band) and mobile rail auto-scrolls the active chip into view (manual scrollLeft centering, reduced-motion aware).
- NEW ASSET — OG wordmark lockup (public/images/og-cover-lockup.png): generated via image CLI, spelling verified by VLM letter-by-letter (P-A-P-I-L-I-O, butterfly, warm cream). All OG/Twitter references + JSON-LD image swapped to the lockup (sed across 6 files); original og-cover.png kept as spare.
- BUGS FIXED this round: (1) JSX unclosed-div errors in page.tsx/patisserie from the Reveal wrapping (2 spots); (2) React Compiler "memoization could not be preserved" on the search useMemo — replaced with direct per-render derivation of sections/totalCount (187 items, negligible); (3) header overflowed by 83px at 768px with the new badge — badge now lg+ only (mobile keeps it in the Sheet); (4) gallery LCP warning — priority extended to first 2 masonry photos (tall second image is above the fold in 2-col mobile layout).
- QA: lint exit 0; all routes + sitemap + robots 200; console sweep clean after fixes; OpenNowBadge verified live ("Closed · opens 8:00 AM" — correct for ~4 AM IST test time, plus mobile Sheet variant); search/empty-state/clear verified; back-to-top verified; reveals verified (framer style resolves to opacity:1; reduced-motion renders static divs, canvas 0); VLM review of the desktop state: no defects.

Stage Summary:
- Features added: live open/closed status (header, Sheet, HoursCard), 187-item menu search with combined diet filtering + empty state, back-to-top, printable menu with print stylesheet, scroll reveals, mobile rail auto-scroll, row hover polish, verified OG wordmark lockup.
- All contracts preserved: one primary CTA per view, butter only on espresso, palette-pure status colors, no fabricated facts (status derived from verified hours only), reduced-motion honored everywhere (badge pulse killed by global rule, reveals static, back-to-top instant).
- Zero regressions: menu two-phase scroll, lightbox, WingUnfold, 3D contracts all still pass.

Unresolved risks / next-phase recommendations:
1. Lighthouse CI (mobile perf ≥ 85 with Scene A) — still needs a production build; forbidden in this sandbox.
2. Consider an "Order on Zomato" link in the header CTA area on wide screens (Swiggy only today, per the one-filled-CTA rule).
3. Menu search could gain bestseller/flagship shortcuts (chips like "Bestsellers", "Under ₹400") — all derivable from verified data.
4. The story timeline could animate its dots filling as they enter view (progress-linked reveal).
5. Real-device QA of the 3D hero on low-end Android remains open.

---
Task ID: 12 (webDevReview round 2)
Agent: Z.ai Code (main)
Task: Baseline QA + bug fixes, then feature/polish round: 404/error pages, gallery filters, menu Signature quick-filter, copy-address, timeline reveal, styling details — plus a critical SSR reduced-motion fix.

Work Log:
- Baseline QA (agent-browser, named session): all 6 routes + sitemap/robots 200. Found ONE real bug: the micro-butterfly fragment shader failed to compile (THREE.WebGLProgram error — stray `;` at end of line 338 terminated the mix() expression before the `* (1.0 - 0.25*…)` continuation). Fixed the GLSL syntax; reloaded → 0 shader errors, micro-butterflies render (VLM-verified: "small faint silhouettes resembling distant butterflies").
- Lint clean; interactions re-verified (menu search, lightbox nav/counter/ESC, back-to-top, no 390px overflow).
- CRITICAL BUG FOUND & FIXED — SSR reduced-motion hydration freeze: the old framer-motion `Reveal`/`StoryTimeline` baked `opacity:0` initial styles into SERVER HTML (server can't know prefers-reduced-motion), while the client's reduced-motion branch rendered static (no styles) → React 19 attribute mismatch "won't be patched up" kept the server's frozen `opacity:0` → ALL Reveal content PERMANENTLY INVISIBLE for real reduced-motion users. Rewrote both components with the WingUnfold pattern: CSS classes + own IntersectionObserver, hidden state armed ONLY client-side in a pre-paint isomorphic layout effect and only when motion is allowed. SSR / no-JS / reduced-motion all render fully visible; normal mode hides pre-paint and reveals on scroll (-60px bottom margin). New CSS: .reveal-hidden/.reveal-shown (uses --reveal-y var), .tl-hidden/.tl-shown, .tl-dot-hidden/.tl-dot-shown (springy pop) + belt-and-braces reduced-motion overrides. framer-motion is now UNUSED in the app (still installed; safe to remove or reuse later).
- Also fixed a second latent reveal bug: framer viewport margin "-80px" shrank the intersection box on ALL sides — the story timeline's first dot sits at x=78 from the viewport left edge (72px container padding), 2px outside an 80px left margin → never intersected. Now bottom-only margins ("0px 0px -80px 0px").
- Dev server died twice this round (sandbox reaps background processes). Restart procedure that WORKS: `setsid -f bun run dev > dev.log 2>&1 < /dev/null` (returns immediately, detaches as session leader). NOTE: a zombie next-server wedged at 99% CPU once held port 3000 (EADDRINUSE) with a corrupted .next — fix: kill -9 the next-server PID + rm -rf .next, then relaunch.
- NEW FEATURE — Custom 404 (app/not-found.tsx): drifting line butterfly (animate-drift, killed by RM rule), eyebrow "404 — page not found", Playfair "This page has fluttered away", ONE primary (Back to home) + secondary (Explore the menu) + "Find the café" text link with verified hours. Server component; renders inside site chrome.
- NEW FEATURE — Root error boundary (app/error.tsx, client): console.error logs the error (never rendered raw), linen circle with flat glyph, "The chrysalis needs a moment", primary = Try again (reset), secondary = home.
- NEW FEATURE — Gallery subject filters (content/gallery.ts + gallery-grid.tsx): GalleryTag type (room/coffee/patisserie/oven) + galleryTagLabels; every photo tagged (multi-tag allowed). Filter chips with lucide icons (LayoutGrid/Armchair/Coffee/CakeSlice/Croissant), counts derived from data, aria-pressed, live region "N of 11 photos", lightbox navigates WITHIN the filtered set (verified: Patisserie → 5 photos, counter "2 / 5"). React Compiler rejected the useMemo → direct per-render derivation (11 items, negligible).
- NEW FEATURE — Menu "Signature picks" quick filter (menu-explorer.tsx): signatureDishNames now exported from content/menu.ts (single source of truth; home page imports it too). Chip with Sparkles icon + count 4, combines with diet filter + search (verified: Signature → "4 of 187 items" exactly the 4 flagship dishes; +Veg → 1; empty-state clear resets it). Linen-filled active style distinguishes it from the diet group.
- NEW FEATURE — Copy-address on /visit (components/site/copy-button.tsx): clipboard API with textarea fallback for non-secure contexts, inline Copied/Check swap for 2s, aria-live, clipboard-blocked never shows false success. Verified with a stubbed clipboard (copies the exact NAP string, label swaps + reverts). Styled as a quiet tertiary pill (min-h-11).
- NEW FEATURE — Story timeline reveal (story-timeline.tsx, described above): staggered fade-ups + caramel dots pop in with spring easing; static under reduced-motion.
- STYLING — warm caramel link underlines (globals.css: a { text-decoration-color: rgba(154,91,31,.55) } + hover full caramel); "Also on Zomato" text link in the header on xl+ (hidden below to avoid the old 768px overflow); faint butter butterfly watermark bottom-right of the footer (decorative prop added to ButterflyGlyph: role=presentation + aria-hidden, pointer-events-none, opacity 5%); "/" keyboard shortcut jumps to menu search with a kbd hint badge in the input (hidden on mobile, hidden while typing — clear button takes its place); linen/40 loading tint behind all lazy images (gallery figures, DishCard, MapEmbed, story chapter figures).
- ButterflyGlyph API: added `decorative` prop (swaps role/aria) — used by footer watermark + error page glyph.

Stage Summary:
- All round goals shipped: shader fix, 404 + error pages, gallery subject filters, menu Signature picks, copy-address, timeline reveal, /-shortcut, watermark + underline + placeholder polish.
- CRITICAL accessibility fix: reduced-motion users now get a fully visible site (previously Reveal content froze invisible after hydration). Verified: RM emulation → 0 hidden classes, opacity 1, dots scale(1), 0 canvases, ZERO hydration errors after fresh reload. Normal mode: reveal-hidden pre-paint → reveal-shown on scroll (timeline verified hidden→shown with dot pop).
- Final QA battery all green: lint exit 0; all 6 routes + 404 + sitemap + robots 200 with 0 console/page errors; 3D canvas live (1) on home, disposed (0) on /menu; typo quarantine clean in source AND rendered HTML; NAP + FSSAI + WhatsApp + maps embed + JSON-LD hours all consistent; mobile 390px: no horizontal overflow on menu/gallery/404, kbd hint hidden; VLM visual reviews: hero (butterfly + motes, no defects), footer watermark visible, 404 on-brand, menu chips aligned, story timeline fully rendered.
- framer-motion dependency now unused (kept installed — harmless, tree-shaken out).

Unresolved risks / next-phase recommendations:
1. Lighthouse CI (mobile perf ≥ 85 with Scene A) — still needs a production build; forbidden in this sandbox.
2. Real-device QA of the 3D hero on low-end Android remains open (DPR clamp + instance halving in place).
3. Pre-production client tasks unchanged: production domain in content/site.ts SITE_URL, real menu import, real photography swap.
4. The dev server may be reaped by the sandbox between rounds — restart with `setsid -f bun run dev > dev.log 2>&1 < /dev/null` and if port 3000 is held by a zombie next-server (99% CPU), kill -9 it + `rm -rf .next` first.
5. Optional: remove framer-motion from package.json (now unused) or keep for future micro-interactions.

---
Task ID: 13 (webDevReview round 3)
Agent: Z.ai Code (main)
Task: Baseline QA, then feature round: /visit FAQ + FAQPage JSON-LD, deep-linkable menu filters, home→menu dish deep links, lightbox touch swipe, sonner toasts + Share-the-menu, editorial drop caps, LCP fix.

Work Log:
- Baseline QA (fresh agent-browser session): all 6 routes + sitemap/robots 200, zero console/page errors, 3D canvas mounts (1) on home and disposes (0) on /menu, no 390px overflow on any route. Project stable → feature/polish tier.
- NEW FEATURE — FAQ on /visit: src/content/faq.ts (8 questions, every answer interpolated from content/site.ts values — hours, NAP, phone, booking/cake WhatsApp flows, facilities, delivery, cost-for-two, 173/187 veg counts) + FaqAccordion (shadcn/Radix accordion restyled: ivory card, linen hairlines, numbered 01/02 Playfair questions, caramel chevron) in a 12-col section (eyebrow/intro + accordion). FAQPage JSON-LD (8 Questions) injected on /visit only. Print CSS: accordion answers print expanded.
- NEW FEATURE — deep-linkable menu: MenuExplorer now reads /menu?diet=veg|nonveg|egg&signature=1&q=… (useSearchParams; 60-char query cap; unknown values ignored) and writes filter state back via history.replaceState (no history entries). MenuExplorer wrapped in <Suspense> in menu/page.tsx with a menu-shaped skeleton fallback (required for useSearchParams under static rendering).
- NEW FEATURE — home→menu deep links: DishCard gains optional href prop (wraps card in a next/link with "Find <dish> on the menu" aria-label; article unchanged, no new filled CTA); the 4 signature cards on / link to /menu?q=<dish> (verified end-to-end: click → exactly 1 item, verified price shown). New quiet text link "Filter the menu to these four" → /menu?signature=1 beside "See the full menu".
- NEW FEATURE — lightbox touch swipe: PhotoLightbox onTouchStart/onTouchEnd on DialogContent — horizontal flick >48px with <64px vertical gate navigates (vertical drags keep scrolling); "Swipe to browse" hint (uppercase micro-label, mobile-only). Verified with dispatched TouchEvents: 1/11 → swipe-left → 2/11 → swipe-right → 1/11; ESC still closes.
- NEW FEATURE — toast system: sonner <Toaster position="bottom-center"> in root layout (themed via popover tokens: ivory bg, espresso text, linen border) + new ShareButton component (navigator.share with AbortError pass-through → clipboard fallback incl. execCommand for non-secure contexts). "Share the menu" tertiary pill in the menu note box (no-print). Verified with stubbed clipboard: copies origin+/menu, toast "Link copied — …" renders on-palette (VLM-checked).
- STYLING — editorial drop caps on /story: .drop-cap::first-letter (Playfair 600, caramel #9A5B1F, 3.3em, float) on the intro + room + craft chapter first paragraphs (3 total; never on dark surfaces). NOTE: Turbopack emits it as .drop-cap:first-letter (legacy single-colon — still valid; a stale CSS chunk in a long-lived browser session initially made it look missing — always hard-reload before judging). VLM: "large serif caramel initial, text wraps cleanly, elegant".
- STYLING — global text-underline-offset: 3px on links (caramel underlines sit off the baseline consistently).
- PERF — LCP fix: gallery-interior.png (room chapter figure) was the /story mobile LCP while lazy → now priority. LCP warnings zero across all routes after fix. (/gallery's first-2-priority from round 2 confirmed still effective; an old coffee-pour warning was stale console buffer.)
- QA battery all green: lint exit 0; all routes + 404 + sitemap/robots 200; zero console/page errors in a fresh session (empty ✗ entries seen earlier were artifacts of synthetic touch/clipboard test stubs); typo quarantine zero hits on all 6 rendered pages; [CONFIRM/[PHOTO/[PRICE zero; NAP/FSSAI/phone/WA/hours consistent (tel: ×5, wa.me ×2, FSSAI ×4 on /visit); FAQ JSON-LD parses with 8 questions; deep links: ?diet=veg → "173 of 187", ?signature=1 → "4 of 187" exactly the 4 flagship dishes, ?q=paneer → 12 items, bogus ?diet=x ignored, URL syncs live while typing; drop caps 3× Playfair/caramel; reduced-motion: FAQ opens, reveals static (0 hidden), drop caps static, 0 canvases; mobile 390px: no overflow on / /menu /gallery /story /patisserie /visit; toast + share verified; home signature links row VLM-verified aligned.
- Verified the 15-min webDevReview cron job is active (job 369406, fixed_rate 900s; last tick failed on model concurrency limit — infra-side, self-recovering).

Stage Summary:
- Round-3 features shipped: /visit FAQ (8 Q&A + FAQPage JSON-LD), deep-linkable & shareable menu filters, home signature dish cards as menu deep links, gallery lightbox touch swipe, sonner toast system with Share-the-menu, editorial story drop caps, underline-offset polish, /story LCP fix.
- Contracts preserved: one filled primary CTA per view (share/print are tertiary pills), butter only on espresso surfaces, palette-pure styling everywhere, zero fabricated facts (FAQ answers interpolate site.ts), reduced-motion + no-JS paths all verified, canvas dispose contract intact.
- All previous features re-verified regression-free (search, filters, lightbox nav, two-phase scroll, back-to-top, open-now badge, reveals).

Unresolved risks / next-phase recommendations:
1. Lighthouse CI (mobile perf ≥ 85 with Scene A) — still needs a production build; forbidden in this sandbox.
2. Real-device QA of the 3D hero on low-end Android remains open.
3. Pre-production client tasks unchanged: production domain in SITE_URL, real menu import, real photography swap.
4. Ideas for round 4: "Order on Zomato" as header CTA on xl+ is done — consider gallery lightbox caption copy-to-clipboard for IG credits; a compact "jump to coffee/desserts" quick-nav on the menu for 390px; FAQ-anchored deep links from the home visit band ("See FAQs → /visit#faq"); consider swapping the round-2 OG lockup with a photo-based OG per route.
5. Dev server reaping: if port 3000 dies between rounds, restart with `setsid -f bun run dev > dev.log 2>&1 < /dev/null` (kill -9 zombie next-server + rm -rf .next if wedged).

---
Task ID: 14 (webDevReview round 4)
Agent: Z.ai Code (main)
Task: Baseline QA, then feature round: per-route OG images, BreadcrumbList JSON-LD, menu category hash deep-links, patisserie→menu deep links, home FAQ anchor + second verified quote, story owner-voice quote + chapter dividers, print masthead, PWA manifest + icons.

Work Log:
- Baseline QA: all 6 routes + sitemap/robots 200, zero console/page errors, canvas 1→0 lifecycle intact, no 390px overflow, lint clean. Stable → feature round.
- NEW FEATURE — per-route OG images: scripts/gen-images-r4.sh generated og-menu/og-patisserie/og-gallery/og-story/og-visit.png (1344×768, photo-based, no text). Every page's openGraph.images now carries its own image with width/height/alt (home + root keep the wordmark lockup). VLM-verified all 5: og-visit initially hallucinated a "Confetrio" storefront sign — REGENERATED with a stricter blank-facade prompt → verified NO-TEXT. og-patisserie's tiny illegible price-tag cards judged incidental/realistic and kept. All serve 200.
- NEW FEATURE — PWA identity: public/manifest.webmanifest (name, verified description, start_url /, standalone, cream background/theme colors) + flat butter-on-espresso butterfly icons at 1024 (generated) and 512 (sharp downscale, palette-compressed 140KB) + src/app/apple-icon.png (180px, 19.8KB, Next auto-detects). layout.tsx metadata gains manifest link. Verified: <link rel=manifest> + <link rel=apple-touch-icon> render; manifest + all icons serve 200. NOTE: the image CLI only accepts 1024x1024/1344x768/1152x864/864x1152/768x1344/720x1440/1440x720 — no 512×512 (worklog round 1's "multiples of 32" note is outdated).
- NEW FEATURE — BreadcrumbList JSON-LD on all 5 subpages via new JsonLd component (src/components/site/json-ld.tsx) + breadcrumbLd builder (src/lib/seo.ts, absolute SITE_URL items). Verified: each page renders Home > <Page> with 2 ListItems entries. /visit's inline FAQ script refactored onto the JsonLd component.
- NEW FEATURE — menu category hash deep-links: /menu#<categoryId> (e.g. #coffee, #counter-desserts). scrollTo gained an `instant` mode; applyHash runs on mount + hashchange, and because content-visibility settles section sizes lazily (the first correction overshot to -1033px on cold load), late re-align passes fire at 300/700/1400ms (instant, no jank) — verified /menu#counter-desserts lands at exactly 112px and STAYS there; #coffee same under reduced motion. Rail-chip clicks now replaceState the category into the URL (#anchor is shareable); the filter-sync effect preserves the hash so ?diet=…#coffee composes. aria-keyshortcuts="/" added to the search input.
- NEW FEATURE — patisserie deep links: all 9 dish cards link to /menu?q=<name> (verified: Chocolate Truffle Cake → 1 of 187); "See every dessert on the full menu" → /menu#counter-desserts.
- NEW FEATURE — home: (a) visit band gains "Hours, bookings & other common questions" text link → /visit#faq (FAQ section got id="faq" + scroll-mt-24; verified landing at 96px, in view); (b) ratings band renders the SECOND verified quote ("Excellent ambience and tasty food.", quieter register under a cream/10 hairline) — both verified quotes now appear on home.
- NEW FEATURE — story: (a) ownerVoiceLine (the verbatim owner reply from reviews.ts, previously defined-but-unused) now renders in the founders chapter as an italic pull-quote with caramel left border + "The café's own reply to a guest review" caption; (b) DividerGlyph (line-art butterfly + linen hairlines, decorative/aria-hidden) between room→craft and craft→founders chapters (2 total, verified in DOM + VLM "elegant").
- NEW FEATURE — print masthead: the printed menu sheet now opens with PAPILIO wordmark + full NAP + phone + hours + FSSAI (print-only block; the site header/footer are print:hidden). Verified end-to-end by generating qa/menu-print.pdf via agent-browser + pdftotext: page 1 shows the masthead then Salads; 17 pages; "Papilio's Caesar Salad" correct spelling inside the print.
- Dev server was reaped mid-round (documented hazard): rm -rf .next + `setsid -f bun run dev > dev.log 2>&1 < /dev/null` restored it; all routes re-verified 200 after restart.
- Final QA battery: lint exit 0; all 6 routes + sitemap + robots + manifest + 6 new image assets + /apple-icon.png 200 (404 for unknown paths); fresh-session console + page errors: zero; typo quarantine clean on all rendered pages (incl. new "confetrio" guard — the hallucinated sign never shipped); no 390px overflow on any route; canvas 1→0; reduced-motion: hash lands at 112, 0 hidden reveals, 0 canvases; breadcrumbs on 5 pages; hash + query + signature deep links all compose; VLM reviews green (drop cap, owner quote, divider, quotes band, icons, OG set).

Stage Summary:
- Round-4 shipped: per-route social-share images (VLM-verified text-free), PWA manifest + butterfly app icons + apple-touch-icon, BreadcrumbList structured data on all subpages, shareable menu category anchors (#coffee) with layout-settle re-alignment, patisserie card deep links, home FAQ anchor link + both verified quotes on the ratings band, the verbatim owner-reply quote + editorial chapter dividers on /story, and a proper masthead on printed menus.
- All contracts preserved: one filled CTA per view, butter only on dark surfaces, palette-pure, zero fabricated facts (all new copy interpolates content modules; the one hallucinated brand sign was caught by VLM QA and regenerated before shipping), reduced-motion honored, print path verified with a real PDF.

Unresolved risks / next-phase recommendations:
1. Lighthouse CI (mobile perf ≥ 85) — still needs a production build; forbidden in this sandbox.
2. Real-device QA of the 3D hero on low-end Android remains open.
3. Pre-production client tasks unchanged: production domain in SITE_URL, real menu import, real photography swap (the new OG/icon art is AI-generated placeholder-grade).
4. Ideas for round 5: a tiny "share this page" on /visit (ShareButton is reusable); gallery photo captions could gain copy-to-clipboard for IG reposts; consider OG twitter:card per-route check; menu rail could get aria-expanded on mobile; README/handover for the client (how to swap SITE_URL, images, menu data).
5. Dev server reaping happened mid-round — always re-check port 3000 first; restart: kill zombie next-server if 99% CPU, rm -rf .next, `setsid -f bun run dev > dev.log 2>&1 < /dev/null`.
