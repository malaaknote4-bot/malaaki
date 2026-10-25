// All site copy and listing details live here so they can be edited in one place.
// Values marked "UPDATE" should be checked against the live Airbnb listing.

export const site = {
  name: "The Cliff",
  listingTitle: "Cliff House with amazing views",
  tagline: "A quiet clifftop home above the rainforest valleys of Springbrook",
  airbnbUrl: process.env.NEXT_PUBLIC_AIRBNB_URL ?? "https://www.airbnb.com/rooms/1284538567149227744",
  region: "Springbrook · Gold Coast Hinterland, Australia",
  maxGuests: 6,
};

// UPDATE: rating and review count change over time.
export const rating = { score: "4.92", reviews: 50, badge: "Guest favourite" };

export const highlights = [
  { label: "Guests", value: "Up to 6" },
  { label: "Bedrooms", value: "3" },
  { label: "Beds", value: "3" },
  { label: "Bathrooms", value: "2" },
];

export const spaces = [
  {
    title: "The house",
    text: "A private, single-level home set among tall trees, with the whole property to yourselves.",
    image: "/images/house.jpg",
    alt: "The Cliff house surrounded by rainforest trees",
  },
  {
    title: "The deck",
    text: "Timber decking right at the edge of the escarpment. Watch the weather roll across the valley, rainbows included.",
    image: "/images/deck-rainbow.jpg",
    alt: "Rainbow over the valley seen from the deck",
  },
  {
    title: "Outdoor dining",
    text: "A table for two on the deck, a wide green lawn beyond it, and nothing but forest in every direction.",
    image: "/images/outdoor-dining.jpg",
    alt: "Outdoor table and chairs on the deck beside the lawn",
  },
];

export const amenities = [
  { title: "Panoramic valley views", text: "Layer after layer of forested ridges, out to the coast on a clear day." },
  { title: "Clifftop viewing deck", text: "Timber deck with cable railing, built right on the edge." },
  { title: "Outdoor dining", text: "Table and chairs on the deck for breakfast with a view." },
  { title: "Open lawn", text: "Room to stretch out, read in the sun or watch the clouds." },
  { title: "Entire home", text: "The whole house is yours. No shared spaces." },
  { title: "3 bedrooms, 3 beds", text: "Comfortable sleeping for up to six guests." },
  { title: "2 bathrooms", text: "Plenty of room for families and small groups." },
  { title: "Rainforest setting", text: "Birdsong, fresh mountain air and cool, misty mornings." },
];

export const experiences = [
  { title: "Springbrook National Park", text: "World Heritage rainforest, lookouts and walking tracks close by." },
  { title: "Waterfalls", text: "Purling Brook Falls and Twin Falls are among the area's best-known walks." },
  { title: "Glow worms", text: "See them after dark at the Natural Bridge, in the national park." },
  { title: "Gold Coast beaches", text: "Swap the mountains for the surf, about an hour's drive away." },
];

export const gallery = [
  { src: "/images/deck-view.jpg", alt: "The clifftop deck looking out over the valley" },
  { src: "/images/house.jpg", alt: "The house among the trees" },
  { src: "/images/deck-rainbow.jpg", alt: "A rainbow over the valley from the deck" },
  { src: "/images/outdoor-dining.jpg", alt: "Outdoor table and chairs on the deck" },
  { src: "/images/valley.jpg", alt: "Rainforest valleys stretching to the coast" },
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
    q: "Where is The Cliff?",
    a: "In Springbrook, in the Gold Coast Hinterland of South East Queensland. Airbnb shares the exact address once your booking is confirmed.",
  },
  {
    q: "What is the weather like?",
    a: "Springbrook sits high on the range, so it's often cooler and mistier than the coast. Pack a warm layer, even in summer.",
  },
  {
    q: "Is The Cliff suitable for children?",
    a: "Yes, with care. The house sits on a clifftop, so young children should be supervised outdoors at all times.",
  },
  {
    q: "What are the check-in times, house rules and cancellation policy?",
    a: "These are all shown on the Airbnb listing and apply to every booking.",
  },
];
