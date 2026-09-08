import type { DietKind } from "@/components/site/veg-glyph";

/**
 * Papilio menu data — 21 categories, 187 items.
 *
 * Structure and counts [VERIFIED-Zomato order page, PROMPT.md §6.2]:
 * Salads 8 · Wraps 5 · Small Plates 20 · Sandwiches 9 · Burgers 9 ·
 * Rice Bowls 19 · Pizza 13 · Pasta 13 · Omelettes 7 · Coffee 20 ·
 * Cold Coffee 3 · Iced Coffee 4 · Frappe 3 · Mojitos 5 · Milk Shakes 8 ·
 * Iced Tea 4 · Kombuchas 3 · Water 1 · Juice 1 · Counter Desserts 28 ·
 * Cakes 4.
 *
 * 173 vegetarian items [VERIFIED-Swiggy FAQ] — 7 non-veg + 7 egg here.
 *
 * Policy (PROMPT.md §3/§6.2): prices render ONLY where verified
 * (Swiggy listings). Unpriced items never show a guessed price.
 * Flagship descriptions are verbatim (typos corrected per §9.3);
 * other descriptions are definitional (what the dish is), never claims.
 *
 * Names beyond the §8 verified dishes are representative placeholders
 * pending the client's menu import — swap in place, the UI is data-driven.
 */

export type MenuItem = {
  name: string;
  diet: DietKind;
  /** Only verified prices [VERIFIED-Swiggy]. */
  price?: number;
  /** Definitional description. Verified items carry the listing copy. */
  d?: string;
  bestseller?: boolean;
  allergen?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  note?: string;
  items: MenuItem[];
};

export const menuNote =
  "Prices as listed on Swiggy/Zomato; dine-in menu may vary.";

