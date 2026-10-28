import type { Localized } from "./i18n";

// Road 8's menu (Instagram menu, October 2025).
// `price` is in old Syrian pounds (ل.ق), as on the printed menu; the new-pound price (ل.ج) is price / 100.
// Leave `price` out to hide it. Photos: put them in /public/menu and set `image: "/menu/file.jpg"`;
// `imagePosition` picks which part of a tall photo shows in the card (CSS object-position).
// Items without `image` show a branded Road 8 tile.

export type Tag = "bestseller" | "new" | "spicy";

export type Category = {
  id: string;
  name: Localized;
  emoji: string;
  compact?: boolean; // small items (sauces, add-ons) are listed as rows instead of photo cards
};

export type MenuItem = {
  id: string;
  category: Category["id"];
  name: Localized;
  desc: Localized;
  price?: number;
  image?: string;
  imagePosition?: string;
  tags?: Tag[];
  featured?: boolean;
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const categories: Category[] = [
  { id: "burgers", name: { ar: "البرجر", en: "Burgers" }, emoji: "🍔" },
  { id: "tortilla", name: { ar: "تورتيلا", en: "Tortilla" }, emoji: "🌯" },
  { id: "sandwiches", name: { ar: "الساندويش", en: "Sandwiches" }, emoji: "🥖" },
  { id: "meals", name: { ar: "الوجبات", en: "Meals" }, emoji: "🍗" },
  { id: "fries", name: { ar: "الفرايز", en: "Fries" }, emoji: "🍟" },
  { id: "salads", name: { ar: "السلطات", en: "Salads" }, emoji: "🥗" },
  { id: "appetizers", name: { ar: "المقبلات", en: "Appetizers" }, emoji: "🧀" },
  { id: "extras", name: { ar: "الإضافات والصوصات", en: "Add-ons & sauces" }, emoji: "➕", compact: true },
];

export const menu: MenuItem[] = [
  // Burgers
  {
    id: "road8",
    category: "burgers",
    name: { ar: "رود ٨", en: "Road8" },
    desc: {
      ar: "خبز الڤينا، قطع من الدجاج المقلي، خس، هالبينو، شرائح تشيدر، مايونيز.",
      en: "Vienna bread, fried chicken pieces, lettuce, jalapeño, cheddar slices, mayonnaise.",
    },
    price: 52000,
    image: "/menu/road8.jpg",
    imagePosition: "50% 78%",
    featured: true,
  },
  {
    id: "stop",
    category: "burgers",
    name: { ar: "ستوب", en: "Stop" },
    desc: {
      ar: "قطعة من اللحم الطازج، خس، طماطم، بصل، صوص رود٨، صوص رانش، تشيدر.",
      en: "Fresh beef patty, lettuce, tomato, onion, Road8 sauce, ranch, cheddar.",
    },
    price: 52000,
    image: u("photo-1568901346375-23c9450c58cd"),
  },
  {
    id: "red-light",
    category: "burgers",
    name: { ar: "ريد لايت", en: "Red light" },
    desc: {
      ar: "قطع من الدجاج، صوص رود٨، خس، تشيدر، صوص هاني ماسترد.",
      en: "Chicken pieces, Road8 sauce, lettuce, cheddar, honey mustard.",
    },
    price: 49000,
    image: "/menu/red-light.jpg",
    imagePosition: "50% 80%",
  },
  {
    id: "bumb",
    category: "burgers",
    name: { ar: "بامب", en: "Bumb" },
    desc: {
      ar: "قطعة من اللحم الطازج، خس، صوص رود٨، صوص باربكيو، تشيدر.",
      en: "Fresh beef patty, lettuce, Road8 sauce, BBQ sauce, cheddar.",
    },
    price: 52000,
    image: "/menu/bumb.jpg",
    featured: true,
  },
  {
    id: "over-take",
    category: "burgers",
    name: { ar: "اوفر تيك", en: "Over take" },
    desc: {
      ar: "قطعة من الدجاج، أناناس، خس، تشيدر، صوص رود٨.",
      en: "Chicken fillet, pineapple, lettuce, cheddar, Road8 sauce.",
    },
    price: 52000,
  },
  {
    id: "auto-bahn",
    category: "burgers",
    name: { ar: "اوتو بان", en: "Auto Bahn" },
    desc: {
      ar: "قطع من الدجاج، صوص باربكيو، خس، تشيدر، صوص رود٨.",
      en: "Chicken pieces, BBQ sauce, lettuce, cheddar, Road8 sauce.",
    },
    price: 46000,
    image: "/menu/auto-bahn.jpg",
    featured: true,
  },
  {
    id: "corner",
    category: "burgers",
    name: { ar: "كورنر", en: "Corner" },
    desc: { ar: "قطعة من الدجاج، خس، طماطم، مايونيز.", en: "Chicken fillet, lettuce, tomato, mayonnaise." },
    price: 37000,
  },
  {
    id: "traffic",
    category: "burgers",
    name: { ar: "ترافيك", en: "Traffic" },
    desc: {
      ar: "قطعة من الدجاج، صوص رود٨، تشيدر، خس، طماطم، بصل.",
      en: "Chicken fillet, Road8 sauce, cheddar, lettuce, tomato, onion.",
    },
    price: 48000,
  },
  {
    id: "mushroom-chicken",
    category: "burgers",
    name: { ar: "ماشروم دجاج", en: "Mushroom chicken" },
    desc: {
      ar: "صدر جاج، صوص رود٨، صوص كوكتيل، ماشروم، خس.",
      en: "Chicken breast, Road8 sauce, cocktail sauce, mushroom, lettuce.",
    },
    price: 49000,
  },
  {
    id: "mushroom-beef",
    category: "burgers",
    name: { ar: "ماشروم لحم", en: "Mushroom beef" },
    desc: {
      ar: "قطعة لحم، صوص رود٨، صوص كوكتيل، ماشروم.",
      en: "Beef patty, Road8 sauce, cocktail sauce, mushroom.",
    },
    price: 56000,
    image: "/menu/mushroom-beef.jpg",
    imagePosition: "50% 72%",
  },
  {
    id: "big8-chicken",
    category: "burgers",
    name: { ar: "بيغ ٨ دجاج", en: "Big 8 chicken" },
    desc: {
      ar: "صدر جاج مقلي، صوص رود٨، صوص البيغ ٨، خس، تشيدر.",
      en: "Fried chicken breast, Road8 sauce, Big 8 sauce, lettuce, cheddar.",
    },
    price: 49000,
  },
  {
    id: "big8-meat",
    category: "burgers",
    name: { ar: "بيغ ٨ لحم", en: "Big 8 meat" },
    desc: {
      ar: "قطعة من اللحم، صوص البيغ ٨، مايونيز، خس، جبنة سلايز، بصل.",
      en: "Beef patty, Big 8 sauce, mayonnaise, lettuce, sliced cheese, onion.",
    },
    price: 55000,
  },
  {
    id: "soisy",
    category: "burgers",
    name: { ar: "سوايسي", en: "Soisy" },
    desc: {
      ar: "صدر جاج مقلي، صوص أفوكا، صوص سوايسي، صوص تشيدر، خس.",
      en: "Fried chicken breast, avocado sauce, Soisy sauce, cheddar sauce, lettuce.",
    },
    price: 51000,
    image: "/menu/soisy.jpg",
    imagePosition: "50% 62%",
  },
  {
    id: "original",
    category: "burgers",
    name: { ar: "أوريجينال لحم", en: "Original beef" },
    desc: {
      ar: "قطعة من اللحم، مايونيز، خس، تشيدر، طماطم.",
      en: "Beef patty, mayonnaise, lettuce, cheddar, tomato.",
    },
    price: 45000,
    image: "/menu/original.jpg",
    imagePosition: "50% 72%",
  },

  // Tortilla
  {
    id: "brake",
    category: "tortilla",
    name: { ar: "بريك", en: "Brake" },
    desc: {
      ar: "قطع من الدجاج، خس، تشيدر، صوص رود٨، هاني ماسترد.",
      en: "Chicken pieces, lettuce, cheddar, Road8 sauce, honey mustard.",
    },
    price: 45000,
    image: "/menu/brake.jpg",
    imagePosition: "50% 70%",
  },
  {
    id: "zone",
    category: "tortilla",
    name: { ar: "زون", en: "Zone" },
    desc: {
      ar: "قطع من الدجاج، خس، طماطم، صوص رود٨، تشيدر.",
      en: "Chicken pieces, lettuce, tomato, Road8 sauce, cheddar.",
    },
    price: 42000,
    image: "/menu/zone.jpg",
    featured: true,
  },
  {
    id: "horn",
    category: "tortilla",
    name: { ar: "هورن", en: "Horn" },
    desc: {
      ar: "قطع من الدجاج، أناناس، صوص رود٨، رانش، تشيدر.",
      en: "Chicken pieces, pineapple, Road8 sauce, ranch, cheddar.",
    },
    price: 45000,
  },
  {
    id: "flashing",
    category: "tortilla",
    name: { ar: "فلاشينغ", en: "Flashing" },
    desc: {
      ar: "قطع من الدجاج، خس، طماطم، تشيدر، صوص رود٨.",
      en: "Chicken pieces, lettuce, tomato, cheddar, Road8 sauce.",
    },
    price: 44000,
  },
  {
    id: "curve",
    category: "tortilla",
    name: { ar: "كيرف", en: "Curve" },
    desc: {
      ar: "قطع من الدجاج، خس، تشيدر، صوص الباربكيو، رانش.",
      en: "Chicken pieces, lettuce, cheddar, BBQ sauce, ranch.",
    },
    price: 45000,
    image: u("photo-1626700051175-6818013e1d4f"),
  },
  {
    id: "no-entry",
    category: "tortilla",
    name: { ar: "نو انتري", en: "No Entry" },
    desc: {
      ar: "قطع من الدجاج الحار، صوص هاني ماسترد، خس، تشيدر، صوص رود٨.",
      en: "Spicy chicken pieces, honey mustard, lettuce, cheddar, Road8 sauce.",
    },
    price: 46000,
    tags: ["spicy"],
  },
  {
    id: "one-way",
    category: "tortilla",
    name: { ar: "ون واي", en: "One way" },
    desc: { ar: "قطع من الدجاج، خس، مايونيز، طماطم.", en: "Chicken pieces, lettuce, mayonnaise, tomato." },
    price: 41000,
  },

  // Sandwiches
  {
    id: "fajita",
    category: "sandwiches",
    name: { ar: "فاهيتا", en: "Fajita" },
    desc: {
      ar: "دجاج مشوي، بصل، فطر، ذرة، موزريلا، صوص أفوكادو، فلفل روماني.",
      en: "Grilled chicken, onion, mushroom, corn, mozzarella, avocado sauce, red pepper.",
    },
    price: 51000,
    image: u("photo-1528735602780-2552fd46c7af"),
  },
  {
    id: "francesco",
    category: "sandwiches",
    name: { ar: "فرانشيسكو", en: "Francesco" },
    desc: {
      ar: "قطع دجاج مشوي، فطر، ذرة، مايونيز، خس.",
      en: "Grilled chicken pieces, mushroom, corn, mayonnaise, lettuce.",
    },
    price: 49000,
    image: u("photo-1509722747041-616f39b57569"),
  },
  {
    id: "mexican",
    category: "sandwiches",
    name: { ar: "مكسيكي", en: "Mexican" },
    desc: {
      ar: "دجاج مشوي حار، بصل، فليفلة، مايونيز.",
      en: "Spicy grilled chicken, onion, peppers, mayonnaise.",
    },
    price: 50000,
    image: u("photo-1529006557810-274b9b2fc783"),
    tags: ["spicy"],
  },
  {
    id: "crispy-sandwich",
    category: "sandwiches",
    name: { ar: "كريسبي", en: "Crispy" },
    desc: {
      ar: "قطع من الدجاج، خس، صوص رود٨، تشيدر.",
      en: "Chicken pieces, lettuce, Road8 sauce, cheddar.",
    },
    price: 46000,
  },

  // Meals
  {
    id: "crispy-3",
    category: "meals",
    name: { ar: "٣ قطع كريسبي", en: "3 Crispy pieces" },
    desc: { ar: "صوص اختياري، بطاطا.", en: "Sauce of your choice, fries." },
    price: 40000,
    image: u("photo-1562967914-608f82629710"),
  },
  {
    id: "crispy-5",
    category: "meals",
    name: { ar: "٥ قطع كريسبي", en: "5 Crispy pieces" },
    desc: { ar: "صوص اختياري، بطاطا، كول سلو، خبز.", en: "Sauce of your choice, fries, coleslaw, bread." },
    price: 66000,
    image: "/menu/crispy-5.jpg",
    imagePosition: "50% 70%",
  },
  {
    id: "strips",
    category: "meals",
    name: { ar: "كرسبي ستربس", en: "Crispy strips" },
    desc: {
      ar: "٣ قطع كريسبي، صوص اختياري (باربكيو، هني مستر، بفلو)، بطاطا.",
      en: "3 crispy strips, sauce of your choice (BBQ, honey mustard, buffalo), fries.",
    },
    price: 45000,
    image: "/menu/strips.jpg",
    imagePosition: "50% 75%",
  },

  // Fries
  {
    id: "cheese-fries",
    category: "fries",
    name: { ar: "تشيز فرايز", en: "Cheese fries" },
    desc: { ar: "بطاطا مقلية، جبنة تشيدر.", en: "Fries, cheddar cheese." },
    price: 32000,
    image: u("photo-1598679253544-2c97992403ea"),
  },
  {
    id: "loaded-fries",
    category: "fries",
    name: { ar: "لودد فرايز", en: "Loaded fries" },
    desc: {
      ar: "بطاطا مقلية، جبنة تشيدر، هالبينو، صوص رود٨، صوص هاني ماسترد، صوص باربكيو.",
      en: "Fries, cheddar, jalapeño, Road8 sauce, honey mustard, BBQ sauce.",
    },
    price: 35000,
    image: u("photo-1573080496219-bb080dd4f877"),
  },
  {
    id: "chicken-loaded-fries",
    category: "fries",
    name: { ar: "تشكن لودد فرايز", en: "Chicken loaded fries" },
    desc: {
      ar: "بطاطا مقلية، دجاج مقرمش، جبنة تشيدر، هالبينو، صوص رود٨، صوص هاني ماسترد، صوص باربكيو.",
      en: "Fries, crispy chicken, cheddar, jalapeño, Road8 sauce, honey mustard, BBQ sauce.",
    },
    price: 48000,
    image: "/menu/chicken-loaded-fries.jpg",
    imagePosition: "50% 62%",
    tags: ["spicy"],
  },

  // Salads
  {
    id: "caesar-salad",
    category: "salads",
    name: { ar: "سلطة السيزر", en: "Caesar salad" },
    desc: { ar: "سلطة السيزر مع الدجاج.", en: "Caesar salad with chicken." },
    price: 38000,
    image: u("photo-1546793665-c74683f339c1"),
  },
  {
    id: "road8-caesar",
    category: "salads",
    name: { ar: "سيزر رود ٨", en: "Caesar Road8" },
    desc: { ar: "سيزر على طريقة رود ٨ مع الأناناس.", en: "Road 8's Caesar, with pineapple." },
    price: 42000,
    image: "/menu/road8-caesar.jpg",
    imagePosition: "50% 55%",
  },
  {
    id: "caesar-no-chicken",
    category: "salads",
    name: { ar: "سيزر بدون دجاج", en: "Caesar, no chicken" },
    desc: { ar: "سلطة السيزر بدون دجاج.", en: "Caesar salad without chicken." },
    price: 26000,
    image: u("photo-1550304943-4f24f54ddde9"),
  },
  {
    id: "coleslaw",
    category: "salads",
    name: { ar: "كول سلو", en: "Coleslaw" },
    desc: { ar: "سلطة الملفوف الكريمية.", en: "Creamy coleslaw." },
    price: 7000,
  },

  // Appetizers
  {
    id: "mozzarella-sticks",
    category: "appetizers",
    name: { ar: "أصابع الموزريلا", en: "Mozzarella sticks" },
    desc: { ar: "أصابع موزريلا مقرمشة.", en: "Crispy mozzarella sticks." },
    price: 35000,
    image: u("photo-1531749668029-2db88e4276c7"),
  },
  {
    id: "onion-rings",
    category: "appetizers",
    name: { ar: "حلقات البصل", en: "Onion rings" },
    desc: { ar: "حلقات بصل مقرمشة.", en: "Crispy onion rings." },
    price: 25000,
    image: u("photo-1639024471283-03518883512d"),
  },
  {
    id: "fries-large",
    category: "appetizers",
    name: { ar: "صحن بطاطا كبير", en: "French fries (large)" },
    desc: { ar: "بطاطا مقلية ذهبية.", en: "Golden french fries." },
    price: 29000,
    image: u("photo-1518013431117-eb1465fa5752"),
  },
  {
    id: "fries-small",
    category: "appetizers",
    name: { ar: "صحن بطاطا صغير", en: "French fries (small)" },
    desc: { ar: "بطاطا مقلية ذهبية.", en: "Golden french fries." },
    price: 17000,
    image: u("photo-1630431341973-02e1b662ec35"),
  },
  {
    id: "jalapeno-balls",
    category: "appetizers",
    name: { ar: "كرات هالبينو", en: "Jalapeño balls" },
    desc: { ar: "كرات مقرمشة بالهالبينو والجبنة.", en: "Crispy jalapeño and cheese bites." },
    price: 36000,
    tags: ["spicy"],
  },
  {
    id: "nuggets",
    category: "appetizers",
    name: { ar: "ناغيت", en: "Nuggets" },
    desc: { ar: "قطع ناغيت دجاج مقرمشة.", en: "Crispy chicken nuggets." },
    price: 38000,
    image: u("photo-1619881590738-a111d176d906"),
  },
  {
    id: "potato-wedges",
    category: "appetizers",
    name: { ar: "بطاطا ويدجز", en: "Potato wedges" },
    desc: { ar: "أصابع بطاطا متبّلة.", en: "Seasoned potato wedges." },
    price: 28000,
    image: u("photo-1625938145744-e380515399bf"),
  },

  // Add-ons & sauces
  {
    id: "combo",
    category: "extras",
    name: { ar: "حوّلها وجبة كومبو", en: "Make it a combo" },
    desc: {
      ar: "مع أي برغر أو ساندويش: بطاطا، بيبسي، صوص.",
      en: "With any burger or sandwich: fries, Pepsi, sauce.",
    },
    price: 25000,
  },
  {
    id: "double-chicken",
    category: "extras",
    name: { ar: "دبل جاج", en: "Double chicken" },
    desc: { ar: "قطعة دجاج إضافية.", en: "Extra chicken." },
    price: 20000,
  },
  {
    id: "double-beef",
    category: "extras",
    name: { ar: "دبل لحمة", en: "Double beef" },
    desc: { ar: "قطعة لحم إضافية.", en: "Extra beef patty." },
    price: 23000,
  },
  { id: "sauce-cocktail", category: "extras", name: { ar: "صوص كوكتيل", en: "Cocktail sauce" }, desc: { ar: "", en: "" }, price: 5000 },
  { id: "sauce-ranch", category: "extras", name: { ar: "صوص رانش", en: "Ranch" }, desc: { ar: "", en: "" }, price: 5000 },
  { id: "sauce-mayo", category: "extras", name: { ar: "مايونيز", en: "Mayonnaise" }, desc: { ar: "", en: "" }, price: 5000 },
  { id: "sauce-cheddar", category: "extras", name: { ar: "صوص تشيدر", en: "Cheddar sauce" }, desc: { ar: "", en: "" }, price: 6000 },
  { id: "sauce-jalapeno", category: "extras", name: { ar: "هالبينو", en: "Jalapeño" }, desc: { ar: "", en: "" }, price: 6000 },
  { id: "sauce-honey-mustard", category: "extras", name: { ar: "هاني ماسترد", en: "Honey mustard" }, desc: { ar: "", en: "" }, price: 5000 },
  { id: "sauce-bbq", category: "extras", name: { ar: "باربكيو", en: "BBQ sauce" }, desc: { ar: "", en: "" }, price: 5000 },
  { id: "burger-bun", category: "extras", name: { ar: "خبزة برغر", en: "Burger bun" }, desc: { ar: "", en: "" }, price: 7000 },
];

export const menuById = Object.fromEntries(menu.map((item) => [item.id, item]));

// Photos for the home page gallery (one large + four small).
export const galleryImages = [
  "/menu/gallery-rafiq.jpg",
  "/menu/double-chicken.jpg",
  "/menu/gallery-gloves.jpg",
  "/menu/gallery-sauce.jpg",
  "/menu/gallery-cheese.jpg",
];

export const heroImage = "/menu/bumb.jpg";
