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

export function foodName(value: string): string {
  const label = FOOD_OPTIONS.find((f) => f.value === value)?.label ?? value;
  return label.replace(/^\S+\s/, "").toLowerCase();
}
