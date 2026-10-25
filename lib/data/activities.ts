import { DAYS, parseMealChoices } from "./meals";

export type Period = "morning" | "afternoon" | "evening";
export const PERIODS: Period[] = ["morning", "afternoon", "evening"];
export const PER_PERIOD = 2;

export type Activity = {
  id: string;
  period: Period;
  emoji: string;
  title: string;
  duration: string;
  description: string;
  // Set on an activity a parent added themselves.
  custom?: true;
};

type Entry = Omit<Activity, "period">;
const tag = (period: Period, list: Entry[]): Activity[] => list.map((a) => ({ ...a, period }));

// Listed in schedule order: Monday gets the first two of each list, Tuesday the next two, and so on.
// The last four of each list aren't scheduled; they're extra choices for swapping.
export const activitiesByPeriod: Record<Period, Activity[]> = {
  morning: tag("morning", [
    { id: "m1", emoji: "🌅", title: "Morning Walk", duration: "20 min", description: "Start the day with fresh air. Walk around the block or to the park. Notice what you see, hear and smell." },
    { id: "m2", emoji: "📖", title: "Read Together", duration: "15 min", description: "Snuggle up and read a chapter or picture book together before the day gets busy." },
    { id: "m3", emoji: "🧘", title: "Morning Stretch", duration: "10 min", description: "Simple stretches or kids yoga to wake up the body. Put on some calm music and breathe." },
    { id: "m4", emoji: "🎨", title: "Free Drawing", duration: "20 min", description: "Give the kids paper and pencils — no rules. Draw whatever comes to mind this morning." },
    { id: "m5", emoji: "🐦", title: "Bird Spotting", duration: "15 min", description: "Watch from the window or garden and count the birds you see. Can you spot a robin or a pigeon? Draw your favourite." },
    { id: "m6", emoji: "🥣", title: "Breakfast Helpers", duration: "15 min", description: "Let the kids pour the cereal, stir the porridge and set the table. Small jobs make them feel big." },
    { id: "m7", emoji: "🧱", title: "Tower Challenge", duration: "25 min", description: "Who can build the tallest tower or the longest bridge from blocks or Lego? Measure it with a ruler or a teddy." },
    { id: "m8", emoji: "🎶", title: "Sing-Along", duration: "10 min", description: "Sing nursery rhymes and favourite songs with all the actions — Wheels on the Bus is always a winner." },
    { id: "m9", emoji: "🔤", title: "Letter Hunt", duration: "15 min", description: "Pick a letter and hunt around the house for things that start with it. B: ball, book, banana, bed…" },
    { id: "m10", emoji: "🪴", title: "Water the Plants", duration: "10 min", description: "Give them a small watering can to look after the plants. Look for new leaves and talk about what plants need to grow." },
    { id: "m11", emoji: "🏃", title: "Obstacle Course", duration: "20 min", description: "Make a course from cushions, chairs and tape lines on the floor — crawl under, jump over, balance along." },
    { id: "m12", emoji: "🧸", title: "Teddy Bears' Breakfast", duration: "20 min", description: "Set up a pretend breakfast for the toys with cups, plates and play food. Who wants toast?" },
    { id: "m13", emoji: "🔢", title: "Counting Game", duration: "10 min", description: "Count the stairs, the spoons in the drawer or the red cars going past. Older kids can add them up." },
    { id: "m14", emoji: "✂️", title: "Paper Crafts", duration: "25 min", description: "Cut, fold and glue — paper chains, crowns or animal masks. Use child-safe scissors and help with the tricky bits." },
    { id: "m15", emoji: "🧺", title: "Tidy-Up Race", duration: "10 min", description: "Set a timer and race to get the toys back into their baskets. Put on a song — be done before it ends!" },
    { id: "m16", emoji: "🌦️", title: "Weather Watch", duration: "10 min", description: "Look outside and talk about the weather. Draw it on a chart and choose what teddy should wear today." },
    { id: "m17", emoji: "🎯", title: "Beanbag Toss", duration: "15 min", description: "Throw beanbags or rolled-up socks into a basket. Take a step back after every round." },
    { id: "m18", emoji: "💌", title: "Make a Card", duration: "20 min", description: "Draw a card for a grandparent or friend, then post it together on your next walk." },
  ]),
  afternoon: tag("afternoon", [
    { id: "a1", emoji: "🌱", title: "Garden Time", duration: "30 min", description: "Water plants, pull weeds, plant seeds or just explore what's growing. Kids love digging!" },
    { id: "a2", emoji: "🧁", title: "Bake Together", duration: "45 min", description: "Make muffins, biscuits or banana bread. Kids can mix, pour and decorate. Eat the results!" },
    { id: "a3", emoji: "🎭", title: "Dress-Up & Play", duration: "Free", description: "Raid the dress-up box or make costumes from old clothes. Act out a favourite story." },
    { id: "a4", emoji: "🧩", title: "Puzzle Time", duration: "30 min", description: "Work on a jigsaw together or do a logic puzzle. Great for all ages with the right difficulty." },
    { id: "a5", emoji: "🎵", title: "Dance Party", duration: "15 min", description: "Put on your favourite playlist and just dance in the living room. No skills required!" },
    { id: "a6", emoji: "🏞️", title: "Park Adventure", duration: "45 min", description: "Swings, slides and running about. Collect interesting leaves, sticks and stones to bring home." },
    { id: "a7", emoji: "🫧", title: "Bubble Fun", duration: "15 min", description: "Blow bubbles and chase them. Make your own mix with a squeeze of washing-up liquid in a cup of water." },
    { id: "a8", emoji: "🏰", title: "Build a Den", duration: "40 min", description: "Drape blankets over chairs to make a den. Add cushions and a torch, and have a snack inside." },
    { id: "a9", emoji: "🔎", title: "Treasure Hunt", duration: "30 min", description: "Hide a few toys and give simple clues — or picture clues for little ones who can't read yet." },
    { id: "a10", emoji: "🖐️", title: "Make Playdough", duration: "30 min", description: "Mix 2 cups flour, ½ cup salt, 1 tbsp oil, a few drops of food colouring and about ¾ cup warm water. Then shape animals." },
    { id: "a11", emoji: "🖌️", title: "Painting", duration: "30 min", description: "Get the paints out with brushes, sponges and potato stamps. Lay down newspaper first and aprons on!" },
    { id: "a12", emoji: "🚲", title: "Bike & Scooter Ride", duration: "30 min", description: "Helmets on and ride to the park or around the block. Practise stopping and looking at kerbs." },
    { id: "a13", emoji: "💧", title: "Water Play", duration: "25 min", description: "A washing-up bowl, cups, funnels and sponges make endless fun. Always stay close to children near water." },
    { id: "a14", emoji: "🐛", title: "Bug Hunt", duration: "25 min", description: "Gently lift logs and stones to find minibeasts. Look closely with a magnifying glass, then put everything back." },
    { id: "a15", emoji: "🍓", title: "Fruit Kebabs", duration: "15 min", description: "Thread soft fruit onto paper straws — strawberries, grapes cut lengthways, banana. A snack they made themselves." },
    { id: "a16", emoji: "🎳", title: "Bottle Bowling", duration: "20 min", description: "Line up empty plastic bottles as pins and roll a soft ball. Keep score on paper to practise counting." },
    { id: "a17", emoji: "🧪", title: "Kitchen Science", duration: "20 min", description: "Make a bicarb and vinegar volcano, or guess which things sink or float in a bowl of water." },
    { id: "a18", emoji: "📚", title: "Library Trip", duration: "1 hr", description: "Visit your local library to choose new books. Many run free story-time sessions for little ones." },
  ]),
  evening: tag("evening", [
    { id: "e1", emoji: "🎲", title: "Board Games", duration: "45 min", description: "Pick a family favourite — Uno, Snakes & Ladders, Scrabble Junior. Put phones away and play!" },
    { id: "e5", emoji: "💬", title: "Best Bit of the Day", duration: "10 min", description: "Round the dinner table, everyone shares the best bit of their day, something tricky and something kind they did." },
    { id: "e6", emoji: "🍝", title: "Cook Dinner Together", duration: "30 min", description: "Kids can wash vegetables, stir the pot and set the table. They'll be prouder to eat what they helped make." },
    { id: "e7", emoji: "🌬️", title: "Calm Breathing", duration: "5 min", description: "Lie down together. Breathe in like smelling a flower, out like blowing out a candle. Five slow breaths." },
    { id: "e8", emoji: "🃏", title: "Card Games", duration: "20 min", description: "Snap, Go Fish or a memory game with cards face down. Quick, simple and lots of giggles." },
    { id: "e3", emoji: "✏️", title: "Journaling", duration: "15 min", description: "Each person writes or draws the best part of their day. Even little ones can draw a picture." },
    { id: "e9", emoji: "🔦", title: "Shadow Puppets", duration: "15 min", description: "Dim the lights and shine a torch on the wall. Make a rabbit, a dog or a bird with your hands, and tell a story." },
    { id: "e10", emoji: "🧸", title: "Toy Bedtime", duration: "10 min", description: "Kids put their toys to bed and tuck them in. It helps everyone get ready to sleep." },
    { id: "e2", emoji: "🎬", title: "Family Movie", duration: "90 min", description: "Choose a movie together, make popcorn and snuggle on the sofa with blankets." },
    { id: "e11", emoji: "🌟", title: "Stargazing", duration: "15 min", description: "Look out for the moon and the brightest stars from the window or garden. Can you find the same star tomorrow?" },
    { id: "e12", emoji: "🎙️", title: "Story Chain", duration: "20 min", description: "Take turns adding one sentence to a made-up story. It gets sillier and sillier!" },
    { id: "e13", emoji: "🙌", title: "Hand Massage", duration: "10 min", description: "A little lotion and a gentle hand or foot massage while you chat quietly about the day." },
    { id: "e14", emoji: "📞", title: "Call the Grandparents", duration: "15 min", description: "A video call with family — the kids can show what they made or did today." },
    { id: "e4", emoji: "🛁", title: "Relaxation Routine", duration: "30 min", description: "Warm bath, calm music, dimmed lights. Wind down together before bed time stories." },
    { id: "e15", emoji: "🖍️", title: "Colouring", duration: "20 min", description: "Colouring books or printed patterns with quiet music on. A calm way to end a busy day." },
    { id: "e16", emoji: "🎵", title: "Lullaby Sing-Along", duration: "10 min", description: "Sing soft songs together with the lights low — Twinkle Twinkle, or the ones you sang when they were babies." },
    { id: "e17", emoji: "🧱", title: "Quiet Building", duration: "25 min", description: "Calm building with Lego or blocks and soft music on. No timers, no challenges — just making." },
    { id: "e18", emoji: "👀", title: "I Spy", duration: "10 min", description: "Classic I Spy around the room. For little ones, play with colours: I spy something blue." },
  ]),
};

