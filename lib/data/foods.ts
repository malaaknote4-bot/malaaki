export const FOOD_OPTIONS = [
  { value: "banana",    label: "🍌 Banana" },
  { value: "oats",      label: "🌾 Oats" },
  { value: "eggs",      label: "🥚 Eggs" },
  { value: "pasta",     label: "🍝 Pasta" },
  { value: "beef",      label: "🥩 Beef" },
  { value: "chicken",   label: "🍗 Chicken" },
  { value: "fish",      label: "🐟 Fish" },
  { value: "tuna",      label: "🐟 Tuna" },
  { value: "tomato",    label: "🍅 Tomato" },
  { value: "cheese",    label: "🧀 Cheese" },
  { value: "potato",    label: "🥔 Potato" },
  { value: "beans",     label: "🫘 Beans" },
  { value: "lentils",   label: "🌱 Lentils" },
  { value: "sweetcorn", label: "🌽 Sweetcorn" },
  { value: "mushrooms", label: "🍄 Mushrooms" },
  { value: "onion",     label: "🧅 Onion" },
  { value: "carrot",    label: "🥕 Carrot" },
  { value: "pepper",    label: "🫑 Pepper" },
  { value: "bread",     label: "🍞 Bread" },
  { value: "yogurt",    label: "🥛 Yogurt" },
  { value: "ham",       label: "🍖 Ham" },
  { value: "peas",      label: "🟢 Peas" },
  { value: "rice",      label: "🍚 Rice" },
  { value: "broccoli",  label: "🥦 Broccoli" },
  { value: "avocado",   label: "🥑 Avocado" },
  { value: "spinach",   label: "🥬 Spinach" },
];

export const FOOD_VALUES = FOOD_OPTIONS.map((f) => f.value);

// Word patterns that mean an ingredient contains one of the dislike foods.
const FOOD_PATTERNS: Record<string, RegExp> = {
  banana: /banana/i, oats: /\boat|granola/i, eggs: /\begg/i, pasta: /pasta|penne|spaghetti|macaroni|lasagn|fusilli|tagliatelle/i,
  beef: /beef|steak/i, chicken: /chicken(?! stock| gravy)/i, fish: /fish|cod\b|haddock|salmon|prawn|shrimp|seafood/i, tuna: /tuna/i,
  tomato: /tomato|passata|ketchup|baked beans/i, cheese: /cheese|cheddar|mozzarella|parmesan|feta|halloumi/i,
  potato: /(?<!sweet )potato|chips\b/i, beans: /\bbeans\b/i, lentils: /lentil|\bdal\b|\bdhal\b/i, sweetcorn: /sweetcorn|\bcorn\b/i,
  mushrooms: /mushroom/i, onion: /onion|shallot/i, carrot: /carrot/i, pepper: /\b(red|green|yellow|bell) pepper|capsicum/i,
  bread: /bread|tortilla|pitta|panko|croissant|waffle|\bbuns?\b|\brolls\b|flatbread|naan|bagel|toast/i, yogurt: /yogh?urt/i,
  ham: /\bham\b/i, peas: /(?<!chick)peas\b/i, rice: /\brice\b/i, broccoli: /broccoli/i, avocado: /avocado|guacamole/i, spinach: /spinach/i,
};

export function detectFoodTags(texts: string[]): string[] {
  return FOOD_VALUES.filter((value) => texts.some((t) => FOOD_PATTERNS[value]?.test(t)));
}

export function foodName(value: string): string {
  const label = FOOD_OPTIONS.find((f) => f.value === value)?.label ?? value;
  return label.replace(/^\S+\s/, "").toLowerCase();
}
