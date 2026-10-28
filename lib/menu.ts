import type { Localized } from "./i18n";

// Placeholder menu — edit names, descriptions, prices (SYP) and photos to match the real menu.
// Photos: put your own in /public/menu and set `image: "/menu/your-file.jpg"`.

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
  price: number;
  image: string;
  tags?: Tag[];
  featured?: boolean;
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const categories: Category[] = [
  { id: "burgers", name: { ar: "برغر لحم", en: "Beef burgers" }, emoji: "🍔" },
  { id: "chicken", name: { ar: "دجاج", en: "Chicken" }, emoji: "🍗" },
  { id: "meals", name: { ar: "وجبات", en: "Meals" }, emoji: "🍱" },
  { id: "sides", name: { ar: "جانبيات", en: "Sides" }, emoji: "🍟" },
  { id: "drinks", name: { ar: "مشروبات", en: "Drinks" }, emoji: "🥤" },
  { id: "desserts", name: { ar: "حلويات", en: "Desserts" }, emoji: "🍩" },
];

export const menu: MenuItem[] = [
  {
    id: "road8-classic",
    category: "burgers",
    name: { ar: "رود 8 كلاسيك", en: "Road 8 Classic" },
    desc: {
      ar: "قطعة لحم طازجة، جبنة شيدر، خس، بندورة، مخلل وصوص رود 8 السري.",
      en: "Fresh beef patty, cheddar, lettuce, tomato, pickles and the secret Road 8 sauce.",
    },
    price: 65000,
    image: u("photo-1568901346375-23c9450c58cd"),
    tags: ["bestseller"],
    featured: true,
  },
  {
    id: "double-highway",
    category: "burgers",
    name: { ar: "دبل هاي واي", en: "Double Highway" },
    desc: {
      ar: "قطعتين لحم، دبل شيدر، بصل مكرمل وصوص باربيكيو مدخّن.",
      en: "Two beef patties, double cheddar, caramelized onions and smoky BBQ sauce.",
    },
    price: 95000,
    image: u("photo-1553979459-d2229ba7433b"),
    tags: ["bestseller"],
    featured: true,
  },
  {
    id: "smash-exit",
    category: "burgers",
    name: { ar: "سماش إكزت", en: "Smash Exit" },
    desc: {
      ar: "لحم مسحوق على الصاج بأطراف مقرمشة، جبنة أمريكية ومخلل.",
      en: "Griddle-smashed beef with crispy edges, American cheese and pickles.",
    },
    price: 70000,
    image: u("photo-1586190848861-99aa4a171e90"),
    tags: ["new"],
    featured: true,
  },
  {
    id: "fire-lane",
    category: "burgers",
    name: { ar: "فاير لاين", en: "Fire Lane" },
    desc: {
      ar: "لحم، جبنة بيبر جاك، هالابينو، وصوص حار بيولّع الطريق.",
      en: "Beef, pepper jack, jalapeños and a hot sauce that lights up the road.",
    },
    price: 75000,
    image: u("photo-1571091718767-18b5b1457add"),
    tags: ["spicy"],
    featured: true,
  },
  {
    id: "mushroom-swiss",
    category: "burgers",
    name: { ar: "مشروم سويس", en: "Mushroom Swiss" },
    desc: {
      ar: "لحم، فطر سوتيه، جبنة سويسرية وصوص ثوم كريمي.",
      en: "Beef, sautéed mushrooms, Swiss cheese and creamy garlic sauce.",
    },
    price: 80000,
    image: u("photo-1550547660-d9450f859349"),
  },
  {
    id: "crispy-chicken",
    category: "chicken",
    name: { ar: "كرسبي تشيكن", en: "Crispy Chicken" },
    desc: {
      ar: "صدر دجاج مقرمش، كولسلو، مخلل ومايونيز بالعسل والخردل.",
      en: "Crispy chicken breast, coleslaw, pickles and honey-mustard mayo.",
    },
    price: 60000,
    image: u("photo-1606755962773-d324e0a13086"),
    tags: ["bestseller"],
  },
  {
    id: "spicy-chicken",
    category: "chicken",
    name: { ar: "سبايسي تشيكن", en: "Spicy Chicken" },
    desc: {
      ar: "دجاج مقرمش متبّل حار، خس وصوص شيبوتلي.",
      en: "Spicy-marinated crispy chicken, lettuce and chipotle sauce.",
    },
    price: 62000,
    image: u("photo-1615297928064-24977384d0da"),
    tags: ["spicy"],
  },
  {
    id: "classic-meal",
    category: "meals",
    name: { ar: "وجبة كلاسيك", en: "Classic Meal" },
    desc: {
      ar: "رود 8 كلاسيك + بطاطا وسط + مشروب غازي.",
      en: "Road 8 Classic + medium fries + soft drink.",
    },
    price: 85000,
    image: u("photo-1561758033-d89a9ad46330"),
    tags: ["bestseller"],
  },
  {
    id: "double-meal",
    category: "meals",
    name: { ar: "وجبة دبل", en: "Double Meal" },
    desc: {
      ar: "دبل هاي واي + بطاطا كبيرة + مشروب غازي.",
      en: "Double Highway + large fries + soft drink.",
    },
    price: 120000,
    image: u("photo-1594212699903-ec8a3eca50f5"),
  },
  {
    id: "family-box",
    category: "meals",
    name: { ar: "بوكس العيلة", en: "Family Box" },
    desc: {
      ar: "4 برغر من اختيارك + 2 بطاطا كبيرة + 4 مشروبات.",
      en: "4 burgers of your choice + 2 large fries + 4 drinks.",
    },
    price: 340000,
    image: u("photo-1610440042657-612c34d95e9f"),
    tags: ["new"],
  },
  {
    id: "fries",
    category: "sides",
    name: { ar: "بطاطا مقرمشة", en: "Crispy Fries" },
    desc: { ar: "بطاطا ذهبية مقرمشة مع ملح البحر.", en: "Golden crispy fries with sea salt." },
    price: 20000,
    image: u("photo-1573080496219-bb080dd4f877"),
  },
  {
    id: "loaded-fries",
    category: "sides",
    name: { ar: "بطاطا محمّلة", en: "Loaded Fries" },
    desc: {
      ar: "بطاطا مع صوص الجبنة، لحم مفروم وهالابينو.",
      en: "Fries topped with cheese sauce, minced beef and jalapeños.",
    },
    price: 35000,
    image: u("photo-1585109649139-366815a0d713"),
    tags: ["spicy"],
  },
  {
    id: "onion-rings",
    category: "sides",
    name: { ar: "حلقات بصل", en: "Onion Rings" },
    desc: { ar: "حلقات بصل مقرمشة مع صوص الرانش.", en: "Crispy onion rings with ranch dip." },
    price: 22000,
    image: u("photo-1639024471283-03518883512d"),
  },
  {
    id: "soft-drink",
    category: "drinks",
    name: { ar: "مشروب غازي", en: "Soft drink" },
    desc: { ar: "كولا، سفن أب أو برتقال.", en: "Cola, lemon-lime or orange." },
    price: 8000,
    image: u("photo-1622483767028-3f66f32aef97"),
  },
  {
    id: "lemon-mint",
    category: "drinks",
    name: { ar: "ليمون ونعنع", en: "Lemon & Mint" },
    desc: { ar: "ليموناضة طازجة بالنعنع.", en: "Fresh lemonade blended with mint." },
    price: 15000,
    image: u("photo-1437418747212-8d9709afab22"),
  },
  {
    id: "milkshake",
    category: "drinks",
    name: { ar: "ميلك شيك", en: "Milkshake" },
    desc: { ar: "فانيلا، شوكولا أو فريز.", en: "Vanilla, chocolate or strawberry." },
    price: 25000,
    image: u("photo-1572490122747-3968b75cc699"),
  },
  {
    id: "brownie",
    category: "desserts",
    name: { ar: "براوني", en: "Brownie" },
    desc: { ar: "براوني شوكولا دافئ.", en: "Warm chocolate brownie." },
    price: 20000,
    image: u("photo-1606313564200-e75d5e30476c"),
  },
];

export const menuById = Object.fromEntries(menu.map((item) => [item.id, item]));

// Extra photos for the home page gallery (5 fill the grid: one large + four small).
export const galleryImages = [
  u("photo-1572802419224-296b0aeee0d9"),
  u("photo-1565299507177-b0ac66763828"),
  u("photo-1551782450-17144efb9c50"),
  u("photo-1603064752734-4c48eff53d05"),
  u("photo-1596662951482-0c4ba74a6df6"),
];

export const heroImage = u("photo-1568901346375-23c9450c58cd");
