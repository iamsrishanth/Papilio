# PROMPT.md — Papilio Café Website Build Brief

**Project:** Papilio — Patisserie | Café, Hanamkonda, Warangal
**Deliverable:** Multi-page Next.js (App Router) website with Three.js 3D, implementing `DESIGN.md` (same folder) as the single source of visual truth.
**Audience for this file:** a coding agent (or human dev) building the site. Every business fact below is tagged with its source; do not invent data where no tag exists — use the fill-before-ship tokens in §9 instead.

---

## 1. Mission

Build a fast, warm, editorial multi-page site for a real café in Hanamkonda whose public identity is "cozy, aesthetic, premium patisserie-café" (Google reviews + launch-press, Oct 2023). The site must: (a) look like DESIGN.md, (b) run 3D without ever feeling heavy, (c) surface verified facts — menu breadth, ratings, hours, contact — with zero fabricated claims, (d) convert visitors into orders (Swiggy/Zomato deep links), bookings and custom-cake enquiries (WhatsApp), and visits (map + hours).

## 2. Stack & Architecture

- **Next.js 15+ App Router**, TypeScript, Tailwind (theme generated from DESIGN.md via `npx @google/design.md export --format tailwind`), React Server Components by default.
- **Three.js** (no react-three-fiber unless the team already standardizes on it; if used, `@react-three/fiber` + `@react-three/drei`, same budgets).
- **Fonts:** `next/font/google` — Playfair Display (600) + Inter (400/600), self-hosted, `display: swap`.
- **Pages are real routes** (§6): `/`, `/menu`, `/patisserie`, `/gallery`, `/story`, `/visit`. No SPA-hash shell.
- **No backend.** No cart, no payments, no auth. Orders live on Swiggy/Zomato; bookings and custom orders go to WhatsApp deep links (`https://wa.me/919000316366?text=…`).
- **Images:** `next/image`, AVIF/WebP, `sizes` per breakpoint; menu/gallery images lazy below fold. All content (menu, gallery, hours) ships as typed TypeScript data modules in `/content` so it is editable without touching components.
- **Performance rules (Vercel React best-practices):** dynamic-import every WebGL component (`next/dynamic`, `ssr: false`); no barrel-file imports; analytics deferred post-hydration; `content-visibility: auto` on long menu sections; use `Promise.all` for any parallel data reads.

## 3. Non-Negotiables

1. **Reduced motion:** `prefers-reduced-motion: reduce` ⇒ every 3D scene and parallax is replaced by static poster art. No autoplay motion of any kind.
2. **No-WebGL / WebGL-failure:** feature-detect; on failure or context loss, show the poster fallback and log once. The site must be 100% usable with WebGL disabled.
3. **Text stays in DOM.** Never render copy in canvas. The hero headline, CTAs, and rating chips are HTML layered above the canvas.
4. **One filled CTA per view** (DESIGN.md Components rule). Primary actions: Order on Swiggy / Order on Zomato / WhatsApp us / Get directions.
5. **No fabricated data.** If a fact isn't in §8 with a source tag, it doesn't render — use a `[CONFIRM]` token (§9).
6. **FSSAI veg/non-veg glyphs** on every menu item (legal marker in India).
7. **Mobile-first:** 390px layout must be fully functional before desktop polish. The 3D hero degrades per §5 budgets.

## 4. Design Tokens (mirror of DESIGN.md)

Colors: espresso ink `#2A1B10` (primary), cocoa `#5C3A21`, caramel `#9A5B1F` (interaction), butter gold `#D9A441` (dark surfaces only), cream `#FAF3E8` (bg), ivory `#FFF9EF` (cards), linen `#E8DFC8`, surface espresso `#3B2314`, hover `#8C4A12`, destructive `#B3261E`, focus ring `#9A5B1F`.
Type: Playfair Display h1 3.5rem/h2 2.25rem/h3 1.5rem; Inter body 1rem / sm 0.875rem / label 0.75rem caps / price tabular.
Shape: pill buttons and chips, 20px cards, 12px inputs, 6px price tags. Spacing scale 4/8/16/24/40/64.
All 14 contrast pairs pre-verified AA (DESIGN.md §Colors lists the measured ratios). Butter-gold is **never** text on light backgrounds.