export const ACTIVITIES: Activity[] = PERIODS.flatMap((p) => activitiesByPeriod[p]);

// Saved swaps, keyed "Monday.morning.0" → activity id.
export type ActivityChoices = Record<string, string>;
export const activityKey = (day: string, period: Period, index: number) => `${day}.${period}.${index}`;
export const parseActivityChoices = parseMealChoices;

export function findActivity(id: string | undefined, custom: Activity[] = []): Activity | undefined {
  return id ? (custom.find((a) => a.id === id) ?? ACTIVITIES.find((a) => a.id === id)) : undefined;
}

export function scheduledActivity(day: string, period: Period, index: number): Activity {
  const list = activitiesByPeriod[period];
  const d = Math.max(0, DAYS.indexOf(day as (typeof DAYS)[number]));
  return list[(d * PER_PERIOD + index) % list.length];
}

export function resolveActivity(
  day: string,
  period: Period,
  index: number,
  choices: ActivityChoices,
  custom: Activity[] = []
): Activity {
  return findActivity(choices[activityKey(day, period, index)], custom) ?? scheduledActivity(day, period, index);
}

export function dayActivities(day: string, choices: ActivityChoices, custom: Activity[] = []): Record<Period, Activity[]> {
  return Object.fromEntries(
    PERIODS.map((p) => [p, Array.from({ length: PER_PERIOD }, (_, i) => resolveActivity(day, p, i, choices, custom))])
  ) as Record<Period, Activity[]>;
}

