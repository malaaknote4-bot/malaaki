// Generates soft coastal placeholder scenes in public/images.
// Replace these with real listing photos (same filenames, or update lib/content.ts).
import { writeFileSync } from "node:fs";

const scenes = {
  "hero":      { sky: ["#c9d6d8", "#efe6da"], sun: "#f6efe4", sea: ["#7f9ea3", "#4f6f75"], cliff: "#3b4b4a", sunY: 0.52 },
  "dawn":      { sky: ["#e9d9cc", "#f5eee6"], sun: "#fbf3ea", sea: ["#9db3b4", "#6e8c90"], cliff: "#55605c", sunY: 0.58 },
  "midday":    { sky: ["#b9ccd0", "#e4ebea"], sun: "#f7f4ee", sea: ["#6f9298", "#3f6168"], cliff: "#4a5753", sunY: 0.22 },
  "dusk":      { sky: ["#c7b5ab", "#ecd9c8"], sun: "#f4e2cf", sea: ["#8a9a9b", "#56686b"], cliff: "#3d4442", sunY: 0.6 },
  "night":     { sky: ["#3d4f55", "#6e8187"], sun: "#e9e4d8", sea: ["#3e555a", "#25363a"], cliff: "#1f2a2b", sunY: 0.25 },
  "mist":      { sky: ["#d7dedd", "#eeebe5"], sun: "#f8f6f1", sea: ["#a6b9ba", "#7d9598"], cliff: "#6b7773", sunY: 0.4 },
};

const W = 1600, H = 1000;
for (const [name, s] of Object.entries(scenes)) {
  const horizon = H * 0.62;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.sky[0]}"/><stop offset="1" stop-color="${s.sky[1]}"/></linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.sea[0]}"/><stop offset="1" stop-color="${s.sea[1]}"/></linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${s.sun}" stop-opacity="0.9"/><stop offset="1" stop-color="${s.sun}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="${W * 0.62}" cy="${H * s.sunY}" r="260" fill="url(#glow)"/>
  <circle cx="${W * 0.62}" cy="${H * s.sunY}" r="54" fill="${s.sun}" opacity="0.95"/>
  <rect y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#sea)"/>
  <g stroke="${s.sun}" stroke-opacity="0.25" stroke-width="2" fill="none">
    <path d="M${W * 0.45} ${horizon + 40} h${W * 0.3}"/><path d="M${W * 0.5} ${horizon + 90} h${W * 0.22}"/><path d="M${W * 0.4} ${horizon + 150} h${W * 0.36}"/>
  </g>
  <path d="M0 ${H * 0.34} C ${W * 0.08} ${H * 0.33}, ${W * 0.16} ${H * 0.38}, ${W * 0.22} ${H * 0.45} S ${W * 0.3} ${H * 0.6}, ${W * 0.36} ${H * 0.7} L ${W * 0.42} ${H} L 0 ${H} Z" fill="${s.cliff}"/>
  <path d="M0 ${H * 0.5} C ${W * 0.1} ${H * 0.5}, ${W * 0.2} ${H * 0.62}, ${W * 0.27} ${H * 0.78} L ${W * 0.32} ${H} L 0 ${H} Z" fill="${s.cliff}" opacity="0.6"/>
  <path d="M${W} ${H * 0.55} C ${W * 0.93} ${H * 0.56}, ${W * 0.88} ${H * 0.6}, ${W * 0.84} ${H * 0.66} L ${W * 0.8} ${H} L ${W} ${H} Z" fill="${s.cliff}" opacity="0.75"/>
</svg>
`;
  writeFileSync(new URL(`../public/images/${name}.svg`, import.meta.url), svg);
}
console.log("wrote", Object.keys(scenes).length, "scenes");