## 5. 3D System — Scenes and Hard Budgets

**Scene A — "Papilio Hero" (home page only).**
- One procedural swallowtail butterfly: two mirrored wing planes (custom ShaderMaterial or vertex-displaced PlaneGeometry; flap = sine on wing-root rotation, 6–8s ambient cycle, ~1.2s flutter bursts on pointer proximity). Body = tapered cylinder/capsule, gold-emissive wing edges (`#D9A441` emissive, espresso base).
- Ambience: 12–20 instanced micro-butterflies (single InstancedMesh, GPU group rotation — **no per-vertex CPU updates**, no per-frame attribute writes).
- Backdrop: cream-to-espresso vertical gradient (scene fog or large plane), matching DESIGN.md surfaces.
- **Budgets:** three.js bundle ≤ 150KB gz (tree-shake, dynamic import); draw calls ≤ 12; DPR clamp 1.75 desktop / 1.25 mobile; particle/instance count mobile = ½ desktop; no shadow maps; no post-processing on mobile; 60fps frame cap via delta-skip (`if (time - last < 16) return`); pause on `visibilitychange` and via IntersectionObserver when hero < 20% visible; dispose() on unmount; `webglcontextlost` → poster fallback.
- **Fallback:** static poster (butterfly illustration on cream, same layout) rendered server-side; canvas hydrates over it only when WebGL passes detection and motion is allowed.

**Scene B — "Steam" (menu + patisserie coffee band, optional).**
- 60 particles max (instanced), rising with sine sway, cream/linen color on espresso band, `depthWrite: false`, additive off. Same pause/dispose/DPR contracts. If perf budget is tight on a device, Scene B is dropped first — it is decorative.

**Scene C — "Unfold" (story page).**
- Prefer CSS 3D: a wing-pair SVG that rotates open on scroll (transform-only, `will-change: transform`). WebGL only if the team wants the continuity — not required.

**Global 3D rules:** only Scene A is required for launch. No text in canvas. No autoplay on mobile data-saver. Lighthouse mobile perf target ≥ 85 with Scene A active.

## 6. Page-by-Page Specs

### 6.1 `/` — Home
1. **Hero:** full-viewport; Scene A canvas behind; DOM layer = eyebrow `Patisserie | Café` (badge-label), H1 wordmark "PAPILIO", subline (§8 copy deck), primary CTA "Order on Swiggy" + secondary "Explore the Menu"; chip-rating row (Swiggy 4.3 · Zomato 4.3 · Google 4.1).
2. **Signature strip:** 4 dish cards (from §8 verified dishes with prices).
3. **Ratings band (card-dark):** rating chips + one verified review quote + "Rated 4.3★ by 1,300+ diners on Swiggy".
4. **Patisserie teaser:** cakes/gifting panel with CTA → `/patisserie`.
5. **Visit band:** hours (8:00 AM – 10:30 PM, daily), address line, "Get directions" (Google Maps deep link), "Find us" → `/visit`.
6. **Footer:** NAP, hours, FSSAI, IG link, platform links.

### 6.2 `/menu`
- Sticky category rail (scroll-spy) of the 21 Zomato sections: Salads (8), Wraps (5), Small Plates (20), Sandwiches (9), Burgers (9), Rice Bowls (19), Pizza (13), Pasta (13), Omelettes (7), Coffee (20), Cold Coffee (3), Iced Coffee (4), Frappe (3), Mojitos (5), Milk Shakes (8), Iced Tea (4), Kombuchas (3), Water (1), Juice (1), Counter Desserts (28), Cakes (4) — 187 items total.
- Veg/Non-veg/Egg filter chips; FSSAI glyph per item; prices render only where verified (§8); unpriced items show no price (never a guessed one).
- Flagship dish descriptions verbatim from listings (§8) with typos corrected (Avocado, Caesar, Macaron).
- Note under menu: "Prices as listed on Swiggy/Zomato; dine-in menu may vary." + deep links to both platforms.
- Steam scene (Scene B) allowed behind the Coffee section band only.

