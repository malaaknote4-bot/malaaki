// Shared motion language: slow, soft, small. Every reveal plays once.
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  base: 0.9,
  slow: 1.1,
  slower: 1.4,
};

// Distance content rises when it appears, in px.
export const RISE = 18;

// Extra delay for the italic phrase that closes a heading.
export const ITALIC_DELAY = 0.15;

// Shared once-only in-view trigger: fires when the element is ~15% into the viewport.
export const VIEWPORT = { once: true, amount: 0.15 } as const;
