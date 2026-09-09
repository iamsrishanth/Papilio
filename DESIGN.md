---
version: alpha
name: Papilio
description: Warm patisserie-café identity for Papilio, Hanamkonda — espresso and cream with butter-gold wing accents, editorial serif headlines, and a swallowtail butterfly glyph.
colors:
  primary: "#2A1B10"
  secondary: "#5C3A21"
  tertiary: "#9A5B1F"
  accent-butter: "#D9A441"
  neutral: "#FAF3E8"
  surface-card: "#FFF9EF"
  surface-linen: "#E8DFC8"
  surface-espresso: "#3B2314"
  hover-caramel-deep: "#8C4A12"
  destructive: "#B3261E"
  focus-ring: "#9A5B1F"
typography:
  h1:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 3.5rem
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.15
  h3:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.25
  body-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
  price:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.3
    fontFeature: "tnum"
rounded:
  sm: 6px
  md: 12px
  lg: 20px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.hover-caramel-deep}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 14px
  card-dish:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 20px
  card-dark:
    backgroundColor: "{colors.surface-espresso}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.lg}"
    padding: 24px
  badge-label:
    backgroundColor: "{colors.surface-linen}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 6px
  chip-rating:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.accent-butter}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 6px
  nav-link:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    padding: 8px
  price-tag:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.hover-caramel-deep}"
    typography: "{typography.price}"
    rounded: "{rounded.sm}"
    padding: 4px
  input-field:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px
  footer-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-sm}"
    padding: 40px
---

# DESIGN.md — Papilio, Hanamkonda

## Overview