### 6.3 `/patisserie`
- Positioning page for the café's patisserie half (IG highlights "cakes🍰" and "gifting🎁" prove the category).
- Sections: signature cakes & counter desserts, custom/celebration cakes ("DM us for orders and bookings" — their own bio line → WhatsApp CTA with prefilled text), gifting.
- Imagery from the café's own feed (client to supply hi-res; IG embed acceptable interim).
- Scene B or CSS-only ambience; no heavy WebGL here.

### 6.4 `/gallery`
- Masonry grid of café photography (own-feed sourced), `next/image` lazy, 2–4 columns responsive, keyboard-accessible lightbox (focus trap, ESC close).
- Captions descriptive ("The patisserie counter at Papilio…"). Alt text mandatory.
- CSS hover parallax only — no WebGL on this page.

### 6.5 `/story`
- "Chrysalis → butterfly" narrative (Scene C or CSS 3D unfold): est. October 2023 (launch press), founders Radha Suvidha (patisserie) & Chef Siddhartha Reddy (per @papiliocafe.in bio), the craft (focaccia sandwiches, porcini mushrooms, harissa paneer — real menu language), the room ("peaceful atmosphere", "Instagram-worthy decor" — verified review language).
- Pull-quote in italic Playfair from §8 verified quotes.
- Timeline strip: Oct 2023 opening → 1.4K IG community → 1,300+ ratings.

### 6.6 `/visit`
- Address block: **H.No. 2-7-741, Excise Colony, Hanamkonda, Warangal, Telangana 506370** [RESOLVED §9.1].
- Hours card: **8:00 AM – 10:30 PM, all seven days** [RESOLVED §9.1] + "Kitchen/counter may observe festival variations — call to confirm."
- Google Maps embed (coords 17.9962, 79.5379) + "Get directions" deep link.
- Facilities row (verified): Dine-in · Takeaway · Delivery · Parking · Wheelchair accessible · Cards accepted.
- Contact: tel:+919000316366, WhatsApp wa.me/919000316366, Instagram @papiliocafe.in.
- Delivery CTAs: Swiggy + Zomato deep links.
- Trust line: FSSAI Lic. No. 23626018000482 (verbatim from Swiggy listing).
- Note that Binge & Blast occupies the 2nd floor above the café (community-posted fact — helps visitors find the entrance; mark [CONFIRM] before rendering).

## 7. Component Inventory

`SiteHeader` (sticky, pill CTAs, route underline) · `SiteFooter` (espresso, NAP + FSSAI) · `PapilioHero3D` (dynamic, ssr:false) · `HeroPoster` (fallback) · `DishCard` · `CategoryRail` · `FilterChips` · `RatingChip` · `ReviewQuote` · `HoursCard` · `MapEmbed` · `CtaButton` (primary/secondary/WhatsApp variants) · `SectionEyebrow` · `VegGlyph` · `Lightbox` · `SteamBand` · `WingUnfold` (CSS 3D) · `SkipLink` (a11y).
Accessibility: semantic landmarks, skip link, visible focus (caramel ring), aria-labels on icon buttons, WCAG AA minimum (spec actually clears AAA on core pairs), reduced-motion honored globally.

## 8. Verified Data Appendix (single source of truth for content)

