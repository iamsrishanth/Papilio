import { menu, totalItems } from "/home/z/my-project/src/content/menu";
const expected: Record<string, number> = {
  "salads": 8, "wraps": 5, "small-plates": 20, "sandwiches": 9, "burgers": 9,
  "rice-bowls": 19, "pizza": 13, "pasta": 13, "omelettes": 7, "coffee": 20,
  "cold-coffee": 3, "iced-coffee": 4, "frappe": 3, "mojitos": 5, "milk-shakes": 8,
  "iced-tea": 4, "kombuchas": 3, "water": 1, "juice": 1, "counter-desserts": 28, "cakes": 4,
};
let veg = 0, nonveg = 0, egg = 0, priced = 0, bad = [];
for (const c of menu) {
  const exp = expected[c.id];
  if (c.items.length !== exp) bad.push(`${c.id}: got ${c.items.length}, expected ${exp}`);
  for (const i of c.items) {
    if (i.diet === "veg") veg++; else if (i.diet === "nonveg") nonveg++; else egg++;
    if (i.price) priced++;
  }
}
console.log(`categories: ${menu.length} (expected 21)`);
console.log(`items: ${totalItems} (expected 187)`);
console.log(`veg: ${veg} (expected 173) | nonveg: ${nonveg} (expected 7) | egg: ${egg} (expected 7)`);
console.log(`priced items: ${priced} (expected 4)`);
console.log(bad.length ? "MISMATCHES:\n" + bad.join("\n") : "All category counts match the spec exactly");
// typo quarantine grep
const raw = JSON.stringify(menu);
const typos = ["Avacado", "CEASER", "Macron", "Deserts", "Hanamakonda"].filter(t => raw.includes(t));
console.log(typos.length ? `TYPO QUARANTINE FAIL: ${typos}` : "Typo quarantine: clean");
