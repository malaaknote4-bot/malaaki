import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, CAST } from "./Characters";
import { C, FONT } from "./theme";

const CX = 960;
const CY = 520;
const R = 290;
const D2R = Math.PI / 180;

// Dot-matrix globe: Fibonacci lattice, with a smooth noise mask for "land".
const DOTS = Array.from({ length: 1100 }, (_, i) => {
  const y = 1 - (i / 1099) * 2;
  const lat = Math.asin(y);
  const lon = i * Math.PI * (3 - Math.sqrt(5));
  const land =
    Math.sin(lon * 2 + 1) * Math.cos(lat * 3) + Math.sin(lon * 3 + lat * 2) * 0.6 + Math.cos(lat * 5) * 0.2 > 0.35;
  return { lat, lon, land };
});

type Flag = { lat: number; lon: number; draw: React.ReactNode };
const stripesH = (cols: string[]) =>
  cols.map((c, i) => <rect key={i} x={0} y={(i * 30) / cols.length} width={45} height={30 / cols.length + 0.5} fill={c} />);
const stripesV = (cols: string[]) =>
  cols.map((c, i) => <rect key={i} x={(i * 45) / cols.length} y={0} width={45 / cols.length + 0.5} height={30} fill={c} />);

const FLAGS: Flag[] = [
  { lat: 40, lon: -4, draw: stripesH(["#c60b1e", "#ffc400", "#ffc400", "#c60b1e"]) },
  { lat: 47, lon: 2, draw: stripesV(["#0055a4", "#ffffff", "#ef4135"]) },
  { lat: 41, lon: 15, draw: stripesV(["#009246", "#ffffff", "#ce2b37"]) },
  { lat: 53, lon: 12, draw: stripesH(["#000000", "#dd0000", "#ffce00"]) },
  {
    lat: 36,
    lon: 138,
    draw: (
      <>
        <rect width={45} height={30} fill="white" />
        <circle cx={22.5} cy={15} r={8} fill="#bc002d" />
      </>
    ),
  },
  {
    lat: -12,
    lon: -50,
    draw: (
      <>
        <rect width={45} height={30} fill="#009c3b" />
        <polygon points="22.5,3 42,15 22.5,27 3,15" fill="#ffdf00" />
        <circle cx={22.5} cy={15} r={6.5} fill="#002776" />
      </>
    ),
  },
  {
    lat: 22,
    lon: 78,
    draw: (
      <>
        {stripesH(["#ff9933", "#ffffff", "#138808"])}
        <circle cx={22.5} cy={15} r={3.5} fill="none" stroke="#000080" strokeWidth={1.2} />
      </>
    ),
  },
  {
    lat: 37,
    lon: 127,
    draw: (
      <>
        <rect width={45} height={30} fill="white" />
        <circle cx={22.5} cy={15} r={7} fill="#cd2e3a" />
        <path d="M15.5 15 A 7 7 0 0 0 29.5 15 Z" fill="#0047a0" />
      </>
    ),
  },
];

const project = (lat: number, lon: number, rot: number) => {
  const l = lon + rot;
  return {
    x: CX + R * Math.cos(lat) * Math.sin(l),
    y: CY - R * Math.sin(lat),
    z: Math.cos(lat) * Math.cos(l),
  };
};

// Word rollercoaster: tilted ellipse around the globe.
const TRACK = { cx: CX, cy: CY + 40, rx: 640, ry: 170, tilt: -12 };
const WORDS = "hola · bonjour · ciao · hallo · obrigado · ありがとう · merci · danke · gracias · grazie · ";
const BACK = `M ${TRACK.cx - TRACK.rx} ${TRACK.cy} A ${TRACK.rx} ${TRACK.ry} 0 0 1 ${TRACK.cx + TRACK.rx} ${TRACK.cy}`;
const FRONT = `M ${TRACK.cx + TRACK.rx} ${TRACK.cy} A ${TRACK.rx} ${TRACK.ry} 0 0 1 ${TRACK.cx - TRACK.rx} ${TRACK.cy}`;

const Rail: React.FC<{ d: string; id: string; offset: number }> = ({ d, id, offset }) => (
  <>
    <path id={id} d={d} fill="none" />
    <path d={d} fill="none" stroke={C.neon} strokeOpacity={0.18} strokeWidth={70} strokeLinecap="round" />
    <path d={d} fill="none" stroke={C.neon} strokeWidth={4} transform="translate(0,-30)" />
    <path d={d} fill="none" stroke={C.neon} strokeWidth={4} transform="translate(0,30)" />
    <text fontSize={38} fontWeight={700} fill="white" dominantBaseline="middle" style={{ fontFamily: FONT }}>
      <textPath href={`#${id}`} startOffset={offset}>
        {WORDS.repeat(3)}
      </textPath>
    </text>
  </>
);

