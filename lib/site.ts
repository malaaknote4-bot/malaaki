// Restaurant details.
export const site = {
  name: "Road 8",
  // International format, digits only. Used for wa.me order links.
  whatsapp: "963958554589",
  phones: [
    { display: "0958 554 589", tel: "+963958554589" },
    { display: "011 724 8578", tel: "+963117248578" },
  ],
  address: {
    ar: "النبك، ريف دمشق، سوريا",
    en: "Al-Nabek, Rif Dimashq, Syria",
  },
  // Add opening hours here, e.g. { ar: "يومياً من 12 ظهراً حتى 2 بعد منتصف الليل", en: "Every day, 12 PM – 2 AM" }.
  hours: null as { ar: string; en: string } | null,
  instagram: "https://www.instagram.com/road8_",
  mapsUrl: "https://maps.google.com/?q=Al-Nabek,+Syria",
  mapsEmbed: "https://www.google.com/maps?q=Al-Nabek,+Syria&output=embed",
  currency: { ar: "ل.س", en: "SYP" },
} as const;
