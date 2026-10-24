export type Activity = {
  id: string;
  emoji: string;
  title: string;
  duration: string;
  description: string;
  color: string;
};

export const morningActivities: Activity[] = [
  {
    id: "m1",
    emoji: "🌅",
    title: "Morning Walk",
    duration: "20 min",
    description: "Start the day with fresh air. Walk around the block or to the park. Notice what you see, hear and smell.",
    color: "from-amber-400 to-orange-400",
  },
  {
    id: "m2",
    emoji: "📖",
    title: "Read Together",
    duration: "15 min",
    description: "Snuggle up and read a chapter or picture book together before the day gets busy.",
    color: "from-blue-400 to-indigo-400",
  },
  {
    id: "m3",
    emoji: "🧘",
    title: "Morning Stretch",
    duration: "10 min",
    description: "Simple stretches or kids yoga to wake up the body. Put on some calm music and breathe.",
    color: "from-green-400 to-emerald-400",
  },
  {
    id: "m4",
    emoji: "🎨",
    title: "Free Drawing",
    duration: "20 min",
    description: "Give the kids paper and pencils — no rules. Draw whatever comes to mind this morning.",
    color: "from-pink-400 to-rose-400",
  },
];

export const afternoonActivities: Activity[] = [
  {
    id: "a1",
    emoji: "🌱",
    title: "Garden Time",
    duration: "30 min",
    description: "Water plants, pull weeds, plant seeds or just explore what's growing. Kids love digging!",
    color: "from-green-500 to-lime-400",
  },
  {
    id: "a2",
    emoji: "🧁",
    title: "Bake Together",
    duration: "45 min",
    description: "Make muffins, biscuits or banana bread. Kids can mix, pour and decorate. Eat the results!",
    color: "from-amber-500 to-yellow-400",
  },
  {
    id: "a3",
    emoji: "🎭",
    title: "Dress-Up & Play",
    duration: "Free",
    description: "Raid the dress-up box or make costumes from old clothes. Act out a favourite story.",
    color: "from-purple-500 to-violet-400",
  },
  {
    id: "a4",
    emoji: "🧩",
    title: "Puzzle Time",
    duration: "30 min",
    description: "Work on a jigsaw together or do a logic puzzle. Great for all ages with the right difficulty.",
    color: "from-teal-500 to-cyan-400",
  },
  {
    id: "a5",
    emoji: "🎵",
    title: "Dance Party",
    duration: "15 min",
    description: "Put on your favourite playlist and just dance in the living room. No skills required!",
    color: "from-pink-500 to-fuchsia-400",
  },
];

export const eveningActivities: Activity[] = [
  {
    id: "e1",
    emoji: "🎲",
    title: "Board Games",
    duration: "45 min",
    description: "Pick a family favourite — Uno, Snakes & Ladders, Scrabble Junior. Put phones away and play!",
    color: "from-indigo-500 to-blue-400",
  },
  {
    id: "e2",
    emoji: "🎬",
    title: "Family Movie",
    duration: "90 min",
    description: "Choose a movie together, make popcorn and snuggle on the sofa with blankets.",
    color: "from-slate-600 to-slate-400",
  },
  {
    id: "e3",
    emoji: "✏️",
    title: "Journaling",
    duration: "15 min",
    description: "Each person writes or draws the best part of their day. Even little ones can draw a picture.",
    color: "from-orange-500 to-amber-400",
  },
  {
    id: "e4",
    emoji: "🛁",
    title: "Relaxation Routine",
    duration: "30 min",
    description: "Warm bath, calm music, dimmed lights. Wind down together before bed time stories.",
    color: "from-sky-500 to-blue-300",
  },
];