// 14–18 s: zoom out through a spinning globe; the cast rides a word coaster.
export const GlobeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = spring({ frame, fps, config: { damping: 18, stiffness: 45 } });
  const cam = interpolate(zoom, [0, 1], [6, 1]);
  const camRot = interpolate(zoom, [0, 1], [-35, 0]);
  const rot = frame * 0.045 + 0.9;
  const textOffset = -((frame * 9) % 900);

  const riders = CAST.map((kind, i) => {
    const t = frame * 0.055 + (i * Math.PI) / 2 + 0.4;
    const x = TRACK.cx + TRACK.rx * Math.cos(t);
    const y = TRACK.cy + TRACK.ry * Math.sin(t);
    const dx = -TRACK.rx * Math.sin(t);
    const dy = TRACK.ry * Math.cos(t);
    const angle = (Math.atan(dy / dx) * 180) / Math.PI;
    const front = Math.sin(t) > 0;
    const size = front ? 150 : 110;
    return { kind, x, y, angle, front, size, facing: dx < 0 ? -1 : 1 };
  });

  const renderRider = (r: (typeof riders)[number]) => (
    <g key={r.kind} transform={`translate(${r.x} ${r.y}) rotate(${r.angle})`}>
      <g transform={`scale(${r.facing} 1)`}>
        <Character kind={r.kind} size={r.size} x={-r.size / 2} y={-r.size - 18} frame={frame} card="hi!" />
        <rect x={-r.size * 0.45} y={-38} width={r.size * 0.9} height={38} rx={12} fill={C.red} stroke="white" strokeWidth={4} />
        <circle cx={-r.size * 0.28} cy={2} r={9} fill="#333" />
        <circle cx={r.size * 0.28} cy={2} r={9} fill="#333" />
      </g>
    </g>
  );

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        transformOrigin: `${CX}px ${CY}px`,
        transform: `scale(${cam}) rotate(${camRot}deg)`,
      }}
    >
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} overflow="visible">
        <defs>
          <radialGradient id="ocean" cx="40%" cy="35%" r="75%">
            <stop offset="0" stopColor="#0e5a3a" />
            <stop offset="1" stopColor="#021208" />
          </radialGradient>
        </defs>

        <g transform={`rotate(${TRACK.tilt} ${TRACK.cx} ${TRACK.cy})`}>
          <Rail d={BACK} id="rail-back" offset={textOffset} />
          {riders.filter((r) => !r.front).map(renderRider)}
        </g>

        {/* globe */}
        <circle cx={CX} cy={CY} r={R + 26} fill={C.neon} opacity={0.12} />
        <circle cx={CX} cy={CY} r={R} fill="url(#ocean)" stroke={C.neon} strokeWidth={4} />
        {DOTS.map((d, i) => {
          const p = project(d.lat, d.lon, rot);
          if (p.z <= 0) return null;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={d.land ? 4.2 : 1.6}
              fill={d.land ? C.neon : "#2f6b45"}
              opacity={0.25 + 0.75 * p.z}
            />
          );
        })}
        {FLAGS.map((f, i) => {
          const p = project(f.lat * D2R, f.lon * D2R, rot);
          if (p.z <= 0.05) return null;
          const lit = clampLit(p.z);
          const s = 0.7 + 0.6 * lit;
          return (
            <g key={i} transform={`translate(${p.x} ${p.y}) scale(${s})`} opacity={0.4 + 0.6 * p.z}>
              <line x1={0} y1={0} x2={0} y2={-46} stroke="white" strokeWidth={3} />
              <circle r={5} fill={lit > 0.5 ? C.neon : "white"} />
              <g transform="translate(0 -46)">
                {lit > 0.5 && <rect x={-6} y={-6} width={57} height={42} rx={6} fill={C.neon} opacity={0.6 * lit} />}
                {f.draw}
                <rect width={45} height={30} fill="none" stroke="white" strokeWidth={1.5} />
              </g>
            </g>
          );
        })}

        <g transform={`rotate(${TRACK.tilt} ${TRACK.cx} ${TRACK.cy})`}>
          <Rail d={FRONT} id="rail-front" offset={textOffset} />
          {riders.filter((r) => r.front).map(renderRider)}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

/** Flags light up as they rotate to face the camera. */
const clampLit = (z: number) => Math.max(0, Math.min(1, (z - 0.45) / 0.35));
