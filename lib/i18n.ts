export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export type Localized = Record<Locale, string>;

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (lang: Locale) => (lang === "ar" ? "rtl" : "ltr");

const ar = {
  meta: {
    title: "رود 8 | برغر على الطريق الصحيح",
    description: "رود 8 — برغر لحم طازج، وجبات، بطاطا مقرمشة ومشروبات. اطلب الآن عبر واتساب.",
  },
  nav: { home: "الرئيسية", menu: "المنيو", visit: "زورونا", order: "اطلب الآن", switchLang: "EN" },
  hero: {
    kicker: "أطيب برغر على الطريق",
    title1: "خذ المخرج",
    title2: "نحو البرغر.",
    subtitle: "لحم طازج يُفرم كل يوم، خبز بريوش محمّص، وصوصات سرّية من مطبخ رود 8.",
    ctaOrder: "اطلب الآن",
    ctaMenu: "شوف المنيو",
    stickers: ["لحم 100%", "طازج يومياً", "سريع ولذيذ"],
  },
  featured: {
    kicker: "الأكثر طلباً",
    title: "برغرات رود 8 المميزة",
    subtitle: "كل برغر بيحكي قصة… اختار قصتك.",
    seeAll: "كل المنيو",
  },
  combos: {
    kicker: "وجبات كاملة",
    title: "وجبة؟ أكيد وجبة!",
    subtitle: "برغر + بطاطا + مشروب بسعر أوفر.",
  },
  why: {
    title: "ليش رود 8؟",
    items: [
      { title: "لحم طازج", text: "لحم بلدي يُفرم يومياً ويُشوى على الطلب." },
      { title: "سرعة الطريق", text: "طلبك جاهز بسرعة، سفري أو توصيل لباب البيت." },
      { title: "صوصات سرّية", text: "وصفات خاصة ما رح تلاقيها بأي مكان تاني." },
    ],
  },
  gallery: { kicker: "#رود_8", title: "شهية مفتوحة على الطريق" },
  visit: {
    kicker: "زورونا",
    title: "محطتك الجاية: رود 8",
    address: "العنوان",
    hours: "أوقات الدوام",
    phone: "الهاتف",
    directions: "الاتجاهات على الخريطة",
    whatsapp: "راسلنا على واتساب",
  },
  menu: {
    title: "المنيو",
    subtitle: "اختار، زيد عالسلة، وابعت طلبك على واتساب بكبسة زر.",
    add: "أضف",
    added: "تمت الإضافة",
  },
  tags: { bestseller: "الأكثر مبيعاً", new: "جديد", spicy: "حار" },
  cart: {
    title: "سلّتك",
    empty: "السلة فاضية… جوعان؟",
    browse: "تصفّح المنيو",
    subtotal: "المجموع",
    delivery: "التوصيل",
    free: "مجاني",
    total: "الإجمالي",
    details: "معلومات الطلب",
    name: "الاسم",
    phone: "رقم الهاتف",
    type: "طريقة الاستلام",
    deliveryOpt: "توصيل",
    pickupOpt: "استلام من المطعم",
    address: "العنوان بالتفصيل",
    notes: "ملاحظات (اختياري)",
    notesPh: "مثلاً: بدون بصل، صوص زيادة…",
    send: "أرسل الطلب عبر واتساب",
    required: "يرجى تعبئة الحقول المطلوبة",
    open: "فتح السلة",
    close: "إغلاق",
    remove: "حذف",
    clear: "إفراغ السلة",
  },
  order: {
    greeting: "مرحباً رود 8! بدي اطلب:",
    total: "الإجمالي",
    name: "الاسم",
    phone: "الهاتف",
    type: "الاستلام",
    address: "العنوان",
    notes: "ملاحظات",
  },
  footer: {
    tagline: "برغر على الطريق الصحيح.",
    rights: "جميع الحقوق محفوظة.",
    follow: "تابعونا",
  },
};

export type Dictionary = typeof ar;

const en: Dictionary = {
  meta: {
    title: "Road 8 | Burgers on the right track",
    description: "Road 8 — fresh beef burgers, meals, crispy fries and drinks in Syria. Order now on WhatsApp.",
  },
  nav: { home: "Home", menu: "Menu", visit: "Visit us", order: "Order now", switchLang: "عربي" },
  hero: {
    kicker: "The tastiest stop on the road",
    title1: "Take the exit",
    title2: "to burgers.",
    subtitle: "Fresh beef ground daily, toasted brioche buns and secret sauces straight from the Road 8 kitchen.",
    ctaOrder: "Order now",
    ctaMenu: "See the menu",
    stickers: ["100% beef", "Fresh daily", "Fast & tasty"],
  },
  featured: {
    kicker: "Most ordered",
    title: "Road 8 signature burgers",
    subtitle: "Every burger tells a story. Pick yours.",
    seeAll: "Full menu",
  },
  combos: {
    kicker: "Full meals",
    title: "Make it a meal!",
    subtitle: "Burger + fries + drink for a better price.",
  },
  why: {
    title: "Why Road 8?",
    items: [
      { title: "Fresh beef", text: "Local beef ground every day and grilled to order." },
      { title: "Road speed", text: "Your order is ready fast: take-away or delivered to your door." },
      { title: "Secret sauces", text: "House recipes you won't find anywhere else." },
    ],
  },
  gallery: { kicker: "#Road8", title: "Appetite on the road" },
  visit: {
    kicker: "Visit us",
    title: "Your next stop: Road 8",
    address: "Address",
    hours: "Opening hours",
    phone: "Phone",
    directions: "Get directions",
    whatsapp: "Message us on WhatsApp",
  },
  menu: {
    title: "Menu",
    subtitle: "Pick, add to cart, and send your order on WhatsApp in one tap.",
    add: "Add",
    added: "Added",
  },
  tags: { bestseller: "Bestseller", new: "New", spicy: "Spicy" },
  cart: {
    title: "Your cart",
    empty: "Your cart is empty… hungry?",
    browse: "Browse the menu",
    subtotal: "Subtotal",
    delivery: "Delivery",
    free: "Free",
    total: "Total",
    details: "Order details",
    name: "Name",
    phone: "Phone number",
    type: "Order type",
    deliveryOpt: "Delivery",
    pickupOpt: "Pickup",
    address: "Full address",
    notes: "Notes (optional)",
    notesPh: "e.g. no onions, extra sauce…",
    send: "Send order on WhatsApp",
    required: "Please fill in the required fields",
    open: "Open cart",
    close: "Close",
    remove: "Remove",
    clear: "Clear cart",
  },
  order: {
    greeting: "Hi Road 8! I'd like to order:",
    total: "Total",
    name: "Name",
    phone: "Phone",
    type: "Order type",
    address: "Address",
    notes: "Notes",
  },
  footer: {
    tagline: "Burgers on the right track.",
    rights: "All rights reserved.",
    follow: "Follow us",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function formatPrice(value: number, lang: Locale, currency: Localized) {
  const n = new Intl.NumberFormat(lang === "ar" ? "ar-SY" : "en-US").format(value);
  return `${n} ${currency[lang]}`;
}
