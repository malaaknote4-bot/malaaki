// Restaurant details — replace the placeholder values with the real ones.
export const site = {
  name: "Road 8",
  // International format, digits only (no +, spaces or leading zeros). Used for wa.me links.
  whatsapp: "963900000000",
  phone: "+963 900 000 000",
  address: {
    ar: "دمشق، سوريا — طريق 8",
    en: "Damascus, Syria — Road 8",
  },
  hours: {
    ar: "يومياً من 12 ظهراً حتى 2 بعد منتصف الليل",
    en: "Every day, 12 PM – 2 AM",
  },
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  mapsUrl: "https://maps.google.com/?q=Damascus,Syria",
  mapsEmbed: "https://www.google.com/maps?q=Damascus,Syria&output=embed",
  currency: { ar: "ل.س", en: "SYP" },
  deliveryFee: 0,
} as const;
