// All site copy and listing details live here so they can be edited in one place.
// Values marked "UPDATE" should be checked against the live Airbnb listing.

export const site = {
  name: "The Cliff",
  tagline: "A quiet clifftop retreat on Australia's southern coast",
  // UPDATE: paste the official Airbnb listing URL, or set NEXT_PUBLIC_AIRBNB_URL.
  airbnbUrl:
    process.env.NEXT_PUBLIC_AIRBNB_URL ?? "https://www.airbnb.com.au/rooms/your-listing-id",
  region: "Southern coastline, Australia",
  maxGuests: 6, // UPDATE
};

export const highlights = [
  { label: "Guests", value: "Up to 6" }, // UPDATE
  { label: "Bedrooms", value: "3" }, // UPDATE
  { label: "Bathrooms", value: "2" }, // UPDATE
  { label: "Views", value: "Ocean, all day" },
];

export const spaces = [
  {
    title: "The living room",
    text: "Floor-to-ceiling glass faces the Southern Ocean. Linen sofas, a wood fire and a long view of the horizon.",
    image: "/images/midday.svg",
  },
  {
    title: "The bedrooms",
    text: "Soft linen, blackout blinds and the sound of the waves. Every room is set up for a deep, unhurried sleep.",
    image: "/images/dawn.svg",
  },
  {
    title: "The deck",
    text: "A wide timber deck right on the cliff edge, for slow breakfasts, long lunches and watching the sun go down.",
    image: "/images/dusk.svg",
  },
];

export const amenities = [
  { title: "Uninterrupted ocean views", text: "From the living room, bedrooms and deck." },
  { title: "Wood fireplace", text: "Firewood is ready for cool coastal evenings." },
  { title: "Chef's kitchen", text: "Fully equipped, with good knives and local pantry staples." },
  { title: "Outdoor bath", text: "Hot water under open sky, sheltered from the wind." },
  { title: "Fast Wi-Fi", text: "For when you need it. Easy to ignore when you don't." },
  { title: "Free parking", text: "Private off-street parking for two cars." },
  { title: "Self check-in", text: "Arrive at your own pace with a keyless entry." },
  { title: "Linen & towels", text: "Hotel-quality bedding, bath and beach towels provided." },
];

export const experiences = [
  { title: "Coastal walks", text: "Clifftop trails start a short stroll from the front door." },
  { title: "Hidden beaches", text: "Quiet coves and rock pools along the shoreline nearby." },
  { title: "Whale watching", text: "Look out for whales passing along the coast in the cooler months." },
  { title: "Local produce", text: "Wineries, farm gates and seafood within an easy drive." },
];

export const gallery = [
  { src: "/images/hero.svg", alt: "The Cliff above the ocean" },
  { src: "/images/mist.svg", alt: "Morning mist over the coastline" },
  { src: "/images/midday.svg", alt: "The coastline in afternoon light" },
  { src: "/images/dusk.svg", alt: "Sunset from the deck" },
  { src: "/images/night.svg", alt: "Moonlight over the sea" },
  { src: "/images/dawn.svg", alt: "Sunrise over the headland" },
];

export const bookingSteps = [
  { title: "Choose your dates", text: "Pick your check-in, check-out and number of guests." },
  { title: "Continue to Airbnb", text: "We open the official listing with your details filled in." },
  { title: "Confirm & relax", text: "Book securely through Airbnb. We'll take it from there." },
];

export const faqs = [
  {
    q: "How do I book The Cliff?",
    a: "All bookings are made through our official Airbnb listing. Choose your dates on this page and select \"Check availability\" to continue to Airbnb with your dates and guests filled in.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 3pm and check-out is by 10am. Times are confirmed on the Airbnb listing.", // UPDATE
  },
  {
    q: "Is The Cliff suitable for children?",
    a: "Yes, with care. The property sits on a clifftop, so young children should be supervised outdoors at all times.",
  },
  {
    q: "Are pets allowed?",
    a: "Please check the house rules on the Airbnb listing before booking.", // UPDATE
  },
  {
    q: "What is the cancellation policy?",
    a: "The cancellation policy is shown on the Airbnb listing and applies to every booking.",
  },
];
