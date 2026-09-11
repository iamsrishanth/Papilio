# Papilio — Patisserie | Café

Website for **Papilio**, a patisserie-café in Hanamkonda, Warangal — a warm espresso-and-cream identity with butter-gold accents, editorial serif headlines, and a swallowtail butterfly signature.

## Features

- **Home** — full-viewport 3D hero (procedural swallowtail butterfly + instanced micro-butterfly swarm in Three.js) over a server-rendered poster for LCP, signature-dish strip, ratings band, patisserie teaser, visit band
- **Menu** (`/menu`) — MenuExplorer with sticky category rail (scroll-spy + counts), diet filter chips (Veg / Non-veg / Egg with `aria-pressed`), dotted-leader dish rows, 21 categories / 187 items drawn from `src/content/menu.ts`, FSSAI veg/non-veg/egg glyphs on every item, verified prices only
- **Patisserie** (`/patisserie`) — celebration-cake line with WhatsApp ordering deep links
- **Story** (`/story`) — brand narrative from verified reviews and press quotes (`src/content/reviews.ts`)
- **Visit** (`/visit`) — address, hours card, copy-button utilities, Get-directions CTA
- **Gallery** (`/gallery`)
- 3D contracts: DPR clamped, delta-skip, IntersectionObserver pause, context-lost → poster fallback, reduced-motion / data-saver respected, full dispose on unmount

## Tech Stack

- Next.js (App Router) + React 19 + TypeScript strict
- Tailwind CSS 4 + shadcn/ui, framer-motion, Three.js + @react-three/fiber + drei
- Prisma 6 (scaffolded `User`/`Post` models; content is static TS modules)
- Content layer: `src/content/site.ts` (NAP, hours, ratings, deep links), `menu.ts`, `reviews.ts` — counts verified by `scripts/verify-menu.ts`

## Getting Started

```bash
bun install
bun run dev        # next dev on port 3000
bun run build      # next build (standalone output)
bun run start      # bun .next/standalone/server.js

# Database (scaffold)
bun run db:generate
bun run db:push
```

## Project Structure

```
├── src/
│   ├── app/              # /, /menu, /patisserie, /story, /visit, /gallery
│   ├── components/
│   │   ├── site/         # CtaButton, VegGlyph, ButterflyGlyph, header/footer, cards
│   │   └── hero/         # papilio-hero-3d.tsx (Scene A), hero-canvas.tsx
│   ├── content/          # site.ts, menu.ts, reviews.ts
│   └── lib/
├── prisma/               # scaffolded schema
├── DESIGN.md             # design contract: palette, Playfair/Inter type, radii, motion
├── PROMPT.md             # original build brief
├── worklog.md            # build log with verified content counts
└── scripts/              # verify-menu.ts and asset generation
```

## Deployment

Configured for Vercel (`.vercel/` project metadata present). Production runs the standalone Next.js server under Bun. No database is required — all content ships as typed static data.

## Notes

`DESIGN.md` is the single source of visual truth: cream `#FAF3E8` page / ivory cards / linen badges / espresso text, caramel `#9A5B1F` interaction color, butter-gold `#D9A441` restricted to dark surfaces, Playfair Display headings + Inter body. No fabricated business facts, no emojis in UI, no blue/indigo hues.
