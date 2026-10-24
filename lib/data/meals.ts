export type Meal = { emoji: string; name: string; note: string };
export type DayMeals = { breakfast: Meal; lunch: Meal; dinner: Meal };
export type WeekPlan = Record<string, DayMeals>;

export const weekMeals: WeekPlan = {
  Monday: {
    breakfast: { emoji: "🥣", name: "Porridge with Berries", note: "Topped with honey & fresh blueberries" },
    lunch:     { emoji: "🥪", name: "Chicken & Avocado Wrap", note: "Served with a small side salad" },
    dinner:    { emoji: "🍝", name: "Spaghetti Bolognese", note: "Hidden veg sauce the kids will love" },
  },
  Tuesday: {
    breakfast: { emoji: "🥞", name: "Banana Pancakes", note: "2-ingredient pancakes with maple syrup" },
    lunch:     { emoji: "🍲", name: "Vegetable Minestrone Soup", note: "With crusty bread for dipping" },
    dinner:    { emoji: "🍗", name: "Lemon Herb Roast Chicken", note: "Served with roasted potatoes & veg" },
  },
  Wednesday: {
    breakfast: { emoji: "🍳", name: "Scrambled Eggs on Toast", note: "With smashed avo & cherry tomatoes" },
    lunch:     { emoji: "🥗", name: "Greek Salad with Feta", note: "Olives, cucumber & a light vinaigrette" },
    dinner:    { emoji: "🐟", name: "Baked Salmon with Rice", note: "With steamed broccoli & lemon butter" },
  },
  Thursday: {
    breakfast: { emoji: "🍓", name: "Yogurt & Granola Bowl", note: "With strawberries, kiwi & chia seeds" },
    lunch:     { emoji: "🌮", name: "Black Bean Tacos", note: "With salsa, cheese & sour cream" },
    dinner:    { emoji: "🍛", name: "Coconut Chicken Curry", note: "Mild and fragrant over fluffy rice" },
  },
  Friday: {
    breakfast: { emoji: "🥤", name: "Mango Smoothie Bowl", note: "Topped with coconut flakes & banana" },
    lunch:     { emoji: "🍕", name: "Homemade Mini Pizzas", note: "Let the kids pick their own toppings" },
    dinner:    { emoji: "🌯", name: "Beef & Veggie Stir-Fry", note: "With noodles & sweet soy sauce" },
  },
  Saturday: {
    breakfast: { emoji: "🧇", name: "French Toast with Berries", note: "Dusted with icing sugar & maple syrup" },
    lunch:     { emoji: "🥙", name: "Grilled Halloumi Wrap", note: "With roasted peppers & tzatziki" },
    dinner:    { emoji: "🍔", name: "Homemade Burgers", note: "Build your own — the whole family joins in" },
  },
  Sunday: {
    breakfast: { emoji: "🥐", name: "Croissants & Fresh Fruit", note: "A relaxed weekend morning treat" },
    lunch:     { emoji: "🥘", name: "Sunday Roast", note: "Roast beef, Yorkshire puddings & all the trimmings" },
    dinner:    { emoji: "🍜", name: "Leftover Soup", note: "Clear out the fridge — warm & cosy" },
  },
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