Papilio — Latin for swallowtail butterfly — is a patisserie-led café in Excise Colony, Hanamkonda (est. October 2023, by @Radhasuvidha and @ChefSiddharthaReddy, per the brand's own Instagram bio). The public record is unanimous about how people experience it: "cozy", "aesthetic", "Instagram-worthy decor", "premium", "peaceful atmosphere", "brunch dates" (Google reviews, Oct 2023 launch reel at 7,100+ likes, and the @papiliocafe.in feed of cakes and whipped-cream patisserie through June 2026).

The identity therefore translates **patisserie warmth into an editorial, unhurried surface**: dark espresso ink on warm cream, caramel as the single interaction color, butter-gold reserved for the wing accent, and a display serif that carries the patisserie's craft connotations. Nothing neon, nothing cold, nothing noisy. The brand glyph — a swallowtail butterfly — doubles as the site's 3D motif (see the companion PROMPT.md for scene contracts).

## Colors

- **Primary — Espresso Ink (#2A1B10):** headlines, body text, dark sections, footer. On cream it measures **15.09:1** (WCAG AAA).
- **Secondary — Cocoa (#5C3A21):** secondary text, captions, quiet labels. On cream: **9.15:1**.
- **Tertiary — Caramel (#9A5B1F):** the sole interaction color (primary buttons, links, focus). White text on it: **5.40:1** (AA). Caramel text on cream: **4.90:1** (AA body).
- **Accent — Butter Gold (#D9A441):** the wing color. Text/icon color **on espresso surfaces only** (**7.39:1** there; on cream it would fail at ~1.9:1 — never used as text on light backgrounds).
- **Neutral — Cream (#FAF3E8):** page background. **Ivory (#FFF9EF)** cards on it. **Linen (#E8DFC8)** for badges and dividers. **Surface Espresso (#3B2314)** for dark feature bands; butter-on-it measures **6.50:1**.
- **Hover — Caramel Deep (#8C4A12):** primary-button hover; white on it **6.77:1** (darker, never lighter, on hover).
- **Destructive (#B3261E):** errors only.

All 14 fg/bg pairs above were computed with the WCAG checker pre-flight (Sep 8, 2026); none rely on large-text exemptions.

## Typography

- **Playfair Display** for display and headings — the patisserie-craft serif, high contrast, used at weights 500–600. Italic Playfair is reserved for one-off editorial pull-quotes (the token model carries no italic slot; encode `'Playfair Display', Georgia, serif` and apply italics in CSS).
- **Inter** for everything functional — body, UI, labels, prices (tabular numerals via `tnum` so menu price columns align).
- Scale: H1 3.5rem / H2 2.25rem / H3 1.5rem / body 1rem / small 0.875rem / label 0.75rem caps +0.08em. Load via `next/font` (self-hosted, no render-blocking Google request).

## Layout

- 12-column grid, 1200px max content width, 24px gutters; section vertical rhythm uses the spacing scale (64px between major sections, 40px inside).
- Generous whitespace is part of the brand's "peaceful" promise — density is reserved for the menu grid only.
- Sticky top nav (cream, hairline linen border) with pill CTAs; footer on espresso ink.

## Elevation & Depth

- Shadows are soft, warm, and rare: `0 8px 24px rgba(42, 27, 16, 0.08)` for cards, `0 16px 48px rgba(42, 27, 16, 0.14)` for modals. No colored glows, no neon shadows.
- Depth hierarchy: cream page < ivory card < linen badge < espresso band. The 3D hero sits behind DOM text (canvas layered under content, never over).

## Shapes

- Pill (999px) for buttons, badges, chips. 20px for cards and media frames. 12px for inputs. 6px for price tags and inline code.
- The butterfly glyph is the only decorative curve allowed to interrupt this system (wing-teardrop corners on the hero image mask, max one per page).

## Components

- `button-primary` is the only filled high-emphasis action per view (Order on Swiggy / WhatsApp / Call). Hover darkens to Caramel Deep.
- `card-dish` carries menu items: name (Playfair h3), description (Inter body-sm), veg/non-veg FSSAI glyph, `price-tag` bottom-right.
- `badge-label` for section eyebrows and dietary tags; `chip-rating` (espresso bg, butter text) for the ratings band.
- `nav-link` underline-on-hover in caramel; active route marker is a 2px caramel underline.
- `input-field` white on cream, 1px linen border, caramel focus ring.
- `footer-dark` espresso with cream text, NAP block, hours, FSSAI license, and platform links.

## Do's and Don'ts

**Do**
- Keep butter-gold exclusively on espresso/dark surfaces (it is the wing, not a text color).
- Use Playfair for dish and section names; Inter for every price, label, and instruction.
- Keep one filled primary button per view; everything else is secondary or text link.
- Show the veg (green square) / non-veg (brown-red square) FSSAI glyph on every menu item — it is a legal marker in India, not decoration.
- Prefer real photography from the café's own feed over illustration.

**Don't**
- Don't use butter-gold or any gold on cream as text (fails contrast ~1.9:1 — measured).
- Don't lighten the primary button on hover (contrast drops; hover always darkens).
- Don't introduce a second accent hue (no teal, no magenta, no neon) — the butterfly is warm-toned.
- Don't propagate listing typos: "Avacado" → **Avocado**, "CEASER" → **Caesar**, "Macron" → **Macaron** (these spellings exist on Swiggy/Zomato and are quarantined).
- Don't render text inside WebGL/canvas — all copy stays in the DOM for accessibility and SEO.

## Voice & Copy

Warm, unhurried, first-person-plural, never shouty. Verified brand voice anchors (do not edit): "Patisserie | Café" (bio); owner-review reply tone — "Really happy to know you had such a good experience at PAPILIO… we always want people to feel relaxed, comfortable, and enjoy good food with a peaceful vibe". Use "PAPILIO" all-caps only in the wordmark and schema name; running text uses "Papilio".

## Imagery

Source from the café's own Instagram feed (@papiliocafe.in, 1.4K followers, 238 posts) and client-supplied photography: whipped-cream patisserie, plated desserts, café interior, coffee pours. Warm white balance, natural light, shallow depth of field. Every image gets descriptive alt text ("Papilio patisserie counter with…", not "IMG_2043").

## 3D Scene Language

The swallowtail butterfly in Three.js is the single WebGL motif (hero). Scene grammar: warm cream-to-espresso gradient backdrop, gold-emissive wing edges, 12–20 instanced micro-butterflies as ambience, gentle 6–8s wing-flap cycles. Steam particles (60 max) may accompany the coffee band on interior pages. Hard budgets live in PROMPT.md §5 — reduced-motion and no-WebGL fallbacks are mandatory, and the hero ships a poster image that renders before the canvas hydrates.

## Brand Glyph

A swallowtail butterfly drawn from two mirrored wing planes with a slender body — recognizable at 16px favicon and at 3D scale. Approved constructions: (a) flat 2-color mark (butter on espresso), (b) line-art 1.5px stroke in caramel, (c) 3D wing pair for the hero scene. The wordmark is "PAPILIO" in Playfair Display 600, all-caps, letter-spacing +0.06em, with the glyph replacing the counter of the "O" only in the lockup version. No public logo file exists for the café (verified Sep 2026); this spec defines it.
