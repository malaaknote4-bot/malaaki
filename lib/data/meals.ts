export type Ingredient = { name: string; amount: number; unit: "g" | "ml"; note?: string };
export type Servings = { serves: number; adultPortion: number; childPortion: number };
export type Meal = {
  slug: string;
  emoji: string;
  name: string;
  note: string;
  prep: string;
  time: string;
  servings: Servings;
  ingredients: Ingredient[];
  steps: string[];
  tags: string[];
  // Set on a family's own recipe: the slot it was added for.
  custom?: { slot: Slot };
};
export type DayMeals = { breakfast: Meal; lunch: Meal; dinner: Meal };
export type WeekPlan = Record<string, DayMeals>;

const g = (name: string, amount: number, note?: string): Ingredient => ({ name, amount, unit: "g", note });
const ml = (name: string, amount: number, note?: string): Ingredient => ({ name, amount, unit: "ml", note });
// Every recipe serves 4: 2 adults + 2 children. Portions are grams of the finished dish.
const serves = (adultPortion: number, childPortion: number): Servings => ({ serves: 4, adultPortion, childPortion });

export function slugify(name: string): string {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const meal = (m: Omit<Meal, "slug">): Meal => ({ ...m, slug: slugify(m.name) });

export const weekMeals: WeekPlan = {
  Monday: {
    breakfast: meal({
      emoji: "🥞",
      name: "Mini Banana Oat Pancakes",
      note: "Naturally sweet — no added sugar needed",
      prep: "Mash 1 ripe banana into 2 eggs + 4 tbsp oats. Cook small rounds for 2 min each side.",
      time: "15 min",
      servings: serves(200, 120),
      ingredients: [
        g("Ripe bananas", 240, "2 medium, peeled"),
        g("Eggs", 200, "4 large"),
        g("Rolled oats", 80, "about 8 tbsp"),
        g("Baking powder", 4, "1 tsp"),
        g("Ground cinnamon", 1, "a pinch"),
        g("Butter", 10, "2 tsp, for the pan"),
        g("Fresh berries", 150, "to serve"),
      ],
      steps: [
        "Mash the bananas in a bowl with a fork until smooth.",
        "Whisk in the eggs, then stir in the oats, baking powder and cinnamon. Leave for 5 minutes so the oats soften.",
        "Heat a non-stick frying pan over a medium heat and wipe it with a little butter.",
        "Drop in 1 tablespoon of batter per pancake. Cook for 2 minutes until bubbles appear and the edges set.",
        "Flip and cook for 1–2 minutes more until golden. Keep warm while you cook the rest.",
        "Serve about 4 pancakes per adult and 2–3 per child, topped with berries.",
      ],
      tags: ["banana", "oats", "eggs"],
    }),
    lunch: meal({
      emoji: "🍝",
      name: "Rainbow Pasta with Hidden Veg",
      note: "Sneaky spinach & carrot blended into the tomato sauce",
      prep: "Blend cooked carrot, spinach & tinned tomatoes smooth. Toss with penne and grated cheese.",
      time: "25 min",
      servings: serves(320, 180),
      ingredients: [
        g("Penne pasta", 300, "dry weight"),
        g("Carrots", 150, "2 medium, chopped"),
        g("Baby spinach", 60, "2 large handfuls"),
        g("Chopped tomatoes", 400, "1 tin"),
        ml("Olive oil", 15, "1 tbsp"),
        g("Garlic", 6, "2 cloves, crushed"),
        g("Dried oregano", 1, "½ tsp"),
        g("Cheddar cheese", 60, "grated"),
      ],
      steps: [
        "Boil the carrots for 10 minutes until very soft, then drain.",
        "Cook the penne in a large pan of boiling water following the packet (about 10–11 minutes).",
        "Meanwhile, warm the oil in a saucepan and soften the garlic for 1 minute. Add the tomatoes, carrots and oregano and simmer for 8 minutes.",
        "Stir in the spinach until it wilts, then blend the sauce until completely smooth.",
        "Drain the pasta, toss it through the sauce and top with the grated cheddar.",
      ],
      tags: ["pasta", "tomato", "carrot", "cheese", "spinach"],
    }),
    dinner: meal({
      emoji: "🍖",
      name: "Mild Beef Meatballs & Spaghetti",
      note: "Soft, juicy meatballs kids love to twirl",
      prep: "Mix mince with breadcrumbs, egg & mild herbs. Bake at 200°C for 15 min, simmer in passata.",
      time: "35 min",
      servings: serves(420, 240),
      ingredients: [
        g("Lean beef mince", 500, "5% fat"),
        g("Breadcrumbs", 40, "1 slice of bread, blitzed"),
        g("Egg", 50, "1 large"),
        g("Onion", 80, "½ small, finely grated"),
        g("Dried mixed herbs", 2, "1 tsp"),
        g("Passata", 500, "1 carton"),
        ml("Olive oil", 10, "2 tsp"),
        g("Spaghetti", 300, "dry weight"),
      ],
      steps: [
        "Heat the oven to 200°C (180°C fan) and line a baking tray.",
        "Mix the mince, breadcrumbs, egg, onion and herbs with clean hands. Roll into about 20 walnut-sized balls.",
        "Bake the meatballs for 15 minutes until browned and cooked through.",
        "Meanwhile, cook the spaghetti following the packet (about 10–11 minutes).",
        "Warm the passata and oil in a large pan, add the meatballs and simmer for 5 minutes.",
        "Drain the spaghetti and toss it with the sauce. Cut meatballs in half for little ones.",
      ],
      tags: ["beef", "pasta", "tomato", "eggs", "bread", "onion"],
    }),
  },
  Tuesday: {
    breakfast: meal({
      emoji: "🥣",
      name: "Overnight Oats with Strawberries",
      note: "Ready when you wake up — zero morning effort",
      prep: "Mix oats, milk & a spoon of honey in a jar the night before. Top with chopped strawberries.",
      time: "5 min + overnight",
      servings: serves(220, 140),
      ingredients: [
        g("Rolled oats", 160),
        ml("Milk", 400),
        g("Honey", 20, "1 tbsp — skip for babies under 1"),
        ml("Vanilla extract", 2, "½ tsp"),
        g("Strawberries", 200, "hulled and chopped"),
      ],
      steps: [
        "Stir the oats, milk, honey and vanilla together in a large jar or bowl.",
        "Cover and chill in the fridge overnight, or for at least 6 hours.",
        "In the morning, give it a stir and loosen with a splash of milk if it's too thick.",
        "Spoon into bowls and top with the chopped strawberries.",
      ],
      tags: ["oats"],
    }),
    lunch: meal({
      emoji: "🍕",
      name: "Pitta Bread Mini Pizzas",
      note: "Kids pick their own toppings — always a hit",
      prep: "Spread pitta with passata, add cheese & toppings. Grill for 5–6 min until bubbly.",
      time: "15 min",
      servings: serves(260, 160),
      ingredients: [
        g("Wholemeal pitta breads", 240, "4 pittas"),
        g("Passata", 120, "about 8 tbsp"),
        g("Mozzarella", 125, "1 ball, torn"),
        g("Cheddar cheese", 40, "grated"),
        g("Cherry tomatoes", 100, "halved"),
        g("Dried oregano", 1, "a pinch"),
      ],
      steps: [
        "Heat the grill to medium-high.",
        "Toast the pittas under the grill for 1 minute on each side so the bases stay crisp.",
        "Spread each pitta with 2 tablespoons of passata, then add the cheeses and tomatoes and sprinkle with oregano.",
        "Grill for 5–6 minutes until the cheese is bubbling.",
        "Cool for 2 minutes, then cut into fingers for little ones.",
      ],
      tags: ["bread", "cheese", "tomato"],
    }),
    dinner: meal({
      emoji: "🐟",
      name: "Baked Fish Fingers & Sweet Potato Wedges",
      note: "Healthier than the freezer version — still crispy!",
      prep: "Coat white fish strips in beaten egg then breadcrumbs. Bake with wedges at 220°C for 20 min.",
      time: "35 min",
      servings: serves(380, 220),
      ingredients: [
        g("Skinless white fish fillets", 450, "cod or haddock"),
        g("Plain flour", 30, "2 tbsp"),
        g("Egg", 50, "1 large, beaten"),
        g("Panko breadcrumbs", 80),
        g("Sweet potatoes", 600, "2 large, cut into wedges"),
        ml("Olive oil", 30, "2 tbsp"),
        g("Smoked paprika", 2, "½ tsp"),
        g("Lemon", 30, "½, cut into wedges"),
      ],
      steps: [
        "Heat the oven to 220°C (200°C fan).",
        "Toss the wedges with 1½ tablespoons of oil and the paprika. Roast for 30 minutes, turning halfway.",
        "Cut the fish into 2 cm strips. Set out three plates: flour, beaten egg and panko.",
        "Coat each strip in flour, then egg, then panko. Lay on an oiled tray and drizzle with the remaining oil.",
        "Bake the fish for the last 12–15 minutes of the wedges' cooking time, until golden and it flakes easily.",
        "Check for bones before serving to children. Serve with lemon wedges.",
      ],
      tags: ["fish", "eggs", "bread"],
    }),
  },
  Wednesday: {
    breakfast: meal({
      emoji: "🥚",
      name: "Eggy Soldiers",
      note: "Soft-boiled egg with buttery toast dippers",
      prep: "Boil egg for exactly 6 min for a runny yolk. Slice toast into 4 soldiers for dipping.",
      time: "10 min",
      servings: serves(130, 90),
      ingredients: [
        g("Eggs", 200, "4 large"),
        g("Wholemeal bread", 160, "4 slices"),
        g("Butter", 20),
        g("Apple", 150, "1 large, sliced, to serve"),
      ],
      steps: [
        "Bring a small pan of water to a gentle boil.",
        "Lower the eggs in on a spoon and cook for exactly 6 minutes for a runny yolk, or 8 minutes if you prefer it set.",
        "Meanwhile, toast the bread, butter it and cut each slice into 4 soldiers.",
        "Put the eggs in egg cups and slice off the tops. Serve with the soldiers and apple slices.",
      ],
      tags: ["eggs", "bread"],
    }),
    lunch: meal({
      emoji: "🍲",
      name: "Chicken & Sweetcorn Soup",
      note: "Warm, filling and ready in 20 minutes",
      prep: "Simmer shredded chicken, sweetcorn & stock for 15 min. Thicken with a little cornflour.",
      time: "20 min",
      servings: serves(330, 200),
      ingredients: [
        g("Cooked chicken breast", 250, "shredded"),
        g("Sweetcorn", 300, "tinned and drained, or frozen"),
        ml("Low-salt chicken stock", 1000, "1 litre"),
        g("Fresh ginger", 5, "1 tsp, grated"),
        ml("Low-salt soy sauce", 10, "2 tsp"),
        g("Cornflour", 15, "1 tbsp, mixed with 2 tbsp cold water"),
      ],
      steps: [
        "Bring the stock and ginger to a simmer in a large saucepan.",
        "Add the sweetcorn and simmer for 5 minutes.",
        "Stir in the chicken and soy sauce and simmer for another 5 minutes.",
        "Stir in the cornflour mixture and cook for 2 minutes until the soup thickens slightly.",
        "Let children's bowls cool for a few minutes before serving.",
      ],
      tags: ["chicken", "sweetcorn"],
    }),
    dinner: meal({
      emoji: "🧀",
      name: "Mac & Cheese with Butternut Squash",
      note: "Creamy, cheesy comfort food with hidden veg",
      prep: "Roast squash, blend into béchamel with cheddar. Stir in cooked macaroni and bake 15 min.",
      time: "45 min",
      servings: serves(380, 220),
      ingredients: [
        g("Macaroni", 300, "dry weight"),
        g("Butternut squash", 400, "peeled and cubed"),
        ml("Olive oil", 10, "2 tsp"),
        g("Butter", 30),
        g("Plain flour", 30, "2 tbsp"),
        ml("Milk", 500),
        g("Mature cheddar", 150, "grated"),
      ],
      steps: [
        "Heat the oven to 200°C (180°C fan). Toss the squash with the oil and roast for 25 minutes until soft.",
        "Cook the macaroni for 2 minutes less than the packet says, then drain.",
        "Melt the butter in a saucepan, stir in the flour and cook for 1 minute. Gradually whisk in the milk and simmer for 3 minutes until thick.",
        "Blend the roasted squash into the sauce until smooth, then stir in two-thirds of the cheese.",
        "Mix the sauce with the macaroni, tip into a baking dish and top with the remaining cheese.",
        "Bake for 15 minutes until golden and bubbling.",
      ],
      tags: ["pasta", "cheese"],
    }),
  },
  Thursday: {
    breakfast: meal({
      emoji: "🍓",
      name: "Fruit & Yogurt Parfait",
      note: "Layered with granola, berries & a drizzle of honey",
      prep: "Layer Greek yogurt, granola and any chopped fruit in a cup. Drizzle honey on top.",
      time: "5 min",
      servings: serves(230, 140),
      ingredients: [
        g("Greek yogurt", 500),
        g("Granola", 120),
        g("Mixed berries", 250),
        g("Honey", 20, "1 tbsp"),
      ],
      steps: [
        "Spoon 2 tablespoons of yogurt into the bottom of each glass or bowl.",
        "Add a layer of granola, then a layer of berries.",
        "Repeat the layers until everything is used up.",
        "Drizzle with honey and serve straight away so the granola stays crunchy.",
      ],
      tags: ["yogurt", "oats"],
    }),
    lunch: meal({
      emoji: "🌮",
      name: "Ham & Cheese Quesadillas",
      note: "Golden and melty — ready in 10 minutes",
      prep: "Layer ham & grated cheese between two tortillas. Cook in a dry pan 2–3 min each side.",
      time: "10 min",
      servings: serves(200, 120),
      ingredients: [
        g("Flour tortillas", 240, "4 large"),
        g("Sliced ham", 120, "4 slices"),
        g("Cheddar cheese", 120, "grated"),
        g("Cucumber", 150, "cut into sticks, to serve"),
      ],
      steps: [
        "Lay 2 tortillas flat. Scatter over half the cheese, add the ham, then the rest of the cheese.",
        "Top each with another tortilla and press down gently.",
        "Heat a dry frying pan over a medium heat. Cook each quesadilla for 2–3 minutes until golden underneath.",
        "Slide it onto a plate, flip it back into the pan and cook for 2 minutes more.",
        "Rest for 1 minute, then cut into 8 wedges. Serve with cucumber sticks.",
      ],
      tags: ["ham", "cheese", "bread"],
    }),
    dinner: meal({
      emoji: "🍜",
      name: "Chicken Noodle Stir-Fry",
      note: "Colourful veg, tender chicken, mild soy sauce",
      prep: "Stir-fry chicken strips 5 min, add veg, then cooked noodles + soy sauce & sesame oil.",
      time: "20 min",
      servings: serves(380, 220),
      ingredients: [
        g("Chicken breast", 400, "cut into thin strips"),
        g("Medium wheat noodles", 250, "dry weight"),
        g("Carrots", 150, "cut into matchsticks"),
        g("Red pepper", 150, "1, sliced"),
        g("Garlic", 6, "2 cloves, crushed"),
        ml("Vegetable oil", 15, "1 tbsp"),
        ml("Low-salt soy sauce", 30, "2 tbsp"),
        ml("Sesame oil", 10, "2 tsp"),
        g("Honey", 10, "2 tsp"),
      ],
      steps: [
        "Cook the noodles following the packet, drain and toss with half the sesame oil.",
        "Heat the vegetable oil in a wok over a high heat. Stir-fry the chicken for 5–6 minutes until cooked through with no pink inside.",
        "Add the garlic, carrots and pepper and stir-fry for 3 minutes.",
        "Mix the soy sauce, honey and remaining sesame oil.",
        "Add the noodles and sauce to the wok and toss for 2 minutes until piping hot.",
      ],
      tags: ["chicken", "carrot", "pepper"],
    }),
  },
  Friday: {
    breakfast: meal({
      emoji: "🍞",
      name: "French Toast Sticks",
      note: "Golden, dippable and perfect with berries",
      prep: "Dip thick-cut bread in egg, milk & cinnamon. Fry in butter 2 min each side. Cut into sticks.",
      time: "15 min",
      servings: serves(170, 100),
      ingredients: [
        g("Thick-cut bread", 200, "4 slices, ideally a day old"),
        g("Eggs", 150, "3 large"),
        ml("Milk", 100),
        g("Ground cinnamon", 2, "½ tsp"),
        g("Butter", 20),
        g("Mixed berries", 150, "to serve"),
      ],
      steps: [
        "Whisk the eggs, milk and cinnamon together in a shallow dish.",
        "Cut each slice of bread into 3 sticks.",
        "Dip each stick into the egg mixture for about 5 seconds on each side.",
        "Melt half the butter in a frying pan over a medium heat. Fry the sticks for 2 minutes on each side until golden.",
        "Repeat with the remaining butter and sticks. Serve with berries.",
      ],
      tags: ["bread", "eggs"],
    }),
    lunch: meal({
      emoji: "🥔",
      name: "Tuna Sweetcorn Jacket Potato",
      note: "Classic Friday lunch — filling and easy",
      prep: "Microwave potato 8 min, finish in oven 10 min for crispy skin. Top with tuna-mayo & sweetcorn.",
      time: "25 min",
      servings: serves(330, 200),
      ingredients: [
        g("Baking potatoes", 1000, "4 medium, about 250 g each"),
        ml("Olive oil", 5, "1 tsp"),
        g("Tuna in spring water", 220, "2 × 145 g tins, drained"),
        g("Sweetcorn", 150, "tinned and drained"),
        g("Mayonnaise", 60, "4 tbsp"),
        g("Butter", 20),
        g("Salad leaves", 80, "to serve"),
      ],
      steps: [
        "Heat the oven to 200°C (180°C fan).",
        "Prick the potatoes all over with a fork. Microwave for 8 minutes, turning halfway, until soft.",
        "Rub with the oil and bake for 10–15 minutes until the skins are crisp.",
        "Meanwhile, mix the tuna, sweetcorn and mayonnaise.",
        "Split the potatoes, fluff the insides with butter and pile on the filling. Serve with salad.",
      ],
      tags: ["tuna", "sweetcorn", "potato"],
    }),
    dinner: meal({
      emoji: "🍟",
      name: "Homemade Fish & Chips (Baked)",
      note: "Crispy without the fryer — served with mushy peas",
      prep: "Coat cod in flour, egg & panko. Bake with thick-cut chips at 220°C for 25 min.",
      time: "45 min",
      servings: serves(420, 240),
      ingredients: [
        g("Cod fillets", 480, "4 × 120 g"),
        g("Plain flour", 30, "2 tbsp"),
        g("Egg", 50, "1 large, beaten"),
        g("Panko breadcrumbs", 70),
        g("Floury potatoes", 800, "e.g. Maris Piper"),
        ml("Olive oil", 30, "2 tbsp"),
        g("Frozen peas", 300),
        g("Butter", 10),
        g("Lemon", 30, "½, cut into wedges"),
      ],
      steps: [
        "Heat the oven to 220°C (200°C fan).",
        "Cut the potatoes into 1.5 cm chips, pat dry and toss with the oil. Bake for 35–40 minutes, turning once.",
        "Coat each piece of cod in flour, then egg, then panko.",
        "With 15 minutes of chip time left, add the fish to an oiled tray and bake until golden and it flakes easily.",
        "Cook the peas for 3 minutes, drain and roughly mash with the butter.",
        "Check the fish for bones, then serve with chips, mushy peas and lemon.",
      ],
      tags: ["fish", "potato", "peas", "eggs", "bread"],
    }),
  },
  Saturday: {
    breakfast: meal({
      emoji: "🥞",
      name: "Fluffy American Pancakes",
      note: "Stack them high with maple syrup & fresh fruit",
      prep: "Whisk flour, baking powder, egg, milk & butter. Cook on medium heat, flip when bubbles form.",
      time: "20 min",
      servings: serves(220, 130),
      ingredients: [
        g("Plain flour", 200),
        g("Baking powder", 8, "2 tsp"),
        g("Caster sugar", 15, "1 tbsp"),
        g("Egg", 50, "1 large"),
        ml("Milk", 300),
        g("Butter", 30, "melted, plus a little for the pan"),
        ml("Maple syrup", 40, "to serve"),
        g("Mixed berries", 200, "to serve"),
      ],
      steps: [
        "Whisk the flour, baking powder and sugar together in a large bowl.",
        "In a jug, whisk the egg, milk and melted butter. Pour into the dry ingredients and whisk until just smooth — a few lumps are fine.",
        "Heat a non-stick pan over a medium heat and wipe it with a little butter.",
        "Pour in about 3 tablespoons of batter per pancake. Cook for 1–2 minutes until bubbles pop on the surface.",
        "Flip and cook for 1 minute more. Stack and serve with maple syrup and berries.",
      ],
      tags: ["eggs", "bread"],
    }),
    lunch: meal({
      emoji: "🌯",
      name: "Build-Your-Own Wraps",
      note: "Everyone picks their own fillings — fun for the whole family",
      prep: "Warm tortillas, lay out chicken, salad, cheese & sauces. Let the kids assemble their own.",
      time: "15 min",
      servings: serves(260, 160),
      ingredients: [
        g("Flour tortillas", 240, "4 large"),
        g("Cooked chicken breast", 250, "sliced"),
        g("Cheddar cheese", 80, "grated"),
        g("Hummus", 100),
        g("Cucumber", 120, "cut into sticks"),
        g("Little gem lettuce", 80, "shredded"),
      ],
      steps: [
        "Warm the tortillas in a dry pan for 20 seconds each, or microwave for 30 seconds under damp kitchen paper.",
        "Put the chicken, cheese, hummus, cucumber and lettuce in separate bowls on the table.",
        "Everyone spreads hummus on a tortilla and adds their own fillings.",
        "Help little ones fold the bottom up first, then roll the sides in so the filling stays put.",
      ],
      tags: ["chicken", "cheese", "bread"],
    }),
    dinner: meal({
      emoji: "🍔",
      name: "Homemade Burgers & Sweet Potato Fries",
      note: "Shape the patties together — it's half the fun",
      prep: "Mix mince with onion & seasoning, form patties. Grill 4 min each side. Bake fries 25 min.",
      time: "35 min",
      servings: serves(420, 240),
      ingredients: [
        g("Beef mince", 500, "10% fat"),
        g("Onion", 80, "½ small, finely grated"),
        g("Sweet potatoes", 600, "2 large, cut into 1 cm fries"),
        ml("Olive oil", 20, "4 tsp"),
        g("Smoked paprika", 2, "½ tsp"),
        g("Burger buns", 240, "4 buns"),
        g("Little gem lettuce", 40),
      ],
      steps: [
        "Heat the oven to 220°C (200°C fan). Toss the fries with the oil and paprika and bake for 25 minutes, turning halfway.",
        "Mix the mince and onion, then shape into 4 patties about 1.5 cm thick. For children, make 2 of them into 4 mini patties.",
        "Grill or pan-fry over a medium-high heat for 4–5 minutes on each side until there's no pink in the middle — burgers for children must be cooked all the way through.",
        "Lightly toast the buns, then add the lettuce and burgers. Serve with the fries.",
      ],
      tags: ["beef", "onion", "bread"],
    }),
  },
  Sunday: {
    breakfast: meal({
      emoji: "🍳",
      name: "Scrambled Eggs & Beans on Toast",
      note: "A cosy, protein-packed weekend breakfast",
      prep: "Low and slow for creamy eggs — stir constantly off the heat. Warm beans in a small pan.",
      time: "15 min",
      servings: serves(260, 160),
      ingredients: [
        g("Eggs", 300, "6 large"),
        ml("Milk", 40, "about 3 tbsp"),
        g("Butter", 20),
        g("Reduced-sugar baked beans", 415, "1 tin"),
        g("Wholemeal bread", 160, "4 slices"),
      ],
      steps: [
        "Warm the beans gently in a small saucepan, stirring now and then.",
        "Whisk the eggs with the milk.",
        "Melt half the butter in a non-stick pan over a low heat. Add the eggs and stir slowly with a spatula.",
        "Take the pan off the heat while the eggs still look slightly glossy — they keep cooking.",
        "Toast and butter the bread, then pile on the eggs and beans.",
      ],
      tags: ["eggs", "beans", "bread", "tomato"],
    }),
    lunch: meal({
      emoji: "🍗",
      name: "Sunday Roast Chicken",
      note: "Crispy roast potatoes, carrots, greens & gravy",
      prep: "Rub chicken with butter & herbs. Roast at 190°C for 90 min. Rest 15 min before carving.",
      time: "1 hr 50 min",
      servings: serves(450, 250),
      ingredients: [
        g("Whole chicken", 1500, "1.5 kg, weighed on the bone"),
        g("Butter", 25, "softened"),
        g("Fresh thyme", 2, "a few sprigs"),
        g("Lemon", 60, "½"),
        g("Roasting potatoes", 800, "peeled and halved"),
        ml("Olive oil", 30, "2 tbsp"),
        g("Carrots", 300, "cut into batons"),
        g("Savoy cabbage", 200, "shredded"),
        ml("Chicken gravy", 300, "made with granules"),
      ],
      steps: [
        "Heat the oven to 190°C (170°C fan). Rub the butter and thyme over the chicken and put the lemon inside.",
        "Roast for about 1 hour 20 minutes, until the juices run clear and the thickest part reaches 75°C.",
        "Meanwhile, parboil the potatoes for 8 minutes. Drain, shake to rough up the edges, toss with the oil and roast on the top shelf for 50 minutes.",
        "Rest the chicken under foil for 15 minutes.",
        "Boil the carrots for 12 minutes and the cabbage for 5 minutes. Make the gravy, adding any resting juices.",
        "Carve, and cut children's portions into small pieces with no bones.",
      ],
      tags: ["chicken", "potato", "carrot"],
    }),
    dinner: meal({
      emoji: "🍅",
      name: "Tomato & Lentil Soup with Cheesy Toast",
      note: "Cosy end to the weekend — uses up the leftover veg",
      prep: "Simmer tinned tomatoes, red lentils & stock 20 min. Blend smooth. Serve with toasted cheese.",
      time: "35 min",
      servings: serves(420, 240),
      ingredients: [
        ml("Olive oil", 15, "1 tbsp"),
        g("Garlic", 6, "2 cloves, crushed"),
        g("Smoked paprika", 2, "½ tsp"),
        g("Red lentils", 150, "rinsed"),
        g("Chopped tomatoes", 800, "2 tins"),
        ml("Low-salt vegetable stock", 800),
        g("Wholemeal bread", 160, "4 slices"),
        g("Cheddar cheese", 80, "grated"),
      ],
      steps: [
        "Warm the oil in a large saucepan and cook the garlic and paprika for 1 minute.",
        "Add the lentils, tomatoes and stock. Simmer for 20 minutes, stirring often, until the lentils collapse.",
        "Blend until smooth, adding a splash of water if it's too thick.",
        "Toast the bread on one side under the grill, flip, top with cheese and grill for 2–3 minutes until bubbling.",
        "Cut the cheesy toast into fingers for dunking.",
      ],
      tags: ["tomato", "lentils", "cheese", "bread"],
    }),
  },
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export const alternatives: { breakfast: Meal[]; lunch: Meal[]; dinner: Meal[] } = {
  breakfast: [
    meal({
      emoji: "🥣", name: "Porridge with Honey & Berries", note: "Warm, filling and ready in 5 minutes",
      prep: "Cook oats with milk over medium heat. Top with fresh berries and a drizzle of honey.",
      time: "10 min", servings: serves(280, 170),
      ingredients: [g("Porridge oats", 160), ml("Milk", 800), g("Mixed berries", 200), g("Honey", 20, "1 tbsp")],
      steps: [
        "Put the oats and milk in a saucepan over a medium heat.",
        "Bring to a simmer and stir for 4–5 minutes until thick and creamy.",
        "Rest for 1 minute — porridge is very hot, so cool children's bowls with a splash of cold milk.",
        "Top with berries and a drizzle of honey.",
      ],
      tags: ["oats"],
    }),
    meal({
      emoji: "🍇", name: "Fruit Salad & Granola", note: "Fresh, colourful and no cooking needed",
      prep: "Chop seasonal fruit and layer with granola and a spoonful of yogurt.",
      time: "10 min", servings: serves(220, 140),
      ingredients: [
        g("Strawberries", 200), g("Apple", 150, "1 large"), g("Grapes", 150), g("Kiwi", 150, "2"),
        g("Natural yogurt", 200), g("Granola", 100),
      ],
      steps: [
        "Chop the strawberries, apple and kiwi into bite-sized pieces.",
        "Cut the grapes in half lengthways — quarter them for children under 5.",
        "Divide the fruit between bowls.",
        "Top with yogurt and a sprinkle of granola.",
      ],
      tags: ["yogurt", "oats"],
    }),
    meal({
      emoji: "🥐", name: "Croissant & Jam", note: "A special morning treat",
      prep: "Warm croissants in the oven for 3 min. Serve with butter and jam.",
      time: "5 min", servings: serves(120, 80),
      ingredients: [g("Croissants", 240, "4"), g("Butter", 20), g("Strawberry jam", 60, "4 tbsp"), g("Apple", 200, "sliced, to serve")],
      steps: [
        "Heat the oven to 180°C (160°C fan).",
        "Warm the croissants on a tray for 3–4 minutes.",
        "Split them and serve with butter, jam and apple slices. Cut into strips for little ones.",
      ],
      tags: ["bread"],
    }),
    meal({
      emoji: "🫐", name: "Blueberry Smoothie Bowl", note: "Five minutes, no mess, packed with vitamins",
      prep: "Blend blueberries, milk and a spoon of honey. Pour into a bowl and top with granola.",
      time: "5 min", servings: serves(200, 120),
      ingredients: [
        g("Frozen blueberries", 300), ml("Milk", 300), g("Honey", 20, "1 tbsp"),
        g("Granola", 80), g("Strawberries", 100, "sliced"), g("Chia seeds", 15, "1 tbsp"),
      ],
      steps: [
        "Blend the blueberries, milk and honey until thick and smooth.",
        "Pour into bowls.",
        "Top with granola, sliced strawberries and chia seeds. Eat straight away.",
      ],
      tags: ["oats"],
    }),
    meal({
      emoji: "🍊", name: "Yogurt with Fruit & Seeds", note: "Creamy, fresh and ready instantly",
      prep: "Spoon yogurt into a bowl. Top with chopped fruit and a pinch of seeds.",
      time: "5 min", servings: serves(220, 130),
      ingredients: [g("Greek yogurt", 500), g("Mango", 200, "diced"), g("Raspberries", 150), g("Mixed seeds", 30), g("Honey", 15, "2 tsp")],
      steps: [
        "Spoon the yogurt into bowls.",
        "Top with the mango and raspberries.",
        "Sprinkle with seeds and drizzle with honey.",
      ],
      tags: ["yogurt"],
    }),
    meal({
      emoji: "🌽", name: "Cornflakes & Milk", note: "Quick, simple, classic",
      prep: "Pour cereal into a bowl and add cold milk. Done in 30 seconds.",
      time: "2 min", servings: serves(210, 130),
      ingredients: [g("Cornflakes", 120), ml("Milk", 600), g("Strawberries", 150, "sliced")],
      steps: [
        "Pour about 35 g cornflakes for adults and 25 g for children into bowls.",
        "Add cold milk.",
        "Top with sliced strawberries.",
      ],
      tags: [],
    }),
    meal({
      emoji: "🍑", name: "Rice Cakes with Nut Butter & Fruit", note: "Light, crunchy and satisfying",
      prep: "Spread rice cakes with nut butter and top with sliced strawberries or jam.",
      time: "5 min", servings: serves(110, 70),
      ingredients: [
        g("Plain rice cakes", 72, "8 cakes"), g("Smooth peanut butter", 60, "4 tbsp — use seed butter for nut allergies"),
        g("Strawberries", 150, "sliced"), g("Apple", 150, "sliced"),
      ],
      steps: [
        "Spread each rice cake thinly with peanut butter.",
        "Top with sliced strawberries.",
        "Serve 2 per person with apple slices on the side.",
      ],
      tags: ["rice"],
    }),
    meal({
      emoji: "🧇", name: "Waffles with Maple Syrup & Berries", note: "Crispy, sweet and perfect for weekends",
      prep: "Toast waffles, serve with fresh berries and a drizzle of maple syrup.",
      time: "8 min", servings: serves(150, 90),
      ingredients: [g("Ready-made waffles", 280, "8"), g("Mixed berries", 200), ml("Maple syrup", 40)],
      steps: [
        "Toast the waffles following the packet until crisp.",
        "Serve 2 per person, topped with berries.",
        "Drizzle with maple syrup.",
      ],
      tags: ["eggs", "bread"],
    }),
  ],
  lunch: [
    meal({
      emoji: "🥗", name: "Rainbow Veggie Wrap", note: "Colourful, crunchy and fun to eat",
      prep: "Fill a tortilla with hummus, grated carrot, cucumber, red cabbage and lettuce. Roll tight.",
      time: "10 min", servings: serves(230, 140),
      ingredients: [
        g("Flour tortillas", 240, "4 large"), g("Hummus", 150), g("Carrots", 150, "grated"),
        g("Cucumber", 150, "cut into thin sticks"), g("Red cabbage", 80, "finely shredded"), g("Little gem lettuce", 60),
      ],
      steps: [
        "Spread each tortilla with hummus, leaving a gap around the edge.",
        "Lay the carrot, cucumber, cabbage and lettuce in a line across the middle.",
        "Fold the bottom up, tuck in the sides and roll tightly.",
        "Cut each wrap in half on the diagonal to show the colours.",
      ],
      tags: ["bread", "carrot"],
    }),
    meal({
      emoji: "🥣", name: "Lentil & Veggie Soup", note: "Hearty and filling — great with bread",
      prep: "Simmer red lentils, diced carrot and stock for 20 min. Blend half for a creamy texture.",
      time: "30 min", servings: serves(330, 200),
      ingredients: [
        ml("Olive oil", 15, "1 tbsp"), g("Carrots", 250, "diced"), g("Celery", 80, "1 stick, diced"),
        g("Ground cumin", 2, "½ tsp"), g("Red lentils", 180, "rinsed"), ml("Low-salt vegetable stock", 1200),
      ],
      steps: [
        "Warm the oil in a large saucepan and soften the carrots and celery for 5 minutes.",
        "Stir in the cumin, then add the lentils and stock.",
        "Simmer for 20 minutes until the lentils are soft.",
        "Blend half the soup and stir it back in for a creamy texture.",
      ],
      tags: ["lentils", "carrot"],
    }),
    meal({
      emoji: "🧆", name: "Falafel & Hummus Plate", note: "Great finger food with salad",
      prep: "Bake ready-made falafel at 200°C for 12 min. Serve with hummus and cucumber.",
      time: "15 min", servings: serves(200, 120),
      ingredients: [
        g("Ready-made falafel", 300, "about 12"), g("Hummus", 150), g("Cucumber", 150, "sticks"),
        g("Little gem lettuce", 80), g("Lemon", 30, "½"),
      ],
      steps: [
        "Heat the oven to 200°C (180°C fan) and bake the falafel for 12 minutes.",
        "Arrange the lettuce and cucumber on plates with a spoonful of hummus.",
        "Add the warm falafel and a squeeze of lemon. Halve falafel for little ones.",
      ],
      tags: [],
    }),
    meal({
      emoji: "🫕", name: "Minestrone Soup", note: "Packed with veg, ready in 20 minutes",
      prep: "Simmer tinned tomatoes, mixed veg, beans and stock 15 min. Top with a little cheese.",
      time: "25 min", servings: serves(350, 200),
      ingredients: [
        ml("Olive oil", 15, "1 tbsp"), g("Leek", 120, "sliced"), g("Celery", 80, "diced"), g("Courgette", 200, "diced"),
        g("Chopped tomatoes", 400, "1 tin"), g("Cannellini beans", 240, "1 tin, drained"),
        ml("Low-salt vegetable stock", 800), g("Parmesan", 30, "grated"),
      ],
      steps: [
        "Warm the oil and soften the leek and celery for 5 minutes.",
        "Add the courgette, tomatoes, beans and stock.",
        "Simmer for 15 minutes until the vegetables are tender.",
        "Serve topped with grated parmesan.",
      ],
      tags: ["tomato", "beans", "cheese"],
    }),
    meal({
      emoji: "🥙", name: "Avocado & Salad Flatbread", note: "Creamy, quick and kid-approved",
      prep: "Mash avocado with lemon juice. Spread onto flatbread with salad leaves and cucumber.",
      time: "10 min", servings: serves(220, 130),
      ingredients: [
        g("Flatbreads", 240, "4"), g("Ripe avocados", 300, "2"), ml("Lemon juice", 15, "1 tbsp"),
        g("Little gem lettuce", 60), g("Cucumber", 150, "sliced"),
      ],
      steps: [
        "Warm the flatbreads in a dry pan for 30 seconds each side.",
        "Mash the avocado with the lemon juice.",
        "Spread over the flatbreads and top with lettuce and cucumber.",
        "Fold in half or cut into strips for children.",
      ],
      tags: ["avocado", "bread"],
    }),
    meal({
      emoji: "🍜", name: "Vegetable Noodle Soup", note: "Light, warming and ready in 15 minutes",
      prep: "Simmer stock with noodles, sweetcorn and peas for 10 min. Season gently.",
      time: "15 min", servings: serves(380, 220),
      ingredients: [
        ml("Low-salt vegetable stock", 1200), g("Fresh ginger", 5, "1 tsp, grated"), g("Thin wheat noodles", 150),
        g("Sweetcorn", 150), g("Frozen peas", 150), g("Pak choi", 150, "sliced"), ml("Low-salt soy sauce", 15, "1 tbsp"),
      ],
      steps: [
        "Bring the stock and ginger to a simmer.",
        "Add the noodles, sweetcorn and peas and simmer for 5 minutes.",
        "Add the pak choi and soy sauce and cook for 2 minutes more.",
        "Snip the noodles with scissors in children's bowls to make them easier to eat.",
      ],
      tags: ["sweetcorn", "peas"],
    }),
    meal({
      emoji: "🧀", name: "Baked Sweet Potato with Beans", note: "Naturally sweet, filling and easy",
      prep: "Microwave sweet potato 8 min, crisp in oven 10 min. Fill with warm beans and a little cheese.",
      time: "25 min", servings: serves(380, 220),
      ingredients: [
        g("Sweet potatoes", 1000, "4 medium"), g("Reduced-sugar baked beans", 415, "1 tin"),
        g("Cheddar cheese", 60, "grated"), g("Butter", 15),
      ],
      steps: [
        "Heat the oven to 200°C (180°C fan).",
        "Prick the sweet potatoes and microwave for 8 minutes until soft, then bake for 10 minutes to crisp the skins.",
        "Warm the beans in a small pan.",
        "Split the potatoes, add a little butter, then spoon over the beans and sprinkle with cheese.",
      ],
      tags: ["beans", "cheese", "tomato"],
    }),
    meal({
      emoji: "🥪", name: "Cream Cheese & Veggie Sandwich", note: "Soft, fresh and ready in 2 minutes",
      prep: "Spread cream cheese on bread, top with cucumber, spinach and a pinch of salt.",
      time: "5 min", servings: serves(210, 130),
      ingredients: [
        g("Wholemeal bread", 320, "8 slices"), g("Cream cheese", 120), g("Cucumber", 150, "thinly sliced"),
        g("Baby spinach", 40), g("Apple", 200, "sliced, to serve"),
      ],
      steps: [
        "Spread the cream cheese over 4 slices of bread.",
        "Layer on the cucumber and spinach, then top with the remaining bread.",
        "Cut into triangles or fingers and serve with apple slices.",
      ],
      tags: ["cheese", "bread", "spinach"],
    }),
  ],
  dinner: [
    meal({
      emoji: "🍛", name: "Mild Veggie Curry & Rice", note: "Warming, colourful and packed with veg",
      prep: "Sauté onion, add diced veg and mild curry paste with coconut milk. Simmer 20 min. Serve on rice.",
      time: "35 min", servings: serves(420, 240),
      ingredients: [
        g("Basmati rice", 280, "dry weight"), ml("Vegetable oil", 15, "1 tbsp"), g("Onion", 150, "1, chopped"),
        g("Mild curry paste", 45, "3 tbsp"), g("Cauliflower", 300, "small florets"), g("Courgette", 200, "diced"),
        g("Chickpeas", 240, "1 tin, drained"), g("Chopped tomatoes", 400, "1 tin"), ml("Coconut milk", 400, "1 tin"),
      ],
      steps: [
        "Rinse the rice and cook following the packet.",
        "Warm the oil in a large pan and soften the onion for 5 minutes.",
        "Stir in the curry paste for 1 minute, then add the cauliflower, courgette and chickpeas.",
        "Pour in the tomatoes and coconut milk and simmer for 20 minutes until the vegetables are tender.",
        "Serve over the rice.",
      ],
      tags: ["onion", "rice", "tomato"],
    }),
    meal({
      emoji: "🥘", name: "Bean & Vegetable Stew", note: "Hearty, nutritious and totally plant-based",
      prep: "Simmer tinned beans, diced veg, tomatoes and stock 20 min. Season gently.",
      time: "35 min", servings: serves(420, 240),
      ingredients: [
        ml("Olive oil", 15, "1 tbsp"), g("Celery", 80, "diced"), g("Sweet potato", 300, "diced"), g("Courgette", 200, "diced"),
        g("Smoked paprika", 2, "½ tsp"), g("Mixed beans", 480, "2 tins, drained"), g("Chopped tomatoes", 400, "1 tin"),
        ml("Low-salt vegetable stock", 400),
      ],
      steps: [
        "Warm the oil and soften the celery for 3 minutes.",
        "Add the sweet potato, courgette and paprika and cook for 2 minutes.",
        "Add the beans, tomatoes and stock.",
        "Simmer for 20–25 minutes until the sweet potato is tender.",
      ],
      tags: ["beans", "tomato"],
    }),
    meal({
      emoji: "🍖", name: "Pork Tenderloin with Roasted Veg", note: "Tender, juicy and full of flavour",
      prep: "Season pork, sear in a pan, finish in oven at 200°C for 20 min. Roast veg alongside.",
      time: "40 min", servings: serves(420, 240),
      ingredients: [
        g("New potatoes", 600, "halved"), g("Carrots", 300, "chunks"), g("Courgette", 200, "chunks"),
        ml("Olive oil", 30, "2 tbsp"), g("Pork tenderloin", 500), g("Dried thyme", 1, "½ tsp"), g("Apple sauce", 60, "to serve"),
      ],
      steps: [
        "Heat the oven to 200°C (180°C fan). Toss the potatoes and carrots with 1½ tablespoons of oil and roast for 15 minutes.",
        "Rub the pork with the remaining oil and the thyme, then sear in a hot pan for 1 minute on each side.",
        "Add the pork and courgette to the tray and roast for 20 minutes, until the pork's juices run clear.",
        "Rest the pork for 5 minutes, then slice thinly. Serve with the veg and apple sauce.",
      ],
      tags: ["pork", "carrot", "potato"],
    }),
    meal({
      emoji: "🐑", name: "Lamb Koftas & Rice", note: "Mild spiced meatballs kids love",
      prep: "Mix lamb mince with mild spices. Shape into balls, bake at 200°C for 15 min. Serve with rice.",
      time: "30 min", servings: serves(400, 230),
      ingredients: [
        g("Lamb mince", 500), g("Ground cumin", 2, "½ tsp"), g("Ground coriander", 2, "½ tsp"), g("Garlic", 6, "2 cloves, crushed"),
        g("Basmati rice", 280, "dry weight"), g("Cucumber", 150, "diced"), g("Fresh mint", 5, "chopped"), g("Lemon", 30, "½"),
      ],
      steps: [
        "Heat the oven to 200°C (180°C fan).",
        "Mix the lamb, cumin, coriander and garlic. Shape into 16 small sausage-shaped koftas.",
        "Bake for 15 minutes until browned and cooked through.",
        "Meanwhile, cook the rice. Toss the cucumber with the mint and a squeeze of lemon.",
        "Serve the koftas on the rice with the cucumber salad.",
      ],
      tags: ["lamb", "rice"],
    }),
    meal({
      emoji: "🥦", name: "Broccoli & Potato Bake", note: "Simple and comforting without the cheese",
      prep: "Slice potatoes thin, layer with broccoli and a light cream sauce. Bake 30 min at 190°C.",
      time: "45 min", servings: serves(400, 230),
      ingredients: [
        g("Potatoes", 800, "thinly sliced"), g("Broccoli", 300, "small florets"), ml("Single cream", 200), ml("Milk", 150),
        g("Garlic", 6, "2 cloves, crushed"), g("Ground nutmeg", 1, "a pinch"), g("Butter", 15, "for the dish"),
      ],
      steps: [
        "Heat the oven to 190°C (170°C fan) and butter a baking dish.",
        "Boil the potato slices for 4 minutes and the broccoli for 2 minutes, then drain.",
        "Warm the cream, milk, garlic and nutmeg in a small pan.",
        "Layer the potatoes and broccoli in the dish and pour over the cream mixture.",
        "Cover with foil and bake for 20 minutes, then uncover and bake for 10 minutes more until golden.",
      ],
      tags: ["broccoli", "potato"],
    }),
    meal({
      emoji: "🫕", name: "Butternut Squash Soup & Bread Roll", note: "Silky, sweet and ready in 30 minutes",
      prep: "Roast squash 25 min, blend with stock, ginger and coconut milk. Serve with a warm roll.",
      time: "40 min", servings: serves(420, 240),
      ingredients: [
        g("Butternut squash", 1000, "peeled and cubed"), ml("Olive oil", 15, "1 tbsp"), g("Fresh ginger", 5, "1 tsp, grated"),
        ml("Low-salt vegetable stock", 700), ml("Coconut milk", 200), g("Bread rolls", 240, "4"),
      ],
      steps: [
        "Heat the oven to 200°C (180°C fan). Toss the squash with the oil and roast for 25 minutes until soft.",
        "Tip into a saucepan with the ginger, stock and coconut milk and simmer for 5 minutes.",
        "Blend until silky smooth.",
        "Warm the rolls in the oven for 3 minutes and serve with the soup.",
      ],
      tags: ["bread"],
    }),
    meal({
      emoji: "🍤", name: "Prawn Stir-Fry with Noodles", note: "Quick, colourful and packed with veg",
      prep: "Stir-fry prawns 3 min, add peppers, sweetcorn and noodles with mild soy sauce.",
      time: "15 min", servings: serves(360, 210),
      ingredients: [
        g("Medium wheat noodles", 250, "dry weight"), ml("Vegetable oil", 15, "1 tbsp"), g("Raw king prawns", 300, "peeled"),
        g("Garlic", 6, "2 cloves, crushed"), g("Red pepper", 150, "sliced"), g("Baby sweetcorn", 150, "halved"),
        g("Pak choi", 150, "sliced"), ml("Low-salt soy sauce", 30, "2 tbsp"), ml("Sesame oil", 10, "2 tsp"),
      ],
      steps: [
        "Cook the noodles following the packet and drain.",
        "Heat the oil in a wok over a high heat. Stir-fry the prawns for 2–3 minutes until pink all the way through.",
        "Add the garlic, pepper and sweetcorn and stir-fry for 3 minutes, then add the pak choi for 1 minute.",
        "Add the noodles, soy sauce and sesame oil and toss until hot. Chop prawns small for little ones.",
      ],
      tags: ["sweetcorn", "pepper", "fish"],
    }),
    meal({
      emoji: "🌱", name: "Lentil Shepherd's Pie", note: "A veggie twist on a classic comfort dish",
      prep: "Simmer lentils with veg and tomatoes 20 min. Top with mashed potato and bake 20 min.",
      time: "55 min", servings: serves(420, 240),
      ingredients: [
        g("Potatoes", 900, "peeled and chopped"), ml("Milk", 80), g("Butter", 30), ml("Olive oil", 15, "1 tbsp"),
        g("Carrots", 200, "diced"), g("Celery", 80, "diced"), g("Cooked green lentils", 500, "2 tins, drained"),
        g("Chopped tomatoes", 400, "1 tin"), ml("Low-salt vegetable stock", 200), g("Dried thyme", 1, "½ tsp"),
      ],
      steps: [
        "Heat the oven to 200°C (180°C fan). Boil the potatoes for 15 minutes, drain and mash with the milk and butter.",
        "Meanwhile, warm the oil and soften the carrots and celery for 5 minutes.",
        "Add the lentils, tomatoes, stock and thyme and simmer for 15 minutes until thick.",
        "Spoon into a baking dish, top with the mash and rough up the surface with a fork.",
        "Bake for 20 minutes until golden on top.",
      ],
      tags: ["lentils", "tomato", "potato", "carrot"],
    }),
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

export const allMeals: Meal[] = [
  ...Object.values(weekMeals).flatMap((d) => [d.breakfast, d.lunch, d.dinner]),
  ...alternatives.breakfast,
  ...alternatives.lunch,
  ...alternatives.dinner,
];

export function findMealBySlug(slug: string, custom: Meal[] = []): Meal | undefined {
  return custom.find((m) => m.slug === slug) ?? allMeals.find((m) => m.slug === slug);
}

export type Slot = "breakfast" | "lunch" | "dinner";
export const SLOTS: Slot[] = ["breakfast", "lunch", "dinner"];
// Saved swaps, keyed "Monday.breakfast" → meal slug.
export type MealChoices = Record<string, string>;
export const choiceKey = (day: string, slot: Slot) => `${day}.${slot}`;

const slotOf = new Map<string, Slot>(
  SLOTS.flatMap((slot) => [
    ...Object.values(weekMeals).map((d) => [d[slot].slug, slot] as const),
    ...alternatives[slot].map((m) => [m.slug, slot] as const),
  ])
);

const mealSlot = (m: Meal) => m.custom?.slot ?? slotOf.get(m.slug);
const containsDislike = (meal: Meal, dislikes: string[]) => meal.tags.some((t) => dislikes.includes(t));

export function getSwapOptions(slot: Slot, dislikes: string[], currentSlug: string, custom: Meal[] = []): Meal[] {
  return [...custom, ...allMeals].filter(
    (m) => mealSlot(m) === slot && m.slug !== currentSlug && !containsDislike(m, dislikes)
  );
}

export type MealSearch = {
  results: { meal: Meal; sameSlot: boolean }[];
  hidden: { count: number; foods: string[] };
};

export function searchMeals(
  query: string,
  slot: Slot,
  dislikes: string[],
  currentSlug = "",
  custom: Meal[] = []
): MealSearch {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w))
    // Match at the start of a word, so "egg" doesn't hit "veggie".
    .map((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  const matches = [...custom, ...allMeals].filter((m) => {
    if (m.slug === currentSlug) return false;
    const haystack = [m.name, m.note, ...m.ingredients.map((i) => i.name), ...m.tags].join(" ").toLowerCase();
    return words.every((w) => w.test(haystack));
  });
  const hiddenMeals = matches.filter((m) => containsDislike(m, dislikes));
  const visible = matches
    .filter((m) => !containsDislike(m, dislikes))
    .map((meal) => ({ meal, sameSlot: mealSlot(meal) === slot }))
    .sort((a, b) => Number(b.sameSlot) - Number(a.sameSlot));
  return {
    results: visible,
    hidden: {
      count: hiddenMeals.length,
      foods: [...new Set(hiddenMeals.flatMap((m) => m.tags.filter((t) => dislikes.includes(t))))],
    },
  };
}

// The meal shown for a day/slot: the family's own pick if it's still allowed, otherwise the plan's meal.
export function resolveMeal(
  day: string,
  slot: Slot,
  dislikes: string[],
  choices: MealChoices,
  custom: Meal[] = []
): Meal {
  const picked = choices[choiceKey(day, slot)];
  const chosen = picked ? findMealBySlug(picked, custom) : undefined;
  if (chosen && !containsDislike(chosen, dislikes)) return chosen;
  return getEffectiveMeal(weekMeals[day][slot], alternatives[slot], dislikes, DAYS.indexOf(day as (typeof DAYS)[number]));
}

export function parseMealChoices(value: unknown): MealChoices {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter((e): e is [string, string] => typeof e[1] === "string")
  );
}

export function formatAmount(amount: number, unit: "g" | "ml"): string {
  if (amount >= 1000) {
    const big = Number((amount / 1000).toFixed(2)).toString();
    return unit === "g" ? `${big} kg` : `${big} ${amount === 1000 ? "litre" : "litres"}`;
  }
  return `${amount} ${unit}`;
}