**Identity** — Name: PAPILIO (wordmark) / Papilio (running text). Positioning: "Patisserie | Café" [VERIFIED-IG bio]. Founders: @Radhasuvidha & @ChefSiddharthaReddy [VERIFIED-IG bio]. Est.: October 2023 [VERIFIED-launch reel, warangalvishal, Oct 15 2023, 7,142 likes]. Instagram: @papiliocafe.in, ~1.4K followers, 238 posts [VERIFIED-IG]. Cuisines: Café, Coffee, Pizza, Pasta, Burger, Italian, Continental, Desserts [VERIFIED-Zomato/RG union].

**Contact & location** — Phone/WhatsApp: +91 90003 16366 [VERIFIED-Zomato + RestaurantGuru; WhatsApp link exists on RG]. Address: 2-7-741, Excise Colony, Hanamkonda, Warangal [VERIFIED-Zomato + Swiggy FSSAI block]. Coords: 17.9962, 79.5379 [VERIFIED-Zomato/RG/District]. Maps link in IG bio: maps.app.goo.gl/1XtNY2A9b6VQUNMj7.

**Hours** — 8:00 AM – 10:30 PM, all days [RESOLVED: RG weekly table updated Aug 30 2026 + Swiggy "Closes 10:30 pm" + Swiggy breakfast category; District's 12:00 PM opening is the stale outlier].

**Ratings** — Swiggy delivery 4.3★, 1.3K+ ratings [VERIFIED-Swiggy]. Zomato dining 4.3★, 995 ratings [VERIFIED-Zomato]. Google 4.1★, 532 [VERIFIED-RG aggregation]. Tripadvisor 5.0★, 1 review [VERIFIED-TA; too small to feature]. Hero stat: "4.3★ · 1,300+ ratings" (Swiggy+Zomato agree).

**Cost** — ₹250 for two (delivery) [VERIFIED-Swiggy]; ₹800 for two (dine-in) [VERIFIED-District]. Site copy: "₹800 for two (dine-in) · ₹250 for two (delivery)".

**Trust** — FSSAI 23626018000482 [VERIFIED-Swiggy footer]. Facilities: dine-in, takeaway, delivery, parking, wheelchair accessible, cards accepted [VERIFIED-RG/District].

**Menu structure** — 21 categories / 187 items [VERIFIED-Zomato order page; counts in §6.2]. 173 vegetarian items [VERIFIED-Swiggy FAQ].

**Flagship dishes with verified prices** [VERIFIED-Swiggy] — Chicken & Avocado Salad ₹376 ("grilled chicken, ripe avocado, roasted peppers, fresh cherry tomatoes, mint, coriander, onion, roasted-pepper vinaigrette") · Buttermilk Chicken Wrap ₹391 ("crispy buttermilk chicken, fresh veggies, spicy cheese sauce, served with fries") · Cottage Crunch Wrap ₹335 ("crispy cottage cheese, lettuce, onion, creamy + zesty sriracha-cheese sauces, golden fries") · Double Trouble Chicken Burger ₹390 ("two crispy chicken patties, cajun blend, cheddar, jalapeños, chipotle, skinny fries + cheese dip").

**Named dishes without verified prices** (render name + corrected description, no price) — Papilio's Caesar Salad (Chicken) · Harissa Paneer Sandwich (focaccia, harissa-marinated paneer) · Shroom Grilled Sandwich (porcini-stock mushrooms, cheddar) · Pesto Paneer Sandwich (homemade focaccia) · Paneer Thecha Twist (thecha, contains peanuts) · Grill Paneer Burger · Succulent Grilled Chicken Burger · pesto pasta with roasted almonds · mushroom pizza · creme brulee · chicken wings [VERIFIED-Zomato/RG mentions].

**Bestsellers** [VERIFIED-Swiggy SEO block] — Cappuccino · Nutella Sea Salt Macaron · KitKat Shake · Chicken Club House Sandwich.

**Verified review quotes** — "Excellent ambience and tasty food." (Google, via RG) · "The food tasted fresh and flavorful, especially the snacks and coffee which were served beautifully… peaceful atmosphere… a perfect spot to hang out with friends or spend some quality time alone." (Google review + owner reply, via RG) · Press line: "New premium cafe in Warangal… best cafe vibes with authentic ambiance and pleasant music… perfect place to vibe with your friends and family" (Oct 2023 launch reel).

## 9. Data Conflicts, Fill-Before-Ship Tokens, Quarantine

### 9.1 Conflicts resolved (canonical → rationale)
- **Pin code:** 506370 (RG + District + MapQuest) **wins** over Swiggy's 506001 (1 source) → render 506370.
- **Opening hour:** 8:00 AM (RG, refreshed Aug 2026 + Swiggy breakfast menu) over District 12:00 PM (stale) → render 8 AM.
- **Cost-for-two:** keep both with context labels (delivery ₹250 / dine-in ₹800) — different scopes, not a contradiction.
- **Hero rating:** 4.3★ (two platforms, largest volume) over Google 4.1 and TA 5.0 (n=1, never surface).
- **"Serves alcohol / cocktails" (District only):** NOT rendered — single weak source, brand-risk if wrong. Mojitos render as a menu-section name only. `[CONFIRM-ALCOHOL]` token if the client wants it.
- **RG aggregate "4.8/4.6":** RG's own blended score, inconsistent across snapshots — not rendered.

### 9.2 Fill-before-ship tokens
`[CONFIRM-ALCOHOL]` · `[PHOTO:<subject>]` for every gallery/menu image slot pending client assets · `[PRICE]` for any menu item the client wants priced that isn't in §8 · `[CONFIRM-2F]` for the Binge & Blast second-floor note · `[CONFIRM-EVENTS]` if the client wants live-music/event listings (press mentions "pleasant music", but no events program is verifiable).

### 9.3 Typo quarantine (do not propagate; grep for these at QA)
"Avacado" → Avocado · "CEASER" → Caesar · "Macron" → Macaron · "Deserts" → Desserts · "Hanamakonda" is a valid listing spelling but the brand/site renders **Hanamkonda** (city's current official spelling).

## 10. SEO / GEO

- `CafeOrCoffeeShop` JSON-LD on every page: name PAPILIO, address (canonical §9.1), geo, phone, hours (Mo–Su 08:00–22:30), servesCuisine, priceRange "₹₹", sameAs [Instagram, Swiggy, Zomato], menu URL.
- Per-route `<title>` + description (no homepage-canonical bug): each page its own canonical.
- OG/Twitter images: hero poster. `sitemap.xml` + `robots.txt` (allow GPTBot/ClaudeBot/PerplexityBot — AI-crawler surface for a local business). NAP must match Google Business Profile exactly.
- Local keywords used naturally: "café in Hanamkonda", "patisserie Warangal", "Excise Colony café".

## 11. QA Matrix (definition of done)

- [ ] `npx @google/design.md lint DESIGN.md` → 0 errors
- [ ] All pages Lighthouse mobile ≥ 85 perf, ≥ 95 a11y; hero LCP is the poster (not the canvas)
- [ ] `prefers-reduced-motion` + WebGL-disabled pass: zero motion, full content
- [ ] Menu page: 21 sections, 187-item data module compiles, glyph on every item, no unpriced-item price shown
- [ ] Grep battery: zero hits for "Avacado|CEASER|Macron|Deserts" in rendered strings; zero `[CONFIRM`/`[PHOTO` tokens left at ship
- [ ] Contrast: shipped component pairs match DESIGN.md measured table
- [ ] NAP identical in footer, /visit, and JSON-LD; hours 08:00–22:30 everywhere
- [ ] Deep links resolve: wa.me/919000316366, tel:+919000316366, Swiggy rest772389, Zomato listing, Maps 17.9962,79.5379
- [ ] No console errors on any route; canvas disposes on route change (no orphan RAF loops)

## 12. Out of Scope

Online ordering/cart/payments (platforms own it), auth, CMS (content is typed modules), events system, multi-branch (single location), photography production.
