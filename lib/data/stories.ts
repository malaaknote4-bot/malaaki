export type Story = {
  title: string;
  emoji: string;
  tagline: string;
  content: string[];
};

// 7 stories — one per day of week (0=Sun, 1=Mon, ... 6=Sat)
export const stories: Story[] = [
  {
    // Sunday
    title: "The Sleeping Cloud",
    emoji: "☁️",
    tagline: "A cloud who forgot how to sleep discovers the most beautiful dream",
    content: [
      "High above the world, where the air is soft and white, lived a small cloud named Pip. Every night when the stars came out, all the other clouds would drift slowly to sleep, turning the softest shades of purple and gold.",
      "But Pip couldn't sleep. Night after night, Pip would float alone, watching the moon travel across the sky, wondering why sleep felt so very far away.",
      "One evening, the old Storm Cloud — silver-haired and wonderfully wise — drifted over and asked, \"Little Pip, what keeps you awake?\"",
      "\"I don't know,\" said Pip sadly. \"I just can't settle.\"",
      "The old Storm Cloud smiled. \"Try this,\" she said gently. \"Think of the most beautiful thing you saw today.\"",
      "Pip thought very hard. There had been a rainbow after the afternoon rain. And a little girl below who ran into a puddle laughing. And a golden field of sunflowers turning their faces to the light.",
      "\"Hold those pictures close,\" said the old cloud softly, \"and let them carry you.\"",
      "And so Pip did. The rainbow, the laughing girl, the sunflowers — and slowly, softly, Pip drifted into the most wonderful dream.",
      "Goodnight, little one. Think of your beautiful things. 🌙",
    ],
  },
  {
    // Monday
    title: "The Brave Little Moon",
    emoji: "🌙",
    tagline: "Even the moon has nights when she feels small — until she remembers her light",
    content: [
      "Every night the Moon rose above the hills and lit up the whole world. The rivers sparkled, the forests glowed, and all the sleeping animals felt safe in her gentle silver light.",
      "But one night, the Moon felt very small. The sky was full of brilliant stars, and they seemed so much brighter, so much more beautiful than she was.",
      "\"Nobody notices me,\" she whispered.",
      "Just then, a small hedgehog down below looked up and sighed happily. \"There she is,\" said the hedgehog to her babies. \"The Moon is here. We're safe now.\"",
      "A little fox stopped at the edge of the forest and tilted his nose up. \"The Moon is lighting my path home,\" he said with relief.",
      "And a tiny child in a bedroom looked out at the Moon and whispered, \"Goodnight, Moon.\"",
      "The Moon blinked. She hadn't realised. While she had been looking at the stars, the whole world below had been looking at her.",
      "\"You don't need to be the biggest or the brightest,\" the North Wind murmured as he passed. \"You just need to be yours.\"",
      "And so the Moon shone on — not brighter, not bigger, but exactly herself. And that was more than enough.",
      "Sleep tight, little star. Your light is enough. 🌟",
    ],
  },
  {
    // Tuesday
    title: "The Garden of Stars",
    emoji: "🌟",
    tagline: "A girl who plants kindness discovers it blooms in the most surprising places",
    content: [
      "Once there was a girl called Isla who lived at the edge of a very ordinary garden. It had grass and a fence and one apple tree. Nothing magical at all — or so she thought.",
      "One spring evening, Isla's grandmother came to visit. She pressed a small seed into Isla's palm — tiny, silver, and warm as a sunbeam.",
      "\"What is it?\" Isla asked.",
      "\"A kindness seed,\" said her grandmother. \"Plant it where you do something kind, and see what grows.\"",
      "Isla planted the seed near the gate, because that morning she had held it open for old Mr. Harris and his shopping bags.",
      "The next morning, where the seed had been, a small silver flower glowed softly in the grass — glowing like a star.",
      "That day, Isla shared her lunch with a boy who had forgotten his. She helped a lost puppy find its way home. She drew a picture for her little brother when he was sad.",
      "Each time, she scattered a new seed. And each morning, new silver flowers bloomed.",
      "By the end of the week, Isla's ordinary garden was full of stars.",
      "Her grandmother looked out at the glowing garden and smiled. \"You see? Kindness always grows back. Always.\"",
      "Goodnight. Be kind tomorrow, and watch what blooms. 🌸",
    ],
  },
  {
    // Wednesday
    title: "The Little Fox Who Found Home",
    emoji: "🦊",
    tagline: "A fox who thought he was lost discovers the truest meaning of belonging",
    content: [
      "There was once a small red fox named Finn who woke up one morning and couldn't find his way home.",
      "He walked through the forest asking everyone he met. The rabbits were very busy. The badger was very grumpy. The deer were very tall and couldn't hear him at all.",
      "Finn sat down under an oak tree, ears flat, tail curled around his paws. He had never felt so alone.",
      "Then an old tortoise came by — slowly, as tortoises do — and stopped.",
      "\"Lost?\" said the tortoise.",
      "\"Yes,\" said Finn very quietly.",
      "\"Hm,\" said the tortoise. \"Tell me — where does it feel warm? Where do you feel full? Where do you sleep without worrying?\"",
      "Finn thought about the mossy den beneath the roots of the big beech tree. The smell of his family. The sounds of the forest at dusk.",
      "\"I know where that is!\" said Finn, his ears perking up.",
      "\"Then you know the way home,\" said the tortoise simply, and continued walking.",
      "Finn ran — through the silver birches, past the stream — and there was his den, exactly where he'd left it. His family tumbled out to meet him.",
      "He had never been very far at all. Home had been inside him all along.",
      "Close your eyes now. You are home. You are safe. 🏡",
    ],
  },
  {
    // Thursday
    title: "The Dream River",
    emoji: "🌊",
    tagline: "A river that flows only at night carries children to the most wonderful dreams",
    content: [
      "They say that when children fall asleep, a silver river appears at the edge of the world — but only if you're very still and very quiet.",
      "One night, a boy called Theo lay in bed trying to sleep. The more he tried, the more awake he felt. So he lay very still, very quiet — just like the old stories said.",
      "And there it was. The Dream River, glimmering at the window's edge, soft as silk and wide as the night sky.",
      "A small wooden boat waited at the bank. Theo climbed in and the river carried him away.",
      "First he passed the Valley of Soft Colours — purples and golds and greens so gentle they made him sigh.",
      "Then came the Forest of Friendly Sounds — leaves whispering, somewhere a lullaby playing, rain on a roof far away.",
      "At last the river curved into a bay full of warm light. There were all his favourite things: books stacked up to the clouds, a treehouse in a great oak, and a golden dog who ran to greet him.",
      "Theo curled up in the treehouse, listened to the river singing below, and closed his eyes.",
      "He was already asleep before he knew it.",
      "The Dream River is waiting. Be still. Be quiet. Let it find you. 🌙",
    ],
  },
  {
    // Friday
    title: "The Cosy Bear",
    emoji: "🐻",
    tagline: "A bear who is very good at one important thing: the perfect bedtime",
    content: [
      "In the heart of the Amber Wood, there lived a bear who was famous for one thing only: being absolutely, perfectly cosy.",
      "Every evening as the sun went down, Bear would begin his routine. First, he gathered the softest moss and the driest leaves to line his den. Then he heated stones by the fire until they glowed warm orange.",
      "He made himself a mug of chamomile tea — two spoons of honey, no more, no less. He pulled on his favourite woolly hat (brown, with a little hole he'd never bothered to fix).",
      "His friends came from all over the wood to watch.",
      "\"How do you get so cosy?\" asked the rabbit, who always had cold feet.",
      "\"It takes practice,\" said Bear wisely, wrapping his blanket just so. \"And you must never rush it.\"",
      "The fox tried to copy him but got tangled in his blanket. The hedgehog fell asleep sitting up, which isn't quite the same. The badger forgot his tea until it was cold.",
      "Only Bear got it exactly right.",
      "\"What's the secret?\" the rabbit asked one last time.",
      "Bear smiled sleepily. \"The secret is that you stop trying. You just... settle.\"",
      "He closed his eyes.",
      "And he was the cosiest thing in all the wood.",
      "Now settle yourself. Let your body feel heavy and warm. Goodnight. 🍵",
    ],
  },
  {
    // Saturday
    title: "The Magic Blanket",
    emoji: "🌈",
    tagline: "A patchwork blanket holds all the love of everyone who ever made it",
    content: [
      "At the bottom of a chest in a grandmother's attic, there lay a blanket made of a hundred different patches — every colour you could imagine, and some you couldn't.",
      "Little Rosie found it one rainy afternoon. \"Where did all the pieces come from?\" she asked her grandmother.",
      "Grandmother sat down with a smile. \"Every piece is a story,\" she said.",
      "She touched a yellow square. \"This was your mother's summer dress when she was five. She wore it until it fell apart.\"",
      "A soft blue patch. \"This was your grandfather's favourite shirt. He wore it on the day we met.\"",
      "A green-and-white stripe. \"Your uncle's baby blanket.\"",
      "A tiny red heart in the corner. \"I cut that from your first Christmas stocking.\"",
      "Rosie looked at the blanket differently now. It wasn't just cloth and colour. It was everyone she loved, stitched together with care.",
      "\"Can I borrow it?\" she asked.",
      "\"It was always yours,\" said her grandmother.",
      "That night, Rosie wrapped herself in all those pieces of love. She felt warm in a way that had nothing to do with the wool.",
      "She felt held.",
      "Feel yourself held tonight, little one. Wrapped in all the love of everyone who loves you. Sleep safe. 💛",
    ],
  },
];

export function getTonightStory(): Story {
  const dayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon, ... 6=Sat
  return stories[dayOfWeek];
}
