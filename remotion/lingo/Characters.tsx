import { C } from "./theme";

// Original cartoon cast, each drawn in a 200x200 box with feet at the bottom
// centre (100, 196). Render inside HTML via <Toon> or inside SVG directly.
type Props = { size?: number; x?: number; y?: number; frame?: number };

const Svg: React.FC<Props & { children: React.ReactNode }> = ({ size = 200, x, y, children }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} x={x} y={y} overflow="visible">
    {children}
  </svg>
);

const Eyes: React.FC<{ y: number; dx: number; r?: number }> = ({ y, dx, r = 8 }) => (
  <>
    {[-1, 1].map((s) => (
      <g key={s}>
        <circle cx={100 + s * dx} cy={y} r={r} fill="#1a1a2e" />
        <circle cx={100 + s * dx + r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="white" />
      </g>
    ))}
  </>
);

export const Fox: React.FC<Props> = (p) => (
  <Svg {...p}>
    <path d="M150 165 Q 200 150 185 100 Q 175 140 140 150 Z" fill={C.orange} />
    <path d="M185 100 Q 192 120 178 128 Q 180 110 185 100 Z" fill="white" />
    <ellipse cx="100" cy="160" rx="42" ry="36" fill={C.orange} />
    <ellipse cx="100" cy="166" rx="24" ry="24" fill="#fff4e6" />
    <ellipse cx="80" cy="194" rx="14" ry="7" fill="#c2410c" />
    <ellipse cx="120" cy="194" rx="14" ry="7" fill="#c2410c" />
    <polygon points="52,72 62,14 96,52" fill={C.orange} />
    <polygon points="148,72 138,14 104,52" fill={C.orange} />
    <polygon points="62,62 66,30 86,52" fill="#7c2d12" />
    <polygon points="138,62 134,30 114,52" fill="#7c2d12" />
    <ellipse cx="100" cy="90" rx="56" ry="48" fill={C.orange} />
    <ellipse cx="100" cy="110" rx="32" ry="22" fill="#fff4e6" />
    <Eyes y={86} dx={20} />
    <circle cx="100" cy="102" r="7" fill="#1a1a2e" />
    <path d="M90 114 Q 100 122 110 114" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    {/* headphones */}
    <path d="M42 92 A 58 64 0 0 1 158 92" stroke={C.purple} strokeWidth="11" fill="none" strokeLinecap="round" />
    <rect x="30" y="76" width="22" height="38" rx="10" fill={C.purple} stroke="#7e22ce" strokeWidth="3" />
    <rect x="148" y="76" width="22" height="38" rx="10" fill={C.purple} stroke="#7e22ce" strokeWidth="3" />
  </Svg>
);

export const Penguin: React.FC<Props & { card?: string }> = ({ card = "hola", ...p }) => (
  <Svg {...p}>
    <ellipse cx="80" cy="194" rx="16" ry="7" fill={C.orange} />
    <ellipse cx="120" cy="194" rx="16" ry="7" fill={C.orange} />
    <ellipse cx="100" cy="115" rx="64" ry="78" fill="#1e293b" />
    <ellipse cx="100" cy="132" rx="44" ry="58" fill="white" />
    <ellipse cx="100" cy="76" rx="42" ry="30" fill="white" />
    <Eyes y={72} dx={17} r={9} />
    <polygon points="88,88 112,88 100,102" fill={C.orange} />
    <ellipse cx="78" cy="96" rx="9" ry="5" fill={C.pink} opacity="0.7" />
    <ellipse cx="122" cy="96" rx="9" ry="5" fill={C.pink} opacity="0.7" />
    <ellipse cx="40" cy="128" rx="13" ry="34" fill="#1e293b" transform="rotate(20 40 128)" />
    {/* flashcard held by the right flipper */}
    <g transform="rotate(-12 160 120)">
      <rect x="128" y="96" width="74" height="50" rx="8" fill="white" stroke={C.green} strokeWidth="5" />
      <text x="165" y="128" textAnchor="middle" fontSize="20" fontWeight="700" fill={C.ink} fontFamily="sans-serif">
        {card}
      </text>
    </g>
    <ellipse cx="152" cy="132" rx="12" ry="22" fill="#1e293b" transform="rotate(-40 152 132)" />
  </Svg>
);

export const Dragon: React.FC<Props> = (p) => (
  <Svg {...p}>
    <path d="M60 160 Q 10 170 18 130 L 6 122 L 28 118 Q 30 150 66 148 Z" fill="#9333ea" />
    <path d="M70 110 Q 20 60 40 40 Q 60 80 90 96 Z" fill="#e9d5ff" stroke="#9333ea" strokeWidth="4" />
    <path d="M130 110 Q 180 60 160 40 Q 140 80 110 96 Z" fill="#e9d5ff" stroke="#9333ea" strokeWidth="4" />
    <ellipse cx="100" cy="155" rx="44" ry="40" fill={C.purple} />
    <ellipse cx="100" cy="162" rx="26" ry="28" fill="#fde68a" />
    <ellipse cx="78" cy="194" rx="14" ry="7" fill="#7e22ce" />
    <ellipse cx="122" cy="194" rx="14" ry="7" fill="#7e22ce" />
    <polygon points="70,58 64,26 86,50" fill={C.gold} />
    <polygon points="130,58 136,26 114,50" fill={C.gold} />
    <ellipse cx="100" cy="86" rx="50" ry="42" fill={C.purple} />
    <ellipse cx="100" cy="104" rx="30" ry="18" fill="#e9d5ff" />
    <circle cx="90" cy="102" r="3" fill="#6b21a8" />
    <circle cx="110" cy="102" r="3" fill="#6b21a8" />
    <Eyes y={78} dx={20} r={9} />
    <path d="M86 112 Q 100 120 114 112" stroke="#6b21a8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
  </Svg>
);

export const Robot: React.FC<Props & { wave?: number }> = ({ wave = 0, frame = 0, ...p }) => (
  <Svg {...p}>
    <line x1="100" y1="34" x2="100" y2="14" stroke="#94a3b8" strokeWidth="5" />
    <circle cx="100" cy="12" r="9" fill={C.neon} opacity={0.6 + 0.4 * Math.sin(frame / 3)} />
    <rect x="80" y="166" width="14" height="26" rx="5" fill="#64748b" />
    <rect x="106" y="166" width="14" height="26" rx="5" fill="#64748b" />
    <rect x="70" y="188" width="28" height="10" rx="5" fill="#475569" />
    <rect x="102" y="188" width="28" height="10" rx="5" fill="#475569" />
    {/* left arm */}
    <rect x="34" y="118" width="18" height="44" rx="9" fill="#94a3b8" transform="rotate(14 43 120)" />
    {/* waving right arm, pivots at the shoulder */}
    <g transform={`rotate(${-150 + wave} 152 122)`}>
      <rect x="143" y="118" width="18" height="46" rx="9" fill="#94a3b8" />
      <circle cx="152" cy="168" r="12" fill="#cbd5e1" />
    </g>
    <rect x="58" y="110" width="84" height="62" rx="16" fill="#cbd5e1" />
    <circle cx="100" cy="140" r="12" fill={C.blue} />
    <rect x="44" y="34" width="112" height="80" rx="22" fill="#e2e8f0" />
    <rect x="56" y="46" width="88" height="56" rx="14" fill="#0f172a" />
    <rect x="72" y="60" width="16" height="16" rx="5" fill={C.neon} />
    <rect x="112" y="60" width="16" height="16" rx="5" fill={C.neon} />
    <path d="M82 86 Q 100 96 118 86" stroke={C.neon} strokeWidth="4" fill="none" strokeLinecap="round" />
  </Svg>
);

export type Kind = "fox" | "penguin" | "dragon" | "robot";
export const CAST: Kind[] = ["fox", "penguin", "dragon", "robot"];

export const Character: React.FC<Props & { kind: Kind; card?: string }> = ({ kind, ...p }) => {
  const frame = p.frame ?? 0;
  switch (kind) {
    case "fox":
      return <Fox {...p} />;
    case "penguin":
      return <Penguin {...p} />;
    case "dragon":
      return <Dragon {...p} />;
    case "robot":
      return <Robot {...p} wave={Math.sin(frame / 3) * 30} />;
  }
};

/**
 * HTML-positioned character with squash & stretch. (x, y) is where the feet
 * touch; stretch > 1 is tall and thin, < 1 squashed.
 */
export const Toon: React.FC<{
  kind: Kind;
  x: number;
  y: number;
  size?: number;
  stretch?: number;
  facing?: number;
  rotate?: number;
  frame?: number;
  card?: string;
  style?: React.CSSProperties;
}> = ({ kind, x, y, size = 200, stretch = 1, facing = 1, rotate = 0, frame, card, style }) => (
  <div
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size,
      width: size,
      height: size,
      transformOrigin: "50% 100%",
      transform: `rotate(${rotate}deg) scale(${facing / Math.sqrt(stretch)}, ${stretch})`,
      filter: "drop-shadow(0 12px 10px rgba(0,0,0,0.35))",
      ...style,
    }}
  >
    <Character kind={kind} size={size} frame={frame} card={card} />
  </div>
);
