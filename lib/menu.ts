import type { Localized } from "./i18n";

// Road 8's real menu (from the Instagram menu, June 2025).
// Prices are optional: add `price: 45000` (SYP) to an item and it shows on the card and in the order total.
// Photos: items without `image` show a branded Road 8 tile. Put your own photos in /public/menu
// and set `image: "/menu/your-file.jpg"`.

export type Tag = "bestseller" | "new" | "spicy";

export type Category = {
  id: string;
  name: Localized;
  emoji: string;
};

export type MenuItem = {
  id: string;
  category: Category["id"];
  name: Localized;
  desc: Localized;
  price?: number;
  image?: string;
  tags?: Tag[];
  featured?: boolean;
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const categories: Category[] = [
  { id: "burgers", name: { ar: "برجر", en: "Burgers" }, emoji: "🍔" },
  { id: "tortilla", name: { ar: "تورتيلا", en: "Tortilla" }, emoji: "🌯" },
  { id: "sandwiches", name: { ar: "الساندويش", en: "Sandwiches" }, emoji: "🥖" },
  { id: "meals", name: { ar: "الوجبات", en: "Meals" }, emoji: "🍗" },
  { id: "fries", name: { ar: "الفرايز", en: "Fries" }, emoji: "🍟" },
  { id: "appetizers", name: { ar: "المقبلات", en: "Appetizers" }, emoji: "🧀" },
  { id: "salads", name: { ar: "السلطات", en: "Salads" }, emoji: "🥗" },
];

export const menu: MenuItem[] = [
  // Burgers
  {
    id: "road8",
    category: "burgers",
    name: { ar: "رود8", en: "Road8" },
    desc: {
      ar: "قطع من الدجاج المقلي، خس، هالبينو، شرائح تشيدر، مايونيز.",
      en: "Fried chicken pieces, lettuce, jalapeño, cheddar slices, mayonnaise.",
    },
    image: u("photo-1606755962773-d324e0a13086"),
    tags: ["spicy"],
  },
  {
    id: "auto-bahn",
    category: "burgers",
    name: { ar: "اوتو بان", en: "Auto Bahn" },
    desc: {
      ar: "قطع من الدجاج، صوص باربكيو، خس، تشيدر، صوص رود8.",
      en: "Chicken pieces, BBQ sauce, lettuce, cheddar, Road8 sauce.",
    },
    image: "/menu/auto-bahn.jpg",
    featured: true,
  },
  {
    id: "stop",
    category: "burgers",
    name: { ar: "ستوب", en: "Stop" },
    desc: {
      ar: "قطعة من اللحم الطازج، خس، طماطم، بصل، صوص رود8، تشيدر.",
      en: "Fresh beef patty, lettuce, tomato, onion, Road8 sauce, cheddar.",
    },
    image: u("photo-1568901346375-23c9450c58cd"),
    featured: true,
  },
  {
    id: "red-light",
    category: "burgers",
    name: { ar: "ريد لايت", en: "Red light" },
    desc: {
      ar: "قطع من الدجاج، صوص رود8، خس، تشيدر، صوص هاني ماسترد.",
      en: "Chicken pieces, Road8 sauce, lettuce, cheddar, honey mustard.",
    },
    image: u("photo-1615297928064-24977384d0da"),
  },
  {
    id: "corner",
    category: "burgers",
    name: { ar: "كورنر", en: "Corner" },
    desc: { ar: "قطعة من الدجاج، خس، طماطم.", en: "Chicken fillet, lettuce, tomato." },
  },
  {
    id: "bumb",
    category: "burgers",
    name: { ar: "بامب", en: "Bumb" },
    desc: {
      ar: "قطعة من اللحم الطازج، خس، صوص رود8، صوص باربكيو، تشيدر.",
      en: "Fresh beef patty, lettuce, Road8 sauce, BBQ sauce, cheddar.",
    },
    image: "/menu/bumb.jpg",
    featured: true,
  },
  {
    id: "over-take",
    category: "burgers",
    name: { ar: "اوفر تيك", en: "Over take" },
    desc: {
      ar: "قطعة من الدجاج، أناناس، خس، تشيدر، صوص رود8.",
      en: "Chicken fillet, pineapple, lettuce, cheddar, Road8 sauce.",
    },
  },
  {
    id: "traffic",
    category: "burgers",
    name: { ar: "ترافيك", en: "Traffic" },
    desc: {
      ar: "قطعة من الدجاج، صوص رود8، تشيدر، خس، طماطم، بصل.",
      en: "Chicken fillet, Road8 sauce, cheddar, lettuce, tomato, onion.",
    },
  },

  // Tortilla
  {
    id: "curve",
    category: "tortilla",
    name: { ar: "كيرف", en: "Curve" },
    desc: { ar: "قطع من الدجاج، خس، تشيدر، صوص الباربكيو.", en: "Chicken pieces, lettuce, cheddar, BBQ sauce." },
    image: u("photo-1626700051175-6818013e1d4f"),
  },
  {
    id: "brake",
    category: "tortilla",
    name: { ar: "بريك", en: "Brake" },
    desc: { ar: "قطع من الدجاج، خس، صوص رود8، هاني ماسترد.", en: "Chicken pieces, lettuce, Road8 sauce, honey mustard." },
  },
  {
    id: "flashing",
    category: "tortilla",
    name: { ar: "فلاشينج", en: "Flashing" },
    desc: {
      ar: "قطع من الدجاج، خس، طماطم، تشيدر، صوص رود8.",
      en: "Chicken pieces, lettuce, tomato, cheddar, Road8 sauce.",
    },
  },
  {
    id: "horn",
    category: "tortilla",
    name: { ar: "هورن", en: "Horn" },
    desc: { ar: "قطع من الدجاج، أناناس، صوص رود8.", en: "Chicken pieces, pineapple, Road8 sauce." },
  },
  {
    id: "zone",
    category: "tortilla",
    name: { ar: "زون", en: "Zone" },
    desc: { ar: "قطع من الدجاج، خس، طماطم، صوص رود8.", en: "Chicken pieces, lettuce, tomato, Road8 sauce." },
    image: "/menu/zone.jpg",
    featured: true,
  },
  {
    id: "one-way",
    category: "tortilla",
    name: { ar: "ون واي", en: "One way" },
    desc: { ar: "قطع من الدجاج، خس، مايونيز، طماطم.", en: "Chicken pieces, lettuce, mayonnaise, tomato." },
  },
  {
    id: "no-entry",
    category: "tortilla",
    name: { ar: "نو انتري", en: "No Entry" },
    desc: {
      ar: "قطع من الدجاج الحار، صوص هاني ماسترد، خس، تشيدر، صوص رود8.",
      en: "Spicy chicken pieces, honey mustard, lettuce, cheddar, Road8 sauce.",
    },
    tags: ["spicy"],
  },

  // Sandwiches
  {
    id: "francisco",
    category: "sandwiches",
    name: { ar: "فرانشيسكو", en: "Francisco" },
    desc: {
      ar: "دجاج مشوي، بصل، فطر، ذرة، مايونيز، فلفل روماني، موزريلا.",
      en: "Grilled chicken, onion, mushroom, corn, mayonnaise, red pepper, mozzarella.",
    },
    image: u("photo-1509722747041-616f39b57569"),
  },
  {
    id: "mexican",
    category: "sandwiches",
    name: { ar: "مكسيكي", en: "Mexican" },
    desc: {
      ar: "دجاج مشوي حار، بصل، فطر، ذرة، مايونيز.",
      en: "Spicy grilled chicken, onion, mushroom, corn, mayonnaise.",
    },
    image: u("photo-1529006557810-274b9b2fc783"),
    tags: ["spicy"],
  },
  {
    id: "fajita",
    category: "sandwiches",
    name: { ar: "فاهيتا", en: "Fajita" },
    desc: {
      ar: "دجاج مشوي، بصل، فطر، ذرة، موزريلا، صوص أفوكادو، فلفل روماني.",
      en: "Grilled chicken, onion, mushroom, corn, mozzarella, avocado sauce, red pepper.",
    },
    image: u("photo-1528735602780-2552fd46c7af"),
  },

  // Meals
  {
    id: "crispy-3",
    category: "meals",
    name: { ar: "3 قطع كريسبي", en: "3 Crispy pieces" },
    desc: { ar: "صوص اختياري، بطاطا.", en: "Sauce of your choice, fries." },
    image: u("photo-1562967914-608f82629710"),
  },
  {
    id: "crispy-5",
    category: "meals",
    name: { ar: "5 قطع كريسبي", en: "5 Crispy pieces" },
    desc: { ar: "صوص اختياري، بطاطا، كول سلو، خبز.", en: "Sauce of your choice, fries, coleslaw, bread." },
    image: u("photo-1626082927389-6cd097cdc6ec"),
  },

  // Fries
  {
    id: "cheese-fries",
    category: "fries",
    name: { ar: "تشيز فرايز", en: "Cheese fries" },
    desc: { ar: "بطاطا مقلية، جبنة تشيدر.", en: "Fries, cheddar cheese." },
    image: u("photo-1598679253544-2c97992403ea"),
  },
  {
    id: "loaded-fries",
    category: "fries",
    name: { ar: "لودد فرايز", en: "Loaded fries" },
    desc: {
      ar: "بطاطا مقلية، جبنة تشيدر، هالبينو، صوص رود8، صوص هاني ماسترد، صوص باربكيو.",
      en: "Fries, cheddar, jalapeño, Road8 sauce, honey mustard, BBQ sauce.",
    },
    image: u("photo-1573080496219-bb080dd4f877"),
  },
  {
    id: "chicken-loaded-fries",
    category: "fries",
    name: { ar: "تشكن لودد فرايز", en: "Chicken loaded fries" },
    desc: {
      ar: "بطاطا مقلية، دجاج مقرمش، جبنة تشيدر، هالبينو، صوص رود8، صوص هاني ماسترد، صوص باربكيو.",
      en: "Fries, crispy chicken, cheddar, jalapeño, Road8 sauce, honey mustard, BBQ sauce.",
    },
    image: u("photo-1576107232684-1279f390859f"),
  },

  // Appetizers
  {
    id: "mozzarella-sticks",
    category: "appetizers",
    name: { ar: "أصابع الموزريلا", en: "Mozzarella sticks" },
    desc: { ar: "أصابع موزريلا مقرمشة.", en: "Crispy mozzarella sticks." },
    image: u("photo-1531749668029-2db88e4276c7"),
  },
  {
    id: "onion-rings",
    category: "appetizers",
    name: { ar: "حلقات البصل", en: "Onion rings" },
    desc: { ar: "حلقات بصل مقرمشة.", en: "Crispy onion rings." },
    image: u("photo-1639024471283-03518883512d"),
  },
  {
    id: "french-fries",
    category: "appetizers",
    name: { ar: "بطاطا مقلية", en: "French fries" },
    desc: { ar: "بطاطا مقلية ذهبية.", en: "Golden french fries." },
    image: u("photo-1518013431117-eb1465fa5752"),
  },

  // Salads
  {
    id: "road8-caesar",
    category: "salads",
    name: { ar: "سيزر رود8", en: "Road8 Caesar" },
    desc: { ar: "سلطة السيزر على طريقة رود8.", en: "Caesar salad, Road 8 style." },
    image: u("photo-1546793665-c74683f339c1"),
  },
  {
    id: "caesar-salad",
    category: "salads",
    name: { ar: "سلطة السيزر", en: "Caesar salad" },
    desc: { ar: "سلطة السيزر الكلاسيكية.", en: "Classic Caesar salad." },
    image: u("photo-1550304943-4f24f54ddde9"),
  },
  {
    id: "coleslaw",
    category: "salads",
    name: { ar: "كول سلو", en: "Coleslaw" },
    desc: { ar: "سلطة الملفوف الكريمية.", en: "Creamy cabbage coleslaw." },
  },
];

export const sauces: Localized[] = [
  { ar: "هاني ماسترد", en: "Honey mustard" },
  { ar: "كوكتيل", en: "Cocktail" },
  { ar: "باربكيو", en: "BBQ" },
  { ar: "رانش", en: "Ranch" },
  { ar: "مايونيز", en: "Mayonnaise" },
  { ar: "هالبينو", en: "Jalapeño" },
  { ar: "تشيدر", en: "Cheddar" },
  { ar: "كاتشب", en: "Ketchup" },
];

export const menuById = Object.fromEntries(menu.map((item) => [item.id, item]));

// Photos for the home page gallery (one large + four small).
export const galleryImages = [
  "/menu/bumb.jpg",
  "/menu/zone.jpg",
  "/menu/auto-bahn.jpg",
  u("photo-1606755962773-d324e0a13086"),
  u("photo-1573080496219-bb080dd4f877"),
];

export const heroImage = "/menu/bumb.jpg";
