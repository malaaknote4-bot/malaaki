export type Meal = { emoji: string; name: string; note: string; prep: string; tags: string[] };
export type DayMeals = { breakfast: Meal; lunch: Meal; dinner: Meal };
export type WeekPlan = Record<string, DayMeals>;

export const weekMeals: WeekPlan = {
  Monday: {
    breakfast: {
      emoji: "🥞",
      name: "Mini Banana Oat Pancakes",
      note: "Naturally sweet — no added sugar needed",
      prep: "Mash 1 ripe banana into 2 eggs + 4 tbsp oats. Cook small rounds for 2 min each side.",
      tags: ["banana", "oats", "eggs"],
    },
    lunch: {
      emoji: "🍝",
      name: "Rainbow Pasta with Hidden Veg",
      note: "Sneaky spinach & carrot blended into the tomato sauce",
      prep: "Blend cooked carrot, spinach & tinned tomatoes smooth. Toss with penne and grated cheese.",
      tags: ["pasta", "tomato", "carrot", "cheese"],
    },
    dinner: {
      emoji: "🍖",
      name: "Mild Beef Meatballs & Spaghetti",
      note: "Soft, juicy meatballs kids love to twirl",
      prep: "Mix mince with breadcrumbs, egg & mild herbs. Bake at 200°C for 15 min, simmer in passata.",
      tags: ["beef", "pasta", "tomato", "eggs"],
    },
  },
  Tuesday: {
    breakfast: {
      emoji: "🥣",
      name: "Overnight Oats with Strawberries",
      note: "Ready when you wake up — zero morning effort",
      prep: "Mix oats, milk & a spoon of honey in a jar the night before. Top with chopped strawberries.",
      tags: ["oats"],
    },
    lunch: {
      emoji: "🍕",
      name: "Pitta Bread Mini Pizzas",
      note: "Kids pick their own toppings — always a hit",
      prep: "Spread pitta with passata, add cheese & toppings. Grill for 5–6 min until bubbly.",
      tags: ["bread", "cheese", "tomato"],
    },
    dinner: {
      emoji: "🐟",
      name: "Baked Fish Fingers & Sweet Potato Wedges",
      note: "Healthier than the freezer version — still crispy!",
      prep: "Coat white fish strips in beaten egg then breadcrumbs. Bake with wedges at 220°C for 20 min.",
      tags: ["fish", "eggs", "bread"],
    },
  },
  Wednesday: {
    breakfast: {
      emoji: "🥚",
      name: "Eggy Soldiers",
      note: "Soft-boiled egg with buttery toast dippers",
      prep: "Boil egg for exactly 6 min for a runny yolk. Slice toast into 4 soldiers for dipping.",
      tags: ["eggs", "bread"],
    },
    lunch: {
      emoji: "🍲",
      name: "Chicken & Sweetcorn Soup",
      note: "Warm, filling and ready in 20 minutes",
      prep: "Simmer shredded chicken, sweetcorn & stock for 15 min. Thicken with a little cornflour.",
      tags: ["chicken", "sweetcorn"],
    },
    dinner: {
      emoji: "🧀",
      name: "Mac & Cheese with Butternut Squash",
      note: "Creamy, cheesy comfort food with hidden veg",
      prep: "Roast squash, blend into béchamel with cheddar. Stir in cooked macaroni and bake 15 min.",
      tags: ["pasta", "cheese"],
    },
  },
  Thursday: {
    breakfast: {
      emoji: "🍓",
      name: "Fruit & Yogurt Parfait",
      note: "Layered with granola, berries & a drizzle of honey",
      prep: "Layer Greek yogurt, granola and any chopped fruit in a cup. Drizzle honey on top.",
      tags: ["yogurt", "oats"],
    },
    lunch: {
      emoji: "🌮",
      name: "Ham & Cheese Quesadillas",
      note: "Golden and melty — ready in 10 minutes",
      prep: "Layer ham & grated cheese between two tortillas. Cook in a dry pan 2–3 min each side.",
      tags: ["ham", "cheese", "bread"],
    },
    dinner: {
      emoji: "🍜",
      name: "Chicken Noodle Stir-Fry",
      note: "Colourful veg, tender chicken, mild soy sauce",
      prep: "Stir-fry chicken strips 5 min, add veg, then cooked noodles + soy sauce & sesame oil.",
      tags: ["chicken", "carrot", "pepper"],
    },
  },
  Friday: {
    breakfast: {
      emoji: "🍞",
      name: "French Toast Sticks",
      note: "Golden, dippable and perfect with berries",
      prep: "Dip thick-cut bread in egg, milk & cinnamon. Fry in butter 2 min each side. Cut into sticks.",
      tags: ["bread", "eggs"],
    },
    lunch: {
      emoji: "🥔",
      name: "Tuna Sweetcorn Jacket Potato",
      note: "Classic Friday lunch — filling and easy",
      prep: "Microwave potato 8 min, finish in oven 10 min for crispy skin. Top with tuna-mayo & sweetcorn.",
      tags: ["tuna", "sweetcorn", "potato"],
    },
    dinner: {
      emoji: "🍟",
      name: "Homemade Fish & Chips (Baked)",
      note: "Crispy without the fryer — served with mushy peas",
      prep: "Coat cod in flour, egg & panko. Bake with thick-cut chips at 220°C for 25 min.",
      tags: ["fish", "potato", "peas"],
    },
  },
  Saturday: {
    breakfast: {
      emoji: "🥞",
      name: "Fluffy American Pancakes",
      note: "Stack them high with maple syrup & fresh fruit",
      prep: "Whisk flour, baking powder, egg, milk & butter. Cook on medium heat, flip when bubbles form.",
      tags: ["eggs", "bread"],
    },
    lunch: {
      emoji: "🌯",
      name: "Build-Your-Own Wraps",
      note: "Everyone picks their own fillings — fun for the whole family",
      prep: "Warm tortillas, lay out chicken, salad, cheese & sauces. Let the kids assemble their own.",
      tags: ["chicken", "cheese", "bread"],
    },
    dinner: {
      emoji: "🍔",
      name: "Homemade Burgers & Sweet Potato Fries",
      note: "Shape the patties together — it's half the fun",
      prep: "Mix mince with onion & seasoning, form patties. Grill 4 min each side. Bake fries 25 min.",
      tags: ["beef", "onion", "bread"],
    },
  },
  Sunday: {
    breakfast: {
      emoji: "🍳",
      name: "Scrambled Eggs & Beans on Toast",
      note: "A cosy, protein-packed weekend breakfast",
      prep: "Low and slow for creamy eggs — stir constantly off the heat. Warm beans in a small pan.",
      tags: ["eggs", "beans", "bread", "tomato"],
    },
    lunch: {
      emoji: "🍗",
      name: "Sunday Roast Chicken",
      note: "Roast potatoes, veg, gravy & Yorkshire puddings",
      prep: "Rub chicken with butter & herbs. Roast at 190°C for 90 min. Rest 15 min before carving.",
      tags: ["chicken", "potato", "carrot"],
    },
    dinner: {
      emoji: "🍅",
      name: "Tomato & Lentil Soup with Cheesy Toast",
      note: "Cosy end to the weekend — uses up the leftover veg",
      prep: "Simmer tinned tomatoes, red lentils & stock 20 min. Blend smooth. Serve with toasted cheese.",
      tags: ["tomato", "lentils", "cheese", "bread"],
    },
  },
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export const alternatives: { breakfast: Meal[]; lunch: Meal[]; dinner: Meal[] } = {
  breakfast: [
    { emoji: "🥣", name: "Porridge with Honey & Berries", note: "Warm, filling and ready in 5 minutes", prep: "Cook oats with milk over medium heat. Top with fresh berries and a drizzle of honey.", tags: ["oats"] },
    { emoji: "🍇", name: "Fruit Salad & Granola", note: "Fresh, colourful and no cooking needed", prep: "Chop seasonal fruit and layer with granola and a spoonful of yogurt.", tags: ["yogurt", "oats"] },
    { emoji: "🥐", name: "Croissant & Jam", note: "A special morning treat", prep: "Warm croissants in the oven for 3 min. Serve with butter and jam.", tags: ["bread"] },
    { emoji: "🫐", name: "Blueberry Smoothie Bowl", note: "Five minutes, no mess, packed with vitamins", prep: "Blend blueberries, milk and a spoon of honey. Pour into a bowl and top with granola.", tags: ["oats"] },
    { emoji: "🍊", name: "Yogurt with Fruit & Seeds", note: "Creamy, fresh and ready instantly", prep: "Spoon yogurt into a bowl. Top with chopped fruit and a pinch of seeds.", tags: ["yogurt"] },
    { emoji: "🌽", name: "Cornflakes & Milk", note: "Quick, simple, classic", prep: "Pour cereal into a bowl and add cold milk. Done in 30 seconds.", tags: [] },
    { emoji: "🍑", name: "Rice Cakes with Nut Butter & Fruit", note: "Light, crunchy and satisfying", prep: "Spread rice cakes with nut butter and top with banana slices or jam.", tags: [] },
    { emoji: "🧇", name: "Waffles with Maple Syrup & Berries", note: "Crispy, sweet and perfect for weekends", prep: "Toast waffles, serve with fresh berries and a drizzle of maple syrup.", tags: ["eggs", "bread"] },
  ],
  lunch: [
    { emoji: "🥗", name: "Rainbow Veggie Wrap", note: "Colourful, crunchy and fun to eat", prep: "Fill a tortilla with hummus, grated carrot, cucumber and red pepper. Roll tight.", tags: ["bread", "carrot"] },
    { emoji: "🥣", name: "Lentil & Veggie Soup", note: "Hearty and filling — great with bread", prep: "Simmer red lentils, diced carrot and stock for 20 min. Blend half for a creamy texture.", tags: ["lentils", "carrot"] },
    { emoji: "🧆", name: "Falafel & Hummus Plate", note: "Great finger food with salad", prep: "Bake ready-made falafel at 200°C for 12 min. Serve with hummus and cucumber.", tags: [] },
    { emoji: "🫕", name: "Minestrone Soup", note: "Packed with veg, ready in 20 minutes", prep: "Simmer tinned tomatoes, mixed veg, beans and stock 15 min. Top with a little cheese.", tags: ["tomato", "beans", "cheese"] },
    { emoji: "🥙", name: "Avocado & Salad Flatbread", note: "Creamy, quick and kid-approved", prep: "Mash avocado with lemon juice. Spread onto flatbread with salad leaves and cucumber.", tags: ["avocado", "bread"] },
    { emoji: "🍜", name: "Vegetable Noodle Soup", note: "Light, warming and ready in 15 minutes", prep: "Simmer stock with noodles, sweetcorn and peas for 10 min. Season gently.", tags: ["sweetcorn", "peas"] },
    { emoji: "🧀", name: "Baked Sweet Potato with Beans", note: "Naturally sweet, filling and easy", prep: "Microwave sweet potato 8 min, crisp in oven 10 min. Fill with warm beans and a little cheese.", tags: ["beans", "cheese"] },
    { emoji: "🥪", name: "Cream Cheese & Veggie Sandwich", note: "Soft, fresh and ready in 2 minutes", prep: "Spread cream cheese on bread, top with cucumber, spinach and a pinch of salt.", tags: ["cheese", "bread"] },
  ],
  dinner: [
    { emoji: "🍛", name: "Mild Veggie Curry & Rice", note: "Warming, colourful and packed with veg", prep: "Sauté onion, add diced veg and mild curry paste with coconut milk. Simmer 20 min. Serve on rice.", tags: ["onion", "rice", "tomato"] },
    { emoji: "🥘", name: "Bean & Vegetable Stew", note: "Hearty, nutritious and totally plant-based", prep: "Simmer tinned beans, diced veg, tomatoes and stock 20 min. Season gently.", tags: ["beans", "tomato"] },
    { emoji: "🍖", name: "Pork Tenderloin with Roasted Veg", note: "Tender, juicy and full of flavour", prep: "Season pork, sear in a pan, finish in oven at 200°C for 20 min. Roast veg alongside.", tags: ["pork", "carrot", "potato"] },
    { emoji: "🐑", name: "Lamb Koftas & Rice", note: "Mild spiced meatballs kids love", prep: "Mix lamb mince with mild spices. Shape into balls, bake at 200°C for 15 min. Serve with rice.", tags: ["lamb", "rice"] },
    { emoji: "🥦", name: "Broccoli & Potato Bake", note: "Simple and comforting without the cheese", prep: "Slice potatoes thin, layer with broccoli and a light cream sauce. Bake 30 min at 190°C.", tags: ["broccoli", "potato"] },
    { emoji: "🫕", name: "Butternut Squash Soup & Bread Roll", note: "Silky, sweet and ready in 30 minutes", prep: "Roast squash 25 min, blend with stock, ginger and coconut milk. Serve with a warm roll.", tags: ["bread"] },
    { emoji: "🍤", name: "Prawn Stir-Fry with Noodles", note: "Quick, colourful and packed with veg", prep: "Stir-fry prawns 3 min, add peppers, sweetcorn and noodles with mild soy sauce.", tags: ["sweetcorn", "pepper"] },
    { emoji: "🌱", name: "Lentil Shepherd's Pie", note: "A veggie twist on a classic comfort dish", prep: "Simmer lentils with veg and tomatoes 20 min. Top with mashed potato and bake 20 min.", tags: ["lentils", "tomato", "potato"] },
  ],
};

// `seed` (the day index) spreads swaps across the pool so a week doesn't repeat one substitute.
export function getEffectiveMeal(
  meal: Meal,
  pool: Meal[],
  dislikes: string[],
  seed = 0
): Meal {
  if (dislikes.length === 0) return meal;
  if (!meal.tags.some((t) => dislikes.includes(t))) return meal;
  const clean = pool.filter((m) => !m.tags.some((t) => dislikes.includes(t)));
  return clean.length > 0 ? clean[seed % clean.length] : meal;
}
