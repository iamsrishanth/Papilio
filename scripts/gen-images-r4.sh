#!/bin/bash
# Round 4: per-route OG images (photo-based, no text) + PWA icons
cd /home/z/my-project
LOG=/home/z/my-project/imagegen-r4.log
echo "=== Round-4 image generation $(date) ===" > "$LOG"

STYLE="warm natural window light, cream and linen surfaces, shallow depth of field, editorial patisserie cafe photography, muted warm earthy palette of espresso brown, caramel, butter gold and cream, premium, high quality, detailed, no text, no watermark, landscape composition"

gen() {
  local file="$1"; local size="$2"; local prompt="$3"
  if [ -s "public/images/$file" ]; then echo "SKIP $file (exists)" >> "$LOG"; return 0; fi
  echo "GEN  $file ..." >> "$LOG"
  if z-ai image -p "$prompt, $STYLE" -o "public/images/$file" -s "$size" >> "$LOG" 2>&1; then
    echo "OK   $file" >> "$LOG"
  else
    echo "FAIL $file" >> "$LOG"
  fi
}

gen og-menu.png 1344x768 "Overhead flat lay of café lunch spread on cream linen tablecloth: fresh salad bowl with avocado and cherry tomatoes, golden wrap sliced in half, skinny fries, burger with cheese dip and iced coffee, ivory ceramic plates, warm afternoon light"
gen og-patisserie.png 1344x768 "Patisserie display counter with rows of macarons, eclairs, fruit tarts and cream desserts under warm lighting, a whole chocolate truffle cream cake with whipped cream swirls on a ceramic stand behind glass, cozy patisserie interior"
gen og-gallery.png 1344x768 "Cozy aesthetic cafe interior with warm hanging pendant lamps, wooden tables and chairs, potted green plants, soft golden afternoon light through windows, peaceful inviting atmosphere, instagram-worthy decor"
gen og-story.png 1344x768 "Baker hands dusting flour over freshly baked golden focaccia with herbs and sea salt on a wooden board, rustic warm bakery kitchen scene, steam and warm light, artisanal craft"
gen og-visit.png 1344x768 "Warm inviting cafe facade entrance with glass door and window, hanging plants, warm evening light glowing from inside, small town street, cozy premium patisserie cafe storefront, no signage text"

mkdir -p public/icons
gen ../icons/icon-512.png 512x512 "Minimal flat vector logo mark: elegant swallowtail butterfly with butter-gold wings and espresso brown slender body, centered with generous padding on a solid deep espresso brown background, clean sharp edges, premium patisserie brand icon, no text"
gen ../icons/icon-1024.png 1024x1024 "Minimal flat vector logo mark: elegant swallowtail butterfly with butter-gold wings and espresso brown slender body, centered with generous padding on a solid deep espresso brown background, clean sharp edges, premium patisserie brand icon, no text"

cat "$LOG"