// A family's own activities come first, for the time of day they were added for.
export function getActivityOptions(period: Period, excludeIds: string[], custom: Activity[] = []): Activity[] {
  return [...custom.filter((a) => a.period === period), ...activitiesByPeriod[period]].filter(
    (a) => !excludeIds.includes(a.id)
  );
}

export function searchActivities(query: string, period: Period, excludeIds: string[], custom: Activity[] = []) {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w))
    .map((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  const matches = [...custom, ...ACTIVITIES].filter((a) => {
    if (excludeIds.includes(a.id)) return false;
    const haystack = `${a.title} ${a.description}`.toLowerCase();
    return words.every((w) => w.test(haystack));
  });
  return {
    same: matches.filter((a) => a.period === period),
    other: matches.filter((a) => a.period !== period),
  };
}

// Parents' own activities, stored as a JSON list on the user.
export function parseCustomActivities(value: unknown): Activity[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((v) => {
    if (!v || typeof v !== "object") return [];
    const a = v as Record<string, unknown>;
    const str = (k: string) => (typeof a[k] === "string" ? (a[k] as string) : "");
    if (!str("id") || !str("title") || !PERIODS.includes(a.period as Period)) return [];
    return [
      {
        id: str("id"),
        period: a.period as Period,
        emoji: str("emoji") || "⭐",
        title: str("title"),
        duration: str("duration") || "Any time",
        description: str("description"),
        custom: true as const,
      },
    ];
  });
}
