#!/bin/bash
# Papilio brand image generation — warm editorial patisserie aesthetic
cd /home/z/my-project
mkdir -p public/images
LOG=/home/z/my-project/imagegen.log
echo "=== Papilio image generation started $(date) ===" > "$LOG"

STYLE="warm natural window light, cream and linen surfaces, shallow depth of field, editorial patisserie cafe photography, muted warm earthy palette of espresso brown, caramel, butter gold and cream, premium, high quality, detailed, no text, no watermark"

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

# Hero poster — butterfly right, cream space left for DOM text
gen hero-poster.png 1344x768 "Minimalist editorial illustration of a single elegant swallowtail butterfly with butter-gold translucent wings, espresso brown slender body and subtle gold wing edges, floating on the right half of the frame, generous empty warm cream space across the left half and top, soft paper grain texture, premium patisserie brand art, refined flat illustration, muted warm palette"

# OG image
gen og-cover.png 1344x768 "Elegant swallowtail butterfly with butter-gold wings and espresso body over a warm cream-to-espresso gradient backdrop, centered composition, generous margins, premium patisserie cafe brand art, editorial minimal illustration"

# Signature dishes (4 verified flagship)
gen dish-salad.png 1152x864 "Fresh grilled chicken and avocado salad bowl with cherry tomatoes, roasted red peppers, mint and coriander, ceramic bowl on cream linen tablecloth"
gen dish-wrap.png 1152x864 "Crispy golden buttermilk chicken wrap sliced in half showing juicy chicken and fresh vegetables, served with skinny fries and spicy cheese sauce dip, on ivory ceramic plate"
gen dish-cottage-wrap.png 1152x864 "Crispy golden cottage cheese paneer wrap with lettuce, onion and sriracha cheese sauce, served with golden fries on a rustic cream plate"
gen dish-burger.png 1152x864 "Double crispy chicken burger with two golden patties, melted cheddar, jalapeno slices and chipotle sauce, with skinny fries and cheese dip, on warm wooden board"

# Bestsellers
gen dish-cappuccino.png 1152x864 "Perfect cappuccino with rosetta latte art in a warm cream ceramic cup on matching saucer, single macaron beside it"
gen dish-macaron.png 1152x864 "Golden hazelnut macaron with sea salt flakes on a small ivory ceramic plate, close-up macro shot"
gen dish-shake.png 1152x864 "Tall glass of chocolate wafer milkshake topped with whipped cream and crushed wafer crumble, striped paper straw"
gen dish-sandwich.png 1152x864 "Triple decker club house sandwich on toasted focaccia bread with grilled chicken, fresh lettuce and tomato, toothpick on top"

# Patisserie
gen patisserie-signature-cake.png 1024x1024 "Elegant whole chocolate truffle cream cake with glossy ganache drips and swirls of whipped cream, on a ceramic cake stand"
gen patisserie-celebration.png 864x1152 "Custom celebration cake with smooth pastel cream frosting, delicate piped borders and dried flower decoration, patisserie craftsmanship"
gen patisserie-gifting.png 1024x1024 "Premium patisserie gift box filled with assorted macarons and petit fours, tied with caramel satin ribbon, on linen"
gen patisserie-counter.png 1152x864 "Artisan patisserie counter display with rows of macarons, tarts, eclairs and cream desserts under warm display lighting"

# Gallery — varied aspect ratios for masonry
gen gallery-interior.png 1152x864 "Cozy premium cafe interior with warm wooden furniture, cream walls, warm hanging lamps, plants and large windows with golden afternoon light"
gen gallery-coffee-pour.png 864x1152 "Barista hands pouring steamed milk creating latte art in a ceramic cup on a wooden bar counter, steam rising"
gen gallery-seating.png 768x1344 "Quiet corner of an aesthetic cafe with two armchairs, a small round marble table with coffee cups, warm lamp glow, bookshelf"
gen gallery-dessert-plate.png 1024x1024 "Plated dessert with creme brulee, fresh berries and mint on an ivory plate, gold dessert spoon, patisserie plating"
gen gallery-facade.png 864x1152 "Charming small premium cafe storefront with warm cream facade, wooden framed glass door, potted plants, evening warm light"
gen gallery-baking.png 1024x1024 "Baker hands piping delicate cream rosettes onto pastries in a warm patisserie kitchen, close-up of craft"
gen gallery-focaccia.png 1152x864 "Freshly baked golden focaccia bread with herbs and sea salt on a wooden board, artisan bakery craft"
gen gallery-spread.png 1152x864 "Cafe table spread seen from above with two cappuccinos, a slice of cake, a macaron plate and a small flower vase, cream tablecloth"

echo "=== done $(date) ===" >> "$LOG"