export const menu: MenuCategory[] = [
  {
    id: "salads",
    label: "Salads",
    items: [
      {
        name: "Chicken & Avocado Salad",
        diet: "nonveg",
        price: 376,
        d: "Grilled chicken, ripe avocado, roasted peppers, fresh cherry tomatoes, mint, coriander, onion, roasted-pepper vinaigrette",
      },
      {
        name: "Papilio's Caesar Salad (Chicken)",
        diet: "nonveg",
        d: "Crisp romaine, grilled chicken, parmesan and croutons with classic Caesar dressing",
      },
      {
        name: "Garden Fresh Salad",
        diet: "veg",
        d: "Seasonal greens, cherry tomatoes and cucumber with a light house vinaigrette",
      },
      {
        name: "Greek Salad",
        diet: "veg",
        d: "Cucumber, olives, peppers and feta with oregano and olive oil",
      },
      {
        name: "Panzanella",
        diet: "veg",
        d: "Tossed bread, ripe tomatoes and basil in olive oil",
      },
      {
        name: "Beetroot & Feta Salad",
        diet: "veg",
        d: "Roasted beets, feta and greens with a balsamic finish",
      },
      {
        name: "Corn & Cheese Salad",
        diet: "veg",
        d: "Sweet corn, cheddar and fresh herbs in a creamy dressing",
      },
      {
        name: "Sprout Salad",
        diet: "veg",
        d: "Moong sprouts, onion, tomato and lemon",
      },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    items: [
      {
        name: "Buttermilk Chicken Wrap",
        diet: "nonveg",
        price: 391,
        d: "Crispy buttermilk chicken, fresh veggies, spicy cheese sauce, served with fries",
      },
      {
        name: "Cottage Crunch Wrap",
        diet: "veg",
        price: 335,
        d: "Crispy cottage cheese, lettuce, onion, creamy + zesty sriracha-cheese sauces, golden fries",
      },
      {
        name: "Paneer Tikka Wrap",
        diet: "veg",
        d: "Charred paneer tikka with mint chutney and onions",
      },
      {
        name: "Falafel Wrap",
        diet: "veg",
        d: "Chickpea falafel with garlic sauce and pickles",
      },
      {
        name: "Veg Cheese Blast Wrap",
        diet: "veg",
        d: "Grilled vegetables and molten cheese with herb mayo",
      },
    ],
  },
  {
    id: "small-plates",
    label: "Small Plates",
    items: [
      {
        name: "Crispy Chicken Wings",
        diet: "nonveg",
        d: "Wings tossed in a house spice blend",
      },
      { name: "Peri Peri Fries", diet: "veg", d: "Skin-on fries dusted in peri peri spice" },
      { name: "Skinny Fries", diet: "veg", d: "Classic thin-cut golden fries" },
      { name: "Loaded Cheese Fries", diet: "veg", d: "Fries under a warm cheese sauce" },
      { name: "Herbed Potato Wedges", diet: "veg", d: "Thick wedges with mixed herbs" },
      { name: "Honey Chilli Potato", diet: "veg", d: "Crisp potato fingers glazed in honey and chilli" },
      { name: "Crispy Corn", diet: "veg", d: "Golden-fried sweet corn with mild spice" },
      { name: "Salt & Pepper Mushroom", diet: "veg", d: "Lightly battered mushrooms with salt and crushed pepper" },
      { name: "Onion Rings", diet: "veg", d: "Beer-battered style crisp onion rings" },
      { name: "Garlic Bread", diet: "veg", d: "Toasted bread with garlic butter" },
      { name: "Cheese Garlic Bread", diet: "veg", d: "Garlic butter and melted cheese" },
      { name: "Bruschetta", diet: "veg", d: "Grilled bread topped with tomatoes and basil" },
      { name: "Mushroom Bruschetta", diet: "veg", d: "Sautéed mushrooms on grilled bread" },
      { name: "Cheesy Nachos", diet: "veg", d: "Corn chips, cheese sauce and jalapeños" },
      { name: "Mozzarella Sticks", diet: "veg", d: "Crumb-fried mozzarella with a dip" },
      { name: "Cottage Cheese Bites", diet: "veg", d: "Paneer cubes, crumbed and fried" },
      { name: "Roasted Salted Peanuts", diet: "veg" },
      { name: "Hummus & Pita", diet: "veg", d: "Chickpea hummus with warm pita" },
      { name: "Veg Nuggets", diet: "veg", d: "Crisp veggie nuggets with ketchup" },
      { name: "Cheese Balls", diet: "veg", d: "Molten cheese centres, crumbed and fried" },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    items: [
      {
        name: "Chicken Club House Sandwich",
        diet: "nonveg",
        bestseller: true,
        d: "Triple-decker with grilled chicken, lettuce, tomato and mayo",
      },
      {
        name: "Harissa Paneer Sandwich",
        diet: "veg",
        d: "Harissa-marinated paneer in focaccia",
      },
      {
        name: "Shroom Grilled Sandwich",
        diet: "veg",
        d: "Porcini-stock mushrooms with cheddar, grilled",
      },
      {
        name: "Pesto Paneer Sandwich",
        diet: "veg",
        d: "Pesto and paneer in homemade focaccia",
      },
      {
        name: "Paneer Thecha Twist",
        diet: "veg",
        d: "Thecha-spiced paneer",
        allergen: "Contains peanuts",
      },
      {
        name: "Grilled Veg Sandwich",
        diet: "veg",
        d: "Grilled garden vegetables with cheese",
      },
      {
        name: "Corn & Cheese Sandwich",
        diet: "veg",
        d: "Sweet corn and cheese, toasted",
      },
      {
        name: "Classic Grilled Cheese",
        diet: "veg",
        d: "Molten cheese between buttered toast",
      },
      {
        name: "Mediterranean Veg Sandwich",
        diet: "veg",
        d: "Zucchini, peppers and olives with herb mayo",
      },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    items: [
      {
        name: "Double Trouble Chicken Burger",
        diet: "nonveg",
        price: 390,
        d: "Two crispy chicken patties, cajun blend, cheddar, jalapeños, chipotle, skinny fries + cheese dip",
      },
      {
        name: "Succulent Grilled Chicken Burger",
        diet: "nonveg",
      },
      { name: "Grill Paneer Burger", diet: "veg" },
      { name: "Classic Veggie Burger", diet: "veg", d: "Veg patty, lettuce, tomato and mayo" },
      { name: "Crispy Veg Burger", diet: "veg", d: "Crunchy veg patty with cheese" },
      { name: "Mushroom Melt Burger", diet: "veg", d: "Sautéed mushrooms under melted cheese" },
      { name: "Cajun Veg Burger", diet: "veg", d: "Cajun-spiced veg patty" },
      { name: "Spicy Jalapeño Burger", diet: "veg", d: "Jalapeños and chipotle mayo" },
      { name: "Paneer Zinger Burger", diet: "veg", d: "Crisp spiced paneer patty" },
    ],
  },
  {
    id: "rice-bowls",
    label: "Rice Bowls",
    items: [
      { name: "Harissa Paneer Rice Bowl", diet: "veg", d: "Harissa-marinated paneer over rice" },
      { name: "Pesto Veg Rice Bowl", diet: "veg", d: "Pesto-tossed vegetables over rice" },
      { name: "Creamy Mushroom Rice Bowl", diet: "veg" },
      { name: "Cajun Cottage Cheese Bowl", diet: "veg" },
      { name: "BBQ Paneer Bowl", diet: "veg" },
      { name: "Teriyaki Tofu Bowl", diet: "veg" },
      { name: "Mediterranean Falafel Bowl", diet: "veg", d: "Falafel, hummus and greens over grains" },
      { name: "Corn & Cheese Bowl", diet: "veg" },
      { name: "Burrito Bowl", diet: "veg", d: "Rice, beans, salsa and cheese" },
      { name: "Peri Peri Veg Bowl", diet: "veg" },
      { name: "Tandoori Paneer Bowl", diet: "veg" },
      { name: "White Sauce Veg Bowl", diet: "veg" },
      { name: "Chilli Garlic Bowl", diet: "veg" },
      { name: "Schezwan Veg Bowl", diet: "veg" },
      { name: "Stir-Fry Veg Bowl", diet: "veg" },
      { name: "Roasted Pepper & Olive Bowl", diet: "veg" },
      { name: "Chipotle Bean Bowl", diet: "veg" },
      { name: "Butter Garlic Veg Bowl", diet: "veg" },
      { name: "Curried Lentil Bowl", diet: "veg" },
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    items: [
      { name: "Mushroom Pizza", diet: "veg" },
      { name: "Margherita", diet: "veg", d: "Tomato, mozzarella and basil" },
      { name: "Corn & Cheese Pizza", diet: "veg" },
      { name: "Farmhouse Veg", diet: "veg", d: "Peppers, onion, corn and mushroom" },
      { name: "Paneer Tikka Pizza", diet: "veg" },
      { name: "Pesto Veg Pizza", diet: "veg" },
      { name: "Olive & Jalapeño Pizza", diet: "veg" },
      { name: "Veggie Supreme", diet: "veg" },
      { name: "Cheese Burst Pizza", diet: "veg", d: "A molten cheese core under the toppings" },
      { name: "Four Cheese Pizza", diet: "veg" },
      { name: "Roasted Pepper & Caramelised Onion Pizza", diet: "veg" },
      { name: "BBQ Paneer Pizza", diet: "veg" },
      { name: "Marinara", diet: "veg", d: "Tomato, garlic and oregano — no cheese" },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    items: [
      { name: "Pesto Pasta with Roasted Almonds", diet: "veg" },
      { name: "Arrabbiata", diet: "veg", d: "Spicy tomato, garlic and chilli" },
      { name: "Marinara", diet: "veg", d: "Tomato, garlic and herbs" },
      { name: "Alfredo", diet: "veg", d: "Creamy parmesan sauce" },
      { name: "Aglio e Olio", diet: "veg", d: "Garlic and olive oil" },
      { name: "Mac & Cheese", diet: "veg" },
      { name: "White Sauce Pasta", diet: "veg" },
      { name: "Mixed Sauce Pasta", diet: "veg", d: "Red and white sauce together" },
      { name: "Mushroom Cream Pasta", diet: "veg" },
      { name: "Cajun Veg Pasta", diet: "veg" },
      { name: "Four Cheese Pasta", diet: "veg" },
      { name: "Baked Cheese Pasta", diet: "veg", d: "Oven-baked under a cheese crust" },
      { name: "Penne in Roasted Pepper Sauce", diet: "veg" },
    ],
  },
  {
    id: "omelettes",
    label: "Omelettes",
    note: "All omelettes are marked egg (brown) per FSSAI convention.",
    items: [
      { name: "Cheese Omelette", diet: "egg" },
      { name: "Masala Omelette", diet: "egg", d: "Onion, chilli and coriander" },
      { name: "Mushroom Omelette", diet: "egg" },
      { name: "Onion & Chilli Omelette", diet: "egg" },
      { name: "Herbed Veggie Omelette", diet: "egg" },
      { name: "Spanish Omelette", diet: "egg", d: "Potato and onion, folded" },
      { name: "Tomato & Basil Omelette", diet: "egg" },
    ],
  },
  {
    id: "coffee",
    label: "Coffee",
    items: [
      { name: "Espresso", diet: "veg" },
      { name: "Double Espresso", diet: "veg" },
      { name: "Ristretto", diet: "veg", d: "A short, concentrated extraction" },
      { name: "Americano", diet: "veg", d: "Espresso lengthened with hot water" },
      { name: "Cappuccino", diet: "veg", bestseller: true, d: "Espresso with steamed milk and foam" },
      { name: "Flat White", diet: "veg" },
      { name: "Latte", diet: "veg", d: "Espresso with steamed milk" },
      { name: "Cortado", diet: "veg", d: "Espresso cut with warm milk" },
      { name: "Piccolo", diet: "veg", d: "A small latte in a glass" },
      { name: "Macchiato", diet: "veg", d: "Espresso marked with milk" },
      { name: "Café Mocha", diet: "veg", d: "Espresso, chocolate and milk" },
      { name: "Caramel Latte", diet: "veg" },
      { name: "Vanilla Latte", diet: "veg" },
      { name: "Hazelnut Latte", diet: "veg" },
      { name: "Cinnamon Cappuccino", diet: "veg" },
      { name: "Filter Coffee", diet: "veg", d: "South Indian style, frothed" },
      { name: "Café Au Lait", diet: "veg", d: "Brewed coffee with hot milk" },
      { name: "Affogato", diet: "veg", d: "Espresso poured over vanilla ice cream" },
      { name: "Con Panna", diet: "veg", d: "Espresso under whipped cream" },
      { name: "Hot Chocolate", diet: "veg", d: "Rich drinking chocolate" },
    ],
  },
  {
    id: "cold-coffee",
    label: "Cold Coffee",
    items: [
      { name: "Classic Cold Coffee", diet: "veg" },
      { name: "Chocolate Cold Coffee", diet: "veg" },
      { name: "Caramel Cold Coffee", diet: "veg" },
    ],
  },
  {
    id: "iced-coffee",
    label: "Iced Coffee",
    items: [
      { name: "Iced Americano", diet: "veg" },
      { name: "Iced Latte", diet: "veg" },
      { name: "Iced Cappuccino", diet: "veg" },
      { name: "Iced Mocha", diet: "veg" },
    ],
  },
  {
    id: "frappe",
    label: "Frappe",
    items: [
      { name: "Coffee Frappe", diet: "veg" },
      { name: "Mocha Frappe", diet: "veg" },
      { name: "Caramel Frappe", diet: "veg" },
    ],
  },
  {
    id: "mojitos",
    label: "Mojitos",
    note: "Sparkling soda coolers.",
    items: [
      { name: "Classic Virgin Mojito", diet: "veg", d: "Lime, mint and soda" },
      { name: "Strawberry Mojito", diet: "veg" },
      { name: "Watermelon Mojito", diet: "veg" },
      { name: "Peach Mojito", diet: "veg" },
      { name: "Passion Fruit Mojito", diet: "veg" },
    ],
  },
  {
    id: "milk-shakes",
    label: "Milk Shakes",
    items: [
      { name: "KitKat Shake", diet: "veg", bestseller: true, d: "Chocolate wafer shake topped with cream" },
      { name: "Chocolate Shake", diet: "veg" },
      { name: "Vanilla Shake", diet: "veg" },
      { name: "Butterscotch Shake", diet: "veg" },
      { name: "Strawberry Shake", diet: "veg" },
      { name: "Oreo Shake", diet: "veg" },
      { name: "Banana Shake", diet: "veg" },
      { name: "Coffee Shake", diet: "veg" },
    ],
  },
  {
    id: "iced-tea",
    label: "Iced Tea",
    items: [
      { name: "Lemon Iced Tea", diet: "veg" },
      { name: "Peach Iced Tea", diet: "veg" },
      { name: "Green Apple Iced Tea", diet: "veg" },
      { name: "Mint Iced Tea", diet: "veg" },
    ],
  },
  {
    id: "kombuchas",
    label: "Kombuchas",
    items: [
      { name: "Original Kombucha", diet: "veg" },
      { name: "Ginger Lime Kombucha", diet: "veg" },
      { name: "Berry Kombucha", diet: "veg" },
    ],
  },
  {
    id: "water",
    label: "Water",
    items: [{ name: "Bottled Water", diet: "veg" }],
  },
  {
    id: "juice",
    label: "Juice",
    items: [{ name: "Fresh Orange Juice", diet: "veg" }],
  },
  {
    id: "counter-desserts",
    label: "Counter Desserts",
    items: [
      { name: "Nutella Sea Salt Macaron", diet: "veg", bestseller: true },
      { name: "Crème Brûlée", diet: "veg", d: "Torched custard under a glass sugar top" },
      { name: "Classic Brownie", diet: "veg" },
      { name: "Walnut Brownie", diet: "veg" },
      { name: "Fudge Brownie", diet: "veg" },
      { name: "Chocolate Éclair", diet: "veg" },
      { name: "Coffee Éclair", diet: "veg" },
      { name: "Tiramisu", diet: "veg", d: "Coffee-soaked layers and mascarpone cream" },
      { name: "New York Cheesecake", diet: "veg" },
      { name: "Blueberry Cheesecake", diet: "veg" },
      { name: "Mango Cheesecake", diet: "veg" },
      { name: "Chocolate Mousse", diet: "veg" },
      { name: "Vanilla Panna Cotta", diet: "veg" },
      { name: "Caramel Custard", diet: "veg" },
      { name: "Lemon Tart", diet: "veg" },
      { name: "Berry Tart", diet: "veg" },
      { name: "Chocolate Tart", diet: "veg" },
      { name: "Opera Slice", diet: "veg", d: "Layered coffee-chocolate classic" },
      { name: "Red Velvet Slice", diet: "veg" },
      { name: "Choco Lava Cake", diet: "veg", d: "A molten chocolate centre" },
      { name: "Cinnamon Roll", diet: "veg" },
      { name: "Blueberry Muffin", diet: "veg" },
      { name: "Chocolate Chip Muffin", diet: "veg" },
      { name: "Madeleine", diet: "veg" },
      { name: "Chocolate Chip Cookie", diet: "veg" },
      { name: "Red Velvet Cookie", diet: "veg" },
      { name: "Butter Croissant", diet: "veg" },
      { name: "Almond Croissant", diet: "veg" },
    ],
  },
  {
    id: "cakes",
    label: "Cakes",
    items: [
      { name: "Chocolate Truffle Cake", diet: "veg" },
      { name: "Red Velvet Cake", diet: "veg" },
      { name: "Blueberry Cream Cake", diet: "veg" },
      { name: "Vanilla Bean Cream Cake", diet: "veg" },
    ],
  },
];

export const totalItems = menu.reduce((sum, c) => sum + c.items.length, 0);
export const totalCategories = menu.length;

/**
 * The four flagship dishes with verified prices (PROMPT.md §8) —
 * single source of truth shared by the home signature strip and the
 * menu explorer's "Signature picks" quick filter.
 */
export const signatureDishNames = [
  "Chicken & Avocado Salad",
  "Buttermilk Chicken Wrap",
  "Cottage Crunch Wrap",
  "Double Trouble Chicken Burger",
] as const;
