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
