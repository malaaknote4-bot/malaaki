export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export type Localized = Record<Locale, string>;

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (lang: Locale) => (lang === "ar" ? "rtl" : "ltr");

const ar = {
  meta: {
    title: "رود 8 | خليك جاهز... الطعم رحلة",
    description: "رود 8 في النبك — برجر لحم ودجاج، تورتيلا، ساندويش، وجبات كريسبي وفرايز. اطلب الآن عبر واتساب.",
  },
  nav: { home: "الرئيسية", menu: "المنيو", visit: "زورونا", order: "اطلب الآن", switchLang: "EN" },
  hero: {
    kicker: "خليك جاهز... الطعم رحلة",
    title1: "خذ المخرج",
    title2: "نحو البرغر.",
    subtitle: "برجر لحم طازج ودجاج مقرمش، تورتيلا وساندويش، وكل شي مع صوص رود8 الخاص.",
    ctaOrder: "اطلب الآن",
    ctaMenu: "شوف المنيو",
    stickers: ["لحم طازج", "دجاج مقرمش", "صوص رود8"],
  },
  featured: {
    kicker: "الأكثر طلباً",
    title: "الأكثر طلباً على الطريق",
    subtitle: "كل طلب إلو اسم من الطريق… اختار طريقك.",
    seeAll: "كل المنيو",
  },
  combos: {
    kicker: "الوجبات",
    title: "جوعان كتير؟",
    subtitle: "وجبات الكريسبي مع البطاطا والصوص اللي بتحبه.",
  },
  why: {
    title: "ليش رود 8؟",
    items: [
      { title: "لحم ودجاج طازج", text: "برجر لحم طازج ودجاج مقرمش يُحضّر على الطلب." },
      { title: "سرعة الطريق", text: "اطلب توصيل أو استلم طلبك من المطعم بالنبك." },
      { title: "صوص رود8", text: "صوصنا الخاص… ما رح تلاقيه بأي مكان تاني." },
    ],
  },
  gallery: { kicker: "@road8_", title: "من مطبخ رود 8" },
  visit: {
    kicker: "زورونا",
    title: "محطتك الجاية: رود 8",
    address: "العنوان",
    hours: "أوقات الدوام",
    phone: "طلبات التوصيل",
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
    priceNote: "رح نأكدلك السعر والتوصيل على واتساب.",
    details: "معلومات الطلب",
    name: "الاسم",
    phone: "رقم الهاتف",
    type: "طريقة الاستلام",
    deliveryOpt: "توصيل",
    pickupOpt: "استلام من المطعم",
    address: "العنوان بالتفصيل",
    notes: "ملاحظات (اختياري)",
    notesPh: "مثلاً: بدون بصل، صوص رانش زيادة…",
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
    tagline: "خليك جاهز... الطعم رحلة",
    rights: "جميع الحقوق محفوظة.",
    follow: "تابعونا",
  },
};

export type Dictionary = typeof ar;

const en: Dictionary = {
  meta: {
    title: "Road 8 | Get ready… the taste is a journey",
    description: "Road 8 in Al-Nabek — beef and chicken burgers, tortillas, sandwiches, crispy meals and fries. Order now on WhatsApp.",
  },
  nav: { home: "Home", menu: "Menu", visit: "Visit us", order: "Order now", switchLang: "عربي" },
  hero: {
    kicker: "Get ready… the taste is a journey",
    title1: "Take the exit",
    title2: "to burgers.",
    subtitle: "Fresh beef and crispy chicken burgers, tortillas and sandwiches, all with our own Road8 sauce.",
    ctaOrder: "Order now",
    ctaMenu: "See the menu",
    stickers: ["Fresh beef", "Crispy chicken", "Road8 sauce"],
  },
  featured: {
    kicker: "Most ordered",
    title: "Most ordered on the road",
    subtitle: "Every order is named after the road. Pick your route.",
    seeAll: "Full menu",
  },
  combos: {
    kicker: "Meals",
    title: "Really hungry?",
    subtitle: "Crispy chicken meals with fries and the sauce you love.",
  },
  why: {
    title: "Why Road 8?",
    items: [
      { title: "Fresh beef & chicken", text: "Fresh beef burgers and crispy chicken, made to order." },
      { title: "Road speed", text: "Get it delivered, or pick it up at our place in Al-Nabek." },
      { title: "Road8 sauce", text: "Our own sauce. You won't find it anywhere else." },
    ],
  },
  gallery: { kicker: "@road8_", title: "From the Road 8 kitchen" },
  visit: {
    kicker: "Visit us",
    title: "Your next stop: Road 8",
    address: "Address",
    hours: "Opening hours",
    phone: "Delivery orders",
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
    priceNote: "We'll confirm the price and delivery with you on WhatsApp.",
    details: "Order details",
    name: "Name",
    phone: "Phone number",
    type: "Order type",
    deliveryOpt: "Delivery",
    pickupOpt: "Pickup",
    address: "Full address",
    notes: "Notes (optional)",
    notesPh: "e.g. no onions, extra ranch…",
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
    tagline: "Get ready… the taste is a journey.",
    rights: "All rights reserved.",
    follow: "Follow us",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { ar, en };

// Menu prices are stored in old Syrian pounds (ل.ق); the new pound (ل.ج) drops two zeros.
const currencyLabel = {
  new: { ar: "ل.ج", en: "SYP" },
  old: { ar: "ل.ق", en: "old SYP" },
} as const;

const number = (n: number) => new Intl.NumberFormat("en-US").format(n);

export const formatNewPrice = (old: number, lang: Locale) => `${number(old / 100)} ${currencyLabel.new[lang]}`;
export const formatOldPrice = (old: number, lang: Locale) => `${number(old)} ${currencyLabel.old[lang]}`;

// Both currencies, for the WhatsApp order message.
export const formatPrice = (old: number, lang: Locale) => `${formatNewPrice(old, lang)} (${formatOldPrice(old, lang)})`;
